export const amaticConfigs = {
  ladyfruits10easter: {
    id: "ladyfruits10easter",
    slug: "ladyfruits10easter",
    name: "Lady Fruits 10 Easter",
    routeBase: "/amatic/ladyfruits10easter",
    wsPath: "/amatic/ladyfruits10easter/ws",
    siteRoot: "slots/amatic/ladyfruits10easter/client",
    sourceIndexFile: "cdn02.cdn.amatic.com/gmsl/mpp/amarent/ladyfruits10easter__920c4970.html",
    htmlAliasPath: "cdn02.cdn.amatic.com/gmsl/mpp/amarent/ladyfruits10easter.html",
    rewritePaths: [
      "cdn02.cdn.amatic.com/gmsl/mpp/amarent/src/config_1411_0021814772.js",
    ],
    defaultQuery: {
      hash: "freeplay",
      curr: "EUR",
      lang: "uk",
      type: "desktop",
      config: "1411",
    },
    replay: {
      loginAck: "9freeplay",
      initFrame: "-10526d117774445553332666955561025666777044483336667770444866677704448666777444555333266695553332666955577744455511126866644455566602226666044455566667a6777444833377731a31555022266677731a3155504448333077731a3144477705558333268725559222555944411172a72911177711166644472a7233386664447a47771118666444022286665553332220111022255572a722682262a62444777055562a621118666444777111777333444077786665a6555333066655562a62333111866655544407770111022227f85553333966611144403334445551113330777555022201113330777844477784442220111066605556231566697770111666222555222444966622277733330030051010101010104271010001a33e80a101010101010100a0a0a110005101010101000000000000000001711121314151a1f21421921e22822d23223c24625025a2642c8312c319031f433e80b101010101010101010101001|96.03%|1359|1041017825#00101010|0#10",
      spinFrames: [
        "-110908fd134f6a4272421e0523e2322421d25d000a1010101010100510101010100b10101a101a101a10101010000000000000000001#101010",
      ],
    },
  },
};

export function getAmaticConfigByPath(pathname) {
  return Object.values(amaticConfigs).find((config) => (
    pathname === config.routeBase
    || pathname === `${config.routeBase}/`
    || pathname === config.wsPath
    || pathname.startsWith(`${config.routeBase}/`)
  )) ?? null;
}

export function getAmaticConfigByWsPath(pathname) {
  return Object.values(amaticConfigs).find((config) => pathname === config.wsPath) ?? null;
}
