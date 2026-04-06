import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { slotConfigs } from "../lib/slot-configs.mjs";
import {
  createInitialState,
  finishBonusIfNeeded,
  forceFeatureState,
  normalizeState,
  playBonusRound,
  spinRound,
} from "../lib/slot-engine.mjs";
import {
  renderBonus,
  renderConnect,
  renderReconnect,
  renderSpinLike,
  renderSync,
} from "../lib/slot-protocols.mjs";
import { getPhysicalIndexPath, rewriteIndexHtml } from "../lib/slot-routing.mjs";
import {
  bumpBalanceVersion,
  createLoginResponse,
  createPlayResponse,
  createStartResponse,
  createSyncResponse,
  ensureThreeOaksState,
  parseThreeOaksRequest,
} from "../lib/three-oaks-protocol.mjs";

const ROOT_DIR = process.cwd();
const OUTPUT_DIR = path.join(ROOT_DIR, "output", "server-smoke");
const SUMMARY_PATH = path.join(OUTPUT_DIR, "summary.json");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function xmlAttr(xml, name) {
  return xml.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1] ?? null;
}

function expectedTotalBet(config, requestedBet) {
  const lineBet = Math.max(1, Math.floor(requestedBet / config.lineCount) || 1);
  return lineBet * config.lineCount * config.totalBetMultiplier;
}

function readIndex(config) {
  const filePath = getPhysicalIndexPath(ROOT_DIR, config);
  const html = fs.readFileSync(filePath, "utf8");
  return { filePath, html };
}

function checkReadyAndIndexes() {
  const games = Object.keys(slotConfigs);
  const indexes = Object.values(slotConfigs).map((config) => {
    const { filePath, html } = readIndex(config);
    const rewritten = rewriteIndexHtml(config, html, 18080);

    assert(fs.existsSync(filePath), `${config.id} index file is missing`);
    assert(rewritten.length >= html.length * 0.5, `${config.id} rewritten index looks truncated`);

    if (config.remoteAssetBase) {
      assert(rewritten.includes(config.localAssetBase), `${config.id} rewritten index did not remap asset base`);
    }
    if (config.remoteEngineUrl) {
      assert(rewritten.includes(`http://127.0.0.1:18080${config.enginePath}`), `${config.id} rewritten index did not remap engine URL`);
    }
    if (config.protocol === "three_oaks") {
      assert(rewritten.includes(`${config.routeBase}/static.3oaks.com/`), `${config.id} rewritten index did not remap 3 Oaks CDN`);
    }

    return {
      gameId: config.id,
      filePath,
      bytes: html.length,
    };
  });

  return { games, indexes };
}

function checkEnergy() {
  const config = slotConfigs.energy;
  const sessionId = "energy-smoke";
  const state = normalizeState(config, createInitialState(config));
  const rnd = "energy-rnd";

  const connectXml = renderConnect(config, sessionId, state, rnd);
  assert(connectXml.includes('command="connect"'), "energy connect envelope missing");

  const reconnectXml = renderReconnect(config, sessionId, state, rnd);
  assert(reconnectXml.includes('<server command="reconnect"'), "energy reconnect envelope missing");
  assert(reconnectXml.includes('<spin_cmd command="bet"'), "energy reconnect missing spin_cmd bootstrap");

  const result = spinRound(config, state, 10);
  assert(result.ok, "energy base spin failed");
  const betXml = renderSpinLike(config, sessionId, state, rnd, "bet");
  assert(betXml.includes('<spin_cmd command="bet"'), "energy bet response missing spin_cmd");
  assert(state.totalBet === expectedTotalBet(config, 10), `energy totalBet expected ${expectedTotalBet(config, 10)}, got ${state.totalBet}`);

  const syncXml = renderSync(config, sessionId, state, rnd);
  assert(syncXml.includes('current_state="idle"') || syncXml.includes('current_state="bonus"'), "energy sync missing current_state");

  const bonusState = forceFeatureState(config, state, "bonus");
  const bonusReconnectXml = renderReconnect(config, sessionId, bonusState, rnd);
  assert(bonusReconnectXml.includes('<game_cmd command="bonus"'), "energy bonus reconnect missing game_cmd");
  assert(bonusReconnectXml.includes('current_state="bonus"'), "energy bonus reconnect missing bonus state");

  let roundsPlayed = 0;
  let lastBonusXml = "";
  while (bonusState.bonusRoundsLeft > 0) {
    const ok = playBonusRound(config, bonusState);
    assert(ok, "energy bonus round failed to advance");
    roundsPlayed += 1;
    lastBonusXml = renderBonus(config, sessionId, bonusState, `${rnd}-${roundsPlayed}`);
    assert(lastBonusXml.includes('<server command="bonus"'), "energy bonus response missing root server tag");
  }
  assert(xmlAttr(lastBonusXml, "status") === "bet", "energy final bonus response did not finish with status=bet");

  finishBonusIfNeeded(bonusState);
  assert(bonusState.bonusActive === false, "energy bonus state was not cleared after finish");

  return {
    sessionId,
    totalBet: state.totalBet,
    balance: state.balance,
    bonusRoundsPlayed: roundsPlayed,
    bonusWin: bonusState.bonusWin,
    finalBonusStatus: xmlAttr(lastBonusXml, "status"),
  };
}

