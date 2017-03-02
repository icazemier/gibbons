'use strict';
const util = require('util');
const _ = require('lodash');
const Loki = require('lokijs');
const GibbonAdapter = require('./gibbon-adapter');
const Gibbon = require('../gibbon');

/**
 *
 * @type {{USER: string, GROUP: string, PERMISSION: string}}
 */
const COLLECTION = {
    USER: 'user',
    GROUP: 'group',
    PERMISSION: 'permission'
};

/**
 * @classdesc
 * Representing an adapter class for LokiJS<br>
 *     <b>(NOTE: This an example adapter, which is used to build and test Gibbons, and can be overridden. One is encouraged to write adapters themselves)</b>
 *
 * @class
 * @augments GibbonAdapter
 * @param {object} [logger] - Logger instance
 */
function LokiJSGibbonAdapter(logger) {
    GibbonAdapter.call(this);

    Object.defineProperty(this, 'logger', {
        writable: true,
        enumerable: true,
        configurable: false,
        value: logger || console
    });

    Object.defineProperty(this, 'dbCollection', {
        writable: true,
        enumerable: true,
        configurable: false,
        value: {}
    });

    Object.defineProperty(this, 'db', {
        writable: true,
        enumerable: true,
        configurable: false,
        value: null
    });

}

util.inherits(LokiJSGibbonAdapter, GibbonAdapter);

/**
 * This gets a collection when not set, it will be created
 * @param {string} collectionName - document collection to be initialized
 * @private
 */
LokiJSGibbonAdapter.prototype._initializeCollection = function (collectionName) {

    this.dbCollection[collectionName] = this.db.getCollection(collectionName);

    if (!this.dbCollection[collectionName]) {
        this.dbCollection[collectionName] = this.db.addCollection(collectionName, {
            unique: ['name']
        });
    }
};

/**
 * Callback when upsert is done (insert or update existing).
 * @callback LokiJSGibbonAdapter~_upsertByName
 * @param {Error} [error=null] - Error is omitted
 * @param {object} [dataFound] - One instance of a fetched record
 *
 */

/**
 * Generic Upsert method for user, group and permission collections
 *
 * @param {string} collection - Dynamic pointer to a collection
 * @param {object} criteria - In this adapter name is our unique reference for all collections
 * @param {object} data - Object to update or insert
 * @param {LokiJSGibbonAdapter~_upsertByName} callback
 * @private
 */
LokiJSGibbonAdapter.prototype._upsertByName = function (collection, criteria, data, callback) {
    try {
        let dataFound = this.dbCollection[collection].findOne({name: criteria.name});
        if (!dataFound) {
            dataFound = this.dbCollection[collection].insert(data);
        } else {
            dataFound = _.merge(dataFound, data);
            this.dbCollection[collection].update(dataFound);
        }
        callback(null, dataFound);
    } catch (error) {
        return callback(error);
    }
};

/**
 * Callback when initializing is done.
 * @callback LokiJSGibbonAdapter~findByNameCallback
 * @param {Error} [error=null] - Error is omitted
 * @param {object} [userObject] - One instance of a fetched record
 *
 */

/**
 * Generic private method to dynamically query the collection and fetch data
 * @param {string} name - Collection name to query
 * @param {object} criteria - Criteria for finding data
 * @param {LokiJSGibbonAdapter~findByNameCallback} callback
 * @private
 */
LokiJSGibbonAdapter.prototype._findByName = function (name, criteria, callback) {
    try {
        const found = this.dbCollection[name].findOne(criteria);
        callback(null, found);
    } catch (error) {
        callback(error);
    }
};

/**
 * Callback when initializing is done.
 * @callback LokiJSGibbonAdapter~initializeCallback
 */

/**
 * Initialize persistence storage itself and it's collections
 * @param {LokiJSGibbonAdapter~initializeCallback} callback - Callback when done
 */
LokiJSGibbonAdapter.prototype.initialize = function (callback) {
    const self = this;

    this.db = new Loki('lokijs.db', {
        autosave: false,
        autoload: true,
        verbose: true,
        autoloadCallback: loadHandler,
    });

    function loadHandler() {

        // Initialize all collections
        self._initializeCollection(COLLECTION.USER);
        self._initializeCollection(COLLECTION.GROUP);
        self._initializeCollection(COLLECTION.PERMISSION);

        callback();
    }
};

