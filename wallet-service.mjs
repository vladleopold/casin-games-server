import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";

import { renderWalletAdminPage, renderWalletRegisterPage } from "./lib/wallet-service-ui.mjs";
import {
  applyCors,
  createRequestContext,
  finalizeRequestLog,
  readBody,
  sendJson,
  sendText,
  writeStructuredLog,
} from "./lib/http-utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HOST = String(process.env.WALLET_SERVICE_HOST ?? "127.0.0.1").trim() || "127.0.0.1";
const PORT = Number.parseInt(String(process.env.PORT ?? process.env.WALLET_SERVICE_PORT ?? "8090"), 10) || 8090;
const MAX_BODY_BYTES = 1_000_000;
const DEFAULT_CURRENCY = String(process.env.WALLET_SERVICE_DEFAULT_CURRENCY ?? "USD").trim().toUpperCase() || "USD";
const DEFAULT_BALANCE_MINOR = normalizeMinorAmount(process.env.WALLET_SERVICE_DEFAULT_BALANCE, 10000);
const DATABASE_URL = String(process.env.WALLET_SERVICE_DATABASE_URL ?? process.env.DATABASE_URL ?? "").trim();
const JSON_STORE_FILE = path.join(__dirname, ".wallet-service-store.json");

async function main() {
  const store = DATABASE_URL
    ? new PostgresWalletStore(DATABASE_URL)
    : new JsonWalletStore(JSON_STORE_FILE);
  await store.init();

  const server = http.createServer(async (req, res) => {
    const context = createRequestContext(req);
    context.pathname = new URL(req.url || "/", `http://${req.headers.host || `${HOST}:${PORT}`}`).pathname;
    applyCors(res);

    try {
      await routeRequest(store, req, res, context);
    } catch (error) {
      const statusCode = Number.isFinite(error?.statusCode) ? error.statusCode : 500;
      sendJson(res, statusCode, {
        error: error?.message ?? "Internal server error",
        requestId: context.requestId,
      });
      finalizeRequestLog(req, res, context, {
        failed: true,
        route: context.route ?? "wallet_service_error",
      });
      writeStructuredLog("wallet_service_error", {
        requestId: context.requestId,
        message: error?.message ?? "Unknown error",
      });
    }
  });

  server.listen(PORT, HOST, () => {
    writeStructuredLog("wallet_service_start", {
      storage: store.kind,
      url: `http://${HOST}:${PORT}`,
    });
    console.log(`Wallet service running at http://${HOST}:${PORT}`);
    console.log(`Register page: http://${HOST}:${PORT}/register`);
    console.log(`Admin page:    http://${HOST}:${PORT}/admin/balances`);
  });
}

