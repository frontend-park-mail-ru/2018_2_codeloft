'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import userService from '../../services/UserService/UserService.js';
import langService from '../../services/LangService/LangService.js';

import template from './UserInfo.hbs';
import './UserInfo.scss';

export default class UserInfo extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}

	afterRender() {
		this.loginLabel = this.element.getElementsByClassName('user-info-label')[0];
		this.emailLabel = this.element.getElementsByClassName('user-info-label')[1];
		this.scoreLabel = this.element.getElementsByClassName('user-info-label')[2];

		this.loginLabel.innerText = `${langService.getWord('profile.userName')}: ${userService.getUserInfo('login')}`;
		this.emailLabel.innerText = `${langService.getWord('signUp.email')}: ${userService.getUserInfo('email')}`;
		this.scoreLabel.innerText = `${langService.getWord('game.score')}: ${userService.getUserInfo('score')}`;
		return super.afterRender();
	}
}
