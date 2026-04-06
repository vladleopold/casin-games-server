const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const GAME_URL = "http://127.0.0.1:8080";
const OUTPUT_DIR = path.join(process.cwd(), "output", "web-game", "bonus-first-spin-debug");
const HEADLESS = process.env.HEADLESS !== "0";

const HOME_PLAY = { x: 640, y: 640 };
const MAIN_SPIN = { x: 1145, y: 315 };
const BONUS_TAP = { x: 640, y: 640 };
const BONUS_ACTION = { x: 1160, y: 312 };

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function tap(page, point, waitMs) {
  await page.touchscreen.tap(point.x, point.y);
  await sleep(waitMs);
}

async function pressSpace(page, waitMs) {
  await page.keyboard.press("Space");
  await sleep(waitMs);
}

async function pressEnter(page, waitMs) {
  await page.keyboard.press("Enter");
  await sleep(waitMs);
}

function hasBonusRoundResponse(responses) {
  return responses.some((entry) => entry.includes('command="bonus"') && entry.includes('status="ok"'));
}

async function shot(page, name) {
  const canvas = page.locator("canvas").first();
  const filePath = path.join(OUTPUT_DIR, name);
  try {
    await canvas.screenshot({ path: filePath });
  } catch {
    await page.screenshot({ path: filePath });
  }
}

async function main() {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const consoleLogs = [];
  const pageErrors = [];
  const responses = [];

  const browser = await chromium.launch({
    channel: "chrome",
    headless: HEADLESS,
    args: ["--disable-gpu", "--use-angle=swiftshader"],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();

  page.on("console", (msg) => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on("pageerror", (error) => {
    pageErrors.push(String(error && error.stack ? error.stack : error));
  });
  page.on("response", async (response) => {
    if (!response.url().includes("/skvCore/WebEngine.php")) return;
    const text = await response.text().catch(() => "");
    responses.push(text);
  });

  try {
    await page.goto(GAME_URL, { waitUntil: "networkidle" });
    await sleep(6000);
    await shot(page, "01-home.png");

    await tap(page, HOME_PLAY, 3500);
    await shot(page, "02-main-ready.png");

    await tap(page, MAIN_SPIN, 3200);
    await shot(page, "03-bonus-trigger.png");

    for (let i = 0; i < 4 && !hasBonusRoundResponse(responses); i += 1) {
      await tap(page, BONUS_TAP, 1800);
      await shot(page, `04-intro-tap-${i + 1}.png`);
      if (hasBonusRoundResponse(responses)) break;

      await pressSpace(page, 1500);
      await shot(page, `05-intro-space-${i + 1}.png`);
      if (hasBonusRoundResponse(responses)) break;

      await pressEnter(page, 1500);
      await shot(page, `06-intro-enter-${i + 1}.png`);
    }

    await sleep(4000);
    await shot(page, "07-post-intro.png");

    if (!hasBonusRoundResponse(responses)) {
      await pressSpace(page, 2500);
      await shot(page, "08-force-bonus-spin.png");
    }

    await sleep(5000);
    await shot(page, "09-late-frame.png");
  } finally {
    fs.writeFileSync(path.join(OUTPUT_DIR, "console.json"), JSON.stringify(consoleLogs, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, "pageerrors.json"), JSON.stringify(pageErrors, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, "responses.json"), JSON.stringify(responses, null, 2));

    console.log(JSON.stringify({
      consoleCount: consoleLogs.length,
      pageErrorCount: pageErrors.length,
      responseCount: responses.length,
    }, null, 2));

    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
