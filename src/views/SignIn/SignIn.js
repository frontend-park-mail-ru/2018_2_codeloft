'use strict';

import Button from '../../components/Button/Button.js';
import MainComponent from "../../components/MainComponent/MainComponent.js";
import Input from "../../components/Input/Input.js"

export default class SignIn extends MainComponent {
    constructor() {
        super('div', ['SignIn-page__menu'], {});
    }

    build() {
        const email = new Input('text', 'Email', ['game-input'], 'Enter your email').render();
        const password = new Input('password', 'Password', ['game-input'], 'Enter your password').render();
        const submitBtn = new Button('Sign in!', ['buttonGame'], 'signInSubmit').render();
        const backBtn = new Button('Back', ['buttonGame'], 'signInBack').render();
        this.append(email);
        this.append(password);
        this.append(submitBtn);
        this.append(backBtn);
        document.getElementById('main').appendChild(this.render());
    }
}