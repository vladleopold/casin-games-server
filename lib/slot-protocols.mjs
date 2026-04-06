import { createShift, finishBonusIfNeeded, getMode } from "./slot-engine.mjs";

export function renderConnect(config, sessionId, state, rnd) {
  if (config.protocol === "wolf") {
    return `<server command="connect" session="${sessionId}" rnd="${rnd}" status="reconnect"><system guidcreate="${sessionId}"/><extra><stakeIncrement>${config.stakeIncrement}</stakeIncrement><defaultBet>${config.defaultBet}</defaultBet></extra><source server-ver="${sessionId}"/><user currency-id="EUR" is_test="false" type="real" cash_type="real" gs_id="${sessionId}" wlid="" wl_code_id="${sessionId}"/><user_new cash="${state.balance}"/><game name="${config.gameName}"/></server>`;
  }
  return `<server command="connect" session="${sessionId}" rnd="${rnd}" status="ok"><system guidcreate="${sessionId}"/><extra><stakeIncrement>${config.stakeIncrement}</stakeIncrement><defaultBet>${config.defaultBet}</defaultBet></extra><source server-ver="1"/><user currency-id="EUR" is_test="false" type="real" cash_type="real" gs_id="1" wlid="" wl_code_id="1" wlcode="pl_gate"/><user_new cash="${state.balance}"/><game name="${config.gameName}" bonus_spins="${config.features.holdAndSpin?.rounds ?? 0}"/></server>`;
}

export function renderReconnect(config, sessionId, state, rnd) {
  if (config.protocol === "wolf") {
    const shift1 = createShift(config.defaultShifts?.[1] ?? state.lastWindow, 1, config.defaultShiftServers?.[1]);
    const shift2 = createShift(config.defaultShifts?.[2] ?? state.lastWindow, 2, config.defaultShiftServers?.[2]);
    const shiftExt = (config.defaultShifts?.ext ?? [config.defaultShifts?.[2] ?? state.lastWindow])
      .map((windowData, index) => createShift(windowData, 2, config.defaultShiftServers?.ext?.[index]))
      .join("");
    return `<server command="reconnect" session="${sessionId}" rnd="${rnd}" status="ok"><meta balance="0" progress="0"/><source game-ver="301018"/><state current_state="${getMode(state)}"/><config><slot><combinations>${renderCombinations(config)}</combinations><paylines>${renderPaylines(config)}</paylines><symbols>${renderSymbols(config)}</symbols>${renderReels(config)}</slot>${shift1}${shift2}<shift_ext>${shiftExt}</shift_ext></config><game jackpots_tb="${config.jackpotsTb.join(",")}" bonus_spins="${config.features.holdAndSpin.rounds}">${renderWolfGameInner(state)}</game><delivery id="${sessionId}" action="create"/><user_new cash="${state.balance}"/></server>`;
  }
  const currentState = state.bonusActive ? "bonus" : "idle";
  const gameState = state.bonusActive ? "bonus" : "slot";
  const spinStatus = state.bonusActive ? "bet" : "ok";
  const windowShift = createShift(state.bonusActive ? state.bonusMatrix : state.lastWindow, state.reelSet);
  const commandName = state.bonusActive ? "bonus" : "bet";
  const gameXml = `<game usercash="${state.balance}" line-bet="${state.lineBet}" cash-bet="${state.cashBet}" cash-bet-game="${state.cashBet}" cash-win="${state.cashWin}" bonus_games="${state.bonusActive ? state.bonusRoundsLeft : 0}" original_bonus_games="0" dispertion="0" v_wild="0" scatters="${state.scatterCount}" prize_games="0" miniprize_games="0" reel_set="${state.reelSet}" tripple_scatters="1" is_extra_bonus="false" progress_level="5">${renderEnergyBonusNode(state)}</game>`;
  const spinCmdXml = `<spin_cmd command="${commandName}" session="${sessionId}" rnd="${rnd}" status="${spinStatus}"><state current_state="${currentState}"/><window>${windowShift}</window><wins>${renderWins(state.lastWins)}</wins>${gameXml}<user_new cash="${state.balance}"/></spin_cmd>`;
  const gameCmdXml = state.bonusActive
    ? `<game_cmd command="${commandName}" session="${sessionId}" rnd="${rnd}" status="${spinStatus}"><state current_state="${currentState}"/><window>${windowShift}</window><wins>${renderWins(state.lastWins)}</wins>${gameXml}<user_new cash="${state.balance}"/></game_cmd>`
    : "";
  return `<server command="reconnect" session="${sessionId}" rnd="${rnd}" status="ok"><meta balance="${state.balance}" progress="0"/><source game-ver="301018"/><state current_state="${currentState}"/><config><slot><combinations>${renderCombinations(config)}</combinations><paylines>${renderPaylines(config)}</paylines><symbols>${renderSymbols(config)}</symbols>${renderReels(config)}</slot>${createShift(state.lastWindow, 1)}${createShift(state.lastWindow, 2)}</config><game state="${gameState}" progress_level="5" is_extra_bonus="false" bonus_spins="${config.features.holdAndSpin.rounds}" jackpots_tb="25,50,150,5000">${renderEnergyBonusNode(state)}</game><delivery id="${sessionId}" action="create"/>${spinCmdXml}${gameCmdXml}<user_new cash="${state.balance}"/></server>`;
}

