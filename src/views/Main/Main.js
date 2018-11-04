'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';

export default class Main extends BaseView {
	build() {
		return new Promise((resolve) => {
			this.template = `<Button {{class=main-page__single-button button}} {{text=Single Player}} {{click=goSinglePlayer}} {{needAuth=true}}>
                         <Button {{class=main-page__signIn-button button}} {{text=Sign in}} {{click=goLogin}} {{forAuth=true}}>
                         <Button {{class=main-page__signUp-button button}} {{text=Sign up}} {{click=goRegister}} {{forAuth=true}}>
                         <Button {{class=main-page__about-button button}} {{text=Rules}} {{click=goAbout}}>
                         <Button {{class=main-page__score-button button}} {{text=High score}} {{click=goScore}}>
                         <Button {{class=main-page__profile-button button}} {{text=Profile}} {{click=goProfile}} {{needAuth=true}}>`;
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray;
				const div = document.createElement('div');
				div.setAttribute('class', 'main-page__menu__buttons');
				this.elementsArray.forEach((el) => {
					div.appendChild(el.render());
				});
				this.element = div;
				resolve();
			});
		});
	}
}
