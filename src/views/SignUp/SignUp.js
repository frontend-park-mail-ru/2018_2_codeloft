'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import userService from '../../services/UserService/UserService.js';
import langService from '../../services/LangService/LangService.js';
import Validator from '../../modules/Validator/Validator.js';


export default class SignUp extends BaseView {
	build() {
		eventHandler.addHandler('btnSignUpSubmit', () => this.submit());
		return new Promise((resolve) => {
			this.template = `<Label {{name=login}} {{class=error-label}}>
						<Input {{name=login}} {{class=input}} {{placeholder=${langService.getWord('signIn.login')}}} {{check=loginMin loginMax russian}}>
						<Label {{name=email}} {{class=error-label}}>
					    <Input {{name=email}} {{class=input}} {{placeholder=${langService.getWord('signUp.email')}}} {{check=email russian}}>
					    <Label {{name=password}} {{class=error-label}}>
                        <Input {{name=password}} {{class=input}} {{placeholder=${langService.getWord('signIn.password')}}} {{type=password}} {{check=passwordMin passwordMax russian}}>
                        <Label {{name=passwordConfirm}} {{class=error-label}}>
                        <Input {{name=passwordConfirm}} {{class=input}} {{placeholder=${langService.getWord('signUp.repeatPassword')}}} {{type=password}} {{check=passwordsEquality russian}}>
                        <Button {{class=main-button form__submit-button}} {{text=${langService.getWord('main.signUp')}}} {{click=btnSignUpSubmit}}>
                        <Button {{class=signUp-block__back-button}} {{text=${langService.getWord('buttonBack')}}} {{click=goMenu}}>`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray.slice(0, 9);
				const form = document.createElement('form');
				form.setAttribute('class', 'signIn-block__form');
				this.elementsArray.forEach((el) => {
					form.appendChild(el.render());
				});
				const div = document.createElement('div');
				div.setAttribute('class', 'main-content__signUp-block');
				div.appendChild(form);
				div.appendChild(elementsArray[9].render());
				this.element = div;
				this._innerName = 'SignUp';
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
					this.errorLabels.login.render().innerText = ans.What || 'Internal error';
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
			resolve();
		});
	}
}
