'use strict';

const emptyFieldError = 'Field is empty';
const loginShortError = 'Login is too short';
const wrongEmailError = 'Wrong email';
const passwordShortError = 'Password is too short 8 symbol min';
const passwordLongError = 'Password is too long 20 symbol max';
const passwordMatchError = 'Password doesn\'t match';

export default class Validation {
	constructor(inputArray = {}) {
		this.inputArray = inputArray;
		this.password = null;
		this.passwordConfirm = null;
		this.errors = [];
	}

	static generateError(text, errorType) {
		const error = document.createElement('div');
		error.class = ['login-page__error', errorType];
		error.style.color = 'red';
		error.innerHTML = text;

		// console.log(error);
		return error;
	}

	static checkFieldsPresenceBool(field) {
		return field.value;
	}

	checkLoginCorrect(field) {
		if (!Validation.checkFieldsPresenceBool(field)) {
			// console.log('login ' + 1);
			this.errors.push(Validation.generateError(emptyFieldError, 'login'));
			// console.log(this.errors);
		}
		if (field.value.length < 5) {
			// console.log('login ' + 2);
			this.errors.push(Validation.generateError(loginShortError, 'login'));
			// console.log(this.errors);
		}
	}

	checkEmailCorrect(field) {
		// console.log('login email');
		// const reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;

		if (!Validation.checkFieldsPresenceBool(field)) {
			this.errors.push(Validation.generateError(emptyFieldError, 'email'));
		}
		if (!reg.test(field.value)) {
			this.errors.push(Validation.generateError(wrongEmailError, 'email'));
		}
	}

	checkPasswordCorrect(field) {
		if (!Validation.checkFieldsPresenceBool(field)) {
			// console.log('password ' + 1);
			this.errors.push(Validation.generateError(emptyFieldError, 'password'));
			// console.log(this.errors);
		}
		if (field.value.length < 8) {
			// console.log('password ' + 2);
			this.errors.push(Validation.generateError(passwordShortError, 'password'));
			// console.log(this.errors);
		}
		if (field.value.length > 20) {
			// console.log('password ' + 3);
			this.errors.push(Validation.generateError(passwordLongError, 'password'));
			// console.log(this.errors);
		}
	}

	checkPasswordConfirmCorrect(field) {
		// console.log('login confirm');
		if (!Validation.checkFieldsPresenceBool(field)) {
			this.errors.push(Validation.generateError(emptyFieldError, 'passwordConfirm'));
		}
	}

	checkoutPasswordMatch(password, passwordConfirm) {
		if (password.value !== passwordConfirm.value) {
			this.errors.push(Validation.generateError(passwordMatchError, 'passwordMatch'));
		}
	}

	checkAllFields() {
		for (const property in this.inputArray) {
			switch (this.inputArray[property].name) {
			case 'login':
				this.checkLoginCorrect(this.inputArray[property]);
				break;
			case 'email':
				this.checkEmailCorrect(this.inputArray[property]);
				break;
			case 'password':
				this.checkPasswordCorrect(this.inputArray[property]);
				this.password = this.inputArray[property];
				break;
			case 'passwordConfirm':
				this.checkPasswordConfirmCorrect(this.inputArray[property]);
				this.passwordConfirm = this.inputArray[property];
				break;
			default:
				break;
			}
		}
		if (this.password && this.passwordConfirm) {
			this.checkoutPasswordMatch(this.password, this.passwordConfirm);
		}
		// console.log(this.errors);
		return this.errors;
	}
}
