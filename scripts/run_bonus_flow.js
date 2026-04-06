const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { chromium } = require("playwright");

const GAME_URL = "http://127.0.0.1:8080";
const SESSIONS_PATH = path.join(process.cwd(), ".energy-sessions.json");
const OUTPUT_ROOT = path.join(process.cwd(), "output", "web-game", "flow-run");
const HEADLESS = process.env.HEADLESS !== "0";

const HOME_PLAY = { x: 640, y: 640 };
const MAIN_SPIN = { x: 1145, y: 315 };
const BONUS_TAP = { x: 640, y: 640 };
const BONUS_ACTION = { x: 1160, y: 312 };

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resetOutputRoot() {
  fs.rmSync(OUTPUT_ROOT, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
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

async function capture(page, outputDir, name) {
  const filePath = path.join(outputDir, name);
  const canvas = page.locator("canvas").first();
  try {
    await canvas.screenshot({ path: filePath });
  } catch {
    await page.screenshot({ path: filePath });
  }
  const hash = crypto.createHash("sha1").update(fs.readFileSync(filePath)).digest("hex");
  return { filePath, hash };
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

async function tapSequence(page, point, count, waitMs) {
  for (let i = 0; i < count; i += 1) {
    await tap(page, point, waitMs);
  }
}

function assertNoStall(recentShots) {
  if (recentShots.length < 3) return;
  const [a, b, c] = recentShots.slice(-3);
  if (a.hash === b.hash && b.hash === c.hash) {
    throw new Error(`Detected stalled flow: three identical screenshots (${path.basename(c.filePath)})`);
  }
}

async function waitForSessionState(sessionId, predicate, timeoutMs, label) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const state = readSessionState(sessionId);
    if (state && predicate(state)) {
      return state;
    }
    await sleep(200);
  }
  throw new Error(`Timed out waiting for ${label}`);
}

async function runAttempt(attempt) {
  const outputDir = path.join(OUTPUT_ROOT, `attempt-${attempt}`);
  fs.mkdirSync(outputDir, { recursive: true });
  const responses = [];
  let sessionId = null;
  let bonusTriggerIndex = null;
  const recentShots = [];

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

  page.on("response", async (response) => {
    if (!response.url().includes("/skvCore/WebEngine.php")) return;
    const text = await response.text().catch(() => "");
    const sessionMatch = text.match(/session="(\d+)"/);
    if (sessionMatch) sessionId = sessionMatch[1];
    responses.push({
      at: Date.now(),
      text,
      isBonusTrigger: text.includes('status="bonus"'),
      isBonusRound: text.includes('command="bonus"') && text.includes('status="ok"'),
      isMainSpin: text.includes('<spin_cmd command="bet"') && text.includes('status="ok"'),
      isNext: text.includes('<spin_cmd command="next"'),
    });
  });

  await page.goto(GAME_URL, { waitUntil: "networkidle" });
  await sleep(6000);
  recentShots.push(await capture(page, outputDir, "01-home.png"));
  assertNoStall(recentShots);

  await tap(page, HOME_PLAY, 3500);
  recentShots.push(await capture(page, outputDir, "02-main-ready.png"));
  assertNoStall(recentShots);

  for (let spin = 1; spin <= 30; spin += 1) {
    const before = responses.length;
    await tap(page, MAIN_SPIN, 3200);
    recentShots.push(await capture(page, outputDir, `spin-${String(spin).padStart(2, "0")}.png`));
    assertNoStall(recentShots);
    const recent = responses.slice(before);
    if (recent.some((entry) => entry.isBonusTrigger)) {
      bonusTriggerIndex = spin;
      break;
    }
    if (!recent.some((entry) => entry.isMainSpin || entry.isNext)) {
      if (spin === 1) {
        await tap(page, HOME_PLAY, 2500);
        await tap(page, MAIN_SPIN, 3200);
        recentShots.push(await capture(page, outputDir, "spin-01-retry.png"));
        assertNoStall(recentShots);
        const retryRecent = responses.slice(before);
        if (retryRecent.some((entry) => entry.isBonusTrigger)) {
          bonusTriggerIndex = spin;
          break;
        }
        if (retryRecent.some((entry) => entry.isMainSpin || entry.isNext)) {
          continue;
        }
      }
      throw new Error(`Input did not register on main spin ${spin}`);
    }
  }

  if (bonusTriggerIndex === null) {
    throw new Error("Bonus did not trigger within 30 spins");
  }
  if (!sessionId) {
    throw new Error("Could not determine active session ID");
  }

  recentShots.push(await capture(page, outputDir, "03-bonus-trigger.png"));
  assertNoStall(recentShots);

  const waitForBonusRound = async (timeoutMs) => {
    const start = responses.length;
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
      const recent = responses.slice(start);
      if (recent.some((entry) => entry.isBonusRound)) {
        return true;
      }
      await sleep(250);
    }
    return false;
  };

  await waitForSessionState(sessionId, (state) => state.bonusActive === true, 5000, "bonus activation");

  let introResolved = false;
  for (let i = 0; i < 6; i += 1) {
    if (await waitForBonusRound(1200)) {
      introResolved = true;
      break;
    }

    await tap(page, BONUS_TAP, 1800);
    recentShots.push(await capture(page, outputDir, `04-intro-tap-${i + 1}.png`));
    assertNoStall(recentShots);
    if (await waitForBonusRound(1200)) {
      introResolved = true;
      break;
    }

    await pressSpace(page, 1500);
    recentShots.push(await capture(page, outputDir, `05-intro-space-${i + 1}.png`));
    assertNoStall(recentShots);
    if (await waitForBonusRound(1200)) {
      introResolved = true;
      break;
    }

    await pressEnter(page, 1500);
    recentShots.push(await capture(page, outputDir, `06-intro-enter-${i + 1}.png`));
    assertNoStall(recentShots);
  }

  await sleep(3000);
  recentShots.push(await capture(page, outputDir, "07-bonus-ready.png"));
  assertNoStall(recentShots);

  let bonusActionCount = 0;
  for (; bonusActionCount < 30; bonusActionCount += 1) {
    let roundStarted = await waitForBonusRound(3000);
    if (!roundStarted) {
      await pressSpace(page, 1800);
      roundStarted = await waitForBonusRound(4000);
    }
    if (!roundStarted) {
      await tap(page, BONUS_TAP, 1800);
      roundStarted = await waitForBonusRound(3000);
    }
    if (!roundStarted) {
      await pressEnter(page, 1500);
      roundStarted = await waitForBonusRound(3000);
    }
    if (!roundStarted) {
      await tap(page, BONUS_ACTION, 1800);
      roundStarted = await waitForBonusRound(6000);
    }
    recentShots.push(await capture(page, outputDir, `bonus-${String(bonusActionCount + 1).padStart(2, "0")}.png`));
    assertNoStall(recentShots);
    const state = readSessionState(sessionId);

    if (state && state.bonusActive === false) {
      break;
    }

    if (!roundStarted) {
      await sleep(3000);
    }
  }

  const finishedBonusState = await waitForSessionState(
    sessionId,
    (state) => state.bonusActive === false,
    5000,
    "bonus completion"
  );

  await sleep(2500);
  recentShots.push(await capture(page, outputDir, "06-after-bonus.png"));
  assertNoStall(recentShots);

  await tap(page, MAIN_SPIN, 3200);
  recentShots.push(await capture(page, outputDir, "07-main-spin-after-bonus.png"));
  assertNoStall(recentShots);
  await tap(page, BONUS_TAP, 1200);

  const finalState = readSessionState(sessionId);
  const summary = {
    sessionId,
    bonusTriggerSpin: bonusTriggerIndex,
    bonusActionCount: bonusActionCount + 1,
    bonusWin: finishedBonusState.bonusWin,
    balanceAfterBonus: finishedBonusState.balance,
    finalBalance: finalState ? finalState.balance : null,
    bonusClosed: finalState ? finalState.bonusActive === false : null,
    responseCount: responses.length,
    attempt,
  };

  fs.writeFileSync(path.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));

  await browser.close();
}

async function main() {
  resetOutputRoot();
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await runAttempt(attempt);
      return;
    } catch (error) {
      lastError = error;
      fs.writeFileSync(
        path.join(OUTPUT_ROOT, `attempt-${attempt}-error.txt`),
        String(error && error.stack ? error.stack : error)
      );
    }
  }
  throw lastError;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
