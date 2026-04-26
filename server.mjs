import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

import { amaticConfigs, getAmaticConfigByPath, getAmaticConfigByWsPath } from "./lib/amatic-configs.mjs";
import { renderAdminPage } from "./lib/admin-ui.mjs";
import {
  handleAmaticUpgrade,
  isAmaticIndexRequest,
  listAmaticGames,
  serveAmaticIndex,
  serveAmaticStatic,
} from "./lib/amatic-local.mjs";
import { bgamingConfigs, buildBgamingLaunchUrl, getBgamingConfig } from "./lib/bgaming-configs.mjs";
import { beplayConfigs, buildBeplayLaunchUrl, getBeplayConfig } from "./lib/beplay-configs.mjs";
import { slotConfigs } from "./lib/slot-configs.mjs";
import { serverConfig } from "./lib/server-config.mjs";
import { SessionStore } from "./lib/session-store.mjs";
import {
  buildThreeOaksProxyBase,
  rewriteThreeOaksHtml,
  THREE_OAKS_PROVIDER_ORIGIN,
  resolveThreeOaksProductLaunch,
  resolveSlotCityThreeOaksLaunch,
} from "./lib/slotcity-three-oaks.mjs";
import {
  applyCors,
  createRequestContext,
  escapeXml,
  finalizeRequestLog,
  parseCookies,
  RateLimiter,
  readBody,
  sendJson,
  sendText,
  sendXml,
  streamFileWithCache,
  writeStructuredLog,
} from "./lib/http-utils.mjs";
import {
  getPhysicalIndexPath,
  isIndexRequest,
  resolveGameByPath,
  rewriteIndexHtml,
  toStaticRelativePath,
} from "./lib/slot-routing.mjs";
import {
  createInitialState,
  forceFeatureState,
  normalizeState,
  spinRound,
  finalizeRound,
  playBonusRound,
  finishBonusIfNeeded,
} from "./lib/slot-engine.mjs";
import {
  renderBonus,
  renderConnect,
  renderErrorSpin,
  renderNoActiveBonus,
  renderReconnect,
  renderSpinLike,
  renderSync,
} from "./lib/slot-protocols.mjs";
import {
  bumpBalanceVersion,
  createErrorResponse,
  createLoginResponse,
  createPlayResponse,
  createStartResponse,
  createSyncResponse,
  ensureThreeOaksState,
  isThreeOaksApiRequest,
  isThreeOaksNoopRequest,
  parseThreeOaksRequest,
} from "./lib/three-oaks-protocol.mjs";

const THREE_OAKS_EXTERNAL_PROMO_STUB = `
(function (global) {
  function makeObservable(initialValue) {
    let value = initialValue;
    const watchers = new Set();
    const observable = function (nextValue) {
      if (arguments.length > 0) {
        value = nextValue;
        watchers.forEach((fn) => {
          try { fn(value); } catch {}
        });
      }
      return value;
    };
    observable.follow = function (fn) {
      watchers.add(fn);
      try { fn(value); } catch {}
    };
    observable.on = function (fn) {
      watchers.add(fn);
    };
    observable.off = function (fn) {
      watchers.delete(fn);
    };
    observable.once = function (fn) {
      try { fn(value); } catch {}
    };
    return observable;
  }

  function createExternalPromo() {
    const loaded = makeObservable(true);
    const progress = makeObservable(1);
    const isWidgetVisible = makeObservable(false);
    const isMenuVisible = makeObservable(false);
    const hasActivePromo = makeObservable(false);
    const isPopupDestroyed = makeObservable(true);
    const isPaidPopupDestroyed = makeObservable(true);
    const jackpots = makeObservable([]);
    const winnersList = makeObservable([]);
    const allowBetAffectChance = makeObservable(false);

    const api = {
      loader: { loaded, progress },
      isWidgetVisible,
      isMenuVisible,
      hasActivePromo,
      isPopupDestroyed,
      isPaidPopupDestroyed,
      init() { return this; },
      setHTMLContainer() { return this; },
      hide() { return this; },
      canShowMenu() { return this; },
      bet() { return this; },
      disable() { return this; },
      canShowPopup() { return this; },
      forceUpdate() { return this; },
      collapse() { return this; },
      kill() { return this; },
      killContext() { return this; },
      restoreContext() { return this; },
      canShowPaidPopup() { return false; },
      showPaidPopup() { return Promise.resolve(false); },
      wrapperState() { return 0; },
      inGameJackpots: {
        widget: {
          allowBetAffectChance,
          winnersList,
          jackpots,
          playerNick() { return ""; },
        },
        menu: {
          rules() { return ""; },
          title() { return ""; },
        },
        locales() {
          return {
            justWon: "",
            no_winners_yet: "",
            timerMessage: "",
            myWin: "",
            current_win: "",
          };
        },
        demoMode() {},
        notActiveTitle() { return ""; },
      },
    };

    return api;
  }

  global.ExternalPromoModule = {
    ExternalPromo: {
      create() {
        return createExternalPromo();
      },
    },
  };
})(typeof window !== "undefined" ? window : globalThis);
`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sessionStores = new Map();
const beplayLocalSessions = new Map();
const bgamingLocalSessions = new Map();
const rateLimiter = new RateLimiter({
  windowMs: serverConfig.rateLimitWindowMs,
  maxRequests: serverConfig.rateLimitMaxRequests,
});
const BEPLAY_CACHE_ROOT = path.join(__dirname, "beplay_cache");
const BEPLAY_OVERRIDE_COOKIE = "beplay_override";
const BEPLAY_SESSION_COOKIE = "beplay_session";
const BEPLAY_LOCAL_DEFAULT_BALANCE = 995;
const BEPLAY_LOCAL_SESSION_TTL_MS = 30 * 60 * 1000;
const BGAMING_OVERRIDE_COOKIE = "bgaming_override";
const BGAMING_SESSION_COOKIE = "bgaming_session";
const BGAMING_UPSTREAM_COOKIE = "bgaming_upstream";
const BGAMING_LOCAL_DEFAULT_BALANCE = 100000;
const BGAMING_LOCAL_DEFAULT_BET = 200;
const BGAMING_LOCAL_SESSION_TTL_MS = 30 * 60 * 1000;
const BGAMING_LOCAL_SYMBOLS = ["h1", "h2", "h3", "h4", "l1", "l2", "l3", "l4", "l5", "sc"];
const BGAMING_LOCAL_TOP_MULTIPLIERS = ["rm2", "rm3", "rm5", "rm6", "rm8", "rm20", "rm25"];
const BEPLAY_LOCAL_GAME_INFO = {
  "tiger-s-prosperity": {
    state: {},
    bets: {
      main: {
        available: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10, 15, 20, 25, 50, 100],
        default: 1,
        coin: 20,
      },
      free_spins_buy: {
        available: [10, 15, 20, 25, 30, 40, 50, 75, 100, 125, 150, 200, 250, 375, 500, 750, 1000, 1250, 2500, 5000],
        default: 50,
        coin: 1000,
      },
    },
    config: {
      paylines: [[2, 2, 2, 2, 2], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2]],
      paytable: {
        0: [0, 0, 50, 160, 800],
        1: [0, 0, 30, 120, 500],
        2: [0, 0, 24, 80, 400],
      },
      paytableCoins: 20,
      buyFeatureConfig: [{ action: "free_spins_buy", featureMultiplier: 50, featureType: 0 }],
      version: "1.2.0-local",
    },
    settings: {
      autoplayForbidden: "false",
      defaultCampaignThemeName: "{\"freeBets\": \"default-free-bets\"}",
    },
    betLimits: {
      minBet: 0.01,
      maxBet: 10000,
      maxExposure: 10000000,
      currencyRate: 1,
      currencyDecimals: 2,
      currencyUnit: 0.01,
      exchangeRate: 1,
    },
  },
  "koharus-suuuugoi-sweets": {
    state: {},
    bets: {
      main: {
        available: [1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 250, 500, 1000, 2000],
        default: 1,
        coin: 100,
      },
      "boost-main": {
        available: [0.14, 0.28, 0.56, 0.84, 1.12, 1.4, 2.8, 4.2, 5.6, 7, 8.4, 11.2, 14, 21, 28, 35, 42, 56, 70, 105, 140, 210, 280, 350, 700, 1400, 2800],
        default: 1.4,
        coin: 140,
      },
      "free-spins-buy": {
        available: [6, 12, 24, 36, 48, 60, 120, 180, 240, 300, 360, 480, 600, 900, 1200, 1500, 1800, 2400, 3000, 4500, 6000, 9000],
        default: 60,
        coin: 6000,
      },
    },
    config: {
      paylines: [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2]],
      buyFeatureConfig: [
        { action: "free-spins-buy", featureMultiplier: 60, featureType: 0 },
        { action: "boost-main", featureMultiplier: 1.4, featureType: 1 },
      ],
      paytable: {
        WILD: [0, 40, 400, 4000, 12000],
        SCATTER: [0, 0, 100, 300, 1000],
      },
      paytableCoins: 100,
      version: "1.0.2-local",
    },
    settings: {
      autoplayForbidden: "false",
      defaultCampaignThemeName: "{\"freeBets\": \"default-free-bets\"}",
    },
    betLimits: {
      minBet: 0.01,
      maxBet: 10000,
      maxExposure: 10000000,
      currencyRate: 1,
      currencyDecimals: 2,
      currencyUnit: 0.01,
      exchangeRate: 1,
    },
  },
};
const THREE_OAKS_LIVE_TARGET_BALANCE = 10000;
const THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID = String(process.env.THREE_OAKS_PRODUCT_PLAYER_ID ?? "prod-player-1").trim() || "prod-player-1";
const THREE_OAKS_PRODUCT_DEFAULT_CURRENCY = String(process.env.THREE_OAKS_PRODUCT_CURRENCY ?? "USD").trim().toUpperCase() || "USD";
const THREE_OAKS_PRODUCT_DEFAULT_BALANCE = normalizeMoneyAmount(process.env.THREE_OAKS_PRODUCT_START_BALANCE, 10000);
const THREE_OAKS_OPERATOR_LAUNCH_COOKIE = "three_oaks_operator_launch";
const THREE_OAKS_OPERATOR_WALLET_TTL_MS = 30 * 60 * 1000;
const THREE_OAKS_PRODUCT_WALLET_FILE = path.join(__dirname, ".three-oaks-product-wallets.json");
const THREE_OAKS_PRODUCT_EVENT_FILE = path.join(__dirname, "output", "three-oaks-product-events.ndjson");
const THREE_OAKS_PRODUCT_BASE_RTP_TARGET = Number(slotConfigs.aztecSunProduct?.rtp?.target ?? 0.1);
const ADMIN_SESSION_COOKIE = "slot_admin_session";
const ADMIN_OAUTH_STATE_COOKIE = "slot_admin_oauth_state";
const ADMIN_SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const ADMIN_OAUTH_STATE_TTL_MS = 10 * 60 * 1000;
const ADMIN_RUNTIME_FILE = path.join(__dirname, ".admin-runtime.json");
const ADMIN_GOOGLE_CLIENT_ID = String(process.env.ADMIN_GOOGLE_CLIENT_ID ?? "").trim();
const ADMIN_GOOGLE_CLIENT_SECRET = String(process.env.ADMIN_GOOGLE_CLIENT_SECRET ?? "").trim();
const ADMIN_GOOGLE_ALLOWED_EMAILS = parseCsvEnv(process.env.ADMIN_GOOGLE_ALLOWED_EMAILS).map((email) => email.toLowerCase());
const ADMIN_GOOGLE_ALLOWED_DOMAIN = String(process.env.ADMIN_GOOGLE_ALLOWED_DOMAIN ?? "").trim().toLowerCase();
const ADMIN_PUBLIC_ORIGIN = String(process.env.ADMIN_PUBLIC_ORIGIN ?? "").trim();
const ADMIN_DEV_AUTH_EMAIL = String(
  process.env.ADMIN_DEV_AUTH_EMAIL
  ?? ((!ADMIN_GOOGLE_CLIENT_ID && !ADMIN_GOOGLE_CLIENT_SECRET) ? "local-admin@localhost" : ""),
).trim().toLowerCase();
const ADMIN_DEV_AUTH_NAME = String(process.env.ADMIN_DEV_AUTH_NAME ?? "Local Admin").trim() || "Local Admin";
const ADMIN_SESSION_SECRET = String(process.env.ADMIN_SESSION_SECRET ?? "").trim() || `${randomId()}${randomId()}`;
const ADMIN_SESSION_SECRET_IS_EPHEMERAL = !process.env.ADMIN_SESSION_SECRET;
const BACKOFFICE_PLAYER_ROLES = ["low", "middle", "high"];
const BACKOFFICE_DEFAULT_ROLE = "middle";
const threeOaksOperatorWallets = new Map();
const threeOaksProductPlayerWallets = new Map();
const adminRuntimeState = {
  backoffice: {
    gameSettings: {},
    integrations: {
      moneyServer: createDefaultMoneyServerIntegration(),
      usersDb: createDefaultUsersDbIntegration(),
    },
    playerRoles: {},
  },
  threeOaksProductRtpTarget: null,
  updatedAt: null,
};

