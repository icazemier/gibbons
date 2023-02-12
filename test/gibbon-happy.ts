import test from "ava";
import { Gibbon } from "../src/index.js";
import { helper } from "./_helper.js";

// Compare Gibbons

test(`Test ${helper.testNumber++}: Compare reference / alias)`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
    const gibbon = Gibbon.create(1);
    const alias = gibbon;

    const same = gibbon.equals(alias);
    t.true(same);
});

test(`Test ${helper.testNumber++}: Compares different size but same data)`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
    const gibbon1 = Gibbon.create(1);
    const gibbon2 = Gibbon.create(2);

    gibbon1.setPosition(3).setPosition(6);
    gibbon2.setPosition(3).setPosition(6);

    let same = gibbon1.equals(gibbon2);
    t.true(same);

    same = gibbon2.equals(gibbon1);
    t.true(same);
});

test(`Test ${helper.testNumber++}: Compares different size and different data)`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)

    const gibbon1 = Gibbon.create(1);
    const gibbon2 = Gibbon.create(2);
    gibbon2.setPosition(16);

    let same = gibbon1.equals(gibbon2);
    t.false(same);

    same = gibbon2.equals(gibbon1);
    t.false(same);
});

test(`Test ${helper.testNumber++}: Compare replicated data)`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 256 bytes)
    const gibbon1 = Gibbon.create(256);

    // Pre set some bit positions for the test:
    gibbon1
        .setPosition(1)
        .setPosition(2)
        .setPosition(3)
        .setPosition(4)
        .setPosition(5)
        .setPosition(6)
        .setPosition(7)
        .setPosition(8)
        .setPosition(9)
        .setPosition(10)
        .setPosition(11)
        .setPosition(12)
        .setPosition(13);

    const str1 = gibbon1.toString();
    //////////////////////////////////

    //////////////////////////////////
    // Convert string to a new Gibbon instance and check if bit positions still comply
    const gibbon2 = Gibbon.fromString(str1);

    // Assertions:
    t.true(gibbon1.equals(gibbon2));
    t.true(gibbon2.equals(gibbon1));
});

test(`Test ${helper.testNumber++}: Compare 2 gibbons and see if the subjected gibbons shares even 1 equal position with the given one`, (t) => {
    const gibbon1 = Gibbon.create(10).setAllFromPositions([10, 11, 12]);
    const gibbon2 = Gibbon.create(10).setAllFromPositions([11]);
    t.true(gibbon1.hasAnyFromGibbon(gibbon2));
});

test(`Test ${helper.testNumber++}: Compare 2 gibbons and see if the subjected gibbons shares all position with the given one`, (t) => {
    const gibbon1 = Gibbon.create(10).setAllFromPositions([1, 3, 10, 11, 13]);
    const gibbon2 = Gibbon.create(10).setAllFromPositions([1, 10, 13]);

    t.true(gibbon1.hasAllFromGibbon(gibbon2));
});

// From To String

test(`Test ${helper.testNumber++}: Set bits (Converts from string and back and checks consistency)`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 256 bytes)
    const gibbon = Gibbon.create(256);

    // Pre set some bit positions for the test:
    gibbon
        .setPosition(1)
        .setPosition(2)
        .setPosition(3)
        .setPosition(4)
        .setPosition(5)
        .setPosition(6)
        .setPosition(7)
        .setPosition(8)
        .setPosition(9)
        .setPosition(10)
        .setPosition(11)
        .setPosition(12)
        .setPosition(13);

    // We're going to check on these positions
    const positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    // Check before encoding to string
    const matches1 = gibbon.hasAllFromPositions(positions);
    const str1 = gibbon.toString();
    //////////////////////////////////

    //////////////////////////////////
    // Convert string to a new Gibbon instance and check if bit positions still comply
    const gibbon1 = Gibbon.fromString(str1);
    const matches2 = gibbon1.hasAllFromPositions(positions);

    // Assertions:
    t.true(matches1);
    t.true(matches2);
});

test(`Test ${helper.testNumber++}: Toggle bits (Converts from string and back and checks consistency)`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 256 bytes)
    const gibbon = Gibbon.create(256);

    // Pre set some bit positions for the test:
    gibbon
        .setPosition(1)
        .setPosition(2)
        .setPosition(3)
        .setPosition(4)
        .setPosition(5)
        .setPosition(6)
        .setPosition(7)
        .setPosition(8)
        .setPosition(9)
        .setPosition(10)
        .setPosition(11)
        .setPosition(12)
        .setPosition(13);

    // Toggle some
    gibbon
        .togglePosition(1)
        .togglePosition(3)
        .togglePosition(5)
        .togglePosition(7)
        .togglePosition(9)
        .togglePosition(11)
        .togglePosition(13);

    // We're going to check on these positions
    const positions = [-1, 2, -3, 4, -5, 6, -7, 8, -9, 10, -11, 12, -13];

    // Check before encoding to string
    const matches1 = gibbon.hasAllFromPositions(positions);
    const str1 = gibbon.toString();
    //////////////////////////////////

    //////////////////////////////////
    // Convert string to a new Gibbon instance and check if bit positions still comply
    const gibbon1 = Gibbon.fromString(str1);
    const matches2 = gibbon1.hasAllFromPositions(positions);

    // Assertions:
    t.true(matches1);
    t.true(matches2);
});

