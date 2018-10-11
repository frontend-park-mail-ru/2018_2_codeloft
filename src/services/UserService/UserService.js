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
        return Transport.Post('/session', requestBody)
            .then(response => {
                // Inspect the headers in the response
                response.headers.forEach(console.log);
                // OR you can do this
                for (let entry of response.headers.entries()) {
                    console.log(entry);
                }
            });
        //.then(ans => console.log(ans.headers.get('Set-Cookie')));
    }

    register(login, email, password) {
        let requestBody = {
            'login': login,
            'email': email,
            'password': password
        };
        Transport.Post('/user', requestBody)
            .then(response => {
                // Inspect the headers in the response
                response.headers.forEach(console.log);
                // OR you can do this
                for (let entry of response.headers.entries()) {
                    console.log(entry);
                }
            });// .then(ans => {
            //     console.log(ans.headers);
            //     return ans.json();
            // })
            // .then(answer => console.log(answer));
    }
}

const userService = new UserService();

export default userService;