'use strict'

import BaseView from '../BaseView/BaseView.js'
import tagParser from '../../modules/TagParser/TagParser.js'


export default class HighScore extends BaseView {

	build() {
		this.template = `<ScoreTable>
                         <Button {{text=Back}} {{class=buttonGame}} {{click=goMenu}}>`
		this.element = tagParser.toHTML(this.template, {'class': 'highScore-page__list'})
	}

}
