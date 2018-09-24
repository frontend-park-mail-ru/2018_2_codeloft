'use strict';

import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import MainComponent from "../../components/MainComponent/MainComponent.js";
import About from "../About/About.js";
import SignIn from "../SignIn/SignIn.js";
import SignUp from "../SignUp/SignUp.js";
import HighScore from "../HighScore/HighScore.js";

export default class Main extends MainComponent {
    constructor() {
        super('div', ['main-page__menu'], {});
    }

    build() {
        const signInBtn = new Button('SignIn', ['buttonGame'], 'signInBtn').render();
        const signUpBtn = new Button('SignUp', ['buttonGame'], 'signUpBtn').render();
        const aboutBtn = new Button('About', ['buttonGame'], 'aboutBtn').render();
        const scoreBtn = new Button('High-Score', ['buttonGame'], 'rulesBtn').render();
        const profileBtn = new Button('Profile', ['buttonGame'], 'profileBtn').render();

        aboutBtn.addEventListener('click', () => {
            this.hide();
            new About().build();
        });

        signInBtn.addEventListener('click', () => {
            this.hide();
            new SignIn().build();
        });

        signUpBtn.addEventListener('click', () => {
            this.hide();
            new SignUp().build();
        });

        scoreBtn.addEventListener('click', () => {
            this.hide();
            new HighScore().build();
        })

        this.append(signInBtn);
        this.append(signUpBtn);
        this.append(aboutBtn);
        this.append(scoreBtn);
        this.append(profileBtn);
        document.getElementById('main').appendChild(this.render());
    }
}