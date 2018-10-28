'use strict';

import MainComponent from '../MainComponent/MainComponent.js';
import Transport from '../../modules/Transport/Transport.js';

export default class ScoreTable extends MainComponent {

    loadScore() {
        return Transport.Get(`/user?page=${this.pageNumber}&page_size=5`)
            .then((usersJSON) => usersJSON.json())
            .then((users) => {
                this.pageNumber++;
                const rows = users.reduce((str, user) => {
                    return str + `<tr class="game-highScoreRow">
                                <td>${user.login}</td>
                                <td>${user.email}</td>
                                <td>${user.score}</td>
                         </tr>`;
                }, '');
                if (this.element) {
                    this.element.innerHTML += rows;
                }
                return rows;
            })
            .catch(err => console.log(err));
    }

    show() {
        if (this.element) {
            this.element.style.display = 'table';
        }
    }

    preRender() {
        this.pageNumber = 1;
        this.template = `<table class="game-highScore">
                                     <tr class="game-highScoreRow">
                                        <th>Player</th>
                                        <th>Email</th>
                                        <th>Score</th>
                                    </tr>
                                </table>`;
        return super.preRender();
    }
}