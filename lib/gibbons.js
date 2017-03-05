'use strict';
const GibbonAdapter = require('./adapters/gibbon-adapter');

/**
 * @class
 *
 * This is the Gibbons class<br>
 * It's the entry point for group- and permission handling
 *
 * @param {GibbonAdapter} gibbonAdapter - An instance of GibbonAdapter is required.
 * @throws {TypeError} When given argument is not an instance of GibbonAdapter
 *
 */
function Gibbons(gibbonAdapter) {

    if (!(gibbonAdapter instanceof GibbonAdapter)) {
        throw new TypeError('adapter processor not of expected type');
    }
    const adapter = gibbonAdapter;

    Object.defineProperty(this, 'adapter', {
        get: function () {
            return adapter;
        }
    });
}

/**
 * Initializes Gibbons<br>
 * (it initializes the given adapter)
 *
 * @param {function} callback
 */
Gibbons.prototype.initialize = function (callback) {
    this.adapter.initialize(callback);
};

/**
 * Finds a user<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} criteria - User to find
 * @param {function} callback
 */
Gibbons.prototype.findUser = function (criteria, callback) {
    this.adapter.findUser(criteria, callback);
};

/**
 * Finds a group<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} criteria - Group to find
 * @param {function} callback
 */
Gibbons.prototype.findGroup = function (criteria, callback) {
    this.adapter.findGroup(criteria, callback);
};


/**
 * Finds a permission<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} criteria - Permission to find
 * @param {function} callback
 */
Gibbons.prototype.findPermission = function (criteria, callback) {
    this.adapter.findPermission(criteria, callback);
};

/**
 * Finds users attached to groups which contains a certain permission<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} criteria - permission to find users by
 * @param {function} callback
 */
Gibbons.prototype.findUsersByPermission = function (criteria, callback) {
    this.adapter.findUsersByPermission(criteria, callback);
};


/**
 * Finds users attached to a certain group<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} criteria - group to find users by
 * @param {function} callback
 */
Gibbons.prototype.findUsersByGroup = function (criteria, callback) {
    this.adapter.findUsersByGroup(criteria, callback);
};

/**
 * Finds groups attached to given permission<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} criteria - permission to find groups by
 * @param {function} callback
 */
Gibbons.prototype.findGroupsByPermission = function (criteria, callback) {
    this.adapter.findGroupsByPermission(criteria, callback);
};

/**
 * Adds a user<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} user - User to add
 * @param {function} callback
 */
Gibbons.prototype.addUser = function (user, callback) {
    this.adapter.addUser(user, callback);
};

/**
 * Add a group<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} group - Group to add
 * @param {function} callback
 */
Gibbons.prototype.addGroup = function (group, callback) {
    this.adapter.addGroup(group, callback);
};

/**
 * Adds an array of groups<br>
 * (Is delegated to a given adapter)
 *
 * @param {Array<object>} groups - Collection of groups to add
 * @param {function} callback
 */
Gibbons.prototype.addGroups = function (groups, callback) {
    this.adapter.addGroups(groups, callback);
};

/**
 * Add a permission<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} permission - Permission to add
 * @param {function} callback
 */
Gibbons.prototype.addPermission = function (permission, callback) {
    this.adapter.addPermission(permission, callback);
};

/**
 * Adds an array of permissions<br>
 * (Is delegated to a given adapter)
 *
 * @param {Array<object>} permissions - Collection of permissions to add
 * @param {function} callback
 */
Gibbons.prototype.addPermissions = function (permissions, callback) {
    this.adapter.addPermissions(permissions, callback);
};

/**
 * Removes a user<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} user - User criteria for removal of a certain user
 * @param {function} callback
 */
Gibbons.prototype.removeUser = function (user, callback) {
    this.adapter.removeUser(user, callback);
};

/**
 * Removes a group<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} group - Group criteria for removal of a certain group
 * @param {function} callback
 */
Gibbons.prototype.removeGroup = function (group, callback) {
    this.adapter.removeGroup(group, callback);
};

/**
 * Removes a permission<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} permission - Permission criteria for removal of a certain permission
 * @param {function} callback
 */
Gibbons.prototype.removePermission = function (permission, callback) {
    this.adapter.removePermission(permission, callback);
};

/**
 * Updates an existing user, and if not found inserts the user<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} criteria - User criteria to update when found
 * @param {object} user - Data to merge with existing user, or to insert
 * @param {function} callback
 */
Gibbons.prototype.upsertUser = function (criteria, user, callback) {
    this.adapter.upsertUser(criteria, user, callback);
};


/**
 * Updates an existing group, and if not found inserts the group<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} criteria - Group criteria to update when found
 * @param {object} group - Data to merge with existing group, or to insert
 * @param {function} callback
 */
Gibbons.prototype.upsertGroup = function (criteria, group, callback) {
    this.adapter.upsertGroup(criteria, group, callback);
};

/**
 * Updates an existing permission, and if not found inserts the permission<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} criteria - Permission criteria to update when found
 * @param {object} permission - Data to merge with existing permission, or to insert
 * @param {function} callback
 */
Gibbons.prototype.upsertPermission = function (criteria, permission, callback) {
    this.adapter.upsertPermission(criteria, permission, callback);
};

/**
 * Finds a group collection attached to this certain user<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} user - User criteria to find the corresponding groups
 * @param {function} callback
 */
Gibbons.prototype.findGroupsByUser = function (user, callback) {
    this.adapter.findGroupsByUser(user, callback);
};

/**
 * Finds a permission collection attached to this certain user<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} user - User criteria to find the corresponding permissions
 * @param {function} callback
 */
Gibbons.prototype.findPermissionsByUser = function (user, callback) {
    this.adapter.findPermissionsByUser(user, callback);
};

/**
 * Validates given user against given array of permission positions.
 * <b>All</b> given permissions need to be found at this given user<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} user - User as criteria to validate
 * @param {Array<Number>} permissions
 * @param {function} callback
 */
Gibbons.prototype.validateUserWithAllPermissions = function (user, permissions, callback) {
    this.adapter.validateUserWithAllPermissions(user, permissions, callback);
};

/**
 * Validates given user against given array of permission positions.
 * <b>If any</b> given permission is found attached to this given user<br>
 * (Is delegated to a given adapter)
 *
 * @param {object} user - User to validate permissions against
 * @param {Array<Number>} permissions - Permission collection of integers
 * @param {function} callback
 */
Gibbons.prototype.validateUserWithAnyPermissions = function (user, permissions, callback) {
    this.adapter.validateUserWithAnyPermissions(user, permissions, callback);
};


module.exports = Gibbons;
