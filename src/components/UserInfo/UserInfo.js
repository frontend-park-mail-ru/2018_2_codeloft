'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import userService from '../../services/UserService/UserService.js';

export default class UserInfo extends MainComponent {
    constructor() {
        super();
        this.template = `<div>
        <p>User: ${userService.getUserInfo('login')}</p>
        <p>Email: ${userService.getUserInfo('email')}</p>
        <p>Score: ${userService.getUserInfo('score')}</p>
        </div>`;
    }
}