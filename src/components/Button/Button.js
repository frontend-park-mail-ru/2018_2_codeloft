'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Button extends MainComponent {
    constructor(text = 'Button', classes = [], id) {
        super('div', classes, {id: id});
        this.innerHTML(text);
    }
}