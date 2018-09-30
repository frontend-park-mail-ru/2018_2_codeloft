const express = require('express');
const app = express();


import router from "src/modules/Router/Router.js";
import Main from "src/views/Main/Main.js";
import About from "src/views/About/About.js";
import SignIn from "src/views/SignIn/SignIn.js";
import SignUp from "src/views/SignUp/SignUp.js";
import Profile from "src/views/Profile/Profile.js";
import HighScore from "src/views/HighScore/HighScore.js";


router
    .add('/', new Main())
    .add('/about', new About())
    .add('/login', new SignIn())
    .add('/register', new SignUp())
    .add('/profile', new Profile())
    .add('/score', new HighScore());

router.start();

app.use('/', express.static('src'));

app.listen(process.env.PORT || 3000);