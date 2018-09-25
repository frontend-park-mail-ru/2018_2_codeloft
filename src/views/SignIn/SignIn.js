'use strict';

import BaseView from "../BaseView/BaseView.js";
import tagParser from "../../modules/TagParser/TagParser.js";


export default class SignUp extends BaseView {

    build() {
        this.template = `<div class="signUp-page__menu">
                         <form action="">
                         <Input {{class=game-input}} {{placeholder=Enter your email}}>
                         <Input {{class=game-input}} {{placeholder=Enter your password}} {{type=password}}>
                         <Button {{class=buttonGame}} {{text=Sign in!}}>
                         <Button {{class=buttonGame}} {{text=Back}}>
                         </form>
                         </div>`;
        let div = document.createElement('div');
        this.template = tagParser.toHTML(this.template);
        div.innerHTML = this.template;
        this.element = div.lastChild;
    }

}