/**
 * Callback when initializing is done.
 * @callback LokiJSGibbonAdapter~findUser
 * @see _findByName
 */

/**
 * Tries to fetch a user
 * @param {object} criteria - LokiJS criteria
 * @param {LokiJSGibbonAdapter~findUser} callback
 */
LokiJSGibbonAdapter.prototype.findUser = function (criteria, callback) {
    this._findByName(COLLECTION.USER, criteria, callback);
};

/**
 * Callback when fetching is done.
 * @callback LokiJSGibbonAdapter~findUsersByPermission
 * @param {Error} [error=null] - Error is omitted
 * @param {object} [users] - Collection of found users
 *
 */

/**
 * Tries to fetch users by a permission
 * @param {object} criteria - LokiJS criteria
 * @param {LokiJSGibbonAdapter~findUsersByPermission} callback
 */
LokiJSGibbonAdapter.prototype.findUsersByPermission = function (criteria, callback) {

    const self = this;
    self.findPermission(criteria, (error, permission) => {

        if (error) {
            return callback(error);
        }
        if (!permission) {
            return callback(new Error('Permission not found'));
        }

        try {
            const permissionPosition = permission['$loki'];
            const groups = self.dbCollection[COLLECTION.GROUP].where((group) => {
                const gibbon = Gibbon.fromString(group.permissions);
                return gibbon.isPosition(permissionPosition);
            });

            const groupPositions = _.map(groups, '$loki');
            const users = self.dbCollection[COLLECTION.USER].where((user) => {
                const gibbon = Gibbon.fromString(user.groups);
                return gibbon.hasAnyFromPositions(groupPositions);
            });
            callback(null, users);
        } catch (error) {
            callback(error);
        }

    });
};


/**
 * Tries to fetch users by a group
 * @param {object} criteria - LokiJS criteria
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.findUsersByGroup = function (criteria, callback) {
    const self = this;

    self.findGroup(criteria, (error, group) => {

        if (error) {
            return callback(error);
        }
        if (!group) {
            return callback(new Error('Group not found'));
        }

        try {
            const groupPosition = group['$loki'];
            const users = self.dbCollection[COLLECTION.USER].where((user) => {
                const gibbon = Gibbon.fromString(user.groups);
                return gibbon.isPosition(groupPosition);
            });
            callback(null, users);
        } catch (error) {
            callback(error);
        }

    });


};


/**
 * Tries to fetch groups by a permission
 * @param {object} criteria - LokiJS criteria
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.findGroupsByPermission = function (criteria, callback) {

    const self = this;
    self.findPermission(criteria, (error, permission) => {

        if (error) {
            return callback(error);
        }
        if (!permission) {
            return callback(new Error('Permission not found'));
        }

        try {
            const permissionPosition = permission['$loki'];
            const groups = self.dbCollection[COLLECTION.GROUP].where((group) => {
                const gibbon = Gibbon.fromString(group.permissions);
                return gibbon.isPosition(permissionPosition);
            });
            callback(null, groups);
        } catch (error) {
            callback(error);
        }

    });

};

/**
 * Tries to fetch a group
 * @param {object} criteria - LokiJS criteria
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.findGroup = function (criteria, callback) {
    this._findByName(COLLECTION.GROUP, criteria, callback);
};

/**
 * Tries to find a permission
 * @param {object} criteria - LokiJS criteria
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.findPermission = function (criteria, callback) {
    this._findByName(COLLECTION.PERMISSION, criteria, callback);
};


/**
 * Add a user object to the user collection
 * @param {object} user - The user object
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.addUser = function (user, callback) {
    try {
        this.dbCollection[COLLECTION.USER].insert(user);
        callback(null, user);
    } catch (error) {
        callback(error);
    }

};

/**
 * Add a group object to the group collection
 * @param {object} group - The group object
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.addGroup = function (group, callback) {
    try {
        this.dbCollection[COLLECTION.GROUP].insert(group);
        callback(null, group);
    } catch (error) {
        callback(error);
    }
};

/**
 * Add a groups from array to the group collection
 * @param {Array} groups - The group object
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.addGroups = function (groups, callback) {
    try {
        this.dbCollection[COLLECTION.GROUP].insert(groups);
        callback(null, groups);
    } catch (error) {
        callback(error);
    }
};

/**
 * This callback with an optional LokiJS error?
 * @callback LokiJSGibbonAdapter~addPermission
 * @param {Error} [error] - This could contain an error emitted by LokiJS
 * @param {object} [permission] - Inserted permission
 */

