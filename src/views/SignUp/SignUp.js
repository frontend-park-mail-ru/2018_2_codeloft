'use strict';

import BaseView from '../BaseView/BaseView.js'
import tagParser from '../../modules/TagParser/TagParser.js'


export default class SignUp extends BaseView {

	build() {
		this.template = `<Input {{name=login}} {{class=game-input signUpLoginInput}} {{placeholder=Enter your login}}>
					     <Input {{name=email}} {{class=game-input signUpEmailInput}} {{placeholder=Enter your email}}>
                         <Input {{name=password}} {{class=game-input signUpPasswordInput}} {{placeholder=Enter your password}} {{type=password}}>
                         <Input {{name=passwordConfirm}} {{class=game-input signUpPasswordConfirmInput}} {{placeholder=Repeat your password}} {{type=password}}>
                         <Button {{class=buttonGame}} {{text=Sign up!}}>
                         <Button {{class=buttonGame}} {{text=Back}} {{click=goMenu}}>`;
		this.element = tagParser.toHTML(this.template, {'class': 'signUp-page__menu'}, 'form');

	}

}
