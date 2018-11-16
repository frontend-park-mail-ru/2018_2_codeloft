import BaseGameHandler from '../BaseGameHandler.js';
import eventBus from '../../modules/EventBus/EventBus';

export default class SinglePlayerHandler extends BaseGameHandler {
	constructor(players = []) {
		super(players);
	}

	handleGoalCollision(details) {
		if (details.player === this._protagonist) {
			details.player.addScore(details.scoreBonus);
			eventBus.emit('scoreRedraw', details.player.getScore());
		}
		this._arena.clearGoal();
		this._arena.spawnGoal(this.players);
	}
}
