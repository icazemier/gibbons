import test from "ava";
import { GibbonProcessor } from "../src/index.js";
import { helper } from "./_helper.js";

// Calculate bits and bytes"
test(`Test ${helper.testNumber++}: Compare reference / alias)`, (t) => {
    const bitByte = GibbonProcessor.getByteNoAndBitPos(1);

    t.is(bitByte.bitPos, 0);
    t.is(bitByte.byteNo, 0);
});

test(`Test ${helper.testNumber++}: See if bit position 2 is considered false`, (t) => {
    const isIt = GibbonProcessor.isFalse(13, 2);

    t.false(isIt);
});


