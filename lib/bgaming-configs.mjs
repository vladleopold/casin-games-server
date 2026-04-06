export const bgamingConfigs = {
  "gates-of-power": {
    game: "gates-of-power",
    name: "Gates of Power",
    launchUrl: "https://gates-of-power.publishing.bgaming-system.com/?token=d3125fcad73e59736d3ef84118792e6d&options=eyJ0YXJnZXRfZWxlbWVudCI6ImdhbWVfd3JhcHBlciIsImxhdW5jaF9vcHRpb25zIjp7ImdhbWVfbGF1bmNoZXJfdXJsIjoiaHR0cHM6Ly9nYXRlcy1vZi1wb3dlci5wdWJpbnRlcmxheWVyLm9ubGluZT90b2tlbj1kMzEyNWZjYWQ3M2U1OTczNmQzZWY4NDExODc5MmU2ZCIsImdhbWVfdXJsIjoiaHR0cHM6Ly9nYXRlcy1vZi1wb3dlci5wdWJpbnRlcmxheWVyLm9ubGluZT90b2tlbj1kMzEyNWZjYWQ3M2U1OTczNmQzZWY4NDExODc5MmU2ZCIsInN0cmF0ZWd5IjoiaWZyYW1lIn19",
    supportedFeatures: {
      freespins: "enhance",
      bonus: "bonus",
      bonusAndChance: "bns",
    },
  },
};

export function getBgamingConfig(game) {
  return bgamingConfigs[game] ?? null;
}

export function buildBgamingLocationParams(config, sourceParams = new URLSearchParams()) {
  const launchParams = new URL(config.launchUrl).searchParams;
  const params = new URLSearchParams(launchParams);
  for (const [name, value] of sourceParams.entries()) {
    params.set(name, value);
  }
  params.set("game", config.game);
  return params;
}

export function buildBgamingLaunchUrl(origin, config, sourceParams = new URLSearchParams()) {
  return `${origin}/bgaming/location?${buildBgamingLocationParams(config, sourceParams).toString()}`;
}
