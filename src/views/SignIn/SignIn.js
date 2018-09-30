'use strict'

import BaseView from '../BaseView/BaseView.js'
import tagParser from '../../modules/TagParser/TagParser.js'
import Block from '../../components/Block/Block.js'


export default class SignIn extends BaseView {

	build() {
		this.template = `<Input {{class=game-input}} {{placeholder=Enter your email}}>
                         <Input {{class=game-input}} {{placeholder=Enter your password}} {{type=password}}>
                         <Button {{class=buttonGame}} {{text=Sign in!}}>
                         <Button {{class=buttonGame}} {{text=Back}} {{click=goMenu}}>`
		this.element = tagParser.toHTML(this.template, {'class': 'signIn-page__menu'}, 'form')
	}

}
