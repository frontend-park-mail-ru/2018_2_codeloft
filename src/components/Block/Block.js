'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Block extends MainComponent {
    constructor(tag = 'p', text = 'text', classes = [], attr = {}) {
        super(tag, classes, attr);
        this.innerHTML(text);
    }
}