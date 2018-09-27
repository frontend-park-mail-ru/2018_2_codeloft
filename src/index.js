'use strict';

import Main from "./views/Main/Main.js";
import SignIn from "./views/SignIn/SignIn.js";
import HighScore from "./views/HighScore/HighScore.js";
import Profile from "./views/Profile/Profile.js";

const block = new Profile();

block.build();

document.getElementById('main').appendChild(block.render());