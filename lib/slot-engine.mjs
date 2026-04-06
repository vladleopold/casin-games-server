import { randomInt } from "node:crypto";

export function createInitialState(config) {
  return {
    schemaVersion: 6,
    balance: config.initialBalance,
    totalBet: 0,
    totalWin: 0,
    lineBet: 1,
    cashBet: config.lineCount * config.totalBetMultiplier,
    cashWin: 0,
    lastWindow: createWindowFromReelSet(config, 1),
    lastWindowServer: config.defaultShiftServers?.[1] ?? null,
    lastWins: [],
    reelSet: 1,
    scatterCount: 0,
    freespinsActive: false,
    freespinsLeft: 0,
    freespinsTotal: 0,
    freeWin: 0,
    pendingFsTrigger: false,
    bonusActive: false,
    bonusRoundsLeft: 0,
    bonusTotalRounds: config.features.holdAndSpin?.rounds ?? 0,
    bonusPositions: [],
    bonusTypes: [],
    bonusValuesTb: Array(15).fill(0),
    bonusMatrix: Array.from({ length: 5 }, () => Array(3).fill(config.symbols.hidden ?? config.symbols.bonus ?? 11)),
    bonusMatrixServer: null,
    bonusWin: 0,
    bonusWinApplied: false,
    bonusCollectResolved: false,
    pendingBonusTrigger: false,
    bonusRoundIndex: 0,
    energyMainSpinCount: 0,
  };
}

export function normalizeState(config, state) {
  const next = { ...createInitialState(config), ...state };
  next.lastWins ??= [];
  next.bonusPositions ??= [];
  next.bonusTypes ??= [];
  next.bonusValuesTb ??= Array(15).fill(0);
  next.bonusMatrix ??= Array.from({ length: 5 }, () => Array(3).fill(config.symbols.hidden ?? config.symbols.bonus ?? 11));
  return next;
}

export function spinRound(config, state, requestedBet) {
  const lineBet = Math.max(1, Math.floor(requestedBet / config.lineCount) || 1);
  const totalBet = lineBet * config.lineCount * config.totalBetMultiplier;
  const inFs = state.freespinsActive && state.freespinsLeft > 0;
  if (!inFs && state.balance < totalBet) {
    return { ok: false, error: "NOT_ENOUGH_MONEY" };
  }

  state.lineBet = lineBet;
  state.cashBet = inFs ? 0 : totalBet;
  if (!inFs) {
    state.balance -= totalBet;
    state.totalBet += totalBet;
  }

  state.reelSet = inFs ? 2 : 1;
  let { windowData, evaluated } = pickSpinOutcome(config, state, lineBet);

  if (!inFs && config.protocol === "energy") {
    state.energyMainSpinCount += 1;
    if (state.energyMainSpinCount >= 8) {
      windowData = createForcedEnergyBonusWindow(config);
      evaluated = evaluateWindow(config, windowData, lineBet);
      state.energyMainSpinCount = 0;
    }
  }

  state.lastWindow = windowData;
  state.lastWins = evaluated.wins;
  state.cashWin = evaluated.totalWin;
  state.scatterCount = evaluated.scatterCount;
  state.balance += evaluated.totalWin;
  state.totalWin += evaluated.totalWin;

  if (inFs) {
    state.freespinsLeft -= 1;
    state.freeWin += evaluated.totalWin;
    if (state.freespinsLeft <= 0) {
      state.freespinsActive = false;
    }
  } else if (config.features.freespins && evaluated.scatterCount >= config.features.freespins.triggerCount) {
    state.freespinsActive = true;
    state.freespinsLeft = config.features.freespins.awardCount;
    state.freespinsTotal = config.features.freespins.awardCount;
    state.freeWin = 0;
    state.pendingFsTrigger = true;
  } else {
    state.pendingFsTrigger = false;
  }

  const bonusFeature = config.features.holdAndSpin;
  const bonusSymbols = bonusFeature?.triggerSymbols ?? [];
  const bonusPositions = [];
  for (let col = 0; col < 5; col += 1) {
    for (let row = 0; row < 3; row += 1) {
      if (bonusSymbols.includes(windowData[col][row])) {
        bonusPositions.push(row * 5 + col);
      }
    }
  }

  if (!state.freespinsActive && bonusFeature && bonusPositions.length >= bonusFeature.triggerCount) {
    seedBonusState(config, state, windowData, bonusPositions);
    state.pendingBonusTrigger = true;
    if (config.protocol === "energy") {
      state.energyMainSpinCount = 0;
    }
  } else {
    state.pendingBonusTrigger = false;
  }

  return { ok: true };
}

