'use strict';

import BaseView from '../BaseView/BaseView.js'
import tagParser from '../../modules/TagParser/TagParser.js'
import Block from '../../components/Block/Block.js'


export default class SignIn extends BaseView {

	build() {
		this.template = `<Input {{name=login}} {{class=game-input signInLoginInput}} {{placeholder=Enter your login}}>
                         <Input {{name=password}} {{class=game-input signInPasswordInput}} {{placeholder=Enter your password}} {{type=password}}>
                         <Button {{class=buttonGame}} {{text=Sign in!}}>
                         <Button {{class=buttonGame}} {{text=Back}} {{click=goMenu}}>`;
		this.element = tagParser.toHTML(this.template, {'class': 'signIn-page__menu'}, 'form');
	}

}
