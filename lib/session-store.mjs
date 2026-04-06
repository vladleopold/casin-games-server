import fsp from "node:fs/promises";
import path from "node:path";

import { normalizeState } from "./slot-engine.mjs";

export class SessionStore {
  constructor(config, rootDir, options) {
    this.config = config;
    this.file = path.join(rootDir, config.sessionFile);
    this.sessions = new Map();
    this.flushTimer = null;
    this.flushPromise = null;
    this.flushDelayMs = options.flushDelayMs;
    this.sessionTtlMs = options.sessionTtlMs;
    this.cleanupTimer = setInterval(() => {
      this.pruneExpired();
    }, options.sessionCleanupMs);
    this.cleanupTimer.unref?.();
  }

  async load() {
    try {
      const raw = await fsp.readFile(this.file, "utf8");
      this.sessions = new Map(
        JSON.parse(raw).map(([id, entry]) => {
          const record = normalizeEntry(entry);
          return [id, { ...record, state: normalizeState(this.config, record.state) }];
        })
      );
    } catch {
      this.sessions = new Map();
    }
  }

  has(sessionId) {
    return this.sessions.has(sessionId);
  }

  get(sessionId) {
    this.touch(sessionId);
    return this.sessions.get(sessionId)?.state;
  }

  upsert(sessionId, state) {
    this.sessions.set(sessionId, { state, updatedAt: Date.now() });
    this.scheduleFlush();
  }

  touch(sessionId) {
    const entry = this.sessions.get(sessionId);
    if (!entry) return;
    entry.updatedAt = Date.now();
  }

  pruneExpired(now = Date.now()) {
    let removed = 0;
    for (const [sessionId, entry] of this.sessions.entries()) {
      if (entry.updatedAt + this.sessionTtlMs < now) {
        this.sessions.delete(sessionId);
        removed += 1;
      }
    }
    if (removed > 0) {
      this.scheduleFlush();
    }
    return removed;
  }

  scheduleFlush() {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
    }
    this.flushTimer = setTimeout(() => {
      this.flushTimer = null;
      this.flushNow().catch((error) => {
        console.error(`Failed to persist sessions for ${this.config.id}:`, error);
      });
    }, this.flushDelayMs);
  }

  async flushNow() {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    if (this.flushPromise) {
      return this.flushPromise;
    }

    const tempFile = `${this.file}.tmp`;
    const payload = JSON.stringify(
      [...this.sessions.entries()].map(([id, entry]) => [id, entry])
    );

    this.flushPromise = (async () => {
      await fsp.writeFile(tempFile, payload);
      await fsp.rename(tempFile, this.file);
    })().finally(() => {
      this.flushPromise = null;
    });

    return this.flushPromise;
  }

  snapshot() {
    return {
      gameId: this.config.id,
      count: this.sessions.size,
      sessionFile: path.basename(this.file),
      sessions: [...this.sessions.entries()].map(([id, entry]) => ({
        id,
        updatedAt: entry.updatedAt,
        mode: entry.state.bonusActive ? "bonus" : entry.state.freespinsActive ? "fs" : "idle",
        balance: entry.state.balance,
      })),
    };
  }

  inspect(sessionId) {
    const entry = this.sessions.get(sessionId);
    if (!entry) {
      return null;
    }

    return {
      id: sessionId,
      updatedAt: entry.updatedAt,
      mode: entry.state.bonusActive ? "bonus" : entry.state.freespinsActive ? "fs" : "idle",
      balance: entry.state.balance,
      totalBet: entry.state.totalBet,
      totalWin: entry.state.totalWin,
      state: structuredClone(entry.state),
    };
  }

  dispose() {
    clearInterval(this.cleanupTimer);
  }
}

function normalizeEntry(entry) {
  if (entry && typeof entry === "object" && "state" in entry) {
    return {
      state: entry.state,
      updatedAt: Number.isFinite(entry.updatedAt) ? entry.updatedAt : Date.now(),
    };
  }
  return { state: entry, updatedAt: Date.now() };
}
