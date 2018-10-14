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
        return !!this.userInfo['login'];
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
            }).catch((status) => console.log(status));
    }

    /**
     * Log out user
     * @return {*}
     */
    logOut(login, password) {
        const requestBody = {
            'login': login,
            'password': password
        };
        return Transport.Delete('/session', requestBody)
            .then(() => {
                this._clearUserData();
                eventBus.emit('loggedOut');
                return 'ok';
            });
    }

    logIn(login, password) {
        const requestBody = {
            'login': login,
            'password': password
        };
        this._handleAuthResponse(Transport.Post('/session', requestBody));
    }

    register(login, email, password) {
        const requestBody = {
            'login': login,
            'email': email,
            'password': password
        };
        this._handleAuthResponse(Transport.Post('/user', requestBody));
    }

    _handleAuthResponse(_fetch) {
        _fetch
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                throw response.status;
            })
            .then((userInfo) => {
                this.userInfo = userInfo;
                eventBus.emit('loggedIn');
                return 'ok';
            })
            .catch((status) => console.log(status));
    }

    _clearUserData() {
        this.userInfo = {
            'login': null,
            'email': null,
            'score': null
        };
    }
}

const userService = new UserService();

export default userService;