function checkWolf() {
  const config = slotConfigs.wolf;
  const sessionId = "wolf-smoke";
  const state = normalizeState(config, createInitialState(config));
  const rnd = "wolf-rnd";

  const connectXml = renderConnect(config, sessionId, state, rnd);
  assert(connectXml.includes('command="connect"'), "wolf connect envelope missing");

  const reconnectXml = renderReconnect(config, sessionId, state, rnd);
  assert(reconnectXml.includes('<server command="reconnect"'), "wolf reconnect envelope missing");

  const result = spinRound(config, state, 10);
  assert(result.ok, "wolf base spin failed");
  const betXml = renderSpinLike(config, sessionId, state, rnd, "bet");
  assert(betXml.includes('<server command="bet"'), "wolf bet response missing server tag");
  assert(state.totalBet === expectedTotalBet(config, 10), `wolf totalBet expected ${expectedTotalBet(config, 10)}, got ${state.totalBet}`);

  const fsState = forceFeatureState(config, state, "fs");
  const fsReconnectXml = renderReconnect(config, sessionId, fsState, rnd);
  assert(fsReconnectXml.includes('current_state="fs"'), "wolf fs reconnect missing fs state");

  const fsResult = spinRound(config, fsState, 10);
  assert(fsResult.ok, "wolf fs spin failed");
  const fsBetXml = renderSpinLike(config, sessionId, fsState, rnd, "bet");
  assert(fsBetXml.includes('bonus_games="'), "wolf fs response missing bonus_games");

  const bonusState = forceFeatureState(config, state, "bonus");
  const bonusReconnectXml = renderReconnect(config, sessionId, bonusState, rnd);
  assert(bonusReconnectXml.includes('current_state="bonus"'), "wolf bonus reconnect missing bonus state");

  let roundsPlayed = 0;
  let lastBonusXml = "";
  while (bonusState.bonusRoundsLeft > 0) {
    const ok = playBonusRound(config, bonusState);
    assert(ok, "wolf bonus round failed to advance");
    roundsPlayed += 1;
    lastBonusXml = renderBonus(config, sessionId, bonusState, `${rnd}-${roundsPlayed}`);
  }
  assert(xmlAttr(lastBonusXml, "status") === "bet", "wolf final bonus response did not finish with status=bet");

  finishBonusIfNeeded(bonusState);
  assert(bonusState.bonusActive === false, "wolf bonus state was not cleared after finish");

  return {
    sessionId,
    totalBet: state.totalBet,
    balance: state.balance,
    fsLeftAfterSpin: fsState.freespinsLeft,
    bonusRoundsPlayed: roundsPlayed,
    finalBonusStatus: xmlAttr(lastBonusXml, "status"),
  };
}

function checkSun3() {
  const config = slotConfigs.sun3;
  const sessionId = "sun3-smoke";
  const request = parseThreeOaksRequest(JSON.stringify({
    command: "play",
    request_id: "sun3-request",
    session_id: sessionId,
    action: {
      name: "spin",
      params: {
        bet_per_line: config.defaultBet,
      },
    },
  }), new URL("http://127.0.0.1/sun_of_egypt_3/demo?gsc=play"));

  assert(request.command === "play", `sun3 parseThreeOaksRequest command mismatch: ${request.command}`);
  assert(request.actionName === "spin", `sun3 parseThreeOaksRequest action mismatch: ${request.actionName}`);

  const state = normalizeState(config, createInitialState(config));
  ensureThreeOaksState(config, state);

  const loginResponse = createLoginResponse(config, sessionId, state, "login-rnd");
  assert(loginResponse.command === "login", "sun3 login response command mismatch");

  bumpBalanceVersion(state);
  const startResponse = createStartResponse(config, sessionId, state, "start-rnd");
  assert(startResponse.command === "start", "sun3 start response command mismatch");

  state.lastThreeOaksAction = "spin";
  state.lastThreeOaksArgs = {
    bet_per_line: config.defaultBet,
    lines: config.lineCount,
  };

  const totalBet = config.defaultBet * config.lineCount;
  const result = spinRound(config, state, totalBet);
  assert(result.ok, "sun3 play spin failed");
  bumpBalanceVersion(state);

  const playResponse = createPlayResponse(config, sessionId, state, "play-rnd");
  assert(playResponse.command === "play", "sun3 play response command mismatch");
  assert(playResponse.context.last_action === "spin", "sun3 play response last_action mismatch");
  assert(playResponse.context.spins.round_bet === totalBet, `sun3 round_bet expected ${totalBet}, got ${playResponse.context.spins.round_bet}`);

  const syncResponse = createSyncResponse(config, sessionId, state, "sync-rnd");
  assert(syncResponse.command === "sync", "sun3 sync response command mismatch");

  return {
    sessionId,
    totalBet: state.totalBet,
    totalWin: state.totalWin,
    balance: state.balance,
    balanceVersion: state.balanceVersion,
    lastWin: playResponse.context.last_win,
  };
}

function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const summary = {
    generatedAt: new Date().toISOString(),
    result: "ok",
    checks: {
      ready: checkReadyAndIndexes(),
      energy: checkEnergy(),
      wolf: checkWolf(),
      sun3: checkSun3(),
    },
  };

  fs.writeFileSync(SUMMARY_PATH, `${JSON.stringify(summary, null, 2)}\n`);
  console.log(JSON.stringify({
    result: summary.result,
    summaryPath: SUMMARY_PATH,
    checks: Object.keys(summary.checks),
  }, null, 2));
}

try {
  main();
} catch (error) {
  const summary = {
    generatedAt: new Date().toISOString(),
    result: "error",
    error: error?.stack ?? String(error),
  };
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(SUMMARY_PATH, `${JSON.stringify(summary, null, 2)}\n`);
  console.error(summary.error);
  process.exit(1);
}
