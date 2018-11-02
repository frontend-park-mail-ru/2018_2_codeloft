'use strict';

import router from './modules/Router/Router.js';
import Main from './views/Main/Main.js';
import About from './views/About/About.js';
import SignIn from './views/SignIn/SignIn.js';
import SignUp from './views/SignUp/SignUp.js';
import Profile from './views/Profile/Profile.js';
import HighScore from './views/HighScore/HighScore.js';
import SinglePlayer from './views/SinglePlayer/SinglePlayer.js';
import URLS from './modules/Consts/Consts.js';
import userService from './services/UserService/UserService.js';

import './static/css/main-page.css';
import './static/css/about-page.css';
import './static/css/signIn-page.css';
import './static/css/signUp-page.css';
import './static/css/user-page.css';
import './static/css/leaderboard-page.css';

userService.checkAuth()
	.then(() => {
		router
			.add('/', new Main())
			.add(URLS.ABOUT, new About())
			.add(URLS.SIGN_IN, new SignIn())
			.add(URLS.SIGN_UP, new SignUp())
			.add(URLS.PROFILE, new Profile())
			.add(URLS.HIGH_SCORE, new HighScore())
			.add(URLS.SINGLE_PLAYER, new SinglePlayer());

		router.start();
	});
