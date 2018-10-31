'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import userService from '../../services/UserService/UserService.js';

export default class Profile extends BaseView {
	constructor() {
		super();
		this._needAuth = true;
	}

	build() {
		this.template = `<Img {{src=./static/img/user-default.jpg}} {{class=user-page__img}}>
                         <UserInfo>
                         <Button {{text=Back}} {{class=main-page__menu__button}} {{click=goMenu}}>
                         <Button {{text=LogOut}} {{class=main-page__menu__button}} {{click=logOut}}>`;
		return new Promise((resolve) => {
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray;
				const div = document.createElement('div');
				div.setAttribute('class', 'profile-page__info');
				this.elementsArray.forEach((el) => {
					div.appendChild(el.render());
				});
				this.element = div;
				this.userBlock = this.elementsArray[1];
				this.logoText = 'Your profile';
				resolve();
			});
		});
	}

	afterRender() {
		return new Promise((resolve) => resolve(this.userBlock.afterRender()));
	}

	show() {
		return super.show();
	}
}
