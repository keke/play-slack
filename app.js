'use strict';

var express = require('express');

var app = express();
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

// Start the server
var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
  console.log('App listening at http://%s:%s', server.address().address,
    server.address().port);
  console.log('Press Ctrl+C to quit.');
});
