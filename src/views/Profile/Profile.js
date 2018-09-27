'use strict';

import BaseView from "../BaseView/BaseView.js";
import tagParser from "../../modules/TagParser/TagParser.js";


export default class Profile extends BaseView {

    build() {
        this.template = `<div class="profile-page__info">
                         <UserInfo>
                         <Button {{text=Back}} {{class=buttonGame}}>
                         </div>`;
        let div = document.createElement('div');
        this.template = tagParser.toHTML(this.template);
        div.innerHTML = this.template;
        this.element = div.lastChild;
    }

}
