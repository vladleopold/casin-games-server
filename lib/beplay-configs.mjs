export const beplayConfigs = {
  "tiger-s-prosperity": {
    game: "tiger-s-prosperity",
    name: "Tiger's Prosperity",
    slotcitySlug: "beplay-tigers-prosperity",
  },
  "koharus-suuuugoi-sweets": {
    game: "koharus-suuuugoi-sweets",
    name: "Koharu’s Suuuugoi Sweets",
    slotcitySlug: "beplay-koharus-suuuugoi-sweets",
  },
};

const internalLaunchParams = [
  "forceAction",
  "forceBet",
];

export function getBeplayConfig(game) {
  return beplayConfigs[game] ?? null;
}

export function buildBeplayLocationParams(config, sourceParams = new URLSearchParams()) {
  const params = new URLSearchParams(sourceParams);
  for (const name of internalLaunchParams) {
    params.delete(name);
  }
  params.set("game", config.game);
  params.set("key", params.get("key") ?? "");
  params.set("language", params.get("language") ?? "uk");
  params.set("operator", params.get("operator") ?? "slotscity");
  params.set("lobbyUrl", params.get("lobbyUrl") ?? "https://slotcity.ua/");
  params.set("currency", params.get("currency") ?? "uah");
  params.set("depositUrl", params.get("depositUrl") ?? `https://slotcity.ua/cashbox?backgameurl=${config.slotcitySlug}`);
  params.set("exitTarget", params.get("exitTarget") ?? "self");
  params.set("channel", params.get("channel") ?? "desktop");
  params.set("rgs", params.get("rgs") ?? "beplay");
  params.set("provider", params.get("provider") ?? "beplay");
  return params;
}

export function buildBeplayLaunchUrl(origin, config) {
  return `${origin}/beplay/location?${buildBeplayLocationParams(config).toString()}`;
}
