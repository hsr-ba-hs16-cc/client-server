var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var uuidV4 = require('uuid/v4');

app.use(bodyParser.raw());

app.post('/v1/register', function(req, res) {
  if(req.body !== null) {
    res.send(new Buffer(uuidV4()).toString('base64'));
  } else {
    res.send(400);
  }
});

app.post('/v1/count', function(req, res) {
  if(req.body !== null) {
    res.send(new Buffer(uuidV4()).toString('base64'));
  } else {
    res.send(400);
  }
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
