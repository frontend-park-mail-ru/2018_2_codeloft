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

		return error;
	}

	static checkFieldsPresenceBool(field) {
		return field.value;
	}

	checkLoginCorrect(field) {
		if (!Validation.checkFieldsPresenceBool(field)) {
			this.errors.push(Validation.generateError(emptyFieldError, 'login'));
		}
		if (field.value.length < 5) {
			this.errors.push(Validation.generateError(loginShortError, 'login'));
		}
	}

	checkEmailCorrect(field) {
		const reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;

		if (!Validation.checkFieldsPresenceBool(field)) {
			this.errors.push(Validation.generateError(emptyFieldError, 'email'));
		}
		if (!reg.test(field.value)) {
			this.errors.push(Validation.generateError(wrongEmailError, 'email'));
		}
	}

	checkPasswordCorrect(field) {
		if (!Validation.checkFieldsPresenceBool(field)) {
			this.errors.push(Validation.generateError(emptyFieldError, 'password'));
		}
		if (field.value.length < 8) {
			this.errors.push(Validation.generateError(passwordShortError, 'password'));
		}
		if (field.value.length > 20) {
			this.errors.push(Validation.generateError(passwordLongError, 'password'));
		}
	}

	checkPasswordConfirmCorrect(field) {
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
		return this.errors;
	}
}
