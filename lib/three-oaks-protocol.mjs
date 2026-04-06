import { randomUUID } from "node:crypto";

const THREE_OAKS_MODE_DEFAULTS = {
  demo: {
    currency: "FUN",
    huidPrefix: "demo",
    isTest: false,
  },
  money: {
    currency: "USD",
    huidPrefix: "money",
    isTest: false,
  },
};

export function isThreeOaksApiRequest(config, pathname) {
  if (config.protocol !== "three_oaks") {
    return false;
  }
  return new RegExp(config.threeOaks.apiPathRegex).test(pathname);
}

export function isThreeOaksNoopRequest(config, pathname) {
  if (config.protocol !== "three_oaks") {
    return false;
  }
  return new RegExp(config.threeOaks.noopPathRegex).test(pathname);
}

export function parseThreeOaksRequest(body, url) {
  const raw = tryParseJson(body);
  const action = raw.action ?? {};

  return {
    body: raw,
    command: raw.command ?? url.searchParams.get("gsc") ?? "login",
    requestId: raw.request_id ?? randomId(),
    sessionId: raw.session_id ?? url.searchParams.get("session_id") ?? null,
    actionName: action.name ?? null,
    actionParams: action.params ?? {},
    originData: normalizeOriginData(raw),
  };
}

export function ensureThreeOaksState(config, state) {
  const userDefaults = resolveThreeOaksUserDefaults(config);
  if (!state.threeOaksReady) {
    state.lineBet = config.defaultBet;
    state.threeOaksReady = true;
  }
  if (!config.threeOaks.bets.includes(state.lineBet)) {
    state.lineBet = config.defaultBet;
  }
  state.cashBet = state.lineBet * config.lineCount * config.totalBetMultiplier;
  state.balanceVersion ??= 1;
  state.huid ??= `${userDefaults.huidPrefix}-${randomId()}`;
  state.currency ??= userDefaults.currency;
  state.isTest ??= userDefaults.isTest;
  return state;
}

export function bumpBalanceVersion(state, amount = 1) {
  state.balanceVersion = Math.max(1, Number.parseInt(state.balanceVersion ?? 1, 10) || 1) + amount;
  return state.balanceVersion;
}

export function createLoginResponse(config, sessionId, state, requestId) {
  return {
    command: "login",
    modes: ["auto", "play"],
    request_id: requestId,
    session_id: sessionId,
    status: createStatus(),
    user: createUser(config, state),
  };
}

export function createStartResponse(config, sessionId, state, requestId) {
  return {
    command: "start",
    context: createContext(config, state, "init", {}, {
      includeLastWin: false,
      roundWin: 0,
      totalWin: 0,
      includeWinlines: false,
    }),
    modes: ["auto", "play"],
    request_id: requestId,
    session_id: sessionId,
    settings: createSettings(config),
    status: createStatus(),
    user: createUser(config, state),
  };
}

export function createSyncResponse(config, sessionId, state, requestId) {
  return {
    command: "sync",
    context: createContext(config, state, state.lastThreeOaksAction ?? "spin", state.lastThreeOaksArgs ?? defaultSpinArgs(config, state)),
    modes: ["auto", "play"],
    request_id: requestId,
    session_id: sessionId,
    status: createStatus(),
    user: createUser(config, state),
  };
}

export function createPlayResponse(config, sessionId, state, requestId, originData = null) {
  const response = {
    command: "play",
    context: createContext(config, state, state.lastThreeOaksAction ?? "spin", state.lastThreeOaksArgs ?? defaultSpinArgs(config, state)),
    modes: ["auto", "play"],
    request_id: requestId,
    session_id: sessionId,
    status: createStatus(),
    user: createUser(config, state),
  };

  if (originData) {
    response.origin_data = originData;
  }

  return response;
}

export function createErrorResponse(config, sessionId, state, requestId, code, originData = null) {
  const response = {
    command: "play",
    context: createContext(config, state, state.lastThreeOaksAction ?? "spin", state.lastThreeOaksArgs ?? defaultSpinArgs(config, state)),
    modes: ["auto", "play"],
    request_id: requestId,
    session_id: sessionId,
    status: createStatus(code, "crit"),
    user: createUser(config, state),
  };

  if (originData) {
    response.origin_data = originData;
  }

  return response;
}

function createUser(config, state) {
  const userDefaults = resolveThreeOaksUserDefaults(config);
  return {
    balance: state.balance,
    balance_version: state.balanceVersion,
    currency: state.currency ?? userDefaults.currency,
    denominator: config.threeOaks.currencyFormat.denominator,
    huid: state.huid,
    is_test: state.isTest ?? userDefaults.isTest,
    show_balance: true,
  };
}

