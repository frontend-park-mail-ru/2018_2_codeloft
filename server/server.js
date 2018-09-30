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

const users = [];
const usersAuth = {};

function userIsAuth(id) {
    return usersAuth[id] !== undefined;
}

function userLoginAndEmailExist(login, email) {
    return users.find(x => x.login.toUpperCase() === login.toUpperCase())
        && users.find(x => x.email.toUpperCase() === email.toUpperCase());
}

function userLoginAndPasswordExist(login, password) {
    return users.find(x => x.login.toUpperCase() === login.toUpperCase()
        && x.password.toUpperCase() === password.toUpperCase());
}

function getUser(login) {
    return (users.find(x => x.login.toUpperCase() === login.toUpperCase()));
}

app.post('/signup', (req, res) => {
    const login = req.body.login;
    const email = req.body.email;
    const password = req.body.password;
    const id = users.length === 0 ? 0 : users.length + 1;

    if (userLoginAndEmailExist(login, email) === undefined) {
        users.push({
            'id': id,
            'login': login,
            'email': email,
            'password': password,
            'singleScore': 0
        });
        usersAuth[id] = {'login': login};
        res.cookie('auth', id, {expires: new Date(Date.now() + 900000), httpOnly: true});
        return res.status(201).json(users[login]);
    } else {
        return res.status(400).json({message: 'Login or Email already exists'});
    }
});

app.post('/signin', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    if (userLoginAndPasswordExist(login, password)) {
        const id = getUser(login).id;
        usersAuth[id] = {'login': login};
        res.cookie('auth', id, {expires: new Date(Date.now() + 900000), httpOnly: true});
        return res.status(200).json(users[login]);
    } else {
        return res.status(400).json({message: 'Wrong login or password'});
    }
});

app.get('/user', (req, res) => {
    const login = req.body.login;
    const user = getUser(login);
    if (user !== undefined) {
        res.json(user);
    } else {
        return res.status(401).end();
    }
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/logout', (req, res) => {
    const id = req.cookies.auth;
    if (userIsAuth(id)) {
        res.cookie('auth', '', {expires: new Date()});
        res.json({});
    } else {
        return res.status(401).end();
    }
});

app.listen(process.env.PORT || 3000);