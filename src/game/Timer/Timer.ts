import eventBus from '../../modules/EventBus';

export default class Timer {
    private duration: number;
    private passed: number;
    private ticker: () => void;
    /* tslint:disable:no-any */
    private tickLoop: any;
    /* tslint:enable:no-any */

    constructor(duration) {
        this.duration = duration;
        this.passed = 0;
        this.ticker = this.tick.bind(this);
    }

    public start() {
        this.tickLoop = setInterval(this.ticker, 1000);
    }

    public getTimeLeft() {
        return this.duration - this.passed;
    }

    public addDuration(sec) {
        this.duration += sec;
    }

    public pause() {
        clearInterval(this.tickLoop);
    }

    public stop() {
        if (this.duration) {
            clearInterval(this.tickLoop);
            this.passed = 0;
            this.duration = 0;
            eventBus.emit('timerStop');
        }
    }

    private check() {
        if (this.duration <= this.passed) {
            this.stop();
        }
    }

    private tick() {
        this.passed++;
        eventBus.emit('timerTick', this.duration - this.passed);
        this.check();
    }
}
