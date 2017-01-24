'use strict';
const util = require('util');
const EventEmitter = require('events').EventEmitter;


const INHERITANCE_ERROR = 'Abstract method, override please.';
/**
 * @classdesc
 *
 * This class should be inherited and acts as contract (Interface)
 *
 * @extends EventEmitter
 * @class
 * @abstract
 */
function GibbonAdapter() {
    EventEmitter.call(this);
}

util.inherits(GibbonAdapter, EventEmitter);


/**
 * Initialize adapter
 *
 * @abstract
 */
GibbonAdapter.prototype.initialize = function () {
    throw new Error(INHERITANCE_ERROR);
};


GibbonAdapter.prototype.addUser = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Add user group
 *
 * @abstract
 */
GibbonAdapter.prototype.addGroup = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Add array of user groups
 *
 * @abstract
 */
GibbonAdapter.prototype.addGroups = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Add group permission
 * @abstract
 */
GibbonAdapter.prototype.addPermission = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Remove a user
 * @abstract
 */
GibbonAdapter.prototype.removeUser = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Remove a group
 * @abstract
 */
GibbonAdapter.prototype.removeGroup = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Remove a permission
 * @abstract
 */
GibbonAdapter.prototype.removePermission = function () {
    throw new Error(INHERITANCE_ERROR);
};


/**
 * Update or insert user (if not exists)
 * @abstract
 */
GibbonAdapter.prototype.upsertUser = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Update or insert group (if not exists)
 * @abstract
 */
GibbonAdapter.prototype.upsertGroup = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Update or insert permission (if not exists)
 * @abstract
 */
GibbonAdapter.prototype.upsertPermission = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Find user groups
 * @abstract
 */
GibbonAdapter.prototype.findGroupsByUser = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Find user permissions
 * @abstract
 */
GibbonAdapter.prototype.findPermissionsByUser = function () {
    throw new Error(INHERITANCE_ERROR);
};


/**
 * Find user
 * @abstract
 */
GibbonAdapter.prototype.findUser = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Find group
 * @abstract
 */
GibbonAdapter.prototype.findGroup = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Find permission
 * @abstract
 */
GibbonAdapter.prototype.findPermission = function () {
    throw new Error(INHERITANCE_ERROR);
};


/**
 * Validate a user against e.g. given permissions <br>
 * All permissions given, need to correspond with the permissions owned by this user.
 *
 * @abstract
 */
GibbonAdapter.prototype.validateUserWithAllPermissions = function () {
    throw new Error(INHERITANCE_ERROR);
};

/**
 * Validate a user against e.g. given permissions <br>
 * When one of the given permissions are found at this user, user is valid.
 * @abstract
 */
GibbonAdapter.prototype.validateUserWithAnyPermissions = function () {
    throw new Error(INHERITANCE_ERROR);
};

module.exports = GibbonAdapter;
