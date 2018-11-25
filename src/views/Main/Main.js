'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import '../../static/css/main-page.scss';

export default class menu extends BaseView {
	build() {
		return new Promise((resolve) => {
			this.template = `<Button {{class=button}} {{text=Single Player}} {{click=goSinglePlayer}} {{needAuth=true}}>
                         <Button {{class=button}} {{text=Multi Player}} {{click=goMultiPlayer}} {{needAuth=true}}>
                         <Button {{class=button}} {{text=Sign in}} {{click=goLogin}} {{forAuth=true}}>
                         <Button {{class=button}} {{text=Sign up}} {{click=goRegister}} {{forAuth=true}}>
                         <Button {{class=button}} {{text=Rules}} {{click=goAbout}}>
                         <Button {{class=button}} {{text=High score}} {{click=goScore}}>
                         <Button {{class=button}} {{text=Profile}} {{click=goProfile}} {{needAuth=true}}>
						<Button {{class=button}} {{text=Chat}} {{click=goChat}}>s`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray;
				const div = document.createElement('div');
				div.setAttribute('class', 'main-content__menu-block');
				this.elementsArray.forEach((el) => {
					div.appendChild(el.render());
				});
				this.element = div;
				this._innerName = 'Main';
				resolve();
			});
		});
	}

	escapeEvent() {

	}
}
