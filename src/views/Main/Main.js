'use strict';

import BaseView from "../BaseView/BaseView.js";
import tagParser from "../../modules/TagParser/TagParser.js";


export default class Main extends BaseView {

    build() {
        this.template = `<div class="main-page__menu">
                         <Button {{class=buttonGame}} {{text=Sign in}}>
                         <Button {{class=buttonGame}} {{text=Sign up}}>
                         <Button {{class=buttonGame}} {{text=Rules}}>
                         <Button {{class=buttonGame}} {{text=High score}}>
                         <Button {{class=buttonGame}} {{text=Profile}}>
                         </div>`;
        let div = document.createElement('div');
        this.template = tagParser.toHTML(this.template);
        div.innerHTML = this.template;
        this.element = div.lastChild;
    }

}