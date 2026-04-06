const SLOTCITY_ORIGIN = "https://slotcity.ua";
export const THREE_OAKS_PROVIDER_ORIGIN = "https://betman.c1.3oaks.com";
const THREE_OAKS_PRODUCT_TOKEN = process.env.THREE_OAKS_PRODUCT_TOKEN?.trim() || "money-token";
const DEFAULT_HEADERS = {
  accept: "application/json, text/plain, */*",
  "user-agent": "Mozilla/5.0 Codex slot bridge",
};
const THREE_OAKS_EARLY_CLIENT_PATCH = String.raw`<script>
(() => {
  const SAFARI_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15";
  const NAVIGATOR_OVERRIDES = {
    appVersion: SAFARI_UA,
    platform: "MacIntel",
    userAgent: SAFARI_UA,
    vendor: "Apple Computer, Inc.",
    maxTouchPoints: 5,
  };
  const MODAL_HINTS = [
    "safari 13.0+",
    "catalina",
    "не оптимізовано",
    "not optimized",
  ];

  const setReadonlyValue = (target, key, value) => {
    try {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: true,
        get: () => value,
      });
    } catch {}
  };

  for (const [key, value] of Object.entries(NAVIGATOR_OVERRIDES)) {
    setReadonlyValue(window.navigator, key, value);
  }
  setReadonlyValue(window.navigator, "userAgentData", undefined);
  try {
    window.safari ??= { pushNotification: {} };
  } catch {}

  const normalizeText = (value) => String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
  const isCompatibilityModal = (element) => {
    const text = normalizeText(element?.innerText || element?.textContent);
    return text && MODAL_HINTS.every((hint) => text.includes(hint) || !["safari 13.0+", "catalina"].includes(hint)) && (text.includes("safari 13.0+") || text.includes("catalina")) && text.includes("не оптимізовано");
  };

  const dismissCompatibilityModal = () => {
    const roots = Array.from(document.querySelectorAll("body *"));
    for (const root of roots) {
      if (!isCompatibilityModal(root)) {
        continue;
      }

      const buttons = Array.from(root.querySelectorAll("button, [role='button'], div, span, a"));
      const okButton = buttons.find((candidate) => normalizeText(candidate.innerText || candidate.textContent) === "ok");
      if (okButton) {
        okButton.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
        okButton.click?.();
      }
      if (root instanceof HTMLElement) {
        root.style.display = "none";
        root.style.pointerEvents = "none";
      }
    }
  };

  const installDismissWatcher = () => {
    dismissCompatibilityModal();
    const observer = new MutationObserver(() => dismissCompatibilityModal());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setInterval(dismissCompatibilityModal, 500);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installDismissWatcher, { once: true });
  } else {
    installDismissWatcher();
  }
})();
</script>`;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function createHttpError(message, statusCode) {
  return Object.assign(new Error(message), { statusCode });
}

function applyTemplate(template, slug) {
  return String(template)
    .replaceAll("{slug}", encodeURIComponent(slug))
    .replaceAll("{slug_raw}", slug);
}

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(String(value ?? "").trim());
}

function isProviderGameUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.hostname === "betman.c1.3oaks.com" && parsed.pathname.startsWith("/slotscity-prod-axis/game/");
  } catch {
    return false;
  }
}

function parseJsonObject(value, envName) {
  if (!value) {
    return {};
  }

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    throw createHttpError(`${envName} must be valid JSON object`, 500);
  }
}

