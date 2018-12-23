export default class Goal {
    private readonly xCoord1: number;
    private readonly yCoord1: number;
    private readonly xCoord2: number;
    private readonly yCoord2: number;
    private readonly radius: number;
    private age: number;
    private readonly c1: number;
    private readonly c2: number;
    private readonly c3: number;
    private readonly length: number;

    constructor(x1, y1, x2, y2) {
        this.xCoord1 = x1;
        this.yCoord1 = y1;
        this.xCoord2 = x2;
        this.yCoord2 = y2;
        this.radius = 15;
        this.age = 0;
        this.c1 = this.getCoords().y2 - this.getCoords().y1;
        this.c2 = this.getCoords().x2 * this.getCoords().y1
            - this.getCoords().x1 * this.getCoords().y2;
        this.c3 = this.getCoords().x2 - this.getCoords().x1;
        this.length = Math.sqrt((this.xCoord1 - this.xCoord2) * (this.xCoord1 - this.xCoord2)
            + (this.yCoord1 - this.yCoord2) * (this.yCoord1 - this.yCoord2));
    }

    public calculateY(x) {
        return Math.round((this.c1 * x + this.c2) / this.c3);
    }

    public inInterval(y) {
        return y <= Math.max(this.yCoord1, this.yCoord2)
            && y >= Math.min(this.yCoord1, this.yCoord2);
    }

    public getLength() {
        return this.length;
    }

    public getRadius() {
        return this.radius;
    }

    public ageIncr() {
        this.age++;
    }

    public getAge() {
        return this.age;
    }

    public getCoords() {
        return {
            x1: this.xCoord1,
            y1: this.yCoord1,
            x2: this.xCoord2,
            y2: this.yCoord2,
        };
    }
}
