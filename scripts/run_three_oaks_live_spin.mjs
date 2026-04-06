import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const PRESETS = {
  "3oaksgaming-aztec-sun": {
    warningButtonText: "ОК",
    splashTap: { x: 720, y: 785 },
    spinTap: { x: 1305, y: 455 },
  },
};

function parseArgs(argv) {
  const args = {
    host: "127.0.0.1",
    port: "8083",
    slug: "3oaksgaming-aztec-sun",
    outputDir: path.join(process.cwd(), "output", "three-oaks-live-spin"),
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
    } else if (arg === "--slug" && next) {
      args.slug = next;
      index += 1;
    } else if (arg === "--output-dir" && next) {
      args.outputDir = path.resolve(next);
      index += 1;
    }
  }

  return args;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isGameRequest(url) {
  return /betman\.c1\.3oaks\.com\/slotscity-prod-axis\/gs\//i.test(url)
    || /\/three-oaks\/live\/[^/]+\/proxy\/slotscity-prod-axis\/gs\//i.test(url);
}

function isSpinRequest(event) {
  return event.type === "request" && /"name":"spin"/.test(event.postData ?? "");
}

async function waitForThreeOaksFrame(page, timeoutMs) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const frame = page.frames().find((entry) => entry.url().includes("betman.c1.3oaks.com"));
    if (frame) {
      return frame;
    }
    await wait(500);
  }
  return null;
}

async function main() {
  const args = parseArgs(process.argv);
  const preset = PRESETS[args.slug];
  if (!preset) {
    throw new Error(`No UI preset for ${args.slug}`);
  }

  const outputDir = path.join(args.outputDir, args.slug);
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const launchUrl = `http://${args.host}:${args.port}/three-oaks/live/${encodeURIComponent(args.slug)}`;
  const events = [];
  const browser = await chromium.launch({
    headless: process.env.HEADLESS !== "0",
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  page.on("request", (request) => {
    if (!isGameRequest(request.url())) {
      return;
    }

    events.push({
      type: "request",
      method: request.method(),
      url: request.url(),
      postData: request.postData() ?? null,
      at: Date.now(),
    });
  });

  page.on("response", async (response) => {
    if (!isGameRequest(response.url())) {
      return;
    }

    events.push({
      type: "response",
      status: response.status(),
      url: response.url(),
      body: (await response.text().catch(() => "")).slice(0, 8000),
      at: Date.now(),
    });
  });

  page.on("pageerror", (error) => {
    events.push({
      type: "pageerror",
      text: String(error?.stack ?? error),
      at: Date.now(),
    });
  });

  try {
    await page.goto(launchUrl, { waitUntil: "domcontentloaded", timeout: 90000 });
    const frame = await waitForThreeOaksFrame(page, 45000);
    const target = frame ?? page;

    await target.getByRole("button", { name: preset.warningButtonText }).click({ timeout: 20000 }).catch(() => {});
    await wait(12000);
    await page.screenshot({ path: path.join(outputDir, "01-warning-dismissed.png") });

    await page.mouse.click(preset.splashTap.x, preset.splashTap.y);
    await wait(12000);
    await page.screenshot({ path: path.join(outputDir, "02-ready.png") });

    const requestCountBeforeSpin = events.length;
    await page.mouse.click(preset.spinTap.x, preset.spinTap.y);
    await wait(7000);
    await page.screenshot({ path: path.join(outputDir, "03-after-spin.png") });

    const spinEvents = events.slice(requestCountBeforeSpin).filter(isSpinRequest);
    const spinResponses = events.slice(requestCountBeforeSpin).filter((event) => (
      event.type === "response" && /\/demo\/\?gsc=play/i.test(event.url)
    ));

    const summary = {
      launchUrl,
      slug: args.slug,
      spinTap: preset.spinTap,
      splashTap: preset.splashTap,
      spinRequestCount: spinEvents.length,
      spinResponseCount: spinResponses.length,
      firstSpinRequest: spinEvents[0] ?? null,
      firstSpinResponse: spinResponses[0] ?? null,
      pageErrors: events.filter((event) => event.type === "pageerror").length,
      finalFrameUrl: frame?.url() ?? page.url(),
    };

    fs.writeFileSync(path.join(outputDir, "events.json"), JSON.stringify(events, null, 2));
    fs.writeFileSync(path.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));

    if (!summary.spinRequestCount) {
      throw new Error("No spin request detected");
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
