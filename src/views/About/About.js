'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';

const RULESTEXT = `In our game you will play for a motorcyclist, 
	    which leaves a bright trace. Other players or bots will also
	     draw a line for themselves, and your task is to avoid contact with this line,
	      regardless of whether it\'s yours or not. Also, in order to win, you must draw a 
	    line so that opponents can not avoid your trace. On the playing field will be spawned
	     various bonuses that will help you win. So do not yawn!`;

export default class About extends BaseView {
	build() {
		return new Promise((resolve) => {
			this.template = `<Label {{class=about-block__rules-text}} {{text=${RULESTEXT}}}>
                         <Button {{class=button}} {{text=Back}} {{click=goMenu}}>`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray;
				const div = document.createElement('div');
				div.setAttribute('class', 'main-content__about-block');
				this.elementsArray.forEach((el) => {
					div.appendChild(el.render());
				});
				this.element = div;
				this.logoText = 'About';
				resolve();
			});
		});
	}
}
