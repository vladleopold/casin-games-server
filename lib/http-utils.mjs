import fs from "node:fs";
import { createHash, randomUUID } from "node:crypto";

export function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Request-Id");
}

export function sendXml(res, body) {
  res.writeHead(200, { "Content-Type": "text/xml; charset=utf-8", "Cache-Control": "no-store" });
  res.end(body);
}

export function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(payload));
}

export function sendText(res, status, text) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

export function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((acc, entry) => {
    const [key, ...rest] = entry.trim().split("=");
    if (!key) return acc;
    acc[key] = rest.join("=");
    return acc;
  }, {});
}

export function createRequestContext(req) {
  const requestId = req.headers["x-request-id"] || randomUUID().replaceAll("-", "");
  return {
    requestId,
    startedAt: Date.now(),
  };
}

export async function readBody(req, maxBodyBytes) {
  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBodyBytes) {
        req.destroy();
        reject(Object.assign(new Error("Payload too large"), { statusCode: 413 }));
        return;
      }
      body += chunk.toString();
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

export function writeStructuredLog(event, fields) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), event, ...fields }));
}

export function finalizeRequestLog(req, res, context, fields = {}) {
  writeStructuredLog("request", {
    requestId: context.requestId,
    method: req.method,
    path: context.pathname,
    statusCode: res.statusCode,
    durationMs: Date.now() - context.startedAt,
    ...fields,
  });
}

export function getMimeType(filePath) {
  const ext = filePath.split(".").pop()?.toLowerCase();
  switch (`.${ext ?? ""}`) {
    case ".html": return "text/html; charset=utf-8";
    case ".js": return "application/javascript; charset=utf-8";
    case ".css": return "text/css; charset=utf-8";
    case ".json": return "application/json; charset=utf-8";
    case ".svg": return "image/svg+xml";
    case ".png": return "image/png";
    case ".jpg":
    case ".jpeg": return "image/jpeg";
    case ".gif": return "image/gif";
    case ".woff": return "font/woff";
    case ".woff2": return "font/woff2";
    case ".mp3": return "audio/mpeg";
    case ".avif": return "image/avif";
    default: return "application/octet-stream";
  }
}

export function computeEtag(stats) {
  return createHash("sha1").update(`${stats.size}:${stats.mtimeMs}`).digest("hex");
}

export function streamFileWithCache(req, res, filePath, stats, maxAgeSeconds) {
  const etag = computeEtag(stats);
  const ifNoneMatch = req.headers["if-none-match"];
  const ifModifiedSince = req.headers["if-modified-since"];
  const modifiedAt = stats.mtime.toUTCString();

  if (ifNoneMatch === etag || (ifModifiedSince && new Date(ifModifiedSince).getTime() >= stats.mtime.getTime())) {
    res.writeHead(304, {
      ETag: etag,
      "Last-Modified": modifiedAt,
      "Cache-Control": `public, max-age=${maxAgeSeconds}`,
    });
    res.end();
    return;
  }

  res.writeHead(200, {
    "Content-Type": getMimeType(filePath),
    ETag: etag,
    "Last-Modified": modifiedAt,
    "Cache-Control": `public, max-age=${maxAgeSeconds}`,
  });
  fs.createReadStream(filePath).pipe(res);
}

export class RateLimiter {
  constructor({ windowMs, maxRequests }) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.entries = new Map();
  }

  consume(key) {
    const now = Date.now();
    const entry = this.entries.get(key);
    if (!entry || entry.resetAt <= now) {
      this.entries.set(key, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, remaining: this.maxRequests - 1 };
    }
    if (entry.count >= this.maxRequests) {
      return { allowed: false, retryAfterMs: entry.resetAt - now, remaining: 0 };
    }
    entry.count += 1;
    return { allowed: true, remaining: this.maxRequests - entry.count };
  }

  snapshot() {
    return {
      keys: this.entries.size,
      windowMs: this.windowMs,
      maxRequests: this.maxRequests,
    };
  }
}
