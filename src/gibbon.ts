import { Buffer } from "node:buffer";
import { GibbonProcessor } from "./gibbon-processor.js";

/**
 * A Gibbon
 * @param {ArrayBuffer} arrayBuffer - allocate this Gibbon with some working memory
 */
export class Gibbon {
    arrayBuffer: ArrayBuffer;
    dataView: DataView;

    constructor(arrayBuffer: ArrayBuffer) {
        this.arrayBuffer = arrayBuffer;
        this.dataView = new DataView(this.arrayBuffer);
    }

    /**
     * Compare two gibbon instances on data contents
     *
     * @param {Gibbon} gibbon - instance of <b>a</b> Gibbon
     * @returns {boolean} if instance (or contents) are the same
     */
    equals(gibbon: Gibbon): boolean {
        let same = false;
        const arrayBuffer = gibbon.arrayBuffer;
        const thisArrayBuffer = this.arrayBuffer;

        if (thisArrayBuffer === arrayBuffer) {
            same = true;
        } else {
            const thisDataView = this.dataView;
            const dataView = gibbon.dataView;
            const byteLength = Math.max(
                thisArrayBuffer.byteLength,
                arrayBuffer.byteLength
            );
            let result = true;
            for (let i = 0; i < byteLength && result; i++) {
                const value1 =
                    i < thisDataView.byteLength
                        ? thisDataView.getUint8(i)
                        : 0x0;
                const value2 =
                    i < dataView.byteLength ? dataView.getUint8(i) : 0x0;
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
     * ```
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
     * ```
     *
     * @returns {Array} Which contains bit positions from this gibbon, which are logical set to true
     */
    getPositionsArray(): Array<number> {
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
     * @param {number} position - unsigned integer value
     * @returns {Gibbon} - For chaining purposes
     */
    setPosition(position: number): Gibbon {
        const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(position);
        const dataViewBounds = this.dataView.byteLength;
        if (bitBytePosition.byteNo < dataViewBounds) {
            let byte = this.dataView.getUint8(bitBytePosition.byteNo);
            byte = GibbonProcessor.setBit(byte, bitBytePosition.bitPos);
            this.dataView.setUint8(bitBytePosition.byteNo, byte);
        } else {
            // Because we can't exceed the amount of allocated bytes,
            // Please ensure position ends within the allocated memory
            throw new Error("Illegal position");
        }
        return this;
    }

    /**
     * Set bit: false according to integer position
     * Note: Starting from 1
     * @param {number} position - unsigned integer value
     * @returns {Gibbon}
     * @throws {Error} Position can't exceed data view bounds.
     */
    clearPosition(position: number): Gibbon {
        const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(position);
        if (bitBytePosition.byteNo >= this.dataView.byteLength) {
            throw new Error("Illegal position");
        }
        let byte = this.dataView.getUint8(bitBytePosition.byteNo);
        byte = GibbonProcessor.clearBit(byte, bitBytePosition.bitPos);
        this.dataView.setUint8(bitBytePosition.byteNo, byte);
        return this;
    }

    /**
     * Toggle bit value true => false, false => true
     * @example
     * ```
     * const gibbon = Gibbon.create(2);
     * gibbon.changePosition(1, true);
     *
     * gibbon.isPosition(1); // true
     * ```
     * @param {number} position - unsigned integer value
     * @returns {Gibbon}
     */
    togglePosition(position: number): Gibbon {
        const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(position);
        if (bitBytePosition.byteNo >= this.dataView.byteLength) {
            throw new Error("Illegal position");
        }
        let byte = this.dataView.getUint8(bitBytePosition.byteNo);
        byte = GibbonProcessor.toggleBit(byte, bitBytePosition.bitPos);
        this.dataView.setUint8(bitBytePosition.byteNo, byte);
        return this;
    }

    /**
     * Set value for a bit on position
     *
     * @example
     * ```
     * const gibbon = Gibbon.create(2);
     * gibbon.changePosition(1, true);
     *
     * gibbon.isPosition(1); // returns true
     * ```
     *
     * @param {number} position - unsigned integer value
     * @param {boolean} [on] - Optional set true or false (default : false)
     * @returns {Gibbon} - Return itself for chaining purposes
     */
    changePosition(position: number, on = false): Gibbon {
        const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(position);
        if (bitBytePosition.byteNo >= this.dataView.byteLength) {
            throw new Error("Illegal position");
        }
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
     * ```
     * const gibbon = Gibbon.create(2);
     * gibbon.setPosition(1);
     *
     * gibbon.isPosition(1); // returns true
     * ```
     * @param {number} position - unsigned integer value
     * @returns {boolean} if membership is set
     */
    isPosition(position: number): boolean {
        const bitBytePosition = GibbonProcessor.getByteNoAndBitPos(position);
        if (bitBytePosition.byteNo >= this.dataView.byteLength) {
            throw new Error("Illegal position");
        }
        const byte = this.dataView.getUint8(bitBytePosition.byteNo);
        return GibbonProcessor.isTrue(byte, bitBytePosition.bitPos);
    }

    /**
     * Merge with incoming bytes
     * @param {Gibbon} gibbon
     * @returns {Gibbon} - Return itself for chaining purposes
     */
    mergeWithGibbon(gibbon: Gibbon): Gibbon {
        const { dataView: thisDataView } = this;
        const { dataView: incomingDataView } = gibbon;

        if (incomingDataView.byteLength > thisDataView.byteLength) {
            throw new Error(`Incoming Gibbon is too big`);
        }

        // Pick the smallest one at least
        const byteLength = Math.min(
            thisDataView.byteLength,
            incomingDataView.byteLength
        );

        for (let i = 0; i < byteLength; i++) {
            const thisByte = thisDataView.getUint8(i);
            const incomingByte = incomingDataView.getUint8(i);
            thisDataView.setUint8(i, thisByte | incomingByte);
        }
        return this;
    }

    /**
     * Compare 2 gibbons and see if this gibbon shares all given bits
     * @param {Gibbon} gibbon
     * @returns {boolean}
     */
    hasAllFromGibbon(gibbon: Gibbon): boolean {
        const { byteLength: thisByteLength } = this.dataView;
        const { byteLength: givenByteLength } = gibbon.dataView;

        const minByteLength = Math.min(thisByteLength, givenByteLength);

        let hasAllBits = true;
        for (let i = 0; i < minByteLength && hasAllBits; i++) {
            const byte1 = this.dataView.getUint8(i);
            const byte2 = gibbon.dataView.getUint8(i);
            hasAllBits = GibbonProcessor.hasAllBits({ byte1, byte2 });
        }
        return hasAllBits;
    }

    /**
     * Compares all given positions
     * - A positive position means this position should be set logical '1'
     * - A negative position means this position should be set logical '0'
     *
     *  When one wants to check on bit positions outside the memory bounds (dataViewBounds), <br>
     *  method will return early with `false`.
     *
     *
     * @example
     * ```
     *  // Initialize a gibbon with 2 bytes
     *  const gibbon = Gibbon.create(2);
     *  // Set 2 bit positions to logical '1'
     *  gibbon.setPosition(1).setPosition(2);
     *
     *  gibbon.hasAllFromPositions([1, 2]); // true
     * ```
     *
     * @example
     * ```
     *  // Set 2 bit positions to logical '1' then the first bit position back to '0'
     *  const gibbon = Gibbon.create(2);
     *  gibbon.setPosition(1).setPosition(2).togglePosition(1);
     *
     *  gibbon.hasAllFromPositions([-1, 2]); // true
     * ```
     *
     * @param {Array<number>} positionArray - containing signed integer values (representing bit positions)
     * @return {boolean} true when all positions correspondent to the given indexes
     * @throws {TypeError} if positionArray is not an instance of array
     *
     */
    hasAllFromPositions(positionArray: Array<number> = []): boolean {
        // Remove duplicate values from shallow copy
        const positions = Array.from(new Set(positionArray));

        // Create an internal Gibbon to reuse `hasAnyFromGibbon`
        const incomingGibbon = Gibbon.create(
            this.dataView.byteLength
        ).setAllFromPositions(positions);

        return this.hasAllFromGibbon(incomingGibbon);
    }

    /**
     * Compare 2 gibbons and see if this gibbon has at least one bit alike
     * @param {Gibbon} gibbon
     * @returns {boolean}
     */
    hasAnyFromGibbon(gibbon: Gibbon): boolean {
        const { byteLength: thisByteLength } = this.dataView;
        const { byteLength: givenByteLength } = gibbon.dataView;

        const byteLength = Math.min(thisByteLength, givenByteLength);
        let hasAny = false;
        for (let i = 0; i < byteLength && !hasAny; i++) {
            const byte1 = this.dataView.getUint8(i);
            const byte2 = gibbon.dataView.getUint8(i);
            hasAny = GibbonProcessor.hasAnyBits({ byte1, byte2 });
        }
        return hasAny;
    }

    /**
     * Compares the given positions<br>
     * - A positive position means this position should be set logical '1'<br>
     * - A negative position means this position should be set logical '0'<br><br>
     *
     *  When any of the positions conforms to logical '1' (true), we return `true` early.<br><br>
     *
     *  When one wants to check on bit positions outside the memory bounds (dataViewBounds), <br>
     *  method will return early with `false`.
     *
     *
     * @example
     * ```
     *  // Initialize a gibbon with 2 bytes
     *  const gibbon = Gibbon.create(2);
     *  // Set 3 bit positions to logical '1'
     *  gibbon.setPosition(1).setPosition(2).setPosition(10);
     *
     *  gibbon.hasAnyFromPositions([1, 9]); // true
     * ```
     * @example
     * ```
     *  // Set 2 bit positions to logical '1' then the first bit position back to '0'
     *  const gibbon = Gibbon.create(2);
     *  gibbon.setPosition(1).setPosition(2).togglePosition(1);
     *
     *  gibbon.hasAllFromPositions([-1, 100]); // true
     * ```
     * @param {Array<number>} positionArray - containing signed integer values (representing bit positions)
     * @return {boolean} true when one of these positions correspond
     * @throws {TypeError} if positionArray is not an instance of array
     */
    hasAnyFromPositions(positionArray: Array<number> = []): boolean {
        // Remove duplicate values and sort
        const positions = Array.from(new Set(positionArray));

        // Create an internal Gibbon to reuse `hasAnyFromGibbon`
        const incomingGibbon = Gibbon.create(
            this.dataView.byteLength
        ).setAllFromPositions(positions);

        return this.hasAnyFromGibbon(incomingGibbon);
    }

    /**
     * Able to manipulate bits according to an array of signed integers
     *
     * @example
     * ```
     *  // Set 2 bit positions to logical '1'
     *  const gibbon = Gibbon.create(2);
     *  gibbon.setAllFromPositions([1, 2]);
     *  gibbon.hasAllFromPositions([1, 2]); // returns true
     * ```
     * @example
     * ```
     *  // Set 1 bit positions to logical '1' and the second to '0'
     *  const gibbon = Gibbon.create(2);
     *  gibbon.setAllFromPositions([1, -2]);
     *  gibbon.hasAllFromPositions([1]); // returns true
     * ```
     * @param {Array<number>} positionArray - Array with integer values starting from 1.
     * @returns {Gibbon} - For chaining purposes
     * @throws {Error} When out of bounds
     */
    setAllFromPositions(positionArray: Array<number> = []): Gibbon {
        const dataViewBounds = this.dataView.byteLength;

        // Remove duplicate values
        const positions = Array.from(new Set(positionArray));

        for (let i = 0; i < positions.length; i++) {
            const position = positions[i];
            const positionAbs = Math.abs(position);
            const bitBytePosition =
                GibbonProcessor.getByteNoAndBitPos(positionAbs);
            // Check if position is not out of bounds of the data view:
            if (bitBytePosition.byteNo >= dataViewBounds) {
                throw new Error("Illegal position");
            }

            let byte = this.dataView.getUint8(bitBytePosition.byteNo);
            byte = GibbonProcessor.changeBit(
                byte,
                bitBytePosition.bitPos,
                position >= 0
            );
            this.dataView.setUint8(bitBytePosition.byteNo, byte);
        }
        return this;
    }

    /**
     * Able to manipulate bits according to an array of signed integers
     * (opposite of setAllFromPositions)
     *
     * @example
     * ```
     *  // Set 2 bit positions to logical '0'
     *  const gibbon = Gibbon.create(2);
     *  gibbon.unsetAllFromPositions([1, 2]);
     *  gibbon.hasAllFromPositions([1, 2]); // returns false
     *  gibbon.hasAllFromPositions([-1, -2]); // returns true
     * ```
     * @example
     * ```
     *  // Set 1 bit positions to logical '0' and the second to '1'
     *  const gibbon = Gibbon.create(2);
     *  gibbon.setAllFromPositions([1, -2]);
     *  gibbon.hasAllFromPositions([2]); // returns true
     * ```
     * @param {Array<number>} positionArray - Array with integer values starting from 1.
     * @returns {Gibbon} - For chaining purposes
     * @throws {TypeError} if positionArray is not an instance of array
     */
    unsetAllFromPositions(positionArray: Array<number> = []): Gibbon {
        const positions = positionArray.map((position) => -position);
        return this.setAllFromPositions(positions);
    }

    /**
     * Accepts a string of Buffer to create a new Gibbon instance
     * @param {string|Buffer} data
     * @returns {Gibbon}
     */
    static decode(data: Buffer | string): Gibbon {
        if (data instanceof Buffer) {
            return Gibbon.fromBuffer(data);
        }
        if (typeof data === "string") {
            return Gibbon.fromString(data);
        }
        throw new TypeError(`Expected a string or Buffer for decoding, but received a: ${typeof data}`);
    }

    /**
     * Depending on the GIBBONS_ENCODE_FROM_TO_STRING environment variable it converts this
     * Gibbon to a `string` or `Buffer`
     *
     * @returns {Buffer|string}
     */
    encode(): string | Buffer {
        if (process.env.GIBBONS_ENCODE_FROM_TO_STRING) {
            return this.toString();
        }
        return this.toBuffer();
    }

    /**
     * Converts this Gibbon instance to a Buffer
     * @returns {Buffer}
     */
    toBuffer(): Buffer {
        return Buffer.from(this.arrayBuffer);
    }

    static fromBuffer(buffer: Buffer): Gibbon {
        const arrayBuffer = new ArrayBuffer(buffer.length);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < buffer.length; ++i) {
            view[i] = buffer[i];
        }
        return new Gibbon(arrayBuffer);
    }

    /**
     * Convert the whole ArrayBuffer to a string<br>
     * (Hint: Could be used to store a gibbon in persistent storage as a encoded string)
     *
     * @returns {string} - Encoded string
     * @override
     */
    toString(): string {
        const view = new Uint16Array(this.arrayBuffer);
        let result = "";
        for (let i = 0; i < view.length; i++) {
            result += String.fromCharCode(view[i]);
        }
        return result;
    }

    /**
     * Class method to create a new Gibbon from a string<br>
     * (Hint: Could be used to retrieve from persistent storage)
     *
     * @param {string} gibbonString - To be decoded to a Gibbon
     * @returns {Gibbon} - new instance of a Gibbon
     */
    static fromString(gibbonString: string): Gibbon {
        const arrayBuffer = new ArrayBuffer(gibbonString.length * 2); // 2 bytes for each char
        const typedArray = new Uint16Array(arrayBuffer);
        for (let i = 0, strLen = gibbonString.length; i < strLen; i++) {
            typedArray[i] = gibbonString.charCodeAt(i);
        }
        return new Gibbon(arrayBuffer);
    }

    /**
     * Creates a new empty Gibbon from a given byte size
     * @param {number} byteSize - Allocate this Gibbon with a unsigned integer value (size in bytes)
     * @returns {Gibbon} - new instance of a Gibbon
     */
    static create(byteSize: number): Gibbon {
        if (!Number.isInteger(byteSize) || byteSize <= 0) {
            throw new Error("byteSize must be a positive integer");
        }
        const arrayBuffer = new ArrayBuffer(byteSize);
        return new Gibbon(arrayBuffer);
    }
}
