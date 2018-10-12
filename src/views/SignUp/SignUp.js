'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Validation from '../../modules/Validation/Validation.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import userService from '../../services/UserService/UserService.js';


export default class SignUp extends BaseView {
    build() {
        eventHandler.addHandler('btnSignUpSubmit', () => {
            let login = '';
            let email = '';
            let password = '';
            this.inputs.forEach((input) => {
                if (input.name === 'login') {
                    login = input.value;
                } else if (input.name === 'email') {
                    email = input.value;
                } else if (input.name === 'password') {
                    password = input.value;
                }
            });
            userService.register(login, email, password);
        });
        return new Promise((resolve) => {
            this.template = `<Label {{name=login}} {{class=signUpErrorField}} {{visible=none}}>
						<Input {{name=login}} {{class=game-input signUpInput}} {{placeholder=Enter your login}}>
						<Label {{name=email}} {{class=signUpErrorField}} {{visible=none}}>
					    <Input {{name=email}} {{class=game-input signUpInput}} {{placeholder=Enter your email}}>
					    <Label {{name=password}} {{class=signUpErrorField}} {{visible=none}}>
                        <Input {{name=password}} {{class=game-input signUpInput}} {{placeholder=Enter your password}} {{type=password}}>
                        <Label {{name=passwordConfirm}} {{class=signUpErrorField}} {{visible=none}}>
                        <Input {{name=passwordConfirm}} {{class=game-input signUpInput}} {{placeholder=Repeat your password}} {{type=password}}>
                        <Button {{class=buttonGame}} {{text=Sign up}} {{click=btnSignUpSubmit}}>
                        <Button {{class=buttonGame}} {{text=Back}} {{click=goMenu}}>`;
            tagParser.toHTML(this.template).then((elementsArray) => {
                this.elementsArray = elementsArray;
                const div = document.createElement("div");
                div.setAttribute('class', 'signUp-page_menu');
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