async function routeRequest(store, req, res, context) {
  const url = new URL(req.url || "/", `http://${req.headers.host || `${HOST}:${PORT}`}`);
  context.pathname = url.pathname;

  if (req.method === "OPTIONS") {
    res.writeHead(204, { "Cache-Control": "no-store" });
    res.end();
    finalizeRequestLog(req, res, context, { route: "options" });
    return;
  }

  if (url.pathname === "/" || url.pathname === "/register") {
    const html = renderWalletRegisterPage({
      defaultBalanceDisplay: formatMinorMoney(DEFAULT_BALANCE_MINOR, DEFAULT_CURRENCY),
      defaultCurrency: DEFAULT_CURRENCY,
      serviceOrigin: `http://${req.headers.host || `${HOST}:${PORT}`}`,
    });
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(html);
    finalizeRequestLog(req, res, context, { route: "register_page" });
    return;
  }

  if (url.pathname === "/admin" || url.pathname === "/admin/balances") {
    const summary = await store.getSummary();
    const html = renderWalletAdminPage({
      serviceOrigin: `http://${req.headers.host || `${HOST}:${PORT}`}`,
      summary: [
        { label: "Storage", value: summary.storage },
        { label: "Users", value: String(summary.users) },
        { label: "Wallets", value: String(summary.wallets) },
        { label: "Ledger", value: String(summary.ledgerEntries) },
      ],
    });
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(html);
    finalizeRequestLog(req, res, context, { route: "admin_balances_page" });
    return;
  }

  if (url.pathname === "/health") {
    sendJson(res, 200, {
      status: "ok",
      storage: store.kind,
      users: (await store.getSummary()).users,
    });
    finalizeRequestLog(req, res, context, { route: "health" });
    return;
  }

  if (url.pathname === "/api/summary") {
    sendJson(res, 200, await store.getSummary());
    finalizeRequestLog(req, res, context, { route: "api_summary" });
    return;
  }

  if (url.pathname === "/api/users") {
    const users = await store.listUsers({
      limit: url.searchParams.get("limit"),
      query: url.searchParams.get("query"),
    });
    sendJson(res, 200, { users });
    finalizeRequestLog(req, res, context, { route: "api_users" });
    return;
  }

  const userRoute = parseUserRoute(url.pathname);
  if (userRoute) {
    const user = await store.getUserById(userRoute.userId);
    if (!user) {
      throw Object.assign(new Error("User not found"), { statusCode: 404 });
    }
    sendJson(res, 200, { user });
    finalizeRequestLog(req, res, context, { route: "api_user_detail", userId: userRoute.userId });
    return;
  }

  if (url.pathname === "/api/ledger") {
    const entries = await store.listLedger({
      limit: url.searchParams.get("limit"),
      playerId: url.searchParams.get("playerId"),
    });
    sendJson(res, 200, { entries });
    finalizeRequestLog(req, res, context, { route: "api_ledger" });
    return;
  }

  if (url.pathname === "/api/auth/register") {
    if (req.method !== "POST") {
      throw Object.assign(new Error("Method not allowed"), { statusCode: 405 });
    }
    const payload = parseJsonBody(await readBody(req, MAX_BODY_BYTES));
    const user = await store.createUser({
      actor: "registration",
      balanceMinor: normalizeMinorAmount(payload.balance, DEFAULT_BALANCE_MINOR),
      currency: normalizeCurrency(payload.currency, DEFAULT_CURRENCY),
      email: payload.email,
      name: payload.name,
      password: payload.password,
      role: normalizeRole(payload.role),
    });
    sendJson(res, 201, { user });
    finalizeRequestLog(req, res, context, { route: "api_auth_register", userId: user.id });
    return;
  }

  if (url.pathname === "/api/auth/login") {
    if (req.method !== "POST") {
      throw Object.assign(new Error("Method not allowed"), { statusCode: 405 });
    }
    const payload = parseJsonBody(await readBody(req, MAX_BODY_BYTES));
    const user = await store.verifyLogin(payload.email, payload.password);
    sendJson(res, 200, { user });
    finalizeRequestLog(req, res, context, { route: "api_auth_login", userId: user.id });
    return;
  }

  const walletRoute = parseWalletRoute(url.pathname);
  if (walletRoute) {
    if (req.method === "GET") {
      const wallet = await store.getWallet(walletRoute.playerId);
      if (!wallet) {
        throw Object.assign(new Error("Wallet not found"), { statusCode: 404 });
      }
      sendJson(res, 200, { wallet });
      finalizeRequestLog(req, res, context, { route: "wallet_read", playerId: walletRoute.playerId });
      return;
    }

    if (req.method === "POST" && walletRoute.balanceAction) {
      const payload = parseJsonBody(await readBody(req, MAX_BODY_BYTES));
      const action = String(payload.action ?? "set").trim().toLowerCase();
      const amountMinor = resolveWalletAmountMinor(payload);
      if (!["set", "deposit", "withdraw"].includes(action)) {
        throw Object.assign(new Error("Unsupported wallet action"), { statusCode: 400 });
      }
      if (!Number.isFinite(amountMinor)) {
        throw Object.assign(new Error("Amount is required"), { statusCode: 400 });
      }
      const wallet = await store.updateBalance({
        action,
        actor: String(payload.actor ?? "admin").trim() || "admin",
        amountMinor,
        currency: normalizeCurrency(payload.currency, DEFAULT_CURRENCY),
        meta: payload,
        playerId: walletRoute.playerId,
      });
      sendJson(res, 200, { wallet });
      finalizeRequestLog(req, res, context, { route: "wallet_update", playerId: walletRoute.playerId, action });
      return;
    }
  }

  sendText(res, 404, "Not found");
  finalizeRequestLog(req, res, context, { route: "not_found" });
}

function parseUserRoute(pathname) {
  const match = pathname.match(/^\/api\/users\/([^/]+)$/);
  if (!match) return null;
  return { userId: decodeURIComponent(match[1]) };
}

