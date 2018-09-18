'use strict';

import Button from '../../components/Button/Button.js';
import MainComponent from "../../components/MainComponent/MainComponent.js";
import Input from "../../components/Input/Input.js"

export default class SignUp extends MainComponent {
    constructor() {
        super('div', ['signUp-page__menu'], {});
    }

    build() {
        const login = new Input('text', 'Login', ['game-input'], 'Enter your login').render();
        const email = new Input('text', 'Email', ['game-input'], 'Enter your email').render();
        const password = new Input('Password', 'Password', ['game-input'], 'Enter your password').render();
        const repeatPassword = new Input('Repeat password', 'Password', ['game-input'], 'Repeat your password').render();
        const submitBtn = new Button('Sign up!', ['buttonGame'], 'signInSubmit').render();
        const backBtn = new Button('Back', ['buttonGame'], 'signInBack').render();

        backBtn.addEventListener('click', () => {
            this.hide();
        });

        this.append(login);
        this.append(email);
        this.append(password);
        this.append(repeatPassword);
        this.append(submitBtn);
        this.append(backBtn);
        document.getElementById('main').appendChild(this.render());
    }
}