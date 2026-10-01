// Builds the favicon set from the "S" of Instrument Serif (spec/003-brand-assets.md).
// Run by hand with `npm run generate:icons`; the output in public/ is committed.
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import opentype from 'opentype.js';

const FONT =
  'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff';
const INK = '#1d1d1b';
const PAPER = '#f4f1eb';
const SIZE = 64;
// Share of the square's height taken by the letter.
const GLYPH_HEIGHT = 0.78;

const buffer = readFileSync(FONT);
const font = opentype.parse(
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
);
const glyph = font.charToGlyph('S');

// Scale the glyph to the target height, then centre its bounding box in the square.
const unit = glyph.getPath(0, 0, 1000).getBoundingBox();
const fontSize = (1000 * SIZE * GLYPH_HEIGHT) / (unit.y2 - unit.y1);
const box = glyph.getPath(0, 0, fontSize).getBoundingBox();
const x = (SIZE - (box.x2 - box.x1)) / 2 - box.x1;
const y = (SIZE - (box.y2 - box.y1)) / 2 - box.y1;
const letter = glyph.getPath(x, y, fontSize).toPathData(2);

const svg = (radius) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">` +
  `<rect width="${SIZE}" height="${SIZE}" rx="${radius}" fill="${INK}"/>` +
  `<path d="${letter}" fill="${PAPER}"/></svg>\n`;

const rounded = svg(12);
// iOS rounds the corners itself and does not support transparency.
const square = svg(0);

writeFileSync('public/favicon.svg', rounded);

const browser = await chromium.launch();

async function render(markup, size) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${markup}`,
  );
  const png = await page.screenshot({ omitBackground: true });
  await page.close();
  return png;
}

const png32 = await render(rounded, 32);
const png180 = await render(square, 180);
await browser.close();

writeFileSync('public/apple-touch-icon.png', png180);

// An .ico file may contain a PNG as is: a 6-byte header, one 16-byte entry, then the image.
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18); // offset of the image data
writeFileSync('public/favicon.ico', Buffer.concat([header, png32]));

console.log('Wrote public/favicon.svg, public/favicon.ico, public/apple-touch-icon.png');
