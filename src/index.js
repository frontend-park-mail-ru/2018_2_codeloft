'use strict';

import Main from "./views/Main/Main.js";
import SignIn from "./views/SignIn/SignIn.js";

const block = new SignIn();

block.build();

document.getElementById('main').appendChild(block.render());
