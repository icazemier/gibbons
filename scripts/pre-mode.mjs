/**
 * Keeps changesets' prerelease mode in step with the branch being released.
 *
 * Stable branches publish normal versions to the `latest` dist tag; every
 * other release branch publishes under a prerelease tag. Running this before
 * `changeset version` or `changeset publish` means neither ever needs a human
 * to remember `pre enter` / `pre exit`.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { log } from "node:console";
import process from "node:process";

const STABLE_BRANCHES = new Set(["main", "master"]);
const PRERELEASE_TAG = "beta";
const PRE_STATE_FILE = ".changeset/pre.json";

const currentBranch =
    process.env.GITHUB_REF_NAME ??
    execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
        encoding: "utf-8",
    }).trim();

// `changeset pre exit` rewrites the file with mode "exit" instead of deleting
// it, so the mode field is the state — not the file's existence.
const readPrereleaseMode = () => {
    if (!existsSync(PRE_STATE_FILE)) return "none";
    return JSON.parse(readFileSync(PRE_STATE_FILE, "utf-8")).mode;
};

const runChangeset = (...args) => {
    log(`${currentBranch}: changeset ${args.join(" ")}`);
    execFileSync("changeset", args, { stdio: "inherit" });
};

const mode = readPrereleaseMode();

if (STABLE_BRANCHES.has(currentBranch)) {
    if (mode === "pre") runChangeset("pre", "exit");

    // `changeset publish` picks the dist tag with `preState !== undefined`, never
    // looking at the mode, so a leftover "exit" file would push a stable release
    // to the prerelease tag and leave `latest` behind. Only absence is safe, and
    // `changeset version` deletes the file for exactly this reason.
    if (existsSync(PRE_STATE_FILE)) {
        rmSync(PRE_STATE_FILE);
        log(`${currentBranch}: removed ${PRE_STATE_FILE}, releasing to latest`);
    } else {
        log(`${currentBranch}: stable, releasing to latest`);
    }
} else if (mode === "pre") {
    log(`${currentBranch}: already in prerelease mode (${PRERELEASE_TAG})`);
} else {
    runChangeset("pre", "enter", PRERELEASE_TAG);
}
