'use strict';

import router from "./modules/Router/Router.js";
import Main from "./views/Main/Main.js";
import About from "./views/About/About.js";
import SignIn from "./views/SignIn/SignIn.js";
import SignUp from "./views/SignUp/SignUp.js";
import Profile from "./views/Profile/Profile.js";
import HighScore from "./views/HighScore/HighScore.js";


router
    .add('/', new Main())
    .add('/about', new About())
    .add('/login', new SignIn())
    .add('/register', new SignUp())
    .add('/profile', new Profile())
    .add('/score', new HighScore());

router.start();