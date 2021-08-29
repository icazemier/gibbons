import { helper } from './helper.js';
import { expect } from 'chai';
import { Gibbon } from '../src/index.mjs';

describe('Gibbons: Generic tests', function () {
    describe('Unhappy flows ', function () {
        it(`Test ${helper.testNumber++}: This should throw a TypeError because Gibbon expects an ArrayBuffer`, function () {
            function throwError() {
                new Gibbon();
            }
            expect(throwError).to.throw(
                TypeError,
                /argument not an instance of ArrayBuffer/
            );
        });
    });
});
