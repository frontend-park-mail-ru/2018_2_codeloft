'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Input extends MainComponent {
    compile(data) {
        this.template = Handlebars.compile(`<input class = {{class}}>{{text}}</input>`);
        this.template(data);
        super.compile(data);
    }
}