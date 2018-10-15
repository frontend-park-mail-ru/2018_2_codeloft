'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Transport from '../../modules/Transport/Transport.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';
import userService from '../../services/UserService/UserService.js';


export default class HighScore extends BaseView {

    build() {
        eventHandler.addHandler('loadScoreRows', () => this.updateScore());
        return new Promise((resolve) => {
            this.template = `<ScoreTable>
						 <Label {{class=score-loading}} {{text=loading...}}>
						 <Button {{text=Load more}} {{class=buttonGame}}, {{click=loadScoreRows}}>
                         <Button {{text=Back}} {{class=buttonGame}} {{click=goMenu}}>`;
            tagParser.toHTML(this.template).then((elementsArray) => {
                this.elementsArray = elementsArray;
                this.scoreTable = this.elementsArray[0];
                this.loadingLabel = this.elementsArray[1].render();
                this.loadMore = this.elementsArray[2].render();
                this.loadingLabel.style.display = 'none';
                const div = document.createElement("div");
                div.setAttribute('class', 'highScore-page__list');
                this.elementsArray.forEach((el) => {
                    div.appendChild(el.render());
                });
                this.element = div;
                resolve();
            });
        });
    }

    updateScore() {

        this.loadingLabel.style.display = 'block';
        this.scoreTable.loadScore().then(() => {
            this.loadingLabel.style.display = 'none';
            this.loadMore.style.display = 'block';
        });
    }

}
