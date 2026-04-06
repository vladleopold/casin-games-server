import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

import { buildBeplayLocationParams, getBeplayConfig } from "../lib/beplay-configs.mjs";

function parseArgs(argv) {
  const args = {
    host: "127.0.0.1",
    port: "8082",
    game: "tiger-s-prosperity",
    action: "free_spins_buy",
    bet: "50.00",
    outputDir: path.join(process.cwd(), "output", "beplay-bonus-flow"),
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
    } else if (arg === "--action" && next) {
      args.action = next;
      index += 1;
    } else if (arg === "--bet" && next) {
      args.bet = next;
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

function buildEventSummary(events, needle) {
  return {
    requestCount: events.filter((event) => event.type === "request" && event.url?.includes(needle)).length,
    responseCount: events.filter((event) => event.type === "response" && event.url?.includes(needle)).length,
    firstRequest: events.find((event) => event.type === "request" && event.url?.includes(needle)) ?? null,
    firstResponse: events.find((event) => event.type === "response" && event.url?.includes(needle)) ?? null,
  };
}

async function tapBurst(page, index, phase) {
  if (phase === "post-play") {
    if (index % 5 === 0) {
      await page.touchscreen.tap(720, 850).catch(() => {});
    } else if (index % 5 === 1) {
      await page.touchscreen.tap(720, 450).catch(() => {});
    } else if (index % 5 === 2) {
      await page.keyboard.press("Space").catch(() => {});
    } else if (index % 5 === 3) {
      await page.keyboard.press("Enter").catch(() => {});
    } else {
      await page.touchscreen.tap(1260, 435).catch(() => {});
    }
    return;
  }

  if (index % 3 === 0) {
    await page.touchscreen.tap(720, 450).catch(() => {});
  } else if (index % 3 === 1) {
    await page.touchscreen.tap(1260, 435).catch(() => {});
  } else {
    await page.keyboard.press("Space").catch(() => {});
  }
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
  params.set("forceAction", args.action);
  params.set("forceBet", args.bet);
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
        body: (await response.text().catch(() => "")).slice(0, 5000),
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
      await page.touchscreen.tap(720, 850).catch(() => {});
      await wait(2500);
    }

    await wait(6000);
    await page.screenshot({ path: path.join(outputDir, "01-ready.png") });
    console.log("phase=ready");

    for (let index = 0; index < 50; index += 1) {
      const phase = events.some((event) => event.url?.includes("/game/play")) ? "post-play" : "pre-play";
      await tapBurst(page, index, phase);
      await wait(phase === "post-play" ? 2500 : (index < 5 ? 2500 : 1500));

      if (index === 0 || index === 2 || index === 5 || index === 10 || index === 20 || index === 35 || index === 49) {
        await page.screenshot({ path: path.join(outputDir, `${String(index + 2).padStart(2, "0")}-step.png`) });
      }

      if (index === 0 || index === 5 || index === 10 || index === 20 || index === 35) {
        fs.writeFileSync(path.join(outputDir, "events.partial.json"), JSON.stringify(events, null, 2));
      }

      if (events.some((event) => event.url?.includes("/game/play"))) {
        console.log("phase=play-detected");
      }

      if (events.some((event) => event.url?.includes("/game/complete"))) {
        console.log("phase=complete-detected");
      }

      const hasFreeSpinPlay = events.some((event) => (
        event.url?.includes("/game/play")
        && typeof event.postData === "string"
        && event.postData.includes("\"action\":\"free_spins\"")
      ));
      if (hasFreeSpinPlay) {
        console.log("phase=free-spins-detected");
        break;
      }
    }

    await wait(4000);
    await page.screenshot({ path: path.join(outputDir, "99-final.png") });

    const summary = {
      launchUrl,
      game: args.game,
      forcedAction: args.action,
      forcedBet: args.bet,
      pageErrors: events.filter((event) => event.type === "pageerror").length,
      bodyText: await page.evaluate(() => document.body.innerText.slice(0, 1000)),
      play: buildEventSummary(events, "/game/play"),
      complete: buildEventSummary(events, "/game/complete"),
      freeSpinsTriggered: events.some((event) => (
        event.url?.includes("/game/play")
        && typeof event.postData === "string"
        && event.postData.includes("\"action\":\"free_spins\"")
      )),
      freeSpinsRequest: events.find((event) => (
        event.type === "request"
        && event.url?.includes("/game/play")
        && typeof event.postData === "string"
        && event.postData.includes("\"action\":\"free_spins\"")
      )) ?? null,
      freeSpinsResponse: events.find((event) => (
        event.type === "response"
        && event.url?.includes("/game/play")
        && typeof event.body === "string"
        && event.body.includes("\"action\":\"free_spins\"")
      )) ?? null,
      firstPlayResponse: events.find((event) => event.type === "response" && event.url?.includes("/game/play")) ?? null,
    };

    fs.writeFileSync(path.join(outputDir, "events.json"), JSON.stringify(events, null, 2));
    fs.writeFileSync(path.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));

    if (!summary.play.requestCount) {
      throw new Error("No /game/play request detected");
    }
    if (!summary.freeSpinsTriggered) {
      throw new Error("No free spins request detected");
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
