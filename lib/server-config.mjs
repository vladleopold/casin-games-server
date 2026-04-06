export const serverConfig = {
  host: process.env.SLOT_SERVER_HOST ?? "127.0.0.1",
  port: Number.parseInt(process.env.SLOT_SERVER_PORT ?? "8080", 10),
  maxBodyBytes: Number.parseInt(process.env.SLOT_SERVER_MAX_BODY_BYTES ?? `${128 * 1024}`, 10),
  keepAliveTimeoutMs: Number.parseInt(process.env.SLOT_SERVER_KEEPALIVE_MS ?? "15000", 10),
  headersTimeoutMs: Number.parseInt(process.env.SLOT_SERVER_HEADERS_TIMEOUT_MS ?? "20000", 10),
  sessionFlushDelayMs: Number.parseInt(process.env.SLOT_SERVER_SESSION_FLUSH_MS ?? "150", 10),
  sessionTtlMs: Number.parseInt(process.env.SLOT_SERVER_SESSION_TTL_MS ?? `${6 * 60 * 60 * 1000}`, 10),
  sessionCleanupMs: Number.parseInt(process.env.SLOT_SERVER_SESSION_CLEANUP_MS ?? `${5 * 60 * 1000}`, 10),
  rateLimitWindowMs: Number.parseInt(process.env.SLOT_SERVER_RATE_LIMIT_WINDOW_MS ?? "1000", 10),
  rateLimitMaxRequests: Number.parseInt(process.env.SLOT_SERVER_RATE_LIMIT_MAX_REQUESTS ?? "30", 10),
  staticMaxAgeSeconds: Number.parseInt(process.env.SLOT_SERVER_STATIC_MAX_AGE ?? "3600", 10),
};
