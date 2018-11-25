import eventBus from '../../modules/EventBus/EventBus.js';
import userService from '../UserService/UserService.js';

const USER_MESSAGE = 'user_message';

class ChatService {
	constructor() {
		this._chatSocket = new WebSocket('ws://backend.codeloft.ru:3000/chatws');
		this._chatComponent = {};
		this._inMsgHandler = this._inMessage.bind(this);
		eventBus.on('user_message', this._inMsgHandler);
		this._chatSocket.onopen = () => {
			this._chatSocket.send(JSON.stringify(userService.getUserInfo('login')));
		};
		this._chatSocket.onmessage = (msg) => {
			const receivedData = JSON.parse(msg.data);
			if (receivedData.type === USER_MESSAGE) {
				eventBus.emit('user_message', receivedData);
			}
		};
	}

	init(chatComponent) {
		this._chatComponent = chatComponent;
	}

	_inMessage(msgData) {

	}

	sendUserMessage(message, reader) {
		const msgObject = {
			chat_id: 0,
			sender_login: userService.getUserInfo('login'),
			receiver_login: reader,
			message: message,
			date: Date.now().toString()
		};
		this._chatSocket.send(JSON.stringify(msgObject));
		eventBus.emit('outMsg', msgObject);
	}
}

const chatService = new ChatService();
export default chatService;
