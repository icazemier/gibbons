/**
 * Installs the package the way a consumer does, from a packed tarball into a
 * throwaway directory outside this repository.
 *
 * Every other check runs *inside* the workspace, where local resolution papers
 * over anything the tarball gets wrong — a dependency range the registry cannot
 * resolve, a missing file in `files`, an entry point that does not load. The
 * monorepo shipped three uninstallable releases that way: lint, tests and a
 * publish dry-run were all green while `npm install` from a clean directory
 * failed outright.
 *
 * Both entry points are loaded, not just compiled, because the package ships a
 * dual build and only one of the two would otherwise be exercised.
 */
import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { log } from "node:console";
import process from "node:process";

const npm = (args, cwd) =>
  execFileSync("npm", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });

const { name } = JSON.parse(readFileSync("package.json", "utf8"));

const staging = mkdtempSync(join(tmpdir(), "verify-pack-tarball-"));
const consumer = mkdtempSync(join(tmpdir(), "verify-pack-consumer-"));

try {
  npm(["pack", "--pack-destination", staging], process.cwd());

  const [tarball] = readdirSync(staging).filter((entry) =>
    entry.endsWith(".tgz")
  );
  if (tarball === undefined)
    throw new Error(`npm pack produced no tarball in ${staging}`);
  log(`packed ${tarball}`);

  writeFileSync(
    join(consumer, "package.json"),
    `${JSON.stringify({ name: "verify-pack-consumer", private: true, type: "module" }, undefined, 2)}\n`
  );
  npm(["install", "--no-audit", "--no-fund", join(staging, tarball)], consumer);
  log("installed from the tarball into a clean directory");

  writeFileSync(
    join(consumer, "esm.mjs"),
    `import * as loaded from '${name}';\n` +
      `if (Object.keys(loaded).length === 0) throw new Error('${name}: ESM entry exported nothing');\n`
  );
  execFileSync(process.execPath, ["esm.mjs"], {
    cwd: consumer,
    stdio: "inherit",
  });
  log("  ESM entry loads");

  writeFileSync(
    join(consumer, "cjs.cjs"),
    `const loaded = require('${name}');\n` +
      `if (Object.keys(loaded).length === 0) throw new Error('${name}: CJS entry exported nothing');\n`
  );
  execFileSync(process.execPath, ["cjs.cjs"], {
    cwd: consumer,
    stdio: "inherit",
  });
  log("  CJS entry loads");

  log(`${name} installs and loads as a consumer sees it`);
} finally {
  rmSync(staging, { recursive: true, force: true });
  rmSync(consumer, { recursive: true, force: true });
}
