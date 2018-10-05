'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import Transport from '../../modules/Transport/Transport.js';


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

        Transport.Get('/user')
            .then((usersJSON) => {
                usersJSON.text().then(text => console.log(text));
                this.loadingLabel.style.display = 'none';
                // usersJSON.json().then(text => console.log(text));
            })
            .catch(err => console.log(err));

    }

}
