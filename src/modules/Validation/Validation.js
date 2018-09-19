'use strict';

export default class Validation {
    constructor(inputArray) {
        this.inputArray = inputArray;
        this.passwd = null;
        this.passwdConfirm = null;
        this.errors = [];
    }

    generateError(text, errorType) {
        const error = document.createElement('div');
        error.class = ['login-page__error', errorType];
        error.style.color = 'red';
        error.innerHTML = text;

        return error;
    }

    checkFieldsPresenceBool(field) {
        return field.value;
    }

    checkLoginCorrect(field) {
        if (!this.checkFieldsPresenceBool(field)) {
            this.errors.push(this.generateError('Field is empty', 'login'));
        }
        if (field.value.length < 5) {
            this.errors.push(this.generateError('Login is too short', 'login'))
        }
    }

    checkEmailCorrect(field) {
        const reg = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;

        if (!this.checkFieldsPresenceBool(field)) {
            this.errors.push(this.generateError('Field is empty', 'email'));
        }
        if (!reg.test(field.value)) {
            this.errors.push(this.generateError('Wrong email', 'email'));
        }
    }

    checkPasswordCorrect(field) {
        if (!this.checkFieldsPresenceBool(field)) {
            this.errors.push(this.generateError('Field is empty', 'password'));
        }
        if (field.value.length < 8) {
            this.errors.push(this.generateError('Password is too short', 'password'));
        }
        if (field.value.length > 20) {
            this.errors.push(this.generateError('Password is too long', 'password'));
        }
    }

    checkPasswordConfirmCorrect(field) {
        if (!this.checkFieldsPresenceBool(field)) {
            this.errors.push(this.generateError('Field is empty', 'passwordConfirm'));
        }
    }

    checkoutPasswordMatch(passwd, passwdConfirm) {
        if (passwd.value !== passwdConfirm.value) {
            this.errors.push(this.generateError('Password doesn\'t match', 'passwordMatch'));
        }
    }

    checkAllFields() {
        for (let property in this.inputArray) {
            switch (this.inputArray[property].name) {
                case 'login':
                    this.checkLoginCorrect(this.inputArray[property]);
                    break;
                case 'email':
                    this.checkEmailCorrect(this.inputArray[property]);
                    break;
                case 'password':
                    this.checkPasswordCorrect(this.inputArray[property]);
                    this.passwd = this.inputArray[property];
                    break;
                case 'passwordConfirm':
                    this.checkPasswordConfirmCorrect(this.inputArray[property]);
                    this.passwdConfirm = this.inputArray[property];
                    break;
                default:
                    break;
            }
        }
        if (this.passwd && this.passwdConfirm) {
            this.checkoutPasswordMatch(this.passwd, this.passwdConfirm);
        }
        return this.errors;
    }
}
