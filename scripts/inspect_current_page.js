const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const OUTPUT_DIR = path.join(process.cwd(), "output", "web-game", "inspect-current");

async function main() {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
  const context = browser.contexts()[0];
  const page = context.pages()[0];

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.screenshot({ path: path.join(OUTPUT_DIR, "page.png") });

  const payload = await page.evaluate(() => {
    const app = window && window.app ? window.app : null;
    const game = app && app.game ? app.game : null;
    return {
      href: location.href,
      title: document.title,
      hasCanvas: !!document.querySelector("canvas"),
      bodyText: document.body ? document.body.innerText.slice(0, 1000) : "",
      gameState: game && game.clientData ? {
        spinAvailable: game.spinAvailable,
        spinInProgress: game.spinInProgress,
        balance: game.balance,
        bonusActive: game.bonusActive,
        freespinsActive: game.freespinsActive,
        mode: game.current && game.current.bonus ? "bonus-screen-present" : "unknown",
      } : null,
    };
  });

  fs.writeFileSync(path.join(OUTPUT_DIR, "payload.json"), JSON.stringify(payload, null, 2));
  console.log(JSON.stringify(payload, null, 2));
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
