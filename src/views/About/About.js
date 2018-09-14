'use strict';

import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import MainComponent from "../../components/MainComponent/MainComponent.js";
import Block from "../../components/Block/Block.js";
import Main from "../Main/Main.js";

export default class About extends MainComponent {
    constructor() {
        super('div', ['about-page__menu'], {});
    }

    build() {
        const backBtn = new Button('Back', ['buttonGame'], 'aboutBackBtn').render();
        backBtn.addEventListener('click', () => {
            this.hide();
        });

        this.append(new Block('p', 'CodeLoft', ['about-page__logo'], {}).render());
        this.append(backBtn);
        document.getElementById('main').appendChild(this.render());
    }
}