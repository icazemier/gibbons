'use strict';

/**
 * @classdesc
 * Just a class to carry byte position and bit position around
 *
 * @param {Number} byteNo - unsigned integer value (0..n)
 * @param {Number} bitPos - unsigned integer value (0..n)
 * @class
 */
function BitByte(byteNo, bitPos) {
    this.byteNo = byteNo;
    this.bitPos = bitPos;
}

/**
 * This is the Gibbon Processor which does all the bit masking, nothing special ;)
 * @namespace
 */
const GibbonProcessor = {};


/**
 * Transforms a position (1..n) to byte index and inner bit position
 *
 * @example
 *
 * getByteNoAndBitPos(1); // returns { byteNo: 0, bitPos: 0}
 *
 * getByteNoAndBitPos(256); // returns { byteNo: 31, bitPos: 7}
 *
 * @memberOf GibbonProcessor
 * @param {Number} position - Unsigned integer value (1..n)
 * @returns {BitByte} - A new a BitByte instance
 * @throws {Error} when position is <= 0
 */
GibbonProcessor.getByteNoAndBitPos = function (position) {
    if (position <= 0) {
        throw new Error('Illegal position');
    }
    const index = position - 1;
    return new BitByte(Math.trunc(index / 8), index % 8);
};


/**
 * Check if bit is set true on index
 *
 * @example
 *
 * isTrue(13, 2); // returns true
 *
 * // 0000 1101 data
 * //
 * // 0000 0011 data (after data >>= index)
 * // 0000 0001
 * // ---------- AND
 * // 0000 0001 === 0000 0001 (true)
 * //
 * @memberOf GibbonProcessor
 * @param {Number} data - Unsigned integer value
 * @param {Number} index - Unsigned integer value (0..7)
 * @returns {boolean}
 */
GibbonProcessor.isTrue = function (data, index) {
    /* eslint-disable */
    data >>= index;
    return (data & 0x1) === 0x1;
    /* eslint-enable */
};

/**
 * Check if bit is set false on index
 *
 * @example
 *
 * isFalse(13, 2); // returns false
 *
 * // 0000 1101 data
 * //
 * // 0000 0011 data (after data >>= index)
 * // 0000 0001
 * // ---------- AND
 * // 0000 0001 === 0000 0000 (false)
 * //
 *
 * @memberOf GibbonProcessor
 * @param {Number} data - Unsigned integer value
 * @param {Number} index - Unsigned integer value (0..7)
 * @returns {boolean}
 */
GibbonProcessor.isFalse = function (data, index) {
    /* eslint-disable */
    data >>= index;
    return (data & 0x1) === 0x0;
    /* eslint-enable */
};

/**
 * Set bit true on data from index
 *
 * @example
 *
 * setBit(0, 1); // returns 1
 *
 * // 0000 0000 data
 * // 0000 0001 mask
 * // ---------------- OR
 * // 0000 0001 result
 *
 * @memberOf GibbonProcessor
 * @param {Number} data - Unsigned integer value
 * @param {Number} index - Unsigned integer value (0..7)
 * @returns {Number}
 */
GibbonProcessor.setBit = function (data, index) {
    /* eslint-disable */
    let mask = 1 << index;
    return data | mask;
    /* eslint-enable */
};

/**
 * Set bit false on data from index
 *
 * @example
 *
 * clearBit(1, 0); // returns 0(dec)
 *
 * // 0000 0001 mask
 * //
 * // 0000 0001 data
 * // 1111 1110 ~mask
 * // ---------------- AND
 * // 0000 0000 result
 *
 * @memberOf GibbonProcessor
 * @param {Number} data - Unsigned integer value
 * @param {Number} index - Unsigned integer value (0..7)
 * @returns {Number}
 */
GibbonProcessor.clearBit = function (data, index) {
    /* eslint-disable */
    let mask = 1 << index;
    return data & ~mask;
    /* eslint-enable */
};

/**
 * Change bit according to given value on data from index
 *
 * @example
 *
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
 *
 * @memberOf GibbonProcessor
 * @param {Number} data - Unsigned integer value
 * @param {Number} index - Unsigned integer value (0..7)
 * @param {*} value - truthy | falsy
 * @returns {Number}
 */
GibbonProcessor.changeBit = function (data, index, value) {
    /* eslint-disable */
    let mask = 1 << index;
    // value relies on true = 1 and false = 0
    let state = value ? 0x1 : 0x0;
    return (data & ~mask) | (-state & mask);
    /* eslint-enable */
};

/**
 * Toggle (inverse) bit value on data from index
 *
 * @example
 *
 * toggleBit(1, 0); // Returns 0(dec)
 *
 * // 0000 0001 mask
 * // 0000 0001 data
 * // --------------- XOR
 * // 0000 0000 result
 *
 * @memberOf GibbonProcessor
 * @param {Number} data - Unsigned integer value
 * @param {Number} index - Unsigned integer value (0..7)
 * @returns {Number}
 */
GibbonProcessor.toggleBit = function (data, index) {
    /* eslint-disable */
    let mask = 1 << index;
    return data ^ mask;
    /* eslint-enable */
};


module.exports.GibbonProcessor = GibbonProcessor;
module.exports.BitByte = BitByte;
