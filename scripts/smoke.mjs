/**
 * Verifies the built package works through both entry points.
 *
 * The unit tests import TypeScript sources, so they cannot catch a build that
 * emits the wrong module format — a CJS build containing ESM syntax passes
 * every test and still throws for anyone calling `require()`. This runs the
 * real artifacts the way consumers load them.
 */
import { createRequire } from "node:module";
import { log, error } from "node:console";
import process from "node:process";

const require = createRequire(import.meta.url);

const check = async (label, entry) => {
    const { Gibbon, GibbonProcessor, BitByte } = entry;

    if (typeof Gibbon !== "function") throw new Error("Gibbon is not a constructor");
    if (typeof GibbonProcessor !== "function")
        throw new Error("GibbonProcessor is not a constructor");
    if (typeof BitByte !== "function") throw new Error("BitByte is not a constructor");

    const gibbon = Gibbon.create(2).setAllFromPositions([1, 5, 9]);

    const positions = gibbon.getPositionsArray();
    if (positions.join(",") !== "1,5,9")
        throw new Error(`unexpected positions: ${positions.join(",")}`);

    if (!gibbon.hasAllFromPositions([1, 9]))
        throw new Error("hasAllFromPositions missed a position it had set");

    if (gibbon.isPosition(2)) throw new Error("isPosition reported a position that was never set");

    const { byteNo, bitPos } = GibbonProcessor.getByteNoAndBitPos(9);
    if (byteNo !== 1 || bitPos !== 0)
        throw new Error(`unexpected byte/bit for position 9: ${byteNo}/${bitPos}`);

    if (!Gibbon.decode(gibbon.encode()).equals(gibbon))
        throw new Error("encode/decode did not round-trip");

    log(`  ${label}: ok`);
};

try {
    await check("require (cjs)", require("../build/cjs/index.js"));
    await check("import  (esm)", await import("../build/esm/index.js"));
    log("both entry points work");
} catch (failure) {
    error(`smoke test failed: ${failure.message}`);
    process.exit(1);
}
