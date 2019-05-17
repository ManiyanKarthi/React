var express = require('express');
var app = express();
var planning = require('./routes/planning')
var utility = require('./routes/utility')
var testing = require('./routes/testing')
var users = require('./routes/users')
var bodyParser = require('body-parser');
var cors = require('cors');

app.use('/planning',planning);
app.use('/utility',utility);
app.use('/testing',testing);
app.use('/users',users);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }))


var server = app.listen(8091, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});
