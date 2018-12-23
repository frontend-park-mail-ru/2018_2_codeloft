export default class Bonus {
    private readonly effect: number;
    private readonly x: number;
    private readonly y: number;

    constructor(x, y) {
        this.effect = Math.floor(Math.random() * 1000) % 3;
        this.x = x;
        this.y = y;
    }

    public getEffect() {
        return this.effect;
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }
}
