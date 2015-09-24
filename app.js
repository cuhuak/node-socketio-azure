"use strict";
var PORT = process.env.port || 3000;

var express = require('express');
var path = require('path');
var cors = require('cors');
var http = require('http');


var app = express();
app.set('port', PORT);
app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));


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