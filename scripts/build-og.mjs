// Generate a 1200x630 og-default.png for social link previews.
// Run: node scripts/build-og.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '..', 'public', 'og-default.png');
const LOGO = path.resolve(HERE, '..', 'src', 'assets', 'logo.png');

const W = 1200, H = 630;
const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1f12"/>
      <stop offset="100%" stop-color="#03060a"/>
    </linearGradient>
    <pattern id="scan" width="2" height="3" patternUnits="userSpaceOnUse">
      <rect y="2" width="2" height="1" fill="rgba(0,0,0,0.25)"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#scan)"/>

  <text x="80" y="220" font-family="Impact, 'Arial Black', system-ui" font-size="110" font-weight="900" fill="#ffffff" letter-spacing="-2">Browy</text>
  <rect x="80" y="240" width="180" height="8" rx="4" fill="#4ade80"/>
  <text x="80" y="320" font-family="system-ui, sans-serif" font-size="40" font-weight="700" fill="#bbf7d0">The AI agent that lives</text>
  <text x="80" y="370" font-family="system-ui, sans-serif" font-size="40" font-weight="700" fill="#bbf7d0">in your browser.</text>

  <text x="80" y="470" font-family="system-ui, sans-serif" font-size="26" font-weight="500" fill="rgba(255,255,255,0.7)">Drives real tabs through chat. Side panel + DevTools REPL.</text>

  <text x="80" y="560" font-family="system-ui, sans-serif" font-size="22" font-weight="600" fill="#4ade80">browy.dev</text>
  <text x="220" y="560" font-family="system-ui, sans-serif" font-size="22" font-weight="500" fill="rgba(255,255,255,0.5)">·  open source  ·  Apache 2.0</text>
</svg>`;

const bg = await sharp(Buffer.from(bgSvg)).png().toBuffer();
const logo = await sharp(LOGO).resize(380, 380, { kernel: 'nearest', fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
await sharp(bg).composite([{ input: logo, top: 125, left: W - 460 }]).png().toFile(OUT);
process.stderr.write(`✓ ${path.relative(process.cwd(), OUT)}\n`);