export function finalizeRound(state) {
  state.cashWin = 0;
  state.lastWins = [];
  state.scatterCount = 0;
  state.pendingFsTrigger = false;
  state.pendingBonusTrigger = false;
}

export function playBonusRound(config, state) {
  if (!state.bonusActive || state.bonusRoundsLeft <= 0) {
    return false;
  }
  state.bonusRoundIndex += 1;
  const totalBet = getTotalBet(config, state.lineBet);
  const roundCollectWin = getBonusRoundCollectTb(state) * totalBet;
  const hasCollect = hasCollectSymbol(state);
  if (hasCollect) {
    state.bonusCollectResolved = true;
  }

  state.bonusRoundsLeft = Math.max(0, state.bonusRoundsLeft - 1);
  if (state.bonusRoundsLeft === 0) {
    if (!hasCollect && roundCollectWin > 0) {
      state.bonusWin += roundCollectWin;
    }
    if (!state.bonusWinApplied && state.bonusWin > 0) {
      state.balance += state.bonusWin;
      state.totalWin += state.bonusWin;
      state.bonusWinApplied = true;
    }
  }
  state.cashBet = 0;
  state.cashWin = 0;
  return true;
}

export function finishBonusIfNeeded(state) {
  if (state.bonusActive && state.bonusRoundsLeft === 0) {
    state.bonusActive = false;
    state.bonusPositions = [];
    state.bonusTypes = [];
    state.bonusValuesTb = Array(15).fill(0);
  }
}

export function forceFeatureState(config, state, feature, options = {}) {
  const next = normalizeState(config, state);
  resetFeatureState(config, next);

  const lineBet = Math.max(1, Number.parseInt(options.lineBet ?? next.lineBet ?? 1, 10) || 1);
  next.lineBet = lineBet;

  if (options.balance != null) {
    const balance = Number.parseInt(options.balance, 10);
    if (Number.isFinite(balance)) {
      next.balance = Math.max(0, balance);
    }
  }

  if (feature === "bonus") {
    if (!config.features.holdAndSpin) {
      throw new Error(`Feature "bonus" is not supported for ${config.id}`);
    }

    const windowData = createForcedBonusTriggerWindow(config);
    const positions = collectTriggerPositions(config, windowData, config.features.holdAndSpin.triggerSymbols);
    seedBonusState(config, next, cloneMatrix(windowData), positions);
    next.lastWindow = windowData;
    next.lastWindowServer = null;
    next.reelSet = 1;
    next.bonusRoundsLeft = clampRounds(options.spinsLeft, config.features.holdAndSpin.rounds);
    next.bonusTotalRounds = config.features.holdAndSpin.rounds;
    next.bonusRoundIndex = 0;
    return next;
  }

  if (feature === "fs") {
    if (!config.features.freespins) {
      throw new Error(`Feature "fs" is not supported for ${config.id}`);
    }

    const total = config.features.freespins.awardCount;
    next.lastWindow = createWindowFromReelSet(config, 2);
    next.lastWindowServer = config.defaultShiftServers?.[2] ?? null;
    next.reelSet = 2;
    next.freespinsActive = true;
    next.freespinsLeft = clampRounds(options.spinsLeft, total);
    next.freespinsTotal = total;
    next.freeWin = Number.parseInt(options.freeWin ?? "0", 10) || 0;
    return next;
  }

  throw new Error(`Unknown feature "${feature}"`);
}

export function getMode(state) {
  if (state.bonusActive) return "bonus";
  if (state.freespinsActive) return "fs";
  return "idle";
}

export function createShift(windowData, reelSet = 1, serverOverride = null) {
  const reelAttrs = windowData
    .map((reel, index) => `reel${index + 1}="${reel.join(",")}"`)
    .join(" ");
  const server = serverOverride ?? windowData
    .map((reel, index) => reel.reduce((sum, value) => sum + value * (index + 1), 0))
    .join(",");
  return `<shift server="${server}" reel_set="${reelSet}" ${reelAttrs}/>`;
}

