'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';


export default class Profile extends BaseView {

	build() {
	    return new Promise((resolve) => {
            this.template = `<UserInfo>
                         <Button {{text=Back}} {{class=buttonGame}} {{click=goMenu}}>`;
            tagParser.toHTML(this.template).then((elementsArray) => {
                this.elementsArray = elementsArray;
                const div = document.createElement("div");
                div.setAttribute('class', 'profile-page__info');
                this.elementsArray.forEach(el => div.appendChild(el));
                this.element = div;
                resolve();
            });
        });
	}

}
