'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Transport from '../../modules/Transport/Transport.js';
import eventHandler from '../../modules/EventHandler/EventHandler.js';


export default class HighScore extends BaseView {

    build() {
        eventHandler.addHandler('loadScoreRows', () => {
            this.updateScore();
        });
        this.template = `<ScoreTable>
						 <Block {{tagName=p}} {{class=score-loading}} {{text=loading...}}>
						 <Button {{text=Load more}} {{class=buttonGame}}, {{click=loadScoreRows}}>
                         <Button {{text=Back}} {{class=buttonGame}} {{click=goMenu}}>`;
        this.elementArray = tagParser.toHTML(this.template);
        this.scoreTable = this.elementArray[0].render();
        this.scoreTable.innerHTML = `<tr class="game-highScoreRow">
							<th>Player</th>
							<th>Email</th>
							<th>Score</th>
						   </tr>`;
        this.loadingLabel = this.elementArray[1].render();
        this.loadingLabel.style.display = 'none';
        this.loadMore = this.elementArray[2].render();
        this.loadMore.style.display = 'none';
        const div = document.createElement("div");
        div.setAttribute('class', 'highScore-page__list');
        this.elementArray.forEach(el => div.appendChild(el.render()));
        this.element = div;
        this.pageNumber = 0;
        this.updateScore()
    }

    updateScore() {

        this.loadingLabel.style.display = 'block';
        this.pageNumber++;
        Transport.Get(`/user?page=${this.pageNumber}&page_size=5`)
            .then((usersJSON) => usersJSON.json())
            .then(users => {
                console.log(users);
                let str = ``;
                for (let i = 0; i < 5; i++) {
                    str += `<tr class="game-highScoreRow">
                                <td>${users[i].login}</td>
                                <td>${users[i].email}</td>
                                <td>${users[i].score}</td>
							</tr>`;
                }
                this.loadingLabel.style.display = 'none';
                this.loadMore.style.display = 'block';
                this.scoreTable.innerHTML += str;
            })
            .catch(err => console.log(err));

    }

}
