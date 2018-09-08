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

app.listen(8080, () => console.log("Server started on port: " + 8080));

