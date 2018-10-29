'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import userService from '../../services/UserService/UserService.js';

export default class UserInfo extends MainComponent {
	constructor() {
		super();
		this.template = `<div>
        <p class="profile-login"></p>
        <p class="profile-email"></p>
        <p class="profile-score"></p>
        </div>`;
	}

	afterRender() {
		this.loginLabel = this.element.getElementsByClassName('profile-login')[0];
		this.emailLabel = this.element.getElementsByClassName('profile-email')[0];
		this.scoreLabel = this.element.getElementsByClassName('profile-score')[0];

		this.loginLabel.innerText = 'User: ' + userService.getUserInfo('login');
		this.emailLabel.innerText = 'Email: ' + userService.getUserInfo('email');
		this.scoreLabel.innerText = 'Score: ' + userService.getUserInfo('score');
		return super.afterRender();
	}
}