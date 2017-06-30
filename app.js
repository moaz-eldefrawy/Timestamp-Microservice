var http = require("http"),
    express = require("express"),
    path = require('path'),
    fs = require('fs'),
    mustache = require("mustache");


const app = express();
var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/public');
/*app.get('/', function(req,res){
    res.sendFile( '' )
})*/

app.listen(1010);