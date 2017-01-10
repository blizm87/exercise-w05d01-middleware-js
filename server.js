var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var product = require('./lib/products.js');
var fs = require('fs');

var app = express();
// serve a favicon from '/public'
// serve static files from '/public'
// log requests using morgan (format 'dev')
app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon2.ico'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//route handlers
app.get('/blah', function(req, resp){
  //var url = req.url;
  //var part = url.split('?');
  //var key = url.split('='); or
  var key = req.query.key;
  var html = 'You entered: ' + key;
  resp.send(html);
})

app.post('/blah', function(req, resp){
  var key = req.body.key;
  var html = 'You said: ' + key;
  resp.send(html);
})

app.get('/internal', function(req, resp){
  resp.redirect('/vendor/index.html');
})

app.get('/menu', function(req, resp){
  var html = '<ul>';
  product.forEach(function(value){
    html += '<li>' + value.name + '</li>';
  });
  html += '<ul>';
  resp.send(html);
})

app.get('/search', function(req, resp){
  for(var i = 0; i < product.length; i++){
    if(req.query.keyword === product[i].name){
      resp.send('<h1>'+req.query.keyword+'</h1>');
    }
  }
  // resp.sendFile(__dirname + '/public/search.html');
})

var allChat = [];
app.post('/messages', function(req, resp){
  var nl = '\n';
  var html = nl;
  allChat.push(req.body);
  allChat.forEach(function(value){
    html += '<p>' + value.message + '</p>';
  });
  resp.send('All chat messages: ' + html);
})

//listen on this port

var port = 3000;
app.listen(port, function(){
  console.log('up!');
});
