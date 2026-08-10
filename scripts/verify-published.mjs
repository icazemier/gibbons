/**
 * Asserts that both registries actually serve the version in package.json.
 *
 * Publishing is idempotent by design — npm and JSR both skip a version they
 * already have and exit 0 — which means a green publish step proves nothing.
 * This checks the end state instead of the exit code, so a release that
 * silently shipped nothing fails the run.
 */
import { readFileSync } from "node:fs";
import { log, error } from "node:console";
import { setTimeout as sleep } from "node:timers/promises";
import process from "node:process";

const { name, version } = JSON.parse(readFileSync("package.json", "utf-8"));

const registries = [
    {
        label: "npm",
        url: `https://registry.npmjs.org/${name}`,
        has: (body) => Object.hasOwn(body.versions ?? {}, version),
    },
    {
        label: "JSR",
        url: `https://jsr.io/${name}/meta.json`,
        has: (body) => Object.hasOwn(body.versions ?? {}, version),
    },
];

// A publish is visible to the registry API within seconds, but not always
// instantly, so a miss is retried before it is called a failure.
const RETRIES = 5;
const RETRY_DELAY_MS = 4000;

let failed = false;

for (const registry of registries) {
    let served = false;

    for (let attempt = 1; attempt <= RETRIES && !served; attempt++) {
        try {
            const response = await globalThis.fetch(registry.url, {
                headers: { accept: "application/json" },
            });

            if (response.ok) served = registry.has(await response.json());
        } catch (reason) {
            // A registry being unreachable is indistinguishable from one that has
            // not caught up yet, so it is retried rather than crashing the run.
            log(`  ${registry.label}: unreachable (${reason.message}), retrying`);
        }

        if (!served && attempt < RETRIES) await sleep(RETRY_DELAY_MS);
    }

    if (served) {
        log(`  ${registry.label}: serving ${version}`);
    } else {
        error(`  ${registry.label}: does NOT serve ${version}`);
        failed = true;
    }
}

if (failed) {
    error(`${name}@${version} is not available on every registry`);
    process.exit(1);
}

log(`${name}@${version} is live on npm and JSR`);
