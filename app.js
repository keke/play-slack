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
//incomingweb call, forward to Slack
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

//Slack command
app.post('/cmd/:name', function(req, res){});
app.get('/cmd/:name', function(req, res){});

//Slack bot, using Botkit at current moment
var botToken = 'xoxb-24607625335-vXzakLYcDRmyQqAuRsClw1mP';
var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: botToken
});
bot.startRTM(function(err, bot){
  if (err) {
    throw new Error('Could not connect to Slack');
  }else{
    console.log('Bot ' + bot + ' connected');
  }
});

controller.hears('create channel (.*)', 'direct_message', function(bot, message){
  var channel = message.match[1];
  console.log('To create a new channel: ' + channel);
  bot.api.channels.create({
    token: 'xoxp-24135013921-24133214530-24617448449-7048323676',
    name: channel
  }, function(err, resp){
    if(err){
      console.log('Can not create channel ' + channel +','+ err);
      bot.reply(message, 'Can not create channel : ' + channel);
    }else{
      bot.reply(message, 'Channel ' + channel + ' created');
    }
  });
});



// Start the server
var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
  console.log('App listening at http://%s:%s', server.address().address,
    server.address().port);
  console.log('Press Ctrl+C to quit.');
});
