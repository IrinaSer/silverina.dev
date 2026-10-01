// Fails when the built JavaScript exceeds the budget from spec/001-homepage.md.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const BUDGET_KB = 80;
const dir = 'dist/assets';

const files = readdirSync(dir).filter((file) => file.endsWith('.js'));

if (files.length === 0) {
  console.error(`No JavaScript found in ${dir}. Run "npm run build" first.`);
  process.exit(1);
}

const bytes = files.reduce((sum, file) => sum + gzipSync(readFileSync(join(dir, file))).length, 0);
const kb = bytes / 1000;

console.log(`JavaScript: ${kb.toFixed(2)} kB gzipped (budget ${BUDGET_KB} kB)`);

if (kb > BUDGET_KB) {
  console.error('Bundle budget exceeded.');
  process.exit(1);
}
