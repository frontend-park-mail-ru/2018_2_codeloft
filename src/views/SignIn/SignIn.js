'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Validator from '../../modules/Validator/Validator.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import userService from '../../services/UserService/UserService.js';

export default class SignIn extends BaseView {
    build() {
        eventHandler.addHandler('btnSignInSubmit', () => {
            const requestBody = {};
            for (const field in this.inputs) {
                requestBody[field] = this.inputs[field].render().value;
            }
            userService.logIn(requestBody);
        });
        return new Promise((resolve) => {
            this.template = `<Label {{name=login}} {{class=signInErrorField}}>
						<Input {{name=login}} {{class=game-input signInInput}} {{placeholder=Enter your login}}>
						<Label {{name=password}} {{class=signInErrorField}}>
                        <Input {{name=password}} {{class=game-input signInInput}} {{placeholder=Enter your password}} {{type=password}}>
                        <Button {{class=buttonGame}} {{text=Sign in}} {{click=btnSignInSubmit}}>
                        <Button {{class=buttonGame}} {{text=Back}} {{click=goMenu}}>`;
            tagParser.toHTML(this.template).then((elementsArray) => {
                this.elementsArray = elementsArray;
                const div = document.createElement("div");
                div.setAttribute('class', 'signIn-page_menu');
                this.elementsArray.forEach((el) => {
                    div.appendChild(el.render());
                });
                this.element = div;
                resolve();
            });
        });
    }

    afterRender() {
        return new Promise((resolve) => {
            this.inputs = {
                'login': this.elementsArray[1],
                'password': this.elementsArray[3]
            };
            this.errorsFields = {
              'login': this.elementsArray[0],
              'password': this.elementsArray[2]
            };
            for (const field in this.errorsFields) {
                this.errorsFields[field].hide();
            }
            resolve();
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
                }
            });
        });
    }

    isValid(inputs = [], errorFields = []) {
        const errors = new Validator(this.inputs).checkAllFields();

        if (errors.length === 0) {
            return true;
        }
        this.showErrors(errors, errorFields, inputs);
        return false;
    }
}
