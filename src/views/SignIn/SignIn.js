'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Validator from '../../modules/Validator/Validator.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import userService from '../../services/UserService/UserService.js';

export default class SignIn extends BaseView {
	build() {
		eventHandler.addHandler('btnSignInSubmit', () => this.submit());
		return new Promise((resolve) => {
			this.template = `<Label {{name=login}} {{class=signInErrorField}}>
						<Input {{name=login}} {{class=game-input signInInput}} {{placeholder=Enter your login}} {{check=loginMin loginMax}}>
						<Label {{name=password}} {{class=signInErrorField}}>
                        <Input {{name=password}} {{class=game-input signInInput}} {{placeholder=Enter your password}} {{type=password}} {{check=passwordMin passwordMax}}>
                        <Button {{class=buttonGame}} {{text=Sign in}} {{click=btnSignInSubmit}}>
                        <Button {{class=buttonGame}} {{text=Back}} {{click=goMenu}}>`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray;
				const div = document.createElement('div');
				div.setAttribute('class', 'signIn-page_menu');
				this.elementsArray.forEach((el) => {
					div.appendChild(el.render());
				});
				this.element = div;
				resolve();
			});
		});
	}

	submit() {
		if (this.validator.isValid()) {
			const requestBody = {};
			Object.keys(this.inputs).forEach((input) => {
				requestBody[input] = this.inputs[input].render().value;
			});
			userService.logIn(requestBody)
				.then((ans) => {
					this.errorLabels.login.render().innerText = this.errorMessages[ans] || 'Internal error';
					this.errorLabels.login.show();
					setTimeout(() => this.errorLabels.login.hide(), 3000);
				});
		}
	}

	afterRender() {
		return new Promise((resolve) => {
			this.mainEvent = this.submit;
			this.inputs = {
				login: this.elementsArray[1],
				password: this.elementsArray[3],
			};
			this.errorLabels = {
				login: this.elementsArray[0],
				password: this.elementsArray[2],
			};
			Object.keys(this.errorLabels).forEach((field) => {
				this.errorLabels[field].hide();
			});
			this.validator = new Validator(this.inputs, this.errorLabels);
			Object.keys(this.inputs).forEach((input) => {
				this.inputs[input].render().addEventListener('blur', () => {
					this.validator.checkInput(input);
				});
			});
			this.errorMessages = {
				400: 'Incorrect login or password',
			};
			resolve();
		});
	}
}
