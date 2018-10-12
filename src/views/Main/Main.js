'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import userService from '../../services/UserService/UserService.js';
import eventBus from '../../modules/EventBus/EventBus.js';


export default class Main extends BaseView {

    build() {
        return new Promise((resolve) => {
            this.template = `<Button {{class=buttonGame}} {{text=Single Player}} {{click=goSinglePlayer}} {{needAuth=true}}>
                         <Button {{class=buttonGame}} {{text=Sign in}} {{click=goLogin}}>
                         <Button {{class=buttonGame}} {{text=Sign up}} {{click=goRegister}}>
                         <Button {{class=buttonGame}} {{text=Rules}} {{click=goAbout}}>
                         <Button {{class=buttonGame}} {{text=High score}} {{click=goScore}}>
                         <Button {{class=buttonGame}} {{text=Profile}} {{click=goProfile}} {{needAuth=true}}>`;
            tagParser.toHTML(this.template).then((elementsArray) => {
                this.elementsArray = elementsArray;
                const div = document.createElement("div");
                div.setAttribute('class', 'main-page_menu');
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


}