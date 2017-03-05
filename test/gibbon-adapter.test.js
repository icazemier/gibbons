'use strict';
const expect = require('chai').expect;
const helper = require('./helper');

const HatAdapter = require('../index').GibbonAdapter;


describe('Gibbon Adapter tests', function () {

    describe('Unhappy flows', function () {

        describe('Should throw allot of exceptions to get more coverage also ;)', function () {

            it(`Test ${helper.testNumber++}: Try to call the abstract method initialize from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.initialize();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method addUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.addUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method addGroup from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.addGroup();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method addGroups from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.addGroups();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method addPermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.addPermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method addPermissions from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.addPermissions();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method removeUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.removeUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method removeGroup from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.removeGroup();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method removePermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.removePermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method upsertUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.upsertUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method upsertGroup from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.upsertGroup();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method upsertPermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.upsertPermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method findGroup from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.findGroup();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method findPermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.findPermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method findGroupsByUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.findGroupsByUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method findPermissionsByUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.findPermissionsByUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method findUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.findUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method validateUserWithAllPermissions from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.validateUserWithAllPermissions();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method validateUserWithAnyPermissions from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.validateUserWithAnyPermissions();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method findUsersByPermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.findUsersByPermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method findUsersByGroup from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.findUsersByGroup();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method findGroupsByPermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new HatAdapter();
                    adapter.findGroupsByPermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

        });
    });
});
