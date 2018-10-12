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
        this.user = null;

    }

    /**
     * Get data from backend
     * @return {Transport|*}
     */
    getData() {
        return Transport.Get('/user').then((userData) => {
            this.user = userData;
        });
    }

    /**
     * Get user data
     * @return {*}
     */
    getUser() {
        return this.user;
    }

    /**
     * Check, that user in system
     * @return {*}
     */
    isLogIn() {
        return !!this.user;
    }

    checkAuth() {
        return Transport.Get('/session')
            .then((response) => {
                if (response.status === 200) {
                    return true;
                } else {
                    return false;
                }
            });
    }

    /**
     * Log out user
     * @return {*}
     */
    logOut(login, password) {
        let requestBody = {
            'login': login,
            'password': password
        };
        return Transport.Delete('/session', requestBody)
            .then(response => {
                // Inspect the headers in the response
                response.headers.forEach(console.log);
                // OR you can do this
                for (let entry of response.headers.entries()) {
                    console.log(entry);
                }
            });
    }

    logIn(login, password) {
        eventBus.emit('loggedIn');
        let requestBody = {
            'login': login,
            'password': password
        };
        return Transport.Post('/session', requestBody)
            .then((response) => {
                if (response.status === 200) {
                    this.user = requestBody['login'];
                }
            });
    }

    register(login, email, password) {
        let requestBody = {
            'login': login,
            'email': email,
            'password': password
        };
        Transport.Post('/user', requestBody)
            .then(response => response.json())
            .then((user) => {
                this.user = user['login'];
            });
    }
}

const userService = new UserService();

export default userService;