'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Transport from '../../modules/Transport/Transport.js';

export default class Button extends MainComponent {

	constructor() {
		super();
		this.events = ['click'];
	}

	compile(data) {
		this.template = Handlebars.compile('<div class = {{class}}>{{text}}</div>');
		return Transport.GetHTML('<div class = {{class}}>{{text}}</div>', data)
			.then((resJSON) => resJSON.json())
            .then(compiled => {
                const parent = document.createElement('div');
                parent.innerHTML = compiled.html;
                this.element = parent.lastChild;
                return this;
                //this.addEvents(config);
            })
			.catch(error => console.log(error));
	}

}