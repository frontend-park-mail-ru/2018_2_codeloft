'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Validator from '../../modules/Validator/Validator.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import userService from '../../services/UserService/UserService.js';


export default class SignUp extends BaseView {
    build() {
        eventHandler.addHandler('btnSignUpSubmit', () => this.submit());
        return new Promise((resolve) => {
            this.template = `<Label {{name=login}} {{class=signUpErrorField}}>
						<Input {{name=login}} {{class=game-input signUpInput}} {{placeholder=Enter your login}} {{check=loginMin loginMax}}>
						<Label {{name=email}} {{class=signUpErrorField}}>
					    <Input {{name=email}} {{class=game-input signUpInput}} {{placeholder=Enter your email}} {{check=email}}>
					    <Label {{name=password}} {{class=signUpErrorField}}>
                        <Input {{name=password}} {{class=game-input signUpInput}} {{placeholder=Enter your password}} {{type=password}} {{check=passwordMin passwordMax}}>
                        <Label {{name=passwordConfirm}} {{class=signUpErrorField}}>
                        <Input {{name=passwordConfirm}} {{class=game-input signUpInput}} {{placeholder=Repeat your password}} {{type=password}} {{check=passwordsEquality}}>
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

    submit() {
        if (this.validator.isValid()) {
            const requestBody = {};
            for (const field in this.inputs) {
                requestBody[field] = this.inputs[field].render().value;
            }
            userService.register(requestBody)
                .then((ans) => {
                    this.errorLabels['login'].render().innerText = this.errorMessages[ans];
                    this.errorLabels['login'].show();
                    setTimeout(() => this.errorLabels['login'].hide(), 3000);
                });
        }
    }

    afterRender() {
        this.mainEvent = this.submit;
        return new Promise((resolve) => {
            this.inputs = {
                'login': this.elementsArray[1],
                'email': this.elementsArray[3],
                'password': this.elementsArray[5],
                'passwordConfirm': this.elementsArray[7]
            };
            this.errorLabels = {
                'login': this.elementsArray[0],
                'email': this.elementsArray[2],
                'password': this.elementsArray[4],
                'passwordConfirm': this.elementsArray[6]
            };
            for (const field in this.errorLabels) {
                this.errorLabels[field].hide();
            }
            this.validator = new Validator(this.inputs, this.errorLabels);
            for (const input in this.inputs) {
                this.inputs[input].render().addEventListener('blur', () => {
                    this.validator.checkInput(input);
                });
            }
            this.errorMessages = {
                400: 'User with a such login already exists',
            };
            resolve();
        });
    }
}
