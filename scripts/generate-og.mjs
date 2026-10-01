// Renders the social preview image (spec/003-brand-assets.md) with the site's own fonts.
// Run by hand with `npm run generate:og`; public/og.png is committed.
import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const WIDTH = 1200;
const HEIGHT = 630;

const font = (path) =>
  `data:font/woff2;base64,${readFileSync(`node_modules/${path}`).toString('base64')}`;
const serif = font('@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2');
const sans = font('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2');

// Colours and type follow src/styles/variables.css and the hero.
const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: 'Instrument Serif'; src: url('${serif}') format('woff2'); }
      @font-face { font-family: 'Geist'; font-weight: 100 900; src: url('${sans}') format('woff2'); }
      * { box-sizing: border-box; margin: 0; }
      body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        padding: 64px 72px 60px;
        background: #f4f1eb;
        color: #1d1d1b;
      }
      header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding-bottom: 28px;
        border-bottom: 1px solid #b7b5af;
      }
      .wordmark {
        font-family: 'Instrument Serif';
        font-size: 38px;
        line-height: 1;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .domain { font-family: 'Geist'; font-size: 26px; color: #6f6d68; }
      h1 {
        font-family: 'Instrument Serif';
        font-size: 204px;
        font-weight: 400;
        line-height: 0.92;
        letter-spacing: -0.02em;
        text-transform: uppercase;
      }
      h1 span { display: block; }
      h1 span + span { padding-right: 0.04em; text-align: right; }
    </style>
  </head>
  <body>
    <header>
      <span class="wordmark">Silverina</span>
      <span class="domain">silverina.dev</span>
    </header>
    <h1><span>Frontend</span><span>Developer</span></h1>
  </body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await browser.close();

console.log(`Wrote public/og.png (${WIDTH}×${HEIGHT})`);
