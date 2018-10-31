'use strict';

export default class Validator {
	constructor(inputs = {}, labels = {}) {
		this.inputs = inputs;
		this.labels = labels;
		this.checkConfig = {
			loginMin: (value) => /.{3}/.test(value),
			loginMax: (value) => !/.{16}/.test(value),
			passwordMin: (value) => /.{8}/.test(value),
			passwordMax: (value) => !/.{21}/.test(value),
			email: (value) => /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i.test(value),
			russian: (value) => !/[а-яё]/i.test(value),
			passwordsEquality: (value) => value === this.inputs.password.render().value,
		};
		this.messages = {
			loginMin: 'Login must be at least 3 symbols long',
			loginMax: 'Login must be at most 15 symbols long',
			passwordMin: 'Password must be at least 8 symbols long',
			passwordMax: 'Password must be at most 20 symbols long',
			email: 'Wrong email format',
			russian: 'Please use only latin characters',
			passwordsEquality: 'Password doesn\'t match',
		};
	}

	checkInput(name) {
		let inputIsValid = true;
		this.inputs[name].check.split(/\s+/g).forEach((check) => {
			if (!this.checkConfig[check](this.inputs[name].render().value)) {
				inputIsValid = false;
				this.labels[name].show();
				this.labels[name].render().innerText = this.messages[check];
			}
		});
		if (inputIsValid) {
			this.labels[name].hide();
		}
		return inputIsValid;
	}

	isValid() {
		let formIsValid = true;
		Object.keys(this.inputs).forEach((name) => {
			formIsValid = formIsValid && this.checkInput(name);
		});
		return formIsValid;
	}
}
