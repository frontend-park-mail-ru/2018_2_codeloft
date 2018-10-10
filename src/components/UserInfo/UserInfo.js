'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class UserInfo extends MainComponent {
    constructor() {
        super();
        this.user = {name: 'Edward Bill', email: 'kek@mail.ru', score: 100500};
        this.template = `<div>
        <p>User: ${this.user.name}</p>
        <p>Email: ${this.user.email}</p>
        <p>Score: ${this.user.score}</p>
        </div>`;
    }
}