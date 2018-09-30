'use strict'

import MainComponent from '../MainComponent/MainComponent.js'

export default class UserInfo extends MainComponent {
	compile(data) {
		const user = {name: 'Edward Bill', email: 'kek@mail.ru', score: 100500}
		this.template = Handlebars.compile(`<div>
        <p>User: ${user.name}</p>
        <p>Email: ${user.email}</p>
        <p>Score: ${user.score}</p>
        </div>`)
		this.template(user)
		console.log(this.template.element)
		super.compile(data)
	}
}