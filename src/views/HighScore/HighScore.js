'use strict';

import BaseView from "../BaseView/BaseView.js";
import tagParser from "../../modules/TagParser/TagParser.js";


export default class HighScore extends BaseView {

    build() {
        this.template = `<div class="highScore-page__list">
                         <ScoreTable>
                         </div>`;
        let div = document.createElement('div');
        this.template = tagParser.toHTML(this.template);
        div.innerHTML = this.template;
        this.element = div.lastChild;
    }

}
