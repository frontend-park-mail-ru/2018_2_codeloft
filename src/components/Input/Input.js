'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Input extends MainComponent {
    constructor() {
        super();
        this.template = '<input name="{{name}}" class="{{class}}" type="{{type}}" placeholder="{{placeholder}}">';
    }
}