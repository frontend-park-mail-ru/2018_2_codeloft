'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import userService from '../../services/UserService/UserService.js';

export default class UserInfo extends MainComponent {
    constructor() {
        super();
        this.template = `<div>
        <p>User: ${userService.getUser('login')}</p>
        <p>Email: ${userService.getUser('email')}</p>
        <p>Score: ${userService.getUser('score')}</p>
        </div>`;
    }
}