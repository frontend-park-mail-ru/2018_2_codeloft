'use strict';

import Main from "./views/Main/Main.js";
import SignIn from "./views/SignIn/SignIn.js";
import HighScore from "./views/HighScore/HighScore.js";

const block = new HighScore();

block.build();

document.getElementById('main').appendChild(block.render());