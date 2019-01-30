import { GibbonProcessor } from './gibbon-processor';

/**
 * A Gibbon
 * @class
 * @param {ArrayBuffer} arrayBuffer - allocate this Gibbon with some working memory
 * @throws {TypeError} if arrayBuffer is not an instance of ArrayBuffer
 */
export class Gibbon {
    constructor(arrayBuffer) {
        if (!(arrayBuffer instanceof ArrayBuffer)) {
            throw new TypeError('argument not an instance of ArrayBuffer');
        }
        this.arrayBuffer = arrayBuffer;
        this.dataView = new DataView(this.arrayBuffer);
    }

    /**
     * Compare two gibbon instances on data contents
     *
     * @param {Gibbon} gibbon - instance of <b>a</b> Gibbon
     * @returns {boolean} if instance (or contents) are the same
     * @throws {TypeError} if gibbon is not an instance of Gibbon
     */
    compare(gibbon) {
        let same = false;
        if (!(gibbon instanceof Gibbon)) {
            throw new TypeError('gibbon is not an instance of Gibbon');
        }
        const arrayBuffer = gibbon.arrayBuffer;
        const thisArrayBuffer = this.arrayBuffer;

        if (thisArrayBuffer === arrayBuffer) {
            same = true;
        } else {
            const thisDataView = this.dataView;
            const dataView = gibbon.dataView;
            const byteLength = Math.max(thisArrayBuffer.byteLength, arrayBuffer.byteLength);
            let result = true;
            for (let i = 0; i < byteLength && result; i++) {
                const value1 = (i < thisDataView.byteLength) ? thisDataView.getUint8(i) : 0x0;
                const value2 = (i < dataView.byteLength) ? dataView.getUint8(i) : 0x0;
                if (value1 !== value2) {
                    result = false;
                }
            }
            same = result;
        }
        return same;
    }

    /**
     * This method analyzes every bit value in this gibbon and creates the corresponding <br>
     *     position array where bits are logical true.
     *
     * @example
     *
     *
     *   // Initialize a Gibbon (2 bytes)
     *   const gibbon = Gibbon.create(2);
     *
     *   // Pre set some bit positions
     *   gibbon.setPosition(1)
     *   .setPosition(2)
     *   .setPosition(3)
     *   .setPosition(4)
     *   .setPosition(5)
     *   .setPosition(6)
     *   .setPosition(7)
     *   .setPosition(8)
     *   .setPosition(10);
     *
     *   gibbon.getPositionsArray(); // returns: [1, 2, 3, 4, 5, 6, 7, 8, 10]
     *
     *
     * @returns {Array} Which contains bit positions from this gibbon, which are logical set to true
     */
    getPositionsArray() {
        const dataView = this.dataView;
        const byteLength = this.arrayBuffer.byteLength;
        const positions = [];
        for (let byteNo = 0; byteNo < byteLength; byteNo++) {
            const value = dataView.getUint8(byteNo);
            for (let bitPos = 0; bitPos < 8; bitPos++) {
                const posValue = GibbonProcessor.isTrue(value, bitPos);
                if (posValue) {
                    positions.push(byteNo * 8 + bitPos + 1);
                }
            }
        }
        return positions;
    }

    /**
     * Set bit: true according to integer position in the Gibbon <br>
     * <i>Note: Starting from 1</i>
     * @throws {Error} Position can't exceed data view bounds.
     * @param {Number} position - unsigned integer value
     * @returns {Gibbon} - For chaining purposes
     */
    setPosition(position) {
        const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(position);
        const dataViewBounds = this.dataView.byteLength;
        if (bitBytePosition.byteNo < dataViewBounds) {
            let byte = this.dataView.getUint8(bitBytePosition.byteNo);
            byte = GibbonProcessor.setBit(byte, bitBytePosition.bitPos);
            this.dataView.setUint8(bitBytePosition.byteNo, byte);
        } else {
            // Because we can't exceed the amount of allocated bytes,
            // Please ensure position ends within the allocated memory
            throw new Error('Illegal position');
        }
        return this;
    }

    /**
     * Set bit: false according to integer position
     * Note: Starting from 1
     * @param {Number} position - unsigned integer value
     * @returns {Gibbon}
     */
    clearPosition(position) {
        const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(position);
        let byte = this.dataView.getUint8(bitBytePosition.byteNo);
        byte = GibbonProcessor.clearBit(byte, bitBytePosition.bitPos);
        this.dataView.setUint8(bitBytePosition.byteNo, byte);
        return this;
    }

