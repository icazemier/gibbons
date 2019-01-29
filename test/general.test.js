import {helper} from './helper';
import chai from 'chai';
import Gibbon from '../lib/gibbon';
import GibbonAdapter from '../lib/adapters/gibbon-adapter';

const expect = chai.expect;

describe('Gibbons: Generic tests', function () {

    describe('Unhappy flows ', function () {

        it(`Test ${helper.testNumber++}: This should throw a TypeError because Hat expects an ArrayBuffer`, function () {

            function throwError() {
                new Gibbon();
            }
            expect(throwError).to.throw(TypeError, /argument not an instance of ArrayBuffer/);

        });

        it(`Test ${helper.testNumber++}: This should throw a TypeError`, function () {

            const adapter = new GibbonAdapter();

            function throwError() {
                adapter.initialize();
            }
            expect(throwError).to.throw(Error, /Abstract method, override please./);

        });
    });
});
