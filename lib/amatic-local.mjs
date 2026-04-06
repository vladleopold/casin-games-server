import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

import { getMimeType, streamFileWithCache } from "./http-utils.mjs";

const WEBSOCKET_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

export function listAmaticGames(amaticConfigs) {
  return Object.values(amaticConfigs).map((config) => ({
    id: config.id,
    slug: config.slug,
    name: config.name,
    routeBase: config.routeBase,
    wsPath: config.wsPath,
  }));
}

export function isAmaticIndexRequest(config, pathname) {
  return pathname === config.routeBase || pathname === `${config.routeBase}/`;
}

export function buildAmaticLaunchLocation(config, url) {
  const target = new URL(`${config.routeBase}/${config.htmlAliasPath}`, "http://local.test");
  for (const [key, value] of Object.entries(config.defaultQuery)) {
    target.searchParams.set(key, url.searchParams.get(key) ?? value);
  }

  for (const [key, value] of url.searchParams.entries()) {
    if (!target.searchParams.has(key)) {
      target.searchParams.set(key, value);
    }
  }

  return `${target.pathname}?${target.searchParams.toString()}`;
}

export async function serveAmaticIndex(config, req, res, url) {
  const location = buildAmaticLaunchLocation(config, url);
  res.writeHead(302, {
    Location: location,
    "Cache-Control": "no-store",
  });
  res.end();
}

export async function serveAmaticStatic(config, req, pathname, res, projectRoot, maxAgeSeconds) {
  const relativePath = pathname.startsWith(`${config.routeBase}/`)
    ? pathname.slice(config.routeBase.length + 1)
    : "";
  const localRelativePath = relativePath === config.htmlAliasPath
    ? config.sourceIndexFile
    : relativePath;

  const filePath = path.join(projectRoot, config.siteRoot, localRelativePath);
  const normalizedPath = path.normalize(filePath);
  const rootPath = path.join(projectRoot, config.siteRoot);

  if (!normalizedPath.startsWith(rootPath)) {
    return false;
  }

  const stats = await fs.promises.stat(normalizedPath).catch(() => null);
  if (!stats?.isFile()) {
    return false;
  }

  if (config.rewritePaths.includes(localRelativePath)) {
    const source = await fs.promises.readFile(normalizedPath, "utf8");
    const rewritten = rewriteAmaticTextAsset(config, source);
    res.writeHead(200, {
      "Content-Type": getMimeType(normalizedPath),
      "Cache-Control": `public, max-age=${maxAgeSeconds}`,
      ETag: createHash("sha1").update(rewritten).digest("hex"),
    });
    res.end(rewritten);
    return true;
  }

  streamFileWithCache(req, res, normalizedPath, stats, maxAgeSeconds);
  return true;
}

function rewriteAmaticTextAsset(config, source) {
  return source
    .replace(
      /this\.value6\s*=\s*"[^"]+";/,
      `this.value6 = ((location.protocol === "https:" ? "wss://" : "ws://") + location.host + "${config.wsPath}");`,
    )
    .replaceAll("https://cdn02.cdn.amatic.com/", `${config.routeBase}/cdn02.cdn.amatic.com/`)
    .replaceAll("http://cdn02.cdn.amatic.com/", `${config.routeBase}/cdn02.cdn.amatic.com/`);
}

export function handleAmaticUpgrade(config, req, socket, head) {
  const connection = acceptWebSocket(req, socket, head);
  if (!connection) {
    return false;
  }

  const state = {
    initialized: false,
    spinIndex: 0,
  };

  connection.onText = (message) => {
    if (typeof message !== "string" || !message) {
      return;
    }

    if (message.startsWith("A/u251")) {
      if (!state.initialized) {
        connection.sendText(config.replay.loginAck);
        connection.sendText(config.replay.initFrame);
        state.initialized = true;
      }

      const spinFrame = config.replay.spinFrames[state.spinIndex % config.replay.spinFrames.length];
      state.spinIndex += 1;
      connection.sendText(spinFrame);
      return;
    }

    if (message.startsWith("A/u25")) {
      state.initialized = true;
      state.spinIndex = 0;
      connection.sendText(config.replay.loginAck);
      connection.sendText(config.replay.initFrame);
      return;
    }

    if (message.startsWith("A/u260")) {
      connection.close();
    }
  };

  return true;
}

