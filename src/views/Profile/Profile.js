'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';

export default class Profile extends BaseView {
    constructor() {
        super();
        //this._needAuth = true;
    }

    build() {
        return new Promise((resolve) => {
            this.template = `<UserInfo>
                         <Button {{text=Back}} {{class=buttonGame}} {{click=goMenu}}>
                         <Button {{text=LogOut}} {{class=buttonGame}} {{click=logOut}}>`;
            tagParser.toHTML(this.template).then((elementsArray) => {
                this.elementsArray = elementsArray;
                const div = document.createElement("div");
                div.setAttribute('class', 'profile-page__info');
                this.elementsArray.forEach((el) => {
                    div.appendChild(el.render());
                });
                this.element = div;
                this.userBlock = this.elementsArray[0];
                resolve();
            });
        });
    }

    afterRender() {
        return new Promise((resolve) => resolve(this.userBlock.afterRender()));
    }

    show() {
        return super.show();
    }

}
