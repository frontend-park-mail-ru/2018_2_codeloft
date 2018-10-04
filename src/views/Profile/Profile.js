'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';


export default class Profile extends BaseView {

	build() {
		this.template = `<UserInfo>
                         <Button {{text=Back}} {{class=buttonGame}} {{click=goMenu}}>`;
		this.elementArray = tagParser.toHTML(this.template);
        const div = document.createElement("div");
        div.setAttribute('class', 'profile-page__info');
        this.elementArray.forEach(el => div.appendChild(el));
        this.element = div;
	}

}
