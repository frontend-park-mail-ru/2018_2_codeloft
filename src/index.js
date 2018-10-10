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


router
	.add('/', new Main())
	.add(URLS.ABOUT, new About())
	.add(URLS.SIGN_IN, new SignIn())
	.add(URLS.SIGN_UP, new SignUp())
	.add(URLS.PROFILE, new Profile())
	.add(URLS.HIGH_SCORE, new HighScore())
	.add(URLS.SINGLEPLAYER, new SinglePlayer());

router.start();
