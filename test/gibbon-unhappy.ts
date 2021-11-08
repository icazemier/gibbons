import test from "ava";
import { Gibbon } from "../src/gibbon.js";
import { helper } from "./_helper.js";

test(`Test ${helper.testNumber++}: Bit position '0' is not allowed (positions are allowed from 1 and up)`, (t) => {
    const throwsError = () => {
        // Initialize a Gibbon with ArrayBuffer (size = 256 bytes)
        const gibbon = Gibbon.create(256);

        // Pre set bit position 0 for the test:
        gibbon.setPosition(0);
    };

    const err = t.throws(throwsError);
    t.assert(err instanceof Error);
    t.is(err.message, "Illegal position");
});

test(`Test ${helper.testNumber++}: Bit position '9' is not allowed anymore (we only allocated 1 byte)`, (t) => {
    const throwsError = () => {
        // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
        const gibbon = Gibbon.create(1);

        // Pre set bit position 0 for the test:
        gibbon.setPosition(1);
        gibbon.setPosition(2);
        gibbon.setPosition(3);
        gibbon.setPosition(4);
        gibbon.setPosition(6);
        gibbon.setPosition(7);
        gibbon.setPosition(8); // Last bit position
        gibbon.setPosition(9); // This position should throw an error!
        gibbon.setPosition(10);
    };

    const error = t.throws(throwsError);
    t.assert(error instanceof Error);
    t.is(error.message, "Illegal position");
});

test(`Test ${helper.testNumber++}: Checks on positions outside the memory area, should just return false early`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
    const gibbon = Gibbon.create(1);

    // Pre set all bits positions for the test:
    gibbon
        .setPosition(1)
        .setPosition(2)
        .setPosition(3)
        .setPosition(4)
        .setPosition(5)
        .setPosition(6)
        .setPosition(7)
        .setPosition(8);

    // We're going to check on these and more, this should return `false`
    const positions = [1, 2, 3, 4, 5, 6, 7, 8, 200, 9];

    const throwsError = () => {
        gibbon.hasAllFromPositions(positions);
    };

    const error = t.throws(throwsError);
    t.assert(error instanceof Error);
    t.is(error.message, "Illegal position");
});

test(`Test ${helper.testNumber++}: Try to do things out of bounds`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
    const gibbon = Gibbon.create(1);

    const ref = [1, 2, -3, 4, 5, 6, 7, 8, -10]; // -10 is out of bounds
    // Pre set some bit positions for the test:

    const throwsError = () => {
        gibbon.setAllFromPositions(ref);
    };

    const error = t.throws(throwsError);
    t.assert(error instanceof Error);
    t.is(error.message, "Illegal position");
});

test(`Test ${helper.testNumber++}: Try to do things out of bounds on anyPositions`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
    const gibbon = Gibbon.create(1);

    const ref = [-10, -11, -12]; // -10, -11 and -12 are out of bounds
    // Pre set some bit positions for the test:
    const throwsError = () => {
        gibbon.setAllFromPositions(ref);
    };

    const error = t.throws(throwsError);
    t.assert(error instanceof Error);
    t.is(error.message, "Illegal position");
});

test(`Test ${helper.testNumber++}: Merge gibbon with other one, but is too big`, (t) => {
    const positionsToMask = [10, 11, 12];
    const gibbon1 = Gibbon.create(2);
    const gibbon2 = Gibbon.create(3).setAllFromPositions(positionsToMask);

    const throwsError = () => {
        gibbon1.mergeWithGibbon(gibbon2);
    };

    const error = t.throws(throwsError);
    t.assert(error instanceof Error);
    t.is(error.message, "Incoming Gibbon is too big");
});
