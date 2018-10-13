'use strict';

import BaseView from '../BaseView/BaseView.js';
import tagParser from '../../modules/TagParser/TagParser.js';
import userService from '../../services/UserService/UserService.js';
import URLS from '../../modules/Consts/Consts.js';
import router from '../../modules/Router/Router.js';

export default class Profile extends BaseView {

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
                    if (el.needAuth() && !userService.isLogIn()) {
                        el.hide();
                    }
                });
                this.element = div;
                resolve();
            });
        });
    }

    show() {
        userService.checkAuth()
            .then((ok) => {
                if (!ok) {
                    router.go(URLS.SIGN_IN);
                } else {
                    super.show();
                }
            });
    }

}