async function main() {
  loadAdminRuntimeState();
  applyAdminRuntimeState();
  loadThreeOaksProductPlayerWallets();
  if (ADMIN_SESSION_SECRET_IS_EPHEMERAL) {
    writeStructuredLog("admin_session_secret_ephemeral", {
      message: "ADMIN_SESSION_SECRET is not set; admin login sessions will be invalidated on restart",
    });
  }
  for (const config of Object.values(slotConfigs)) {
    const store = new SessionStore(config, __dirname, {
      flushDelayMs: serverConfig.sessionFlushDelayMs,
      sessionTtlMs: serverConfig.sessionTtlMs,
      sessionCleanupMs: serverConfig.sessionCleanupMs,
    });
    await store.load();
    sessionStores.set(config.id, store);
  }

  const server = http.createServer((req, res) => {
    const context = createRequestContext(req);
    const url = new URL(req.url, `http://${req.headers.host}`);
    context.pathname = url.pathname;
    res.setHeader("X-Request-Id", context.requestId);
    applyCors(res);

    handleRequest(req, res, url, context).catch((error) => {
      handleRequestError(req, res, context, error);
    });
  });

  server.on("upgrade", (req, socket, head) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host ?? "127.0.0.1"}`);
      const amaticGame = getAmaticConfigByWsPath(url.pathname);
      if (amaticGame && handleAmaticUpgrade(amaticGame, req, socket, head)) {
        return;
      }
    } catch {
      // Fall through to a hard close below.
    }

    socket.destroy();
  });

  server.keepAliveTimeout = serverConfig.keepAliveTimeoutMs;
  server.headersTimeout = serverConfig.headersTimeoutMs;

  server.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Universal slot server running at http://${serverConfig.host}:${serverConfig.port}`);
    console.log(`Energy Coins: http://${serverConfig.host}:${serverConfig.port}/`);
    console.log(`Wolf Power:   http://${serverConfig.host}:${serverConfig.port}/wolf_power_ps/`);
    console.log(`Sun of Egypt 3: http://${serverConfig.host}:${serverConfig.port}/sun_of_egypt_3/`);
    console.log(`3 Oaks Aztec Sun (live): http://${serverConfig.host}:${serverConfig.port}/three-oaks/live/3oaksgaming-aztec-sun`);
    console.log(`3 Oaks Aztec Sun (product): http://${serverConfig.host}:${serverConfig.port}/three-oaks/product/3oaksgaming-aztec-sun`);
    console.log(`3 Oaks Aztec Sun (product launch): http://${serverConfig.host}:${serverConfig.port}/operator/launch/three-oaks/3oaksgaming-aztec-sun`);
    console.log(`BePlay Tiger's Prosperity: http://${serverConfig.host}:${serverConfig.port}/beplay/launch/tiger-s-prosperity`);
    console.log(`BePlay Koharu’s Suuuugoi Sweets: http://${serverConfig.host}:${serverConfig.port}/beplay/launch/koharus-suuuugoi-sweets`);
    console.log(`BGaming Gates of Power: http://${serverConfig.host}:${serverConfig.port}/bgaming/launch/gates-of-power`);
    console.log(`Amatic Lady Fruits 10 Easter: http://${serverConfig.host}:${serverConfig.port}/amatic/ladyfruits10easter/`);
  });

  const shutdown = async () => {
    writeStructuredLog("shutdown_start", { stores: sessionStores.size });
    server.close();
    await Promise.all([...sessionStores.values()].map(async (store) => {
      store.dispose();
      await store.flushNow();
    }));
    writeStructuredLog("shutdown_complete", {});
    process.exit(0);
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

async function handleRequest(req, res, url, context) {
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    finalizeRequestLog(req, res, context);
    return;
  }

  if (url.pathname === "/cdn-cgi/rum") {
    res.writeHead(204, { "Cache-Control": "no-store" });
    res.end();
    finalizeRequestLog(req, res, context, { route: "cloudflare_rum_noop" });
    return;
  }

  if (url.pathname === "/api/config" || url.pathname === "/beplay/api/config") {
    sendText(res, 200, `http://${req.headers.host}/beplay/api`);
    finalizeRequestLog(req, res, context, { route: "beplay_api_config" });
    return;
  }

  if (url.pathname === "/beplay/games") {
    sendJson(res, 200, {
      games: Object.values(beplayConfigs).map((config) => ({
        game: config.game,
        name: config.name,
        launchUrl: buildBeplayLaunchUrl(`http://${req.headers.host}`, config),
      })),
    });
    finalizeRequestLog(req, res, context, { route: "beplay_games" });
    return;
  }

  if (url.pathname === "/bgaming/games") {
    sendJson(res, 200, {
      games: Object.values(bgamingConfigs).map((config) => ({
        game: config.game,
        name: config.name,
        launchUrl: buildBgamingLaunchUrl(`http://${req.headers.host}`, config),
        featureLaunchUrls: Object.fromEntries(
          Object.entries(config.supportedFeatures ?? {}).map(([name, feature]) => (
            [name, buildBgamingLaunchUrl(`http://${req.headers.host}`, config, new URLSearchParams({ forceFeature: feature }))]
          )),
        ),
      })),
    });
    finalizeRequestLog(req, res, context, { route: "bgaming_games" });
    return;
  }

  if (url.pathname === "/amatic/games") {
    sendJson(res, 200, {
      games: listAmaticGames(amaticConfigs),
    });
    finalizeRequestLog(req, res, context, { route: "amatic_games" });
    return;
  }

  if (url.pathname.startsWith("/beplay/launch/")) {
    const gameId = decodeURIComponent(url.pathname.slice("/beplay/launch/".length));
    const config = getBeplayConfig(gameId);
    if (!config) {
      sendText(res, 404, "Unknown BePlay game");
      finalizeRequestLog(req, res, context, { route: "beplay_launch", failed: true });
      return;
    }

    res.writeHead(302, {
      Location: buildBeplayLaunchUrl(`http://${req.headers.host}`, config),
      "Cache-Control": "no-store",
    });
    res.end();
    finalizeRequestLog(req, res, context, { route: "beplay_launch", gameId });
    return;
  }

  if (url.pathname === "/beplay/location") {
    await serveBeplayLocation(req, res, url);
    finalizeRequestLog(req, res, context, { route: "beplay_location", gameId: url.searchParams.get("game") });
    return;
  }

  if (url.pathname.startsWith("/bgaming/launch/")) {
    const gameId = decodeURIComponent(url.pathname.slice("/bgaming/launch/".length));
    const config = getBgamingConfig(gameId);
    if (!config) {
      sendText(res, 404, "Unknown BGaming game");
      finalizeRequestLog(req, res, context, { route: "bgaming_launch", failed: true });
      return;
    }

    res.writeHead(302, {
      Location: buildBgamingLaunchUrl(`http://${req.headers.host}`, config, url.searchParams),
      "Cache-Control": "no-store",
    });
    res.end();
    finalizeRequestLog(req, res, context, { route: "bgaming_launch", gameId });
    return;
  }

  if (url.pathname === "/bgaming/location") {
    await serveBgamingLocation(req, res, url);
    finalizeRequestLog(req, res, context, { route: "bgaming_location", gameId: url.searchParams.get("game") });
    return;
  }

  if (url.pathname === "/api") {
    const bgamingState = readBgamingSessionCookie(req.headers.cookie);
    if (bgamingState?.game && getBgamingConfig(bgamingState.game)) {
      const body = req.method === "GET" || req.method === "HEAD"
        ? null
        : await readBody(req, serverConfig.maxBodyBytes);
      const proxyUrl = new URL(`/bgaming/api/${encodeURIComponent(bgamingState.game)}${url.search}`, `http://${req.headers.host}`);
      await proxyBgamingApi(req, res, proxyUrl, body);
      finalizeRequestLog(req, res, context, { route: "bgaming_api_alias", gameId: bgamingState.game });
      return;
    }
  }

  if (url.pathname.startsWith("/bgaming/publisher/")) {
    await proxyBgamingPublisherAsset(req, res, url.pathname);
    finalizeRequestLog(req, res, context, { route: "bgaming_publisher_asset" });
    return;
  }

  if (url.pathname.startsWith("/beplay/api/")) {
    const body = req.method === "GET" || req.method === "HEAD"
      ? null
      : await readBody(req, serverConfig.maxBodyBytes);
    await handleBeplayLocalApi(req, res, url, body);
    finalizeRequestLog(req, res, context, { route: "beplay_api_local" });
    return;
  }

  if (url.pathname.startsWith("/bgaming/api/")) {
    const body = req.method === "GET" || req.method === "HEAD"
      ? null
      : await readBody(req, serverConfig.maxBodyBytes);
    await proxyBgamingApi(req, res, url, body);
    finalizeRequestLog(req, res, context, { route: "bgaming_api_proxy" });
    return;
  }

  if (isBeplayAssetPath(url.pathname)) {
    await serveBeplayAsset(req, res, url.pathname);
    finalizeRequestLog(req, res, context, { route: "beplay_asset" });
    return;
  }

  if (url.pathname === "/health") {
    sendJson(res, 200, {
      status: "ok",
      uptimeSec: Math.round(process.uptime()),
      stores: [...sessionStores.values()].map((store) => store.snapshot().count),
    });
    finalizeRequestLog(req, res, context, { route: "health" });
    return;
  }

  if (url.pathname === "/ready") {
    sendJson(res, 200, {
      status: "ready",
      games: [...Object.keys(slotConfigs), ...Object.keys(amaticConfigs)],
      sessionStores: sessionStores.size,
    });
    finalizeRequestLog(req, res, context, { route: "ready" });
    return;
  }

  if (url.pathname === "/admin/auth/google/start") {
    await handleAdminGoogleAuthStart(req, res, context);
    finalizeRequestLog(req, res, context, { route: "admin_auth_google_start" });
    return;
  }

  if (url.pathname === "/admin/auth/google/callback") {
    await handleAdminGoogleAuthCallback(req, res, url, context);
    finalizeRequestLog(req, res, context, { route: "admin_auth_google_callback" });
    return;
  }

  if (url.pathname === "/admin/auth/dev") {
    handleAdminDevLogin(req, res, context);
    finalizeRequestLog(req, res, context, { route: "admin_auth_dev" });
    return;
  }

  if (url.pathname === "/admin/logout") {
    handleAdminLogout(req, res, context);
    finalizeRequestLog(req, res, context, { route: "admin_logout" });
    return;
  }

  if (url.pathname === "/admin" || url.pathname === "/admin/") {
    if (!readAdminSession(req) && shouldAutoLoginAdmin()) {
      handleAdminDevLogin(req, res, context);
      finalizeRequestLog(req, res, context, { route: "admin_page_autologin" });
      return;
    }
    serveAdminPage(req, res, context);
    finalizeRequestLog(req, res, context, { route: "admin_page" });
    return;
  }

  if (url.pathname === "/admin/api/me") {
    const adminSession = requireAdminSession(req, res, context, { api: true, route: "admin_api_me" });
    if (!adminSession) {
      return;
    }
    sendJson(res, 200, {
      requestId: context.requestId,
      user: sanitizeAdminSessionForClient(adminSession),
      auth: getAdminAuthSummary(),
    });
    finalizeRequestLog(req, res, context, { route: "admin_api_me" });
    return;
  }

  if (url.pathname === "/admin/api/backoffice/bootstrap") {
    const adminSession = requireAdminSession(req, res, context, { api: true, route: "admin_api_backoffice_bootstrap" });
    if (!adminSession) {
      return;
    }
    sendJson(res, 200, await buildBackofficeBootstrap());
    finalizeRequestLog(req, res, context, { route: "admin_api_backoffice_bootstrap", adminEmail: adminSession.email });
    return;
  }

  if (url.pathname === "/admin/api/backoffice/players") {
    const adminSession = requireAdminSession(req, res, context, { api: true, route: "admin_api_backoffice_players" });
    if (!adminSession) {
      return;
    }
    sendJson(res, 200, await listBackofficePlayers({
      limit: url.searchParams.get("limit"),
      query: url.searchParams.get("query") ?? url.searchParams.get("q"),
    }));
    finalizeRequestLog(req, res, context, { route: "admin_api_backoffice_players", adminEmail: adminSession.email });
    return;
  }

  const adminPlayerRoute = parseAdminBackofficePlayerRoute(url.pathname);
  if (adminPlayerRoute) {
    const adminSession = requireAdminSession(req, res, context, { api: true, route: "admin_api_backoffice_player" });
    if (!adminSession) {
      return;
    }

    if (req.method === "GET") {
      sendJson(res, 200, await buildBackofficePlayerDetail(adminPlayerRoute.playerId));
      finalizeRequestLog(req, res, context, {
        route: "admin_api_backoffice_player_detail",
        adminEmail: adminSession.email,
        playerId: adminPlayerRoute.playerId,
      });
      return;
    }

    if (req.method === "POST") {
      assertAdminCsrf(req, adminSession);
      const body = await readBody(req, serverConfig.maxBodyBytes);
      const payload = parseJsonBody(body);
      sendJson(res, 200, await applyBackofficePlayerUpdate(adminPlayerRoute.playerId, payload, adminSession));
      finalizeRequestLog(req, res, context, {
        route: "admin_api_backoffice_player_update",
        adminEmail: adminSession.email,
        playerId: adminPlayerRoute.playerId,
      });
      return;
    }

    sendJson(res, 405, { error: "Method not allowed", requestId: context.requestId });
    finalizeRequestLog(req, res, context, { route: "admin_api_backoffice_player", failed: true });
    return;
  }

  if (url.pathname === "/admin/api/backoffice/games") {
    const adminSession = requireAdminSession(req, res, context, { api: true, route: "admin_api_backoffice_games" });
    if (!adminSession) {
      return;
    }
    sendJson(res, 200, listBackofficeGames({
      limit: url.searchParams.get("limit"),
      query: url.searchParams.get("query") ?? url.searchParams.get("q"),
    }));
    finalizeRequestLog(req, res, context, { route: "admin_api_backoffice_games", adminEmail: adminSession.email });
    return;
  }

  const adminGameRoute = parseAdminBackofficeGameRoute(url.pathname);
  if (adminGameRoute) {
    const adminSession = requireAdminSession(req, res, context, { api: true, route: "admin_api_backoffice_game" });
    if (!adminSession) {
      return;
    }

    if (req.method === "GET") {
      sendJson(res, 200, buildBackofficeGameDetail(adminGameRoute.gameId));
      finalizeRequestLog(req, res, context, {
        route: "admin_api_backoffice_game_detail",
        adminEmail: adminSession.email,
        gameId: adminGameRoute.gameId,
      });
      return;
    }

    if (req.method === "POST") {
      assertAdminCsrf(req, adminSession);
      const body = await readBody(req, serverConfig.maxBodyBytes);
      const payload = parseJsonBody(body);
      sendJson(res, 200, applyBackofficeGameSettingsUpdate(adminGameRoute.gameId, payload, adminSession));
      finalizeRequestLog(req, res, context, {
        route: "admin_api_backoffice_game_update",
        adminEmail: adminSession.email,
        gameId: adminGameRoute.gameId,
      });
      return;
    }

    sendJson(res, 405, { error: "Method not allowed", requestId: context.requestId });
    finalizeRequestLog(req, res, context, { route: "admin_api_backoffice_game", failed: true });
    return;
  }

  if (url.pathname === "/admin/api/backoffice/settings") {
    const adminSession = requireAdminSession(req, res, context, { api: true, route: "admin_api_backoffice_settings" });
    if (!adminSession) {
      return;
    }

    if (req.method === "GET") {
      sendJson(res, 200, getBackofficeSettingsPayload());
      finalizeRequestLog(req, res, context, { route: "admin_api_backoffice_settings", adminEmail: adminSession.email });
      return;
    }

    if (req.method === "POST") {
      assertAdminCsrf(req, adminSession);
      const body = await readBody(req, serverConfig.maxBodyBytes);
      const payload = parseJsonBody(body);
      sendJson(res, 200, applyBackofficeSettingsUpdate(payload, adminSession));
      finalizeRequestLog(req, res, context, { route: "admin_api_backoffice_settings_update", adminEmail: adminSession.email });
      return;
    }

    sendJson(res, 405, { error: "Method not allowed", requestId: context.requestId });
    finalizeRequestLog(req, res, context, { route: "admin_api_backoffice_settings", failed: true });
    return;
  }

  if (url.pathname === "/admin/api/three-oaks/overview") {
    const adminSession = requireAdminSession(req, res, context, { api: true, route: "admin_api_three_oaks_overview" });
    if (!adminSession) {
      return;
    }
    sendJson(res, 200, buildThreeOaksAdminOverview());
    finalizeRequestLog(req, res, context, { route: "admin_api_three_oaks_overview", adminEmail: adminSession.email });
    return;
  }

  if (url.pathname === "/admin/api/three-oaks/wallets/update") {
    const adminSession = requireAdminSession(req, res, context, { api: true, route: "admin_api_three_oaks_wallet_update" });
    if (!adminSession) {
      return;
    }
    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method not allowed", requestId: context.requestId });
      finalizeRequestLog(req, res, context, { route: "admin_api_three_oaks_wallet_update", failed: true });
      return;
    }
    assertAdminCsrf(req, adminSession);
    const body = await readBody(req, serverConfig.maxBodyBytes);
    const payload = parseJsonBody(body);
    const result = applyAdminWalletUpdate(payload, adminSession);
    sendJson(res, 200, result);
    finalizeRequestLog(req, res, context, {
      route: "admin_api_three_oaks_wallet_update",
      adminEmail: adminSession.email,
      action: result.action,
      playerId: result.wallet.playerId,
    });
    return;
  }

  if (url.pathname === "/admin/api/three-oaks/runtime/rtp") {
    const adminSession = requireAdminSession(req, res, context, { api: true, route: "admin_api_three_oaks_rtp" });
    if (!adminSession) {
      return;
    }
    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method not allowed", requestId: context.requestId });
      finalizeRequestLog(req, res, context, { route: "admin_api_three_oaks_rtp", failed: true });
      return;
    }
    assertAdminCsrf(req, adminSession);
    const body = await readBody(req, serverConfig.maxBodyBytes);
    const payload = parseJsonBody(body);
    const runtime = applyAdminRtpUpdate(payload, adminSession);
    sendJson(res, 200, { runtime });
    finalizeRequestLog(req, res, context, {
      route: "admin_api_three_oaks_rtp",
      adminEmail: adminSession.email,
      rtp: runtime.currentTargetRtp,
    });
    return;
  }

  if (url.pathname === "/admin/sessions") {
    if (!requireAdminSession(req, res, context, { api: true, route: "admin_sessions" })) {
      return;
    }
    sendJson(res, 200, {
      requestId: context.requestId,
      stores: [...sessionStores.values()].map((store) => store.snapshot()),
      rateLimit: rateLimiter.snapshot(),
    });
    finalizeRequestLog(req, res, context, { route: "admin_sessions" });
    return;
  }

  if (url.pathname === "/admin/session") {
    if (!requireAdminSession(req, res, context, { api: true, route: "admin_session" })) {
      return;
    }
    const gameId = url.searchParams.get("game");
    const sessionId = url.searchParams.get("id") ?? url.searchParams.get("session");
    if (!gameId || !sessionId) {
      sendJson(res, 400, {
        error: "game and id are required",
        requestId: context.requestId,
      });
      finalizeRequestLog(req, res, context, { route: "admin_session", failed: true });
      return;
    }

    const store = sessionStores.get(gameId);
    const snapshot = store?.inspect(sessionId) ?? null;
    if (!snapshot) {
      sendJson(res, 404, {
        error: "Session not found",
        gameId,
        sessionId,
        requestId: context.requestId,
      });
      finalizeRequestLog(req, res, context, { route: "admin_session", gameId, sessionId, failed: true });
      return;
    }

    sendJson(res, 200, {
      requestId: context.requestId,
      gameId,
      sessionId,
      snapshot,
    });
    finalizeRequestLog(req, res, context, { route: "admin_session", gameId, sessionId });
    return;
  }

  if (url.pathname === "/admin/debug-session") {
    if (!requireAdminSession(req, res, context, { api: true, route: "admin_debug_session" })) {
      return;
    }
    const gameId = url.searchParams.get("game");
    const feature = url.searchParams.get("feature");
    const config = gameId ? slotConfigs[gameId] : null;
    const store = gameId ? sessionStores.get(gameId) : null;
    if (!config || !store || !feature) {
      sendJson(res, 400, {
        error: "game and feature are required",
        requestId: context.requestId,
      });
      finalizeRequestLog(req, res, context, { route: "admin_debug_session", failed: true });
      return;
    }

    const sessionId = url.searchParams.get("id") ?? randomId();
    const baseState = store.has(sessionId)
      ? normalizeState(config, store.get(sessionId))
      : createInitialState(config);

    let state;
    try {
      state = forceFeatureState(config, baseState, feature, {
        lineBet: url.searchParams.get("lineBet"),
        spinsLeft: url.searchParams.get("spinsLeft"),
        freeWin: url.searchParams.get("freeWin"),
        balance: url.searchParams.get("balance"),
      });
    } catch (error) {
      sendJson(res, 400, {
        error: error?.message ?? "Invalid debug feature request",
        requestId: context.requestId,
      });
      finalizeRequestLog(req, res, context, { route: "admin_debug_session", failed: true, gameId, sessionId, feature });
      return;
    }

    store.upsert(sessionId, state);
    const cookieHeader = `${config.sessionCookie}=${sessionId}; Path=/; HttpOnly; SameSite=Lax`;
    res.setHeader("Set-Cookie", cookieHeader);
    const launchUrl = config.routeBase || "/";
    if (url.searchParams.get("redirect") === "1" || url.searchParams.get("redirect") === "true") {
      res.writeHead(302, {
        Location: launchUrl,
        "Cache-Control": "no-store",
        "Set-Cookie": cookieHeader,
      });
      res.end();
      finalizeRequestLog(req, res, context, { route: "admin_debug_session", gameId, sessionId, feature, redirect: true });
      return;
    }

    sendJson(res, 200, {
      requestId: context.requestId,
      gameId,
      sessionId,
      feature,
      cookie: {
        name: config.sessionCookie,
        value: sessionId,
      },
      launchUrl: `http://${serverConfig.host}:${serverConfig.port}${launchUrl}`,
      snapshot: store.inspect(sessionId),
    });
    finalizeRequestLog(req, res, context, { route: "admin_debug_session", gameId, sessionId, feature });
    return;
  }

  const operatorLaunch = parseThreeOaksOperatorLaunchRequest(url.pathname);
  if (operatorLaunch) {
    const launchState = buildThreeOaksOperatorLaunchState(operatorLaunch.slug);
    res.writeHead(302, {
      Location: `/three-oaks/product/${encodeURIComponent(operatorLaunch.slug)}`,
      "Cache-Control": "no-store",
      "Set-Cookie": serializeCookie(
        THREE_OAKS_OPERATOR_LAUNCH_COOKIE,
        encodeURIComponent(JSON.stringify(launchState)),
        30 * 60,
      ),
    });
    res.end();
    finalizeRequestLog(req, res, context, {
      route: "three_oaks_operator_launch",
      slug: operatorLaunch.slug,
      playerId: launchState.playerId,
      currency: launchState.currency,
    });
    return;
  }

  const threeOaksProxy = parseThreeOaksProxyRequest(url.pathname);
  if (threeOaksProxy) {
    const body = req.method === "GET" || req.method === "HEAD"
      ? null
      : await readBody(req, serverConfig.maxBodyBytes);
    await proxyThreeOaks(req, res, url, threeOaksProxy, body);
    finalizeRequestLog(req, res, context, {
      route: `three_oaks_${threeOaksProxy.mode}_proxy`,
      slug: threeOaksProxy.slug,
      upstreamPath: threeOaksProxy.upstreamPath,
    });
    return;
  }

  const threeOaksWrapper = parseThreeOaksWrapperRequest(url.pathname);
  if (threeOaksWrapper) {
    const { mode, slug } = threeOaksWrapper;
    if (!slug) {
      sendText(res, 404, "Unknown 3 Oaks game");
      finalizeRequestLog(req, res, context, { route: `three_oaks_${mode}_wrapper`, failed: true });
      return;
    }

    const launch = await resolveThreeOaksWrapperLaunch(mode, slug);
    const upstreamResponse = await fetch(launch.providerUrl, {
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "user-agent": req.headers["user-agent"] || "Mozilla/5.0 Codex slot bridge",
      },
    });
    const upstreamHtml = await upstreamResponse.text();
    const html = rewriteThreeOaksHtml(upstreamHtml, req.headers.host, mode, slug);
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(html);
    finalizeRequestLog(req, res, context, {
      route: `three_oaks_${mode}_wrapper`,
      slug,
      providerUrl: launch.providerUrl,
      proxyBase: buildThreeOaksProxyBase(req.headers.host, mode, slug),
      resolverMode: launch.resolverMode ?? mode,
    });
    return;
  }

  const amaticGame = getAmaticConfigByPath(url.pathname);
  if (amaticGame) {
    context.gameId = amaticGame.id;

    if (isAmaticIndexRequest(amaticGame, url.pathname)) {
      await serveAmaticIndex(amaticGame, req, res, url);
      finalizeRequestLog(req, res, context, { gameId: amaticGame.id, route: "amatic_index" });
      return;
    }

    const served = await serveAmaticStatic(
      amaticGame,
      req,
      url.pathname,
      res,
      __dirname,
      serverConfig.staticMaxAgeSeconds,
    );

    if (!served) {
      sendText(res, 404, "Not found");
      finalizeRequestLog(req, res, context, { gameId: amaticGame.id, route: "amatic_static", failed: true });
      return;
    }

    finalizeRequestLog(req, res, context, { gameId: amaticGame.id, route: "amatic_static" });
    return;
  }

  const game = resolveGameByPath(slotConfigs, url.pathname);
  if (!game) {
    sendText(res, 404, "Not found");
    finalizeRequestLog(req, res, context, { route: "not_found" });
    return;
  }

  context.gameId = game.id;

  if (game.protocol === "three_oaks" && isThreeOaksNoopRequest(game, url.pathname)) {
    res.writeHead(204, { "Cache-Control": "no-store" });
    res.end();
    finalizeRequestLog(req, res, context, { gameId: game.id, route: "three_oaks_noop" });
    return;
  }

  if (game.protocol === "three_oaks" && isThreeOaksExternalPromoRequest(url.pathname)) {
    res.writeHead(200, {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    });
    res.end(THREE_OAKS_EXTERNAL_PROMO_STUB);
    finalizeRequestLog(req, res, context, { gameId: game.id, route: "three_oaks_external_promo_stub" });
    return;
  }

  if (game.protocol === "three_oaks" && isThreeOaksApiRequest(game, url.pathname)) {
    const body = await readBody(req, serverConfig.maxBodyBytes);
    handleThreeOaks(game, req, res, url, body);
    finalizeRequestLog(req, res, context, { gameId: game.id, route: "three_oaks_api" });
    return;
  }

  if (url.pathname === game.enginePath) {
    const rateKey = `${game.id}:${getClientIp(req)}`;
    const rate = rateLimiter.consume(rateKey);
    if (!rate.allowed) {
      res.setHeader("Retry-After", Math.ceil(rate.retryAfterMs / 1000));
      sendXml(res, `<server status="error"><message>RATE_LIMITED</message></server>`);
      finalizeRequestLog(req, res, context, { gameId: game.id, route: "engine", limited: true });
      return;
    }

    const body = await readBody(req, serverConfig.maxBodyBytes);
    handleEngine(game, req, res, url, body, context);
    finalizeRequestLog(req, res, context, { gameId: game.id, route: "engine" });
    return;
  }

  if (isIndexRequest(game, url.pathname)) {
    await serveVirtualIndex(game, req, res);
    finalizeRequestLog(req, res, context, { gameId: game.id, route: "index" });
    return;
  }

  await serveStatic(game, req, url.pathname, res);
  finalizeRequestLog(req, res, context, { gameId: game.id, route: "static" });
}

function handleEngine(config, req, res, url, body, context) {
  const parsed = parseClientMessage(body, url);
  const store = sessionStores.get(config.id);
  const { sessionId, state } = getSession(config, store, req, res, parsed.session);
  const command = parsed.command;

  writeStructuredLog("engine_command", {
    requestId: context.requestId,
    gameId: config.id,
    sessionId,
    command,
    balance: state.balance,
  });

  if (command === "connect") {
    sendXml(res, renderConnect(config, sessionId, state, parsed.rnd));
    return;
  }
  if (command === "reconnect" || command === "start") {
    sendXml(res, renderReconnect(config, sessionId, state, parsed.rnd));
    return;
  }
  if (command === "sync") {
    sendXml(res, renderSync(config, sessionId, state, parsed.rnd));
    return;
  }
  if (command === "bet" || command === "next") {
    finishBonusIfNeeded(state);
    if (command === "next") {
      finalizeRound(state);
      store.upsert(sessionId, state);
      sendXml(res, renderSpinLike(config, sessionId, state, parsed.rnd, command));
      return;
    }
    const result = spinRound(config, state, parsed.bet);
    store.upsert(sessionId, state);
    if (!result.ok) {
      sendXml(res, renderErrorSpin(config, sessionId, parsed.rnd, command, result.error));
      return;
    }
    sendXml(res, renderSpinLike(config, sessionId, state, parsed.rnd, command));
    return;
  }
  if (command === "bonus") {
    const ok = playBonusRound(config, state);
    store.upsert(sessionId, state);
    if (!ok) {
      if (state.bonusActive && state.bonusRoundsLeft === 0) {
        sendXml(res, renderBonus(config, sessionId, state, parsed.rnd));
        return;
      }
      sendXml(res, renderNoActiveBonus(config, sessionId, parsed.rnd));
      return;
    }
    sendXml(res, renderBonus(config, sessionId, state, parsed.rnd));
    return;
  }
  if (command === "leave" || command === "logout") {
    sendXml(res, `<server command="${escapeXml(command)}" session="${sessionId}" rnd="${parsed.rnd}" status="ok"/>`);
    return;
  }

  sendXml(res, `<server status="error"><message>Unknown command</message></server>`);
}

function handleThreeOaks(config, req, res, url, body) {
  const parsed = parseThreeOaksRequest(body, url);
  const store = sessionStores.get(config.id);
  const { sessionId, state } = getSession(config, store, req, res, parsed.sessionId);
  ensureThreeOaksState(config, state);

  if (parsed.command === "login") {
    sendJson(res, 200, createLoginResponse(config, sessionId, state, parsed.requestId));
    return;
  }

  if (parsed.command === "start") {
    clearThreeOaksTransientRoundState(state);
    bumpBalanceVersion(state);
    store.upsert(sessionId, state);
    sendJson(res, 200, createStartResponse(config, sessionId, state, parsed.requestId));
    return;
  }

  if (parsed.command === "sync") {
    bumpBalanceVersion(state);
    store.upsert(sessionId, state);
    sendJson(res, 200, createSyncResponse(config, sessionId, state, parsed.requestId));
    return;
  }

  if (parsed.command === "play") {
    const actionName = parsed.actionName === "buy_spin" ? "spin" : (parsed.actionName ?? "spin");
    const lineBet = sanitizeLineBet(config, parsed.actionParams.bet_per_line);
    const result = applyThreeOaksPlayAction(config, state, actionName, lineBet);

    bumpBalanceVersion(state);
    store.upsert(sessionId, state);

    if (!result.ok) {
      sendJson(res, 200, createErrorResponse(config, sessionId, state, parsed.requestId, result.error, parsed.originData));
      return;
    }

    sendJson(res, 200, createPlayResponse(config, sessionId, state, parsed.requestId, parsed.originData));
    return;
  }

  bumpBalanceVersion(state);
  store.upsert(sessionId, state);
  sendJson(res, 200, createSyncResponse(config, sessionId, state, parsed.requestId));
}