export async function resolveSlotCityThreeOaksLaunch(slug) {
  const normalizedSlug = String(slug ?? "").trim();
  if (!normalizedSlug) {
    throw createHttpError("3 Oaks slug is required", 400);
  }

  const demoUrl = new URL("/apiv2/games/demo", SLOTCITY_ORIGIN);
  demoUrl.searchParams.set("term", normalizedSlug);
  demoUrl.searchParams.set("language", "uk");
  demoUrl.searchParams.set("check_limits", "1");
  demoUrl.searchParams.set("version", "desktop");

  const demoResponse = await fetch(demoUrl, { headers: DEFAULT_HEADERS });
  if (!demoResponse.ok) {
    throw createHttpError(`SlotCity demo lookup failed with ${demoResponse.status}`, 502);
  }

  const payload = await demoResponse.json();
  if (!payload?.status || !payload?.url) {
    throw createHttpError("SlotCity did not return a demo URL for this slug", 404);
  }
  if (payload.providerTerm !== "threeoaks") {
    throw createHttpError(`Game ${normalizedSlug} is not a 3 Oaks title`, 400);
  }

  const upstreamResponse = await fetch(payload.url, {
    headers: {
      ...DEFAULT_HEADERS,
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    redirect: "follow",
  });

  if (!upstreamResponse.ok) {
    throw createHttpError(`3 Oaks launch resolve failed with ${upstreamResponse.status}`, 502);
  }

  return {
    slug: normalizedSlug,
    gameName: payload.name ?? normalizedSlug,
    launchUrl: payload.url,
    providerUrl: upstreamResponse.url,
  };
}

export async function resolveThreeOaksProductLaunch(slug) {
  const normalizedSlug = String(slug ?? "").trim();
  if (!normalizedSlug) {
    throw createHttpError("3 Oaks slug is required", 400);
  }

  const directTemplate = process.env.THREE_OAKS_PRODUCT_LAUNCH_URL_TEMPLATE?.trim();
  if (directTemplate) {
    const providerUrl = applyTemplate(directTemplate, normalizedSlug);
    if (!isAbsoluteUrl(providerUrl)) {
      throw createHttpError("THREE_OAKS_PRODUCT_LAUNCH_URL_TEMPLATE must resolve to absolute URL", 500);
    }
    return {
      slug: normalizedSlug,
      gameName: normalizedSlug,
      launchUrl: providerUrl,
      providerUrl,
      resolverMode: "direct_template",
    };
  }

  const resolverTemplate = process.env.THREE_OAKS_PRODUCT_RESOLVER_URL_TEMPLATE?.trim();
  if (!resolverTemplate) {
    throw createHttpError(
      "Missing THREE_OAKS_PRODUCT_LAUNCH_URL_TEMPLATE or THREE_OAKS_PRODUCT_RESOLVER_URL_TEMPLATE for product mode",
      500,
    );
  }

  const resolverUrl = applyTemplate(resolverTemplate, normalizedSlug);
  const method = (process.env.THREE_OAKS_PRODUCT_RESOLVER_METHOD ?? "GET").toUpperCase();
  const headers = {
    ...DEFAULT_HEADERS,
    ...parseJsonObject(process.env.THREE_OAKS_PRODUCT_RESOLVER_HEADERS_JSON, "THREE_OAKS_PRODUCT_RESOLVER_HEADERS_JSON"),
  };
  const bodyTemplate = process.env.THREE_OAKS_PRODUCT_RESOLVER_BODY_TEMPLATE ?? "";
  const body = bodyTemplate ? applyTemplate(bodyTemplate, normalizedSlug) : undefined;

  const response = await fetch(resolverUrl, {
    method,
    headers,
    body: method === "GET" || method === "HEAD" ? undefined : body,
    redirect: "follow",
  });

  if (!response.ok) {
    throw createHttpError(`3 Oaks product launch resolver failed with ${response.status}`, 502);
  }

  if (isProviderGameUrl(response.url)) {
    return {
      slug: normalizedSlug,
      gameName: normalizedSlug,
      launchUrl: resolverUrl,
      providerUrl: response.url,
      resolverMode: "resolver_redirect",
    };
  }

  const contentType = response.headers.get("content-type") ?? "";
  const payloadText = await response.text();

  if (isAbsoluteUrl(payloadText.trim())) {
    return {
      slug: normalizedSlug,
      gameName: normalizedSlug,
      launchUrl: resolverUrl,
      providerUrl: payloadText.trim(),
      resolverMode: "resolver_text",
    };
  }

  if (contentType.includes("application/json") || payloadText.trim().startsWith("{")) {
    try {
      const payload = JSON.parse(payloadText);
      const providerUrl = payload?.providerUrl ?? payload?.launchUrl ?? payload?.url ?? payload?.data?.providerUrl ?? payload?.data?.launchUrl ?? payload?.data?.url;
      if (!isAbsoluteUrl(providerUrl)) {
        throw new Error("missing url");
      }
      return {
        slug: normalizedSlug,
        gameName: payload?.gameName ?? payload?.name ?? normalizedSlug,
        launchUrl: resolverUrl,
        providerUrl,
        resolverMode: "resolver_json",
      };
    } catch {
      throw createHttpError("3 Oaks product launch resolver returned JSON without providerUrl/url/launchUrl", 502);
    }
  }

  throw createHttpError("3 Oaks product launch resolver did not return a usable provider launch URL", 502);
}

export function renderThreeOaksWrapper({ gameName, providerUrl }) {
  const safeTitle = escapeHtml(gameName);
  const safeProviderUrl = escapeHtml(providerUrl);

  return `<!doctype html>
<html lang="uk">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${safeTitle}</title>
    <style>
      :root {
        color-scheme: dark;
        background: #05070b;
      }

      html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        background: #05070b;
        overflow: hidden;
      }

      body {
        display: grid;
      }

      iframe {
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
        background: #05070b;
      }
    </style>
  </head>
  <body>
    <iframe
      src="${safeProviderUrl}"
      title="${safeTitle}"
      allow="autoplay; fullscreen"
      allowfullscreen
      referrerpolicy="no-referrer"
    ></iframe>
  </body>
</html>`;
}

export function buildThreeOaksProxyBase(host, mode, slug) {
  const transportSegment = mode === "product" ? "api" : "proxy";
  return `http://${host}/three-oaks/${encodeURIComponent(mode)}/${encodeURIComponent(slug)}/${transportSegment}`;
}

export function rewriteThreeOaksHtml(html, host, mode, slug) {
  const proxyBase = buildThreeOaksProxyBase(host, mode, slug);
  let nextHtml = html
    .replaceAll("https://betman.c1.3oaks.com/slotscity-prod-axis/", `${proxyBase}/slotscity-prod-axis/`)
    .replaceAll("//betman.c1.3oaks.com/slotscity-prod-axis/", `${proxyBase}/slotscity-prod-axis/`)
    .replaceAll('"/static/games/cdn_measure.png"', `"${THREE_OAKS_PROVIDER_ORIGIN}/static/games/cdn_measure.png"`);

  if (!nextHtml.includes("SAFARI_UA") && nextHtml.includes("<body>")) {
    nextHtml = nextHtml.replace("<body>", `<body>\n${THREE_OAKS_EARLY_CLIENT_PATCH}\n`);
  }

  if (mode === "product") {
    nextHtml = nextHtml
      .replaceAll('"token": "testtoken"', `"token": "${THREE_OAKS_PRODUCT_TOKEN}"`)
      .replaceAll('"wl": "demo"', '"wl": "money"')
      .replaceAll("/demo/", "/money/");
  }

  return nextHtml;
}
