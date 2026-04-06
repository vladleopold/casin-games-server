import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const PAGE_URL = "https://slotcity.ua/game-hall/recommended";
const API_ROOT = "https://slotcity.ua/apiv2/games/demo";
const OUTPUT_DIR = path.join(process.cwd(), "output", "recommended-games");
const CATALOG_PATH = path.join(OUTPUT_DIR, "catalog.json");
const SUMMARY_PATH = path.join(OUTPUT_DIR, "summary.json");

function classifyLaunchUrl(launchUrl) {
  if (!launchUrl) {
    return {
      adapterGuess: "unknown",
      launchHost: null,
      launchPath: null,
    };
  }

  let parsed;
  try {
    parsed = new URL(launchUrl);
  } catch {
    return {
      adapterGuess: "unknown",
      launchHost: null,
      launchPath: null,
    };
  }

  const host = parsed.hostname;
  const launchPath = parsed.pathname;
  let adapterGuess = "unsupported";

  if (/3oaks/i.test(host) || /3oaks/i.test(launchPath)) {
    adapterGuess = "three_oaks";
  } else if (/xw1n\.net$/i.test(host) || /WebEngine\.php/i.test(launchPath)) {
    adapterGuess = "xw1n_webengine";
  } else if (/beplay/i.test(host)) {
    adapterGuess = "beplay_remote";
  } else if (/amusnet/i.test(host)) {
    adapterGuess = "amusnet_remote";
  }

  return {
    adapterGuess,
    launchHost: host,
    launchPath,
  };
}

async function fetchDemoMetadata(slug) {
  const url = new URL(API_ROOT);
  url.searchParams.set("term", slug);
  url.searchParams.set("language", "uk");
  url.searchParams.set("check_limits", "1");
  url.searchParams.set("version", "desktop");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Demo API failed for ${slug}: ${response.status}`);
  }

  return response.json();
}

async function collectSlugs() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto(PAGE_URL, { waitUntil: "networkidle", timeout: 90000 });
    const slugs = await page.$$eval('a[href*="/game/"]', (anchors) => (
      anchors
        .map((anchor) => {
          try {
            const url = new URL(anchor.href, window.location.href);
            const match = url.pathname.match(/^\/game\/([^/?#]+)/);
            return match ? match[1] : null;
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    ));

    return [...new Set(slugs)].sort();
  } finally {
    await browser.close();
  }
}

function buildSummary(catalog) {
  const byProvider = {};
  const byAdapterGuess = {};

  for (const item of catalog) {
    byProvider[item.providerTerm] ??= { count: 0, providers: new Set() };
    byProvider[item.providerTerm].count += 1;
    byProvider[item.providerTerm].providers.add(item.provider);

    byAdapterGuess[item.adapterGuess] ??= 0;
    byAdapterGuess[item.adapterGuess] += 1;
  }

  return {
    generatedAt: new Date().toISOString(),
    totalGames: catalog.length,
    providers: Object.entries(byProvider)
      .map(([providerTerm, data]) => ({
        providerTerm,
        displayProviders: [...data.providers].sort(),
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count || a.providerTerm.localeCompare(b.providerTerm)),
    adapterGuesses: Object.entries(byAdapterGuess)
      .map(([adapterGuess, count]) => ({ adapterGuess, count }))
      .sort((a, b) => b.count - a.count || a.adapterGuess.localeCompare(b.adapterGuess)),
  };
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const slugs = await collectSlugs();
  const catalog = [];

  for (const slug of slugs) {
    const demo = await fetchDemoMetadata(slug);
    const launch = classifyLaunchUrl(demo.url);

    catalog.push({
      slug,
      name: demo.name ?? null,
      provider: demo.provider ?? null,
      providerTerm: demo.providerTerm ?? null,
      onlyReal: Boolean(demo.onlyReal),
      iframe: demo.iframe ?? null,
      demoUrl: demo.url ?? null,
      ...launch,
    });
  }

  const summary = buildSummary(catalog);
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
  fs.writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2));

  console.log(JSON.stringify({
    pageUrl: PAGE_URL,
    totalGames: summary.totalGames,
    adapterGuesses: summary.adapterGuesses,
    catalogPath: CATALOG_PATH,
    summaryPath: SUMMARY_PATH,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