function handleThreeOaksProduct(config, slug, req, res, url, body) {
  const parsed = parseThreeOaksRequest(body, url);
  const store = sessionStores.get(config.id);
  const { sessionId, state } = getSession(config, store, req, res, parsed.sessionId);
  const playerWallet = bindThreeOaksProductPlayer(req, slug, state);
  ensureThreeOaksState(config, state);
  const runtimeConfig = buildBackofficeRuntimeGameConfig(config, state);

  if (parsed.command === "login") {
    sendJson(res, 200, createLoginResponse(runtimeConfig, sessionId, state, parsed.requestId));
    return;
  }

  if (parsed.command === "start") {
    clearThreeOaksTransientRoundState(state);
    bumpBalanceVersion(state);
    store.upsert(sessionId, state);
    sendJson(res, 200, createStartResponse(runtimeConfig, sessionId, state, parsed.requestId));
    return;
  }

  if (parsed.command === "sync") {
    bumpBalanceVersion(state);
    store.upsert(sessionId, state);
    sendJson(res, 200, createSyncResponse(runtimeConfig, sessionId, state, parsed.requestId));
    return;
  }

  if (parsed.command === "play") {
    const actionName = parsed.actionName === "buy_spin" ? "spin" : (parsed.actionName ?? "spin");
    const lineBet = sanitizeLineBet(runtimeConfig, parsed.actionParams.bet_per_line);
    const result = applyThreeOaksPlayAction(runtimeConfig, state, actionName, lineBet);

    bumpBalanceVersion(state);
    if (actionName === "spin" || actionName === "freespin") {
      syncThreeOaksProductPlayerState(playerWallet, state);
    }
    store.upsert(sessionId, state);

    if (!result.ok) {
      sendJson(res, 200, createErrorResponse(runtimeConfig, sessionId, state, parsed.requestId, result.error, parsed.originData));
      return;
    }

    sendJson(res, 200, createPlayResponse(runtimeConfig, sessionId, state, parsed.requestId, parsed.originData));
    return;
  }

  bumpBalanceVersion(state);
  store.upsert(sessionId, state);
  sendJson(res, 200, createSyncResponse(runtimeConfig, sessionId, state, parsed.requestId));
}

function parseCsvEnv(value) {
  return String(value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseJsonBody(body) {
  if (!body || !String(body).trim()) {
    return {};
  }
  try {
    return JSON.parse(String(body));
  } catch {
    throw Object.assign(new Error("Invalid JSON body"), { statusCode: 400 });
  }
}

function getAdminPublicOrigin(req) {
  if (ADMIN_PUBLIC_ORIGIN) {
    return ADMIN_PUBLIC_ORIGIN;
  }
  return `http://${req.headers.host}`;
}

function isSecureOrigin(origin) {
  return String(origin ?? "").startsWith("https://");
}

function getAdminAuthSummary() {
  return {
    allowedDomain: ADMIN_GOOGLE_ALLOWED_DOMAIN || null,
    allowedEmails: [...ADMIN_GOOGLE_ALLOWED_EMAILS],
    devAuthConfigured: Boolean(ADMIN_DEV_AUTH_EMAIL),
    googleConfigured: Boolean(ADMIN_GOOGLE_CLIENT_ID && ADMIN_GOOGLE_CLIENT_SECRET),
  };
}

function shouldAutoLoginAdmin() {
  return Boolean(
    ADMIN_DEV_AUTH_EMAIL
    && !ADMIN_GOOGLE_CLIENT_ID
    && !ADMIN_GOOGLE_CLIENT_SECRET,
  );
}

function signAdminPayload(payload) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", ADMIN_SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");
  return `${encodedPayload}.${signature}`;
}

function readSignedAdminPayload(value) {
  if (!value || typeof value !== "string") {
    return null;
  }
  const separatorIndex = value.lastIndexOf(".");
  if (separatorIndex <= 0) {
    return null;
  }

  const encodedPayload = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  const expectedSignature = createHmac("sha256", ADMIN_SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  if (!constantTimeStringEquals(signature, expectedSignature)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    if (Number.isFinite(parsed?.exp) && parsed.exp < Date.now()) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function constantTimeStringEquals(left, right) {
  if (typeof left !== "string" || typeof right !== "string") {
    return false;
  }
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function createAdminSession(user) {
  return {
    csrfToken: randomId(),
    email: String(user.email ?? "").trim().toLowerCase(),
    exp: Date.now() + ADMIN_SESSION_TTL_MS,
    issuedAt: Date.now(),
    name: String(user.name ?? user.email ?? "Admin").trim() || "Admin",
    picture: String(user.picture ?? "").trim() || null,
  };
}

function sanitizeAdminSessionForClient(session) {
  if (!session) {
    return null;
  }
  return {
    email: session.email,
    issuedAt: session.issuedAt,
    name: session.name,
    picture: session.picture,
  };
}

function readAdminSession(req) {
  const rawValue = parseCookies(req.headers.cookie)[ADMIN_SESSION_COOKIE];
  return readSignedAdminPayload(rawValue);
}

function buildAdminSessionCookie(req, session) {
  return serializeCookieWithOptions(
    ADMIN_SESSION_COOKIE,
    signAdminPayload(session),
    {
      httpOnly: true,
      maxAgeSeconds: Math.floor(ADMIN_SESSION_TTL_MS / 1000),
      secure: isSecureOrigin(getAdminPublicOrigin(req)),
      sameSite: "Lax",
    },
  );
}

function buildAdminOauthStateCookie(req, stateToken) {
  return serializeCookieWithOptions(
    ADMIN_OAUTH_STATE_COOKIE,
    stateToken,
    {
      httpOnly: true,
      maxAgeSeconds: Math.floor(ADMIN_OAUTH_STATE_TTL_MS / 1000),
      secure: isSecureOrigin(getAdminPublicOrigin(req)),
      sameSite: "Lax",
    },
  );
}

function clearAdminCookie(req, name) {
  return clearCookie(name, {
    httpOnly: true,
    secure: isSecureOrigin(getAdminPublicOrigin(req)),
    sameSite: "Lax",
  });
}

function requireAdminSession(req, res, context, options = {}) {
  const session = readAdminSession(req);
  if (session) {
    return session;
  }

  if (options.api) {
    sendJson(res, 401, {
      error: "Admin authentication required",
      loginUrl: "/admin",
      requestId: context.requestId,
    });
  } else {
    res.writeHead(302, {
      Location: "/admin",
      "Cache-Control": "no-store",
    });
    res.end();
  }

  finalizeRequestLog(req, res, context, {
    failed: true,
    route: options.route ?? "admin_auth_required",
  });
  return null;
}

function assertAdminCsrf(req, session) {
  const csrfHeader = req.headers["x-admin-csrf-token"];
  const csrfToken = Array.isArray(csrfHeader) ? csrfHeader[0] : csrfHeader;
  if (!constantTimeStringEquals(String(csrfToken ?? ""), String(session?.csrfToken ?? ""))) {
    throw Object.assign(new Error("Invalid CSRF token"), { statusCode: 403 });
  }
}

function serveAdminPage(req, res) {
  const adminSession = readAdminSession(req);
  const html = renderAdminPage({
    authConfig: getAdminAuthSummary(),
    csrfToken: adminSession?.csrfToken ?? "",
    currentUser: sanitizeAdminSessionForClient(adminSession),
    publicOrigin: getAdminPublicOrigin(req),
  });
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(html);
}

function handleAdminDevLogin(req, res) {
  if (!ADMIN_DEV_AUTH_EMAIL) {
    throw Object.assign(new Error("ADMIN_DEV_AUTH_EMAIL is not configured"), { statusCode: 404 });
  }

  const session = createAdminSession({
    email: ADMIN_DEV_AUTH_EMAIL,
    name: ADMIN_DEV_AUTH_NAME,
    picture: null,
  });

  res.writeHead(302, {
    Location: "/admin",
    "Cache-Control": "no-store",
    "Set-Cookie": buildAdminSessionCookie(req, session),
  });
  res.end();
}

async function handleAdminGoogleAuthStart(req, res) {
  if (!ADMIN_GOOGLE_CLIENT_ID || !ADMIN_GOOGLE_CLIENT_SECRET) {
    throw Object.assign(new Error("Google OAuth is not configured"), { statusCode: 500 });
  }

  const stateToken = signAdminPayload({
    exp: Date.now() + ADMIN_OAUTH_STATE_TTL_MS,
    nonce: randomId(),
  });

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", ADMIN_GOOGLE_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", `${getAdminPublicOrigin(req)}/admin/auth/google/callback`);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", stateToken);
  authUrl.searchParams.set("prompt", "select_account");

  res.writeHead(302, {
    Location: authUrl.toString(),
    "Cache-Control": "no-store",
    "Set-Cookie": buildAdminOauthStateCookie(req, stateToken),
  });
  res.end();
}

async function handleAdminGoogleAuthCallback(req, res, url) {
  if (!ADMIN_GOOGLE_CLIENT_ID || !ADMIN_GOOGLE_CLIENT_SECRET) {
    throw Object.assign(new Error("Google OAuth is not configured"), { statusCode: 500 });
  }

  const code = String(url.searchParams.get("code") ?? "").trim();
  const state = String(url.searchParams.get("state") ?? "").trim();
  const cookieState = parseCookies(req.headers.cookie)[ADMIN_OAUTH_STATE_COOKIE];

  if (!code || !state || !cookieState || !constantTimeStringEquals(state, cookieState) || !readSignedAdminPayload(state)) {
    throw Object.assign(new Error("Invalid OAuth state"), { statusCode: 403 });
  }

  const googleUser = await exchangeGoogleAuthCodeForUser(req, code);
  authorizeGoogleAdminUser(googleUser);

  const session = createAdminSession(googleUser);
  res.writeHead(302, {
    Location: "/admin",
    "Cache-Control": "no-store",
    "Set-Cookie": [
      buildAdminSessionCookie(req, session),
      clearAdminCookie(req, ADMIN_OAUTH_STATE_COOKIE),
    ],
  });
  res.end();
}

function handleAdminLogout(req, res) {
  res.writeHead(302, {
    Location: "/admin",
    "Cache-Control": "no-store",
    "Set-Cookie": [
      clearAdminCookie(req, ADMIN_SESSION_COOKIE),
      clearAdminCookie(req, ADMIN_OAUTH_STATE_COOKIE),
    ],
  });
  res.end();
}

async function exchangeGoogleAuthCodeForUser(req, code) {
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: ADMIN_GOOGLE_CLIENT_ID,
      client_secret: ADMIN_GOOGLE_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: `${getAdminPublicOrigin(req)}/admin/auth/google/callback`,
    }),
  });
  const tokenPayload = await readJsonResponseOrThrow(tokenResponse, "Google token exchange failed");
  const accessToken = String(tokenPayload.access_token ?? "").trim();
  if (!accessToken) {
    throw Object.assign(new Error("Google token exchange did not return an access token"), { statusCode: 502 });
  }

  const userResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  return readJsonResponseOrThrow(userResponse, "Google userinfo request failed");
}

async function readJsonResponseOrThrow(response, fallbackMessage) {
  const text = await response.text();
  let payload = null;
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const upstreamMessage = payload?.error_description ?? payload?.error ?? payload?.message ?? text;
    throw Object.assign(new Error(upstreamMessage || fallbackMessage), { statusCode: 502 });
  }

  return payload ?? {};
}

function authorizeGoogleAdminUser(googleUser) {
  const email = String(googleUser?.email ?? "").trim().toLowerCase();
  const emailVerified = Boolean(googleUser?.email_verified);
  if (!email || !emailVerified) {
    throw Object.assign(new Error("Google account email is missing or not verified"), { statusCode: 403 });
  }

  const emailAllowed = ADMIN_GOOGLE_ALLOWED_EMAILS.length === 0 || ADMIN_GOOGLE_ALLOWED_EMAILS.includes(email);
  const domainAllowed = !ADMIN_GOOGLE_ALLOWED_DOMAIN || email.endsWith(`@${ADMIN_GOOGLE_ALLOWED_DOMAIN}`);

  if (!emailAllowed || !domainAllowed) {
    throw Object.assign(new Error("Google account is not allowed for admin access"), { statusCode: 403 });
  }
}

function createDefaultMoneyServerIntegration() {
  return {
    apiKey: "",
    authHeaderName: "Authorization",
    authScheme: "Bearer",
    balanceUnit: "minor",
    baseUrl: "",
    enabled: false,
    readPathTemplate: "/wallets/{playerId}",
    writePathTemplate: "/wallets/{playerId}/balance",
  };
}

function createDefaultUsersDbIntegration() {
  return {
    connectionString: "",
    emailColumn: "email",
    enabled: false,
    idColumn: "id",
    limit: 50,
    nameColumn: "name",
    roleColumn: "role",
    schema: "public",
    usersTable: "users",
  };
}

function createDefaultBackofficeGameSettings() {
  return {
    bonusEnabled: null,
    defaultLocale: "",
    freespinsEnabled: null,
    jackpotGrand: null,
    jackpotMajor: null,
    jackpotMini: null,
    overallRtp: null,
    roleRtp: {
      high: null,
      low: null,
      middle: null,
    },
    supportedLocales: [],
  };
}

function normalizeNullableText(value, fallback = "") {
  const normalized = String(value ?? "").trim();
  return normalized || fallback;
}

function normalizeBackofficeRole(value, fallback = BACKOFFICE_DEFAULT_ROLE) {
  const normalized = String(value ?? "").trim().toLowerCase();
  return BACKOFFICE_PLAYER_ROLES.includes(normalized) ? normalized : fallback;
}

function normalizeBooleanFlag(value, fallback = null) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  if (value === true || value === "true" || value === "1" || value === 1) {
    return true;
  }
  if (value === false || value === "false" || value === "0" || value === 0) {
    return false;
  }
  return fallback;
}

function normalizeNullableMoneySetting(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const normalized = String(value).trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) {
    return null;
  }
  return Number.parseFloat(normalized);
}

function normalizeBackofficeGameSettings(value) {
  const defaults = createDefaultBackofficeGameSettings();
  const roleRtp = value?.roleRtp ?? {};
  const supportedLocalesRaw = Array.isArray(value?.supportedLocales)
    ? value.supportedLocales
    : String(value?.supportedLocales ?? "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);

  return {
    bonusEnabled: normalizeBooleanFlag(value?.bonusEnabled, defaults.bonusEnabled),
    defaultLocale: normalizeNullableText(value?.defaultLocale, defaults.defaultLocale),
    freespinsEnabled: normalizeBooleanFlag(value?.freespinsEnabled, defaults.freespinsEnabled),
    jackpotGrand: normalizeNullableMoneySetting(value?.jackpotGrand),
    jackpotMajor: normalizeNullableMoneySetting(value?.jackpotMajor),
    jackpotMini: normalizeNullableMoneySetting(value?.jackpotMini),
    overallRtp: normalizeRtpTarget(value?.overallRtp, defaults.overallRtp),
    roleRtp: {
      high: normalizeRtpTarget(roleRtp.high, defaults.roleRtp.high),
      low: normalizeRtpTarget(roleRtp.low, defaults.roleRtp.low),
      middle: normalizeRtpTarget(roleRtp.middle, defaults.roleRtp.middle),
    },
    supportedLocales: supportedLocalesRaw,
  };
}

function normalizeBackofficeMoneyServerIntegration(value) {
  const defaults = createDefaultMoneyServerIntegration();
  const balanceUnit = String(value?.balanceUnit ?? defaults.balanceUnit).trim().toLowerCase();
  return {
    apiKey: String(value?.apiKey ?? defaults.apiKey).trim(),
    authHeaderName: normalizeNullableText(value?.authHeaderName, defaults.authHeaderName),
    authScheme: normalizeNullableText(value?.authScheme, defaults.authScheme),
    balanceUnit: balanceUnit === "major" ? "major" : "minor",
    baseUrl: String(value?.baseUrl ?? defaults.baseUrl).trim(),
    enabled: normalizeBooleanFlag(value?.enabled, defaults.enabled) ?? defaults.enabled,
    readPathTemplate: normalizeNullableText(value?.readPathTemplate, defaults.readPathTemplate),
    writePathTemplate: normalizeNullableText(value?.writePathTemplate, defaults.writePathTemplate),
  };
}

function normalizeBackofficeUsersDbIntegration(value) {
  const defaults = createDefaultUsersDbIntegration();
  const limit = Number.parseInt(String(value?.limit ?? defaults.limit), 10);
  return {
    connectionString: String(value?.connectionString ?? defaults.connectionString).trim(),
    emailColumn: normalizeNullableText(value?.emailColumn, defaults.emailColumn),
    enabled: normalizeBooleanFlag(value?.enabled, defaults.enabled) ?? defaults.enabled,
    idColumn: normalizeNullableText(value?.idColumn, defaults.idColumn),
    limit: Number.isFinite(limit) && limit > 0 ? Math.min(limit, 200) : defaults.limit,
    nameColumn: normalizeNullableText(value?.nameColumn, defaults.nameColumn),
    roleColumn: normalizeNullableText(value?.roleColumn, defaults.roleColumn),
    schema: normalizeNullableText(value?.schema, defaults.schema),
    usersTable: normalizeNullableText(value?.usersTable, defaults.usersTable),
  };
}

function normalizeBackofficeState(value) {
  const next = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const gameSettings = {};
  for (const [gameId, settings] of Object.entries(next.gameSettings ?? {})) {
    gameSettings[gameId] = normalizeBackofficeGameSettings(settings);
  }

  const playerRoles = {};
  for (const [playerId, role] of Object.entries(next.playerRoles ?? {})) {
    playerRoles[playerId] = normalizeBackofficeRole(role);
  }

  return {
    gameSettings,
    integrations: {
      moneyServer: normalizeBackofficeMoneyServerIntegration(next.integrations?.moneyServer),
      usersDb: normalizeBackofficeUsersDbIntegration(next.integrations?.usersDb),
    },
    playerRoles,
  };
}

function loadAdminRuntimeState() {
  try {
    if (!fs.existsSync(ADMIN_RUNTIME_FILE)) {
      return;
    }

    const raw = fs.readFileSync(ADMIN_RUNTIME_FILE, "utf8");
    const parsed = JSON.parse(raw);
    adminRuntimeState.backoffice = normalizeBackofficeState(parsed?.backoffice);
    const legacyRtp = normalizeRtpTarget(parsed?.threeOaksProductRtpTarget, null);
    if (legacyRtp != null && !adminRuntimeState.backoffice.gameSettings.aztecSunProduct?.overallRtp) {
      adminRuntimeState.backoffice.gameSettings.aztecSunProduct = {
        ...createDefaultBackofficeGameSettings(),
        ...adminRuntimeState.backoffice.gameSettings.aztecSunProduct,
        overallRtp: legacyRtp,
      };
    }
    adminRuntimeState.threeOaksProductRtpTarget = normalizeRtpTarget(
      adminRuntimeState.backoffice.gameSettings.aztecSunProduct?.overallRtp,
      legacyRtp,
    );
    adminRuntimeState.updatedAt = Number.isFinite(parsed?.updatedAt) ? parsed.updatedAt : null;
  } catch (error) {
    writeStructuredLog("admin_runtime_load_failed", {
      message: error?.message ?? "Unknown error",
    });
  }
}

function persistAdminRuntimeState() {
  try {
    fs.writeFileSync(ADMIN_RUNTIME_FILE, JSON.stringify({
      backoffice: adminRuntimeState.backoffice,
      threeOaksProductRtpTarget: adminRuntimeState.threeOaksProductRtpTarget,
      updatedAt: adminRuntimeState.updatedAt,
    }, null, 2));
  } catch (error) {
    writeStructuredLog("admin_runtime_persist_failed", {
      message: error?.message ?? "Unknown error",
    });
  }
}

function applyAdminRuntimeState() {
  applyThreeOaksProductRtpTarget(
    normalizeRtpTarget(
      adminRuntimeState.backoffice.gameSettings.aztecSunProduct?.overallRtp,
      adminRuntimeState.threeOaksProductRtpTarget,
    ),
  );
}

function applyThreeOaksProductRtpTarget(nextTarget) {
  if (!slotConfigs.aztecSunProduct?.rtp) {
    return;
  }
  slotConfigs.aztecSunProduct.rtp.target = normalizeRtpTarget(nextTarget, THREE_OAKS_PRODUCT_BASE_RTP_TARGET);
}

function normalizeRtpTarget(value, fallback) {
  if (value == null || value === "") {
    return fallback;
  }
  const parsed = Number.parseFloat(String(value).trim().replace(",", "."));
  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }
  const normalized = parsed > 1 ? parsed / 100 : parsed;
  if (normalized > 1) {
    return fallback;
  }
  return normalized;
}

function getThreeOaksAdminRuntimeSummary() {
  return {
    configuredOverrideRtp: adminRuntimeState.threeOaksProductRtpTarget,
    currentTargetRtp: normalizeRtpTarget(slotConfigs.aztecSunProduct?.rtp?.target, THREE_OAKS_PRODUCT_BASE_RTP_TARGET),
    defaultCurrency: THREE_OAKS_PRODUCT_DEFAULT_CURRENCY,
    defaultPlayerId: THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID,
    defaultTargetRtp: THREE_OAKS_PRODUCT_BASE_RTP_TARGET,
    updatedAt: adminRuntimeState.updatedAt,
    updatedAtLabel: formatAdminDate(adminRuntimeState.updatedAt),
  };
}

