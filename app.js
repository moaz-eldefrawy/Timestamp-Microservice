var http = require("http"),
    express = require("express"),
    path = require('path'),
    fs = require('fs'),
    mustache = require("mustache"),
    pug = require("pug");


const app = express();
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res) => {
  console.log("working");
  res.render('homepage');
})

app.listen(8080);