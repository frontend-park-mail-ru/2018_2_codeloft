'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Input extends MainComponent {
    constructor(type = 'text', name, classes = [], placeholder) {
        super('input', classes, {type: type, placeholder: placeholder, name: name});
    }
}