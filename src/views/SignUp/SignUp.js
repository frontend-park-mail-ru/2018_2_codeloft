'use strict'

import BaseView from '../BaseView/BaseView.js'
import tagParser from '../../modules/TagParser/TagParser.js'


export default class SignUp extends BaseView {

	build() {
		this.template = `<Input {{class=game-input}} {{placeholder=Enter your email}}>
                         <Input {{class=game-input}} {{placeholder=Enter your login}}>
                         <Input {{class=game-input}} {{placeholder=Enter your password}} {{type=password}}>
                         <Input {{class=game-input}} {{placeholder=Repeat your password}} {{type=password}}>
                         <Button {{class=buttonGame}} {{text=Sign up!}}>
                         <Button {{class=buttonGame}} {{text=Back}} {{click=goMenu}}>`
		this.element = tagParser.toHTML(this.template, {'class': 'signUp-page__menu'}, 'form')

	}

}