    /**
     * Toggle bit value true => false, false => true
     * @example
     *
     * const gibbon = Gibbon.create(2);
     * gibbon.changePosition(1, true);
     *
     * gibbon.isPosition(1); // true
     *
     * @param {Number} position - unsigned integer value
     * @returns {Gibbon}
     */
    togglePosition(position) {
        const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(position);
        let byte = this.dataView.getUint8(bitBytePosition.byteNo);
        byte = GibbonProcessor.toggleBit(byte, bitBytePosition.bitPos);
        this.dataView.setUint8(bitBytePosition.byteNo, byte);
        return this;
    }

    /**
     * Set value for a bit on position
     *
     * @example
     *
     * const gibbon = Gibbon.create(2);
     * gibbon.changePosition(1, true);
     *
     * gibbon.isPosition(1); // returns true
     *
     *
     * @param {Number} position - unsigned integer value
     * @param {boolean} [on] - Optional set true or false (default : false)
     * @returns {Gibbon} - Return itself for chaining purposes
     */
    changePosition(position, on = false) {
        const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(position);
        let byte = this.dataView.getUint8(bitBytePosition.byteNo);
        byte = GibbonProcessor.changeBit(byte, bitBytePosition.bitPos, on);
        this.dataView.setUint8(bitBytePosition.byteNo, byte);
        return this;
    }

    /**
     * Checks if a value is true or false on a specific position
     *
     *
     * @example
     *
     * const gibbon = Gibbon.create(2);
     * gibbon.setPosition(1);
     *
     * gibbon.isPosition(1); // returns true
     *
     * @param {Number} position - unsigned integer value
     * @returns {boolean} if membership is set
     */
    isPosition(position) {
        const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(position);
        let byte = this.dataView.getUint8(bitBytePosition.byteNo);
        const result = GibbonProcessor.isTrue(byte, bitBytePosition.bitPos);
        return result;
    }

