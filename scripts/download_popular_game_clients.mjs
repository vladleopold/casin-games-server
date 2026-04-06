import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = "https://slotcity.ua";
const OUTPUT_ROOT = process.cwd();
const MANIFEST_DIR = path.join(OUTPUT_ROOT, "output", "popular-game-clients");
const MANIFEST_PATH = path.join(MANIFEST_DIR, "manifest.json");
const ERRORS_PATH = path.join(MANIFEST_DIR, "errors.json");

const GAME_LIMIT = Number.parseInt(process.env.GAME_LIMIT ?? "500", 10);
const TAKE = Number.parseInt(process.env.TAKE ?? String(GAME_LIMIT), 10);
const CONCURRENCY = Number.parseInt(process.env.CONCURRENCY ?? "2", 10);
const METADATA_CONCURRENCY = Number.parseInt(process.env.METADATA_CONCURRENCY ?? "12", 10);
const LOAD_WAIT_MS = Number.parseInt(process.env.LOAD_WAIT_MS ?? "8000", 10);
const NAV_TIMEOUT_MS = Number.parseInt(process.env.NAV_TIMEOUT_MS ?? "90000", 10);
const CAPTURE_TIMEOUT_MS = Number.parseInt(
  process.env.CAPTURE_TIMEOUT_MS ?? String(NAV_TIMEOUT_MS + LOAD_WAIT_MS + 30000),
  10,
);
const SECTION_TERM = process.env.SECTION_TERM ?? "all-slots";
const SECTION_TYPE = process.env.SECTION_TYPE ?? "slots";

const EXCLUDED_HOST_PATTERNS = [
  /google-analytics\.com$/i,
  /googlesyndication\.com$/i,
  /doubleclick\.net$/i,
  /cloudflareinsights\.com$/i,
  /dmca\.com$/i,
  /facebook\.com$/i,
  /googletagmanager\.com$/i,
  /hotjar\.com$/i,
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function countFilesRecursively(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  let count = 0;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      count += countFilesRecursively(fullPath);
    } else if (entry.isFile()) {
      count += 1;
    }
  }

  return count;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sanitizeSegment(value, fallback) {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[%/\\?*:|"<>]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || fallback;
}

function relativeUrlToAbsolute(value) {
  try {
    return new URL(value, BASE_URL).toString();
  } catch {
    return null;
  }
}

function shouldSkipUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    return EXCLUDED_HOST_PATTERNS.some((pattern) => pattern.test(parsed.hostname));
  } catch {
    return true;
  }
}

function extensionFromContentType(contentType) {
  const normalized = (contentType ?? "").split(";")[0].trim().toLowerCase();
  const byType = {
    "application/javascript": ".js",
    "application/json": ".json",
    "application/manifest+json": ".webmanifest",
    "application/octet-stream": ".bin",
    "application/wasm": ".wasm",
    "font/otf": ".otf",
    "font/ttf": ".ttf",
    "font/woff": ".woff",
    "font/woff2": ".woff2",
    "image/avif": ".avif",
    "image/gif": ".gif",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/svg+xml": ".svg",
    "image/webp": ".webp",
    "text/css": ".css",
    "text/html": ".html",
    "text/javascript": ".js",
    "text/plain": ".txt",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
  };

  return byType[normalized] ?? ".bin";
}

