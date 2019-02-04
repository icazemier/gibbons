const INHERITANCE_ERROR = 'Abstract method, override please.';
/**
 * This class should be inherited and acts as contract (Interface)
 * @abstract
 */
export class GibbonAdapter {

    /**
     * Initialize adapter
     * @abstract
     */
    initialize() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Add a user
     * @abstract
     */
    addUser() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Add user group
     * @abstract
     */
    addGroup() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Add array of user groups
     * @abstract
     */
    addGroups() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Add group permission
     * @abstract
     */
    addPermission() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Add array of permissions
     * @abstract
     */
    addPermissions() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Remove a user
     * @abstract
     */
    removeUser() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Remove a group
     * @abstract
     */
    removeGroup() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Remove a permission
     * @abstract
     */
    removePermission() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Update or insert user (if not exists)
     * @abstract
     */
    upsertUser() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Update or insert group (if not exists)
     * @abstract
     */
    upsertGroup() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Update or insert permission (if not exists)
     * @abstract
     */
    upsertPermission() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Find user groups
     * @abstract
     */
    findGroupsByUser() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Find user permissions
     * @abstract
     */
    findPermissionsByUser() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Find user
     * @abstract
     */
    findUser() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Find users with permission
     * @abstract
     */
    findUsersByPermission() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Find users with group
     * @abstract
     */
    findUsersByGroup() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Find groups with permission
     * @abstract
     */
    findGroupsByPermission() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Find group
     * @abstract
     */
    findGroup() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Find permission
     * @abstract
     */
    findPermission() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Validate a user against e.g. given permissions <br>
     * All permissions given, need to correspond with the permissions owned by this user.
     * @abstract
     */
    validateUserWithAllPermissions() {
        throw new Error(INHERITANCE_ERROR);
    }

    /**
     * Validate a user against e.g. given permissions <br>
     * When one of the given permissions are found at this user, user is valid.
     * @abstract
     */
    validateUserWithAnyPermissions() {
        throw new Error(INHERITANCE_ERROR);
    }
}
