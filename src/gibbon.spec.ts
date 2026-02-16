import { describe, expect, test } from "vitest";
import { Gibbon } from "../src/index.js";
import { helper } from "../test/_helper.js";
import { fail } from "node:assert";

describe("Gibbon happy flows", () => {
    // Compare Gibbons
    test(`Test ${helper.testNumber++}: Compare reference / alias`, () => {
        const gibbon = Gibbon.create(1);
        const alias = gibbon;

        const same = gibbon.equals(alias);
        expect(same).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Compares different size but same data`, () => {
        const gibbon1 = Gibbon.create(1);
        const gibbon2 = Gibbon.create(2);

        gibbon1.setPosition(3).setPosition(6);
        gibbon2.setPosition(3).setPosition(6);

        expect(gibbon1.equals(gibbon2)).toBe(true);
        expect(gibbon2.equals(gibbon1)).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Compares different size and different data`, () => {
        const gibbon1 = Gibbon.create(1);
        const gibbon2 = Gibbon.create(2);
        gibbon2.setPosition(16);

        expect(gibbon1.equals(gibbon2)).toBe(false);
        expect(gibbon2.equals(gibbon1)).toBe(false);
    });

    test(`Test ${helper.testNumber++}: Compare replicated data`, () => {
        const gibbon1 = Gibbon.create(256);
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
        const gibbon2 = Gibbon.fromString(str1);

        expect(gibbon1.equals(gibbon2)).toBe(true);
        expect(gibbon2.equals(gibbon1)).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Compare 2 gibbons and see if the subjected gibbons shares even 1 equal position with the given one`, () => {
        const gibbon1 = Gibbon.create(10).setAllFromPositions([10, 11, 12]);
        const gibbon2 = Gibbon.create(10).setAllFromPositions([11]);
        expect(gibbon1.hasAnyFromGibbon(gibbon2)).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Compare 2 gibbons and see if the subjected gibbons shares all position with the given one`, () => {
        const gibbon1 = Gibbon.create(10).setAllFromPositions([1, 3, 10, 11, 13]);
        const gibbon2 = Gibbon.create(10).setAllFromPositions([1, 10, 13]);
        expect(gibbon1.hasAllFromGibbon(gibbon2)).toBe(true);
    });

    // From To String
    test(`Test ${helper.testNumber++}: Set bits (Converts from string and back and checks consistency)`, () => {
        const gibbon = Gibbon.create(256);
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

        const positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        const matches1 = gibbon.hasAllFromPositions(positions);
        const str1 = gibbon.toString();

        const gibbon1 = Gibbon.fromString(str1);
        const matches2 = gibbon1.hasAllFromPositions(positions);

        expect(matches1).toBe(true);
        expect(matches2).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Toggle bits (Converts from string and back and checks consistency)`, () => {
        const gibbon = Gibbon.create(256);
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

        gibbon
            .togglePosition(1)
            .togglePosition(3)
            .togglePosition(5)
            .togglePosition(7)
            .togglePosition(9)
            .togglePosition(11)
            .togglePosition(13);

        const positions = [-1, 2, -3, 4, -5, 6, -7, 8, -9, 10, -11, 12, -13];
        const matches1 = gibbon.hasAllFromPositions(positions);
        const str1 = gibbon.toString();

        const gibbon1 = Gibbon.fromString(str1);
        const matches2 = gibbon1.hasAllFromPositions(positions);

        expect(matches1).toBe(true);
        expect(matches2).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Individual bit positions (Sets some individual bits and checks outcome)`, () => {
        const gibbon = Gibbon.create(2);
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
        const gibbon1 = Gibbon.fromString(str1);

        expect(gibbon1.isPosition(1)).toBe(true);
        expect(gibbon1.isPosition(2)).toBe(true);
        expect(gibbon1.isPosition(3)).toBe(true);
        expect(gibbon1.isPosition(4)).toBe(true);
        expect(gibbon1.isPosition(5)).toBe(true);
        expect(gibbon1.isPosition(6)).toBe(true);
        expect(gibbon1.isPosition(7)).toBe(true);
        expect(gibbon1.isPosition(8)).toBe(true);
        expect(gibbon1.isPosition(9)).toBe(true);
        expect(gibbon1.isPosition(10)).toBe(true);
        expect(gibbon1.isPosition(11)).toBe(true);
        expect(gibbon1.isPosition(12)).toBe(true);
        expect(gibbon1.isPosition(13)).toBe(true);
        expect(gibbon1.isPosition(14)).toBe(false);
        expect(gibbon1.isPosition(15)).toBe(false);
        expect(gibbon1.isPosition(16)).toBe(false);
    });

    test(`Test ${helper.testNumber++}: Individual bit positions (Sets some individual bits, manipulate and checks outcome)`, () => {
        const gibbon = Gibbon.create(2);
        gibbon
            .setPosition(1)
            .setPosition(2)
            .setPosition(3)
            .setPosition(4)
            .setPosition(5)
            .setPosition(6)
            .setPosition(7)
            .setPosition(8);

        expect(gibbon.isPosition(1)).toBe(true);
        expect(gibbon.isPosition(2)).toBe(true);
        expect(gibbon.isPosition(3)).toBe(true);
        expect(gibbon.isPosition(4)).toBe(true);
        expect(gibbon.isPosition(5)).toBe(true);
        expect(gibbon.isPosition(6)).toBe(true);
        expect(gibbon.isPosition(7)).toBe(true);
        expect(gibbon.isPosition(8)).toBe(true);

        gibbon
            .changePosition(1)
            .changePosition(3)
            .changePosition(5)
            .changePosition(7)
            .changePosition(8, true);

        expect(gibbon.isPosition(1)).toBe(false);
        expect(gibbon.isPosition(2)).toBe(true);
        expect(gibbon.isPosition(3)).toBe(false);
        expect(gibbon.isPosition(4)).toBe(true);
        expect(gibbon.isPosition(5)).toBe(false);
        expect(gibbon.isPosition(6)).toBe(true);
        expect(gibbon.isPosition(7)).toBe(false);
        expect(gibbon.isPosition(8)).toBe(true);

        gibbon.clearPosition(2).clearPosition(4).clearPosition(6).clearPosition(8);

        const positions = [-1, -2, -3, -4, -5, -6, -7, -8];
        expect(gibbon.hasAllFromPositions(positions)).toBe(true);
    });

    // Get / Set positions array
    test(`Test ${helper.testNumber++}: Fetch positions where bit is set true`, () => {
        const gibbon = Gibbon.create(2);
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

        expect(positions).toBeInstanceOf(Array);
        expect(match).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Parse positions`, () => {
        const gibbon = Gibbon.create(2);
        const ref = [1, 2, -3, 4, 5, 6, 7, 8, -10];
        gibbon.setAllFromPositions(ref);

        const positions = gibbon.getPositionsArray();
        const match = gibbon.hasAllFromPositions(ref);

        expect(positions).toBeInstanceOf(Array);
        expect(match).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Parse positions unset`, () => {
        const gibbon = Gibbon.create(2);
        gibbon.unsetAllFromPositions([-1, -2, 3, -4, -5, -6, -7, -8, 10]);

        const positions = gibbon.getPositionsArray();
        const match = gibbon.hasAllFromPositions([1, 2, 4, 5, 6, 7, 8]);

        expect(positions).toBeInstanceOf(Array);
        expect(match).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Checks on match on any positions`, () => {
        const gibbon = Gibbon.create(1);
        gibbon.setPosition(1).setPosition(3).setPosition(5).setPosition(7);

        const positions = [5, 7, -4];
        const result = gibbon.hasAnyFromPositions(positions);

        expect(result).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Checks on match on any positions (alternative)`, () => {
        const gibbon = Gibbon.create(1);
        gibbon.setPosition(1).setPosition(3).setPosition(5).setPosition(7);

        const positions = [-2, 7];
        const result = gibbon.hasAnyFromPositions(positions);

        expect(result).toBe(true);
    });

    test(`Test ${helper.testNumber++}: Checks on match on any positions (no criteria given)`, () => {
        const gibbon = Gibbon.create(1);
        gibbon.setPosition(1).setPosition(3).setPosition(5).setPosition(7);

        const result = gibbon.hasAnyFromPositions();

        expect(result).toBe(false);
    });

    test(`Test ${helper.testNumber++}: Set positions without giving positions`, () => {
        const gibbon = Gibbon.create(1);
        gibbon.setAllFromPositions();

        const positions = gibbon.getPositionsArray();
        expect(positions).toBeInstanceOf(Array);
        expect(positions.length).toBe(0);
    });

    // Merge Gibbons
    test(`Test ${helper.testNumber++}: Merge gibbon with other one`, () => {
        const positionsToMask = [10, 11, 12];
        const gibbon1 = Gibbon.create(2);
        const gibbon2 = Gibbon.create(2).setAllFromPositions(positionsToMask);

        const positions = gibbon1.mergeWithGibbon(gibbon2).getPositionsArray();
        expect(positions).toEqual(positionsToMask);
    });

    test(`Test ${helper.testNumber++}: Merge bigger gibbon with other smaller one`, () => {
        const positionsToMask = [10, 11, 12];
        const gibbon1 = Gibbon.create(3);
        const gibbon2 = Gibbon.create(2).setAllFromPositions(positionsToMask);

        const positions = gibbon1.mergeWithGibbon(gibbon2).getPositionsArray();
        expect(positions).toEqual(positionsToMask);
    });

    // Conversions
    test(`Test ${helper.testNumber++}: Encode to Buffer and Decode to Gibbon from Buffer`, () => {
        delete process.env.GIBBONS_ENCODE_FROM_TO_STRING;

        const gibbon = Gibbon.create(2).setPosition(1).setPosition(16);
        const buffer = gibbon.encode() as Buffer;

        expect(buffer.byteLength).toBe(2);
        for (const pair of buffer.entries()) {
            const [index, byte] = pair;
            switch (index) {
                case 0:
                    expect(byte).toBe(0x1);
                    break;
                case 1:
                    expect(byte).toBe(0x80);
                    break;
                default:
                    fail();
            }
        }

        const newGibbon = Gibbon.decode(buffer);
        const [first, second] = newGibbon.getPositionsArray();
        expect(first).toBe(1);
        expect(second).toBe(16);
    });

    test(`Test ${helper.testNumber++}: Encode to String and Decode to Gibbon from String`, () => {
        process.env.GIBBONS_ENCODE_FROM_TO_STRING = "1";
        const gibbon = Gibbon.create(2).setPosition(1).setPosition(16);

        const gibbonString = gibbon.encode() as string;
        expect(gibbonString).toBe("老");

        const newGibbon = Gibbon.decode(gibbonString);
        const [first, second] = newGibbon.getPositionsArray();
        expect(first).toBe(1);
        expect(second).toBe(16);
    });
});

describe("Gibbon unhappy flows", () => {

    test(`Test ${helper.testNumber++}: Decode with wrong data type`, () => {
        const throwsError = () => {
            Gibbon.decode(123 as unknown as string);
        };

        expect(throwsError).toThrow(new TypeError("Expected a string or Buffer for decoding, but received a: number"));
    })

    test(`Test ${helper.testNumber++}: Bit position '0' is not allowed (positions are allowed from 1 and up)`, () => {
        const throwsError = () => {
            // Initialize a Gibbon with ArrayBuffer (size = 256 bytes)
            const gibbon = Gibbon.create(256);

            // Pre set bit position 0 for the test:
            gibbon.setPosition(0);
        };

        expect(throwsError).toThrow(new Error("Illegal position"));
    });

    test(`Test ${helper.testNumber++}: Bit position '9' is not allowed anymore (we only allocated 1 byte)`, () => {
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

        expect(throwsError).toThrow(new Error("Illegal position"));
    });

    test(`Test ${helper.testNumber++}: Checks on positions outside the memory area, should just return false early`, () => {
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

        expect(throwsError).toThrow(new Error("Illegal position"));
    });

    test(`Test ${helper.testNumber++}: Try to do things out of bounds`, () => {
        // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
        const gibbon = Gibbon.create(1);

        const ref = [1, 2, -3, 4, 5, 6, 7, 8, -10]; // -10 is out of bounds
        // Pre set some bit positions for the test:

        const throwsError = () => {
            gibbon.setAllFromPositions(ref);
        };

        expect(throwsError).toThrow(new Error("Illegal position"));
    });

    test(`Test ${helper.testNumber++}: Try to do things out of bounds on anyPositions`, () => {
        // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
        const gibbon = Gibbon.create(1);

        const ref = [-10, -11, -12]; // -10, -11 and -12 are out of bounds
        // Pre set some bit positions for the test:
        const throwsError = () => {
            gibbon.setAllFromPositions(ref);
        };

        expect(throwsError).toThrow(new Error("Illegal position"));
    });

    test(`Test ${helper.testNumber++}: Merge gibbon with other one, but is too big`, () => {
        const positionsToMask = [10, 11, 12];
        const gibbon1 = Gibbon.create(2);
        const gibbon2 = Gibbon.create(3).setAllFromPositions(positionsToMask);

        const throwsError = () => {
            gibbon1.mergeWithGibbon(gibbon2);
        };

        expect(throwsError).toThrowError(new Error("Incoming Gibbon is too big"));
    });
});
