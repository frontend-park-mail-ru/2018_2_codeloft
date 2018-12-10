import langService from '../../services/LangService/LangService.js';

export default class Validator {
	constructor(inputs = {}, labels = {}) {
		this.inputs = inputs;
		this.labels = labels;
		this.checkConfig = {
			loginMin: (value) => /.{3}/.test(value),
			loginMax: (value) => !/.{21}/.test(value),
			passwordMin: (value) => /.{8}/.test(value),
			passwordMax: (value) => !/.{21}/.test(value),
			email: (value) => /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i.test(value),
			russian: (value) => !/[а-яё]/i.test(value),
			passwordsEquality: (value) => value === this.inputs.password.render().value,
		};
	}

	checkInput(name) {
		let inputIsValid = true;
		this.inputs[name].check.split(/\s+/g).forEach((check) => {
			if (!this.checkConfig[check](this.inputs[name].render().value)) {
				inputIsValid = false;
				this.labels[name].show();
				this.labels[name].render().innerText = langService.getWord(`validator.${check}`);
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

	test(value, check) {
		return this.checkConfig[check](value);
	}
}
