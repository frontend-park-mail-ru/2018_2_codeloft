'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import router from "../../modules/Router/Router.js";
import userService from '../../services/UserService/UserService.js';

export default class SinglePlayer extends BaseView {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.gameMode = false;
        document.onkeydown = (key) => {
            if (this.gameMode) {
                let button = String.fromCharCode(key.keyCode || key.charCode);
                this.ctx.fillStyle = ('rgb(255, 255, 255');
                this.ctx.fillRect(this.x, this.y, 30, 30);
                this.ctx.fillStyle = 'rgb(0, 0, 200)';
                if (button === 'S') {
                    this.y += 10;
                } else if (button === 'W') {
                    this.y -= 10;
                } else if (button === 'D') {
                    this.x += 10;
                } else if (button === 'A') {
                    this.x -= 10;
                } else if (key.key === 'Escape') {
                    router.go('/');
                }
                this.ctx.fillRect(this.x, this.y, 30, 30);
            }
        }
    }

    build() {
        return new Promise((resolve) => {
            this.template = '<GameBlock>';
            tagParser.toHTML(this.template).then((elementsArray) => {
                this.elementsArray = elementsArray;
                const div = document.createElement("div");
                div.setAttribute('class', 'block-game_simple');
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

    addEffects() {
        this.gameMode = true;
        this.handleGameProcess();
    }

    hide() {
        super.hide();
        this.gameMode = false;
    }

    handleGameProcess() {
        this.ctx = document.getElementsByClassName('game-block')[0].getContext('2d');
        this.ctx.fillStyle = 'rgb(0, 0, 200)';
        this.ctx.fillRect(this.x, this.y, 30, 30);
    }
}