test(`Test ${helper.testNumber++}: Individual bit positions (Sets some individual bits and checks outcome)`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 2 bytes)
    const gibbon = Gibbon.create(2);

    // Pre set some bit positions for the test:
    gibbon
        .setPosition(1)
        .setPosition(2)
        .setPosition(3)
        .setPosition(4)
        .setPosition(5)
        .setPosition(6)
        .setPosition(7)
        .setPosition(8)
        .setPosition(9)
        .setPosition(10)
        .setPosition(11)
        .setPosition(12)
        .setPosition(13);

    const str1 = gibbon.toString();
    //////////////////////////////////

    //////////////////////////////////
    // Convert string to a new Gibbon instance
    const gibbon1 = Gibbon.fromString(str1);

    // Assertions:
    t.true(gibbon1.isPosition(1));
    t.true(gibbon1.isPosition(2));
    t.true(gibbon1.isPosition(3));
    t.true(gibbon1.isPosition(4));
    t.true(gibbon1.isPosition(5));
    t.true(gibbon1.isPosition(6));
    t.true(gibbon1.isPosition(7));
    t.true(gibbon1.isPosition(8));

    t.true(gibbon1.isPosition(9));
    t.true(gibbon1.isPosition(10));
    t.true(gibbon1.isPosition(11));
    t.true(gibbon1.isPosition(12));
    t.true(gibbon1.isPosition(13));
    t.false(gibbon1.isPosition(14));
    t.false(gibbon1.isPosition(15));
    t.false(gibbon1.isPosition(16));
});

test(`Test ${helper.testNumber++}: Individual bit positions (Sets some individual bits, manipulate and checks outcome)`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 2 bytes)
    const gibbon = Gibbon.create(2);

    // Pre set some bit positions for the test:
    gibbon
        .setPosition(1)
        .setPosition(2)
        .setPosition(3)
        .setPosition(4)
        .setPosition(5)
        .setPosition(6)
        .setPosition(7)
        .setPosition(8);

    t.true(gibbon.isPosition(1));
    t.true(gibbon.isPosition(2));
    t.true(gibbon.isPosition(3));
    t.true(gibbon.isPosition(4));
    t.true(gibbon.isPosition(5));
    t.true(gibbon.isPosition(6));
    t.true(gibbon.isPosition(7));
    t.true(gibbon.isPosition(8));

    gibbon
        .changePosition(1)
        .changePosition(3)
        .changePosition(5)
        .changePosition(7)
        .changePosition(8, true);

    t.false(gibbon.isPosition(1));
    t.true(gibbon.isPosition(2));
    t.false(gibbon.isPosition(3));
    t.true(gibbon.isPosition(4));
    t.false(gibbon.isPosition(5));
    t.true(gibbon.isPosition(6));
    t.false(gibbon.isPosition(7));
    t.true(gibbon.isPosition(8));

    gibbon.clearPosition(2).clearPosition(4).clearPosition(6).clearPosition(8);

    const positions = [-1, -2, -3, -4, -5, -6, -7, -8];

    t.true(gibbon.hasAllFromPositions(positions));
});

// Get / Set positions array

test(`Test ${helper.testNumber++}: Fetch positions where bit is set true`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 2 bytes)
    const gibbon = Gibbon.create(2);

    // Pre set some bit positions for the test:
    gibbon
        .setPosition(1)
        .setPosition(2)
        .setPosition(3)
        .setPosition(4)
        .setPosition(5)
        .setPosition(6)
        .setPosition(7)
        .setPosition(8)
        .setPosition(10);

    const positions = gibbon.getPositionsArray();
    const match = gibbon.hasAllFromPositions(positions);

    t.assert(positions instanceof Array);
    t.true(match);
});

test(`Test ${helper.testNumber++}: Parse positions`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 2 bytes)
    const gibbon = Gibbon.create(2);

    const ref = [1, 2, -3, 4, 5, 6, 7, 8, -10];
    // Pre set some bit positions for the test:
    gibbon.setAllFromPositions(ref);
    const positions = gibbon.getPositionsArray();
    const match = gibbon.hasAllFromPositions(ref);

    t.assert(positions instanceof Array);
    t.true(match);
});

