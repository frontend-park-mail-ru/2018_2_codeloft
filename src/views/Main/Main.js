'use strict';

import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import BaseView from "../BaseView/BaseView.js";
import About from "../About/About.js";
import SignIn from "../SignIn/SignIn.js";
import SignUp from "../SignUp/SignUp.js";
import HighScore from "../HighScore/HighScore.js";
import tagParser from "../../modules/TagParser/TagParser.js";


export default class Main {
    constructor() {
        this.element = null;
    }

    render() {
        this.template = Handlebars.complie(`<Button {{class="buttonGame"}} {{text="Sign in"}}>`);
    }

    build() {
        this.template = `<Button {{class=buttonGame}} {{text=Sign in}}>
                         <Button {{class=buttonGame}} {{text=Sign up}}>
                         <Button {{class=buttonGame}} {{text=Rules}}>
                         <Button {{class=buttonGame}} {{text=High score}}>`;
        let div = document.createElement('div');
        this.template = tagParser._getTags(this.template);
        div.innerHTML = this.template;
        return div;
    }
}