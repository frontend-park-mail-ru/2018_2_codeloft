'use strict';

import MainComponent from '../MainComponent/MainComponent.js';

export default class UserInfo extends MainComponent {
    constructor() {
        super();
        this.template = `<div>
        <p>User: {{login}}</p>
        </div>`;
    }
}