function collectThreeOaksProductSessions() {
  const store = sessionStores.get(slotConfigs.aztecSunProduct.id);
  if (!store) {
    return [];
  }

  return [...store.sessions.entries()]
    .map(([sessionId, entry]) => {
      const state = entry?.state ?? {};
      return {
        balance: normalizeMoneyAmount(state.balance, 0),
        balanceDisplay: formatMinorMoney(state.balance, state.currency),
        currency: String(state.currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY,
        mode: resolveThreeOaksAdminSessionMode(state),
        playerId: String(state.huid ?? THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID).trim() || THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID,
        sessionId,
        updatedAt: Number.isFinite(entry?.updatedAt) ? entry.updatedAt : Date.now(),
        updatedAtLabel: formatAdminDate(entry?.updatedAt),
      };
    })
    .sort((left, right) => right.updatedAt - left.updatedAt);
}

function resolveThreeOaksAdminSessionMode(state) {
  if (state?.bonusActive) {
    return "bonus";
  }
  if (state?.freespinsActive || state?.pendingFsTrigger) {
    return "freespins";
  }
  return "spins";
}

function serializeThreeOaksAdminWallet(wallet, activeSessionCount = 0) {
  return {
    activeSessionCount,
    balance: wallet.balance,
    balanceDisplay: formatMinorMoney(wallet.balance, wallet.currency),
    createdAt: wallet.createdAt,
    currency: wallet.currency,
    playerId: wallet.playerId,
    updatedAt: wallet.updatedAt,
    updatedAtLabel: formatAdminDate(wallet.updatedAt),
  };
}

function buildThreeOaksAdminOverview() {
  const sessions = collectThreeOaksProductSessions();
  const sessionCounts = new Map();

  for (const session of sessions) {
    sessionCounts.set(session.playerId, (sessionCounts.get(session.playerId) ?? 0) + 1);
  }

  const wallets = [...threeOaksProductPlayerWallets.values()]
    .map((wallet) => serializeThreeOaksAdminWallet(wallet, sessionCounts.get(wallet.playerId) ?? 0))
    .sort((left, right) => right.updatedAt - left.updatedAt);

  return {
    generatedAt: Date.now(),
    runtime: getThreeOaksAdminRuntimeSummary(),
    sessions,
    wallets,
  };
}

function parseAdminMoneyInput(value) {
  const normalized = String(value ?? "").trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) {
    return null;
  }
  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }
  return Math.round(parsed * 100);
}

function applyAdminWalletUpdate(payload, adminSession) {
  const action = String(payload?.action ?? "set").trim().toLowerCase();
  const playerId = String(payload?.playerId ?? "").trim() || THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID;
  const currency = String(payload?.currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY;
  const amountMinor = parseAdminMoneyInput(payload?.amount);

  if (!["set", "deposit", "withdraw"].includes(action)) {
    throw Object.assign(new Error("Unsupported wallet action"), { statusCode: 400 });
  }

  if (!Number.isFinite(amountMinor)) {
    throw Object.assign(new Error("Amount must be a non-negative money value with up to 2 decimals"), { statusCode: 400 });
  }

  const wallet = resolveThreeOaksProductPlayerWallet(playerId, currency);
  let nextBalance = wallet.balance;
  if (action === "set") {
    nextBalance = amountMinor;
  } else if (action === "deposit") {
    nextBalance = wallet.balance + amountMinor;
  } else if (amountMinor > wallet.balance) {
    throw Object.assign(new Error("Withdrawal exceeds current balance"), { statusCode: 400 });
  } else {
    nextBalance = wallet.balance - amountMinor;
  }

  wallet.balance = Math.max(0, nextBalance);
  wallet.currency = currency;
  wallet.updatedAt = Date.now();
  threeOaksProductPlayerWallets.set(wallet.playerId, wallet);
  persistThreeOaksProductPlayerWallets();

  const updatedSessions = syncThreeOaksProductWalletToActiveSessions(wallet);
  writeStructuredLog("admin_wallet_update", {
    action,
    adminEmail: adminSession.email,
    balance: wallet.balance,
    currency: wallet.currency,
    playerId: wallet.playerId,
    updatedSessions,
  });

  return {
    action,
    updatedSessions,
    wallet: serializeThreeOaksAdminWallet(wallet, updatedSessions),
  };
}

function syncThreeOaksProductWalletToActiveSessions(wallet) {
  const store = sessionStores.get(slotConfigs.aztecSunProduct.id);
  if (!store) {
    return 0;
  }

  let updatedSessions = 0;
  for (const entry of store.sessions.values()) {
    const state = entry?.state;
    if (!state || String(state.huid ?? "").trim() !== wallet.playerId) {
      continue;
    }
    state.balance = wallet.balance;
    state.currency = wallet.currency;
    bumpBalanceVersion(state);
    entry.updatedAt = Date.now();
    updatedSessions += 1;
  }

  if (updatedSessions > 0) {
    store.scheduleFlush();
  }

  return updatedSessions;
}

function applyAdminRtpUpdate(payload, adminSession) {
  const shouldReset = payload?.reset === true || payload?.reset === "true";
  const currentSettings = adminRuntimeState.backoffice.gameSettings.aztecSunProduct ?? createDefaultBackofficeGameSettings();
  if (shouldReset) {
    adminRuntimeState.threeOaksProductRtpTarget = null;
    adminRuntimeState.backoffice.gameSettings.aztecSunProduct = {
      ...currentSettings,
      overallRtp: null,
    };
    adminRuntimeState.updatedAt = Date.now();
    applyAdminRuntimeState();
    persistAdminRuntimeState();
    writeStructuredLog("admin_rtp_update", {
      adminEmail: adminSession.email,
      currentTargetRtp: slotConfigs.aztecSunProduct?.rtp?.target,
      reset: true,
    });
    return getThreeOaksAdminRuntimeSummary();
  }

  const normalizedTarget = normalizeRtpTarget(payload?.target, null);
  if (!Number.isFinite(normalizedTarget)) {
    throw Object.assign(new Error("RTP target must be between 0 and 1, or between 0 and 100 percent"), { statusCode: 400 });
  }

  adminRuntimeState.threeOaksProductRtpTarget = normalizedTarget;
  adminRuntimeState.backoffice.gameSettings.aztecSunProduct = {
    ...currentSettings,
    overallRtp: normalizedTarget,
  };
  adminRuntimeState.updatedAt = Date.now();
  applyAdminRuntimeState();
  persistAdminRuntimeState();
  writeStructuredLog("admin_rtp_update", {
    adminEmail: adminSession.email,
    currentTargetRtp: slotConfigs.aztecSunProduct?.rtp?.target,
    reset: false,
  });
  return getThreeOaksAdminRuntimeSummary();
}

function parseAdminBackofficePlayerRoute(pathname) {
  const prefix = "/admin/api/backoffice/players/";
  if (!pathname.startsWith(prefix)) {
    return null;
  }
  const playerId = decodeURIComponent(pathname.slice(prefix.length));
  return playerId ? { playerId } : null;
}

function parseAdminBackofficeGameRoute(pathname) {
  const prefix = "/admin/api/backoffice/games/";
  if (!pathname.startsWith(prefix)) {
    return null;
  }
  const gameId = decodeURIComponent(pathname.slice(prefix.length));
  return gameId ? { gameId } : null;
}

function sanitizeBackofficeLimit(value, fallback = 40) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.min(parsed, 200);
}

function isSafeSqlIdentifier(value) {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(value ?? ""));
}

function quoteSqlIdentifier(value) {
  if (!isSafeSqlIdentifier(value)) {
    throw Object.assign(new Error(`Unsafe SQL identifier: ${value}`), { statusCode: 400 });
  }
  return `"${value}"`;
}

function touchAdminRuntimeState() {
  adminRuntimeState.updatedAt = Date.now();
  persistAdminRuntimeState();
  applyAdminRuntimeState();
}

function getStoredBackofficeGameSettings(gameId) {
  return {
    ...createDefaultBackofficeGameSettings(),
    ...adminRuntimeState.backoffice.gameSettings[gameId],
    roleRtp: {
      ...createDefaultBackofficeGameSettings().roleRtp,
      ...(adminRuntimeState.backoffice.gameSettings[gameId]?.roleRtp ?? {}),
    },
  };
}

function setStoredBackofficeGameSettings(gameId, settings, options = {}) {
  adminRuntimeState.backoffice.gameSettings[gameId] = options.normalized
    ? settings
    : normalizeBackofficeGameSettings(settings);
  if (gameId === "aztecSunProduct") {
    adminRuntimeState.threeOaksProductRtpTarget = adminRuntimeState.backoffice.gameSettings[gameId].overallRtp;
  }
  touchAdminRuntimeState();
  return adminRuntimeState.backoffice.gameSettings[gameId];
}

function getStoredBackofficePlayerRole(playerId, fallback = BACKOFFICE_DEFAULT_ROLE) {
  return normalizeBackofficeRole(adminRuntimeState.backoffice.playerRoles[playerId], fallback);
}

function setStoredBackofficePlayerRole(playerId, role) {
  adminRuntimeState.backoffice.playerRoles[playerId] = normalizeBackofficeRole(role);
  touchAdminRuntimeState();
  return adminRuntimeState.backoffice.playerRoles[playerId];
}

function getConnectedGamesCatalog() {
  const localGames = Object.values(slotConfigs).map((config) => ({
    configurable: true,
    gameId: config.id,
    launchPath: config.routeBase || config.indexPath || "/",
    mode: config.threeOaks?.mode ?? "local",
    name: config.name ?? humanizeGameName(config.gameName ?? config.id),
    provider: normalizeNullableText(config.protocol, "local"),
    source: "local-slot-server",
    type: "slot",
  }));

  const amaticGames = Object.values(amaticConfigs).map((config) => ({
    configurable: false,
    gameId: config.id,
    launchPath: config.routeBase,
    mode: "remote-assets-local-shell",
    name: config.name ?? humanizeGameName(config.slug ?? config.id),
    provider: "amatic",
    source: "amatic-local",
    type: "slot",
  }));

  const bgamingGames = Object.values(bgamingConfigs).map((config) => ({
    configurable: false,
    gameId: config.game,
    launchPath: buildBgamingLaunchUrl(`http://${serverConfig.host}:${serverConfig.port}`, config),
    mode: "launch-bridge",
    name: config.name ?? humanizeGameName(config.game),
    provider: "bgaming",
    source: "bgaming-bridge",
    type: "slot",
  }));

  const beplayGames = Object.values(beplayConfigs).map((config) => ({
    configurable: false,
    gameId: config.game,
    launchPath: buildBeplayLaunchUrl(`http://${serverConfig.host}:${serverConfig.port}`, config),
    mode: "launch-bridge",
    name: config.name ?? humanizeGameName(config.game),
    provider: "beplay",
    source: "beplay-bridge",
    type: "slot",
  }));

  return [...localGames, ...amaticGames, ...bgamingGames, ...beplayGames]
    .sort((left, right) => left.name.localeCompare(right.name));
}

