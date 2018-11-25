'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import URLS from '../../modules/Consts/Consts';
import userService from '../../services/UserService/UserService';
import router from '../../modules/Router/Router';
import MessageIn from '../../components/MessageIn/MessageIn.js';
import MessageOut from '../../components/MessageOut/MessageOut.js';

export default class Chat extends BaseView {
	constructor() {
		super();
		this._needAuth = false;
		this.disp = 'flex';
	}

	build() {
		this.template = '<ChatSender>';
		return new Promise((resolve) => {
			tagParser.toHTML(this.template).then((elementsArray) => {
				this.elementsArray = elementsArray;
				const div = document.createElement('div');
				div.setAttribute('class', 'main-content__chat-block');

				this.messageBlock = document.createElement('div');
				this.messageBlock.setAttribute('class', 'main-content__chat-block-messaging');

				div.appendChild(this.messageBlock);

				this.elementsArray.forEach((el) => {
					div.appendChild(el.render());
				});

				this.element = div;
				this.userBlock = this.elementsArray[1];
				this.logoText = 'Chat';
				this._innerName = 'Chat';
				resolve();
			});
		});
	}

	show() {
		return this.preRender()
			.then(() => {
				if (!this.element) {
					return this.init();
				}
				return Promise.resolve();
			})
			.then(() => {
				if (!this.needAuth() || userService.isLogIn()) {
					this.afterRender().then(() => {
						this.mainLogo.innerHTML = this._logoText;
						this.mainLogo.style.display = 'block';
						this.element.style.display = 'block';
						this.hideMainLabel();
						this.addInMessage('James', 'Hello', '17:30');
						this.addOutMessage('Hi..', '17:31');
					});
				} else {
					router.go(URLS.SIGN_IN);
				}
			});
	}

	addInMessage(messageAuthor, message, messageTime) {
		const inMsg = new MessageIn();
		inMsg.compile({ messageAuthor: messageAuthor, message: message, messageTime: messageTime }).then(() => {
		    this.messageBlock.appendChild(inMsg.render());
		});
	}

	addOutMessage(message, messageTime) {
		const outMsg = new MessageOut();
		outMsg.compile({ message: message, messageTime: messageTime }).then(() => {
			this.messageBlock.appendChild(outMsg.render());
		});
	}
}
