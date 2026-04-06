import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

import { buildBgamingLocationParams, getBgamingConfig } from "../lib/bgaming-configs.mjs";

function parseArgs(argv) {
  const args = {
    host: "127.0.0.1",
    port: "8080",
    game: "gates-of-power",
    spins: 3,
    forceFeature: "",
    forceFeatureLevel: "",
    forceBet: "",
    headed: false,
    outputDir: path.join(process.cwd(), "output", "bgaming-three-spins"),
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
    } else if (arg === "--spins" && next) {
      args.spins = Number.parseInt(next, 10);
      index += 1;
    } else if (arg === "--force-feature" && next) {
      args.forceFeature = next;
      index += 1;
    } else if (arg === "--force-feature-level" && next) {
      args.forceFeatureLevel = next;
      index += 1;
    } else if (arg === "--force-bet" && next) {
      args.forceBet = next;
      index += 1;
    } else if (arg === "--output-dir" && next) {
      args.outputDir = path.resolve(next);
      index += 1;
    } else if (arg === "--headed") {
      args.headed = true;
    }
  }

  return args;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseJsonSafe(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function normalizeMode(args) {
  if (args.forceFeature) {
    return args.forceFeature;
  }
  return "main";
}

function countSpinRequests(events) {
  return events.filter((event) => {
    if (event.type !== "request") {
      return false;
    }
    if (event.command === "spin") {
      return true;
    }
    if (event.methodName === "play") {
      return true;
    }
    return typeof event.payload?.bet_amount === "number";
  }).length;
}

async function main() {
  const args = parseArgs(process.argv);
  const config = getBgamingConfig(args.game);
  if (!config) {
    throw new Error(`Unknown BGaming game: ${args.game}`);
  }

  const mode = normalizeMode(args);
  const outputDir = path.join(args.outputDir, args.game, mode);
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const baseUrl = `http://${args.host}:${args.port}`;
  const params = buildBgamingLocationParams(config);
  if (args.forceFeature) {
    params.set("forceFeature", args.forceFeature);
  }
  if (args.forceFeatureLevel) {
    params.set("forceFeatureLevel", args.forceFeatureLevel);
  }
  if (args.forceBet) {
    params.set("forceBet", args.forceBet);
  }
  const launchUrl = `${baseUrl}/bgaming/location?${params.toString()}`;
  const apiPrefix = `${baseUrl}/bgaming/api/${encodeURIComponent(args.game)}`;
  const apiAliasUrl = `${baseUrl}/api`;
  const events = [];

  const browser = await chromium.launch({
    headless: !args.headed,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    hasTouch: true,
  });
  const page = await context.newPage();

  page.on("request", (request) => {
    const url = request.url();
    if (!url.startsWith(apiPrefix) && !url.startsWith(apiAliasUrl)) {
      return;
    }

    const postData = request.postData() || null;
    const payload = postData ? parseJsonSafe(postData) : null;
    events.push({
      type: "request",
      method: request.method(),
      url,
      command: payload?.command ?? null,
      methodName: payload?.method ?? null,
      payload,
      postData,
      at: Date.now(),
    });
  });

  page.on("response", async (response) => {
    const url = response.url();
    if (!url.startsWith(apiPrefix) && !url.startsWith(apiAliasUrl)) {
      return;
    }

    const body = await response.text().catch(() => "");
    const headers = await response.allHeaders().catch(() => ({}));
    const payload = body ? parseJsonSafe(body) : null;
    events.push({
      type: "response",
      status: response.status(),
      url,
      command: payload?.command ?? null,
      methodName: payload?.method ?? null,
      payload,
      headers,
      body: body.slice(0, 8000),
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

  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      events.push({
        type: "console",
        level: message.type(),
        text: message.text(),
        at: Date.now(),
      });
    }
  });

  const spinActions = [
    { name: "tap-spin-primary", run: () => page.touchscreen.tap(1370, 810) },
    { name: "mouse-spin-primary", run: () => page.mouse.click(1370, 810) },
    { name: "tap-spin-fallback", run: () => page.touchscreen.tap(1340, 800) },
    { name: "mouse-spin-fallback", run: () => page.mouse.click(1340, 800) },
    { name: "space", run: () => page.keyboard.press("Space") },
    { name: "enter", run: () => page.keyboard.press("Enter") },
  ];

  try {
    await page.goto(launchUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
    await wait(8000);
    await page.screenshot({ path: path.join(outputDir, "00-launch.png") });

    const warmupActions = [
      { name: "warmup-center", run: () => page.touchscreen.tap(720, 450) },
      { name: "warmup-bottom-center", run: () => page.touchscreen.tap(720, 820) },
      { name: "warmup-right", run: () => page.touchscreen.tap(1370, 810) },
      { name: "warmup-space", run: () => page.keyboard.press("Space") },
    ];

    for (let index = 0; index < warmupActions.length; index += 1) {
      await warmupActions[index].run().catch(() => {});
      await wait(3500);
      await page.screenshot({ path: path.join(outputDir, `warmup-${index + 1}.png`) });
    }

    let attempts = 0;
    while (countSpinRequests(events) < args.spins && attempts < args.spins * 8) {
      const action = spinActions[attempts % spinActions.length];
      await action.run().catch(() => {});
      await wait(7000);
      const spinCount = countSpinRequests(events);
      await page.screenshot({
        path: path.join(
          outputDir,
          `${String(attempts + 1).padStart(2, "0")}-${action.name}-spins-${spinCount}.png`,
        ),
      });

      if (spinCount < args.spins) {
        await page.touchscreen.tap(720, 450).catch(() => {});
        await wait(1500);
      }
      attempts += 1;
    }

    await wait(3000);
    await page.screenshot({ path: path.join(outputDir, "99-final.png") });

    const responseWithOverride = events.find((event) => (
      event.type === "response"
      && event.headers?.["x-bgaming-override-applied"] === "1"
    )) ?? null;
    const summary = {
      launchUrl,
      game: args.game,
      mode,
      targetSpins: args.spins,
      spinRequestCount: countSpinRequests(events),
      apiRequestCount: events.filter((event) => event.type === "request").length,
      apiResponseCount: events.filter((event) => event.type === "response").length,
      pageErrors: events.filter((event) => event.type === "pageerror").length,
      consoleErrors: events.filter((event) => event.type === "console").length,
      overrideApplied: Boolean(responseWithOverride),
      overrideFeature: responseWithOverride?.headers?.["x-bgaming-feature"] ?? null,
      forceFeature: args.forceFeature || null,
      forceFeatureLevel: args.forceFeatureLevel || null,
      forceBet: args.forceBet || null,
      bodyText: await page.evaluate(() => document.body.innerText.slice(0, 1000)),
      firstRequest: events.find((event) => event.type === "request") ?? null,
      firstResponse: events.find((event) => event.type === "response") ?? null,
    };

    fs.writeFileSync(path.join(outputDir, "events.json"), JSON.stringify(events, null, 2));
    fs.writeFileSync(path.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary, null, 2));

    if (summary.spinRequestCount < args.spins) {
      throw new Error(`Detected only ${summary.spinRequestCount} BGaming spins, expected ${args.spins}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
