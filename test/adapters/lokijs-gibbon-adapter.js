import Loki from 'lokijs';
import _ from 'lodash';
import { Gibbon } from '../../src/index.mjs';

/**
 *
 * @type {{USER: string, GROUP: string, PERMISSION: string}}
 */
const COLLECTION = {
    USER: 'user',
    GROUP: 'group',
    PERMISSION: 'permission',
};

/**
 * Representing an adapter class for LokiJS<br>
 *     <b>(NOTE: This an example adapter, which is used to build and test Gibbons, and can be overridden. One is encouraged to write adapters themselves)</b>
 */
export class LokiJSGibbonAdapter {
    /**
     *
     * @param {*} options
     */
    constructor() {
        this.dbCollection = {};
        this.db = null;
    }

    /**
     * This gets a collection when not set, it will be created
     * @param {string} collectionName - document collection to be initialized
     * @private
     */
    _initializeCollection(collectionName) {
        this.dbCollection[collectionName] =
            this.db.getCollection(collectionName);

        if (!this.dbCollection[collectionName]) {
            this.dbCollection[collectionName] = this.db.addCollection(
                collectionName,
                {
                    unique: ['name'],
                }
            );
        }
    }

    /**
     * Generic Upsert method for user, group and permission collections
     *
     * @param {string} collection - Dynamic pointer to a collection
     * @param {object} criteria - In this adapter name is our unique reference for all collections
     * @param {object} data - Object to update or insert
     * @returns {object} [dataFound] - One instance of a fetched record
     * @private
     */
    _upsertByCollection(collection, criteria, data) {
        const dataFound = this.dbCollection[collection].findOne({
            name: criteria.name,
        });
        if (!dataFound) {
            return this.dbCollection[collection].insert(data);
        }
        const update = { ...dataFound, ...data };
        this.dbCollection[collection].update(update);
        return update;
    }

    /**
     * Generic private method to dynamically query the collection and fetch data
     * @param {string} name - Collection name to query
     * @param {object} criteria - Criteria for finding data
     * @returns {object} [userObject] - Instance of a fetched record
     * @private
     */
    _findByCollection(name, criteria) {
        return this.dbCollection[name].findOne(criteria);
    }

    /**
     * Initialize persistence storage itself and it's collections
     */
    async initialize() {
        const promise = new Promise((resolve, reject) => {
            this.db = new Loki('lokijs.db', {
                autosave: false,
                autoload: true,
                verbose: true,
                autoloadCallback: (error) =>
                    error ? reject(error) : resolve(),
            });
        });

        await promise;
        // Initialize all collections
        this._initializeCollection(COLLECTION.USER);
        this._initializeCollection(COLLECTION.GROUP);
        this._initializeCollection(COLLECTION.PERMISSION);
    }

    /**
     * Tries to fetch a user
     *
     * @param {object} criteria - LokiJS criteria
     * @returns @see {@link _findByCollection}
     */
    findUser(criteria) {
        return this._findByCollection(COLLECTION.USER, criteria);
    }

    /**
     * Tries to fetch users by a permission
     *
     * @param {object} criteria - LokiJS criteria
     * @returns {object} [users] - Collection of found users
     */
    findUsersByPermission(criteria) {
        const permission = this.findPermission(criteria);

        if (!permission) {
            throw new Error('Permission not found');
        }

        const permissionPosition = permission['$loki'];
        const groups = this.dbCollection[COLLECTION.GROUP].where((group) => {
            const gibbon = Gibbon.fromString(group.permissions);
            return gibbon.isPosition(permissionPosition);
        });

        const groupPositions = groups.map((group) => group['$loki']);

        const users = this.dbCollection[COLLECTION.USER].where((user) => {
            const gibbon = Gibbon.fromString(user.groups);
            return gibbon.hasAnyFromPositions(groupPositions);
        });
        return users;
    }

    /**
     * Tries to fetch users by a group
     *
     * @param {object} criteria - LokiJS criteria
     * @returns {object} [users] - Collection of found users
     */
    findUsersByGroup(criteria) {
        const group = this.findGroup(criteria);
        if (!group) {
            throw new Error('Group not found');
        }

        const groupPosition = group['$loki'];
        const users = this.dbCollection[COLLECTION.USER].where((user) => {
            const gibbon = Gibbon.fromString(user.groups);
            return gibbon.isPosition(groupPosition);
        });
        return users;
    }

