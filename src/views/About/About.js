'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import langService from '../../services/LangService/LangService.js';
import '../../static/css/about-page.scss';

export default class About extends BaseView {
	build() {
		return new Promise((resolve) => {
			this.template = `<Label {{class=about-block__rules-text}} {{text=${langService.getWord('rules.text')}}}>
                         <Button {{class=about-block__back-button}} {{text=${langService.getWord('buttonBack')}}} {{click=goMenu}}>`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray;
				const div = document.createElement('div');
				div.setAttribute('class', 'main-content__about-block');
				this.elementsArray.forEach((el) => {
					div.appendChild(el.render());
				});
				this.element = div;
				this.logoText = 'About';
				this._innerName = 'About';
				resolve();
			});
		});
	}
}