test(`Test ${helper.testNumber++}: Parse positions unset`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 2 bytes)
    const gibbon = Gibbon.create(2);

    // Pre set some bit positions for the test:
    gibbon.unsetAllFromPositions([-1, -2, 3, -4, -5, -6, -7, -8, 10]);
    const positions = gibbon.getPositionsArray();
    const match = gibbon.hasAllFromPositions([1, 2, 4, 5, 6, 7, 8]);

    t.assert(positions instanceof Array);
    t.true(match);
});

test(`Test ${helper.testNumber++}: Checks on match on any positions`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
    const gibbon = Gibbon.create(1);

    // Pre set all bits positions for the test:
    gibbon.setPosition(1).setPosition(3).setPosition(5).setPosition(7);

    // We're going to check on these and more, this should return `false`
    const positions = [5, 7, -4];

    // Check before encoding to string
    const result = gibbon.hasAnyFromPositions(positions);

    t.true(result);
});

test(`Test ${helper.testNumber++}: Checks on match on any positions (alternative)`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
    const gibbon = Gibbon.create(1);

    // Pre set all bits positions for the test:
    gibbon.setPosition(1).setPosition(3).setPosition(5).setPosition(7);

    // We're going to check on these and more, this should return `false`
    const positions = [-2, 7];

    // Check before encoding to string
    const result = gibbon.hasAnyFromPositions(positions);

    t.true(result);
});

test(`Test ${helper.testNumber++}: Checks on match on any positions (no criteria given)`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
    const gibbon = Gibbon.create(1);

    // Pre set all bits positions for the test:
    gibbon.setPosition(1).setPosition(3).setPosition(5).setPosition(7);

    // Check before encoding to string
    const result = gibbon.hasAnyFromPositions();

    t.false(result);
});

test(`Test ${helper.testNumber++}: Set positions without giving positions`, (t) => {
    // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
    const gibbon = Gibbon.create(1);
    gibbon.setAllFromPositions();
    const positions = gibbon.getPositionsArray();

    t.assert(positions instanceof Array);
    t.is(positions.length, 0);
});

// Merge Gibbons

test(`Test ${helper.testNumber++}: Merge gibbon with other one`, (t) => {
    const positionsToMask = [10, 11, 12];
    const gibbon1 = Gibbon.create(2);
    const gibbon2 = Gibbon.create(2).setAllFromPositions(positionsToMask);

    const positions = gibbon1.mergeWithGibbon(gibbon2).getPositionsArray();

    t.deepEqual(positions, positionsToMask);
});

test(`Test ${helper.testNumber++}: Merge bigger gibbon with other smaller one`, (t) => {
    const positionsToMask = [10, 11, 12];
    const gibbon1 = Gibbon.create(3);
    const gibbon2 = Gibbon.create(2).setAllFromPositions(positionsToMask);

    const positions = gibbon1.mergeWithGibbon(gibbon2).getPositionsArray();

    t.deepEqual(positions, positionsToMask);
});

// Convertions
test(`Test ${helper.testNumber++}: Encode to Buffer and Decode to Gibbon from Buffer`, (t) => {
    // 1000 0000 0000 0001 (bin)

    // This ensures we get a Buffer
    delete process.env.GIBBONS_ENCODE_FROM_TO_STRING;

    const gibbon = Gibbon.create(2).setPosition(1).setPosition(16);

    const buffer = gibbon.encode() as Buffer;

    t.is(buffer.byteLength, 2);
    for (const pair of buffer.entries()) {
        const [index, byte] = pair;
        switch (index) {
            case 0:
                t.is(byte, 0x1); // 1 (dec)
                break;
            case 1:
                t.is(byte, 0x80); // 128 (dec)
                break;
            default:
                t.fail();
        }
    }

    const newGibbon = Gibbon.decode(buffer);
    const [first, second] = newGibbon.getPositionsArray();
    t.is(first, 1);
    t.is(second, 16);
});

test(`Test ${helper.testNumber++}: Encode to String and Decode to Gibbon from String`, (t) => {
    // 1000 0000 0000 0001 (bin)

    // This ensures we get a string
    process.env.GIBBONS_ENCODE_FROM_TO_STRING = "1";
    const gibbon = Gibbon.create(2).setPosition(1).setPosition(16);

    const gibbonString = gibbon.encode() as string;
    t.is(gibbonString, "老");

    const newGibbon = Gibbon.decode(gibbonString);
    const [first, second] = newGibbon.getPositionsArray();
    t.is(first, 1);
    t.is(second, 16);
});
