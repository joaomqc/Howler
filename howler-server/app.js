var express = require('express');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes/setup')(app);

var server = require('./server-setup')(app);

require('./socket/setup')(server);

module.exports = app;
