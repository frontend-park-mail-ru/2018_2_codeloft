const express = require('express');
const app = express();

app.get('/test-:id', function(req, res) {
    const options = {
        root: __dirname + '/public/',
        // dotfiles: 'deny',
        // headers: {
        //     'x-timestamp': Date.now(),
        //     'x-sent': true
        // }
    };

    res.sendFile('index.html', options, function(err) {
        if (err){
            console.log("error : " + err);
        }
    });
    // const text = req.params.id; //для шаблонизатора
});

app.get('/public/:filename', function(req,res) {
    const filename = req.params.filename;
    console.log("download file " + filename);
    res.sendFile(filename, {root: __dirname + '/public/'}, function(err) {
        if (err){
            console.log("error : " + err);
        }
    });
});

app.get('/templates/:filename', function (req,res){
   const filename = req.params.filename;
   console.log("download file " + filename);
    res.sendFile(filename, {root: __dirname + '/templates/'}, function(err) {
        if (err){
            console.log("In url: "+req.url+" error: " + err);
        }
    });
});

app.get('/static/*/:filename', function(req, res) {
    const filename = req.params.filename;
    let dir = __dirname + '/static/';
    urldirs = req.url.split('/');
    //console.log(urldirs);
    switch (urldirs[2]) {
        case 'css':
            dir = dir + 'css';
            break;
        case 'img':
            dir = dir +'img';
            break;
    }
    res.sendFile(filename, {root: dir}, function(err) {
        if (err){
            console.log("In url: "+req.url+" error: " + err);
        }
    })
});



app.listen(8080, () => console.log("Server started on port: " + 8080));

