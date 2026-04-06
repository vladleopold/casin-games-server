const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { chromium } = require("playwright");

const GAME_URL = "http://127.0.0.1:8080/wolf_power_ps/";
const SESSIONS_PATH = path.join(process.cwd(), ".wolf-sessions.json");
const OUTPUT_DIR = path.join(process.cwd(), "output", "web-game", "wolf-flow-debug");
const HEADLESS = process.env.HEADLESS !== "0";

const HOME_PLAY = { x: 640, y: 640 };
const MAIN_SPIN = { x: 1145, y: 315 };
const BONUS_TAP = { x: 640, y: 640 };
const BONUS_ACTION = { x: 1160, y: 312 };

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readSessionState(sessionId) {
  try {
    const sessions = JSON.parse(fs.readFileSync(SESSIONS_PATH, "utf8"));
    const match = sessions.find(([id]) => id === sessionId);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

async function shot(page, name) {
  const canvas = page.locator("canvas").first();
  const filePath = path.join(OUTPUT_DIR, name);
  try {
    await canvas.screenshot({ path: filePath });
  } catch {
    await page.screenshot({ path: filePath });
  }
  return crypto.createHash("sha1").update(fs.readFileSync(filePath)).digest("hex");
}

async function tap(page, point, waitMs) {
  await page.touchscreen.tap(point.x, point.y);
  await sleep(waitMs);
}

async function press(page, key, waitMs) {
  await page.keyboard.press(key);
  await sleep(waitMs);
}

function hasRecentBonusRound(responses, from) {
  return responses.slice(from).some((entry) => entry.includes('command="bonus"') && entry.includes('status="bonus"'));
}

async function main() {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const consoleLogs = [];
  const pageErrors = [];
  const responses = [];
  const shots = [];
  let sessionId = null;

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
    if (!response.url().includes("/WebEngine.php")) return;
    const text = await response.text().catch(() => "");
    const sessionMatch = text.match(/session="([^"]+)"/);
    if (sessionMatch) sessionId = sessionMatch[1];
    responses.push(text);
  });

  try {
    await page.goto(GAME_URL, { waitUntil: "networkidle" });
    await sleep(7000);
    shots.push(await shot(page, "01-home.png"));

    await tap(page, HOME_PLAY, 4000);
    shots.push(await shot(page, "02-after-play.png"));

    for (let spin = 1; spin <= 4; spin += 1) {
      const from = responses.length;
      await tap(page, MAIN_SPIN, 4500);
      shots.push(await shot(page, `spin-${String(spin).padStart(2, "0")}.png`));

      if (hasRecentBonusRound(responses, from)) {
        break;
      }

      if (spin === 1 && responses.slice(from).length === 0) {
        await tap(page, HOME_PLAY, 2500);
        await tap(page, MAIN_SPIN, 4500);
        shots.push(await shot(page, "spin-01-retry.png"));
      }
    }

    for (let i = 0; i < 6; i += 1) {
      const from = responses.length;
      await tap(page, BONUS_TAP, 1800);
      shots.push(await shot(page, `bonus-tap-${i + 1}.png`));
      if (hasRecentBonusRound(responses, from)) break;

      await press(page, "Space", 1800);
      shots.push(await shot(page, `bonus-space-${i + 1}.png`));
      if (hasRecentBonusRound(responses, from)) break;

      await press(page, "Enter", 1800);
      shots.push(await shot(page, `bonus-enter-${i + 1}.png`));
      if (hasRecentBonusRound(responses, from)) break;
    }

    for (let spin = 1; spin <= 4; spin += 1) {
      const from = responses.length;
      await tap(page, BONUS_ACTION, 3500);
      shots.push(await shot(page, `bonus-spin-${spin}.png`));
      if (hasRecentBonusRound(responses, from)) {
        continue;
      }
      await press(page, "Space", 2000);
      shots.push(await shot(page, `bonus-spin-${spin}-space.png`));
    }

    await sleep(4000);
    shots.push(await shot(page, "99-final.png"));
  } finally {
    fs.writeFileSync(path.join(OUTPUT_DIR, "console.json"), JSON.stringify(consoleLogs, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, "pageerrors.json"), JSON.stringify(pageErrors, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, "responses.json"), JSON.stringify(responses, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, "shots.json"), JSON.stringify(shots, null, 2));
    fs.writeFileSync(
      path.join(OUTPUT_DIR, "summary.json"),
      JSON.stringify(
        {
          sessionId,
          pageErrorCount: pageErrors.length,
          responseCount: responses.length,
          finalSessionState: sessionId ? readSessionState(sessionId) : null,
        },
        null,
        2
      )
    );
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