    /**
     * Tries to fetch groups by a permission
     *
     * @param {object} criteria - LokiJS criteria
     * @returns {object} [users] - Collection of found groups
     */
    findGroupsByPermission(criteria) {
        const permission = this.findPermission(criteria);
        if (!permission) {
            throw new Error('Permission not found');
        }

        const permissionPosition = permission['$loki'];
        const groups = this.dbCollection[COLLECTION.GROUP].where((group) => {
            const gibbon = Gibbon.fromString(group.permissions);
            return gibbon.isPosition(permissionPosition);
        });
        return groups;
    }

    /**
     * Tries to fetch a group
     *
     * @param {object} criteria - LokiJS criteria
     * @returns @see {@link _findByCollection}
     */
    findGroup(criteria) {
        return this._findByCollection(COLLECTION.GROUP, criteria);
    }

    /**
     * Tries to find a permission
     *
     * @param {object} criteria - LokiJS criteria
     * @returns @see {@link _findByCollection}
     */
    findPermission(criteria) {
        return this._findByCollection(COLLECTION.PERMISSION, criteria);
    }

    /**
     * Add a user object to the user collection
     *
     * @param {object} user - The user object
     * @returns {object} [user] - Added user
     */
    addUser(user) {
        this.dbCollection[COLLECTION.USER].insert(user);
        return user;
    }

    /**
     * Add a group object to the group collection
     *
     * @param {object} group - The group object
     * @returns {object} [user] - Added group
     */
    addGroup(group) {
        this.dbCollection[COLLECTION.GROUP].insert(group);
        return group;
    }

    /**
     * Add a groups from array to the group collection
     *
     * @param {Array} groups - The group object
     * @returns {Array} [groups] - Added groups
     */
    addGroups(groups) {
        this.dbCollection[COLLECTION.GROUP].insert(groups);
        return groups;
    }

    /**
     * Add a permission object to the permission collection
     *
     * @param {object} permission - The permission object
     * @returns {object} [permission] - Added permissions
     */
    addPermission(permission) {
        this.dbCollection[COLLECTION.PERMISSION].insert(permission);
        return permission;
    }

    /**
     * Add a permission from array to the permission collection
     *
     * @param {Array} permissions - The permission object
     * @returns {Array} [permissions] - Inserted permissions
     */
    addPermissions(permissions) {
        this.dbCollection[COLLECTION.PERMISSION].insert(permissions);
        return permissions;
    }

    /**
     * Remove a user from the user collection
     *
     * @param {object} user
     */
    removeUser(user) {
        this.dbCollection[COLLECTION.USER].findAndRemove({ name: user.name });
    }

    /**
     * Tries to fetch the given group, if found it does a cascaded removal of the groups stored in all users
     * Then removes the mentioned group from the group collection itself
     *
     * @param {object} group
     */
    removeGroup({ name }) {
        const groupFound = this.dbCollection[COLLECTION.GROUP].findOne({
            name,
        });
        const groupFoundPosition = groupFound['$loki'];
        if (groupFoundPosition !== undefined) {
            // Remove ALL associated permissions stored at users @see: https://techfort.github.io/LokiJS/Collection.html#findAndUpdate
            this.dbCollection[COLLECTION.USER].findAndUpdate({}, (user) => {
                if (typeof user.groups === 'string') {
                    const gibbon = Gibbon.fromString(user.groups);
                    gibbon.clearPosition(groupFoundPosition);
                    user.groups = gibbon.toString();
                }
            });
        }
        // Last step, to remove the record itself.
        this.dbCollection[COLLECTION.GROUP].findAndRemove({
            $loki: groupFoundPosition,
        });
    }

    /**
     * Tries to fetch the given permission, if found it does a cascaded removal of the permissions stored in all groups
     * Then removes the mentioned permission from the permission collection itself
     *
     * @param {object} permission
     */
    removePermission({ name }) {
        const permissionFound = this.dbCollection[
            COLLECTION.PERMISSION
        ].findOne({ name });
        const permissionFoundPosition = permissionFound['$loki'];
        if (permissionFoundPosition !== undefined) {
            // Remove all associated permissions stored at groups
            this.dbCollection[COLLECTION.GROUP].findAndUpdate({}, (group) => {
                if (typeof group.permissions === 'string') {
                    const gibbon = Gibbon.fromString(group.permissions);
                    gibbon.clearPosition(permissionFoundPosition);
                    group.permissions = gibbon.toString();
                }
            });
        }
        // Last step, to remove the record itself.
        this.dbCollection[COLLECTION.PERMISSION].findAndRemove({
            $loki: permissionFoundPosition,
        });
    }

