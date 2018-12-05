'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import langService from '../../services/LangService/LangService.js';
import '../../static/css/main-page.scss';

export default class menu extends BaseView {
	build() {
		return new Promise((resolve) => {
			this.template = `<Button {{class=menu-block__single-button}} {{text=${langService.getWord('main.singleplayer')}}} {{click=goSinglePlayer}}>
                         <Button {{class=menu-block__multi-button}} {{text=${langService.getWord('main.multiplayer')}}} {{click=goMultiPlayer}} {{needAuth=true}}>
                         <Button {{class=menu-block__login-button}} {{text=${langService.getWord('main.signIn')}}} {{click=goLogin}} {{forAuth=true}}>
                         <Button {{class=menu-block__reg-button}} {{text=${langService.getWord('main.signUp')}}} {{click=goRegister}} {{forAuth=true}}>
                         <Button {{class=menu-block__rules-button}} {{text=${langService.getWord('main.rules')}}} {{click=goAbout}}>
                         <Button {{class=menu-block__score-button}} {{text=${langService.getWord('main.score')}}} {{click=goScore}}>
                         <Button {{class=menu-block__profile-button}} {{text=${langService.getWord('main.profile')}}} {{click=goProfile}} {{needAuth=true}}>
						<Button {{class=menu-block__chat-button}} {{text=${langService.getWord('main.chat')}}} {{click=goChat}}>s`;
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
