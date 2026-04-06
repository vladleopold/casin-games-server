import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = "https://slotcity.ua";
const MAIN_PAGE_URL = `${BASE_URL}/game-hall`;
const OUTPUT_ROOT = process.cwd();
const MANIFEST_DIR = path.join(OUTPUT_ROOT, "output", "game-hall-assets");
const MANIFEST_PATH = path.join(MANIFEST_DIR, "manifest.json");
const ERRORS_PATH = path.join(MANIFEST_DIR, "errors.json");
const TAKE = Number.parseInt(process.env.TAKE ?? "1000", 10);
const MAX_GAMES = Number.parseInt(process.env.MAX_GAMES ?? "500", 10);
const CONCURRENCY = Number.parseInt(process.env.CONCURRENCY ?? "16", 10);
const RETRIES = Number.parseInt(process.env.RETRIES ?? "3", 10);
const REQUEST_DELAY_MS = Number.parseInt(process.env.REQUEST_DELAY_MS ?? "0", 10);
const MAIN_PAGE_WAIT_MS = Number.parseInt(process.env.MAIN_PAGE_WAIT_MS ?? "5000", 10);

const SECTIONS = [
  { subsection: "all-slots", typeDir: "slots" },
  { subsection: "live-all", typeDir: "live" },
  { subsection: "all-fast-games", typeDir: "fast-games" },
];

const ASSET_FIELDS = [
  "iconUrl",
  "iconUrlVertical",
  "characterIconUrl",
  "lobbyIconUrl",
  "previewMediaUrl",
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
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

function resolveAssetUrl(value) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value, BASE_URL).toString();
  } catch {
    return null;
  }
}

function extensionFromUrl(assetUrl) {
  const parsed = new URL(assetUrl);
  const ext = path.extname(decodeURIComponent(parsed.pathname));
  return ext || "";
}

function extensionFromContentType(contentType) {
  if (!contentType) {
    return ".bin";
  }

  const normalized = contentType.split(";")[0].trim().toLowerCase();
  const byType = {
    "image/avif": ".avif",
    "image/gif": ".gif",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/svg+xml": ".svg",
    "image/webp": ".webp",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
  };

  return byType[normalized] ?? ".bin";
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 Codex asset downloader",
      accept: "application/json, text/plain, */*",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText} for ${url}`);
  }

  return response.json();
}

async function fetchSectionGames(section) {
  const items = [];
  let currentPage = 1;
  let totalPages = 1;
  let sectionMeta = null;

  while (currentPage <= totalPages) {
    const url = new URL(`/apiv4/games/public/subsection/item/${section.subsection}`, BASE_URL);
    url.searchParams.set("take", String(TAKE));
    url.searchParams.set("page", String(currentPage));
    url.searchParams.set("platform", "desktop");

    const payload = await fetchJson(url.toString());
    const gamesBlock = payload.games ?? {};
    totalPages = Number(gamesBlock.pages ?? 1);

    if (!sectionMeta) {
      sectionMeta = {
        id: payload.id ?? null,
        subsection: payload.term ?? section.subsection,
        typeDir: section.typeDir,
        gameSectionTerm: payload.gameSectionTerm ?? section.typeDir,
        totalGames: Number(gamesBlock.total ?? 0),
      };
    }

    items.push(...(gamesBlock.result ?? []));
    currentPage += 1;

    if (REQUEST_DELAY_MS > 0 && currentPage <= totalPages) {
      await sleep(REQUEST_DELAY_MS);
    }
  }

  return {
    ...sectionMeta,
    games: items,
  };
}

async function collectPopularTerms(limit) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });

  try {
    await page.goto(MAIN_PAGE_URL, { waitUntil: "domcontentloaded", timeout: 120000 });
    await page.waitForTimeout(MAIN_PAGE_WAIT_MS);

    const terms = await page.evaluate(() => {
      const seen = new Set();
      const items = [];

      for (const anchor of document.querySelectorAll('a[href*="/game/"]')) {
        try {
          const url = new URL(anchor.href, window.location.href);
          const match = url.pathname.match(/^\/game\/([^/?#]+)/);
          const term = match?.[1];
          if (!term || seen.has(term)) {
            continue;
          }

          seen.add(term);
          items.push(term);
        } catch {
          // Ignore malformed URLs in the page markup.
        }
      }

      return items;
    });

    return limit > 0 ? terms.slice(0, limit) : terms;
  } finally {
    await browser.close();
  }
}

function buildAssets(game) {
  return ASSET_FIELDS.flatMap((field) => {
    const assetUrl = resolveAssetUrl(game[field]);
    if (!assetUrl) {
      return [];
    }

    return [{
      field,
      url: assetUrl,
      ext: extensionFromUrl(assetUrl),
    }];
  });
}

async function downloadAsset(asset, destBasePath) {
  let lastError = null;

  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    try {
      const response = await fetch(asset.url, {
        headers: {
          "user-agent": "Mozilla/5.0 Codex asset downloader",
          accept: "*/*",
        },
      });

      if (!response.ok) {
        throw new Error(`Asset request failed: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      const ext = asset.ext || extensionFromContentType(contentType);
      const finalPath = `${destBasePath}${ext}`;

      if (fs.existsSync(finalPath) && fs.statSync(finalPath).size > 0) {
        return {
          filePath: finalPath,
          skipped: true,
          bytes: fs.statSync(finalPath).size,
        };
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(finalPath, buffer);

      return {
        filePath: finalPath,
        skipped: false,
        bytes: buffer.length,
      };
    } catch (error) {
      lastError = error;
      if (attempt < RETRIES) {
        await sleep(300 * attempt);
      }
    }
  }

  throw lastError;
}