function resolveThreeOaksUserDefaults(config) {
  const configuredMode = String(config?.threeOaks?.mode ?? "demo").trim().toLowerCase();
  const mode = configuredMode === "money" ? "money" : "demo";
  return {
    ...THREE_OAKS_MODE_DEFAULTS[mode],
    ...(config?.threeOaks?.userDefaults ?? {}),
  };
}

function createStatus(code = "OK", type = "ok") {
  if (code === "OK" && type === "ok") {
    return {
      code,
    };
  }
  return {
    code,
    type,
  };
}

function createContext(config, state, lastAction, lastArgs, options = {}) {
  const roundBet = state.lineBet * config.lineCount * config.totalBetMultiplier;
  const roundWin = normalizeAmount(options.roundWin ?? state.cashWin ?? 0);
  const totalWin = normalizeAmount(options.totalWin ?? roundWin);
  const fsIntroPending = hasPendingFreespinsIntro(state);
  const fsOutroPending = hasPendingFreespinsStop(state);
  const fsModeVisible = fsIntroPending || state.freespinsActive || fsOutroPending;
  const current = fsIntroPending ? "spins" : (fsModeVisible ? "freespins" : "spins");
  const actions = [fsIntroPending ? "freespin_init" : (fsModeVisible ? (fsOutroPending ? "freespin_stop" : "freespin") : "spin")];
  const spins = createModeContext(config, state, {
    totalWin,
    roundBet,
    roundWin,
    roundsGranted: fsIntroPending ? normalizeAmount(state.freespinsTotal) : undefined,
    roundsLeft: fsIntroPending ? normalizeAmount(state.freespinsTotal) : undefined,
  });
  const winlines = createWinlines(state);
  if ((options.includeWinlines ?? true) && winlines.length > 0) {
    spins.winlines = winlines;
  }
  const winscatters = createWinscatters(config, state, {
    awardCount: fsIntroPending ? state.freespinsTotal : undefined,
  });
  if (winscatters.length > 0) {
    spins.winscatters = winscatters;
  }

  const context = {
    actions,
    bet_per_line: state.lineBet,
    current,
    last_action: lastAction,
    last_args: lastArgs,
    left: fsModeVisible ? normalizeAmount(state.freespinsLeft) : 0,
    lines: config.lineCount,
    round_bet: roundBet,
    round_finished: true,
    spins,
    total_win: current === "freespins" ? normalizeAmount(state.freeWin ?? 0) : totalWin,
    version: 3,
  };

  if (fsModeVisible) {
    context.freespins = createModeContext(config, state, {
      totalWin: normalizeAmount(state.freeWin ?? 0),
      roundBet,
      roundWin: current === "freespins" ? roundWin : 0,
      roundsGranted: normalizeAmount(state.freespinsTotal),
      roundsLeft: normalizeAmount(state.freespinsLeft),
    });
  }

  if (options.includeLastWin ?? true) {
    context.last_win = roundWin;
  }

  return context;
}

function createSettings(config) {
  const settings = {
    bet_factor: [config.lineCount],
    bets: [...config.threeOaks.bets],
    big_win: [...config.threeOaks.bigWin],
    bonus_symbols: [...config.threeOaks.bonusSymbols],
    cols: 5,
    currency_format: { ...config.threeOaks.currencyFormat },
    jackpots: { ...config.threeOaks.jackpots },
    lines: [config.lineCount],
    paylines: config.paylines.map((line) => [...line]),
    paytable: createPaytable(config),
    pt_supported: true,
    reelsamples: structuredClone(config.threeOaks.reelSamples),
    rows: 3,
    supported_freebets: ["fixed", "flexible"],
    symbols: structuredClone(config.threeOaks.symbolsDetailed),
    symbols_line: [1, 2, 3, 4, 5, 6, 7, 8],
    symbols_scat: [10, 11],
    symbols_wild: [9],
    use_freebet_init_pick: false,
    use_pt_testing: false,
  };

  if (config.features?.freespins?.awardCount) {
    settings.fs_retrigger = config.features.freespins.awardCount;
  }
  if (config.features?.holdAndSpin?.rounds) {
    settings.respins_granted = config.features.holdAndSpin.rounds;
  }

  return settings;
}

function createPaytable(config) {
  const paytable = {};

  for (const [symbolId, entries] of Object.entries(config.paytable)) {
    paytable[symbolId] = Object.entries(entries).map(([occurrences, multiplier]) => ({
      multiplier,
      occurrences: Number.parseInt(occurrences, 10),
      type: "lb",
    }));
  }

  paytable["10"] = [{
    freespins: 8,
    multiplier: 2,
    occurrences: 3,
    trigger: "freespins",
    type: "tb",
  }];

  return paytable;
}

