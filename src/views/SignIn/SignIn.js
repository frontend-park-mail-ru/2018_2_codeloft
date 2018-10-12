'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Validation from '../../modules/Validation/Validation.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import UserService from '../../services/UserService/UserService.js';
import router from '../../modules/Router/Router.js';
import userService from '../../services/UserService/UserService.js';
import eventBus from '../../modules/EventBus/EventBus.js';

export default class SignIn extends BaseView {
    build() {
        eventHandler.addHandler('btnSignInSubmit', () => {
            let login = '';
            let password = '';
            this.inputs.forEach((input) => {
                if (input.name === 'login') {
                    login = input.value;
                } else if (input.name === 'password') {
                    password = input.value;
                }
            });
            UserService.logIn(login, password);
        });
        return new Promise((resolve) => {
            this.template = `<Block {{name=login}} {{class=signInErrorField}}>
						<Input {{name=login}} {{class=game-input signInInput}} {{placeholder=Enter your login}}>
						<Block {{name=password}} {{class=signInErrorField}}>
                        <Input {{name=password}} {{class=game-input signInInput}} {{placeholder=Enter your password}} {{type=password}}>
                        <Button {{class=buttonGame}} {{text=Sign in}} {{click=btnSignInSubmit}}>
                        <Button {{class=buttonGame}} {{text=Back}} {{click=goMenu}}>`;
            tagParser.toHTML(this.template).then((elementsArray) => {
                this.elementsArray = elementsArray;
                const div = document.createElement("div");
                div.setAttribute('class', 'signIn-page_menu');
                this.elementsArray.forEach((el) => {
                    div.appendChild(el.render());
                    if (el.needAuth() && !userService.isLogIn()) {
                        el.hide();
                    }
                });
                this.element = div;
                resolve();
            });
        });
    }

    addEffects() {
        this.inputs = [...document.getElementsByClassName('signInInput')];
        this.errorsFields = [...document.getElementsByClassName('signInErrorField')];

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
            errors.forEach((err, j) => {
                if (errorField.getAttribute('name') === err.class[1]) {
                    errorField.innerHTML = err.innerHTML;
                    console.log(inputs[j]);
                    // inputs[j].style.borderColor = 'red';
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
