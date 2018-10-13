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
        this.userInfo = {
            'login' : null,
            'email' : null,
            'score' : null
        };
    }

    /**
     * Get user data
     * @return {*}
     */
    getUser(property) {
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
                return 'false';
            })
            .then((userInfo) => {
                this.userInfo = userInfo;
                return 'ok';
            });
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
                this.userInfo = {
                    'login' : null,
                    'email' : null,
                    'score' : null
                };
                eventBus.emit('loggedOut');
            });
    }

    logIn(login, password) {
        const requestBody = {
            'login': login,
            'password': password
        };
        Transport.Post('/session', requestBody)
            .then((response) => {
                if (response.status === 200) {
                    this.userInfo['login'] = requestBody['login'];
                    eventBus.emit('loggedIn');
                    return '';
                }
                throw response.status;
            })
            .catch((status) => console.log(status));
            // .then((userInfo) => {
            //     this.userInfo = userInfo;
            //     eventBus.emit('loggedIn');
            //     return 'ok';
            // });
    }

    register(login, email, password) {
        const requestBody = {
            'login': login,
            'email': email,
            'password': password
        };
        Transport.Post('/user', requestBody)
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
            });
    }
}

const userService = new UserService();

export default userService;