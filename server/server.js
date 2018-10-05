const express = require('express');
const cookie = require('cookie-parser');
const body = require('body-parser');

const app = express();
app.use(cookie());
app.use(body.json());

app.use('/', express.static('src'));
app.use('/about/', express.static('src'));
app.use('/login/', express.static('src'));
app.use('/register/', express.static('src'));
app.use('/score/', express.static('src'));
app.use('/profile/', express.static('src'));

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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    next();
});

app.get('/test', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify({test: "123"}));
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
    if (req.cookies !== undefined) {
        return res.json(users);
    } else {
        return res.status(401).end();
    }
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