const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { chromium } = require("playwright");

const BASE_URL = "http://127.0.0.1:8080";
const HEADLESS = process.env.HEADLESS !== "0";

const POINTS = {
  homeTap: { x: 640, y: 640 },
  spin: { x: 1145, y: 315 },
  bonus: { x: 1160, y: 312 },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseArgs(argv) {
  const args = {
    game: null,
    feature: null,
    outputRoot: path.join(process.cwd(), "output", "web-game", "seeded-flow"),
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--game" && next) {
      args.game = next;
      i += 1;
    } else if (arg === "--feature" && next) {
      args.feature = next;
      i += 1;
    } else if (arg === "--output-root" && next) {
      args.outputRoot = path.resolve(next);
      i += 1;
    }
  }

  if (!args.game || !args.feature) {
    throw new Error("--game and --feature are required");
  }

  return args;
}

async function capture(page, outputDir, name) {
  const filePath = path.join(outputDir, name);
  const canvas = page.locator("canvas").first();
  try {
    await canvas.screenshot({ path: filePath });
  } catch {
    await page.screenshot({ path: filePath });
  }
  const sha1 = crypto.createHash("sha1").update(fs.readFileSync(filePath)).digest("hex");
  return { filePath, sha1 };
}

async function tap(page, point, waitMs) {
  await page.touchscreen.tap(point.x, point.y);
  await sleep(waitMs);
}

async function press(page, key, waitMs) {
  await page.keyboard.press(key);
  await sleep(waitMs);
}

async function createSeededSession(game, feature) {
  const url = `${BASE_URL}/admin/debug-session?game=${encodeURIComponent(game)}&feature=${encodeURIComponent(feature)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Debug session bootstrap failed: ${response.status}`);
  }
  return response.json();
}

async function loadSnapshot(game, sessionId) {
  const url = `${BASE_URL}/admin/session?game=${encodeURIComponent(game)}&id=${encodeURIComponent(sessionId)}`;
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

function expectedMode(feature) {
  return feature === "fs" ? "fs" : "bonus";
}

function mainActionPoint(feature) {
  return feature === "fs" ? POINTS.spin : POINTS.bonus;
}

async function run() {
  const args = parseArgs(process.argv);
  const outputDir = path.join(args.outputRoot, `${args.game}-${args.feature}`);
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const seeded = await createSeededSession(args.game, args.feature);
  const responses = [];
  const consoleLogs = [];
  const pageErrors = [];
  const shots = [];

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
    responses.push(await response.text().catch(() => ""));
  });

  try {
    await page.goto(`${BASE_URL}/admin/debug-session?game=${args.game}&feature=${args.feature}&redirect=1`, {
      waitUntil: "networkidle",
    }).catch(() => {});
    await sleep(5000);
    shots.push(await capture(page, outputDir, "01-load.png"));

    await tap(page, POINTS.homeTap, 1800);
    shots.push(await capture(page, outputDir, "02-after-center-tap.png"));

    await press(page, "Space", 1500);
    shots.push(await capture(page, outputDir, "03-after-space.png"));

    await tap(page, mainActionPoint(args.feature), 2500);
    shots.push(await capture(page, outputDir, "04-after-main-action.png"));

    const cookies = await context.cookies(BASE_URL);
    const sessionCookie = cookies.find((cookie) => cookie.name === seeded.cookie.name);
    const liveSessionId = sessionCookie?.value ?? seeded.sessionId;
    const snapshot = await loadSnapshot(args.game, liveSessionId);
    const matched = responses.some((xml) => xml.includes(`current_state="${expectedMode(args.feature)}"`));

    fs.writeFileSync(path.join(outputDir, "responses.json"), JSON.stringify(responses, null, 2));
    fs.writeFileSync(path.join(outputDir, "console.json"), JSON.stringify(consoleLogs, null, 2));
    fs.writeFileSync(path.join(outputDir, "pageerrors.json"), JSON.stringify(pageErrors, null, 2));
    fs.writeFileSync(path.join(outputDir, "shots.json"), JSON.stringify(shots, null, 2));
    fs.writeFileSync(
      path.join(outputDir, "summary.json"),
      JSON.stringify(
        {
          seededSessionId: seeded.sessionId,
          liveSessionId,
          game: args.game,
          feature: args.feature,
          expectedMode: expectedMode(args.feature),
          responseCount: responses.length,
          matchedExpectedMode: matched,
          pageErrorCount: pageErrors.length,
          consoleErrorCount: consoleLogs.filter((entry) => entry.startsWith("[error]")).length,
          snapshot,
        },
        null,
        2
      )
    );

    console.log(JSON.stringify({
      game: args.game,
      feature: args.feature,
      sessionId: liveSessionId,
      responseCount: responses.length,
      matchedExpectedMode: matched,
      pageErrorCount: pageErrors.length,
    }, null, 2));
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
