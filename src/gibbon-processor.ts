/**
 * Just a class to carry byte position and bit position around
 *
 * @param {number} byteNo - unsigned integer value (0..n)
 * @param {number} bitPos - unsigned integer value (0..n)
 */
export class BitByte {
    byteNo: number;
    bitPos: number;

    constructor(byteNo: number, bitPos: number) {
        this.byteNo = byteNo;
        this.bitPos = bitPos;
    }
}

/**
 * This is the Gibbon Processor which does all the bit masking, nothing special ;)
 */
export class GibbonProcessor {
    /**
     * Transforms a position (1..n) to byte index and inner bit position
     *
     * @example
     * ```
     * getByteNoAndBitPos(1); // returns { byteNo: 0, bitPos: 0}
     *
     * getByteNoAndBitPos(256); // returns { byteNo: 31, bitPos: 7}
     * ```
     * @param {number} position - Unsigned integer value (1..n)
     * @returns {BitByte} - A new a BitByte instance
     * @throws {Error} when position is <= 0
     */
    static getByteNoAndBitPos(position = 0): BitByte {
        if (!Number.isInteger(position) || position <= 0) {
            throw new Error("Illegal position");
        }
        const index = position - 1;
        return new BitByte(Math.trunc(index / 8), index % 8);
    }

    /**
     * Compare 2 bytes, matches when byte1 has any similar bits set compared to byte2
     *
     * @example
     * ```
     * // 1. 1000 1001
     * // 2. 0000 1000
     * // ------------- AND
     * //    0000 1000       (8 dec)
     * //      (8 dec !== 0x0) => true
     *
     * const byte1 = 0x89; // 137 (dec)
     * const byte2 = 0x8; // 8 (dec)
     *
     * hasAnyBits({byte1, byte2}); // returns true
     * ```
     * @param {object} param0
     * @param {number} param0.byte1
     * @param {number} param0.byte2
     * @returns {boolean}
     */
    static hasAnyBits({ byte1 = 0x0, byte2 = 0x0 }): boolean {
        return (byte1 & byte2) !== 0x0;
    }

    /**
     * Checks if all logical "1" bits from byte2 compare to the ones in byte1
     * @example
     * ```
     * // 1. 0101 0010       (82 dec)
     * // 2. 0100 0010       (66 dec)
     * // ------------- AND
     * //    0100 0010       (66 dec)
     * //    66 dec === 66 dec :-)
     * //
     *
     * // 1. 0010 1100       (44 dec)
     * // 2. 0010 1000       (40 dec)
     * // ------------- AND
     * //    0010 1000       (40 dec)
     * //    40 dec === 40 dec :-)
     *
     * // 1. 0000 0000       (0 dec)
     * // 2. 0001 0000       (16 dec)
     * // -------------- AND
     * //    0000 0000       (0 dec)
     * //     0 dec !== 16 dec :-(
     *
     *
     * // 1. 0000 0000       (0 dec)
     * // 2. 0010 0010       (34 dec)
     * // -------------- AND
     * //    0000 0000       (0 dec)
     * //     0 dec !== 34 dec :-(
     * ```
     * @param {object} param0
     * @param {number} param0.byte1
     * @param {number} param0.byte2
     * @returns {boolean}
     */
    static hasAllBits({ byte1 = 0x0, byte2 = 0x0 }): boolean {
        return (byte1 & byte2) === byte2;
    }

    /**
     * Check if bit is set true on index
     *
     * @example
     * ```
     * isTrue(13, 2); // returns true
     *
     * // 0000 1101 data
     * //
     * // 0000 0011 data (after data >>= index)
     * // 0000 0001
     * // ---------- AND
     * // 0000 0001 === 0000 0001 (true)
     * //
     * ```
     * @param {number} data - Unsigned integer value
     * @param {number} index - Unsigned integer value (0..7)
     * @returns {boolean}
     */
    static isTrue(data = 0x0, index = 0): boolean {
        data >>= index;
        return (data & 0x1) === 0x1;
    }

    /**
     * Check if bit is set false on index
     *
     * @example
     * ```
     * isFalse(13, 2); // returns false
     *
     * // 0000 1101 data
     * //
     * // 0000 0011 data (after data >>= index)
     * // 0000 0001
     * // ---------- AND
     * // 0000 0001 === 0000 0000 (false)
     * //
     * ```
     * @param {number} data - Unsigned integer value
     * @param {number} index - Unsigned integer value (0..7)
     * @returns {boolean}
     */
    static isFalse(data = 0x0, index = 0): boolean {
        data >>= index;
        return (data & 0x1) === 0x0;
    }

    /**
     * Set bit true on data from index
     *
     * @example
     * ```
     * setBit(0, 1); // returns 1
     *
     * // 0000 0000 data
     * // 0000 0001 mask
     * // ---------------- OR
     * // 0000 0001 result
     * ```
     * @param {number} data - Unsigned integer value
     * @param {number} index - Unsigned integer value (0..7)
     * @returns {number}
     */
    static setBit(data = 0x0, index = 0): number {
        const mask = 1 << index;
        return data | mask;
    }

    /**
     * Set bit false on data from index
     *
     * @example
     * ```
     * clearBit(1, 0); // returns 0(dec)
     *
     * // 0000 0001 mask
     * //
     * // 0000 0001 data
     * // 1111 1110 ~mask
     * // ---------------- AND
     * // 0000 0000 result
     * ```
     * @param {number} data - Unsigned integer value
     * @param {number} index - Unsigned integer value (0..7)
     * @returns {number}
     */
    static clearBit(data = 0x0, index = 0): number {
        const mask = 1 << index;
        return data & ~mask;
    }

    /**
     * Change bit according to given value on data from index
     *
     * @example
     * ```
     * changeBit(1, 0, false); // returns 0(dec)
     *
     * // 0000 0001 data
     * // 1111 1110 mask ~
     * // ---------------- AND
     * // 0000 0000 x1
     * //
     * // 0000 0000 state
     * // 0000 0001 mask
     * // ---------------- AND
     * // 0000 0000 x2
     * //
     * // 0000 0000 (x1)
     * // 0000 0000 (x2)
     * // ---------------- OR
     * // 0000 0000 result
     * ```
     * @param {number} data - Unsigned integer value
     * @param {number} index - Unsigned integer value (0..7)
     * @param {boolean} value
     * @returns {number}
     */
    static changeBit(data = 0x0, index = 0, value: boolean): number {
        const mask = 1 << index;
        const state = value ? 0x1 : 0x0;
        return (data & ~mask) | (-state & mask);
    }

    /**
     * Toggle (inverse) bit value on data from index
     *
     * @example
     * ```
     * toggleBit(1, 0); // Returns 0(dec)
     *
     * // 0000 0001 mask
     * // 0000 0001 data
     * // --------------- XOR
     * // 0000 0000 result
     * ```
     * @param {number} data - Unsigned integer value
     * @param {number} index - Unsigned integer value (0..7)
     * @returns {number}
     */
    static toggleBit(data = 0x0, index = 0): number {
        const mask = 1 << index;
        return data ^ mask;
    }
}
