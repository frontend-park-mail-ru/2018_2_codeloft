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

    /**
     * Log out user
     * @return {*}
     */
    logOut() {
        return Transport.Post('/logout', {}).then(() => {
            this.user = null;
        });
    }

    logIn(login, password) {
        let requestBody = {
            'login': login,
            'password': password
        };
        return Transport.Post('/session', requestBody);
    }

    register(login, email, password) {
        let requestBody = {
            'login': login,
            'email': email,
            'password': password
        };
        Transport.Post('/user', requestBody)
            .then(ans => ans.json())
            .then(answer => console.log(answer));
    }
}

const userService = new UserService();

export default userService;