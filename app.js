"use strict";
var PORT = process.env.PORT || 3000;

var express = require('express');
var path = require('path');
var cors = require('cors');
var http = require('http');


var app = express();
app.set('port', PORT);
app.use(cors());
app.get('/', function (req, res) {
  res.end('hello');
});
app.use(function (req, res, next) {
  res.status(404).end('404 not found');
});


var webServer = http.createServer(app).listen(PORT, function () {
  console.log('app started');
});


var opts = {
  //'transports': ['websocket'],
  'match origin protocol': true
};

if (process.env.IISNODE_VERSION) {
  opts['resource'] = '/socket.io';
  opts['path'] = '/socket.io';
}

var io = require("socket.io")(webServer, opts);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});