import MainComponent from '../MainComponent/MainComponent.js';
import langService from '../../services/LangService/LangService.js';
import template from './ChatSender.hbs';

import './ChatSender.scss';

export default class ChatSender extends MainComponent {
	constructor() {
		super();
		this.template = template;
	}

	afterRender() {
		this.element.querySelector('.main-content__chat-block-message-send-input').placeholder = langService.getWord('chat.write');
		return super.afterRender();
	}

	show() {
		if (this.element) {
			this.element.style.display = 'flex';
		}
	}
}