function seedBonusState(config, state, windowData, positions) {
  const values = Array(15).fill(0);
  const matrix = cloneMatrix(windowData);
  const types = [];
  positions.forEach((offset, index) => {
    const column = offset % 5;
    const row = Math.floor(offset / 5);
    const landedSymbol = windowData[column][row];
    const isJackpot = landedSymbol === config.symbols.jackpot;
    types.push(isJackpot ? 1 : 0);

    if (config.protocol === "wolf") {
      matrix[column][row] = config.symbols.bonus;
    } else {
      matrix[column][row] = landedSymbol;
    }

    if (!isJackpot && landedSymbol !== config.symbols.collect) {
      values[offset] = pickRandom(config.features.holdAndSpin.values);
    }
    if (config.protocol !== "wolf" && index === 0 && (config.symbols.collect || config.symbols.jackpot)) {
      matrix[column][row] = config.symbols.collect ?? config.symbols.jackpot;
      windowData[column][row] = matrix[column][row];
      values[offset] = 0;
    }
  });
  state.bonusActive = true;
  state.bonusRoundsLeft = config.features.holdAndSpin.rounds;
  state.bonusTotalRounds = config.features.holdAndSpin.rounds;
  state.bonusPositions = positions;
  state.bonusTypes = types;
  state.bonusValuesTb = values;
  state.bonusMatrix = matrix;
  state.bonusCollectResolved = false;
  state.bonusWinApplied = false;
  state.bonusWin = hasCollectSymbol(state) ? getBonusRoundCollectTb(state) * getTotalBet(config, state.lineBet) : 0;
}

function resetFeatureState(config, state) {
  state.cashBet = 0;
  state.cashWin = 0;
  state.lastWins = [];
  state.scatterCount = 0;
  state.pendingFsTrigger = false;
  state.freespinsActive = false;
  state.freespinsLeft = 0;
  state.freespinsTotal = 0;
  state.freeWin = 0;
  state.pendingBonusTrigger = false;
  state.bonusActive = false;
  state.bonusRoundsLeft = 0;
  state.bonusTotalRounds = config.features.holdAndSpin?.rounds ?? 0;
  state.bonusPositions = [];
  state.bonusTypes = [];
  state.bonusValuesTb = Array(15).fill(0);
  state.bonusMatrix = Array.from({ length: 5 }, () => Array(3).fill(config.symbols.hidden ?? config.symbols.bonus ?? 11));
  state.bonusMatrixServer = null;
  state.bonusWin = 0;
  state.bonusWinApplied = false;
  state.bonusCollectResolved = false;
  state.bonusRoundIndex = 0;
}

function collectTriggerPositions(config, windowData, symbols) {
  const positions = [];
  for (let col = 0; col < 5; col += 1) {
    for (let row = 0; row < 3; row += 1) {
      if (symbols.includes(windowData[col][row])) {
        positions.push(row * 5 + col);
      }
    }
  }
  return positions;
}

function createForcedBonusTriggerWindow(config) {
  if (config.protocol === "energy") {
    return createForcedEnergyBonusWindow(config);
  }

  const [c1, c2, c3, c4, c5] = spinWindow(config, 1);
  return [
    [config.symbols.bonus, c1[1], config.symbols.bonus],
    [c2[0], config.symbols.bonus, c2[2]],
    [c3[0], c3[1], config.symbols.bonus],
    [config.symbols.jackpot ?? config.symbols.bonus, c4[1], config.symbols.bonus],
    [c5[0], config.symbols.bonus, c5[2]],
  ];
}

function clampRounds(rawValue, fallback) {
  const parsed = Number.parseInt(rawValue ?? "", 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.max(0, Math.min(fallback, parsed));
}

function getTotalBet(config, lineBet) {
  return lineBet * config.lineCount * config.totalBetMultiplier;
}

function getBonusRoundCollectTb(state) {
  return state.bonusPositions.reduce((sum, offset) => sum + (state.bonusValuesTb[offset] ?? 0), 0);
}

function hasCollectSymbol(state) {
  return state.bonusPositions.some((offset) => (state.bonusValuesTb[offset] ?? 0) === 0);
}

function createWindowFromReelSet(config, reelSetId) {
  if (config.defaultShifts?.[reelSetId]) {
    return cloneMatrix(config.defaultShifts[reelSetId]);
  }
  const reelSet = config.reelSets[reelSetId];
  return Object.keys(reelSet)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => takeReelWindow(reelSet[key], 0));
}

function createForcedEnergyBonusWindow(config) {
  const [c1, c2, c3, c4, c5] = spinWindow(config, 1);
  return [
    [config.symbols.collect, c1[1], config.symbols.bonus],
    [config.symbols.bonus, c2[1], c2[2]],
    [c3[0], c3[1], config.symbols.bonus],
    [c4[0], config.symbols.bonus, c4[2]],
    [c5[0], config.symbols.bonus, c5[2]],
  ];
}

function spinWindow(config, reelSetId) {
  const reelSet = config.reelSets[reelSetId];
  return Object.keys(reelSet)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => {
      const reel = reelSet[key];
      const start = randomInt(reel.length);
      return takeReelWindow(reel, start);
    });
}

