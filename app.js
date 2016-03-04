'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var unirest = require('unirest');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/static', express.static(__dirname+'/app'));

app.get('/', function(req, res) {
  res.status(200).send('Hello, world!');
});

app.get('/iw',function(req,res){
  var options = {
   root: __dirname + '/views/',
   dotfiles: 'deny'
 };
  res.sendFile('iw.html', options);
});
var slackIwEndpoint = 'https://hooks.slack.com/services/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';
app.post('/iw-call', function(req, res){
  console.log(req.body);
  unirest.post(slackIwEndpoint).header({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }).send({text: req.body.text}).end(function(r){
    console.log('response: ' + r.body)
  });
});

// Start the server
var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
  console.log('App listening at http://%s:%s', server.address().address,
    server.address().port);
  console.log('Press Ctrl+C to quit.');
});