/**
 * Add a permission object to the permission collection
 * @param {object} permission - The permission object
 * @param {LokiJSGibbonAdapter~addPermission} callback
 */
LokiJSGibbonAdapter.prototype.addPermission = function (permission, callback) {
    try {
        this.dbCollection[COLLECTION.PERMISSION].insert(permission);
        callback(null, permission);
    } catch (error) {
        callback(error);
    }
};

/**
 * This callback with an optional LokiJS error?
 * @callback LokiJSGibbonAdapter~addPermissions
 * @param {Error} [error] - This could contain an error emitted by LokiJS
 * @param {Array} [permissions] - Inserted permissions
 */

/**
 * Add a permission from array to the permission collection
 * @param {Array} permissions - The permission object
 * @param {LokiJSGibbonAdapter~addPermissions} callback
 */
LokiJSGibbonAdapter.prototype.addPermissions = function (permissions, callback) {
    try {
        this.dbCollection[COLLECTION.PERMISSION].insert(permissions);
        callback(null, permissions);
    } catch (error) {
        callback(error);
    }
};


/**
 * This callback with an optional LokiJS error?
 * @callback LokiJSGibbonAdapter~removeUser
 * @param {Error} [error] - This could contain an error emitted by LokiJS
 */

/**
 * Remove a user from the user collection
 * @param {object} user
 * @param {LokiJSGibbonAdapter~removeUser} callback
 */
LokiJSGibbonAdapter.prototype.removeUser = function (user, callback) {
    try {
        this.dbCollection[COLLECTION.USER].findAndRemove({name: user.name});
        callback();
    } catch (error) {
        callback(error);
    }
};

/**
 * Remove a group from the group collection
 * @param {object} group
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.removeGroup = function (group, callback) {
    try {
        this.dbCollection[COLLECTION.GROUP].findAndRemove({name: group.name});
        callback();
    } catch (error) {
        return callback(error);
    }
};

/**
 * Remove a permission from the permission collection
 * @param permission
 * @param callback
 * @returns {*}
 */
LokiJSGibbonAdapter.prototype.removePermission = function (permission, callback) {
    try {
        const permissionFound = this.dbCollection[COLLECTION.PERMISSION].findOne({name: permission.name});
        const permissionFoundPosition = permissionFound['$loki'];
        if (permissionFoundPosition !== undefined) {

            // Remove all associated permissions stored at groups
            this.dbCollection[COLLECTION.GROUP].findAndUpdate({'$loki': {'$gt': 0}}, (group) => {
                if (typeof group.permissions === 'string') {
                    const gibbon = Gibbon.fromString(group.permissions);
                    gibbon.clearPosition(permissionFoundPosition);
                    group.permissions = gibbon.toString();
                }
            });
        }
        // Last step, to remove the record itself.
        this.dbCollection[COLLECTION.PERMISSION].findAndRemove({'$loki': permissionFoundPosition});
        callback();
    } catch (error) {
        callback(error);
    }
};

/**
 * Insert or update a user (if not exists)
 * @override
 * @param {object} criteria - Where to find in case of update
 * @param {object} user - The user to update or insert
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.upsertUser = function (criteria, user, callback) {
    this._upsertByName(COLLECTION.USER, criteria, user, callback);
};

/**
 * Insert or update group (if not exists)
 * @override
 * @param {object} criteria - LokiJS criteria
 * @param {Gibbon} group
 * @param callback
 */
LokiJSGibbonAdapter.prototype.upsertGroup = function (criteria, group, callback) {
    this._upsertByName(COLLECTION.GROUP, criteria, group, callback);
};