function acceptWebSocket(req, socket, head) {
  const key = req.headers["sec-websocket-key"];
  if (typeof key !== "string" || !key.trim()) {
    socket.destroy();
    return null;
  }

  const acceptKey = createHash("sha1")
    .update(`${key}${WEBSOCKET_GUID}`)
    .digest("base64");

  socket.write([
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${acceptKey}`,
    "",
    "",
  ].join("\r\n"));

  return new LiteWebSocketConnection(socket, head);
}

class LiteWebSocketConnection {
  constructor(socket, head) {
    this.socket = socket;
    this.buffer = Buffer.alloc(0);
    this.closed = false;
    this.onText = null;

    socket.on("data", (chunk) => {
      this.buffer = Buffer.concat([this.buffer, chunk]);
      this.flushFrames();
    });

    socket.on("error", () => {
      this.closed = true;
    });

    socket.on("close", () => {
      this.closed = true;
    });

    if (head?.length) {
      this.buffer = Buffer.concat([this.buffer, head]);
      this.flushFrames();
    }
  }

  sendText(text) {
    if (this.closed) {
      return;
    }

    this.socket.write(encodeFrame(0x1, Buffer.from(String(text), "utf8")));
  }

  close() {
    if (this.closed) {
      return;
    }

    this.closed = true;
    try {
      this.socket.write(encodeFrame(0x8, Buffer.alloc(0)));
    } finally {
      this.socket.end();
    }
  }

  flushFrames() {
    while (this.buffer.length >= 2) {
      const firstByte = this.buffer[0];
      const secondByte = this.buffer[1];
      const opcode = firstByte & 0x0f;
      const masked = (secondByte & 0x80) !== 0;
      let payloadLength = secondByte & 0x7f;
      let offset = 2;

      if (payloadLength === 126) {
        if (this.buffer.length < offset + 2) {
          return;
        }
        payloadLength = this.buffer.readUInt16BE(offset);
        offset += 2;
      } else if (payloadLength === 127) {
        if (this.buffer.length < offset + 8) {
          return;
        }
        payloadLength = Number(this.buffer.readBigUInt64BE(offset));
        offset += 8;
      }

      const maskLength = masked ? 4 : 0;
      const frameLength = offset + maskLength + payloadLength;
      if (this.buffer.length < frameLength) {
        return;
      }

      const mask = masked ? this.buffer.subarray(offset, offset + 4) : null;
      offset += maskLength;

      const payload = this.buffer.subarray(offset, offset + payloadLength);
      this.buffer = this.buffer.subarray(frameLength);

      let decoded = payload;
      if (mask) {
        decoded = Buffer.alloc(payload.length);
        for (let index = 0; index < payload.length; index += 1) {
          decoded[index] = payload[index] ^ mask[index % 4];
        }
      }

      if (opcode === 0x8) {
        this.close();
        return;
      }

      if (opcode === 0x9) {
        if (!this.closed) {
          this.socket.write(encodeFrame(0xA, decoded));
        }
        continue;
      }

      if (opcode === 0x1 && typeof this.onText === "function") {
        this.onText(decoded.toString("utf8"));
      }
    }
  }
}

function encodeFrame(opcode, payload) {
  const payloadLength = payload.length;
  let header = null;

  if (payloadLength < 126) {
    header = Buffer.from([0x80 | opcode, payloadLength]);
  } else if (payloadLength < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x80 | opcode;
    header[1] = 126;
    header.writeUInt16BE(payloadLength, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x80 | opcode;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(payloadLength), 2);
  }

  return Buffer.concat([header, payload]);
}
