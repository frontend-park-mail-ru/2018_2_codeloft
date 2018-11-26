import eventBus from '../../modules/EventBus/EventBus.js';

export default class Timer {
	constructor(duration) {
		this._duration = duration;
		this._passed = 0;
		this.ticker = this.tick.bind(this);
	}

	start() {
		this.tickLoop = setInterval(this.ticker, 1000);
	}

	tick() {
		this._passed++;
		eventBus.emit('timerTick', this._duration - this._passed);
		this.check();
	}

	getTimeLeft() {
		return this._duration - this._passed;
	}

	addDuration(sec) {
		this._duration += sec;
	}

	check() {
		if (this._duration <= this._passed) {
			this.stop();
		}
	}

	pause() {
		clearInterval(this.tickLoop);
	}

	stop() {
		if (this._duration) {
			clearInterval(this.tickLoop);
			this._passed = 0;
			this._duration = 0;
			eventBus.emit('timerStop');
		}
	}
}
