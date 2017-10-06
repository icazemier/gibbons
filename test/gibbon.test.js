'use strict';
const expect = require('chai').expect;
const helper = require('./helper');
const Gibbon = require('../index').Gibbon;


describe('Gibbon: Bit masking tests', function () {

    describe('Happy flows', function () {

        describe('Compare gibbons', function () {

            it(`Test ${helper.testNumber++}: Compare reference / alias)`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
                const gibbon = new Gibbon.create(1);
                const alias = gibbon;

                const same = gibbon.compare(alias);
                expect(same).to.be.equal(true);
                done();

            });

            it(`Test ${helper.testNumber++}: Compares different size but same data)`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
                const gibbon1 = Gibbon.create(1);
                const gibbon2 = Gibbon.create(2);

                gibbon1.setPosition(3).setPosition(6);
                gibbon2.setPosition(3).setPosition(6);

                let same = gibbon1.compare(gibbon2);
                expect(same).to.be.equal(true);

                same = gibbon2.compare(gibbon1);
                expect(same).to.be.equal(true);

                done();

            });

            it(`Test ${helper.testNumber++}: Compares different size and different data)`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)

                const gibbon1 = Gibbon.create(1);
                const gibbon2 = Gibbon.create(2);
                gibbon2.setPosition(16);

                let same = gibbon1.compare(gibbon2);
                expect(same).to.be.equal(false);

                same = gibbon2.compare(gibbon1);
                expect(same).to.be.equal(false);

                done();

            });

            it(`Test ${helper.testNumber++}: Compare replicated data)`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 256 bytes)
                const gibbon1 = Gibbon.create(256);

                // Pre set some bit positions for the test:
                gibbon1.setPosition(1)
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
                expect(gibbon1.compare(gibbon2)).to.be.equal(true);
                expect(gibbon2.compare(gibbon1)).to.be.equal(true);

                done();

            });
        });

        describe('From to String', function () {

            it(`Test ${helper.testNumber++}: Create Gibbon with no given string`, function (done) {

                const gibbon = Gibbon.fromString();
                const positions = gibbon.getPositionsArray();
                expect(positions.length).to.equal(0);
                done();

            });

            it(`Test ${helper.testNumber++}: Set bits (Converts from string and back and checks consistency)`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 256 bytes)
                const gibbon = Gibbon.create(256);

                // Pre set some bit positions for the test:
                gibbon.setPosition(1)
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
                expect(matches1).to.be.equal(true);
                expect(matches2).to.be.equal(true);
                done();

            });


            it(`Test ${helper.testNumber++}: Toggle bits (Converts from string and back and checks consistency)`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 256 bytes)
                const gibbon = Gibbon.create(256);

                // Pre set some bit positions for the test:
                gibbon.setPosition(1)
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
                gibbon.togglePosition(1)
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
                expect(matches1).to.be.equal(true);
                expect(matches2).to.be.equal(true);
                done();

            });


            it(`Test ${helper.testNumber++}: Individual bit positions (Sets some individual bits and checks outcome)`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 2 bytes)
                const gibbon = Gibbon.create(2);

                // Pre set some bit positions for the test:
                gibbon.setPosition(1)
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
                expect(gibbon1.isPosition(1)).to.be.equal(true);
                expect(gibbon1.isPosition(2)).to.be.equal(true);
                expect(gibbon1.isPosition(3)).to.be.equal(true);
                expect(gibbon1.isPosition(4)).to.be.equal(true);
                expect(gibbon1.isPosition(5)).to.be.equal(true);
                expect(gibbon1.isPosition(6)).to.be.equal(true);
                expect(gibbon1.isPosition(7)).to.be.equal(true);
                expect(gibbon1.isPosition(8)).to.be.equal(true);

                expect(gibbon1.isPosition(9)).to.be.equal(true);
                expect(gibbon1.isPosition(10)).to.be.equal(true);
                expect(gibbon1.isPosition(11)).to.be.equal(true);
                expect(gibbon1.isPosition(12)).to.be.equal(true);
                expect(gibbon1.isPosition(13)).to.be.equal(true);
                expect(gibbon1.isPosition(14)).to.be.equal(false);
                expect(gibbon1.isPosition(15)).to.be.equal(false);
                expect(gibbon1.isPosition(16)).to.be.equal(false);


                done();

            });

            it(`Test ${helper.testNumber++}: Individual bit positions (Sets some individual bits, manipulate and checks outcome)`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 2 bytes)
                const gibbon = Gibbon.create(2);

                // Pre set some bit positions for the test:
                gibbon.setPosition(1)
                    .setPosition(2)
                    .setPosition(3)
                    .setPosition(4)
                    .setPosition(5)
                    .setPosition(6)
                    .setPosition(7)
                    .setPosition(8);


                expect(gibbon.isPosition(1)).to.be.equal(true);
                expect(gibbon.isPosition(2)).to.be.equal(true);
                expect(gibbon.isPosition(3)).to.be.equal(true);
                expect(gibbon.isPosition(4)).to.be.equal(true);
                expect(gibbon.isPosition(5)).to.be.equal(true);
                expect(gibbon.isPosition(6)).to.be.equal(true);
                expect(gibbon.isPosition(7)).to.be.equal(true);
                expect(gibbon.isPosition(8)).to.be.equal(true);

                gibbon.changePosition(1)
                    .changePosition(3)
                    .changePosition(5)
                    .changePosition(7)
                    .changePosition(8, true);

                expect(gibbon.isPosition(1)).to.be.equal(false);
                expect(gibbon.isPosition(2)).to.be.equal(true);
                expect(gibbon.isPosition(3)).to.be.equal(false);
                expect(gibbon.isPosition(4)).to.be.equal(true);
                expect(gibbon.isPosition(5)).to.be.equal(false);
                expect(gibbon.isPosition(6)).to.be.equal(true);
                expect(gibbon.isPosition(7)).to.be.equal(false);
                expect(gibbon.isPosition(8)).to.be.equal(true);

                gibbon.clearPosition(2)
                    .clearPosition(4)
                    .clearPosition(6)
                    .clearPosition(8);

                const positions = [-1, -2, -3, -4, -5, -6, -7, -8];

                expect(gibbon.hasAllFromPositions(positions)).to.be.equal(true);

                done();

            });
        });

        describe('Get / Set positions array', function () {

            it(`Test ${helper.testNumber++}: Fetch positions where bit is set true`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 2 bytes)
                const gibbon = Gibbon.create(2);

                // Pre set some bit positions for the test:
                gibbon.setPosition(1)
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

                expect(positions).to.be.an('array');
                expect(match).to.equal(true);
                done();
            });

            it(`Test ${helper.testNumber++}: Parse positions`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 2 bytes)
                const gibbon = Gibbon.create(2);

                const ref = [1, 2, -3, 4, 5, 6, 7, 8, -10];
                // Pre set some bit positions for the test:
                gibbon.setAllFromPositions(ref);
                const positions = gibbon.getPositionsArray();
                const match = gibbon.hasAllFromPositions(ref);

                expect(positions).to.be.an('array');
                expect(match).to.equal(true);
                done();
            });

            it(`Test ${helper.testNumber++}: Checks on match on any positions`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
                const gibbon = Gibbon.create(1);

                // Pre set all bits positions for the test:
                gibbon.setPosition(1)
                    .setPosition(3)
                    .setPosition(5)
                    .setPosition(7);

                // We're going to check on these and more, this should return `false`
                const positions = [5, 7, -4];

                // Check before encoding to string
                const result = gibbon.hasAnyFromPositions(positions);

                expect(result).to.be.equal(true);
                done();

            });


            it(`Test ${helper.testNumber++}: Checks on match on any positions (alternative)`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
                const gibbon = Gibbon.create(1);

                // Pre set all bits positions for the test:
                gibbon.setPosition(1)
                    .setPosition(3)
                    .setPosition(5)
                    .setPosition(7);

                // We're going to check on these and more, this should return `false`
                const positions = [-2, 7];

                // Check before encoding to string
                const result = gibbon.hasAnyFromPositions(positions);

                expect(result).to.be.equal(true);
                done();

            });

            it(`Test ${helper.testNumber++}: Checks on match on any positions (no criteria given)`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
                const gibbon = Gibbon.create(1);

                // Pre set all bits positions for the test:
                gibbon.setPosition(1)
                    .setPosition(3)
                    .setPosition(5)
                    .setPosition(7);

                // Check before encoding to string
                const result = gibbon.hasAnyFromPositions();

                expect(result).to.be.equal(false);
                done();

            });

            it(`Test ${helper.testNumber++}: Set positions without giving positions`, function (done) {

                // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
                const gibbon = Gibbon.create(1);
                gibbon.setAllFromPositions();
                const positions = gibbon.getPositionsArray();

                expect(positions).to.be.an('array');
                expect(positions.length).to.equal(0);
                done();
            });

        });

    });

    describe('Unhappy flows ', function () {


        it(`Test ${helper.testNumber++}: Bit position \'0\' is not allowed (positions are allowed from 1 and up)`, function (done) {

            var throwError = function () {
                // Initialize a Gibbon with ArrayBuffer (size = 256 bytes)
                const gibbon = Gibbon.create(256);

                // Pre set bit position 0 for the test:
                gibbon.setPosition(0);

            };

            expect(throwError).to.throw(Error);
            done();
        });

        it(`Test ${helper.testNumber++}: Compare gibbon with gibbon please)`, function (done) {

            function throwError() {
                // Initialize a Gibbon with ArrayBuffer (size = 256 bytes)
                const gibbon = Gibbon.create(256);

                gibbon.compare('WEIRD');
            }

            expect(throwError).to.throw(TypeError);
            done();
        });

        it(`Test ${helper.testNumber++}: Class method expects string`, function (done) {

            function throwError() {
                Gibbon.fromString(556);
            }

            expect(throwError).to.throw(TypeError);
            done();
        });


        it(`Test ${helper.testNumber++}: Bit position \'9\' is not allowed anymore (we only allocated 1 byte)`, function (done) {

            function throwError() {
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
            }

            expect(throwError).to.throw(Error, /Illegal position/);
            done();
        });

        it(`Test ${helper.testNumber++}: Checks on positions outside the memory area, should just return false early`, function (done) {

            // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
            const gibbon = Gibbon.create(1);

            // Pre set all bits positions for the test:
            gibbon.setPosition(1)
                .setPosition(2)
                .setPosition(3)
                .setPosition(4)
                .setPosition(5)
                .setPosition(6)
                .setPosition(7)
                .setPosition(8);

            // We're going to check on these and more, this should return `false`
            const positions = [1, 2, 3, 4, 5, 6, 7, 8, 200, 9];

            // Check before encoding to string
            const result = gibbon.hasAllFromPositions(positions);

            expect(result).to.be.equal(false);
            done();

        });

        it(`Test ${helper.testNumber++}: force type strictness on hasAllFromPositions`, function (done) {

            function throwTypeError() {
                // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
                const gibbon = Gibbon.create(1);

                // We're going to check on these and more, this should return `false`
                const positions = 'Weird';

                // Check before encoding to string
                gibbon.hasAllFromPositions(positions);
            }

            expect(throwTypeError).to.throw(TypeError);
            done();

        });

        it(`Test ${helper.testNumber++}: Try to do things out of bounds`, function (done) {

            // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
            const gibbon = Gibbon.create(1);

            const ref = [1, 2, -3, 4, 5, 6, 7, 8, -10]; // -10 is out of bounds
            // Pre set some bit positions for the test:
            gibbon.setAllFromPositions(ref);
            const positions = gibbon.getPositionsArray();
            const match = gibbon.hasAllFromPositions(ref);

            expect(positions).to.be.an('array');
            expect(match).to.equal(false);
            done();
        });

        it(`Test ${helper.testNumber++}: Try to do have something other than array`, function (done) {

            // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
            const gibbon = Gibbon.create(1);

            function throwError() {
                gibbon.setAllFromPositions('w00t!');
            }

            expect(throwError).to.throw(TypeError);
            done();
        });


        it(`Test ${helper.testNumber++}: Try to do things out of bounds on anyPositions`, function (done) {

            // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
            const gibbon = Gibbon.create(1);

            const ref = [-10, -11, -12]; // -10, -11 and -12 are out of bounds
            // Pre set some bit positions for the test:
            gibbon.setAllFromPositions(ref);
            const positions = gibbon.getPositionsArray();
            const match = gibbon.hasAnyFromPositions(ref);

            expect(positions).to.be.an('array');
            expect(match).to.equal(false);
            done();
        });

        it(`Test ${helper.testNumber++}: Try to do have something other than array on anyPositions`, function (done) {

            // Initialize a Gibbon with ArrayBuffer (size = 1 bytes)
            const gibbon = Gibbon.create(1);

            function throwError() {
                gibbon.hasAnyFromPositions('w00t!');
            }

            expect(throwError).to.throw(TypeError);
            done();
        });
    });

});