export function renderSync(config, sessionId, state, rnd) {
  if (config.protocol === "wolf") {
    const shift1 = createShift(config.defaultShifts?.[1] ?? state.lastWindow, 1, config.defaultShiftServers?.[1]);
    const shift2 = createShift(config.defaultShifts?.[2] ?? state.lastWindow, 2, config.defaultShiftServers?.[2]);
    const shiftExt = (config.defaultShifts?.ext ?? [config.defaultShifts?.[2] ?? state.lastWindow])
      .map((windowData, index) => createShift(windowData, 2, config.defaultShiftServers?.ext?.[index]))
      .join("");
    return `<server command="sync" session="${sessionId}" rnd="${rnd}" status="ok"><meta balance="0" progress="0"/><source game-ver="301018"/><state current_state="${getMode(state)}"/><config><slot><combinations>${renderCombinations(config)}</combinations><paylines>${renderPaylines(config)}</paylines><symbols>${renderSymbols(config)}</symbols>${renderReels(config)}</slot>${shift1}${shift2}<shift_ext>${shiftExt}</shift_ext></config><game jackpots_tb="${config.jackpotsTb.join(",")}" bonus_spins="${config.features.holdAndSpin.rounds}">${renderWolfGameInner(state)}</game><user_new cash="${state.balance}"/></server>`;
  }
  const currentState = state.bonusActive ? "bonus" : "idle";
  return `<server command="sync" session="${sessionId}" rnd="${rnd}" status="ok"><state current_state="${currentState}"/><user_new cash="${state.balance}"/><window>${createShift(state.bonusActive ? state.bonusMatrix : state.lastWindow, state.reelSet)}</window><game state="${state.bonusActive ? "bonus" : "slot"}" progress_level="5" is_extra_bonus="false" bonus_spins="${config.features.holdAndSpin.rounds}" jackpots_tb="25,50,150,5000">${renderEnergyBonusNode(state)}</game></server>`;
}