async function runWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let index = 0;

  async function runner() {
    while (true) {
      const currentIndex = index;
      index += 1;

      if (currentIndex >= items.length) {
        return;
      }

      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  }

  const workers = Array.from({ length: Math.max(1, limit) }, () => runner());
  await Promise.all(workers);
  return results;
}

async function main() {
  ensureDir(MANIFEST_DIR);

  const sectionPayloads = await Promise.all(SECTIONS.map((section) => fetchSectionGames(section)));
  const popularTerms = MAX_GAMES > 0 ? await collectPopularTerms(MAX_GAMES) : [];
  const tasks = [];
  const manifestEntries = [];
  const errors = [];
  const missingTerms = [];

  const uniqueSectionGames = [];
  for (const section of sectionPayloads) {
    const seenTerms = new Set();
    for (const game of section.games) {
      if (seenTerms.has(game.term)) {
        continue;
      }
      seenTerms.add(game.term);
      uniqueSectionGames.push({ section, game });
    }
  }

  const sectionPriority = new Map([
    ["live", 0],
    ["fast-games", 1],
    ["slots", 2],
  ]);

  const preferredGameByTerm = new Map();
  for (const record of uniqueSectionGames) {
    const existing = preferredGameByTerm.get(record.game.term);
    const nextRank = sectionPriority.get(record.section.typeDir) ?? Number.MAX_SAFE_INTEGER;
    const currentRank = existing ? (sectionPriority.get(existing.section.typeDir) ?? Number.MAX_SAFE_INTEGER) : Number.MAX_SAFE_INTEGER;

    if (!existing || nextRank < currentRank) {
      preferredGameByTerm.set(record.game.term, record);
    }
  }

  const selectedGames = MAX_GAMES > 0
    ? popularTerms.flatMap((term) => {
        const record = preferredGameByTerm.get(term);
        if (!record) {
          missingTerms.push(term);
          return [];
        }
        return [record];
      })
    : uniqueSectionGames;

  for (const { section, game } of selectedGames) {
    const providerSegment = sanitizeSegment(game.provider?.term, "unknown-provider");
    const gameSegment = sanitizeSegment(game.term, `game-${game.id ?? "unknown"}`);
    const gameDir = path.join(OUTPUT_ROOT, section.typeDir, providerSegment, gameSegment);

    ensureDir(gameDir);

    const assets = buildAssets(game);
    const entry = {
      type: section.typeDir,
      subsection: section.subsection,
      provider: {
        name: game.provider?.name ?? null,
        term: game.provider?.term ?? null,
      },
      game: {
        id: game.id ?? null,
        name: game.name ?? null,
        term: game.term ?? null,
        code: game.code ?? null,
        type: game.type ?? null,
        types: game.types ?? [],
        onlyReal: Boolean(game.onlyReal),
        hasDesktop: Boolean(game.hasDesktop),
        hasMobile: Boolean(game.hasMobile),
      },
      dir: path.relative(OUTPUT_ROOT, gameDir),
      assets: assets.map((asset) => ({
        field: asset.field,
        url: asset.url,
        file: null,
        bytes: null,
        skipped: false,
      })),
    };

    manifestEntries.push(entry);

    for (const asset of assets) {
      tasks.push({
        entry,
        asset,
        destBasePath: path.join(gameDir, asset.field),
      });
    }

    fs.writeFileSync(
      path.join(gameDir, "game.json"),
      JSON.stringify({
        ...entry,
        raw: game,
      }, null, 2),
    );
  }

  await runWithConcurrency(tasks, CONCURRENCY, async (task) => {
    try {
      const result = await downloadAsset(task.asset, task.destBasePath);
      const assetEntry = task.entry.assets.find((item) => item.field === task.asset.field && item.url === task.asset.url);
      if (assetEntry) {
        assetEntry.file = path.relative(OUTPUT_ROOT, result.filePath);
        assetEntry.bytes = result.bytes;
        assetEntry.skipped = result.skipped;
      }
    } catch (error) {
      errors.push({
        type: task.entry.type,
        provider: task.entry.provider.term,
        game: task.entry.game.term,
        field: task.asset.field,
        url: task.asset.url,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  });

  for (const entry of manifestEntries) {
    const gameDir = path.join(OUTPUT_ROOT, entry.dir);
    fs.writeFileSync(
      path.join(gameDir, "game.json"),
      JSON.stringify(entry, null, 2),
    );
  }

  const summary = manifestEntries.reduce((acc, entry) => {
    acc.byType[entry.type] ??= { games: 0, assets: 0 };
    acc.byType[entry.type].games += 1;
    acc.byType[entry.type].assets += entry.assets.length;
    acc.totalGames += 1;
    acc.totalAssets += entry.assets.length;
    return acc;
  }, {
    generatedAt: new Date().toISOString(),
    totalGames: 0,
    totalAssets: 0,
    failedAssets: errors.length,
    byType: {},
  });

  const manifest = {
    summary,
    selection: {
      source: MAX_GAMES > 0 ? MAIN_PAGE_URL : "all-sections",
      requestedMaxGames: MAX_GAMES,
      collectedPopularTerms: popularTerms.length,
      selectedGames: manifestEntries.length,
      missingTerms,
    },
    sections: sectionPayloads.map((section) => ({
      subsection: section.subsection,
      typeDir: section.typeDir,
      gameSectionTerm: section.gameSectionTerm,
      totalGamesFromApi: section.totalGames,
      downloadedGames: manifestEntries.filter((entry) => entry.type === section.typeDir).length,
    })),
    entries: manifestEntries,
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
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
