'use strict';

import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import MainComponent from "../../components/MainComponent/MainComponent.js";
import Block from "../../components/Block/Block.js";
import Main from "../Main/Main.js";

const RULESTEXT = 'In our game you will play for a motorcyclist, \n' +
    '    which leaves a bright trace. Other players or bots will also\n' +
    '     draw a line for themselves, and your task is to avoid contact with this line,\n' +
    '      regardless of whether it\'s yours or not. Also, in order to win, you must draw a \n' +
    '    line so that opponents can not avoid your trace. On the playing field will be spawned\n' +
    '     various bonuses that will help you win. So do not yawn!'

export default class About extends MainComponent {
    constructor() {
        super('div', ['about-page__menu'], {});
    }

    build() {
        const backBtn = new Button('Back', ['buttonGame'], 'signInBackBtn').render();
        const rulesText = new Block('p', RULESTEXT).render();
        backBtn.addEventListener('click', () => {
            this.hide();
        });

        this.append(new Block('p', 'CodeLoft', ['about-page__logo'], {}).render());
        this.append(rulesText);
        this.append(backBtn);
        document.getElementById('main').appendChild(this.render());
    }
}