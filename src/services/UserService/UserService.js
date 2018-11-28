'use strict';

import Transport from '../../modules/Transport/Transport.js';
import eventBus from '../../modules/EventBus/EventBus.js';

/**
 * Module user data
 * @module UserService
 */
class UserService {
	/**
	 * @constructor
	 */
	constructor() {
		this._clearUserData();
		this.errorMessages = {
			400: 'Incorrect login or password',
		};
	}

	/**
	 * Get user data
	 * @return {*}
	 */
	getUserInfo(property) {
		return this.userInfo[property];
	}

	/**
	 * Check, that user in system
	 * @return {*}
	 */
	isLogIn() {
		return !!this.userInfo.login;
	}

	checkAuth() {
		return Transport.Get('/session')
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
				throw response.status;
			})
			.then((userInfo) => {
				this.userInfo = userInfo;
				return 'ok';
			}).catch(() => this._clearUserData());
	}

	/**
	 * Log out user
	 * @return {*}
	 */
	logOut(login, password) {
		const request = {
			login: login,
			password: password,
		};
		return Transport.Delete('/session', request)
			.then(() => {
				this._clearUserData();
				eventBus.emit('loggedOut');
				return 'ok';
			});
	}

	updateUser(score, password, email) {
		const requestBody = {};
		if (this.isLogIn()) {
			requestBody.login = this.userInfo.login;
			// requestBody. = this.userInfo.login;
			return Transport.Put('/user', requestBody);
		}
		return new Promise((resolve) => resolve());
	}

	logIn(requestBody) {
		return this._handleAuthResponse(Transport.Post('/session', requestBody));
	}

	register(requestBody) {
		return this._handleAuthResponse(Transport.Post('/user', requestBody));
	}

	_handleAuthResponse(_fetch) {
		return _fetch
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
				throw response.json();
			})
			.then((userInfo) => {
				this.userInfo = userInfo;
				eventBus.emit('loggedIn');
				return 'ok';
			})
			.catch((err) => err);
	}

	_clearUserData() {
		this.userInfo = {
			login: null,
			email: null,
			score: null,
		};
	}
}

const userService = new UserService();

export default userService;
