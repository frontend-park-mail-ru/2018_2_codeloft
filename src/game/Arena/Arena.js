import Player from '../Player/Player.js';

export default class Arena {
    constructor() {
        this._gameBlock = document.getElementsByClassName('game-field')[0];
        this._context = this._gameBlock.getContext('2d');
        this._xZero = 0;
        this._yZero = 0;
        this._xMax = this._gameBlock.width - this._xZero;
        this._yMax = this._gameBlock.height - this._yZero;
        this.clearField();
    }

    clearField() {
        this._context.beginPath();
        this._context.clearRect(0, 0, this._xMax, this._yMax);
        this._context.closePath();
        this._context.beginPath();
    }

    clearPlayer(player) {
        if (player) {
            this._context.globalCompositeOperation = 'destination-out';
            this._context.beginPath();
            this._context.arc(player.getX(), player.getY(), player.getRadius() + 2, 0, 2 * Math.PI);
            this._context.fillStyle = '#0C141F';
            this._context.fill();
            this._context.closePath();
        }
    }

    drawPlayer(player = new Player()) {
        console.log(this._gameBlock.getBoundingClientRect().width);
        this._context.globalCompositeOperation = 'source-over';
        this._context.beginPath();
        this._context.arc(player.getX(), player.getY(), player.getRadius(), 0, 2 * Math.PI);
        this._context.fillStyle = player.getColor();
        this._context.fill();
        this._context.closePath();
        return player;
    }

    spawnGoal() {
        const firstX = Math.floor(Math.random() * (this._xMax - this._xZero + 1) + this._xZero);
        const firstY = Math.floor(Math.random() * (this._yMax - this._yZero + 1) + this._yZero);

        const secondX = Math.floor(Math.random() * (firstX + 500 - firstX + 1)) + firstX;
        const secondY = Math.floor(Math.random() * (firstY + 500 - firstY + 1)) + firstY;

        this._context.globalCompositeOperation = 'source-over';
        this._context.beginPath();
        this._context.arc(Math.floor(firstX / 10) + 1, Math.floor(firstY / 10) + 1, 2, 0, 2 * Math.PI);
        this._context.arc(Math.floor(secondX / 10) + 1, Math.floor(secondY / 10) + 1, 2, 0, 2 * Math.PI);
        this._context.fillStyle = '#FFE64D';
        this._context.fill();
        this._context.closePath();

        this._context.beginPath();
        this._context.moveTo(firstX / 10 + 1, firstY / 10 + 1);
        this._context.lineTo(secondX / 10 + 1, secondY / 10 + 1);
        this._context.strokeStyle = '#FFE64D';
        this._context.stroke();
        this._context.closePath();
    }

    checkBorderCollision(player) {
        if (player.getX() < this._xZero) {
            player.setX(this._xMax);
        }
        if (player.getY() < this._yZero) {
            player.setY(this._yMax);
        }
        if (player.getX() > this._xMax) {
            player.setX(this._xZero);
        }
        if (player.getY() > this._yMax) {
            player.setY(this._yZero);
        }
    }
}
