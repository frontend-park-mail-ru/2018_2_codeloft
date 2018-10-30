'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Transport from '../../modules/Transport/Transport.js';

export default class ScoreTable extends MainComponent {
	loadScore() {
		return Transport.Get(`/user?page=${this.pageNumber}&page_size=5`)
			.then((usersJSON) => usersJSON.json())
			.then((users) => {
				this.pageNumber++;
				// const rows = users.reduce((str, user) => `${str}<tr class="game-highScoreRow">
                 //                <td>${user.login}</td>
                 //                <td>${user.email}</td>
                 //                <td>${user.score}</td>
                 //         </tr>`, '');
				// if (this.element) {
				// 	this.element.innerHTML += rows;
				// }
				users.forEach((user) => {
					this.element.innerHTML += `<p>${user.login} ${user.score}</p>`;
				});
				return rows;
			})
			.catch((err) => err);
	}

	preRender() {
		this.pageNumber = 1;
		this.template = '<div class="leaderboard-page__users"></div>';
		// this.template = `<table class="game-highScore">
         //                             <tr class="game-highScoreRow">
         //                                <th>Player</th>
         //                                <th>Email</th>
         //                                <th>Score</th>
         //                            </tr>
         //                        </table>`;
		return super.preRender();
	}
}
