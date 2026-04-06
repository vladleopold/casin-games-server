import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

import { buildBeplayLocationParams, getBeplayConfig } from "../lib/beplay-configs.mjs";

function parseArgs(argv) {
  const args = {
    host: "127.0.0.1",
    port: "8082",
    game: "tiger-s-prosperity",
    outputDir: path.join(process.cwd(), "output", "beplay-smoke"),
  };

  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--host" && next) {
      args.host = next;
      index += 1;
    } else if (arg === "--port" && next) {
      args.port = next;
      index += 1;
    } else if (arg === "--game" && next) {
      args.game = next;
      index += 1;
    } else if (arg === "--output-dir" && next) {
      args.outputDir = path.resolve(next);
      index += 1;
    }
  }

  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const config = getBeplayConfig(args.game);
  if (!config) {
    throw new Error(`Unknown BePlay game: ${args.game}`);
  }

  fs.mkdirSync(args.outputDir, { recursive: true });
  const baseUrl = `http://${args.host}:${args.port}`;
  const launchUrl = `${baseUrl}/beplay/location?${buildBeplayLocationParams(config).toString()}`;
  const events = [];

  const browser = await chromium.launch({
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith(baseUrl) && (/\/api\/config$/.test(url) || /\/beplay\/api\//.test(url))) {
      events.push({
        type: "request",
        method: request.method(),
        url,
      });
    }
  });

  page.on("response", async (response) => {
    const url = response.url();
    if (url.startsWith(baseUrl) && (/\/api\/config$/.test(url) || /\/beplay\/api\//.test(url))) {
      events.push({
        type: "response",
        status: response.status(),
        url,
      });
    }
  });

  try {
    await page.goto(launchUrl, { waitUntil: "networkidle", timeout: 90000 });
    await page.locator(".soundPermissionDecline").click({ force: true });
    await page.waitForTimeout(500);
    await page.locator(".start-button").click({ force: true });
    await page.waitForTimeout(12000);
    await page.screenshot({ path: path.join(args.outputDir, `${args.game}.png`) });

    const required = [
      `${baseUrl}/api/config`,
      `${baseUrl}/beplay/api/authenticate`,
      `${baseUrl}/beplay/api/game/info`,
      `${baseUrl}/beplay/api/game/recover`,
    ];

    const seenUrls = new Set(events.map((event) => event.url));
    const missing = required.filter((url) => !seenUrls.has(url));
    const summary = {
      launchUrl,
      game: args.game,
      eventCount: events.length,
      missing,
      events,
    };

    fs.writeFileSync(path.join(args.outputDir, `${args.game}.json`), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));

    if (missing.length) {
      throw new Error(`Missing expected proxied requests: ${missing.join(", ")}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