function humanizeGameName(value) {
  return String(value ?? "")
    .replaceAll(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function collectLocalPlayerAnalytics() {
  const players = new Map();

  for (const wallet of threeOaksProductPlayerWallets.values()) {
    const player = ensureLocalPlayerAnalytics(players, wallet.playerId);
    player.balance = wallet.balance;
    player.currency = wallet.currency;
    player.walletUpdatedAt = wallet.updatedAt;
    player.walletsCount = 1;
  }

  for (const [gameId, store] of sessionStores.entries()) {
    for (const [sessionId, entry] of store.sessions.entries()) {
      const state = entry?.state ?? {};
      const playerId = String(state.huid ?? "").trim();
      if (!playerId) {
        continue;
      }

      const player = ensureLocalPlayerAnalytics(players, playerId);
      const updatedAt = Number.isFinite(entry?.updatedAt) ? entry.updatedAt : Date.now();
      const totalBet = normalizeMoneyAmount(state.totalBet, 0);
      const totalWin = normalizeMoneyAmount(state.totalWin, 0);
      const balance = normalizeMoneyAmount(state.balance, player.balance ?? 0);
      const currency = String(state.currency ?? player.currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY;
      player.currency = currency;
      player.balance = balance;
      player.activeSessions += 1;
      player.lastActiveAt = Math.max(player.lastActiveAt ?? 0, updatedAt);
      player.totalBet += totalBet;
      player.totalWin += totalWin;

      const gameStats = player.games.get(gameId) ?? {
        activeSessions: 0,
        balance,
        currency,
        gameId,
        lastActiveAt: 0,
        sessionIds: [],
        totalBet: 0,
        totalWin: 0,
      };
      gameStats.activeSessions += 1;
      gameStats.balance = balance;
      gameStats.currency = currency;
      gameStats.lastActiveAt = Math.max(gameStats.lastActiveAt, updatedAt);
      gameStats.sessionIds.push(sessionId);
      gameStats.totalBet += totalBet;
      gameStats.totalWin += totalWin;
      player.games.set(gameId, gameStats);

      player.sessions.push({
        balance,
        balanceDisplay: formatMinorMoney(balance, currency),
        currency,
        gameId,
        mode: resolveThreeOaksAdminSessionMode(state),
        sessionId,
        totalBet,
        totalBetDisplay: formatMinorMoney(totalBet, currency),
        totalWin,
        totalWinDisplay: formatMinorMoney(totalWin, currency),
        updatedAt,
        updatedAtLabel: formatAdminDate(updatedAt),
      });
    }
  }

  return players;
}

function ensureLocalPlayerAnalytics(players, playerId) {
  let player = players.get(playerId);
  if (!player) {
    player = {
      activeSessions: 0,
      balance: null,
      currency: THREE_OAKS_PRODUCT_DEFAULT_CURRENCY,
      games: new Map(),
      lastActiveAt: 0,
      playerId,
      sessions: [],
      totalBet: 0,
      totalWin: 0,
      walletUpdatedAt: 0,
      walletsCount: 0,
    };
    players.set(playerId, player);
  }
  return player;
}

function collectLocalGameAnalytics() {
  const analytics = new Map();

  for (const game of getConnectedGamesCatalog()) {
    analytics.set(game.gameId, {
      activePlayers: new Set(),
      activeSessions: 0,
      gameId: game.gameId,
      lastActiveAt: 0,
      playerRoleCounts: {
        high: 0,
        low: 0,
        middle: 0,
      },
      sessions: [],
      totalBet: 0,
      totalWin: 0,
    });
  }

  for (const [gameId, store] of sessionStores.entries()) {
    const gameStats = analytics.get(gameId) ?? {
      activePlayers: new Set(),
      activeSessions: 0,
      gameId,
      lastActiveAt: 0,
      playerRoleCounts: {
        high: 0,
        low: 0,
        middle: 0,
      },
      sessions: [],
      totalBet: 0,
      totalWin: 0,
    };

    const uniqueRoleKeys = new Set();
    for (const [sessionId, entry] of store.sessions.entries()) {
      const state = entry?.state ?? {};
      const updatedAt = Number.isFinite(entry?.updatedAt) ? entry.updatedAt : Date.now();
      const playerId = String(state.huid ?? "").trim();
      const role = getStoredBackofficePlayerRole(playerId);
      const roleKey = `${playerId}:${role}`;
      if (playerId) {
        gameStats.activePlayers.add(playerId);
      }
      if (!uniqueRoleKeys.has(roleKey)) {
        uniqueRoleKeys.add(roleKey);
        gameStats.playerRoleCounts[role] += 1;
      }
      const totalBet = normalizeMoneyAmount(state.totalBet, 0);
      const totalWin = normalizeMoneyAmount(state.totalWin, 0);
      const balance = normalizeMoneyAmount(state.balance, 0);
      const currency = String(state.currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY;
      gameStats.activeSessions += 1;
      gameStats.lastActiveAt = Math.max(gameStats.lastActiveAt, updatedAt);
      gameStats.totalBet += totalBet;
      gameStats.totalWin += totalWin;
      gameStats.sessions.push({
        balance,
        balanceDisplay: formatMinorMoney(balance, currency),
        currency,
        playerId,
        role,
        sessionId,
        totalBet,
        totalBetDisplay: formatMinorMoney(totalBet, currency),
        totalWin,
        totalWinDisplay: formatMinorMoney(totalWin, currency),
        updatedAt,
        updatedAtLabel: formatAdminDate(updatedAt),
      });
    }

    analytics.set(gameId, gameStats);
  }

  return analytics;
}

function getResolvedPlayerRtp(totalBet, totalWin) {
  if (!Number.isFinite(totalBet) || totalBet <= 0) {
    return null;
  }
  return totalWin / totalBet;
}

function formatRtpLabel(value) {
  return Number.isFinite(value) ? `${(value * 100).toFixed(2)}%` : "n/a";
}

function buildBackofficePlayerSummary(playerId, localPlayer, usersDbPlayer = null) {
  const role = normalizeBackofficeRole(
    adminRuntimeState.backoffice.playerRoles[playerId] ?? usersDbPlayer?.dbRole,
    BACKOFFICE_DEFAULT_ROLE,
  );
  const currency = usersDbPlayer?.currency ?? localPlayer?.currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY;
  const balance = normalizeMoneyAmount(usersDbPlayer?.balance ?? localPlayer?.balance, 0);
  const totalBet = normalizeMoneyAmount(localPlayer?.totalBet, 0);
  const totalWin = normalizeMoneyAmount(localPlayer?.totalWin, 0);
  const rtp = getResolvedPlayerRtp(totalBet, totalWin);
  const sourceParts = [];
  if (usersDbPlayer) sourceParts.push("users-db");
  if (localPlayer) sourceParts.push("local-runtime");
  if (!sourceParts.length) sourceParts.push("local-runtime");
  const lastActiveAt = Math.max(localPlayer?.lastActiveAt ?? 0, localPlayer?.walletUpdatedAt ?? 0, 0);

  return {
    activeSessions: localPlayer?.activeSessions ?? 0,
    balance,
    balanceDisplay: formatMinorMoney(balance, currency),
    currency,
    displayName: usersDbPlayer?.displayName ?? playerId,
    email: usersDbPlayer?.email ?? "",
    lastActiveAt,
    lastActiveLabel: formatAdminDate(lastActiveAt),
    playerId,
    role,
    source: sourceParts.join(" + "),
    totalBet,
    totalBetDisplay: formatMinorMoney(totalBet, currency),
    totalWin,
    totalWinDisplay: formatMinorMoney(totalWin, currency),
    userRtp: rtp,
    userRtpDisplay: formatRtpLabel(rtp),
  };
}

async function queryBackofficeUsersDbPlayers({ query, limit }) {
  const settings = adminRuntimeState.backoffice.integrations.usersDb;
  if (!settings.enabled || !settings.connectionString) {
    return {
      error: null,
      players: [],
      source: "disabled",
    };
  }

  const schema = quoteSqlIdentifier(settings.schema);
  const table = quoteSqlIdentifier(settings.usersTable);
  const idColumn = quoteSqlIdentifier(settings.idColumn);
  const emailColumn = quoteSqlIdentifier(settings.emailColumn);
  const nameColumn = quoteSqlIdentifier(settings.nameColumn);
  const roleColumn = quoteSqlIdentifier(settings.roleColumn);
  const search = String(query ?? "").trim();
  const params = [];
  let whereClause = "";

  if (search) {
    params.push(`%${search}%`);
    whereClause = `
      WHERE CAST(${idColumn} AS text) ILIKE $1
      OR COALESCE(CAST(${emailColumn} AS text), '') ILIKE $1
      OR COALESCE(CAST(${nameColumn} AS text), '') ILIKE $1
    `;
  }

  params.push(limit);
  const limitParam = `$${params.length}`;
  const sql = `
    SELECT
      CAST(${idColumn} AS text) AS player_id,
      COALESCE(CAST(${emailColumn} AS text), '') AS email,
      COALESCE(CAST(${nameColumn} AS text), '') AS display_name,
      COALESCE(CAST(${roleColumn} AS text), '') AS db_role
    FROM ${schema}.${table}
    ${whereClause}
    ORDER BY ${idColumn} DESC
    LIMIT ${limitParam}
  `;

  const pool = new Pool({ connectionString: settings.connectionString });
  try {
    const result = await pool.query(sql, params);
    return {
      error: null,
      players: result.rows.map((row) => ({
        dbRole: normalizeBackofficeRole(row.db_role, BACKOFFICE_DEFAULT_ROLE),
        displayName: row.display_name || row.player_id,
        email: row.email || "",
        playerId: row.player_id,
      })),
      source: "users-db",
    };
  } catch (error) {
    return {
      error: error?.message ?? "Users DB query failed",
      players: [],
      source: "users-db-error",
    };
  } finally {
    await pool.end().catch(() => {});
  }
}

async function queryBackofficeUsersDbPlayer(playerId) {
  const settings = adminRuntimeState.backoffice.integrations.usersDb;
  if (!settings.enabled || !settings.connectionString) {
    return null;
  }

  const schema = quoteSqlIdentifier(settings.schema);
  const table = quoteSqlIdentifier(settings.usersTable);
  const idColumn = quoteSqlIdentifier(settings.idColumn);
  const emailColumn = quoteSqlIdentifier(settings.emailColumn);
  const nameColumn = quoteSqlIdentifier(settings.nameColumn);
  const roleColumn = quoteSqlIdentifier(settings.roleColumn);
  const sql = `
    SELECT
      CAST(${idColumn} AS text) AS player_id,
      COALESCE(CAST(${emailColumn} AS text), '') AS email,
      COALESCE(CAST(${nameColumn} AS text), '') AS display_name,
      COALESCE(CAST(${roleColumn} AS text), '') AS db_role
    FROM ${schema}.${table}
    WHERE CAST(${idColumn} AS text) = $1
    LIMIT 1
  `;

  const pool = new Pool({ connectionString: settings.connectionString });
  try {
    const result = await pool.query(sql, [playerId]);
    const row = result.rows[0];
    if (!row) {
      return null;
    }
    return {
      dbRole: normalizeBackofficeRole(row.db_role, BACKOFFICE_DEFAULT_ROLE),
      displayName: row.display_name || row.player_id,
      email: row.email || "",
      playerId: row.player_id,
    };
  } catch {
    return null;
  } finally {
    await pool.end().catch(() => {});
  }
}

function resolveBackofficeTemplate(baseUrl, pathTemplate, replacements) {
  const normalizedBase = String(baseUrl ?? "").trim().replace(/\/+$/, "");
  const normalizedPath = String(pathTemplate ?? "").trim() || "/";
  const interpolatedPath = normalizedPath.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, key) => (
    encodeURIComponent(String(replacements[key] ?? ""))
  ));
  const target = interpolatedPath.startsWith("http://") || interpolatedPath.startsWith("https://")
    ? interpolatedPath
    : `${normalizedBase}${interpolatedPath.startsWith("/") ? "" : "/"}${interpolatedPath}`;
  return new URL(target);
}

function buildMoneyServerHeaders(settings) {
  const headers = {
    accept: "application/json",
  };
  if (settings.apiKey) {
    const headerName = settings.authHeaderName || "Authorization";
    const headerValue = settings.authScheme
      ? `${settings.authScheme} ${settings.apiKey}`.trim()
      : settings.apiKey;
    headers[headerName] = headerValue;
  }
  return headers;
}

function parseMoneyServerBalanceValue(value, unit) {
  if (value == null || value === "") {
    return null;
  }
  if (unit === "major") {
    const normalized = String(value).trim().replace(",", ".");
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? Math.round(parsed * 100) : null;
  }
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function extractMoneyServerWalletPayload(payload, settings, playerId, fallbackCurrency) {
  const sources = [
    payload,
    payload?.data,
    payload?.wallet,
    payload?.result,
  ];
  for (const source of sources) {
    if (!source || typeof source !== "object") {
      continue;
    }
    const balance = parseMoneyServerBalanceValue(
      source.balance ?? source.amount ?? source.currentBalance,
      settings.balanceUnit,
    );
    if (!Number.isFinite(balance)) {
      continue;
    }
    return {
      balance,
      currency: String(source.currency ?? fallbackCurrency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY,
      playerId: String(source.playerId ?? source.userId ?? playerId).trim() || playerId,
      source: "money-server",
    };
  }
  return null;
}

async function readPlayerBalanceFromMoneyServer(playerId, currency) {
  const settings = adminRuntimeState.backoffice.integrations.moneyServer;
  if (!settings.enabled || !settings.baseUrl || !settings.readPathTemplate) {
    return null;
  }

  const target = resolveBackofficeTemplate(settings.baseUrl, settings.readPathTemplate, {
    currency,
    playerId,
  });
  const response = await fetch(target, {
    headers: buildMoneyServerHeaders(settings),
  });
  const payload = await readJsonResponseOrThrow(response, "Money server balance request failed");
  return extractMoneyServerWalletPayload(payload, settings, playerId, currency);
}

async function applyPlayerBalanceActionViaMoneyServer(playerId, currency, action, amountMinor, adminSession) {
  const settings = adminRuntimeState.backoffice.integrations.moneyServer;
  if (!settings.enabled || !settings.baseUrl || !settings.writePathTemplate) {
    return null;
  }

  try {
    const target = resolveBackofficeTemplate(settings.baseUrl, settings.writePathTemplate, {
      action,
      currency,
      playerId,
    });
    const response = await fetch(target, {
      body: JSON.stringify({
        action,
        actor: adminSession.email,
        amountMajor: Number((amountMinor / 100).toFixed(2)),
        amountMinor,
        currency,
        playerId,
      }),
      headers: {
        ...buildMoneyServerHeaders(settings),
        "content-type": "application/json",
      },
      method: "POST",
    });
    const payload = await readJsonResponseOrThrow(response, "Money server balance update failed");
    return extractMoneyServerWalletPayload(payload, settings, playerId, currency)
      ?? await readPlayerBalanceFromMoneyServer(playerId, currency);
  } catch (error) {
    writeStructuredLog("money_server_update_failed", {
      action,
      adminEmail: adminSession.email,
      currency,
      message: error?.message ?? "Unknown error",
      playerId,
    });
    return null;
  }
}

function syncResolvedPlayerBalanceToLocalState(playerId, currency, balance) {
  const wallet = resolveThreeOaksProductPlayerWallet(playerId, currency);
  wallet.balance = balance;
  wallet.currency = currency;
  wallet.updatedAt = Date.now();
  threeOaksProductPlayerWallets.set(wallet.playerId, wallet);
  persistThreeOaksProductPlayerWallets();
  syncThreeOaksProductWalletToActiveSessions(wallet);
  return serializeThreeOaksAdminWallet(wallet, 0);
}

async function listBackofficePlayers({ query, limit }) {
  const localPlayers = collectLocalPlayerAnalytics();
  const resolvedLimit = sanitizeBackofficeLimit(limit, 40);
  const search = String(query ?? "").trim().toLowerCase();
  const usersDbResult = await queryBackofficeUsersDbPlayers({ query: search, limit: resolvedLimit });
  const merged = new Map();

  for (const dbPlayer of usersDbResult.players) {
    const localPlayer = localPlayers.get(dbPlayer.playerId) ?? null;
    merged.set(dbPlayer.playerId, buildBackofficePlayerSummary(dbPlayer.playerId, localPlayer, dbPlayer));
  }

  for (const [playerId, localPlayer] of localPlayers.entries()) {
    const matchesQuery = !search
      || playerId.toLowerCase().includes(search)
      || String(localPlayer.currency ?? "").toLowerCase().includes(search);
    if (!matchesQuery || merged.has(playerId)) {
      continue;
    }
    merged.set(playerId, buildBackofficePlayerSummary(playerId, localPlayer, null));
  }

  const players = [...merged.values()]
    .sort((left, right) => (right.lastActiveAt ?? 0) - (left.lastActiveAt ?? 0) || left.playerId.localeCompare(right.playerId))
    .slice(0, resolvedLimit);

  const analytics = {
    byRole: {
      high: players.filter((player) => player.role === "high").length,
      low: players.filter((player) => player.role === "low").length,
      middle: players.filter((player) => player.role === "middle").length,
    },
    players: players.length,
    usersDbError: usersDbResult.error,
  };

  return {
    analytics,
    players,
    query: search,
    roles: BACKOFFICE_PLAYER_ROLES,
  };
}

async function resolvePlayerBalanceSnapshot(playerId, currency) {
  const localWallet = findThreeOaksProductPlayerWallet(playerId) ?? {
    balance: 0,
    currency: currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY,
  };
  try {
    const moneyServerWallet = await readPlayerBalanceFromMoneyServer(playerId, currency);
    if (moneyServerWallet) {
      syncResolvedPlayerBalanceToLocalState(moneyServerWallet.playerId, moneyServerWallet.currency, moneyServerWallet.balance);
      return {
        balance: moneyServerWallet.balance,
        balanceDisplay: formatMinorMoney(moneyServerWallet.balance, moneyServerWallet.currency),
        currency: moneyServerWallet.currency,
        source: "money-server",
      };
    }
  } catch (error) {
    return {
      balance: localWallet.balance,
      balanceDisplay: formatMinorMoney(localWallet.balance, localWallet.currency),
      currency: localWallet.currency,
      error: error?.message ?? "Money server request failed",
      source: "local-fallback",
    };
  }

  return {
    balance: localWallet.balance,
    balanceDisplay: formatMinorMoney(localWallet.balance, localWallet.currency),
    currency: localWallet.currency,
    source: "local-wallet",
  };
}

async function buildBackofficePlayerDetail(playerId) {
  const localPlayers = collectLocalPlayerAnalytics();
  const localPlayer = localPlayers.get(playerId) ?? null;
  const usersDbPlayer = await queryBackofficeUsersDbPlayer(playerId);
  const summary = buildBackofficePlayerSummary(playerId, localPlayer, usersDbPlayer);
  const balanceSnapshot = await resolvePlayerBalanceSnapshot(playerId, summary.currency);
  summary.balance = balanceSnapshot.balance;
  summary.balanceDisplay = balanceSnapshot.balanceDisplay;
  summary.currency = balanceSnapshot.currency;
  summary.balanceSource = balanceSnapshot.source;
  summary.balanceError = balanceSnapshot.error ?? null;

  const games = [...(localPlayer?.games.values() ?? [])]
    .map((gameStats) => ({
      activeSessions: gameStats.activeSessions,
      balanceDisplay: formatMinorMoney(gameStats.balance, gameStats.currency),
      currency: gameStats.currency,
      gameId: gameStats.gameId,
      lastActiveAt: gameStats.lastActiveAt,
      lastActiveLabel: formatAdminDate(gameStats.lastActiveAt),
      name: getConnectedGamesCatalog().find((game) => game.gameId === gameStats.gameId)?.name ?? humanizeGameName(gameStats.gameId),
      totalBet: gameStats.totalBet,
      totalBetDisplay: formatMinorMoney(gameStats.totalBet, gameStats.currency),
      totalWin: gameStats.totalWin,
      totalWinDisplay: formatMinorMoney(gameStats.totalWin, gameStats.currency),
      userRtp: getResolvedPlayerRtp(gameStats.totalBet, gameStats.totalWin),
      userRtpDisplay: formatRtpLabel(getResolvedPlayerRtp(gameStats.totalBet, gameStats.totalWin)),
    }))
    .sort((left, right) => right.lastActiveAt - left.lastActiveAt);

  const playerMetrics = [
    { label: "Balance", value: summary.balanceDisplay },
    { label: "User RTP", value: summary.userRtpDisplay },
    { label: "Role", value: summary.role },
    { label: "Active Sessions", value: String(summary.activeSessions) },
    { label: "Currency", value: summary.currency },
    { label: "Games Played", value: String(games.length) },
  ];

  return {
    games,
    metrics: playerMetrics,
    player: summary,
    sessions: (localPlayer?.sessions ?? []).sort((left, right) => right.updatedAt - left.updatedAt),
  };
}

async function applyBackofficePlayerUpdate(playerId, payload, adminSession) {
  let role = null;
  let walletResult = null;

  if (payload?.role != null && payload.role !== "") {
    role = setStoredBackofficePlayerRole(playerId, payload.role);
  }

  if (payload?.balanceAction || payload?.amount != null) {
    const action = String(payload?.balanceAction ?? payload?.action ?? "set").trim().toLowerCase();
    const currency = String(payload?.currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY;
    const amountMinor = parseAdminMoneyInput(payload?.amount);

    if (!["set", "deposit", "withdraw"].includes(action)) {
      throw Object.assign(new Error("Unsupported balance action"), { statusCode: 400 });
    }
    if (!Number.isFinite(amountMinor)) {
      throw Object.assign(new Error("Amount must be a non-negative money value with up to 2 decimals"), { statusCode: 400 });
    }

    const remoteWallet = await applyPlayerBalanceActionViaMoneyServer(playerId, currency, action, amountMinor, adminSession);
    if (remoteWallet) {
      walletResult = {
        action,
        source: "money-server",
        wallet: syncResolvedPlayerBalanceToLocalState(remoteWallet.playerId, remoteWallet.currency, remoteWallet.balance),
      };
    } else {
      walletResult = applyAdminWalletUpdate({
        action,
        amount: payload.amount,
        currency,
        playerId,
      }, adminSession);
      walletResult.source = "local-wallet";
    }
  }

  if (!role && !walletResult) {
    throw Object.assign(new Error("No player update payload provided"), { statusCode: 400 });
  }

  return {
    player: await buildBackofficePlayerDetail(playerId),
    role,
    walletResult,
  };
}

function buildBackofficeGameSummary(game, analytics) {
  const settings = getStoredBackofficeGameSettings(game.gameId);
  const realizedRtp = getResolvedPlayerRtp(analytics.totalBet, analytics.totalWin);
  return {
    activePlayers: analytics.activePlayers.size,
    activeSessions: analytics.activeSessions,
    configurable: game.configurable,
    gameId: game.gameId,
    lastActiveAt: analytics.lastActiveAt,
    lastActiveLabel: formatAdminDate(analytics.lastActiveAt),
    launchPath: game.launchPath,
    mode: game.mode,
    name: game.name,
    overallRtp: settings.overallRtp,
    overallRtpDisplay: formatRtpLabel(settings.overallRtp),
    provider: game.provider,
    realizedRtp,
    realizedRtpDisplay: formatRtpLabel(realizedRtp),
    source: game.source,
    totalBet: analytics.totalBet,
    totalBetDisplay: formatMinorMoney(analytics.totalBet, THREE_OAKS_PRODUCT_DEFAULT_CURRENCY),
    totalWin: analytics.totalWin,
    totalWinDisplay: formatMinorMoney(analytics.totalWin, THREE_OAKS_PRODUCT_DEFAULT_CURRENCY),
    type: game.type,
  };
}

function listBackofficeGames({ query, limit }) {
  const search = String(query ?? "").trim().toLowerCase();
  const resolvedLimit = sanitizeBackofficeLimit(limit, 40);
  const catalog = getConnectedGamesCatalog();
  const analytics = collectLocalGameAnalytics();
  const games = catalog
    .filter((game) => (
      !search
      || game.gameId.toLowerCase().includes(search)
      || game.name.toLowerCase().includes(search)
      || game.provider.toLowerCase().includes(search)
    ))
    .map((game) => buildBackofficeGameSummary(
      game,
      analytics.get(game.gameId) ?? {
        activePlayers: new Set(),
        activeSessions: 0,
        lastActiveAt: 0,
        playerRoleCounts: { high: 0, low: 0, middle: 0 },
        sessions: [],
        totalBet: 0,
        totalWin: 0,
      },
    ))
    .sort((left, right) => {
      const activityDelta = (right.activePlayers ?? 0) - (left.activePlayers ?? 0);
      if (activityDelta !== 0) {
        return activityDelta;
      }
      return left.name.localeCompare(right.name);
    })
    .slice(0, resolvedLimit);

  return {
    analytics: {
      activeGames: games.filter((game) => game.activeSessions > 0).length,
      activePlayers: games.reduce((sum, game) => sum + game.activePlayers, 0),
      games: games.length,
      providers: new Set(games.map((game) => game.provider)).size,
    },
    games,
    query: search,
  };
}

function buildBackofficeGameDetail(gameId) {
  const game = getConnectedGamesCatalog().find((entry) => entry.gameId === gameId);
  if (!game) {
    throw Object.assign(new Error("Game not found"), { statusCode: 404 });
  }

  const analytics = collectLocalGameAnalytics().get(gameId) ?? {
    activePlayers: new Set(),
    activeSessions: 0,
    lastActiveAt: 0,
    playerRoleCounts: { high: 0, low: 0, middle: 0 },
    sessions: [],
    totalBet: 0,
    totalWin: 0,
  };
  const settings = getStoredBackofficeGameSettings(gameId);
  const topPlayers = [...new Map(
    analytics.sessions.map((session) => [
      session.playerId || `${session.sessionId}-unknown`,
      {
        playerId: session.playerId || "unknown",
        role: session.role,
        totalBet: session.totalBet,
        totalBetDisplay: session.totalBetDisplay,
        totalWin: session.totalWin,
        totalWinDisplay: session.totalWinDisplay,
      },
    ]),
  ).values()];

  return {
    game: buildBackofficeGameSummary(game, analytics),
    metrics: [
      { label: "Players", value: String(analytics.activePlayers.size) },
      { label: "Sessions", value: String(analytics.activeSessions) },
      { label: "Realized RTP", value: formatRtpLabel(getResolvedPlayerRtp(analytics.totalBet, analytics.totalWin)) },
      { label: "Low Role", value: String(analytics.playerRoleCounts.low) },
      { label: "Middle Role", value: String(analytics.playerRoleCounts.middle) },
      { label: "High Role", value: String(analytics.playerRoleCounts.high) },
    ],
    roleAnalytics: analytics.playerRoleCounts,
    sessions: analytics.sessions.sort((left, right) => right.updatedAt - left.updatedAt),
    settings,
    topPlayers,
  };
}

function applyBackofficeGameSettingsUpdate(gameId, payload, adminSession) {
  const nextSettings = normalizeBackofficeGameSettings({
    bonusEnabled: payload?.bonusEnabled,
    defaultLocale: payload?.defaultLocale,
    freespinsEnabled: payload?.freespinsEnabled,
    jackpotGrand: payload?.jackpotGrand,
    jackpotMajor: payload?.jackpotMajor,
    jackpotMini: payload?.jackpotMini,
    overallRtp: payload?.overallRtp,
    roleRtp: {
      high: payload?.roleRtpHigh,
      low: payload?.roleRtpLow,
      middle: payload?.roleRtpMiddle,
    },
    supportedLocales: payload?.supportedLocales,
  });
  const settings = setStoredBackofficeGameSettings(gameId, nextSettings, { normalized: true });
  writeStructuredLog("backoffice_game_settings_update", {
    adminEmail: adminSession.email,
    gameId,
    settings,
  });
  return buildBackofficeGameDetail(gameId);
}

function getBackofficeSettingsPayload() {
  const settings = adminRuntimeState.backoffice.integrations;
  return {
    integrations: settings,
    summary: {
      moneyServerConfigured: Boolean(settings.moneyServer.baseUrl && settings.moneyServer.readPathTemplate),
      usersDbConfigured: Boolean(settings.usersDb.connectionString),
    },
  };
}

function applyBackofficeSettingsUpdate(payload, adminSession) {
  adminRuntimeState.backoffice.integrations.moneyServer = normalizeBackofficeMoneyServerIntegration(payload?.moneyServer);
  adminRuntimeState.backoffice.integrations.usersDb = normalizeBackofficeUsersDbIntegration(payload?.usersDb);
  touchAdminRuntimeState();
  writeStructuredLog("backoffice_settings_update", {
    adminEmail: adminSession.email,
    moneyServerEnabled: adminRuntimeState.backoffice.integrations.moneyServer.enabled,
    usersDbEnabled: adminRuntimeState.backoffice.integrations.usersDb.enabled,
  });
  return getBackofficeSettingsPayload();
}

function buildBackofficeSummaryCards(playersPayload, gamesPayload) {
  const settings = getBackofficeSettingsPayload();
  return [
    { label: "Players", value: String(playersPayload.analytics.players) },
    { label: "Games", value: String(gamesPayload.analytics.games) },
    { label: "Active Sessions", value: String(playersPayload.players.reduce((sum, player) => sum + player.activeSessions, 0)) },
    { label: "Money Server", value: settings.summary.moneyServerConfigured ? "Configured" : "Local" },
    { label: "Users DB", value: settings.summary.usersDbConfigured ? "Configured" : "Local" },
    { label: "Roles", value: BACKOFFICE_PLAYER_ROLES.join(" / ") },
  ];
}

async function buildBackofficeBootstrap() {
  const players = await listBackofficePlayers({ limit: 12, query: "" });
  const games = listBackofficeGames({ limit: 12, query: "" });
  return {
    featuredGameId: games.games[0]?.gameId ?? null,
    featuredPlayerId: players.players[0]?.playerId ?? THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID,
    games,
    players,
    settings: getBackofficeSettingsPayload(),
    summaryCards: buildBackofficeSummaryCards(players, games),
  };
}

function formatMinorMoney(amountMinor, currency = THREE_OAKS_PRODUCT_DEFAULT_CURRENCY) {
  const numericAmount = normalizeMoneyAmount(amountMinor, 0) / 100;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: String(currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  } catch {
    return `${numericAmount.toFixed(2)} ${String(currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY}`;
  }
}

function formatAdminDate(timestamp) {
  if (!Number.isFinite(timestamp)) {
    return "Never";
  }
  try {
    return new Date(timestamp).toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  } catch {
    return new Date(timestamp).toISOString();
  }
}

async function serveVirtualIndex(config, req, res) {
  const physicalPath = getPhysicalIndexPath(__dirname, config);
  const data = await fs.promises.readFile(physicalPath, "utf8");
  const forwardedProto = String(req.headers["x-forwarded-proto"] ?? "").split(",")[0]?.trim().toLowerCase();
  const protocol = forwardedProto === "https" ? "https" : "http";
  const origin = `${protocol}://${req.headers.host}`;
  const html = rewriteIndexHtml(config, data, origin);
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(html);
}

async function serveBeplayLocation(req, res, url) {
  const config = getBeplayConfig(url.searchParams.get("game"));
  if (!config) {
    sendText(res, 404, "Unknown BePlay game");
    return;
  }

  const html = await renderBeplayLocalLocationHtml(config);
  const override = readBeplayOverrideFromQuery(url.searchParams, config);
  const sessionState = getOrCreateBeplayLocalSession(req.headers.cookie, config.game);
  const cookies = [];

  if (sessionState.created) {
    cookies.push(serializeCookie(BEPLAY_SESSION_COOKIE, encodeURIComponent(JSON.stringify({
      game: config.game,
      sessionId: sessionState.session.sessionId,
    })), Math.floor(BEPLAY_LOCAL_SESSION_TTL_MS / 1000)));
  }
  if (override) {
    cookies.push(serializeCookie(BEPLAY_OVERRIDE_COOKIE, encodeURIComponent(JSON.stringify(override))));
  }
  if (cookies.length > 0) {
    res.setHeader("Set-Cookie", cookies);
  }

  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(html);
}

async function renderBeplayLocalLocationHtml(config) {
  const snapshotRoot = path.join(BEPLAY_CACHE_ROOT, "filez", config.game, "snapshot");
  const assetsDir = path.join(snapshotRoot, "assets");
  const templatePath = path.join(BEPLAY_CACHE_ROOT, "templates", `${config.game}.location.html`);

  const template = await fs.promises.readFile(templatePath, "utf8").catch(() => "");
  if (!template) {
    throw Object.assign(new Error(`Missing local BePlay location template for ${config.game}`), { statusCode: 500 });
  }

  const assetFiles = await fs.promises.readdir(assetsDir).catch(() => []);
  const entryScript = assetFiles
    .filter((name) => /^index-.*\.js$/i.test(name))
    .sort()[0];
  if (!entryScript) {
    throw Object.assign(new Error(`Missing BePlay entry script for ${config.game}`), { statusCode: 500 });
  }

  return template
    .replace(/<base href="[^"]*"\s*\/?>/i, `<base href="/filez/${config.game}/snapshot/" />`)
    .replace(/<script type="module" crossorigin src="\.\/assets\/index-[^"]+\.js"><\/script>/i, `<script type="module" crossorigin src="./assets/${entryScript}"></script>`);
}

async function handleBeplayLocalApi(req, res, url, body) {
  if (req.method === "GET" || req.method === "HEAD") {
    sendJson(res, 405, { error: "BePlay local API expects POST JSON requests." });
    return;
  }

  const endpoint = url.pathname.replace(/^\/beplay\/api/, "") || "/";
  const payload = parseJsonBody(body);
  const gameFromPayload = String(payload?.game ?? "").trim();
  const cookieState = readBeplaySessionCookie(req.headers.cookie);
  const resolvedGame = gameFromPayload || cookieState?.game || null;
  const config = resolvedGame ? getBeplayConfig(resolvedGame) : null;

  if (!config) {
    sendJson(res, 404, { error: "Unknown BePlay game" });
    return;
  }

  const sessionState = getOrCreateBeplayLocalSession(req.headers.cookie, config.game);
  const responseHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };
  if (sessionState.created) {
    responseHeaders["Set-Cookie"] = serializeCookie(BEPLAY_SESSION_COOKIE, encodeURIComponent(JSON.stringify({
      game: config.game,
      sessionId: sessionState.session.sessionId,
    })), Math.floor(BEPLAY_LOCAL_SESSION_TTL_MS / 1000));
  }
  const session = sessionState.session;

  if (endpoint === "/authenticate") {
    if (typeof payload?.key === "string" && payload.key.includes(":")) {
      const parsedBalance = Number.parseFloat(payload.key.split(":")[1] ?? "");
      if (Number.isFinite(parsedBalance) && parsedBalance > 0) {
        session.balance = roundBeplayMoney(parsedBalance);
      }
    }
    session.currency = String(payload?.currency ?? payload?.currencyCode ?? session.currency ?? "USD").toUpperCase();
    session.token = `local.${config.game}.${randomId()}`;
    session.updatedAt = Date.now();
    res.writeHead(200, responseHeaders);
    res.end(JSON.stringify({
      token: session.token,
      balance: session.balance,
      currency: session.currency,
      currencyDecimals: 2,
      currencySymbol: session.currency,
      jurisdiction: "mt",
      playerId: session.playerId,
      nickname: null,
    }));
    return;
  }

  if (endpoint === "/game/info") {
    session.updatedAt = Date.now();
    res.writeHead(200, responseHeaders);
    res.end(JSON.stringify(getBeplayLocalGameInfo(config.game)));
    return;
  }

  if (endpoint === "/game/recover") {
    session.updatedAt = Date.now();
    res.writeHead(200, responseHeaders);
    res.end(JSON.stringify({ rounds: [] }));
    return;
  }

  if (endpoint === "/campaigns") {
    session.updatedAt = Date.now();
    res.writeHead(200, responseHeaders);
    res.end(JSON.stringify({ campaigns: [] }));
    return;
  }

  if (endpoint === "/game/play") {
    const override = readBeplayOverrideCookie(req.headers.cookie, config.game);
    let playPayload = payload;
    let overrideApplied = false;
    if (override && typeof body === "string") {
      const patchedBody = applyBeplayPlayOverride(body, override);
      if (patchedBody !== body) {
        playPayload = parseJsonBody(patchedBody);
        overrideApplied = true;
        writeStructuredLog("beplay_override_applied", {
          gameId: override.game,
          action: override.action,
          bet: override.bet,
        });
      }
    }

    const action = String(playPayload?.action ?? "main").trim() || "main";
    const requestedBet = Number.parseFloat(playPayload?.bet ?? "");
    const info = getBeplayLocalGameInfo(config.game);
    const defaultBet = Number(info?.bets?.main?.default ?? 1);
    const bet = roundBeplayMoney(Number.isFinite(requestedBet) && requestedBet > 0 ? requestedBet : defaultBet);

    if (session.balance < bet) {
      res.writeHead(200, responseHeaders);
      res.end(JSON.stringify({
        code: "INSUFFICIENT_FUNDS",
        message: "Insufficient funds",
      }));
      return;
    }

    const roundId = randomUUID();
    const win = createBeplayLocalWin(action, bet);
    const display = createBeplayLocalDisplay(config.game);
    session.balance = roundBeplayMoney(session.balance - bet + win);
    session.lastRound = {
      roundId,
      win,
      bet,
      action,
      balance: session.balance,
    };
    session.updatedAt = Date.now();
    session.rounds.set(roundId, session.lastRound);

    const responsePayload = {
      roundId,
      wager: {
        win,
        state: {
          display,
          bet,
          roundWin: win,
          action,
        },
        data: {
          winLines: [],
          action,
        },
      },
      balance: session.balance,
    };

    if (overrideApplied) {
      const currentCookies = responseHeaders["Set-Cookie"];
      responseHeaders["Set-Cookie"] = currentCookies
        ? [currentCookies, clearCookie(BEPLAY_OVERRIDE_COOKIE)]
        : clearCookie(BEPLAY_OVERRIDE_COOKIE);
      responseHeaders["X-Beplay-Override-Applied"] = "1";
    }

    res.writeHead(200, responseHeaders);
    res.end(JSON.stringify(responsePayload));
    return;
  }

  if (endpoint === "/game/complete") {
    const roundId = String(payload?.roundId ?? "").trim();
    const roundState = (roundId && session.rounds.get(roundId))
      || session.lastRound
      || { win: 0, balance: session.balance };
    if (roundId && session.rounds.has(roundId)) {
      session.rounds.delete(roundId);
    }
    session.updatedAt = Date.now();
    res.writeHead(200, responseHeaders);
    res.end(JSON.stringify({
      finalWin: roundState.win ?? 0,
      balance: session.balance,
    }));
    return;
  }

  sendJson(res, 404, { error: `Unknown BePlay endpoint: ${endpoint}` });
}

function getBeplayLocalGameInfo(game) {
  const info = BEPLAY_LOCAL_GAME_INFO[game];
  if (!info) {
    return {
      state: {},
      bets: {
        main: {
          available: [1, 2, 5, 10],
          default: 1,
          coin: 100,
        },
      },
      config: {
        paylines: [[1, 1, 1, 1, 1]],
        paytable: {},
        paytableCoins: 100,
        version: "1.0.0-local",
      },
      settings: {
        autoplayForbidden: "false",
      },
      betLimits: {
        minBet: 0.01,
        maxBet: 10000,
        maxExposure: 10000000,
        currencyRate: 1,
        currencyDecimals: 2,
        currencyUnit: 0.01,
        exchangeRate: 1,
      },
    };
  }
  return JSON.parse(JSON.stringify(info));
}

function getOrCreateBeplayLocalSession(cookieHeader, expectedGame) {
  pruneBeplayLocalSessions();
  const cookieState = readBeplaySessionCookie(cookieHeader, expectedGame);
  const existing = cookieState ? beplayLocalSessions.get(cookieState.sessionId) : null;
  if (existing?.game === expectedGame) {
    existing.updatedAt = Date.now();
    return {
      created: false,
      session: existing,
    };
  }

  const session = {
    sessionId: randomId(),
    game: expectedGame,
    balance: BEPLAY_LOCAL_DEFAULT_BALANCE,
    currency: "USD",
    token: null,
    playerId: randomUUID(),
    rounds: new Map(),
    lastRound: null,
    updatedAt: Date.now(),
  };
  beplayLocalSessions.set(session.sessionId, session);
  return {
    created: true,
    session,
  };
}

function pruneBeplayLocalSessions() {
  const cutoff = Date.now() - BEPLAY_LOCAL_SESSION_TTL_MS;
  for (const [sessionId, session] of beplayLocalSessions.entries()) {
    if ((session?.updatedAt ?? 0) < cutoff) {
      beplayLocalSessions.delete(sessionId);
    }
  }
}

function readBeplaySessionCookie(cookieHeader, expectedGame) {
  const rawValue = parseCookies(cookieHeader)[BEPLAY_SESSION_COOKIE];
  if (!rawValue) {
    return null;
  }
  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue));
    if (!parsed?.game || !parsed?.sessionId) {
      return null;
    }
    if (expectedGame && parsed.game !== expectedGame) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function roundBeplayMoney(value) {
  return Number(Math.max(0, value).toFixed(2));
}

function createBeplayLocalDisplay(game) {
  const symbolSets = {
    "tiger-s-prosperity": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    "koharus-suuuugoi-sweets": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  };
  const symbols = symbolSets[game] ?? [1, 2, 3, 4, 5, 6, 7];
  return Array.from({ length: 5 }, () => (
    Array.from({ length: 3 }, () => pickRandom(symbols))
  ));
}

function createBeplayLocalWin(action, bet) {
  const multipliers = action === "main"
    ? [0, 0, 0, 0.2, 0.5, 1, 2]
    : [0, 0.2, 0.5, 1, 2, 3, 5];
  return roundBeplayMoney(bet * pickRandom(multipliers));
}

async function serveBgamingLocation(req, res, url) {
  const config = getBgamingConfig(url.searchParams.get("game"));
  if (!config) {
    sendText(res, 404, "Unknown BGaming game");
    return;
  }

  const override = readBgamingOverrideFromQuery(url.searchParams, config);
  const sessionState = getOrCreateBgamingLocalSession(req.headers.cookie, config);
  const resolved = await resolveBgamingLaunchDocument(config, req.headers["user-agent"]);
  if (!resolved?.html || !resolved.options?.api) {
    const cookies = [
      serializeCookie(BGAMING_SESSION_COOKIE, encodeURIComponent(JSON.stringify({
        game: config.game,
        sessionId: sessionState.session.sessionId,
      })), Math.floor(BGAMING_LOCAL_SESSION_TTL_MS / 1000)),
      clearCookie(BGAMING_UPSTREAM_COOKIE),
    ];
    if (override) {
      cookies.push(serializeCookie(BGAMING_OVERRIDE_COOKIE, encodeURIComponent(JSON.stringify(override)), 10 * 60));
    }
    if (cookies.length > 0) {
      res.setHeader("Set-Cookie", cookies);
    }
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(renderBgamingIframeFallback(config));
    return;
  }

  const cookies = [
    serializeCookie(BGAMING_SESSION_COOKIE, encodeURIComponent(JSON.stringify({
      game: config.game,
      sessionId: sessionState.session.sessionId,
    })), Math.floor(BGAMING_LOCAL_SESSION_TTL_MS / 1000)),
    clearCookie(BGAMING_UPSTREAM_COOKIE),
  ];
  if (override) {
    cookies.push(serializeCookie(BGAMING_OVERRIDE_COOKIE, encodeURIComponent(JSON.stringify(override)), 10 * 60));
  }

  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    "Set-Cookie": cookies,
  });
  res.end(patchBgamingHtml(resolved.html, config, req.headers.host, resolved));
}

async function proxyBgamingApi(req, res, url, body) {
  const proxied = parseBgamingApiRequest(url.pathname);
  if (!proxied) {
    sendText(res, 404, "Unknown BGaming API route");
    return;
  }

  const config = getBgamingConfig(proxied.game);
  if (!config) {
    sendText(res, 404, "Unknown BGaming game");
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    sendJson(res, 405, {
      error: {
        code: -32600,
        message: "BGaming local API expects POST JSON-RPC requests.",
      },
      jsonrpc: "2.0",
    });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(typeof body === "string" ? body : "{}");
  } catch {
    sendJson(res, 400, {
      error: {
        code: -32700,
        message: "Invalid JSON-RPC payload.",
      },
      jsonrpc: "2.0",
    });
    return;
  }

  const sessionState = getOrCreateBgamingLocalSession(req.headers.cookie, config);
  let setCookieHeader = null;
  if (sessionState.created) {
    setCookieHeader = serializeCookie(BGAMING_SESSION_COOKIE, encodeURIComponent(JSON.stringify({
      game: config.game,
      sessionId: sessionState.session.sessionId,
    })), Math.floor(BGAMING_LOCAL_SESSION_TTL_MS / 1000));
  }

  let overrideApplied = false;
  let responsePayload = null;
  const override = readBgamingOverrideCookie(req.headers.cookie, config.game);
  try {
    responsePayload = handleBgamingLocalApi(payload, config, sessionState.session, override, req.headers.host);
    if (override && payload?.method === "play") {
      overrideApplied = true;
      writeStructuredLog("bgaming_override_applied", {
        gameId: override.game,
        feature: override.feature,
        featureLevel: override.featureLevel ?? null,
        bet: override.bet ?? null,
      });
    }
  } catch (error) {
    responsePayload = {
      error: {
        code: error?.code ?? 51200,
        message: error?.message ?? "Something went wrong. Relaunch the game with new session.",
      },
      id: payload?.id ?? null,
      jsonrpc: "2.0",
    };
  }

  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };
  if (setCookieHeader && overrideApplied) {
    headers["Set-Cookie"] = [setCookieHeader, clearCookie(BGAMING_OVERRIDE_COOKIE)];
  } else if (setCookieHeader) {
    headers["Set-Cookie"] = setCookieHeader;
  } else if (overrideApplied) {
    headers["Set-Cookie"] = clearCookie(BGAMING_OVERRIDE_COOKIE);
  }
  if (overrideApplied) {
    headers["X-BGaming-Override-Applied"] = "1";
    headers["X-BGaming-Feature"] = override.feature;
  }

  res.writeHead(200, headers);
  res.end(JSON.stringify(responsePayload));
}

