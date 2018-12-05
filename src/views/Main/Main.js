'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import langService from '../../services/LangService/LangService.js';
import '../../static/css/main-page.scss';

export default class menu extends BaseView {
	build() {
		return new Promise((resolve) => {
			this.template = `<Button {{class=button}} {{text=${langService.getWord('main.singleplayer')}}} {{click=goSinglePlayer}}>
                         <Button {{class=button}} {{text=${langService.getWord('main.multiplayer')}}} {{click=goMultiPlayer}} {{needAuth=true}}>
                         <Button {{class=button}} {{text=${langService.getWord('main.signIn')}}} {{click=goLogin}} {{forAuth=true}}>
                         <Button {{class=button}} {{text=${langService.getWord('main.signUp')}}} {{click=goRegister}} {{forAuth=true}}>
                         <Button {{class=button}} {{text=${langService.getWord('main.rules')}}} {{click=goAbout}}>
                         <Button {{class=button}} {{text=${langService.getWord('main.score')}}} {{click=goScore}}>
                         <Button {{class=button}} {{text=${langService.getWord('main.profile')}}} {{click=goProfile}} {{needAuth=true}}>
						<Button {{class=button}} {{text=${langService.getWord('main.chat')}}} {{click=goChat}}>s`;
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
