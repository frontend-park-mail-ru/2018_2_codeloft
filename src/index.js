'use strict';

import router from './modules/Router/Router.js';
import Main from './views/Main/Main.js';
import About from './views/About/About.js';
import SignIn from './views/SignIn/SignIn.js';
import SignUp from './views/SignUp/SignUp.js';
import Profile from './views/Profile/Profile.js';
import HighScore from './views/HighScore/HighScore.js';
import SinglePlayer from './views/SinglePlayer/SinglePlayer.js';
import MultiPlayer from './views/MultiPlayer/MultiPlayer.js';
import Chat from './views/Chat/Chat.js';
import URLS from './modules/Consts/Consts.js';
import userService from './services/UserService/UserService.js';
import serviceWorkerRegister from './services/ServiceWorker/ServiceWorker.js';
import './static/css/main-page.scss';

serviceWorkerRegister();

userService.checkAuth()
	.then(() => {
		router
			.add(URLS.MENU, new Main())
			.add(URLS.ABOUT, new About())
			.add(URLS.SIGN_IN, new SignIn())
			.add(URLS.SIGN_UP, new SignUp())
			.add(URLS.PROFILE, new Profile())
			.add(URLS.HIGH_SCORE, new HighScore())
			.add(URLS.SINGLE_PLAYER, new SinglePlayer())
			.add(URLS.MULTI_PLAYER, new MultiPlayer())
			.add(URLS.CHAT, new Chat())
			.start();
	});
