const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'logo.png');

if (!fs.existsSync(logoPath)) {
  console.error('public/logo.png not found!');
  process.exit(1);
}

const logoBuffer = fs.readFileSync(logoPath);

// 1. Generate apple-touch-icon.png
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), logoBuffer);
console.log('✓ public/apple-touch-icon.png created.');

// 2. Generate favicon.ico (ICO header wrapping PNG)
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

const dir = Buffer.alloc(16);
dir.writeUInt8(32, 0);
dir.writeUInt8(32, 1);
dir.writeUInt8(0, 2);
dir.writeUInt8(0, 3);
dir.writeUInt16LE(1, 4);
dir.writeUInt16LE(32, 6);
dir.writeUInt32LE(logoBuffer.length, 8);
dir.writeUInt32LE(22, 12);

const icoBuffer = Buffer.concat([header, dir, logoBuffer]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
console.log('✓ public/favicon.ico created.');

// 3. Generate og-image.png (1200x630, #080808 background, #CAA243 gold accent lines)
const width = 1200;
const height = 630;
const rowSize = 1 + width * 4;
const rawBuffer = Buffer.alloc(height * rowSize);

for (let y = 0; y < height; y++) {
  const rowOffset = y * rowSize;
  rawBuffer[rowOffset] = 0;

  const isGoldBar = y < 8 || y >= height - 8;
  const isInnerLine = (y >= 40 && y < 42) || (y >= height - 42 && y < height - 40);

  for (let x = 0; x < width; x++) {
    const pxOffset = rowOffset + 1 + x * 4;
    if (isGoldBar) {
      // #CAA243 Accent
      rawBuffer[pxOffset] = 202;
      rawBuffer[pxOffset + 1] = 162;
      rawBuffer[pxOffset + 2] = 67;
      rawBuffer[pxOffset + 3] = 255;
    } else if (isInnerLine && x >= 40 && x < width - 40) {
      // Fine Line
      rawBuffer[pxOffset] = 202;
      rawBuffer[pxOffset + 1] = 162;
      rawBuffer[pxOffset + 2] = 67;
      rawBuffer[pxOffset + 3] = 180;
    } else {
      // #080808 Background
      rawBuffer[pxOffset] = 8;
      rawBuffer[pxOffset + 1] = 8;
      rawBuffer[pxOffset + 2] = 8;
      rawBuffer[pxOffset + 3] = 255;
    }
  }
}

const compressed = zlib.deflateSync(rawBuffer, { level: 9 });

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(zlib.crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr.writeUInt8(8, 8);
ihdr.writeUInt8(6, 9);
ihdr.writeUInt8(0, 10);
ihdr.writeUInt8(0, 11);
ihdr.writeUInt8(0, 12);

const ihdrChunk = createChunk('IHDR', ihdr);
const idatChunk = createChunk('IDAT', compressed);
const iendChunk = createChunk('IEND', Buffer.alloc(0));

const pngBuffer = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
fs.writeFileSync(path.join(publicDir, 'og-image.png'), pngBuffer);
console.log('✓ public/og-image.png (1200x630) created.');
