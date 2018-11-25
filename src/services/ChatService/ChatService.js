import eventBus from '../../modules/EventBus/EventBus.js';

class ChatService {
	constructor() {
		this._chatComponent = {};
		this._inMsgHandler = this._inMessage.bind(this);
		eventBus.on('user_message', this._inMsgHandler);
	}

	_inMessage(msgData) {

	}
}

const chatService = new ChatService();
export default chatService;
