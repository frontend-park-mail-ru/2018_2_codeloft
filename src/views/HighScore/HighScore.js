'use strict';

import MainComponent from "../../components/MainComponent/MainComponent.js";
import Table from "../../components/Table/Table.js"

export default class HighScore extends MainComponent {
    constructor() {
        super('div', ['highScore-page__menu'], {});
    }

    build() {
        const table = new Table(['Email', 'age', 'score'],[]);
        table.appendRow(['artur@mail.ru', '20', '200']);
        this.append(table.render());

        document.getElementById('main').appendChild(this.render());
    }
}