/**
 * Insert or update permissions (if not exists)
 * @override
 * @param {object} criteria - LokiJS criteria
 * @param permission
 * @param callback
 */
LokiJSGibbonAdapter.prototype.upsertPermission = function (criteria, permission, callback) {
    this._upsertByName(COLLECTION.PERMISSION, criteria, permission, callback);
};


/**
 * Tries to fetch a collection of Hats representing groups
 * @override
 * @param {object} user - user object
 * @param callback
 */
LokiJSGibbonAdapter.prototype.findGroupsByUser = function (user, callback) {
    try {
        // Fetch user from lokijs
        const userFound = this.dbCollection[COLLECTION.USER].findOne({name: user.name});
        if (!userFound) {
            return callback(new Error('user not found'));
        }
        // construct a new Gibbon instance from encoded groups
        const gibbon = Gibbon.fromString(userFound.groups);
        // Fetch lokijs groups from group collection
        const positions = gibbon.getPositionsArray();
        const criteria = {'$loki': {'$in': positions}};
        const groups = this.dbCollection[COLLECTION.GROUP].find(criteria);
        callback(null, groups);
    } catch (error) {
        callback(error);
    }

};

/**
 * Given a user, it tries to fetch it's permissions
 * @param {object} user - Instance of a user object
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.findPermissionsByUser = function (user, callback) {
    const self = this;
    let permissions = [];
    this.findGroupsByUser(user, (err, groups) => {

        if (err) {
            return callback(err);
        }

        let i = 0;
        for (i; i < groups.length; i++) {
            const group = groups[i];
            const permissionsFromGroup = group.permissions;
            const gibbon = Gibbon.fromString(permissionsFromGroup);
            const permissionBitPositions = gibbon.getPositionsArray();
            permissions = permissions.concat(permissionBitPositions);
            permissions = _.uniq(permissions);
        }

        permissions = permissions.sort(function sortNumber(a, b) {
            return a - b;
        });

        const criteria = {'$loki': {'$in': permissions}};
        const permissionsFound = self.dbCollection[COLLECTION.PERMISSION].find(criteria);
        return callback(null, permissionsFound);

    });
};


/**
 * Validate a user against all given permissions <br>
 * When one of the given permissions is missing for the given user,<br>
 * given user is not valid.
 *
 * @param {object} user - User to validate
 * @param {Array<Number>} permissions - Array with unsigned integers with permissions (positions starting at 1)
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.validateUserWithAllPermissions = function (user, permissions, callback) {
    let valid = false;
    this.findPermissionsByUser(user, (error, permissionsFound) => {
        if (error) {
            return callback(error, valid);
        }

        if (!(Array.isArray(permissions)) || permissions.length <= 0) {
            return callback(null, valid);
        }
        const permissionsAttachedToUser = _.map(permissionsFound, '$loki');
        const missingPermissions = _.difference(permissions, permissionsAttachedToUser);
        valid = !(Array.isArray(missingPermissions) && missingPermissions.length > 0);
        callback(null, valid);
    });
};

/**
 * Validate a user against any given permissions <br>
 * When one of the given permissions is found for the given user,<br>
 * the outcome is valid.
 *
 * @param {object} user - User to validate
 * @param {Array<Number>} permissions - Array with unsigned integers with permissions (positions starting at 1)
 * @param {function} callback
 */
LokiJSGibbonAdapter.prototype.validateUserWithAnyPermissions = function (user, permissions, callback) {
    let valid = false;
    this.findPermissionsByUser(user, (error, permissionsFound) => {
        if (error) {
            return callback(error, valid);
        }
        if (!(Array.isArray(permissions)) || permissions.length <= 0) {
            return callback(null, valid);
        }
        const permissionsAttachedToUser = _.map(permissionsFound, '$loki');
        const overlappingPermissions = _.intersection(permissions, permissionsAttachedToUser);
        valid = (Array.isArray(overlappingPermissions) && overlappingPermissions.length > 0);
        callback(null, valid);
    });
};

module.exports = LokiJSGibbonAdapter;






