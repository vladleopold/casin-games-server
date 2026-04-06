import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

import { buildBeplayLocationParams, getBeplayConfig } from "../lib/beplay-configs.mjs";

function parseArgs(argv) {
  const args = {
    host: "127.0.0.1",
    port: "8082",
    game: "tiger-s-prosperity",
    forceAction: "",
    forceBet: "",
    outputDir: path.join(process.cwd(), "output", "beplay-first-spin"),
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
    } else if (arg === "--force-action" && next) {
      args.forceAction = next;
      index += 1;
    } else if (arg === "--force-bet" && next) {
      args.forceBet = next;
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

async function main() {
  const args = parseArgs(process.argv);
  const config = getBeplayConfig(args.game);
  if (!config) {
    throw new Error(`Unknown BePlay game: ${args.game}`);
  }

  const outputDir = path.join(args.outputDir, args.game);
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const baseUrl = `http://${args.host}:${args.port}`;
  const params = buildBeplayLocationParams(config);
  if (args.forceAction) {
    params.set("forceAction", args.forceAction);
  }
  if (args.forceBet) {
    params.set("forceBet", args.forceBet);
  }
  const launchUrl = `${baseUrl}/beplay/location?${params.toString()}`;
  const events = [];

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    hasTouch: true,
  });
  const page = await context.newPage();

  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith(`${baseUrl}/beplay/api/`)) {
      events.push({
        type: "request",
        method: request.method(),
        url,
        postData: request.postData() || null,
        at: Date.now(),
      });
    }
  });

  page.on("response", async (response) => {
    const url = response.url();
    if (url.startsWith(`${baseUrl}/beplay/api/`)) {
      events.push({
        type: "response",
        status: response.status(),
        url,
        body: (await response.text().catch(() => "")).slice(0, 4000),
        at: Date.now(),
      });
    }
  });

  page.on("pageerror", (error) => {
    events.push({
      type: "pageerror",
      text: String(error?.stack ?? error),
      at: Date.now(),
    });
  });

  try {
    await page.goto(launchUrl, { waitUntil: "networkidle", timeout: 90000 });
    await page.locator(".soundPermissionDecline").click({ force: true }).catch(() => {});
    await wait(1000);

    for (let i = 0; i < 3; i += 1) {
      await page.locator(".start-button").click({ force: true }).catch(() => {});
      await page.touchscreen.tap(720, 850);
      await wait(2500);
    }

    await wait(8000);
    await page.screenshot({ path: path.join(outputDir, "01-ready.png") });

    const actions = [
      () => page.touchscreen.tap(1260, 435),
      () => page.touchscreen.tap(1260, 435),
      () => page.keyboard.press("Space"),
      () => page.keyboard.press("Enter"),
      () => page.mouse.click(1260, 435),
      () => page.touchscreen.tap(1260, 435),
    ];

    let playDetected = false;
    for (let index = 0; index < actions.length; index += 1) {
      await actions[index]().catch(() => {});
      await wait(4000);
      await page.screenshot({ path: path.join(outputDir, `${String(index + 2).padStart(2, "0")}-action.png`) });
      playDetected = events.some((event) => event.url?.includes("/game/play"));
      if (playDetected) {
        break;
      }
    }

    if (playDetected) {
      for (let index = 0; index < 12; index += 1) {
        const completeSeen = events.some((event) => event.url?.includes("/game/complete"));
        if (completeSeen) {
          break;
        }
        await wait(1000);
      }

      for (let index = 0; index < 6; index += 1) {
        const completeSeen = events.some((event) => event.url?.includes("/game/complete"));
        if (completeSeen) {
          break;
        }

        await page.touchscreen.tap(1260, 435).catch(() => {});
        await wait(3000);
        await page.screenshot({ path: path.join(outputDir, `complete-${index + 1}.png`) });
      }
    }

    await wait(4000);
    await page.screenshot({ path: path.join(outputDir, "99-final.png") });

    const summary = {
      launchUrl,
      game: args.game,
      playRequestCount: events.filter((event) => event.type === "request" && event.url?.includes("/game/play")).length,
      playResponseCount: events.filter((event) => event.type === "response" && event.url?.includes("/game/play")).length,
      completeRequestCount: events.filter((event) => event.type === "request" && event.url?.includes("/game/complete")).length,
      completeResponseCount: events.filter((event) => event.type === "response" && event.url?.includes("/game/complete")).length,
      pageErrors: events.filter((event) => event.type === "pageerror").length,
      forcedAction: args.forceAction || null,
      forcedBet: args.forceBet || null,
      bodyText: await page.evaluate(() => document.body.innerText.slice(0, 1000)),
      playRequest: events.find((event) => event.type === "request" && event.url?.includes("/game/play")) ?? null,
      playResponse: events.find((event) => event.type === "response" && event.url?.includes("/game/play")) ?? null,
      completeRequest: events.find((event) => event.type === "request" && event.url?.includes("/game/complete")) ?? null,
      completeResponse: events.find((event) => event.type === "response" && event.url?.includes("/game/complete")) ?? null,
    };

    fs.writeFileSync(path.join(outputDir, "events.json"), JSON.stringify(events, null, 2));
    fs.writeFileSync(path.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));

    if (!summary.playRequestCount) {
      throw new Error("No /game/play request detected");
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
