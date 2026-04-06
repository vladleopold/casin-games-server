const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const OUTPUT_DIR = path.join(process.cwd(), "output", "web-game", "live-debug");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const responses = [];
  const pageErrors = [];
  const consoleLogs = [];

  const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
  const context = browser.contexts()[0];
  const page = context.pages()[0];
  let sessionId = null;

  page.on("response", async (response) => {
    if (!response.url().includes("/skvCore/WebEngine.php")) return;
    const text = await response.text().catch(() => "");
    const match = text.match(/session="(\d+)"/);
    if (match) sessionId = match[1];
    responses.push(text);
  });
  page.on("pageerror", (error) => {
    pageErrors.push(String(error && error.stack ? error.stack : error));
  });
  page.on("console", (msg) => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });

  await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 1280, height: 720 });
  await sleep(5000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "01-home.png") });

  await page.mouse.click(640, 640);
  await sleep(3500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, "02-main.png") });

  for (let spin = 1; spin <= 20; spin += 1) {
    await page.mouse.click(1145, 315);
    await sleep(3200);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `spin-${String(spin).padStart(2, "0")}.png`) });
    if (responses.slice(-3).some((entry) => entry.includes('status="bonus"'))) {
      break;
    }
  }

  if (!responses.some((entry) => entry.includes('status="bonus"'))) {
    throw new Error("Bonus did not trigger during debug run");
  }

  if (!sessionId) {
    throw new Error("Session ID was not captured from engine responses");
  }

  for (let step = 1; step <= 6; step += 1) {
    await page.mouse.click(640, 640);
    await sleep(1800);
    await page.keyboard.press("Space");
    await sleep(1500);
    await page.keyboard.press("Enter");
    await sleep(1500);
    if (responses.some((entry) => entry.includes('command="bonus"') && entry.includes('status="ok"'))) {
      break;
    }
  }

  await page.screenshot({ path: path.join(OUTPUT_DIR, "03-bonus-before-spin.png") });

  const directBonusResponse = await page.evaluate(async (activeSessionId) => {
    const response = await fetch(`/skvCore/WebEngine.php?command=bonus&session=${activeSessionId}&rnd=${Date.now()}`, {
      method: "POST",
    });
    return await response.text();
  }, sessionId);

  await page.mouse.click(1160, 312);
  await sleep(5000);

  await page.screenshot({ path: path.join(OUTPUT_DIR, "04-bonus-after-spin.png") });

  fs.writeFileSync(path.join(OUTPUT_DIR, "direct-bonus-response.xml"), directBonusResponse);
  fs.writeFileSync(path.join(OUTPUT_DIR, "responses.json"), JSON.stringify(responses, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, "pageerrors.json"), JSON.stringify(pageErrors, null, 2));
  fs.writeFileSync(path.join(OUTPUT_DIR, "console.json"), JSON.stringify(consoleLogs, null, 2));

  console.log(JSON.stringify({
    responses: responses.length,
    sessionId,
    directBonusResponse,
    lastResponses: responses.slice(-6),
    pageErrors,
    consoleLogs: consoleLogs.slice(-20),
  }, null, 2));

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
