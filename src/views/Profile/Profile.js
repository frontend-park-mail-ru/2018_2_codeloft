'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';


export default class Profile extends BaseView {

	build() {
		this.template = `<UserInfo>
                         <Button {{text=Back}} {{class=buttonGame}} {{click=goMenu}}>`;
		this.element = tagParser.toHTML(this.template, {'class': 'profile-page__info'});
	}

}
