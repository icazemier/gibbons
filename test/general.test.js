'use strict';
const expect = require('chai').expect;
const helper = require('./helper');

const Gibbon = require('../lib/gibbon');
const GibbonAdapter = require('../lib/adapters/gibbon-adapter');


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
