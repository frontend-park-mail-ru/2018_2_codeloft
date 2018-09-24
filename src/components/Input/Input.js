'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Input extends MainComponent {
    compile(data) {
        this.template = Handlebars.compile(`<input class="{{class}}" placeholder="{{placeholder}}">`);
        this.template(data);
        super.compile(data);
    }
}