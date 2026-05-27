/**
 * Deno smoke test — verifies that all public exports resolve and are callable.
 * Run from the repo root after building:
 *
 *   deno run --allow-env --allow-net --allow-read --allow-sys compat/deno.ts
 */
import { Gibbon, GibbonProcessor, BitByte } from '../build/esm/index.js';

const checks: [string, unknown][] = [
  ['Gibbon', Gibbon],
  ['GibbonProcessor', GibbonProcessor],
  ['BitByte', BitByte],
];

let failed = false;
for (const [name, value] of checks) {
  if (typeof value !== 'function') {
    console.error(`✗ ${name}: expected function, got ${typeof value}`);
    failed = true;
  } else {
    console.log(`✓ ${name}`);
  }
}

if (failed) {
  Deno.exit(1);
}

console.log(
  `\nAll ${checks.length} exports verified on Deno ${Deno.version.deno}`
);
