const express = require('express');
const app = express();

app.get('/test-:id', function(req, res) {
    const options = {
        root: __dirname + '/public/',
    };

    res.sendFile('index.html', options, err => {
        if (err){
            console.log("error : " + err);
        }
    });
});

app.get('/public/:filename', (req,res) => {
    const filename = req.params.filename;
    console.log("download file " + filename);
    res.sendFile(filename, {root: __dirname + '/public/'}, err => {
        if (err){
            console.log("error : " + err);
        }
    });
});

app.get('/templates/:filename',(req,res) => {
   const filename = req.params.filename;
   console.log("download file " + filename);
    res.sendFile(filename, {root: __dirname + '/templates/'}, err => {
        if (err){
            console.log("In url: "+req.url+" error: " + err);
        }
    });
});

app.get('/static/*/:filename', (req, res) => {
    const filename = req.params.filename;
    let dir = __dirname + '/static/';
    urldirs = req.url.split('/');
    switch (urldirs[2]) {
        case 'css':
            dir = dir + 'css';
            break;
        case 'img':
            dir = dir +'img';
            break;
    }
    res.sendFile(filename, {root: dir}, err => {
        if (err){
            console.log("In url: "+req.url+" error: " + err);
        }
    })
});



app.listen(8080, () => console.log("Server started on port: " + 8080));

