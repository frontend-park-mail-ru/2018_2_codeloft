'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import userService from '../../services/UserService/UserService.js';
import template from './UserInfo.hbs';

export default class UserInfo extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}

	afterRender() {
		this.loginLabel = this.element.getElementsByClassName('profile-login')[0];
		this.emailLabel = this.element.getElementsByClassName('profile-email')[0];
		this.scoreLabel = this.element.getElementsByClassName('profile-score')[0];

		this.loginLabel.innerText = `User: ${userService.getUserInfo('login')}`;
		this.emailLabel.innerText = `Email: ${userService.getUserInfo('email')}`;
		return super.afterRender();
	}
}
