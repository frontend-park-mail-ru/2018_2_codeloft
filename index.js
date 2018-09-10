var express = require('express');
var app = express();

app.get('/test-:id', function(req, res) {
    var options = {
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
    var text = req.params.id;

});

app.get('/public/:filename', function(req,res) {
    var filename = req.params.filename;
    console.log(filename);
    res.sendFile(filename, {root: __dirname + '/public/'}, function(err) {
        if (err){
            console.log("error : " + err);
        }
    });
});

app.listen(8080);