async function proxyBgamingPublisherAsset(req, res, pathname) {
  const proxied = parseBgamingPublisherAssetRequest(pathname);
  if (!proxied) {
    sendText(res, 404, "Unknown BGaming publisher asset");
    return;
  }

  const config = getBgamingConfig(proxied.game);
  if (!config) {
    sendText(res, 404, "Unknown BGaming game");
    return;
  }

  if (proxied.assetPath === "cdn-cgi/rum" || proxied.assetPath.startsWith("cdn-cgi/rum?")) {
    res.writeHead(204, { "Cache-Control": "no-store" });
    res.end();
    return;
  }

  const upstreamUrl = new URL(proxied.assetPath, `${new URL(config.launchUrl).origin}/`);
  const headers = {};
  for (const name of ["accept", "user-agent", "range", "if-none-match", "if-modified-since"]) {
    const value = req.headers[name];
    if (typeof value === "string" && value) {
      headers[name] = value;
    }
  }

  const response = await fetch(upstreamUrl, {
    method: req.method,
    headers,
  });
  const payload = Buffer.from(await response.arrayBuffer());
  const responseHeaders = {
    "Content-Type": response.headers.get("content-type") ?? "application/octet-stream",
    "Cache-Control": response.headers.get("cache-control") ?? `public, max-age=${serverConfig.staticMaxAgeSeconds}`,
    "Content-Length": String(payload.byteLength),
  };

  const etag = response.headers.get("etag");
  if (etag) {
    responseHeaders.ETag = etag;
  }
  const lastModified = response.headers.get("last-modified");
  if (lastModified) {
    responseHeaders["Last-Modified"] = lastModified;
  }

  res.writeHead(response.status, responseHeaders);
  res.end(payload);
}

function getOrCreateBgamingLocalSession(cookieHeader, config) {
  pruneBgamingLocalSessions();
  const cookieState = readBgamingSessionCookie(cookieHeader, config.game);
  const existing = cookieState ? bgamingLocalSessions.get(cookieState.sessionId) : null;
  if (existing?.game === config.game) {
    existing.updatedAt = Date.now();
    return {
      created: false,
      session: existing,
    };
  }

  const session = {
    sessionId: randomId(),
    game: config.game,
    balance: BGAMING_LOCAL_DEFAULT_BALANCE,
    currency: "fun",
    locale: "en",
    token: null,
    stateLock: createBgamingLocalStateLock(),
    updatedAt: Date.now(),
  };
  bgamingLocalSessions.set(session.sessionId, session);
  return {
    created: true,
    session,
  };
}

function pruneBgamingLocalSessions() {
  const cutoff = Date.now() - BGAMING_LOCAL_SESSION_TTL_MS;
  for (const [sessionId, session] of bgamingLocalSessions.entries()) {
    if ((session?.updatedAt ?? 0) < cutoff) {
      bgamingLocalSessions.delete(sessionId);
    }
  }
}

function handleBgamingLocalApi(payload, config, session, override, host) {
  const method = String(payload?.method ?? "").trim();
  if (!method) {
    throw Object.assign(new Error("Invalid BGaming JSON-RPC method."), { code: -32600 });
  }

  if (method === "init") {
    session.token = String(payload?.params?.token ?? session.token ?? "").trim() || null;
    session.updatedAt = Date.now();
    session.stateLock = createBgamingLocalStateLock();
    return {
      id: payload.id ?? null,
      result: {
        state: null,
        config: {
          bet_limits: [10, 20, 30, 50, 70, 100, 150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1400, 1700],
          minimal_spin_time: null,
          autospin_variant: "standard",
          autospin_values: ["10", "25", "50", "100", "250", "500", "750", "1000", "\u221e"],
          quick_spins_enabled: true,
          reality_check_time: null,
          purchased_features: ["buy_bonus", "buy_chance", "buy_bonus_and_chance"],
          rtp: "96",
          default_bet: BGAMING_LOCAL_DEFAULT_BET,
          freebets_limits: [10, 20, 30, 50, 70, 100, 150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200, 1400, 1700],
          displayed_rtp: "96.03",
        },
        balance: session.balance,
        currency: session.currency,
        locale: session.locale,
        urls: {
          deposit_url: null,
          return_url: `http://${host}/`,
          history_url: null,
        },
        freebets: null,
        currency_attributes: {
          code: "FUN",
          exponent: 2,
          subunits: 100,
          symbol: null,
        },
        state_lock: session.stateLock,
      },
      jsonrpc: "2.0",
    };
  }

  if (method === "info") {
    session.updatedAt = Date.now();
    return {
      id: payload.id ?? null,
      result: {
        balance: session.balance,
        freebets: null,
      },
      jsonrpc: "2.0",
    };
  }

  if (method === "play") {
    const rawBet = override?.bet != null ? override.bet : payload?.params?.req?.bet;
    const bet = normalizeBgamingLocalBet(rawBet);
    if (!Number.isFinite(bet) || bet <= 0) {
      throw Object.assign(new Error("Invalid bet amount."), { code: 51200 });
    }
    if (bet > session.balance) {
      throw Object.assign(new Error("Insufficient balance."), { code: 51200 });
    }

    const round = buildBgamingLocalRound(bet, override);
    session.balance = Math.max(0, session.balance - bet + round.win);
    session.stateLock = createBgamingLocalStateLock();
    session.updatedAt = Date.now();
    return {
      id: payload.id ?? null,
      result: {
        round: randomUUID(),
        step: randomUUID(),
        final: true,
        balance: session.balance,
        resp: {
          round,
        },
        freebets: null,
        state_lock: session.stateLock,
      },
      jsonrpc: "2.0",
    };
  }

  throw Object.assign(new Error(`Unsupported BGaming method: ${method}`), { code: -32601 });
}

function normalizeBgamingLocalBet(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }
  if (parsed < 50) {
    return Math.round(parsed * 100);
  }
  return Math.round(parsed);
}

function buildBgamingLocalRound(bet, override) {
  return {
    bet,
    buy_id: override?.feature ?? "none",
    freespins: [],
    generations: [
      {
        event: {
          name: "Spin",
        },
        grid_final: createBgamingLocalGrid(),
        running_total: 0,
        running_total_multiplier: 0,
        win_total: 0,
      },
    ],
    high_grid: false,
    top_list: {
      multipliers: createBgamingLocalTopList(),
    },
    win: 0,
  };
}

function createBgamingLocalGrid() {
  return Array.from({ length: 5 }, () => (
    Array.from({ length: 6 }, () => pickRandom(BGAMING_LOCAL_SYMBOLS))
  ));
}

function createBgamingLocalTopList() {
  return Array.from({ length: 5 }, () => pickRandom(BGAMING_LOCAL_TOP_MULTIPLIERS));
}

