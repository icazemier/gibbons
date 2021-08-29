import { helper } from './helper.js';
import { expect } from 'chai';
import { Gibbon } from '../src/index.mjs';
import { LokiJSGibbonAdapter } from './adapters/lokijs-gibbon-adapter.js';

describe('Gibbons', () => {
    describe('Adds', () => {
        let lokijsAdapter;

        beforeEach(
            'Initialize a Sorting Gibbon to be able to add data',
            async () => {
                lokijsAdapter = new LokiJSGibbonAdapter();
                await lokijsAdapter.initialize();
            }
        );

        it(`Test ${helper.testNumber++}: Add a user with groups`, () => {
            // Set some groups to a user
            const gibbon = Gibbon.create(256);
            gibbon.setPosition(1).setPosition(2).setPosition(10);

            const user = {
                name: 'Ivo',
                groups: gibbon.toString(),
            };

            const userAdded = lokijsAdapter.addUser(user);

            expect(userAdded).to.have.property('name');
            expect(userAdded).to.have.property('groups');
            expect(userAdded.name).to.equal(user.name);
            expect(userAdded.groups).to.equal(user.groups);
        });

        it(`Test ${helper.testNumber++}: Add a user with funny data`, () => {
            const throwsError = () => lokijsAdapter.addUser(null);
            expect(throwsError).to.throw('Object cannot be null');
        });

        it(`Test ${helper.testNumber++}: Add a group with permissions`, () => {
            // Prepare some permissions for an user group
            const gibbon = Gibbon.create(256).setAllFromPositions([1, 2, 2048]);

            const group = {
                name: 'user',
                description: 'Just regular People with an account',
                permissions: gibbon.toString(),
            };

            const groupAdded = lokijsAdapter.addGroup(group);

            expect(groupAdded).to.have.property('name');
            expect(groupAdded).to.have.property('description');
            expect(groupAdded).to.have.property('permissions');
            expect(groupAdded.name).to.equal(group.name);
            expect(groupAdded.description).to.equal(group.description);
            expect(groupAdded.permissions).to.equal(group.permissions);
        });

        it(`Test ${helper.testNumber++}: Add a funny group`, () => {
            const throwsError = () => lokijsAdapter.addGroup(undefined);

            expect(throwsError).to.throw('Document needs to be an object');
        });

        it(`Test ${helper.testNumber++}: Add a permission`, () => {
            const permission = {
                name: 'You may do this',
                description: "You've got the power now!",
            };

            const permissionAdded = lokijsAdapter.addPermission(permission);

            expect(permissionAdded).to.have.property('name');
            expect(permissionAdded).to.have.property('description');
            expect(permissionAdded.name).to.equal(permission.name);
            expect(permissionAdded.description).to.equal(
                permission.description
            );
        });

        it(`Test ${helper.testNumber++}: Add a funny permission`, () => {
            const throwsError = () => lokijsAdapter.addPermission(null);

            expect(throwsError).to.throw('Object cannot be null');
        });

        it(`Test ${helper.testNumber++}: Try to add funny groups`, () => {
            const throwsError = () => lokijsAdapter.addGroups(undefined);

            expect(throwsError).to.throw('Document needs to be an object');
        });
    });

    describe('Upserts', () => {
        let lokijsAdapter;

        beforeEach('Initialize Gibbons to be able to upsert data', async () => {
            lokijsAdapter = new LokiJSGibbonAdapter();
            await lokijsAdapter.initialize();
        });

        it(`Test ${helper.testNumber++}: Upsert an user with groups`, () => {
            // Set some groups to a user
            const gibbon = Gibbon.create(256);
            gibbon.setPosition(1).setPosition(2).setPosition(10);

            const user = {
                name: 'Ivo',
                groups: gibbon.toString(),
            };

            const userUpserted = lokijsAdapter.upsertUser(user, user);

            expect(userUpserted).to.have.property('name');
            expect(userUpserted).to.have.property('groups');
            expect(userUpserted.name).to.equal(user.name);
            expect(userUpserted.groups).to.equal(user.groups);
        });

        it(`Test ${helper.testNumber++}: 2 times an upsert with the same user but different data`, () => {
            // Set some groups to a user
            const gibbon = Gibbon.create(256);
            gibbon.setPosition(1).setPosition(2).setPosition(10);

            let user = {
                name: 'Ivo',
                groups: gibbon.toString(),
            };

            let userUpserted = lokijsAdapter.upsertUser(user, user);

            expect(userUpserted).to.have.property('name');
            expect(userUpserted).to.have.property('groups');
            expect(userUpserted.name).to.equal(user.name);
            expect(userUpserted.groups).to.equal(user.groups);

            // Change some groups
            gibbon.setPosition(11).clearPosition(2);

            user = {
                name: 'Ivo',
                groups: gibbon.toString(),
            };

            userUpserted = lokijsAdapter.upsertUser(user, user);

            expect(userUpserted).to.have.property('name');
            expect(userUpserted).to.have.property('groups');
            expect(userUpserted.name).to.equal(user.name);
            expect(userUpserted.groups).to.equal(user.groups);
        });

        it(`Test ${helper.testNumber++}: Upsert a group with permissions`, () => {
            // Prepare some permissions for an user group
            const gibbon = Gibbon.create(256).setAllFromPositions([1, 2, 2048]);

            const group = {
                name: 'user',
                description: 'Just regular People with an account',
                permissions: gibbon.toString(),
            };

            const groupUpserted = lokijsAdapter.upsertGroup(group, group);

            expect(groupUpserted).to.have.property('name');
            expect(groupUpserted).to.have.property('description');
            expect(groupUpserted).to.have.property('permissions');
            expect(groupUpserted.name).to.equal(group.name);
            expect(groupUpserted.description).to.equal(group.description);
            expect(groupUpserted.permissions).to.equal(group.permissions);
        });

        it(`Test ${helper.testNumber++}: Upsert a permission`, () => {
            const permission = {
                name: 'You may do this',
                description: "You've got the power now!",
            };

            const permissionUpserted = lokijsAdapter.upsertPermission(
                permission,
                permission
            );

            expect(permissionUpserted).to.have.property('name');
            expect(permissionUpserted).to.have.property('description');
            expect(permissionUpserted.name).to.equal(permission.name);
            expect(permissionUpserted.description).to.equal(
                permission.description
            );
        });

        it(`Test ${helper.testNumber++}: Upsert a permission`, () => {
            const user = {
                name: 'Ivo',
                groups: '',
            };
            const throwsError = () => lokijsAdapter.upsertUser(null, user);

            expect(throwsError).to.throw(`Cannot read property 'name' of null`);
        });
    });

    describe('Removals', () => {
        let lokijsAdapter;

        beforeEach(
            'Initialize a Sorting Gibbon to be able to remove data',
            async () => {
                lokijsAdapter = new LokiJSGibbonAdapter();
                await lokijsAdapter.initialize();
            }
        );

        it(`Test ${helper.testNumber++}: Remove a user`, () => {
            // Set some groups to a user
            const gibbon = Gibbon.create(256);
            gibbon.setPosition(1).setPosition(2).setPosition(10);

            const user = {
                name: 'Ivo',
                groups: gibbon.toString(),
            };

            const userAdded = lokijsAdapter.addUser(user);
            let userFound = lokijsAdapter.findUser({ name: 'Ivo' });
            expect(userFound).to.have.property('name');
            expect(userFound).to.have.property('groups');
            expect(userFound.name).to.equal(user.name);
            expect(userFound.groups).to.equal(user.groups);

            lokijsAdapter.removeUser({ name: 'Ivo' });

            userFound = lokijsAdapter.findUser({ name: 'Ivo' });
            expect(userFound).to.equal(null);
        });

        it(`Test ${helper.testNumber++}: Try to remove user with funny criteria`, () => {
            const throwsError = () => lokijsAdapter.removeUser(undefined);
            expect(throwsError).to.throw(
                `Cannot read property 'name' of undefined`
            );
        });

        it(`Test ${helper.testNumber++}: Remove a group`, () => {
            // Set some groups to a user
            const gibbon = Gibbon.create(256);
            gibbon.setPosition(1).setPosition(2).setPosition(10);

            const group = {
                name: 'user',
                description: 'Just regular People with an account',
                permissions: gibbon.toString(),
            };

            lokijsAdapter.addGroup(group);
            let groupFound = lokijsAdapter.findGroup({ name: 'user' });

            expect(groupFound).to.have.property('name');
            expect(groupFound).to.have.property('description');
            expect(groupFound).to.have.property('permissions');
            expect(groupFound.name).to.equal(group.name);
            expect(groupFound.description).to.equal(group.description);
            expect(groupFound.permissions).to.equal(group.permissions);

            lokijsAdapter.removeGroup({ name: 'user' });

            groupFound = lokijsAdapter.findGroup({ name: 'user' });
            expect(groupFound).to.equal(null);
        });

        it(`Test ${helper.testNumber++}: Remove a permission`, () => {
            const permission = {
                name: 'You may do this',
                description: "You've got the power now!",
            };

            lokijsAdapter.addPermission(permission);

            let permissionFound = lokijsAdapter.findPermission({
                name: 'You may do this',
            });

            expect(permissionFound).to.have.property('name');
            expect(permissionFound).to.have.property('description');
            expect(permissionFound.name).to.equal(permission.name);
            expect(permissionFound.description).to.equal(
                permission.description
            );

            lokijsAdapter.removePermission({ name: 'You may do this' });

            permissionFound = lokijsAdapter.findPermission({
                name: 'You may do this',
            });

            expect(permissionFound).to.equal(null);
        });
    });

    describe('Find things by user', () => {
        let lokijsAdapter;
        let groupPositionsAdded;
        let permissionPositionsAdded;

        beforeEach(
            'Initialize a Gibbon with some data to be able to query afterward',
            async () => {
                groupPositionsAdded = [];
                permissionPositionsAdded = [];
                lokijsAdapter = new LokiJSGibbonAdapter();
                await lokijsAdapter.initialize();

                // Prepare some permissions for an user group
                const gibbon1 = Gibbon.create(256).setAllFromPositions([1, 3]);
                const gibbon2 = Gibbon.create(256).setAllFromPositions([2, 4]);

                const user = {
                    name: 'Klaas',
                    groups: '',
                };

                const permissions = [
                    {
                        name: 'Do this',
                        description: 'You are granted to do this',
                    },
                    {
                        name: 'Do that',
                        description: 'You are also granted to do this',
                    },
                    {
                        name: 'Change it',
                        description: 'You too are granted to do this',
                    },
                    {
                        name: 'View it',
                        description: 'Yes you also are granted to do this',
                    },
                ];

                const groups = [
                    {
                        name: 'user',
                        description: 'Just regular People with an account',
                        permissions: gibbon1.toString(),
                    },
                    {
                        name: 'admin',
                        description: 'VIPS',
                        permissions: gibbon2.toString(),
                    },
                ];

                groupPositionsAdded = lokijsAdapter
                    .addGroups(groups)
                    .map(({ $loki }) => $loki)
                    .sort();

                permissionPositionsAdded = lokijsAdapter
                    .addPermissions(permissions)
                    .map(({ $loki }) => $loki)
                    .sort();

                const gibbon =
                    Gibbon.create(2).setAllFromPositions(groupPositionsAdded);
                user.groups = gibbon.toString();
                lokijsAdapter.addUser(user);
            }
        );

        it(`Test ${helper.testNumber++}: Find groups by user`, () => {
            const groupPositionsFound = lokijsAdapter
                .findGroupsByUser({ name: 'Klaas' })
                .map((group) => group.$loki)
                .sort();

            expect(groupPositionsFound).to.be.an('array');
            expect(groupPositionsFound).to.deep.equal(
                groupPositionsAdded.sort()
            );
        });

        it(`Test ${helper.testNumber++}: Find groups by non existing user PIET`, () => {
            const throwsError = () =>
                lokijsAdapter.findGroupsByUser({ name: 'PIET' });
            expect(throwsError).to.throw('user not found');
        });

        it(`Test ${helper.testNumber++}: Find permissions by user`, () => {
            const permissionPositionsFound = lokijsAdapter
                .findPermissionsByUser({ name: 'Klaas' })
                .map(({ $loki }) => $loki)
                .sort();

            expect(permissionPositionsFound).to.be.an('array');
            expect(permissionPositionsFound).to.deep.equal(
                permissionPositionsAdded.sort()
            );
        });

        it(`Test ${helper.testNumber++}: Find permissions by non existing user`, () => {
            const throwsError = () =>
                lokijsAdapter.findPermissionsByUser({ name: 'Henk' });
            expect(throwsError).to.throw('user not found');
        });
    });

    describe('Find things by group', () => {
        let lokijsAdapter;
        let groupPositionsAdded;
        let permissionPositionsAdded;

        beforeEach(
            'Initialize a Gibbon with some data to be able to query afterward',
            async () => {
                groupPositionsAdded = [];
                permissionPositionsAdded = [];
                lokijsAdapter = new LokiJSGibbonAdapter();
                await lokijsAdapter.initialize();

                // Prepare some permissions for an user group
                const gibbon1 = Gibbon.create(256).setAllFromPositions([1, 3]);
                const gibbon2 = Gibbon.create(256).setAllFromPositions([2, 4]);

                const users = [
                    {
                        name: 'Klaas',
                        groups: '',
                    },
                    {
                        name: 'Bob',
                        groups: '',
                    },
                    {
                        name: 'Hank',
                        groups: '',
                    },
                    {
                        name: 'Joan',
                        groups: '',
                    },
                ];

                const permissions = [
                    {
                        name: 'Do this',
                        description: 'You are granted to do this',
                    },
                    {
                        name: 'Do that',
                        description: 'You are also granted to do this',
                    },
                    {
                        name: 'Change it',
                        description: 'You too are granted to do this',
                    },
                    {
                        name: 'View it',
                        description: 'Yes you also are granted to do this',
                    },
                ];

                const groups = [
                    {
                        name: 'user',
                        description: 'Just regular People with an account',
                        permissions: gibbon1.toString(),
                    },
                    {
                        name: 'admin',
                        description: 'VIPS',
                        permissions: gibbon2.toString(),
                    },
                ];

                lokijsAdapter
                    .addGroups(groups)
                    .map(({ $loki }) => $loki)
                    .sort();

                permissionPositionsAdded = lokijsAdapter
                    .addPermissions(permissions)
                    .map(({ $loki }) => $loki)
                    .sort();

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
                gibbonGroups = Gibbon.create(2).setPosition(2);
                users[3].groups = gibbonGroups.toString();

                // Save users
                users.forEach((user) => lokijsAdapter.addUser(user));
            }
        );

        it(`Test ${helper.testNumber++}: Find users by group`, () => {
            const usersFound = lokijsAdapter.findUsersByGroup({ name: 'user' });
            expect(usersFound).to.be.an('array');
            expect(usersFound[0].name).to.equal('Hank');
            expect(usersFound[1].name).to.equal('Klaas');
        });

        it(`Test ${helper.testNumber++}: Find users by a funny group`, () => {
            const throwsError = () => {
                lokijsAdapter.findUsersByGroup({ name: 'usersssss' });
            };
            expect(throwsError).to.throw('Group not found');
        });
    });

    describe('Do things by permissions', () => {
        let groups;
        let lokijsAdapter;

        beforeEach(
            'Initialize a Gibbon with some data to be able to query afterward',
            async () => {
                groups = [];
                lokijsAdapter = new LokiJSGibbonAdapter();

                // Prepare some permissions for an user group
                const permissionGibbon1 = Gibbon.create(256).setPosition(1);
                const permissionGibbon2 = Gibbon.create(
                    256
                ).setAllFromPositions([2, 4]);
                const permissionGibbon3 = Gibbon.create(256).setPosition(3);

                const users = [
                    {
                        name: 'Klaas',
                        groups: '',
                    },
                    {
                        name: 'Bob',
                        groups: '',
                    },
                    {
                        name: 'Hank',
                        groups: '',
                    },
                    {
                        name: 'Joan',
                        groups: '',
                    },
                ];

                const permissions = [
                    {
                        name: 'Do this',
                        description: 'You are granted to do this',
                    },
                    {
                        name: 'Do that',
                        description: 'You are also granted to do this',
                    },
                    {
                        name: 'Change it',
                        description: 'You too are granted to do this',
                    },
                    {
                        name: 'View it',
                        description: 'Yes you also are granted to do this',
                    },
                ];

                const grs = [
                    {
                        name: 'user',
                        description: 'Just regular People with an account',
                        permissions: permissionGibbon1.toString(),
                    },
                    {
                        name: 'admin',
                        description: 'VIPS',
                        permissions: permissionGibbon2.toString(),
                    },
                    {
                        name: 'operator',
                        description: 'User who can operate certain things',
                        permissions: permissionGibbon3.toString(),
                    },
                ];
                groups = groups.concat(grs);

                await lokijsAdapter.initialize();

                lokijsAdapter.addGroups(groups);

                lokijsAdapter
                    .addPermissions(permissions)
                    .map(({ $loki }) => $loki)
                    .sort();

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
                users.forEach((user) => lokijsAdapter.addUser(user));
            }
        );

        it(`Test ${helper.testNumber++}: Find users by permission`, () => {
            const usersFound = lokijsAdapter.findUsersByPermission({
                name: 'Change it',
            });

            expect(usersFound).to.be.an('array');
            expect(usersFound[0].name).to.equal('Joan');
        });

        it(`Test ${helper.testNumber++}: Find groups by permission`, () => {
            const groupsFound = lokijsAdapter.findGroupsByPermission({
                name: 'Do this',
            });

            expect(groupsFound).to.be.an('array');
            expect(groupsFound[0].name).to.equal('user');
        });

        it(`Test ${helper.testNumber++}: Removes permission which should remove them from the groups also`, () => {
            lokijsAdapter.removePermission({ name: 'Do this' });

            // Fetch current situation from db with their gibbons
            const groups = lokijsAdapter.dbCollection['group'].find({});

            const gibbonFromGroupsArray = [];
            for (let i = 0; i < groups.length; i++) {
                const gibbon = Gibbon.fromString(groups[i].permissions);
                gibbonFromGroupsArray.push(gibbon);
            }

            const [gibbonFromGroups0, gibbonFromGroups1, gibbonFromGroups2] =
                gibbonFromGroupsArray;

            // Should be removed:
            const permission = lokijsAdapter.findPermission({
                name: 'Do this',
            });

            expect(Boolean(permission)).to.equal(false);

            // user (Permission `Do this` should be removed from this )
            let hasAll = gibbonFromGroups0.hasAllFromPositions([-1]);
            expect(hasAll).to.equal(true);

            // admin
            hasAll = gibbonFromGroups1.hasAllFromPositions([2, 4]);
            expect(hasAll).to.equal(true);

            // operator
            hasAll = gibbonFromGroups2.hasAllFromPositions([3]);
            expect(hasAll).to.equal(true);

            // Test when no criteria are given none are in criteria, which corresponds with element 1
            hasAll = gibbonFromGroups1.hasAllFromPositions();
            expect(hasAll).to.equal(true);
        });

        it(`Test ${helper.testNumber++}: Find groups by a funny permission`, () => {
            const throwsError = () =>
                lokijsAdapter.findGroupsByPermission({ name: 'not allowed' });
            expect(throwsError).to.throw('Permission not found');
        });

        it(`Test ${helper.testNumber++}: Find users by a funny permission`, () => {
            const throwsError = () =>
                lokijsAdapter.findUsersByPermission({ name: 'Do nothing;)' });
            expect(throwsError).to.throw('Permission not found');
        });
    });

    describe('Validate a user', () => {
        let lokijsAdapter;
        let groupPositionsAdded;

        beforeEach(
            'Initialize a Sorting Gibbon with some data to be able to query afterward',
            async () => {
                groupPositionsAdded = [];
                lokijsAdapter = new LokiJSGibbonAdapter();

                // Prepare some permissions for an user group
                const gibbon1 = Gibbon.create(256).setAllFromPositions([1, 3]);
                const gibbon2 = Gibbon.create(256).setAllFromPositions([2, 4]);

                const user = {
                    name: 'Klaas',
                    groups: '',
                };

                const permissions = [
                    {
                        name: 'Do this',
                        description: 'You are granted to do this',
                    },
                    {
                        name: 'Do that',
                        description: 'You are also granted to do this',
                    },
                    {
                        name: 'Change it',
                        description: 'You too are granted to do this',
                    },
                    {
                        name: 'View it',
                        description: 'Yes you also are granted to do this',
                    },
                ];

                const groups = [
                    {
                        name: 'user',
                        description: 'Just regular People with an account',
                        permissions: gibbon1.toString(),
                    },
                    {
                        name: 'admin',
                        description: 'VIPS',
                        permissions: gibbon2.toString(),
                    },
                ];

                await lokijsAdapter.initialize();

                groupPositionsAdded = lokijsAdapter
                    .addGroups(groups)
                    .map(({ $loki }) => $loki)
                    .sort();

                lokijsAdapter
                    .addPermissions(permissions)
                    .map(({ $loki }) => $loki)
                    .sort();

                const gibbon =
                    Gibbon.create(2).setAllFromPositions(groupPositionsAdded);
                user.groups = gibbon.toString();

                lokijsAdapter.addUser(user);
            }
        );

        it(`Test ${helper.testNumber++}: Validate all permissions from a user against no permissions`, () => {
            const valid = lokijsAdapter.validateUserWithAllPermissions(
                { name: 'Klaas' },
                []
            );
            expect(valid).to.equal(false);
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a user`, () => {
            const valid = lokijsAdapter.validateUserWithAllPermissions(
                { name: 'Klaas' },
                [1, 2, 3, 4]
            );
            expect(valid).to.equal(true);
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a user in a different order`, () => {
            const valid = lokijsAdapter.validateUserWithAllPermissions(
                { name: 'Klaas' },
                [2, 4, 3, 1]
            );
            expect(valid).to.equal(true);
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a user`, () => {
            const valid = lokijsAdapter.validateUserWithAllPermissions(
                { name: 'Klaas' },
                [1, 2, 3, 4, 5]
            );
            expect(valid).to.equal(false);
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a user in a different order`, () => {
            const valid = lokijsAdapter.validateUserWithAllPermissions(
                { name: 'Klaas' },
                [1, 5, 3, 4, 1]
            );
            expect(valid).to.equal(false);
        });

        it(`Test ${helper.testNumber++}: Validate all permissions from a non existing user`, () => {
            const throwsError = () =>
                lokijsAdapter.validateUserWithAllPermissions(
                    { name: 'Jan' },
                    [1, 2]
                );
            expect(throwsError).to.throw('user not found');
        });

        it(`Test ${helper.testNumber++}: Validate any permissions from a user against no permissions`, () => {
            const valid = lokijsAdapter.validateUserWithAnyPermissions(
                { name: 'Klaas' },
                []
            );
            expect(valid).to.equal(false);
        });

        it(`Test ${helper.testNumber++}: Validate any permissions from a user`, () => {
            const valid = lokijsAdapter.validateUserWithAnyPermissions(
                { name: 'Klaas' },
                [1, 2, 45]
            );
            expect(valid).to.equal(true);
        });

        it(`Test ${helper.testNumber++}: Validate any permissions from a user in a different order`, () => {
            const valid = lokijsAdapter.validateUserWithAnyPermissions(
                { name: 'Klaas' },
                [3, 1, 3456]
            );
            expect(valid).to.equal(true);
        });

        it(`Test ${helper.testNumber++}: Validate any permissions from a user in a different order`, () => {
            const valid = lokijsAdapter.validateUserWithAnyPermissions(
                { name: 'Klaas' },
                [35435]
            );
            expect(valid).to.equal(false);
        });

        it(`Test ${helper.testNumber++}: Validate any permissions from a non existing user`, () => {
            const throwsError = () =>
                lokijsAdapter.validateUserWithAnyPermissions(
                    { name: 'Jan' },
                    [1, 2]
                );
            expect(throwsError).to.throw('user not found');
        });

        it(`Test ${helper.testNumber++}: Try to add funny value as permissions`, () => {
            const throwsError = () => lokijsAdapter.addPermissions(undefined);
            expect(throwsError).to.throw('Document needs to be an object');
        });
    });
});
