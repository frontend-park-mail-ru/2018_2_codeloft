'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
//import Validator from '../../modules/Validator/Validator.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import userService from '../../services/UserService/UserService.js';

const validator = require('../../modules/Validator/Validator.js');

const Validator = validator.Validator;

export default class SignUp extends BaseView {
	build() {
		eventHandler.addHandler('btnSignUpSubmit', () => this.submit());
		return new Promise((resolve) => {
			this.template = `<Label {{name=login}} {{class=login-page_error}}>
						<Input {{name=login}} {{class=login-page__signUpInput}} {{placeholder=Enter your login}} {{check=loginMin loginMax russian}}>
						<Label {{name=email}} {{class=login-page_error}}>
					    <Input {{name=email}} {{class=login-page__signUpInput}} {{placeholder=Enter your email}} {{check=email russian}}>
					    <Label {{name=password}} {{class=login-page_error}}>
                        <Input {{name=password}} {{class=login-page__signUpInput}} {{placeholder=Enter your password}} {{type=password}} {{check=passwordMin passwordMax russian}}>
                        <Label {{name=passwordConfirm}} {{class=login-page_error}}>
                        <Input {{name=passwordConfirm}} {{class=login-page__signUpInput}} {{placeholder=Repeat your password}} {{type=password}} {{check=passwordsEquality russian}}>
                        <Button {{class=main-page__menu__button__do}} {{text=Sign up}} {{click=btnSignUpSubmit}}>
                        <Button {{class=main-page__menu__button}} {{text=Back}} {{click=goMenu}}>`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray.slice(0, 9);
				const form = document.createElement('form');
				this.elementsArray.forEach((el) => {
					form.appendChild(el.render());
				});
				const div = document.createElement('div');
				div.appendChild(form);
				div.appendChild(elementsArray[9].render());
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
			userService.register(requestBody)
				.then((ans) => {
					this.errorLabels.login.render().innerText = this.errorMessages[ans] || 'Internal error';
					this.errorLabels.login.show();
					setTimeout(() => this.errorLabels.login.hide(), 3000);
				});
		}
	}

	afterRender() {
		this.mainEvent = this.submit;
		return new Promise((resolve) => {
			this.inputs = {
				login: this.elementsArray[1],
				email: this.elementsArray[3],
				password: this.elementsArray[5],
				passwordConfirm: this.elementsArray[7],
			};
			this.errorLabels = {
				login: this.elementsArray[0],
				email: this.elementsArray[2],
				password: this.elementsArray[4],
				passwordConfirm: this.elementsArray[6],
			};
			Object.keys(this.errorLabels).forEach((label) => {
				this.errorLabels[label].hide();
			});
			this.validator = new Validator(this.inputs, this.errorLabels);
			Object.keys(this.inputs).forEach((input) => {
				this.inputs[input].render().addEventListener('blur', () => {
					this.validator.checkInput(input);
				});
			});
			this.errorMessages = {
				400: 'User with a such login already exists',
			};
			resolve();
		});
	}
}
