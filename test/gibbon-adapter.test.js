import {helper} from './helper';
import chai from 'chai';
import {GibbonAdapter} from '../src/index';

const expect = chai.expect;


describe('Gibbon Adapter tests', function () {

    describe('Unhappy flows', function () {

        describe('Should throw allot of exceptions to get more coverage also ;)', function () {

            it(`Test ${helper.testNumber++}: Try to call the abstract method initialize from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.initialize();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method addUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.addUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method addGroup from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.addGroup();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method addGroups from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.addGroups();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method addPermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.addPermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method addPermissions from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.addPermissions();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method removeUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.removeUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method removeGroup from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.removeGroup();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method removePermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.removePermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method upsertUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.upsertUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method upsertGroup from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.upsertGroup();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method upsertPermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.upsertPermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method findGroup from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.findGroup();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method findPermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.findPermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method findGroupsByUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.findGroupsByUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method findPermissionsByUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.findPermissionsByUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });


            it(`Test ${helper.testNumber++}: Try to call the abstract method findUser from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.findUser();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method validateUserWithAllPermissions from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.validateUserWithAllPermissions();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method validateUserWithAnyPermissions from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.validateUserWithAnyPermissions();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method findUsersByPermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.findUsersByPermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method findUsersByGroup from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.findUsersByGroup();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

            it(`Test ${helper.testNumber++}: Try to call the abstract method findGroupsByPermission from adapter instance)`, function (done) {
                function throwTypeError() {
                    const adapter = new GibbonAdapter();
                    adapter.findGroupsByPermission();
                }

                expect(throwTypeError).to.throw(Error);
                done();
            });

        });
    });
});
