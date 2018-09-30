const express = require('express');
const app = express();

app.use('/', express.static('src'));
app.use('/about/', express.static('src'));
app.use('/login/', express.static('src'));
app.use('/register/', express.static('src'));
app.use('/score/', express.static('src'));
app.use('/profile/', express.static('src'));

app.listen(process.env.PORT || 3000);