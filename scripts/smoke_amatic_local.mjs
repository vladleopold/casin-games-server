import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import fs from "node:fs";
import path from "node:path";

import { amaticConfigs } from "../lib/amatic-configs.mjs";
import { handleAmaticUpgrade, serveAmaticIndex, serveAmaticStatic } from "../lib/amatic-local.mjs";

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, "output", "amatic-local-smoke");
fs.mkdirSync(outputDir, { recursive: true });

const config = amaticConfigs.ladyfruits10easter;

class MockResponse extends EventEmitter {
  constructor() {
    super();
    this.headers = {};
    this.statusCode = 200;
    this.body = Buffer.alloc(0);
  }

  setHeader(name, value) {
    this.headers[name] = value;
  }

  writeHead(statusCode, headers = {}) {
    this.statusCode = statusCode;
    Object.assign(this.headers, headers);
  }

  write(chunk) {
    const payload = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk));
    this.body = Buffer.concat([this.body, payload]);
    return true;
  }

  end(chunk = "") {
    if (chunk) {
      this.write(chunk);
    }
    this.emit("finish");
  }
}

class MockSocket extends EventEmitter {
  constructor() {
    super();
    this.writes = [];
    this.ended = false;
    this.destroyed = false;
  }

  write(chunk) {
    const payload = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk));
    this.writes.push(Buffer.from(payload));
    return true;
  }

  end() {
    this.ended = true;
  }

  destroy() {
    this.destroyed = true;
  }
}

function encodeMaskedClientFrame(text) {
  const payload = Buffer.from(text, "utf8");
  const mask = Buffer.from([0x11, 0x22, 0x33, 0x44]);
  const header = Buffer.alloc(2);
  header[0] = 0x81;
  header[1] = 0x80 | payload.length;

  const maskedPayload = Buffer.alloc(payload.length);
  for (let index = 0; index < payload.length; index += 1) {
    maskedPayload[index] = payload[index] ^ mask[index % 4];
  }

  return Buffer.concat([header, mask, maskedPayload]);
}

function decodeServerFrames(buffers) {
  const payload = Buffer.concat(buffers);
  const frames = [];
  let offset = 0;

  while (offset + 2 <= payload.length) {
    const opcode = payload[offset] & 0x0f;
    let length = payload[offset + 1] & 0x7f;
    offset += 2;

    if (length === 126) {
      length = payload.readUInt16BE(offset);
      offset += 2;
    } else if (length === 127) {
      length = Number(payload.readBigUInt64BE(offset));
      offset += 8;
    }

    if (offset + length > payload.length) {
      break;
    }

    const framePayload = payload.subarray(offset, offset + length);
    offset += length;
    frames.push({
      opcode,
      text: framePayload.toString("utf8"),
    });
  }

  return frames;
}

async function main() {
  const indexResponse = new MockResponse();
  await serveAmaticIndex(
    config,
    { headers: {} },
    indexResponse,
    new URL(`http://127.0.0.1${config.routeBase}/`),
  );

  assert.equal(indexResponse.statusCode, 302);
  assert.ok(indexResponse.headers.Location.includes(`${config.routeBase}/${config.htmlAliasPath}`));
  assert.ok(indexResponse.headers.Location.includes("hash=freeplay"));

  const configResponse = new MockResponse();
  const servedConfig = await serveAmaticStatic(
    config,
    { headers: {} },
    `${config.routeBase}/${config.rewritePaths[0]}`,
    configResponse,
    projectRoot,
    3600,
  );

  assert.equal(servedConfig, true);
  assert.equal(configResponse.statusCode, 200);
  const configSource = configResponse.body.toString("utf8");
  assert.ok(configSource.includes(config.wsPath));
  assert.ok(configSource.includes("location.host"));

  const htmlFilePath = path.join(projectRoot, config.siteRoot, config.sourceIndexFile);
  assert.ok(fs.existsSync(htmlFilePath));

  const socket = new MockSocket();
  const upgradeAccepted = handleAmaticUpgrade(
    config,
    { headers: { "sec-websocket-key": "dGhlIHNhbXBsZSBub25jZQ==" } },
    socket,
    Buffer.alloc(0),
  );

  assert.equal(upgradeAccepted, true);
  assert.ok(socket.writes[0].toString("utf8").includes("101 Switching Protocols"));

  const loginMessage = "A/u25freeplay,freeplay,,LadyFruits10Easter,2_0_0,,EUR,2|15|3|en-US |1280|720|1";
  const spinMessage = "A/u251,10,0,1;-1,-1,0,0,-1,15,1,-1,0,1,-1";

  socket.emit("data", encodeMaskedClientFrame(loginMessage));
  socket.emit("data", encodeMaskedClientFrame(spinMessage));

  const replayFrames = decodeServerFrames(socket.writes.slice(1));
  assert.equal(replayFrames[0]?.text, config.replay.loginAck);
  assert.equal(replayFrames[1]?.text, config.replay.initFrame);
  assert.equal(replayFrames[2]?.text, config.replay.spinFrames[0]);

  const summary = {
    game: config.slug,
    launchLocation: indexResponse.headers.Location,
    configRewriteOk: true,
    htmlFileExists: true,
    websocketHandshakeOk: true,
    replayFrameCount: replayFrames.length,
    firstReplayFrames: replayFrames.slice(0, 3).map((frame) => ({
      opcode: frame.opcode,
      sample: frame.text.slice(0, 48),
      length: frame.text.length,
    })),
  };

  fs.writeFileSync(path.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
