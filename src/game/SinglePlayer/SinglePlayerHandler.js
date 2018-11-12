import Arena from '../Arena/Arena.js';
import Player from '../Player/Player.js';
import BaseGameHandler from '../BaseGameHandler.js';

export default class SinglePlayerHandler extends BaseGameHandler{
	constructor(players = [new Player()]) {
		super(players);
	}

	gameLoop() {

	}
}
