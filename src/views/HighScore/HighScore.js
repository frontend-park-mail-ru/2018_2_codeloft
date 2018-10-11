'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Transport from '../../modules/Transport/Transport.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';


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
                this.loadingLabel = this.elementsArray[1];
                this.loadMore = this.elementsArray[2];

                this.scoreTable.innerHTML = `<tr class="game-highScoreRow">
                            <th>Player</th>
                            <th>Email</th>
                            <th>Score</th>
                           </tr>`;

                this.loadingLabel.style.display = 'none';
                this.loadMore.style.display = 'none';
                const div = document.createElement("div");
                div.setAttribute('class', 'highScore-page__list');
                this.elementsArray.forEach(el => div.appendChild(el));
                this.element = div;
                this.pageNumber = 0;
                this.updateScore();
                resolve();
            });
        });
    }

    updateScore() {

        this.loadingLabel.style.display = 'block';
        this.pageNumber++;
        Transport.Get(`/user?page=${this.pageNumber}&page_size=5`)
            .then((usersJSON) => {
                console.log(usersJSON);
                return usersJSON.json();
            })
            .then((users) => {
                let str = ``;
                users.forEach((user) => {
                    str += `<tr class="game-highScoreRow">
                                <td>${user.login}</td>
                                <td>${user.email}</td>
                                <td>${user.score}</td>
							</tr>`;
                });
                this.loadingLabel.style.display = 'none';
                this.loadMore.style.display = 'block';
                this.scoreTable.innerHTML += str;
            })
            .catch(err => console.log(err));

    }

}
