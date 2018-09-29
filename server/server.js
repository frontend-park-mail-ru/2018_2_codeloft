const express = require('express');
const app = express();

app.use('/', express.static('src'));

const users = {
    // 'user': {
    //     login: 'asd',
    //     email: 'asd@asd.com',
    //     password: 'asdasdasd',
    //     score: '100500'
    // }
};

app.post('/signup', (req, res) => {
    const login = req.body.login;
    const email = req.body.email;
    const password = req.body.password;

    if (!users[login]) {
        users[login] = {
            'login': login,
            'email': email,
            'password': password,
            'singleScore': 0
        };
        res.cookie('auth', 'id', {expires: new Date(Date.now() + 900000), httpOnly: true);
        return res.status(201).json(users[login]);
    } else {
        return res.status(400).json({message: 'Логин или Email уже существует'});
    }
});

app.post('/signin', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;

    if (users[login] || users[login].password === password) {
        res.cookie('auth', 'id', {expires: new Date(Date.now() + 900000), httpOnly: true});
        return res.status(200).json(users[login]);
    } else {
        return res.status(400).json({message: 'Не верный Логин и/или пароль'});
    }
});

app.get('/user', (req, res) => {
    const login = req.body.login;
    if (!users[login]) {
        return res.status(401).end();
    } else {
        res.json(users[login]);
    }
});

app.get('/users', (req, res) => {
    const getUsers = Object.keys(users).map((login) => {
            return {
                'login': login,
                'email': users[login].email,
                'singleScore': users[login].singleScore
            };
        });

    res.json(getUsers);
});

app.listen(process.env.PORT || 3000);