function parseWalletRoute(pathname) {
  const readMatch = pathname.match(/^\/wallets\/([^/]+)$/);
  if (readMatch) {
    return { balanceAction: false, playerId: decodeURIComponent(readMatch[1]) };
  }
  const updateMatch = pathname.match(/^\/wallets\/([^/]+)\/balance$/);
  if (updateMatch) {
    return { balanceAction: true, playerId: decodeURIComponent(updateMatch[1]) };
  }
  return null;
}

function parseJsonBody(body) {
  if (!body || !String(body).trim()) {
    return {};
  }
  try {
    return JSON.parse(String(body));
  } catch {
    throw Object.assign(new Error("Invalid JSON body"), { statusCode: 400 });
  }
}

function normalizeCurrency(value, fallback = DEFAULT_CURRENCY) {
  return String(value ?? fallback).trim().toUpperCase() || fallback;
}

function normalizeRole(value, fallback = "middle") {
  const normalized = String(value ?? fallback).trim().toLowerCase();
  return ["low", "middle", "high"].includes(normalized) ? normalized : fallback;
}

function normalizeMinorAmount(value, fallback = 0) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  if (typeof value === "number" && Number.isInteger(value)) {
    return Math.max(0, value);
  }
  const raw = String(value).trim().replace(",", ".");
  if (/^\d+$/.test(raw)) {
    return Number.parseInt(raw, 10);
  }
  if (/^\d+(?:\.\d{1,2})?$/.test(raw)) {
    return Math.round(Number.parseFloat(raw) * 100);
  }
  return fallback;
}

