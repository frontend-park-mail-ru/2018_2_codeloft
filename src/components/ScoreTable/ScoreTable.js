'use strict'

import MainComponent from '../MainComponent/MainComponent.js'

export default class ScoreTable extends MainComponent {
	compile(data) {
		Handlebars.registerHelper('getRows', function () {
			const user = {
				name: 'Edward Bill',
				region: 'Thailand',
				score: 100500
			}
			let str = `<tr class="game-highScoreRow">
                         <th>Player</th>
                         <th>Region</th>
                         <th>Score</th>
                       </tr>`
			for (let i = 0; i < 3; i++) {
				str += `<tr class="game-highScoreRow">
                         <td>${user.name}</td>
                         <td>${user.region}</td>
                         <td>${user.score}</td>
                       </tr>`
			}
			return new Handlebars.SafeString(str)
		})
		this.template = Handlebars.compile(`<table class="game-highScrore">
                                               {{getRows}}
                                            </table>`)
		this.template(data)
		super.compile(data)
	}
}