    /**
     * Compares all given positions
     * - A positive position means this position should be set logical '1'
     * - A negative position means this position should be set logical '0'
     *
     *  When one wants to check on bit positions outside the memory bounds (dataViewBounds), <br>
     *  method wil return early with `false`.
     *
     *
     * @example
     *
     *  // Initialize a gibbon with 2 bytes
     *  const gibbon = Gibbon.create(2);
     *  // Set 2 bit positions to logical '1'
     *  gibbon.setPosition(1).setPosition(2);
     *
     *  gibbon.hasAllFromPositions([1, 2]); // true
     *
     * @example
     *
     *  // Set 2 bit positions to logical '1' then the first bit position back to '0'
     *  const gibbon = Gibbon.create(2);
     *  gibbon.setPosition(1).setPosition(2),togglePosition(1);
     *
     *  gibbon.hasAllFromPositions([-1, 2]); // true
     *
     * @param {Array<Number>} positionArray - containing signed integer values (representing bit positions)
     * @return {boolean} true when all positions correspondent to the given indexes
     * @throws {TypeError} if positionArray is not an instance of array
     *
     */
    hasAllFromPositions(positionArray = []) {
        const self = this;
        const dataViewBounds = self.dataView.byteLength;

        if (!(Array.isArray(positionArray))) {
            throw new TypeError('positionArray not an instance of Array');
        }

        // Shallow copy
        let positions = positionArray.slice(0);

        // Remove duplicate values:
        positions = positions.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });

        // Check bits on position if they are truthy (positive position) or falsy (negative position)
        let hasAllFromPositions = true;
        // Exit early when one of the positions is not logic true.
        for (let i = 0; i < positions.length && hasAllFromPositions; i++) {
            const position = positions[i];
            const positionAbs = Math.abs(position);
            const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(positionAbs);
            // Check if position is not out of bound of the data view:
            if (bitBytePosition.byteNo < dataViewBounds) {
                const byte = self.dataView.getUint8(bitBytePosition.byteNo);
                if (position >= 0) {
                    hasAllFromPositions = GibbonProcessor.isTrue(byte, bitBytePosition.bitPos);
                } else {
                    hasAllFromPositions = GibbonProcessor.isFalse(byte, bitBytePosition.bitPos);
                }

            } else {
                // Position is outside the bounds of the DataView, skipping the rest...
                hasAllFromPositions = false;
            }
        }

        return hasAllFromPositions;
    }

    /**
     * Compares the given positions
     * - A positive position means this position should be set logical '1'
     * - A negative position means this position should be set logical '0'
     *
     *  When any of the positions conforms to logical '1' (true), we return `true` early.
     *
     *  When one wants to check on bit positions outside the memory bounds (dataViewBounds), <br>
     *  method wil return early with `false`.
     *
     *
     * @example
     *
     *  // Initialize a gibbon with 2 bytes
     *  const gibbon = Gibbon.create(2);
     *  // Set 3 bit positions to logical '1'
     *  gibbon.setPosition(1).setPosition(2).setPosition(10);
     *
     *  gibbon.hasAnyFromPositions([1, 9]); // true
     *
     * @example
     *
     *  // Set 2 bit positions to logical '1' then the first bit position back to '0'
     *  const gibbon = Gibbon.create(2);
     *  gibbon.setPosition(1).setPosition(2),togglePosition(1);
     *
     *  gibbon.hasAllFromPositions([-1, 100]); // true
     *
     * @param {Array<Number>} positionArray - containing signed integer values (representing bit positions)
     * @return {boolean} true when one of these positions correspond
     * @throws {TypeError} if positionArray is not an instance of array
     */
    hasAnyFromPositions(positionArray = []) {
        let hasAny = false;
        const self = this;
        const dataViewBounds = self.dataView.byteLength;

        if (!(Array.isArray(positionArray))) {
            throw new TypeError('positionArray not an instance of Array');
        }
        // Shallow copy and remove duplicate values:
        let positions = positionArray.slice(0).filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });

        // Check bits on position if they are truthy (positive position) or falsy (negative position)
        // Exit early when one of the positions is not logic true.
        for (let i = 0; i < positions.length && !hasAny; i++) {
            const position = positions[i];
            const positionAbs = Math.abs(position);
            const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(positionAbs);
            // Check if position is not out of bound of the data view:
            if (bitBytePosition.byteNo < dataViewBounds) {
                const byte = self.dataView.getUint8(bitBytePosition.byteNo);
                if (position >= 0) {
                    hasAny = GibbonProcessor.isTrue(byte, bitBytePosition.bitPos);
                } else {
                    hasAny = GibbonProcessor.isFalse(byte, bitBytePosition.bitPos);
                }
            }
        }
        return hasAny;
    }


    /**
     * Able to manipulate bits according to an array of signed integers
     *
     * @example
     *
     *  // Set 2 bit positions to logical '1'
     *  const gibbon = Gibbon.create(2);
     *  gibbon.setAllFromPositions([1, 2]);
     *  gibbon.hasAllFromPositions([1, 2]); // returns true
     *
     * @example
     *
     *  // Set 1 bit positions to logical '1' and the second to '0'
     *  const gibbon = Gibbon.create(2);
     *  gibbon.setAllFromPositions([1, -2]);
     *  gibbon.hasAllFromPositions([1]); // returns true
     *
     * @param {Array<Number>} positionArray - Array with integer values starting from 1.
     * @returns {Gibbon} - For chaining purposes
     * @throws {TypeError} if positionArray is not an instance of array
     */
    setAllFromPositions(positionArray = []) {
        const self = this;
        const dataViewBounds = self.dataView.byteLength;

        if (!(Array.isArray(positionArray))) {
            throw new TypeError('positionArray not an instance of Array');
        }

        // Shallow copy
        let positions = positionArray.slice();

        // Remove duplicate values:
        positions = positions.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });

        for (let i = 0; i < positions.length; i++) {
            const position = positions[i];
            const positionAbs = Math.abs(position);
            const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(positionAbs);
            // Check if position is not out of bound of the data view:
            if (bitBytePosition.byteNo < dataViewBounds) {
                let byte = self.dataView.getUint8(bitBytePosition.byteNo);
                byte = GibbonProcessor.changeBit(byte, bitBytePosition.bitPos, (position >= 0));
                self.dataView.setUint8(bitBytePosition.byteNo, byte);
            }
        }
        return self;
    }

    /**
     * Convert the whole ArrayBuffer to a string<br>
     * (Hint: Could be used to store a gibbon in persistent storage as a encoded string)
     *
     * @returns {string} - Encoded string
     * @override
     */
    toString() {
        return String.fromCharCode.apply(null, new Uint16Array(this.arrayBuffer));
    }

    /**
     * Class method to create a new Gibbon from a string<br>
     * (Hint: Could be used to retrieve from persistent storage)
     *
     * @param {string} str - Representing a new Gibbon instance
     * @returns {Gibbon} - new instance of a Gibbon
     * @throws {TypeError} if given argument is not an instance of string
     */
    static fromString(str = '') {
        if (typeof str !== 'string') {
            throw new TypeError('argument not a string');
        }
        const arrayBuffer = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        const typedArray = new Uint16Array(arrayBuffer);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            typedArray[i] = str.charCodeAt(i);
        }
        return new Gibbon(arrayBuffer);
    }


    /**
     * Creates a new empty Gibbon from a given byte size
     * @param {Number} byteSize - Allocate this Gibbon with a unsigned integer value (size in bytes)
     * @returns {Gibbon} - new instance of a Gibbon
     */
    static create(byteSize) {
        const arrayBuffer = new ArrayBuffer(byteSize);
        return new Gibbon(arrayBuffer);
    }

}
