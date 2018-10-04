'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';


export default class Main extends BaseView {

	build() {
		this.template = `<Button {{class=buttonGame}} {{text=Sign in}} {{click=goLogin}}>
                         <Button {{class=buttonGame}} {{text=Sign up}} {{click=goRegister}}>
                         <Button {{class=buttonGame}} {{text=Rules}} {{click=goAbout}}>
                         <Button {{class=buttonGame}} {{text=High score}} {{click=goScore}}>
                         <Button {{class=buttonGame}} {{text=Profile}} {{click=goProfile}}>`;
		this.elementArray = tagParser.toHTML(this.template);
        const div = document.createElement("div");
        div.setAttribute('class', 'main-page_menu');
        this.elementArray.forEach(el => div.appendChild(el));
        this.element = div;
	}

}