export function renderSpinLike(config, sessionId, state, rnd, command) {
  if (config.protocol === "wolf") {
    const status = state.pendingBonusTrigger ? "bonus" : "ok";
    const balanceBeforeWin = Math.max(0, state.balance - state.cashWin);
    return `<server command="${command}" session="${sessionId}" rnd="${rnd}" status="${status}"><state current_state="${getModeAfterSpin(state)}"/><window>${createShift(state.lastWindow, state.reelSet, state.lastWindowServer)}</window><wins>${renderWolfWins(state)}</wins><game usercash="${state.balance}" line-bet="${state.lineBet}" cash-bet="${state.cashBet}" cash-bet-game="${state.lineBet * config.lineCount}" cash-win="${state.cashWin}" bonus_games="${state.freespinsActive ? state.freespinsLeft : 0}" original_bonus_games="${state.freespinsTotal}" dispertion="0" v_wild="0" scatters="0" prize_games="0" miniprize_games="0" reel_set="${state.reelSet}" tripple_scatters="1"${state.freespinsActive ? ` choice_wait="0" free-win="${state.freeWin}"` : ""}>${renderWolfGameInner(state)}</game><user_new cash="${balanceBeforeWin}"/></server>`;
  }
  const status = state.pendingBonusTrigger ? "bonus" : "ok";
  return `<spin_cmd command="${command}" session="${sessionId}" rnd="${rnd}" status="${status}"><state current_state="idle"/><window>${createShift(state.lastWindow, state.reelSet)}</window><wins>${renderWins(state.lastWins)}</wins><game usercash="${state.balance}" line-bet="${state.lineBet}" cash-bet="${state.cashBet}" cash-bet-game="${state.cashBet}" cash-win="${state.cashWin}" bonus_games="0" original_bonus_games="0" dispertion="0" v_wild="0" scatters="${state.scatterCount}" prize_games="0" miniprize_games="0" reel_set="${state.reelSet}" tripple_scatters="1" is_extra_bonus="false" progress_level="5">${renderEnergyBonusNode(state)}</game><user_new cash="${state.balance}"/></spin_cmd>`;
}

export function renderBonus(config, sessionId, state, rnd) {
  if (config.protocol === "wolf") {
    const status = state.bonusRoundsLeft > 0 ? "bonus" : "bet";
    const currentState = state.bonusRoundsLeft > 0 ? "bonus" : "idle";
    return `<server command="bonus" session="${sessionId}" rnd="${rnd}" status="${status}"><state current_state="${currentState}"/><user_new cash="${state.balance}"/><bonus bet="${state.lineBet * config.lineCount}" win="${state.bonusWin}" jackpot_win="0" spins_left="${state.bonusRoundsLeft}" bonus_pos="${state.bonusPositions.join(",")}" bonus_tb="${state.bonusPositions.map((offset) => state.bonusValuesTb[offset] ?? 0).join(",")}" bonus_type="${state.bonusTypes.join(",")}"><bonus_window>${createShift(state.bonusMatrix, 1, state.bonusMatrixServer)}</bonus_window></bonus></server>`;
  }
  const status = state.bonusRoundsLeft > 0 ? "bonus" : "bet";
  const currentState = state.bonusRoundsLeft > 0 ? "bonus" : "idle";
  return `<server command="bonus" session="${sessionId}" rnd="${rnd}" status="${status}"><state current_state="${currentState}"/><game state="bonus" progress_level="5" is_extra_bonus="false" bonus_spins="${config.features.holdAndSpin.rounds}" jackpots_tb="25,50,150,5000">${renderEnergyBonusNode(state, false)}</game><game_cmd command="bonus" session="${sessionId}" rnd="${rnd}" status="${status}"><state current_state="${currentState}"/><window>${createShift(state.bonusMatrix, 1)}</window><wins></wins><game usercash="${state.balance}" line-bet="${state.lineBet}" cash-bet="0" cash-bet-game="0" cash-win="${state.cashWin}" bonus_games="${state.bonusRoundsLeft}" original_bonus_games="0" dispertion="0" v_wild="0" scatters="0" prize_games="0" miniprize_games="0" reel_set="1" tripple_scatters="1" is_extra_bonus="false" progress_level="5">${renderEnergyBonusNode(state)}</game><user_new cash="${state.balance}"/></game_cmd><user_new cash="${state.balance}"/></server>`;
}

export function renderErrorSpin(config, sessionId, rnd, command, error) {
  if (config.protocol === "wolf") {
    return `<server command="${command}" session="${sessionId}" rnd="${rnd}" status="error"><message>${escapeXml(error)}</message></server>`;
  }
  return `<spin_cmd command="${command}" session="${sessionId}" rnd="${rnd}" status="wrongbet"><message>${escapeXml(error)}</message></spin_cmd>`;
}

export function renderNoActiveBonus(config, sessionId, rnd) {
  return `<server command="bonus" session="${sessionId}" rnd="${rnd}" status="error"><message>No active bonus</message>${config.protocol === "energy" ? `<game_cmd command="bonus" session="${sessionId}" rnd="${rnd}" status="error"/>` : ""}</server>`;
}

