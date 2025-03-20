import { helper } from "../test/_helper.js";
import { describe, expect, test } from "vitest";
import { GibbonProcessor } from "../src/index.js";


describe("GibbonProcessor happy flows", () => {
    // Calculate bits and bytes
    test(`Test ${helper.testNumber++}: Compare reference / alias`, () => {
        const bitByte = GibbonProcessor.getByteNoAndBitPos(1);

        expect(bitByte.bitPos).toBe(0);
        expect(bitByte.byteNo).toBe(0);
    });

    test(`Test ${helper.testNumber++}: See if bit position 2 is considered false`, () => {
        const isIt = GibbonProcessor.isFalse(13, 2);

        expect(isIt).toBe(false);
    });
});
