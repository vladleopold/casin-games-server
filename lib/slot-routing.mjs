import path from "node:path";

export function resolveGameByPath(slotConfigs, pathname) {
  return Object.values(slotConfigs).find((config) => (
    pathname === config.enginePath
    || isIndexRequest(config, pathname)
    || config.publicAssetPrefixes.some((prefix) => pathname.startsWith(prefix))
  )) ?? null;
}

export function isIndexRequest(config, pathname) {
  if (config.routeBase) {
    return pathname === config.routeBase || pathname === `${config.routeBase}/` || pathname === config.indexPath;
  }
  return pathname === "/" || pathname === config.indexPath;
}

export function getPhysicalIndexPath(projectRoot, config) {
  return path.join(projectRoot, config.siteRoot, config.sourceIndexFile);
}

export function rewriteIndexHtml(config, html, port) {
  let nextHtml = html
    .replaceAll(config.remoteAssetBase, config.localAssetBase);

  if (config.remoteEngineUrl) {
    nextHtml = nextHtml.replaceAll(config.remoteEngineUrl, `http://127.0.0.1:${port}${config.enginePath}`);
  }

  if (config.id === "wolf") {
    nextHtml = nextHtml.replaceAll('src="/media/js/jquery-1.11.1.min.js"', 'src="/wolf_power_ps/static.xw1n.net/media/js/jquery-1.11.1.min.js"');
  }

  if (config.protocol === "three_oaks") {
    const localBase = `http://127.0.0.1:${port}${config.routeBase}`;
    nextHtml = nextHtml
      .replaceAll('"use_cdn": true', '"use_cdn": false')
      .replaceAll("https://static.3oaks.com/", `${localBase}/static.3oaks.com/`)
      .replaceAll("//static.3oaks.com/", `${localBase}/static.3oaks.com/`)
      .replaceAll("https://betman.c1.3oaks.com/slotscity-prod-axis/", `${localBase}/betman.c1.3oaks.com/slotscity-prod-axis/`)
      .replaceAll("//betman.c1.3oaks.com/slotscity-prod-axis/", `${localBase}/betman.c1.3oaks.com/slotscity-prod-axis/`);
  }

  return nextHtml;
}

export function toStaticRelativePath(config, pathname) {
  if (config.routeBase && pathname.startsWith(`${config.routeBase}/`)) {
    return pathname.slice(config.routeBase.length + 1);
  }
  return pathname.replace(/^\//, "");
}