function pickRandom(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function createBgamingLocalStateLock() {
  return `local.${randomId()}.${Date.now()}`;
}

async function serveBeplayAsset(req, res, pathname) {
  const relativePath = pathname.replace(/^\//, "");
  const cachePath = path.join(BEPLAY_CACHE_ROOT, relativePath);
  const cachedStats = await fs.promises.stat(cachePath).catch(() => null);
  if (cachedStats?.isFile()) {
    streamFileWithCache(req, res, cachePath, cachedStats, serverConfig.staticMaxAgeSeconds);
    return;
  }

  sendText(res, 404, "BePlay asset not found in local cache");
}

async function serveStatic(config, req, pathname, res) {
  const relativePath = toStaticRelativePath(config, pathname);
  const resolved = await resolveStaticPath(config, relativePath);
  if (!resolved) {
    sendText(res, 404, "Not found");
    return;
  }
  const { filePath, stats } = resolved;

  if (stats.isDirectory()) {
    const indexPath = path.join(filePath, "index.html");
    const indexStats = await fs.promises.stat(indexPath).catch(() => null);
    if (!indexStats) {
      sendText(res, 404, "Not found");
      return;
    }
    streamFileWithCache(req, res, indexPath, indexStats, serverConfig.staticMaxAgeSeconds);
    return;
  }

  streamFileWithCache(req, res, filePath, stats, serverConfig.staticMaxAgeSeconds);
}

async function resolveStaticPath(config, relativePath) {
  const candidates = [
    path.join(__dirname, config.siteRoot, relativePath),
    path.join(__dirname, relativePath),
  ];

  for (const candidate of candidates) {
    const normalized = path.normalize(candidate);
    if (!normalized.startsWith(__dirname)) {
      continue;
    }
    const stats = await fs.promises.stat(normalized).catch(() => null);
    if (stats) {
      return { filePath: normalized, stats };
    }
    if (!path.extname(normalized)) {
      const htmlFallback = `${normalized}.html`;
      const htmlStats = await fs.promises.stat(htmlFallback).catch(() => null);
      if (htmlStats) {
        return { filePath: htmlFallback, stats: htmlStats };
      }
    }
    if (normalized.endsWith(`${path.sep}external-promo.legacy.js`)) {
      const legacyFallback = normalized.replace(/external-promo\.legacy\.js$/, "external-promo.js");
      const legacyStats = await fs.promises.stat(legacyFallback).catch(() => null);
      if (legacyStats) {
        return { filePath: legacyFallback, stats: legacyStats };
      }
    }
  }

  return null;
}

async function resolveBgamingLaunchDocument(config, userAgent) {
  const candidates = [];
  const seen = new Set();
  for (const candidate of [config.launchUrl, ...extractBgamingCandidateUrls(config.launchUrl)]) {
    if (!candidate || seen.has(candidate)) {
      continue;
    }
    seen.add(candidate);
    candidates.push(candidate);
  }

  let lastResult = null;
  for (const candidate of candidates) {
    const result = await fetchBgamingLaunchDocument(candidate, userAgent);
    if (result?.options?.api) {
      return result;
    }
    lastResult = result;
  }

  return lastResult;
}

async function fetchBgamingLaunchDocument(sourceUrl, userAgent, depth = 0, visited = new Set()) {
  if (!sourceUrl || depth > 6 || visited.has(sourceUrl)) {
    return null;
  }
  visited.add(sourceUrl);

  const response = await fetch(sourceUrl, {
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "user-agent": userAgent || "Mozilla/5.0 Codex BGaming bridge",
    },
  });
  const html = await response.text();
  const options = extractBgamingOptionsFromHtml(html);
  if (options?.parsed?.api) {
    return {
      html,
      options: {
        ...options.parsed,
        mode: "classic",
      },
      sourceUrl,
    };
  }

  const wrapperUrl = extractBgamingWrapperGameUrl(html);
  if (wrapperUrl) {
    const next = await fetchBgamingLaunchDocument(wrapperUrl, userAgent, depth + 1, visited);
    if (next) {
      return next;
    }
  }

  const interlayerUrl = extractBgamingInterlayerUrl(html, sourceUrl);
  if (interlayerUrl) {
    const next = await fetchBgamingLaunchDocument(interlayerUrl, userAgent, depth + 1, visited);
    if (next) {
      return next;
    }
  }

  const standaloneApiUrl = await extractBgamingStandaloneApiUrl(html, sourceUrl, userAgent);
  if (standaloneApiUrl) {
    return {
      html,
      options: {
        api: standaloneApiUrl,
        mode: "standalone",
      },
      sourceUrl,
    };
  }

  return {
    html,
    options: options?.parsed ?? null,
    sourceUrl,
  };
}

function extractBgamingCandidateUrls(sourceUrl) {
  try {
    const url = new URL(sourceUrl);
    const rawOptions = url.searchParams.get("options");
    if (!rawOptions) {
      return [];
    }

    const padding = "=".repeat((4 - (rawOptions.length % 4)) % 4);
    const decoded = Buffer.from(rawOptions + padding, "base64url").toString("utf8");
    const parsed = JSON.parse(decoded);
    return [
      parsed?.launch_options?.game_url,
      parsed?.launch_options?.game_launcher_url,
    ].filter(Boolean);
  } catch {
    return [];
  }
}

function extractBgamingOptionsFromHtml(html) {
  const assignment = extractJsonAssignment(html, "window.__OPTIONS__");
  if (!assignment) {
    return null;
  }

  try {
    return {
      ...assignment,
      parsed: JSON.parse(assignment.value),
    };
  } catch {
    return null;
  }
}

function extractBgamingWrapperGameUrl(html) {
  const match = html.match(/gameLaunchOptions\[['"]launch_options['"]\]\s*=\s*\{[\s\S]*?game_url['"]?\s*:\s*['"]([^'"]+)['"]/i)
    ?? html.match(/gameLaunchOptions\[['"]launch_options['"]\]\s*=\s*\{[\s\S]*?game_launcher_url['"]?\s*:\s*['"]([^'"]+)['"]/i);
  return match?.[1] ?? null;
}

function extractBgamingInterlayerUrl(html, sourceUrl) {
  const match = html.match(/const domains = (\[[^\]]+\]);/);
  if (!match) {
    return null;
  }

  let domains;
  try {
    domains = JSON.parse(match[1].replaceAll("'", "\""));
  } catch {
    return null;
  }
  if (!Array.isArray(domains) || domains.length === 0) {
    return null;
  }

  try {
    const currentUrl = new URL(sourceUrl);
    const params = currentUrl.searchParams;
    const subdomain = params.get("_subdomain");
    const targetParam = params.get("_target");

    let pathname = currentUrl.pathname;
    let search = currentUrl.search;
    if (targetParam) {
      const targetUrl = new URL(decodeURIComponent(targetParam), currentUrl);
      pathname = targetUrl.pathname;
      search = targetUrl.search;
    } else if (subdomain) {
      const nextSearchParams = new URLSearchParams(params);
      nextSearchParams.delete("_subdomain");
      const nextSearch = nextSearchParams.toString();
      search = nextSearch ? `?${nextSearch}` : "";
    }

    const nextUrl = new URL(domains[0]);
    if (subdomain) {
      nextUrl.hostname = `${subdomain}.${nextUrl.hostname}`;
    }
    nextUrl.pathname = pathname;
    nextUrl.search = search;
    return nextUrl.toString();
  } catch {
    return null;
  }
}

async function extractBgamingStandaloneApiUrl(html, sourceUrl, userAgent) {
  const entryScriptUrl = extractBgamingStandaloneEntryScriptUrl(html, sourceUrl);
  if (!entryScriptUrl) {
    return null;
  }

  const response = await fetch(entryScriptUrl, {
    headers: {
      accept: "application/javascript,text/javascript,*/*;q=0.8",
      "user-agent": userAgent || "Mozilla/5.0 Codex BGaming bridge",
    },
  });
  const script = await response.text();
  const apiUrlMatch = script.match(/new g3\("([^"]+\/api\/spin)"/);
  return apiUrlMatch?.[1] ?? null;
}

function extractBgamingStandaloneEntryScriptUrl(html, sourceUrl) {
  const match = html.match(/<script[^>]+type=["']module["'][^>]+src=["']([^"']+)["']/i);
  if (!match?.[1]) {
    return null;
  }

  try {
    return new URL(match[1], sourceUrl).toString();
  } catch {
    return null;
  }
}

function extractJsonAssignment(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    return null;
  }

  const start = source.indexOf("{", markerIndex + marker.length);
  if (start === -1) {
    return null;
  }

  let depth = 0;
  let inString = false;
  let escaping = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (inString) {
      if (escaping) {
        escaping = false;
      } else if (char === "\\") {
        escaping = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
      continue;
    }
    if (char === "{") {
      depth += 1;
      continue;
    }
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return {
          start,
          end: index + 1,
          value: source.slice(start, index + 1),
        };
      }
    }
  }

  return null;
}

function patchBgamingHtml(html, config, host, resolved) {
  const assignment = extractBgamingOptionsFromHtml(html);
  if (assignment) {
    const localLaunchUrl = buildBgamingLaunchUrl(`http://${host}`, config);
    const options = {
      ...assignment.parsed,
      api: `http://${host}/bgaming/api/${encodeURIComponent(config.game)}`,
      game_page_url: localLaunchUrl,
    };

    if (options.actions?.return) {
      options.actions = {
        ...options.actions,
        return: {
          ...options.actions.return,
          link: localLaunchUrl,
        },
      };
    }

    return `${html.slice(0, assignment.start)}${JSON.stringify(options)}${html.slice(assignment.end)}`;
  }

  if (resolved?.options?.mode === "standalone" && resolved?.options?.api) {
    const baseHref = `http://${host}/bgaming/publisher/${encodeURIComponent(config.game)}/`;
    const localApiUrl = `http://${host}/bgaming/api/${encodeURIComponent(config.game)}`;
    const fetchProxyScript = `<script>
(() => {
  const upstreamUrl = ${JSON.stringify(resolved.options.api)};
  const localUrl = ${JSON.stringify(localApiUrl)};
  const originalFetch = window.fetch.bind(window);
  window.fetch = function patchedFetch(input, init) {
    const requestUrl = typeof input === "string"
      ? input
      : (input && typeof input.url === "string" ? input.url : String(input ?? ""));
    let absoluteUrl = requestUrl;
    try {
      absoluteUrl = new URL(requestUrl, window.location.href).toString();
    } catch {}
    let shouldProxy = absoluteUrl === upstreamUrl;
    try {
      shouldProxy = shouldProxy || new URL(absoluteUrl).pathname === "/api";
    } catch {}
    if (shouldProxy) {
      if (input instanceof Request) {
        const proxiedRequest = new Request(localUrl, input);
        return originalFetch(proxiedRequest, init);
      }
      return originalFetch(localUrl, init);
    }
    return originalFetch(input, init);
  };
})();
</script>`;

    let nextHtml = html;
    nextHtml = nextHtml.replace(/<script[^>]+static\.cloudflareinsights\.com\/beacon[^>]*><\/script>/gi, "");
    if (!/<base\s/i.test(nextHtml)) {
      nextHtml = nextHtml.replace(/<head([^>]*)>/i, `<head$1>\n    <base href="${escapeXml(baseHref)}" />`);
    }
    if (/<script[^>]+type=["']module["']/i.test(nextHtml)) {
      nextHtml = nextHtml.replace(/<script[^>]+type=["']module["']/i, `${fetchProxyScript}\n    <script type="module"`);
    } else if (/<\/head>/i.test(nextHtml)) {
      nextHtml = nextHtml.replace(/<\/head>/i, `${fetchProxyScript}\n  </head>`);
    } else {
      nextHtml = `${fetchProxyScript}\n${nextHtml}`;
    }
    return nextHtml;
  }

  return html;
}

function renderBgamingIframeFallback(config) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeXml(config.name)}</title>
  <style>
    html, body { margin: 0; width: 100%; height: 100%; background: #000; }
    iframe { border: 0; width: 100%; height: 100%; display: block; }
  </style>
</head>
<body>
  <iframe src="${escapeXml(config.launchUrl)}" allow="autoplay; fullscreen"></iframe>
</body>
</html>`;
}

function getSession(config, store, req, res, explicitSession) {
  const cookies = parseCookies(req.headers.cookie);
  let sessionId = explicitSession || cookies[config.sessionCookie];
  const schemaVersion = createInitialState(config).schemaVersion;

  if (!sessionId || !store.has(sessionId)) {
    sessionId = randomId();
    store.upsert(sessionId, createInitialState(config));
    res.setHeader("Set-Cookie", `${config.sessionCookie}=${sessionId}; Path=/; HttpOnly; SameSite=Lax`);
  }

  let state = normalizeState(config, store.get(sessionId));
  if (state.schemaVersion !== schemaVersion) {
    state = createInitialState(config);
    store.upsert(sessionId, state);
  }
  store.upsert(sessionId, state);
  return { sessionId, state };
}

function sanitizeLineBet(config, value) {
  const raw = Number.parseInt(value, 10);
  if (config.threeOaks?.bets?.includes(raw)) {
    return raw;
  }
  return config.defaultBet ?? config.threeOaks?.bets?.[0] ?? 1;
}

function parseThreeOaksOperatorLaunchRequest(pathname) {
  const match = pathname.match(/^\/operator\/launch\/three-oaks\/([^/]+)\/?$/);
  if (!match) {
    return null;
  }

  return {
    slug: decodeURIComponent(match[1]),
  };
}

function buildThreeOaksOperatorLaunchState(slug) {
  return {
    slug,
    mode: "money",
    playerId: THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID,
    currency: THREE_OAKS_PRODUCT_DEFAULT_CURRENCY,
    createdAt: Date.now(),
  };
}

function parseThreeOaksWrapperRequest(pathname) {
  const match = pathname.match(/^\/three-oaks\/(live|product)\/([^/]+)\/?$/);
  if (!match) {
    return null;
  }

  return {
    mode: match[1],
    slug: decodeURIComponent(match[2]),
  };
}

function parseThreeOaksProxyRequest(pathname) {
  const match = pathname.match(/^\/three-oaks\/(live|product)\/([^/]+)\/(?:proxy|api)\/(.+)$/);
  if (!match) {
    return null;
  }

  return {
    mode: match[1],
    slug: decodeURIComponent(match[2]),
    upstreamPath: `/${match[3]}`,
  };
}

async function proxyThreeOaks(req, res, url, proxied, body) {
  if (proxied.mode === "product") {
    await serveThreeOaksProductRequest(req, res, url, proxied, body);
    return;
  }

  const upstreamUrl = new URL(proxied.upstreamPath, THREE_OAKS_PROVIDER_ORIGIN);
  upstreamUrl.search = url.search;
  const shouldPatchOperatorWallet = proxied.upstreamPath.includes("/slotscity-prod-axis/gs/")
    && (proxied.mode === "live" || proxied.mode === "product");
  const parsedRequest = shouldPatchOperatorWallet ? parseThreeOaksRequest(body ?? "", url) : null;
  const blockedPayload = shouldPatchOperatorWallet
    ? maybeBlockThreeOaksSpin(req, proxied, parsedRequest)
    : null;

  if (blockedPayload) {
    sendJson(res, 200, blockedPayload);
    return;
  }

  const headers = {};
  for (const name of ["accept", "content-type", "user-agent", "x-requested-with", "range", "if-none-match", "if-modified-since"]) {
    const value = req.headers[name];
    if (typeof value === "string" && value) {
      headers[name] = value;
    }
  }

  const response = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body: body && req.method !== "GET" && req.method !== "HEAD" ? body : undefined,
  });

  const contentType = response.headers.get("content-type") ?? "application/octet-stream";
  let payload = Buffer.from(await response.arrayBuffer());
  const shouldPatchBalance = shouldPatchOperatorWallet;
  let patched = false;

  if (shouldPatchBalance && contentType.includes("application/json")) {
    const nextPayload = patchThreeOaksLiveBalance(req, proxied, parsedRequest, payload.toString("utf8"));
    if (nextPayload !== null) {
      payload = Buffer.from(nextPayload);
      patched = true;
    }
  }

  const responseHeaders = {
    "Content-Type": contentType,
    "Cache-Control": response.headers.get("cache-control") ?? "no-store",
    "Content-Length": String(payload.byteLength),
  };

  if (!patched) {
    const etag = response.headers.get("etag");
    if (etag) {
      responseHeaders.ETag = etag;
    }
    const lastModified = response.headers.get("last-modified");
    if (lastModified) {
      responseHeaders["Last-Modified"] = lastModified;
    }
  }

  res.writeHead(response.status, responseHeaders);
  res.end(payload);
}

async function serveThreeOaksProductRequest(req, res, url, proxied, body) {
  if (proxied.upstreamPath.startsWith("/slotscity-prod-axis/cdn_domain/")) {
    const payload = {
      country: getThreeOaksProductCountry(req),
      domains: [],
    };
    recordThreeOaksProductEvent("cdn_domain", req, proxied, null, payload);
    sendJson(res, 200, payload);
    return;
  }

  if (proxied.upstreamPath.startsWith("/slotscity-prod-axis/log/")
    || proxied.upstreamPath.startsWith("/slotscity-prod-axis/snt/")) {
    const endpoint = proxied.upstreamPath.startsWith("/slotscity-prod-axis/snt/") ? "snt" : "log";
    const payload = {};
    recordThreeOaksProductEvent(endpoint, req, proxied, body, payload);
    sendJson(res, 200, payload);
    return;
  }

  if (!proxied.upstreamPath.includes("/slotscity-prod-axis/gs/")) {
    sendText(res, 404, "Unknown 3 Oaks product endpoint");
    return;
  }

  const config = getThreeOaksProductConfig(proxied.slug);
  if (!config) {
    sendText(res, 404, "Unknown 3 Oaks product game");
    return;
  }

  handleThreeOaksProduct(config, proxied.slug, req, res, url, body ?? "");
}

function maybeBlockThreeOaksSpin(req, proxied, parsedRequest) {
  if (!parsedRequest || parsedRequest.command !== "play" || parsedRequest.actionName !== "spin") {
    return null;
  }

  const sessionId = getThreeOaksSessionId(null, parsedRequest);
  if (!sessionId) {
    return null;
  }

  const wallet = resolveThreeOaksOperatorWallet(req, proxied, sessionId);
  if (!wallet) {
    return null;
  }

  const roundBet = resolveThreeOaksRoundBet(parsedRequest, wallet.lastPayload);
  if (roundBet <= 0 || wallet.balance >= roundBet) {
    return null;
  }

  wallet.updatedAt = Date.now();
  threeOaksOperatorWallets.set(sessionId, wallet);
  return buildThreeOaksInsufficientFundsPayload(wallet, parsedRequest, roundBet);
}

function patchThreeOaksLiveBalance(req, proxied, parsedRequest, sourceText) {
  try {
    const payload = JSON.parse(sourceText);
    if (!payload?.user || !Number.isFinite(payload.user.balance)) {
      return null;
    }

    const sessionId = getThreeOaksSessionId(payload, parsedRequest);
    if (!sessionId) {
      return null;
    }

    const wallet = resolveThreeOaksOperatorWallet(req, proxied, sessionId, payload);
    updateThreeOaksOperatorWalletFromResponse(wallet, parsedRequest, payload);
    patchThreeOaksOperatorPayload(payload, wallet);

    wallet.lastPayload = structuredClone(payload);
    wallet.updatedAt = Date.now();
    threeOaksOperatorWallets.set(sessionId, wallet);
    return JSON.stringify(payload);
  } catch {
    return null;
  }
}

function resolveThreeOaksOperatorWallet(req, proxied, sessionId, payload = null) {
  if (proxied.mode === "product") {
    return resolveThreeOaksProductSessionWallet(req, proxied, sessionId, payload);
  }

  return resolveThreeOaksLiveSessionWallet(req, proxied, sessionId, payload);
}

function resolveThreeOaksLiveSessionWallet(req, proxied, sessionId, payload = null) {
  pruneThreeOaksOperatorWallets();

  const now = Date.now();
  const launchState = readThreeOaksOperatorLaunchCookie(req.headers.cookie, proxied.slug);
  const remoteUser = payload?.user ?? null;
  let wallet = threeOaksOperatorWallets.get(sessionId);

  if (wallet && wallet.slug !== proxied.slug) {
    threeOaksOperatorWallets.delete(sessionId);
    wallet = null;
  }

  if (wallet && launchState && launchState.createdAt > (wallet.createdAt ?? 0)) {
    threeOaksOperatorWallets.delete(sessionId);
    wallet = null;
  }

  if (!wallet) {
    wallet = {
      balance: launchState?.balance ?? THREE_OAKS_LIVE_TARGET_BALANCE,
      balanceVersion: normalizeBalanceVersion(remoteUser?.balance_version, 1),
      createdAt: launchState?.createdAt ?? now,
      currency: launchState?.currency ?? (String(remoteUser?.currency ?? "USD").trim().toUpperCase() || "USD"),
      lastPayload: null,
      lastSettledRequestId: null,
      playerId: launchState?.playerId ?? (String(remoteUser?.huid ?? "").trim() || `player-${sessionId}`),
      sessionId,
      slug: proxied.slug,
      updatedAt: now,
    };
    threeOaksOperatorWallets.set(sessionId, wallet);
    return wallet;
  }

  wallet.balanceVersion = Math.max(
    normalizeBalanceVersion(remoteUser?.balance_version, wallet.balanceVersion),
    wallet.balanceVersion,
  );
  wallet.playerId = launchState?.playerId ?? wallet.playerId ?? (String(remoteUser?.huid ?? "").trim() || `player-${sessionId}`);
  wallet.currency = launchState?.currency ?? wallet.currency ?? (String(remoteUser?.currency ?? "USD").trim().toUpperCase() || "USD");
  wallet.updatedAt = now;
  threeOaksOperatorWallets.set(sessionId, wallet);
  return wallet;
}

function resolveThreeOaksProductSessionWallet(req, proxied, sessionId, payload = null) {
  pruneThreeOaksOperatorWallets();

  const now = Date.now();
  const launchState = readThreeOaksOperatorLaunchCookie(req.headers.cookie, proxied.slug) ?? buildThreeOaksOperatorLaunchState(proxied.slug);
  const playerWallet = resolveThreeOaksProductPlayerWallet(launchState.playerId, launchState.currency);
  const remoteUser = payload?.user ?? null;
  let wallet = threeOaksOperatorWallets.get(sessionId);

  if (wallet && (wallet.slug !== proxied.slug || wallet.mode !== "product")) {
    threeOaksOperatorWallets.delete(sessionId);
    wallet = null;
  }

  if (!wallet || wallet.playerId !== playerWallet.playerId) {
    wallet = {
      balance: playerWallet.balance,
      balanceVersion: normalizeBalanceVersion(remoteUser?.balance_version, 1),
      createdAt: launchState.createdAt ?? now,
      currency: playerWallet.currency,
      lastPayload: null,
      lastSettledRequestId: null,
      mode: "product",
      playerId: playerWallet.playerId,
      sessionId,
      slug: proxied.slug,
      updatedAt: now,
    };
    threeOaksOperatorWallets.set(sessionId, wallet);
    return wallet;
  }

  wallet.balance = playerWallet.balance;
  wallet.balanceVersion = Math.max(
    normalizeBalanceVersion(remoteUser?.balance_version, wallet.balanceVersion),
    wallet.balanceVersion,
  );
  wallet.currency = playerWallet.currency;
  wallet.playerId = playerWallet.playerId;
  wallet.updatedAt = now;
  threeOaksOperatorWallets.set(sessionId, wallet);
  return wallet;
}

function updateThreeOaksOperatorWalletFromResponse(wallet, parsedRequest, payload) {
  const remoteVersion = normalizeBalanceVersion(payload?.user?.balance_version, wallet.balanceVersion);
  wallet.balanceVersion = Math.max(wallet.balanceVersion, remoteVersion);

  if (parsedRequest?.command !== "play" || parsedRequest.actionName !== "spin") {
    return;
  }

  const requestId = String(payload?.request_id ?? parsedRequest.requestId ?? "").trim();
  if (requestId && wallet.lastSettledRequestId === requestId) {
    return;
  }

  const roundBet = resolveThreeOaksRoundBet(parsedRequest, payload);
  const roundWin = extractThreeOaksRoundWin(payload);
  wallet.balance = Math.max(0, wallet.balance - roundBet + roundWin);
  wallet.balanceVersion = Math.max(wallet.balanceVersion, remoteVersion) + 1;
  wallet.lastSettledRequestId = requestId || wallet.lastSettledRequestId;

  if (wallet.mode === "product") {
    updateThreeOaksProductPlayerWallet(wallet);
  }
}

function buildThreeOaksInsufficientFundsPayload(wallet, parsedRequest, roundBet) {
  const payload = wallet.lastPayload
    ? structuredClone(wallet.lastPayload)
    : {
      command: "play",
      modes: ["auto", "play"],
      session_id: wallet.sessionId,
      status: { code: "OK" },
      user: {},
    };
  const spinArgs = resolveThreeOaksSpinArgs(parsedRequest, payload);
  const context = payload.context && typeof payload.context === "object"
    ? payload.context
    : {};
  const spins = context.spins && typeof context.spins === "object"
    ? context.spins
    : {};

  delete payload.origin_data;
  payload.command = "play";
  payload.modes = Array.isArray(payload.modes) && payload.modes.length ? payload.modes : ["auto", "play"];
  payload.request_id = parsedRequest.requestId;
  payload.session_id = wallet.sessionId;
  payload.status = {
    code: "NOT_ENOUGH_MONEY",
    type: "crit",
  };

  context.actions = Array.isArray(context.actions) && context.actions.length ? context.actions : ["spin"];
  context.current = context.current ?? "spins";
  context.last_action = parsedRequest.actionName ?? "spin";
  context.last_args = spinArgs;
  context.last_win = 0;
  context.round_finished = true;

  spins.bet_per_line = spinArgs.bet_per_line;
  spins.lines = spinArgs.lines;
  spins.round_bet = roundBet;
  spins.round_win = 0;
  spins.total_win = 0;
  context.spins = spins;
  payload.context = context;

  patchThreeOaksOperatorPayload(payload, wallet);
  return payload;
}

function patchThreeOaksOperatorPayload(payload, wallet) {
  payload.user ??= {};
  payload.user.balance = wallet.balance;
  payload.user.balance_version = wallet.balanceVersion;
  payload.user.currency = wallet.currency;
  payload.user.huid = wallet.playerId;
  payload.user.is_test = false;
  payload.user.show_balance = true;
}

function resolveThreeOaksRoundBet(parsedRequest, payload = null) {
  const spinArgs = resolveThreeOaksSpinArgs(parsedRequest, payload);
  if (spinArgs.bet_per_line > 0 && spinArgs.lines > 0) {
    return spinArgs.bet_per_line * spinArgs.lines;
  }

  const directRoundBet = normalizeMoneyAmount(payload?.context?.spins?.round_bet, 0);
  return Math.max(0, directRoundBet);
}

function resolveThreeOaksSpinArgs(parsedRequest, payload = null) {
  const requestBetPerLine = normalizeMoneyAmount(parsedRequest?.actionParams?.bet_per_line, 0);
  const requestLines = normalizeMoneyAmount(parsedRequest?.actionParams?.lines, 0);
  if (requestBetPerLine > 0 && requestLines > 0) {
    return {
      bet_per_line: requestBetPerLine,
      lines: requestLines,
    };
  }

  const contextSpins = payload?.context?.spins ?? {};
  const contextArgs = payload?.context?.last_args ?? {};
  return {
    bet_per_line: normalizeMoneyAmount(contextSpins.bet_per_line ?? contextArgs.bet_per_line, 0),
    lines: normalizeMoneyAmount(contextSpins.lines ?? contextArgs.lines, 0),
  };
}

function extractThreeOaksRoundWin(payload) {
  for (const candidate of [
    payload?.context?.spins?.round_win,
    payload?.context?.spins?.total_win,
    payload?.context?.last_win,
  ]) {
    const amount = normalizeMoneyAmount(candidate, -1);
    if (amount >= 0) {
      return amount;
    }
  }

  return 0;
}

function getThreeOaksSessionId(payload, parsedRequest) {
  const raw = payload?.session_id
    ?? payload?.sessionId
    ?? parsedRequest?.sessionId
    ?? payload?.user?.huid
    ?? null;

  if (raw === null || raw === undefined) {
    return null;
  }

  const sessionId = String(raw).trim();
  return sessionId || null;
}

function pruneThreeOaksOperatorWallets() {
  const expiresBefore = Date.now() - THREE_OAKS_OPERATOR_WALLET_TTL_MS;
  for (const [sessionId, wallet] of threeOaksOperatorWallets.entries()) {
    const updatedAt = wallet.updatedAt ?? wallet.createdAt ?? 0;
    if (updatedAt < expiresBefore) {
      threeOaksOperatorWallets.delete(sessionId);
    }
  }
}

function normalizeBalanceVersion(value, fallback = 1) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getThreeOaksProductConfig(slug) {
  if (slug === "3oaksgaming-aztec-sun") {
    return slotConfigs.aztecSunProduct;
  }
  return null;
}

function bindThreeOaksProductPlayer(req, slug, state) {
  const launchState = readThreeOaksOperatorLaunchCookie(req.headers.cookie, slug) ?? buildThreeOaksOperatorLaunchState(slug);
  const playerWallet = resolveThreeOaksProductPlayerWallet(launchState.playerId, launchState.currency);
  state.balance = playerWallet.balance;
  state.currency = playerWallet.currency;
  state.huid = playerWallet.playerId;
  state.isTest = false;
  return playerWallet;
}

function buildBackofficeRuntimeGameConfig(config, state) {
  const settings = getStoredBackofficeGameSettings(config.id);
  const role = normalizeBackofficeRole(state?.huid ? getStoredBackofficePlayerRole(state.huid) : BACKOFFICE_DEFAULT_ROLE);
  const roleTarget = settings.roleRtp[role];
  const overallTarget = settings.overallRtp ?? adminRuntimeState.threeOaksProductRtpTarget;
  const nextConfig = {
    ...config,
    features: {
      ...(config.features ?? {}),
      freespins: settings.freespinsEnabled === false ? null : config.features?.freespins ?? null,
      holdAndSpin: settings.bonusEnabled === false ? null : config.features?.holdAndSpin ?? null,
    },
    rtp: {
      ...(config.rtp ?? {}),
      target: normalizeRtpTarget(roleTarget, normalizeRtpTarget(overallTarget, config.rtp?.target)),
    },
    threeOaks: {
      ...(config.threeOaks ?? {}),
      jackpots: {
        ...(config.threeOaks?.jackpots ?? {}),
        ...(Number.isFinite(settings.jackpotGrand) ? { grand: settings.jackpotGrand } : {}),
        ...(Number.isFinite(settings.jackpotMajor) ? { major: settings.jackpotMajor } : {}),
        ...(Number.isFinite(settings.jackpotMini) ? { mini: settings.jackpotMini } : {}),
      },
      userDefaults: {
        ...(config.threeOaks?.userDefaults ?? {}),
        currency: state?.currency ?? config.threeOaks?.userDefaults?.currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY,
      },
    },
  };
  return nextConfig;
}

function applyThreeOaksPlayAction(config, state, actionName, lineBet) {
  state.lineBet = lineBet;
  state.lastThreeOaksAction = actionName ?? "spin";
  state.lastThreeOaksArgs = {
    bet_per_line: lineBet,
    lines: config.lineCount,
  };

  if (actionName === "freespin_init") {
    state.pendingFsTrigger = false;
    state.cashWin = 0;
    state.lastWins = [];
    state.scatterCount = 0;
    return { ok: true };
  }

  if (actionName === "freespin_stop") {
    resetThreeOaksFreespinCycle(state);
    return { ok: true };
  }

  if (actionName === "freespin" && !(state.freespinsActive && state.freespinsLeft > 0)) {
    return { ok: false, error: "NO_ACTIVE_FREESPINS" };
  }

  if (actionName === "spin" || actionName === "freespin") {
    const totalBet = lineBet * config.lineCount;
    return spinRound(config, state, totalBet);
  }

  return { ok: true };
}

function clearThreeOaksTransientRoundState(state) {
  if (state.freespinsActive || state.freespinsTotal > 0 || state.bonusActive || state.pendingFsTrigger || state.pendingBonusTrigger) {
    return;
  }

  state.cashWin = 0;
  state.lastWins = [];
  state.scatterCount = 0;
}

function resetThreeOaksFreespinCycle(state) {
  state.pendingFsTrigger = false;
  state.freespinsActive = false;
  state.freespinsLeft = 0;
  state.freespinsTotal = 0;
  state.freeWin = 0;
  state.cashWin = 0;
  state.lastWins = [];
  state.scatterCount = 0;
}

function syncThreeOaksProductPlayerState(playerWallet, state) {
  playerWallet.balance = state.balance;
  playerWallet.currency = state.currency ?? playerWallet.currency;
  playerWallet.updatedAt = Date.now();
  threeOaksProductPlayerWallets.set(playerWallet.playerId, playerWallet);
  persistThreeOaksProductPlayerWallets();
}

function getThreeOaksProductCountry(req) {
  const headerCountry = req.headers["cf-ipcountry"];
  if (typeof headerCountry === "string" && headerCountry.trim()) {
    return headerCountry.trim().toUpperCase();
  }
  return String(process.env.THREE_OAKS_PRODUCT_COUNTRY ?? "US").trim().toUpperCase() || "US";
}

function recordThreeOaksProductEvent(type, req, proxied, requestBody, responseBody) {
  try {
    fs.mkdirSync(path.dirname(THREE_OAKS_PRODUCT_EVENT_FILE), { recursive: true });
    fs.appendFileSync(THREE_OAKS_PRODUCT_EVENT_FILE, `${JSON.stringify({
      at: new Date().toISOString(),
      method: req.method,
      path: proxied.upstreamPath,
      response: responseBody,
      slug: proxied.slug,
      type,
      userAgent: req.headers["user-agent"] ?? null,
      body: parseThreeOaksProductEventBody(requestBody),
    })}\n`);
  } catch (error) {
    writeStructuredLog("three_oaks_product_event_record_failed", {
      message: error?.message ?? "Unknown error",
      type,
    });
  }
}

function parseThreeOaksProductEventBody(body) {
  if (body == null || body === "") {
    return null;
  }

  try {
    return JSON.parse(String(body));
  } catch {
    return String(body);
  }
}

function resolveThreeOaksProductPlayerWallet(playerId, currency) {
  const normalizedPlayerId = String(playerId ?? "").trim() || THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID;
  const normalizedCurrency = String(currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY;
  let wallet = threeOaksProductPlayerWallets.get(normalizedPlayerId);

  if (!wallet) {
    wallet = {
      balance: THREE_OAKS_PRODUCT_DEFAULT_BALANCE,
      createdAt: Date.now(),
      currency: normalizedCurrency,
      playerId: normalizedPlayerId,
      updatedAt: Date.now(),
    };
    threeOaksProductPlayerWallets.set(normalizedPlayerId, wallet);
    persistThreeOaksProductPlayerWallets();
    return wallet;
  }

  if (!wallet.currency) {
    wallet.currency = normalizedCurrency;
  }
  wallet.updatedAt = Date.now();
  return wallet;
}

function findThreeOaksProductPlayerWallet(playerId) {
  const normalizedPlayerId = String(playerId ?? "").trim() || THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID;
  return threeOaksProductPlayerWallets.get(normalizedPlayerId) ?? null;
}

function updateThreeOaksProductPlayerWallet(sessionWallet) {
  const playerWallet = resolveThreeOaksProductPlayerWallet(sessionWallet.playerId, sessionWallet.currency);
  playerWallet.balance = sessionWallet.balance;
  playerWallet.currency = sessionWallet.currency;
  playerWallet.updatedAt = Date.now();
  threeOaksProductPlayerWallets.set(playerWallet.playerId, playerWallet);
  persistThreeOaksProductPlayerWallets();
}

function loadThreeOaksProductPlayerWallets() {
  try {
    if (!fs.existsSync(THREE_OAKS_PRODUCT_WALLET_FILE)) {
      return;
    }

    const raw = fs.readFileSync(THREE_OAKS_PRODUCT_WALLET_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return;
    }

    for (const [playerId, wallet] of Object.entries(parsed)) {
      if (!wallet || typeof wallet !== "object") {
        continue;
      }
      threeOaksProductPlayerWallets.set(playerId, {
        balance: normalizeMoneyAmount(wallet.balance, THREE_OAKS_PRODUCT_DEFAULT_BALANCE),
        createdAt: Number.isFinite(wallet.createdAt) ? wallet.createdAt : Date.now(),
        currency: String(wallet.currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY,
        playerId,
        updatedAt: Number.isFinite(wallet.updatedAt) ? wallet.updatedAt : Date.now(),
      });
    }
  } catch (error) {
    writeStructuredLog("three_oaks_product_wallets_load_failed", {
      message: error?.message ?? "Unknown error",
    });
  }
}

function persistThreeOaksProductPlayerWallets() {
  try {
    const payload = Object.fromEntries(
      [...threeOaksProductPlayerWallets.entries()].map(([playerId, wallet]) => [playerId, {
        balance: wallet.balance,
        createdAt: wallet.createdAt,
        currency: wallet.currency,
        updatedAt: wallet.updatedAt,
      }]),
    );
    fs.writeFileSync(THREE_OAKS_PRODUCT_WALLET_FILE, JSON.stringify(payload, null, 2));
  } catch (error) {
    writeStructuredLog("three_oaks_product_wallets_persist_failed", {
      message: error?.message ?? "Unknown error",
    });
  }
}

function readThreeOaksOperatorLaunchCookie(cookieHeader, slug) {
  const rawValue = parseCookies(cookieHeader)[THREE_OAKS_OPERATOR_LAUNCH_COOKIE];
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue));
    if (!parsed?.slug || parsed.slug !== slug) {
      return null;
    }
    return {
      slug: parsed.slug,
      mode: String(parsed.mode ?? "money").trim().toLowerCase() || "money",
      playerId: String(parsed.playerId ?? THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID).trim() || THREE_OAKS_PRODUCT_DEFAULT_PLAYER_ID,
      currency: String(parsed.currency ?? THREE_OAKS_PRODUCT_DEFAULT_CURRENCY).trim().toUpperCase() || THREE_OAKS_PRODUCT_DEFAULT_CURRENCY,
      createdAt: Number.isFinite(parsed.createdAt) ? parsed.createdAt : Date.now(),
    };
  } catch {
    return null;
  }
}

async function resolveThreeOaksWrapperLaunch(mode, slug) {
  if (mode !== "product") {
    return resolveSlotCityThreeOaksLaunch(slug);
  }

  try {
    return await resolveThreeOaksProductLaunch(slug);
  } catch (error) {
    if (!isMissingThreeOaksProductLaunchConfig(error)) {
      throw error;
    }

    const launch = await resolveSlotCityThreeOaksLaunch(slug);
    return {
      ...launch,
      resolverMode: "local_product_bootstrap",
    };
  }
}

function isMissingThreeOaksProductLaunchConfig(error) {
  return Boolean(
    error
    && error.statusCode === 500
    && typeof error.message === "string"
    && error.message.includes("Missing THREE_OAKS_PRODUCT_LAUNCH_URL_TEMPLATE or THREE_OAKS_PRODUCT_RESOLVER_URL_TEMPLATE"),
  );
}

function normalizeMoneyAmount(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function isThreeOaksExternalPromoRequest(pathname) {
  return pathname.includes("/external_promo/external-promo.js")
    || pathname.includes("/external_promo/external-promo.legacy.js");
}

function isBeplayAssetPath(pathname) {
  const match = pathname.match(/^\/filez\/([^/]+)\/snapshot\/.+/);
  return Boolean(match && getBeplayConfig(match[1]));
}

function parseBgamingApiRequest(pathname) {
  const match = pathname.match(/^\/bgaming\/api\/([^/]+)\/?$/);
  if (!match) {
    return null;
  }

  return {
    game: decodeURIComponent(match[1]),
  };
}

function parseBgamingPublisherAssetRequest(pathname) {
  const match = pathname.match(/^\/bgaming\/publisher\/([^/]+)\/(.+)$/);
  if (!match) {
    return null;
  }

  return {
    game: decodeURIComponent(match[1]),
    assetPath: match[2],
  };
}

function readBeplayOverrideFromQuery(searchParams, config) {
  const action = searchParams.get("forceAction");
  if (!action) {
    return null;
  }

  const bet = searchParams.get("forceBet");
  return {
    game: config.game,
    action,
    bet: bet ? Number.parseFloat(bet).toFixed(2) : null,
  };
}

function readBeplayOverrideCookie(cookieHeader, expectedGame) {
  const rawValue = parseCookies(cookieHeader)[BEPLAY_OVERRIDE_COOKIE];
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue));
    if (!parsed?.game || !parsed?.action) {
      return null;
    }
    if (expectedGame && parsed.game !== expectedGame) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function readBgamingOverrideFromQuery(searchParams, config) {
  const feature = searchParams.get("forceFeature");
  if (!feature) {
    return null;
  }

  const supportedFeatures = new Set(Object.values(config.supportedFeatures ?? {}));
  if (!supportedFeatures.has(feature)) {
    throw Object.assign(new Error(`Unsupported BGaming feature override: ${feature}`), { statusCode: 400 });
  }

  const featureLevelRaw = searchParams.get("forceFeatureLevel");
  const featureLevel = featureLevelRaw == null || featureLevelRaw === ""
    ? null
    : Number.parseInt(featureLevelRaw, 10);
  if (featureLevelRaw != null && (!Number.isFinite(featureLevel) || featureLevel < 0)) {
    throw Object.assign(new Error("Invalid BGaming feature level"), { statusCode: 400 });
  }

  const betRaw = searchParams.get("forceBet");
  const bet = betRaw == null || betRaw === ""
    ? null
    : Number.parseFloat(betRaw);
  if (betRaw != null && (!Number.isFinite(bet) || bet <= 0)) {
    throw Object.assign(new Error("Invalid BGaming bet override"), { statusCode: 400 });
  }

  return {
    game: config.game,
    feature,
    featureLevel,
    bet,
  };
}

function readBgamingOverrideCookie(cookieHeader, expectedGame) {
  const rawValue = parseCookies(cookieHeader)[BGAMING_OVERRIDE_COOKIE];
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue));
    if (!parsed?.game || !parsed?.feature || parsed.game !== expectedGame) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function readBgamingSessionCookie(cookieHeader, expectedGame) {
  const rawValue = parseCookies(cookieHeader)[BGAMING_SESSION_COOKIE];
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue));
    if (!parsed?.game || !parsed?.sessionId) {
      return null;
    }
    if (expectedGame && parsed.game !== expectedGame) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function readBgamingUpstreamCookie(cookieHeader, expectedGame) {
  const rawValue = parseCookies(cookieHeader)[BGAMING_UPSTREAM_COOKIE];
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue));
    if (!parsed?.game || !parsed?.apiUrl) {
      return null;
    }
    if (expectedGame && parsed.game !== expectedGame) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function applyBeplayPlayOverride(body, override) {
  try {
    const payload = JSON.parse(body);
    if (payload.game !== override.game || payload.action !== "main") {
      return body;
    }

    payload.action = override.action;
    if (override.bet) {
      payload.bet = override.bet;
    }
    return JSON.stringify(payload);
  } catch {
    return body;
  }
}

function applyBgamingPlayOverride(body, override) {
  try {
    const payload = JSON.parse(body);
    if (typeof payload.bet_amount === "number" || typeof payload.buy_id === "string") {
      payload.buy_id = override.feature;
      if (override.bet != null) {
        payload.bet_amount = override.bet;
      }
      return JSON.stringify(payload);
    }

    if (payload.command !== "spin") {
      return body;
    }

    payload.options = {
      ...(payload.options ?? {}),
      buy_feature: true,
      purchased_feature: override.feature,
    };

    if (override.featureLevel != null) {
      payload.options.purchased_feature_level = override.featureLevel;
    }
    if (override.bet != null) {
      payload.options.bet = override.bet;
    }

    return JSON.stringify(payload);
  } catch {
    return body;
  }
}

function serializeCookieWithOptions(name, value, options = {}) {
  const parts = [`${name}=${value}`, `Path=${options.path ?? "/"}`, `SameSite=${options.sameSite ?? "Lax"}`];
  if (Number.isFinite(options.maxAgeSeconds)) {
    parts.push(`Max-Age=${options.maxAgeSeconds}`);
  }
  if (options.httpOnly) {
    parts.push("HttpOnly");
  }
  if (options.secure) {
    parts.push("Secure");
  }
  return parts.join("; ");
}

function serializeCookie(name, value, maxAgeSeconds = null) {
  return serializeCookieWithOptions(name, value, { maxAgeSeconds });
}

function clearCookie(name, options = {}) {
  return serializeCookieWithOptions(name, "", { ...options, maxAgeSeconds: 0 });
}

function parseClientMessage(body, url) {
  const trimmedBody = typeof body === "string" ? body.trim() : "";
  const bodyParams = parseBodyParams(trimmedBody);
  return {
    command: trimmedBody.match(/\bcommand="([^"]+)"/i)?.[1]
      ?? bodyParams.get("command")
      ?? url.searchParams.get("command")
      ?? "connect",
    session: trimmedBody.match(/\bsession="([^"]+)"/i)?.[1]
      ?? bodyParams.get("session")
      ?? bodyParams.get("session_id")
      ?? url.searchParams.get("session")
      ?? url.searchParams.get("session_id")
      ?? null,
    rnd: trimmedBody.match(/\brnd="([^"]+)"/i)?.[1]
      ?? bodyParams.get("rnd")
      ?? url.searchParams.get("rnd")
      ?? randomId(),
    bet: parseBetValue(trimmedBody, bodyParams, url.searchParams),
  };
}

function parseBodyParams(body) {
  if (!body || body.startsWith("<")) {
    return new URLSearchParams();
  }

  const normalized = body.startsWith("?") ? body.slice(1) : body;
  return new URLSearchParams(normalized);
}

function parseBetValue(body, bodyParams, queryParams) {
  const rawValue = body.match(/<bet[^>]*cash="([^"]+)"/i)?.[1]
    ?? bodyParams.get("cash")
    ?? bodyParams.get("bet")
    ?? queryParams.get("cash")
    ?? queryParams.get("bet")
    ?? "10";
  const parsed = Number.parseInt(rawValue, 10);
  return Number.isFinite(parsed) ? parsed : 10;
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress ?? "unknown";
}

function handleRequestError(req, res, context, error) {
  writeStructuredLog("request_error", {
    requestId: context.requestId,
    path: context.pathname,
    gameId: context.gameId,
    message: error?.message ?? "Unknown error",
  });

  if (res.headersSent) {
    return;
  }

  const wantsXml = context.pathname?.includes("WebEngine.php");
  if (wantsXml) {
    sendXml(res, `<server status="error"><message>${escapeXml(error?.message ?? "Internal error")}</message></server>`);
  } else {
    sendJson(res, error?.statusCode ?? 500, {
      error: error?.message ?? "Internal error",
      requestId: context.requestId,
    });
  }

  finalizeRequestLog(req, res, context, { failed: true });
}

function randomId() {
  return randomUUID().replaceAll("-", "");
}

main().catch((error) => {
  console.error("Failed to start slot server:", error);
  process.exit(1);
});