function resolveWalletAmountMinor(payload) {
  if (payload.amountMinor != null && payload.amountMinor !== "") {
    const parsed = Number.parseInt(String(payload.amountMinor), 10);
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (payload.amountMajor != null && payload.amountMajor !== "") {
    return normalizeMinorAmount(payload.amountMajor, null);
  }
  return normalizeMinorAmount(payload.amount, null);
}

function formatMinorMoney(amountMinor, currency) {
  const amount = normalizeMinorAmount(amountMinor, 0) / 100;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: normalizeCurrency(currency, DEFAULT_CURRENCY),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${normalizeCurrency(currency, DEFAULT_CURRENCY)}`;
  }
}

function formatTimestamp(timestamp) {
  if (!Number.isFinite(timestamp)) {
    return "Never";
  }
  try {
    return new Date(timestamp).toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  } catch {
    return new Date(timestamp).toISOString();
  }
}

function assertEmail(value) {
  const email = String(value ?? "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw Object.assign(new Error("Valid email is required"), { statusCode: 400 });
  }
  return email;
}

function assertName(value) {
  const name = String(value ?? "").trim();
  if (!name) {
    throw Object.assign(new Error("Name is required"), { statusCode: 400 });
  }
  return name;
}

function assertPassword(value) {
  const password = String(value ?? "");
  if (password.length < 8) {
    throw Object.assign(new Error("Password must be at least 8 characters"), { statusCode: 400 });
  }
  return password;
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPassword(password, passwordHash) {
  const [salt, existingHash] = String(passwordHash ?? "").split(":");
  if (!salt || !existingHash) {
    return false;
  }
  const nextHash = scryptSync(password, salt, 64).toString("hex");
  const left = Buffer.from(existingHash, "hex");
  const right = Buffer.from(nextHash, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

function serializeUser(user) {
  return {
    balance: user.balance,
    balanceDisplay: formatMinorMoney(user.balance, user.currency),
    createdAt: user.createdAt,
    currency: normalizeCurrency(user.currency, DEFAULT_CURRENCY),
    email: user.email,
    id: user.id,
    name: user.name,
    role: normalizeRole(user.role),
    status: user.status ?? "active",
    updatedAt: user.updatedAt,
    updatedAtLabel: formatTimestamp(user.updatedAt),
  };
}

function serializeWallet(user) {
  return {
    balance: user.balance,
    balanceDisplay: formatMinorMoney(user.balance, user.currency),
    currency: normalizeCurrency(user.currency, DEFAULT_CURRENCY),
    playerId: user.id,
  };
}

function serializeLedgerEntry(entry) {
  return {
    action: entry.action,
    actor: entry.actor,
    amount: entry.amount,
    amountDisplay: formatMinorMoney(entry.amount, entry.currency),
    balanceAfter: entry.balanceAfter,
    balanceAfterDisplay: formatMinorMoney(entry.balanceAfter, entry.currency),
    createdAt: entry.createdAt,
    createdAtLabel: formatTimestamp(entry.createdAt),
    currency: normalizeCurrency(entry.currency, DEFAULT_CURRENCY),
    id: entry.id,
    playerId: entry.playerId,
  };
}

class JsonWalletStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.kind = "json";
    this.state = {
      ledger: [],
      users: {},
    };
  }

  async init() {
    if (!fs.existsSync(this.filePath)) {
      return;
    }
    const raw = fs.readFileSync(this.filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      this.state.users = parsed.users && typeof parsed.users === "object" ? parsed.users : {};
      this.state.ledger = Array.isArray(parsed.ledger) ? parsed.ledger : [];
    }
  }

  async getSummary() {
    return {
      ledgerEntries: this.state.ledger.length,
      storage: this.kind,
      users: Object.keys(this.state.users).length,
      wallets: Object.keys(this.state.users).length,
    };
  }

  persist() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.state, null, 2));
  }

  async listUsers({ query, limit }) {
    const search = String(query ?? "").trim().toLowerCase();
    const resolvedLimit = sanitizeLimit(limit, 100);
    return Object.values(this.state.users)
      .filter((user) => (
        !search
        || user.email.toLowerCase().includes(search)
        || user.name.toLowerCase().includes(search)
        || user.id.toLowerCase().includes(search)
      ))
      .sort((left, right) => right.updatedAt - left.updatedAt)
      .slice(0, resolvedLimit)
      .map(serializeUser);
  }

  async getUserById(userId) {
    const user = this.state.users[userId];
    return user ? serializeUser(user) : null;
  }

  findUserByEmail(email) {
    return Object.values(this.state.users).find((user) => user.email === email) ?? null;
  }

  async createUser({ actor, balanceMinor, currency, email, name, password, role }) {
    const normalizedEmail = assertEmail(email);
    if (this.findUserByEmail(normalizedEmail)) {
      throw Object.assign(new Error("User with this email already exists"), { statusCode: 409 });
    }
    const now = Date.now();
    const user = {
      balance: normalizeMinorAmount(balanceMinor, DEFAULT_BALANCE_MINOR),
      createdAt: now,
      currency: normalizeCurrency(currency, DEFAULT_CURRENCY),
      email: normalizedEmail,
      id: randomUUID(),
      name: assertName(name),
      passwordHash: hashPassword(assertPassword(password)),
      role: normalizeRole(role),
      status: "active",
      updatedAt: now,
    };
    this.state.users[user.id] = user;
    this.state.ledger.unshift({
      action: "register",
      actor: actor ?? "registration",
      amount: user.balance,
      balanceAfter: user.balance,
      createdAt: now,
      currency: user.currency,
      id: randomUUID(),
      playerId: user.id,
    });
    this.persist();
    return serializeUser(user);
  }

  async verifyLogin(email, password) {
    const user = this.findUserByEmail(assertEmail(email));
    if (!user || !verifyPassword(String(password ?? ""), user.passwordHash)) {
      throw Object.assign(new Error("Invalid email or password"), { statusCode: 401 });
    }
    return serializeUser(user);
  }

  async getWallet(playerId) {
    const user = this.state.users[playerId];
    return user ? serializeWallet(user) : null;
  }

  async updateBalance({ action, actor, amountMinor, currency, playerId }) {
    const user = this.state.users[playerId];
    if (!user) {
      throw Object.assign(new Error("Wallet not found"), { statusCode: 404 });
    }
    const nextBalance = calculateNextBalance(user.balance, action, amountMinor);
    const now = Date.now();
    user.balance = nextBalance;
    user.currency = normalizeCurrency(currency || user.currency, user.currency);
    user.updatedAt = now;
    this.state.ledger.unshift({
      action,
      actor: actor ?? "admin",
      amount: normalizeMinorAmount(amountMinor, 0),
      balanceAfter: user.balance,
      createdAt: now,
      currency: user.currency,
      id: randomUUID(),
      playerId,
    });
    this.persist();
    return serializeWallet(user);
  }

  async listLedger({ limit, playerId }) {
    const resolvedLimit = sanitizeLimit(limit, 100);
    return this.state.ledger
      .filter((entry) => !playerId || entry.playerId === playerId)
      .slice(0, resolvedLimit)
      .map(serializeLedgerEntry);
  }
}

class PostgresWalletStore {
  constructor(connectionString) {
    this.pool = new Pool({ connectionString });
    this.kind = "postgres";
  }

  async init() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS site_users (
        id text PRIMARY KEY,
        email text UNIQUE NOT NULL,
        name text NOT NULL,
        password_hash text NOT NULL,
        currency text NOT NULL,
        balance integer NOT NULL,
        role text NOT NULL,
        status text NOT NULL,
        created_at bigint NOT NULL,
        updated_at bigint NOT NULL
      );
    `);
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS wallet_ledger (
        id text PRIMARY KEY,
        player_id text NOT NULL REFERENCES site_users(id) ON DELETE CASCADE,
        action text NOT NULL,
        amount integer NOT NULL,
        balance_after integer NOT NULL,
        currency text NOT NULL,
        actor text NOT NULL,
        created_at bigint NOT NULL
      );
    `);
    await this.pool.query(`CREATE INDEX IF NOT EXISTS site_users_updated_at_idx ON site_users(updated_at DESC);`);
    await this.pool.query(`CREATE INDEX IF NOT EXISTS wallet_ledger_created_at_idx ON wallet_ledger(created_at DESC);`);
  }

  async getSummary() {
    const usersResult = await this.pool.query(`SELECT COUNT(*)::int AS count FROM site_users;`);
    const ledgerResult = await this.pool.query(`SELECT COUNT(*)::int AS count FROM wallet_ledger;`);
    const users = usersResult.rows[0]?.count ?? 0;
    return {
      ledgerEntries: ledgerResult.rows[0]?.count ?? 0,
      storage: this.kind,
      users,
      wallets: users,
    };
  }

  async listUsers({ query, limit }) {
    const search = String(query ?? "").trim();
    const resolvedLimit = sanitizeLimit(limit, 100);
    const params = [];
    let whereClause = "";
    if (search) {
      params.push(`%${search}%`);
      whereClause = `
        WHERE id ILIKE $1
          OR email ILIKE $1
          OR name ILIKE $1
      `;
    }
    params.push(resolvedLimit);
    const limitParam = `$${params.length}`;
    const result = await this.pool.query(`
      SELECT id, email, name, currency, balance, role, status, created_at, updated_at
      FROM site_users
      ${whereClause}
      ORDER BY updated_at DESC
      LIMIT ${limitParam};
    `, params);
    return result.rows.map((row) => serializeUser(pgUserRowToUser(row)));
  }

  async getUserById(userId) {
    const result = await this.pool.query(`
      SELECT id, email, name, currency, balance, role, status, created_at, updated_at
      FROM site_users
      WHERE id = $1
      LIMIT 1;
    `, [userId]);
    const row = result.rows[0];
    return row ? serializeUser(pgUserRowToUser(row)) : null;
  }

  async getUserRowByEmail(email) {
    const result = await this.pool.query(`
      SELECT *
      FROM site_users
      WHERE email = $1
      LIMIT 1;
    `, [email]);
    return result.rows[0] ?? null;
  }

  async createUser({ actor, balanceMinor, currency, email, name, password, role }) {
    const normalizedEmail = assertEmail(email);
    if (await this.getUserRowByEmail(normalizedEmail)) {
      throw Object.assign(new Error("User with this email already exists"), { statusCode: 409 });
    }
    const now = Date.now();
    const id = randomUUID();
    const user = {
      balance: normalizeMinorAmount(balanceMinor, DEFAULT_BALANCE_MINOR),
      createdAt: now,
      currency: normalizeCurrency(currency, DEFAULT_CURRENCY),
      email: normalizedEmail,
      id,
      name: assertName(name),
      passwordHash: hashPassword(assertPassword(password)),
      role: normalizeRole(role),
      status: "active",
      updatedAt: now,
    };
    await this.pool.query(`
      INSERT INTO site_users (id, email, name, password_hash, currency, balance, role, status, created_at, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);
    `, [user.id, user.email, user.name, user.passwordHash, user.currency, user.balance, user.role, user.status, user.createdAt, user.updatedAt]);
    await this.pool.query(`
      INSERT INTO wallet_ledger (id, player_id, action, amount, balance_after, currency, actor, created_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8);
    `, [randomUUID(), user.id, "register", user.balance, user.balance, user.currency, actor ?? "registration", now]);
    return serializeUser(user);
  }

  async verifyLogin(email, password) {
    const row = await this.getUserRowByEmail(assertEmail(email));
    if (!row || !verifyPassword(String(password ?? ""), row.password_hash)) {
      throw Object.assign(new Error("Invalid email or password"), { statusCode: 401 });
    }
    return serializeUser(pgUserRowToUser(row));
  }

  async getWallet(playerId) {
    const row = await this.pool.query(`
      SELECT id, currency, balance
      FROM site_users
      WHERE id = $1
      LIMIT 1;
    `, [playerId]);
    const user = row.rows[0];
    return user ? serializeWallet({
      id: user.id,
      currency: user.currency,
      balance: user.balance,
    }) : null;
  }

  async updateBalance({ action, actor, amountMinor, currency, playerId }) {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const userResult = await client.query(`
        SELECT *
        FROM site_users
        WHERE id = $1
        FOR UPDATE;
      `, [playerId]);
      const row = userResult.rows[0];
      if (!row) {
        throw Object.assign(new Error("Wallet not found"), { statusCode: 404 });
      }
      const nextBalance = calculateNextBalance(row.balance, action, amountMinor);
      const nextCurrency = normalizeCurrency(currency || row.currency, row.currency);
      const now = Date.now();
      await client.query(`
        UPDATE site_users
        SET balance = $2, currency = $3, updated_at = $4
        WHERE id = $1;
      `, [playerId, nextBalance, nextCurrency, now]);
      await client.query(`
        INSERT INTO wallet_ledger (id, player_id, action, amount, balance_after, currency, actor, created_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8);
      `, [randomUUID(), playerId, action, normalizeMinorAmount(amountMinor, 0), nextBalance, nextCurrency, actor ?? "admin", now]);
      await client.query("COMMIT");
      return serializeWallet({
        id: playerId,
        balance: nextBalance,
        currency: nextCurrency,
      });
    } catch (error) {
      await client.query("ROLLBACK").catch(() => {});
      throw error;
    } finally {
      client.release();
    }
  }

  async listLedger({ limit, playerId }) {
    const resolvedLimit = sanitizeLimit(limit, 100);
    const params = [];
    let whereClause = "";
    if (playerId) {
      params.push(playerId);
      whereClause = `WHERE player_id = $1`;
    }
    params.push(resolvedLimit);
    const limitParam = `$${params.length}`;
    const result = await this.pool.query(`
      SELECT id, player_id, action, amount, balance_after, currency, actor, created_at
      FROM wallet_ledger
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ${limitParam};
    `, params);
    return result.rows.map((row) => serializeLedgerEntry({
      action: row.action,
      actor: row.actor,
      amount: row.amount,
      balanceAfter: row.balance_after,
      createdAt: Number(row.created_at),
      currency: row.currency,
      id: row.id,
      playerId: row.player_id,
    }));
  }
}

function pgUserRowToUser(row) {
  return {
    balance: Number(row.balance),
    createdAt: Number(row.created_at),
    currency: row.currency,
    email: row.email,
    id: row.id,
    name: row.name,
    passwordHash: row.password_hash,
    role: row.role,
    status: row.status,
    updatedAt: Number(row.updated_at),
  };
}

function sanitizeLimit(value, fallback = 100) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.min(parsed, 500);
}

function calculateNextBalance(currentBalance, action, amountMinor) {
  const normalizedAmount = normalizeMinorAmount(amountMinor, 0);
  const current = normalizeMinorAmount(currentBalance, 0);
  if (action === "set") {
    return normalizedAmount;
  }
  if (action === "deposit") {
    return current + normalizedAmount;
  }
  if (action === "withdraw") {
    if (normalizedAmount > current) {
      throw Object.assign(new Error("Withdrawal exceeds current balance"), { statusCode: 400 });
    }
    return current - normalizedAmount;
  }
  throw Object.assign(new Error("Unsupported wallet action"), { statusCode: 400 });
}

main().catch((error) => {
  writeStructuredLog("wallet_service_boot_failed", {
    message: error?.message ?? "Unknown error",
  });
  console.error(error);
  process.exitCode = 1;
});
