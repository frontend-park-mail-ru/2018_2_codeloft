'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';


export default class HighScore extends BaseView {

    build() {
        this.template = `<Block {{tagName=p}} {{class=score-loading}} {{text=loading...}}>
						 <ScoreTable>
                         <Button {{text=Back}} {{class=buttonGame}} {{click=goMenu}}>`;
        this.elementArray = tagParser.toHTML(this.template);
        this.scoreTable = this.elementArray[1].render();
        this.loadingLabel = this.elementArray[0].render();
        const div = document.createElement("div");
        div.setAttribute('class', 'highScore-page__list');
        this.elementArray.forEach(el => div.appendChild(el.render()));
        this.element = div;
        this.updateScore()
    }

    updateScore() {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = {
                    name: 'Edward Bill',
                    region: 'Thailand',
                    score: 100500
                };
                let str = `<tr class="game-highScoreRow">
							<th>Player</th>
							<th>Region</th>
							<th>Score</th>
						   </tr>`;
                for (let i = 0; i < 3; i++) {
                    str += `<tr class="game-highScoreRow">
                                <td>${user.name}</td>
                                <td>${user.region}</td>
                                <td>${user.score}</td>
							</tr>`;
                }
                this.loadingLabel.style.display = 'none';
                this.scoreTable.innerHTML = str;
            }, 1000);
        });

    }

}