function pickSpinOutcome(config, state, lineBet) {
  const targetRtp = config.rtp?.target;
  if (!targetRtp) {
    const windowData = spinWindow(config, state.reelSet);
    return { windowData, evaluated: evaluateWindow(config, windowData, lineBet) };
  }

  const candidateCount = Math.max(8, config.rtp?.candidateCount ?? 24);
  const spread = Math.max(0.01, config.rtp?.scoreSpread ?? 0.25);
  const candidates = [];
  const desiredTotalWin = state.totalBet * targetRtp;

  for (let index = 0; index < candidateCount; index += 1) {
    const windowData = spinWindow(config, state.reelSet);
    const evaluated = evaluateWindow(config, windowData, lineBet);
    const projectedWin = state.totalWin + evaluated.totalWin + estimateFeatureValue(config, windowData, lineBet);
    const distance = Math.abs(desiredTotalWin - projectedWin);
    candidates.push({ windowData, evaluated, distance });
  }

  const minDistance = Math.min(...candidates.map((candidate) => candidate.distance));
  const weights = candidates.map((candidate) => {
    const normalizedDistance = (candidate.distance - minDistance) / Math.max(1, lineBet * config.lineCount * config.totalBetMultiplier);
    return Math.exp(-normalizedDistance / spread);
  });

  return weightedPick(candidates, weights);
}

function evaluateWindow(config, windowData, lineBet) {
  let totalWin = 0;
  const wins = [];
  const wild = config.symbols.wild;
  const scatter = config.symbols.scatter ?? config.symbols.bonus;

  config.paylines.forEach((line, lineIndex) => {
    const path = line.map((value) => value - 1);
    const symbols = path.map((row, reelIndex) => windowData[reelIndex][row]);
    let first = symbols[0];
    if (first === wild) {
      first = symbols.find((symbol) => symbol !== wild && symbol !== scatter) ?? wild;
    }
    if (!config.paytable[first]) {
      return;
    }
    let count = 1;
    for (let i = 1; i < symbols.length; i += 1) {
      const symbol = symbols[i];
      if (symbol === first || symbol === wild) count += 1;
      else break;
    }
    const payout = config.paytable[first]?.[count];
    if (!payout) return;
    const cash = payout * lineBet;
    totalWin += cash;
    wins.push({
      line: lineIndex + 1,
      comb: first,
      layout: path.map((row) => row + 1).join(""),
      cash,
      offsets: path.slice(0, count).map((row, reelIndex) => row * 5 + reelIndex).join(","),
      combSymbols: symbols.slice(0, count).join(","),
      multiplier: 1,
    });
  });

  const scatterCount = windowData.flat().filter((symbol) => symbol === scatter).length;
  return { totalWin, wins, scatterCount };
}

function pickRandom(list) {
  return list[randomInt(list.length)];
}

function weightedPick(items, weights) {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  if (!Number.isFinite(totalWeight) || totalWeight <= 0) {
    return items[randomInt(items.length)];
  }

  let cursor = randomInt(1_000_000) / 1_000_000 * totalWeight;
  for (let index = 0; index < items.length; index += 1) {
    cursor -= weights[index];
    if (cursor <= 0) {
      return items[index];
    }
  }
  return items[items.length - 1];
}

function estimateFeatureValue(config, windowData, lineBet) {
  const totalBet = lineBet * config.lineCount * config.totalBetMultiplier;
  let estimatedValue = 0;

  if (config.features.freespins?.triggerSymbol) {
    const scatterCount = windowData.flat().filter((symbol) => symbol === config.features.freespins.triggerSymbol).length;
    if (scatterCount >= config.features.freespins.triggerCount) {
      estimatedValue += totalBet * (config.features.freespins.awardCount * 0.6);
    }
  }

  if (config.features.holdAndSpin?.triggerSymbols?.length) {
    const triggerCount = windowData
      .flat()
      .filter((symbol) => config.features.holdAndSpin.triggerSymbols.includes(symbol))
      .length;
    if (triggerCount >= config.features.holdAndSpin.triggerCount) {
      estimatedValue += totalBet * (config.rtp?.holdAndSpinValueMultiplier ?? 10);
    }
  }

  return estimatedValue;
}

function takeReelWindow(reel, startIndex) {
  const window = [];
  for (let offset = 0; offset < 3; offset += 1) {
    window.push(reel[(startIndex + offset) % reel.length]);
  }
  return window;
}

function cloneMatrix(matrix) {
  return matrix.map((reel) => [...reel]);
}
