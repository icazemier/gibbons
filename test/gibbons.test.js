'use strict';
const async = require('async');
const _ = require('lodash');
const expect = require('chai').expect;

const helper = require('./helper');
const Gibbons = require('../index').Gibbons;
const Gibbon = require('../index').Gibbon;
const LokiJSGibbonAdapter = require('../index').LokiJSGibbonAdapter;


describe('Gibbons', () => {

    describe('Adds', () => {

        let gibbonAdapter;
        let gibbons;

        beforeEach('Initialize a Sorting Gibbon to be able to add data', (done) => {
            gibbonAdapter = new LokiJSGibbonAdapter();
            gibbons = new Gibbons(gibbonAdapter);
            gibbons.initialize(() => {
                done();
            });
        });

        it(`Test ${helper.testNumber++}: Add a user with groups`, (done) => {

            // Set some groups to a user
            const gibbon = Gibbon.create(256);
            gibbon.setPosition(1).setPosition(2).setPosition(10);

            const user = {
                name: 'Ivo',
                groups: gibbon.toString()
            };

            gibbons.addUser(user, (err, userAdded) => {
                expect(userAdded).to.have.property('name');
                expect(userAdded).to.have.property('groups');
                expect(userAdded.name).to.equal(user.name);
                expect(userAdded.groups).to.equal(user.groups);
                done();
            });

        });


        it(`Test ${helper.testNumber++}: Add a group with permissions`, (done) => {

            // Prepare some permissions for an user group
            const gibbon = Gibbon.create(256).setAllFromPositions([1, 2, 2048]);

            const group = {
                name: 'user',
                description: 'Just regular People with an account',
                permissions: gibbon.toString()
            };

            gibbons.addGroup(group, (err, groupAdded) => {
                expect(groupAdded).to.have.property('name');
                expect(groupAdded).to.have.property('description');
                expect(groupAdded).to.have.property('permissions');
                expect(groupAdded.name).to.equal(group.name);
                expect(groupAdded.description).to.equal(group.description);
                expect(groupAdded.permissions).to.equal(group.permissions);
                done();
            });
        });

        it(`Test ${helper.testNumber++}: Add a permission`, (done) => {

            const permission = {
                name: 'You may do this',
                description: 'You\'ve got the power now!'
            };

            gibbons.addPermission(permission, (err, permissionAdded) => {
                expect(permissionAdded).to.have.property('name');
                expect(permissionAdded).to.have.property('description');
                expect(permissionAdded.name).to.equal(permission.name);
                expect(permissionAdded.description).to.equal(permission.description);
                done();
            });
        });


    });

    describe('Upserts', () => {

        let gibbonAdapter;
        let gibbons;

        beforeEach('Initialize Gibbons to be able to upsert data', (done) => {
            gibbonAdapter = new LokiJSGibbonAdapter();
            gibbons = new Gibbons(gibbonAdapter);
            gibbons.initialize(() => {
                done();
            });
        });

        it(`Test ${helper.testNumber++}: Upsert an user with groups`, (done) => {

            // Set some groups to a user
            const gibbon = Gibbon.create(256);
            gibbon.setPosition(1).setPosition(2).setPosition(10);

            const user = {
                name: 'Ivo',
                groups: gibbon.toString()
            };

            gibbons.upsertUser(user, user, (err, userUpserted) => {
                expect(userUpserted).to.have.property('name');
                expect(userUpserted).to.have.property('groups');
                expect(userUpserted.name).to.equal(user.name);
                expect(userUpserted.groups).to.equal(user.groups);
                done();
            });

        });


        it(`Test ${helper.testNumber++}: 2 times an upsert with the same user but different data`, (done) => {

            // Set some groups to a user
            const gibbon = Gibbon.create(256);
            gibbon.setPosition(1).setPosition(2).setPosition(10);

            async.series([(callback) => {

                const user = {
                    name: 'Ivo',
                    groups: gibbon.toString()
                };

                gibbons.upsertUser(user, user, (err, userUpserted) => {
                    expect(userUpserted).to.have.property('name');
                    expect(userUpserted).to.have.property('groups');
                    expect(userUpserted.name).to.equal(user.name);
                    expect(userUpserted.groups).to.equal(user.groups);
                    callback(err);
                });
            }, (callback) => {

                // Change some groups
                gibbon.setPosition(11).clearPosition(2);

                const user = {
                    name: 'Ivo',
                    groups: gibbon.toString()
                };

                gibbons.upsertUser(user, user, (err, userUpserted) => {

                    expect(userUpserted).to.have.property('name');
                    expect(userUpserted).to.have.property('groups');
                    expect(userUpserted.name).to.equal(user.name);
                    expect(userUpserted.groups).to.equal(user.groups);
                    callback(err);
                });
            }], (err) => {
                done(err);
            });


        });


        it(`Test ${helper.testNumber++}: Upsert a group with permissions`, (done) => {

            // Prepare some permissions for an user group
            const gibbon = Gibbon.create(256).setAllFromPositions([1, 2, 2048]);

            const group = {
                name: 'user',
                description: 'Just regular People with an account',
                permissions: gibbon.toString()
            };

            gibbons.upsertGroup(group, group, (err, groupUpserted) => {
                expect(groupUpserted).to.have.property('name');
                expect(groupUpserted).to.have.property('description');
                expect(groupUpserted).to.have.property('permissions');
                expect(groupUpserted.name).to.equal(group.name);
                expect(groupUpserted.description).to.equal(group.description);
                expect(groupUpserted.permissions).to.equal(group.permissions);
                done(err);
            });
        });

        it(`Test ${helper.testNumber++}: Upsert a permission`, (done) => {

            const permission = {
                name: 'You may do this',
                description: 'You\'ve got the power now!'
            };

            gibbons.upsertPermission(permission, permission, (err, permissionUpserted) => {
                expect(permissionUpserted).to.have.property('name');
                expect(permissionUpserted).to.have.property('description');
                expect(permissionUpserted.name).to.equal(permission.name);
                expect(permissionUpserted.description).to.equal(permission.description);
                done(err);
            });
        });

    });

    describe('Removals', () => {

        let gibbonAdapter;
        let gibbons;

        beforeEach('Initialize a Sorting Gibbon to be able to remove data', (done) => {
            gibbonAdapter = new LokiJSGibbonAdapter();
            gibbons = new Gibbons(gibbonAdapter);
            gibbons.initialize(() => {
                done();
            });
        });

        it(`Test ${helper.testNumber++}: Remove a user`, (done) => {

            // Set some groups to a user
            const gibbon = Gibbon.create(256);
            gibbon.setPosition(1).setPosition(2).setPosition(10);

            const user = {
                name: 'Ivo',
                groups: gibbon.toString()
            };

            async.waterfall([
                (callback) => {
                    gibbons.addUser(user, callback);
                },
                (userAdded, callback) => {
                    gibbons.findUser({name: 'Ivo'}, (error, userFound) => {
                        expect(userFound).to.have.property('name');
                        expect(userFound).to.have.property('groups');
                        expect(userFound.name).to.equal(user.name);
                        expect(userFound.groups).to.equal(user.groups);
                        callback(error, userFound);
                    });
                },
                (userFound, callback) => {
                    gibbons.removeUser({name: 'Ivo'}, (error) => {
                        callback(error);
                    });
                },
                (callback) => {
                    gibbons.findUser({name: 'Ivo'}, (error, userFound) => {
                        expect(userFound).to.equal(null);
                        callback(error);
                    });
                }
            ], (error) => {
                done(error);
            });

        });

        it(`Test ${helper.testNumber++}: Try to remove user with funny criteria`, (done) => {
            gibbons.removeUser(undefined, (error) => {
                expect(error).to.be.a.error;
                done();
            });
        });


        it(`Test ${helper.testNumber++}: Remove a group`, (done) => {

            // Set some groups to a user
            const gibbon = Gibbon.create(256);
            gibbon.setPosition(1).setPosition(2).setPosition(10);

            const group = {
                name: 'user',
                description: 'Just regular People with an account',
                permissions: gibbon.toString()
            };

            async.waterfall([
                (callback) => {
                    gibbons.addGroup(group, callback);
                },
                (groupAdded, callback) => {
                    gibbons.findGroup({name: 'user'}, (error, groupFound) => {
                        expect(groupFound).to.have.property('name');
                        expect(groupFound).to.have.property('description');
                        expect(groupFound).to.have.property('permissions');
                        expect(groupFound.name).to.equal(group.name);
                        expect(groupFound.description).to.equal(group.description);
                        expect(groupFound.permissions).to.equal(group.permissions);
                        callback(error, groupFound);
                    });
                },
                (groupFound, callback) => {
                    gibbons.removeGroup({name: 'user'}, (error) => {
                        callback(error);
                    });
                },
                (callback) => {
                    gibbons.findGroup({name: 'user'}, (error, groupFound) => {
                        expect(groupFound).to.equal(null);
                        callback(error);
                    });
                }
            ], (error) => {
                done(error);
            });
        });


        it(`Test ${helper.testNumber++}: Remove a permission`, (done) => {

            const permission = {
                name: 'You may do this',
                description: 'You\'ve got the power now!'
            };

            async.waterfall([
                (callback) => {
                    gibbons.addPermission(permission, callback);
                },
                (permissionAdded, callback) => {
                    gibbons.findPermission({name: 'You may do this'}, (error, permissionFound) => {
                        expect(permissionFound).to.have.property('name');
                        expect(permissionFound).to.have.property('description');
                        expect(permissionFound.name).to.equal(permission.name);
                        expect(permissionFound.description).to.equal(permission.description);
                        callback(error, permissionFound);
                    });
                },
                (groupFound, callback) => {
                    gibbons.removePermission({name: 'You may do this'}, (error) => {
                        callback(error);
                    });
                },
                (callback) => {
                    gibbons.findPermission({name: 'You may do this'}, (error, permissionFound) => {
                        expect(permissionFound).to.equal(null);
                        callback(error);
                    });
                }
            ], (error) => {
                done(error);
            });
        });
    });

    describe('Find things by user', () => {

        let gibbonAdapter;
        let gibbons;
        let groupPositionsAdded;
        let permissionPositionsAdded;

        beforeEach('Initialize a Gibbon with some data to be able to query afterward', (done) => {

            groupPositionsAdded = [];
            permissionPositionsAdded = [];
            gibbonAdapter = new LokiJSGibbonAdapter();
            gibbons = new Gibbons(gibbonAdapter);

            // Prepare some permissions for an user group
            const gibbon1 = Gibbon.create(256).setAllFromPositions([1, 3]);
            const gibbon2 = Gibbon.create(256).setAllFromPositions([2, 4]);

            const user = {
                name: 'Klaas',
                groups: ''
            };

            const permissions = [{
                name: 'Do this',
                description: 'You are granted to do this'
            }, {
                name: 'Do that',
                description: 'You are also granted to do this'
            }, {
                name: 'Change it',
                description: 'You too are granted to do this'
            }, {
                name: 'View it',
                description: 'Yes you also are granted to do this'
            }];

            const groups = [{
                name: 'user',
                description: 'Just regular People with an account',
                permissions: gibbon1.toString()
            }, {
                name: 'admin',
                description: 'VIPS',
                permissions: gibbon2.toString()
            }];


            async.series([
                (callback) => {
                    gibbons.initialize(() => {
                        callback();
                    });
                },
                (callback) => {
                    gibbons.addGroups(groups, (error, groupsAdded) => {
                        groupPositionsAdded = _.map(groupsAdded, '$loki');
                        groupPositionsAdded = groupPositionsAdded.sort();
                        callback(error);
                    });
                },
                (callback) => {
                    gibbons.addPermissions(permissions, (error, permissionsAdded) => {
                        permissionPositionsAdded = _.map(permissionsAdded, '$loki');
                        permissionPositionsAdded = permissionPositionsAdded.sort();
                        callback(error);
                    });
                },
                (callback) => {
                    const gibbon = Gibbon.create(2).setAllFromPositions(groupPositionsAdded);
                    user.groups = gibbon.toString();

                    gibbons.addUser(user, (error) => {
                        callback(error);
                    });
                }
            ], (error) => {
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Find groups by user`, (done) => {
            gibbons.findGroupsByUser({name: 'Klaas'}, (error, groupsFound) => {
                const groupPositionsFound = _.map(groupsFound, '$loki');
                expect(groupsFound).to.be.a.array;
                expect(groupPositionsFound.sort()).to.deep.equal(groupPositionsAdded.sort());
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Find groups by non existing user PIET`, (done) => {
            gibbons.findGroupsByUser({name: 'PIET'}, (error, groupsFound) => {
                expect(error).to.be.a.error;
                expect(error.message).to.equal('user not found');
                expect(groupsFound).to.be.undefined;
                done();
            });
        });


        it(`Test ${helper.testNumber++}: Find permissions by user`, (done) => {

            gibbons.findPermissionsByUser({name: 'Klaas'}, (error, permissionsFound) => {
                const permissionPositionsFound = _.map(permissionsFound, '$loki');
                expect(permissionsFound).to.be.a.array;
                expect(permissionPositionsFound.sort()).to.deep.equal(permissionPositionsAdded.sort());
                done(error);
            });

        });


        it(`Test ${helper.testNumber++}: Find permissions by non existing user`, (done) => {

            gibbons.findPermissionsByUser({name: 'Henk'}, (error, permissionsFound) => {
                expect(error).to.be.a.error;
                expect(error.message).to.equal('user not found');
                expect(permissionsFound).to.be.undefined;
                done();
            });

        });

        it(`Test ${helper.testNumber++}: Try to add funny groups`, (done) => {
            gibbons.addGroups(undefined, (error, groupsAdded) => {
                expect(error).to.be.a.error;
                expect(error.message).to.equal('groups not an instance of array');
                expect(groupsAdded).to.be.undefined;
                done();
            });
        });
    });


    describe('Find things by permissions', () => {

        let gibbonAdapter;
        let gibbons;
        let groupPositionsAdded;
        let permissionPositionsAdded;

        beforeEach('Initialize a Gibbon with some data to be able to query afterward', (done) => {

            groupPositionsAdded = [];
            permissionPositionsAdded = [];
            gibbonAdapter = new LokiJSGibbonAdapter();
            gibbons = new Gibbons(gibbonAdapter);

            // Prepare some permissions for an user group
            const permissionGibbon1 = Gibbon.create(256).setPosition(1);
            const permissionGibbon2 = Gibbon.create(256).setAllFromPositions([2, 4]);
            const permissionGibbon3 = Gibbon.create(256).setPosition(3);

            const users = [{
                name: 'Klaas',
                groups: ''
            }, {
                name: 'Bob',
                groups: ''
            }, {
                name: 'Hank',
                groups: ''
            }, {
                name: 'Joan',
                groups: ''
            }];

            const permissions = [{
                name: 'Do this',
                description: 'You are granted to do this'
            }, {
                name: 'Do that',
                description: 'You are also granted to do this'
            }, {
                name: 'Change it',
                description: 'You too are granted to do this'
            }, {
                name: 'View it',
                description: 'Yes you also are granted to do this'
            }];

            const groups = [{
                name: 'user',
                description: 'Just regular People with an account',
                permissions: permissionGibbon1.toString()
            }, {
                name: 'admin',
                description: 'VIPS',
                permissions: permissionGibbon2.toString()
            }, {
                name: 'operator',
                description: 'User who can operate certain things',
                permissions: permissionGibbon3.toString()
            }];


            async.series([
                (callback) => {
                    gibbons.initialize(() => {
                        callback();
                    });
                },
                (callback) => {
                    gibbons.addGroups(groups, (error, groupsAdded) => {
                        groupPositionsAdded = _.map(groupsAdded, '$loki');
                        groupPositionsAdded = groupPositionsAdded.sort();
                        callback(error);
                    });
                },
                (callback) => {
                    gibbons.addPermissions(permissions, (error, permissionsAdded) => {
                        permissionPositionsAdded = _.map(permissionsAdded, '$loki');
                        permissionPositionsAdded = permissionPositionsAdded.sort();
                        callback(error);
                    });
                },
                (callback) => {

                    // Attach user `Klaas` to group `user`
                    let gibbonGroups = Gibbon.create(2).setPosition(1);
                    users[0].groups = gibbonGroups.toString();

                    // Attach user `Bob` to group `admin`
                    gibbonGroups = Gibbon.create(2).setPosition(2);
                    users[1].groups = gibbonGroups.toString();

                    // Attach user `Hank` to group `user`
                    gibbonGroups = Gibbon.create(2).setPosition(1);
                    users[2].groups = gibbonGroups.toString();

                    // Attach user `Joan` to group `operator`
                    gibbonGroups = Gibbon.create(2).setPosition(3);
                    users[3].groups = gibbonGroups.toString();

                    // Save users
                    async.eachLimit(users, 2, (user, callback) => {
                        gibbons.addUser(user, (error) => {
                            callback(error);
                        });
                    }, (error) => {
                        callback(error);
                    });


                }
            ], (error) => {
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Find users by permission`, (done) => {
            gibbons.findUsersByPermission({name: 'Change it'}, (error, usersFound) => {

                expect(usersFound).to.be.a.array;
                expect(usersFound[0].name).to.equal('Joan');
                done(error);
            });
        });

        // TODO: to another section
        it(`Test ${helper.testNumber++}: Find users by group`, (done) => {
            gibbons.findUsersByGroup({name: 'user'}, (error, usersFound) => {

                expect(usersFound).to.be.a.array;
                expect(usersFound[0].name).to.equal('Hank');
                expect(usersFound[1].name).to.equal('Klaas');
                done(error);
            });
        });


        it(`Test ${helper.testNumber++}: Find groups by permission`, (done) => {
            gibbons.findGroupsByPermission({name: 'Do this'}, (error, groupsFound) => {

                expect(groupsFound).to.be.a.array;
                expect(groupsFound[0].name).to.equal('user');
                done(error);
            });
        });


    });


    describe('Validate a user', () => {
        let gibbonAdapter;
        let gibbons;
        let groupPositionsAdded;
        let permissionPositionsAdded;

        beforeEach('Initialize a Sorting Gibbon with some data to be able to query afterward', (done) => {

            groupPositionsAdded = [];
            permissionPositionsAdded = [];
            gibbonAdapter = new LokiJSGibbonAdapter();
            gibbons = new Gibbons(gibbonAdapter);

            // Prepare some permissions for an user group
            const gibbon1 = Gibbon.create(256).setAllFromPositions([1, 3]);
            const gibbon2 = Gibbon.create(256).setAllFromPositions([2, 4]);

            const user = {
                name: 'Klaas',
                groups: ''
            };

            const permissions = [{
                name: 'Do this',
                description: 'You are granted to do this'
            }, {
                name: 'Do that',
                description: 'You are also granted to do this'
            }, {
                name: 'Change it',
                description: 'You too are granted to do this'
            }, {
                name: 'View it',
                description: 'Yes you also are granted to do this'
            }];

            const groups = [{
                name: 'user',
                description: 'Just regular People with an account',
                permissions: gibbon1.toString()
            }, {
                name: 'admin',
                description: 'VIPS',
                permissions: gibbon2.toString()
            }];


            async.series([
                (callback) => {
                    gibbons.initialize(() => {
                        callback();
                    });
                },
                (callback) => {
                    gibbons.addGroups(groups, (error, groupsAdded) => {
                        groupPositionsAdded = _.map(groupsAdded, '$loki');
                        groupPositionsAdded = groupPositionsAdded.sort();
                        callback(error);
                    });
                },
                (callback) => {
                    gibbons.addPermissions(permissions, (error, permissionsAdded) => {
                        permissionPositionsAdded = _.map(permissionsAdded, '$loki');
                        permissionPositionsAdded = permissionPositionsAdded.sort();
                        callback(error);
                    });
                },
                (callback) => {

                    const gibbon = Gibbon.create(2).setAllFromPositions(groupPositionsAdded);
                    user.groups = gibbon.toString();

                    gibbons.addUser(user, (error) => {
                        callback(error);
                    });
                }
            ], (error) => {
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a user against no permissions`, (done) => {
            gibbons.validateUserWithAllPermissions({name: 'Klaas'}, [], (error, valid) => {
                expect(valid).to.be.a.boolean;
                expect(valid).to.be.false;
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a user`, (done) => {
            gibbons.validateUserWithAllPermissions({name: 'Klaas'}, [1, 2, 3, 4], (error, valid) => {
                expect(valid).to.be.a.boolean;
                expect(valid).to.be.true;
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a user in a different order`, (done) => {
            gibbons.validateUserWithAllPermissions({name: 'Klaas'}, [2, 4, 3, 1], (error, valid) => {
                expect(valid).to.be.a.boolean;
                expect(valid).to.be.true;
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a user`, (done) => {
            gibbons.validateUserWithAllPermissions({name: 'Klaas'}, [1, 2, 3, 4, 5], (error, valid) => {
                expect(valid).to.be.a.boolean;
                expect(valid).to.be.false;
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a user in a different order`, (done) => {
            gibbons.validateUserWithAllPermissions({name: 'Klaas'}, [1, 5, 3, 4, 1], (error, valid) => {
                expect(valid).to.be.a.boolean;
                expect(valid).to.be.false;
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a non existing user`, (done) => {
            gibbons.validateUserWithAllPermissions({name: 'Jan'}, [1, 2], (error, valid) => {
                expect(error).to.be.a.error;
                expect(error.message).to.equal('user not found');
                expect(valid).to.be.a.boolean;
                expect(valid).to.equal(false);
                done();
            });
        });


        it(`Test ${helper.testNumber++}: Validate any permissions from a user against no permissions`, (done) => {

            gibbons.validateUserWithAnyPermissions({name: 'Klaas'}, [], (error, valid) => {
                expect(valid).to.be.a.boolean;
                expect(valid).to.be.false;
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Validate any permissions from a user`, (done) => {
            gibbons.validateUserWithAnyPermissions({name: 'Klaas'}, [1, 2, 45], (error, valid) => {
                expect(valid).to.be.a.boolean;
                expect(valid).to.be.true;
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Validate any permissions from a user in a different order`, (done) => {
            gibbons.validateUserWithAnyPermissions({name: 'Klaas'}, [3, 1, 3456], (error, valid) => {
                expect(valid).to.be.a.boolean;
                expect(valid).to.be.true;
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Validate any permissions from a user in a different order`, (done) => {
            gibbons.validateUserWithAnyPermissions({name: 'Klaas'}, [35435], (error, valid) => {
                expect(valid).to.be.a.boolean;
                expect(valid).to.be.false;
                done(error);
            });
        });

        it(`Test ${helper.testNumber++}: Validate any permissions from a non existing user`, (done) => {
            gibbons.validateUserWithAnyPermissions({name: 'Jan'}, [1, 2], (error, valid) => {
                expect(error).to.be.a.error;
                expect(error.message).to.equal('user not found');
                expect(valid).to.be.a.boolean;
                expect(valid).to.equal(false);
                done();
            });
        });

        it(`Test ${helper.testNumber++}: Try to add funny value as permissions`, (done) => {
            gibbons.addPermissions(undefined, (error, permissionsAdded) => {
                expect(error).to.be.a.error;
                expect(error.message).to.equal('permissions not an instance of array');
                expect(permissionsAdded).to.equal(undefined);
                done();
            });
        });

        it(`Test ${helper.testNumber++}: Try to construct a SortingHat without an adapter`, function (done) {
            function throwTypeError() {
                new Gibbons();
            }

            expect(throwTypeError).to.throw(Error);
            done();
        });


    });
});
