import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const DEBUG_URL = process.env.THREE_OAKS_DEBUG_URL
  ?? "http://127.0.0.1:8084/operator/launch/three-oaks/3oaksgaming-aztec-sun";
const CDP_URL = process.env.THREE_OAKS_CDP_URL ?? "http://127.0.0.1:9222";
const OUTPUT_DIR = path.resolve("output/three-oaks-debug");
const MAX_SPINS = Math.max(1, Number.parseInt(process.env.THREE_OAKS_DEBUG_SPINS ?? "2", 10) || 2);
const STOP_ON_WIN = String(process.env.THREE_OAKS_DEBUG_STOP_ON_WIN ?? "").trim() === "1";
const CLOSE_PAGE = String(process.env.THREE_OAKS_DEBUG_CLOSE_PAGE ?? "1").trim() !== "0";

const INTRO_CLICK = { x: 60, y: 60 };
const SPIN_CANDIDATES = [
  { x: 1120, y: 650 },
  { x: 1120, y: 720 },
  { x: 1090, y: 720 },
  { x: 1145, y: 720 },
  { x: 1120, y: 790 },
  { x: 1090, y: 650 },
];

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.connectOverCDP(CDP_URL);
  try {
    const context = browser.contexts()[0];
    const page = context.pages()[0] ?? await context.newPage();

    await page.addInitScript(() => {
      const normalizePayload = (value) => {
        if (value == null) {
          return null;
        }
        if (typeof value === "string") {
          return value;
        }
        if (value instanceof URLSearchParams) {
          return value.toString();
        }
        if (value instanceof ArrayBuffer) {
          return new TextDecoder().decode(value);
        }
        if (ArrayBuffer.isView(value)) {
          return new TextDecoder().decode(value);
        }
        if (typeof value === "object") {
          try {
            return JSON.stringify(value);
          } catch {
            return String(value);
          }
        }
        return String(value);
      };

      const extractEntry = (kind, url, body, responseText) => {
        if (!String(url).includes("/slotscity-prod-axis/gs/")) {
          return null;
        }

        let parsedBody = null;
        try {
          parsedBody = body ? JSON.parse(body) : null;
        } catch {
          parsedBody = body;
        }

        let parsedResponse = null;
        try {
          parsedResponse = responseText ? JSON.parse(responseText) : null;
        } catch {
          parsedResponse = responseText;
        }

        return {
          at: new Date().toISOString(),
          kind,
          url: String(url),
          requestBody: parsedBody,
          requestText: body,
          responseBody: parsedResponse,
          responseText,
        };
      };

      window.__threeOaksTrace = [];

      const originalFetch = window.fetch.bind(window);
      window.fetch = async (...args) => {
        const [resource, init] = args;
        const response = await originalFetch(...args);
        try {
          const body = normalizePayload(init?.body);
          const responseText = await response.clone().text();
          const entry = extractEntry("fetch", resource?.url ?? resource, body, responseText);
          if (entry) {
            window.__threeOaksTrace.push(entry);
          }
        } catch {}
        return response;
      };

      const originalOpen = XMLHttpRequest.prototype.open;
      const originalSend = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.open = function patchedOpen(method, url, ...rest) {
        this.__threeOaksUrl = url;
        this.__threeOaksMethod = method;
        return originalOpen.call(this, method, url, ...rest);
      };
      XMLHttpRequest.prototype.send = function patchedSend(body) {
        const bodyText = normalizePayload(body);
        this.addEventListener("loadend", () => {
          try {
            const entry = extractEntry("xhr", this.__threeOaksUrl, bodyText, this.responseText);
            if (entry) {
              window.__threeOaksTrace.push(entry);
            }
          } catch {}
        });
        return originalSend.call(this, body);
      };
    });

    await page.setViewportSize({ width: 1200, height: 1245 });
    page.on("pageerror", (error) => {
      console.error("[pageerror]", error.message);
    });
    page.on("console", (message) => {
      if (message.type() === "error") {
        console.error("[console:error]", message.text());
      }
    });

    await page.goto(DEBUG_URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    await page.mouse.click(INTRO_CLICK.x, INTRO_CLICK.y);
    await page.waitForTimeout(4000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, "01-after-intro.png") });

    const spinResults = [];
    let traceCount = await getTraceCount(page);

    for (let spinIndex = 0; spinIndex < MAX_SPINS; spinIndex += 1) {
      const attempt = await clickUntilRequest(page, traceCount);
      await page.waitForTimeout(6500);
      const trace = await page.evaluate(() => window.__threeOaksTrace ?? []);
      traceCount = trace.length;

      const lastPlay = [...trace]
        .reverse()
        .find((entry) => entry.requestBody?.command === "play" && entry.requestBody?.action?.name === "spin");
      const roundWin = Number(lastPlay?.responseBody?.context?.spins?.round_win ?? 0);

      spinResults.push({
        ...attempt,
        roundWin,
      });

      await page.screenshot({ path: path.join(OUTPUT_DIR, `02-spin-${spinIndex + 1}.png`) });

      if (STOP_ON_WIN && roundWin > 0) {
        break;
      }
    }

    await page.screenshot({ path: path.join(OUTPUT_DIR, "99-final.png") });

    const trace = await page.evaluate(() => window.__threeOaksTrace ?? []);
    await fs.writeFile(path.join(OUTPUT_DIR, "trace.json"), JSON.stringify(trace, null, 2));

    console.log(JSON.stringify({
      spinResults,
      requestCount: trace.length,
      recent: trace.slice(-8).map((entry) => ({
        at: entry.at,
        command: entry.requestBody?.command ?? null,
        action: entry.requestBody?.action?.name ?? null,
        responseCommand: entry.responseBody?.command ?? null,
        responseStatus: entry.responseBody?.status?.code ?? null,
      })),
    }, null, 2));

    if (CLOSE_PAGE && !page.isClosed()) {
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

async function getTraceCount(page) {
  return page.evaluate(() => (window.__threeOaksTrace ?? []).length);
}

async function clickUntilRequest(page, startCount) {
  for (const point of SPIN_CANDIDATES) {
    await page.mouse.click(point.x, point.y);
    await page.waitForTimeout(2000);
    const nextCount = await getTraceCount(page);
    if (nextCount > startCount) {
      return {
        clicked: point,
        newEntries: nextCount - startCount,
      };
    }
  }

  return {
    clicked: null,
    newEntries: 0,
  };
}

await main();
