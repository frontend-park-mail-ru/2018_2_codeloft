'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Validation from '../../modules/Validation/Validation.js';
import UserService from '../../services/UserService/UserService.js';
import router from '../../modules/Router/Router.js';
import Transport from '../../modules/Transport/Transport.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';


export default class SignUp extends BaseView {
	build() {
		eventHandler.addHandler('btnSignUpSubmit', () => {
			if (this.isValid(this.inputs, this.errorsFields)) {
				let request = {};
				this.inputs.forEach(input => {
					if (input.name === 'login') {
						request.login = input.value;
					}
					if (input.name === 'email') {
						request.email = input.value;
					}
					if (input.name === 'password') {
						request.password = input.value;
					}
				});
				const adr = '/signup';

				Transport.Post(adr, request).then(() => {
					UserService.GetData().then(() => {
						router.go('/');
					}).catch((response) => {
						console.log(response);
					});
				}).catch((response) => {
					if (!response.json) {
						console.log(response);
						return;
					}
					response.json().then((json) => console.log(json));
				});
			}
		});

		this.template = `<Block {{name=login}} {{class=signUpErrorField}}>
						<Input {{name=login}} {{class=game-input signUpInput}} {{placeholder=Enter your login}}>
						<Block {{name=email}} {{class=signUpErrorField}}>
					    <Input {{name=email}} {{class=game-input signUpInput}} {{placeholder=Enter your email}}>
					    <Block {{name=password}} {{class=signUpErrorField}}>
                        <Input {{name=password}} {{class=game-input signUpInput}} {{placeholder=Enter your password}} {{type=password}}>
                        <Block {{name=passwordConfirm}} {{class=signUpErrorField}}>
                        <Input {{name=passwordConfirm}} {{class=game-input signUpInput}} {{placeholder=Repeat your password}} {{type=password}}>
                        <Button {{class=buttonGame}} {{text=Sign up}} {{click=btnSignUpSubmit}}>
                        <Button {{class=buttonGame}} {{text=Back}} {{click=goMenu}}>`;

        this.elementArray = tagParser.toHTML(this.template);
        const div = document.createElement("div");
        div.setAttribute('class', 'signUp-page_menu');
        this.elementArray.forEach(el => div.appendChild(el));
        this.element = div;
	}

	addEffects() {
		this.inputs = [...document.getElementsByClassName('signUpInput')];
		this.errorsFields = [...document.getElementsByClassName('signUpErrorField')];

		this.inputs.forEach((input, i) => {
			input.addEventListener('blur', () => {
				this.errorsFields[i].innerHTML = '';
				this.inputs[i].style.borderColor = 'black';
				this.isValid([input], [this.errorsFields[i]]);
			});
		});
	}

	showErrors(errors, errorFields, inputs) {
		errorFields.forEach((errorField, i) => {
			errors.forEach((err, i) => {
				if (errorField.getAttribute('name') === err.class[1]) {
					errorField.innerHTML = err.innerHTML;
					// inputs[i].style.borderColor = 'red';
				}
			});
		});
	}

	isValid(inputs = [], errorFields = []) {
		const errors = new Validation(this.inputs).checkAllFields();

		if (errors.length === 0) {
			return true;
		}
		this.showErrors(errors, errorFields, inputs);
		return false;
	}
}
