'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class Block extends MainComponent {

    compile(data) {
        this.template = `<${data.tag} class="{{class}}">{{text}}</${data.tag}>`;
        this.template = Handlebars.compile(this.template);
        this.template(data);
        super.compile(data);
    }

}