    /**
     * Insert or update a user (if not exists)
     *

     * @param {object} criteria - Where to find in case of update
     * @param {object} user - The user to update or insert
     */
    upsertUser(criteria, user) {
        return this._upsertByCollection(COLLECTION.USER, criteria, user);
    }

    /**
     * Insert or update group (if not exists)
     *
     *
     *
     * @param {object} criteria - LokiJS criteria
     * @param {object} group - Group object
     * @returns @see {@link _upsertByCollection}
     */
    upsertGroup(criteria, group) {
        return this._upsertByCollection(COLLECTION.GROUP, criteria, group);
    }

    /**
     * Insert or update a permission (if not exists)
     *
     *
     *
     * @param {object} criteria - LokiJS criteria
     * @param {object} permission - Permission object
     * @returns @see {@link _upsertByCollection}
     */
    upsertPermission(criteria, permission) {
        return this._upsertByCollection(
            COLLECTION.PERMISSION,
            criteria,
            permission
        );
    }

    /**
     * Tries to fetch a collection of groups
     *
     * @param {object} user - user object
     * @returns {Array} [groups] - Fetched groups from one given user
     */
    findGroupsByUser(user) {
        // Fetch user from lokijs
        const userFound = this.dbCollection[COLLECTION.USER].findOne({
            name: user.name,
        });
        if (!userFound) {
            throw new Error('user not found');
        }
        // construct a new Gibbon instance from encoded groups
        const gibbon = Gibbon.fromString(userFound.groups);
        // Fetch lokijs groups from group collection
        const positions = gibbon.getPositionsArray();
        const criteria = { $loki: { $in: positions } };
        const groups = this.dbCollection[COLLECTION.GROUP].find(criteria);
        return groups;
    }

    /**
     * Given a user, it tries to fetch it's permissions
     *
     * @param {object} user - Instance of a user object
     * @param {Array} [permissions] - Fetched permissions from one given user
     */
    findPermissionsByUser(user) {
        let permissions = [];
        const groups = this.findGroupsByUser(user);

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            const permissionsFromGroup = group.permissions;
            const gibbon = Gibbon.fromString(permissionsFromGroup);
            const permissionBitPositions = gibbon.getPositionsArray();
            permissions = permissions.concat(permissionBitPositions);
            permissions = Array.from(new Set(permissions));
        }

        permissions = permissions.sort((a, b) => a - b);

        const criteria = { $loki: { $in: permissions } };
        const permissionsFound =
            this.dbCollection[COLLECTION.PERMISSION].find(criteria);
        return permissionsFound;
    }

    /**
     * Validate a user against all given permissions <br>
     * When one of the given permissions is missing for the given user,<br>
     * given user is not valid.
     *
     * @param {object} user - User to validate
     * @param {Array<Number>} permissions - Array with unsigned integers with permissions (positions starting at 1)
     * @returns {boolean} valid - When valid or not
     */
    validateUserWithAllPermissions(user, permissions) {
        const permissionsFound = this.findPermissionsByUser(user);
        let valid = false;

        if (!Array.isArray(permissions) || permissions.length <= 0) {
            return false;
        }
        const permissionsAttachedToUser = permissionsFound.map(
            (permission) => permission['$loki']
        );
        // TODO: Remove dependency on lodash
        const missingPermissions = _.difference(
            permissions,
            permissionsAttachedToUser
        );
        valid =
            (Array.isArray(missingPermissions) &&
                missingPermissions.length > 0) === false;
        return valid;
    }

    /**
     * Validate a user against any given permissions <br>
     * When one of the given permissions is found for the given user,<br>
     * the outcome is valid.
     * @param {object} user - User to validate
     * @param {Array<Number>} permissions - Array with unsigned integers with permissions (positions starting at 1)
     * @returns {boolean} valid - When valid or not
     */
    validateUserWithAnyPermissions(user, permissions) {
        const permissionsFound = this.findPermissionsByUser(user);

        if (!Array.isArray(permissions) || permissions.length <= 0) {
            return false;
        }
        const permissionsAttachedToUser = permissionsFound.map((permission) => {
            return permission['$loki'];
        });
        // TODO: Remove dependency on lodash
        const overlappingPermissions = _.intersection(
            permissions,
            permissionsAttachedToUser
        );
        return (
            (Array.isArray(overlappingPermissions) &&
                overlappingPermissions.length > 0) === true
        );
    }
}
