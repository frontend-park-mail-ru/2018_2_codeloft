'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Validator from '../../modules/Validator/Validator.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import userService from '../../services/UserService/UserService.js';


export default class SignUp extends BaseView {
    build() {
        eventHandler.addHandler('btnSignUpSubmit', () => {
            const requestBody = {};
            for (const field in this.inputs) {
                requestBody[field] = this.inputs[field].render().value;
            }
            userService.register(requestBody);
        });
        return new Promise((resolve) => {
            this.template = `<Label {{name=login}} {{class=signUpErrorField}}>
						<Input {{name=login}} {{class=game-input signUpInput}} {{placeholder=Enter your login}}>
						<Label {{name=email}} {{class=signUpErrorField}}>
					    <Input {{name=email}} {{class=game-input signUpInput}} {{placeholder=Enter your email}}>
					    <Label {{name=password}} {{class=signUpErrorField}}>
                        <Input {{name=password}} {{class=game-input signUpInput}} {{placeholder=Enter your password}} {{type=password}}>
                        <Input {{name=passwordConfirm}} {{class=game-input signUpInput}} {{placeholder=Repeat your password}} {{type=password}}>
                        <Button {{class=buttonGame}} {{text=Sign up}} {{click=btnSignUpSubmit}}>
                        <Button {{class=buttonGame}} {{text=Back}} {{click=goMenu}}>`;
            tagParser.toHTML(this.template).then((elementsArray) => {
                this.elementsArray = elementsArray;
                const div = document.createElement("div");
                div.setAttribute('class', 'signUp-page_menu');
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
                'email': this.elementsArray[3],
                'password': this.elementsArray[5]
            };
            this.errorsFields = {
                'login': this.elementsArray[0],
                'email': this.elementsArray[2],
                'password': this.elementsArray[4]
            };
            for (const field in this.errorsFields) {
                this.errorsFields[field].hide();
            }
            resolve();
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
        const errors = new Validator(this.inputs).checkAllFields();

        if (errors.length === 0) {
            return true;
        }
        this.showErrors(errors, errorFields, inputs);
        return false;
    }
}
