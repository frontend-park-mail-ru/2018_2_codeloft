'use strict';

import Transport from '../../modules/Transport/Transport.js';

/**
 * Module user data
 * @module UserService
 */
class UserService {
	/**
     * @constructor
     */
	constructor() {
		this.user = null;
	}

	/**
     * Get data from backend
     * @return {Transport|*}
     */
	GetData() {
		return Transport.Get('/user').then((userData) => {
			this.user = userData;
		});
	}

	/**
     * Get user data
     * @return {*}
     */
	GetUser() {
		return this.user;
	}

	/**
     * Check, that user in system
     * @return {*}
     */
	IsLogIn() {
		return !!this.user;
	}

	/**
     * Log out user
     * @return {*}
     */
	LogOut() {
		return Transport.Post('/logout', {}).then(() => {
			this.user = null;
		});
	}
}

const userService = new UserService();

export default userService;