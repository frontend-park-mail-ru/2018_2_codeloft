'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Transport from '../../modules/Transport/Transport.js';

export default class ScoreTable extends MainComponent {
	constructor(){
		super();
		this.usersFromBack = null;
	}
	compile(data) {
		// this.GetUsersFromBack(3, 1);
        //
		// const limit = 3;
		// const since = 1;
        //
		// Transport.Get('/stop?limit=' + limit + '&since=' + since).then((response) => {
		// 	this.usersFromBack = response;
		// }).catch((response) => {
		// 	if (!response.json) {
		// 		console.log(response);
		// 		return;
		// 	}
		// 	response.json().then((json) => {
		// 		console.log(json);
		// 	});
		// });

		// Handlebars.registerHelper('getRows', function () {
		// 	const user = {
		// 		name: 'Edward Bill',
		// 		region: 'Thailand',
		// 		score: 100500
		// 	};
		// 	let str = `<tr class="game-highScoreRow">
         //                 <th>Player</th>
         //                 <th>Region</th>
         //                 <th>Score</th>
         //               </tr>`;
		// 	for (let i = 0; i < 3; i++) {
		// 		str += `<tr class="game-highScoreRow">
         //                 <td>${user.name}</td>
         //                 <td>${user.region}</td>
         //                 <td>${user.score}</td>
         //               </tr>`;
		// 	}
		// 	return new Handlebars.SafeString(str);
		// });
		this.template = Handlebars.compile(`<table class="game-highScore"></table>`);
		this.template(data);
		super.compile(data);
	}

	// GetUsersFromBack(limit, since) {
	//     return Transport.Get('/stop?limit=' + limit + '&since=' + since).then((response) => {
	//         this.usersFromBack = response;
	//         console.log(this.usersFromBack);
	//     }).catch((response) => {
	//         if (!response.json) {
	//             console.log(response);
	//             return;
	//         }
	//         response.json().then((json) => {
	//             console.log(json);
	//         });
	//     });
	// }
}