function createBonusGrid(value) {
  return Array.from({ length: 5 }, () => Array(3).fill(value));
}

function createModeContext(config, state, options) {
  const modeContext = {
    bet_per_line: state.lineBet,
    board: state.lastWindow,
    bs_v: createBonusGrid(0),
    bs_values: createBonusGrid(0),
    is_sb_trigger: false,
    is_super_state: false,
    lines: config.lineCount,
    round_bet: options.roundBet,
    round_win: normalizeAmount(options.roundWin ?? 0),
    sr: true,
    sr_rounds: 0,
    total_win: normalizeAmount(options.totalWin ?? 0),
  };

  if (options.roundsGranted != null) {
    modeContext.rounds_granted = normalizeAmount(options.roundsGranted);
  }
  if (options.roundsLeft != null) {
    modeContext.rounds_left = normalizeAmount(options.roundsLeft);
  }

  return modeContext;
}

function createWinlines(state) {
  if (!Array.isArray(state.lastWins) || state.lastWins.length === 0) {
    return [];
  }

  return state.lastWins.map((win) => {
    const positions = String(win.offsets ?? "")
      .split(",")
      .map((entry) => Number.parseInt(entry, 10))
      .filter((entry) => Number.isFinite(entry) && entry >= 0)
      .map((offset) => [offset % 5, Math.floor(offset / 5)]);

    return {
      amount: normalizeAmount(win.cash),
      line: normalizeAmount(win.line),
      occurrences: positions.length,
      positions,
      symbol: normalizeAmount(win.comb),
      type: "lb",
    };
  });
}

function createWinscatters(config, state, options = {}) {
  const freespins = config.features?.freespins;
  if (!freespins || state.scatterCount < freespins.triggerCount || !Array.isArray(state.lastWindow)) {
    return [];
  }

  const positions = [];
  for (let col = 0; col < state.lastWindow.length; col += 1) {
    const reel = state.lastWindow[col];
    for (let row = 0; row < reel.length; row += 1) {
      if (reel[row] === freespins.triggerSymbol) {
        positions.push([col, row]);
      }
    }
  }

  if (positions.length < freespins.triggerCount) {
    return [];
  }

  return [{
    amount: normalizeAmount(state.cashWin ?? 0),
    freespins: normalizeAmount(options.awardCount ?? freespins.awardCount),
    multiplier: 2,
    occurrences: positions.length,
    positions,
    symbol: freespins.triggerSymbol,
    trigger: "freespins",
    type: "tb",
  }];
}

function hasPendingFreespinsIntro(state) {
  return Boolean(state.pendingFsTrigger && normalizeAmount(state.freespinsTotal) > 0);
}

function hasPendingFreespinsStop(state) {
  return !state.freespinsActive && !state.pendingFsTrigger && normalizeAmount(state.freespinsTotal) > 0;
}

function normalizeOriginData(raw) {
  if (raw.origin_data && typeof raw.origin_data === "object") {
    return raw.origin_data;
  }

  const originData = {};

  if ("autogame" in raw) originData.autogame = Boolean(raw.autogame);
  if ("client_command_timestamp" in raw) originData.client_command_timestamp = normalizeAmount(raw.client_command_timestamp);
  if ("feature" in raw) originData.feature = Boolean(raw.feature);
  else if ("buy_feature" in raw) originData.feature = Boolean(raw.buy_feature);
  if ("fullscreen" in raw) originData.fullscreen = Boolean(raw.fullscreen);
  if ("mobile" in raw) originData.mobile = String(raw.mobile);
  if ("portrait" in raw) originData.portrait = Boolean(raw.portrait);
  if ("quickspin" in raw || "quick_spin" in raw) {
    originData.quickspin = normalizeAmount(raw.quickspin ?? raw.quick_spin);
  }
  if ("set_denominator" in raw) originData.set_denominator = normalizeAmount(raw.set_denominator);
  if ("sound" in raw) originData.sound = Boolean(raw.sound);
  if ("viewportSize" in raw && typeof raw.viewportSize === "string" && raw.viewportSize.trim()) {
    originData.viewportSize = raw.viewportSize;
  }

  return Object.keys(originData).length > 0 ? originData : null;
}

function normalizeAmount(value) {
  return Number.parseInt(String(value ?? "0"), 10) || 0;
}

function defaultSpinArgs(config, state) {
  return {
    bet_per_line: state.lineBet,
    lines: config.lineCount,
  };
}

function tryParseJson(body) {
  if (!body || !String(body).trim()) {
    return {};
  }

  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}

function randomId() {
  return randomUUID().replaceAll("-", "");
}
