'use strict';

import Main from "./views/Main/Main.js";
import About from "./views/About/About.js";

const block = new Main();

block.build();

document.getElementById('main').appendChild(block.render());
