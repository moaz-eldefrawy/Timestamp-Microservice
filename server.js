 /******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
/*app.route('/')
    .get(function(req, res) {
		  res.render(process.cwd() + '/views/homepage.pug');
    })
*/

// Respond not found to all the wrong routes


// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

var http = require("http"),
    path = require('path'),
    fs = require('fs'),
    mustache = require("mustache"),
    pug = require("pug");

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));


app.get('/', function(req, res){
  console.log("working");
  res.sendFile(process.cwd() + '/views/index.html', function(){
    res.end();
  });
});

app.get('*', function(req, res){
  var url = req.url,
      answer = {unix: 0, natural};
  if(url.indexOf('%') !== -1)
    res.end("date");

  else
    res.end("unix");
})

// respond not found to not wanted routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});
