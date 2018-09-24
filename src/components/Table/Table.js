'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Block from '../Block/Block.js'

export default class Table extends MainComponent {
    constructor(head = [], classes = [], id) {
        super('table', classes, {id: id});

        this.appendRow(head);
    }

    appendRow(data = []) {
        let cells = '';
        for (let value of data) {
            cells += `<th>${value}</th>`;
        }
        //const newRow = `<tr>${cells}</tr>`;
        const tableblock = new Block('tr', cells).render();
        this.append(tableblock);
    }
}