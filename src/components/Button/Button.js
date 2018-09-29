'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Button extends MainComponent {

    constructor() {
        super();
        this.events = ['click'];
    }

    compile(data) {
        this.template = Handlebars.compile(`<div class = {{class}}>{{text}}</div>`);
        this.template(data);
        super.compile(data);
    }

}