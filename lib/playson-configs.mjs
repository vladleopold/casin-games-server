export const playsonConfigs = {
  "coin-strike": {
    game: "coin-strike",
    gameId: "coinStrike",
    name: "Coin Strike",
    provider: "playson",
  },
};

export function getPlaysonConfig(game) {
  return playsonConfigs[game] ?? null;
}

export function buildPlaysonLocationParams(config, sourceParams = new URLSearchParams()) {
  const params = new URLSearchParams(sourceParams);
  params.set("game", config.game);
  params.set("provider", params.get("provider") ?? "playson");
  params.set("launchGame", params.get("launchGame") ?? "coin_strike");
  return params;
}

export function buildPlaysonLaunchUrl(origin, config, sourceParams = new URLSearchParams()) {
  return `${origin}/playson/location?${buildPlaysonLocationParams(config, sourceParams).toString()}`;
}
