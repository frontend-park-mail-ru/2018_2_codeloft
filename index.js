const express = require('express');
const app = express();
const CSSFORMAT = 'css';
const IMGFORMAT = 'img';

const errorOutput = err => {
    if (err) {
        console.log(`In url: ${url} + error:  + ${req.err}`);
    }
};

app.get('/test-:id', (req, res) => {
    const options = {
        root: __dirname + '/public/',
    };

    res.sendFile('index.html', options, errorOutput);
});

app.get('/public/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log('download file ' + filename);
    res.sendFile(filename, {root: __dirname + '/public/'}, errorOutput);
});

app.get('/templates/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log('download file ' + filename);
    res.sendFile(filename, {root: __dirname + '/templates/'}, errorOutput);
});

app.get('/static/*/:filename', (req, res) => {
    const filename = req.params.filename;
    let dir = __dirname + '/static/';
    urldirs = req.url.split('/');
    switch (urldirs[2]) {
        case CSSFORMAT:
            dir = dir + CSSFORMAT;
            break;
        case IMGFORMAT:
            dir = dir + IMGFORMAT;
            break;
    }
    res.sendFile(filename, {root: dir}, errorOutput);
});


app.listen(8080, () => console.log('Server started on port: ' + 8080));