function renderEnergyBonusNode(state, includeShift = true) {
  const bonusData = getRenderedEnergyBonusData(state);
  if (!bonusData.positions.length) return "";
  const shift = includeShift
    ? `<shift reel1="${state.bonusMatrix[0].join(",")}" reel2="${state.bonusMatrix[1].join(",")}" reel3="${state.bonusMatrix[2].join(",")}" reel4="${state.bonusMatrix[3].join(",")}" reel5="${state.bonusMatrix[4].join(",")}"/>`
    : "";
  return `<bonus bonus_pos="${bonusData.positions.join(",")}" bonus_tb="${bonusData.values.join(",")}" bonus_final_tb="${bonusData.finalValues.join(",")}" win="${state.bonusWin}" spins_left="${state.bonusRoundsLeft}" grand_jackpot="false">${shift}</bonus>`;
}

function getRenderedEnergyBonusData(state) {
  const positions = [];
  const values = [];
  const finalValues = [];
  state.bonusPositions.forEach((offset) => {
    const value = state.bonusValuesTb[offset] ?? 0;
    if (state.bonusCollectResolved && value === 0) {
      return;
    }
    positions.push(offset);
    values.push(value);
    finalValues.push(value);
  });
  return { positions, values, finalValues };
}

function renderWolfGameInner(state) {
  if (!state.bonusPositions.length) return "";
  return `<bonus bonus_pos="${state.bonusPositions.join(",")}" bonus_tb="${state.bonusPositions.map((offset) => state.bonusValuesTb[offset] ?? 0).join(",")}" bonus_type="${state.bonusTypes.join(",")}"/>`;
}

function renderWolfWins(state) {
  if (state.pendingFsTrigger) {
    return `<newwin freespins="${state.freespinsTotal}" line="0" layout="03220" comb="freespin" cash="0" offsets="11,7,8"/>`;
  }
  return renderWins(state.lastWins, true);
}

function renderWins(wins) {
  return wins.map((win) => {
    const attrs = [
      `line="${win.line}"`,
      `comb="${win.comb}"`,
      `layout="${win.layout}"`,
      `cash="${win.cash}"`,
      `offsets="${win.offsets}"`,
      `comb_symbols="${win.combSymbols}"`,
      `multiplier="${win.multiplier}"`,
    ];
    return `<win ${attrs.join(" ")}/>`;
  }).join("");
}

function renderCombinations(config) {
  const combinations = Object.entries(config.paytable)
    .flatMap(([symbol, values]) => Object.entries(values).map(([count, coef]) => `<combination symbol="${symbol}" name="${config.symbolTitles[symbol]}" count="${count}" coef="${coef}"/>`))
  if (config.protocol === "wolf" && config.symbols.scatter && config.symbolTitles[config.symbols.scatter]) {
    return combinations.concat(
      [3, 4, 5].map((count) => `<combination symbol="${config.symbols.scatter}" name="${config.symbolTitles[config.symbols.scatter]}" count="${count}" coef="0"/>`)
    ).join("");
  }
  return combinations.join("");
}

function renderPaylines(config) {
  return config.paylines.map((path, index) => `<payline id="${index + 1}" path="${path.join(",")}"/>`).join("");
}

function renderSymbols(config) {
  return Object.entries(config.symbolTitles)
    .map(([id, title]) => `<symbol id="${id}" title="${title}"/>`)
    .join("");
}

function renderReels(config) {
  return Object.entries(config.reelSets)
    .map(([setId, reels]) => {
      const reelXml = Object.entries(reels)
        .map(([id, symbols]) => `<reel id="${id}" length="${symbols.length}" symbols="${symbols.join(",")}"/>`)
        .join("");
      return `<reels id="${setId}">${reelXml}</reels>`;
    })
    .join("");
}

function getModeAfterSpin(state) {
  if (state.pendingBonusTrigger) return "bonus";
  if (state.freespinsActive) return "fs";
  return "idle";
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