function buildFilePath(gameDir, rawUrl, contentType) {
  const parsed = new URL(rawUrl);
  const originalSegments = decodeURIComponent(parsed.pathname)
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/[<>:"\\|?*\u0000-\u001f]/g, "-"));

  let fileName = originalSegments.pop() ?? "index";
  let extension = path.extname(fileName);

  if (!fileName || fileName === ".") {
    fileName = "index";
    extension = "";
  }

  if (!extension) {
    fileName += extensionFromContentType(contentType);
    extension = path.extname(fileName);
  }

  if (parsed.search) {
    const hash = crypto.createHash("sha1").update(parsed.search).digest("hex").slice(0, 8);
    const stem = extension ? fileName.slice(0, -extension.length) : fileName;
    fileName = `${stem}__${hash}${extension}`;
  }

  return path.join(gameDir, "client", parsed.hostname, ...originalSegments, fileName);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 Codex client downloader",
      accept: "application/json, text/plain, */*",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText} for ${url}`);
  }

  return response.json();
}

async function fetchTopGames() {
  const url = new URL(`/apiv4/games/public/subsection/item/${SECTION_TERM}`, BASE_URL);
  url.searchParams.set("take", String(TAKE));
  url.searchParams.set("page", "1");
  url.searchParams.set("platform", "desktop");

  const payload = await fetchJson(url.toString());
  return (payload.games?.result ?? []).slice(0, GAME_LIMIT);
}

async function fetchDemoMetadata(term) {
  const url = new URL("/apiv2/games/demo", BASE_URL);
  url.searchParams.set("term", term);
  url.searchParams.set("language", "uk");
  url.searchParams.set("check_limits", "1");
  url.searchParams.set("version", "desktop");

  return fetchJson(url.toString());
}

async function runWithConcurrency(items, limit, worker) {
  let index = 0;

  async function runner() {
    while (true) {
      const currentIndex = index;
      index += 1;

      if (currentIndex >= items.length) {
        return;
      }

      await worker(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(Array.from({ length: Math.max(1, limit) }, () => runner()));
}

async function captureGame(browser, record, errors) {
  const gameDir = path.join(OUTPUT_ROOT, record.type, record.provider.term, record.game.term);
  ensureDir(gameDir);

  const existingClientFiles = countFilesRecursively(path.join(gameDir, "client"));
  if (existingClientFiles > 0) {
    fs.writeFileSync(
      path.join(gameDir, "game.json"),
      JSON.stringify({
        ...record,
        savedFiles: existingClientFiles,
        resumed: true,
      }, null, 2),
    );

    return {
      dir: path.relative(OUTPUT_ROOT, gameDir),
      savedFiles: existingClientFiles,
      finalUrl: null,
      resumed: true,
    };
  }

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 900 },
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  });

  const pendingWrites = new Set();
  const savedFiles = [];
  const seenUrls = new Set();

  context.on("response", (response) => {
    const promise = (async () => {
      const request = response.request();
      const url = response.url();

      if (request.method() !== "GET" || shouldSkipUrl(url) || seenUrls.has(url)) {
        return;
      }

      if (!/^https?:/i.test(url) || !response.ok()) {
        return;
      }

      seenUrls.add(url);

      const contentType = response.headers()["content-type"] ?? "";
      const filePath = buildFilePath(gameDir, url, contentType);
      ensureDir(path.dirname(filePath));

      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        savedFiles.push(path.relative(OUTPUT_ROOT, filePath));
        return;
      }

      const body = await response.body();
      fs.writeFileSync(filePath, body);
      savedFiles.push(path.relative(OUTPUT_ROOT, filePath));
    })().catch((error) => {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("No data found for resource with given identifier")) {
        return;
      }

      errors.push({
        term: record.game.term,
        launchUrl: record.launchUrl,
        url: response.url(),
        error: message,
      });
    }).finally(() => {
      pendingWrites.delete(promise);
    });

    pendingWrites.add(promise);
  });

  const page = await context.newPage();
  const timeoutId = setTimeout(() => {
    context.close().catch(() => {});
  }, CAPTURE_TIMEOUT_MS);

  try {
    await page.goto(record.launchUrl, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT_MS });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(LOAD_WAIT_MS);
    await Promise.race([
      Promise.allSettled([...pendingWrites]),
      sleep(5000),
    ]);

    fs.writeFileSync(
      path.join(gameDir, "game.json"),
      JSON.stringify({
        ...record,
        savedFiles,
      }, null, 2),
    );

    return {
      dir: path.relative(OUTPUT_ROOT, gameDir),
      savedFiles: savedFiles.length,
      finalUrl: page.url(),
    };
  } finally {
    clearTimeout(timeoutId);
    await context.close().catch(() => {});
  }
}

async function main() {
  ensureDir(MANIFEST_DIR);

  const topGames = await fetchTopGames();
  const manifestEntries = [];
  const errors = [];
  const preparedEntries = new Array(topGames.length).fill(null);

  await runWithConcurrency(topGames, METADATA_CONCURRENCY, async (game, index) => {
    try {
      const demo = await fetchDemoMetadata(game.term);
      preparedEntries[index] = {
        type: SECTION_TYPE,
        provider: {
          name: demo.provider ?? game.provider?.name ?? null,
          term: sanitizeSegment(demo.providerTerm ?? game.provider?.term, "unknown-provider"),
        },
        game: {
          id: game.id ?? null,
          name: demo.name ?? game.name ?? null,
          term: game.term,
          code: game.code ?? null,
        },
        launchUrl: relativeUrlToAbsolute(demo.url),
        iconUrl: relativeUrlToAbsolute(demo.image ?? game.iconUrl),
        iconUrlVertical: relativeUrlToAbsolute(demo.iconUrlVertical ?? game.iconUrlVertical),
      };
    } catch (error) {
      errors.push({
        term: game.term,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  });

  manifestEntries.push(...preparedEntries.filter(Boolean));

  const browser = await chromium.launch({ headless: true });

  try {
    await runWithConcurrency(manifestEntries, CONCURRENCY, async (record) => {
      if (!record.launchUrl) {
        errors.push({
          term: record.game.term,
          error: "Missing launchUrl",
        });
        return;
      }

      try {
        const result = await captureGame(browser, record, errors);
        record.capture = result;
      } catch (error) {
        errors.push({
          term: record.game.term,
          launchUrl: record.launchUrl,
          error: error instanceof Error ? error.message : String(error),
        });
      }

      await sleep(200);
    });
  } finally {
    await browser.close();
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    sectionTerm: SECTION_TERM,
    sectionType: SECTION_TYPE,
    requestedGames: GAME_LIMIT,
    preparedGames: manifestEntries.length,
    capturedGames: manifestEntries.filter((entry) => entry.capture).length,
    failedItems: errors.length,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify({ summary, entries: manifestEntries }, null, 2));
  fs.writeFileSync(ERRORS_PATH, JSON.stringify(errors, null, 2));

  console.log(JSON.stringify({
    manifestPath: MANIFEST_PATH,
    errorsPath: ERRORS_PATH,
    summary,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
