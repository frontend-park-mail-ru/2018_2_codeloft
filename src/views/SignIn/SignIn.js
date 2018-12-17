'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import userService from '../../services/UserService/UserService.js';
import langService from '../../services/LangService/LangService.js';
import Validator from '../../modules/Validator/Validator.js';

export default class SignIn extends BaseView {
	build() {
		eventHandler.addHandler('btnSignInSubmit', () => this.submit());
		return new Promise((resolve) => {
			this.template = `<Label {{name=login}} {{class=error-label}}>
						<Input {{name=login}} {{class=input}} {{placeholder=${langService.getWord('signIn.login')}}} {{check=loginMin loginMax russian}}>
						<Label {{name=password}} {{class=error-label}}>
                        <Input {{name=password}} {{class=input}} {{placeholder=${langService.getWord('signIn.password')}}} {{type=password}} {{check=passwordMin passwordMax russian}}>
                        <Button {{class=main-button signIn-form__submit-button}} {{text=${langService.getWord('main.signIn')}}} {{click=btnSignInSubmit}}>
                        <Button {{class=signIn-block__back-button}} {{text=${langService.getWord('buttonBack')}}} {{click=goMenu}}>`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray.slice(0, 5);
				const form = document.createElement('form');
				form.setAttribute('class', 'sinIn-block__signIn-form');
				this.elementsArray.forEach((el) => {
					form.appendChild(el.render());
				});
				const div = document.createElement('div');
				div.setAttribute('class', 'main-content__signIn-block');
				div.appendChild(form);
				div.appendChild(elementsArray[5].render());
				this.element = div;
				this._innerName = 'SignIn';
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
					this.errorLabels.login.render().innerText = ans.What || 'Internal error';
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
			resolve();
		});
	}
}
