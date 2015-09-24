"use strict";

var path = require('path');

var app = require('http').createServer(function handler (req, res) {
    res.writeHead(200);
    res.end('hello');
  }
);

var opts = {
  'transports': ['websocket'],
  'match origin protocol': true
};

if (process.env.IISNODE_VERSION) {
  opts['path'] = '/socket.io';
  opts['resource'] = '/socket.io';
}

var io = require('socket.io').listen(app, opts);


io.sockets.on('connection', function (socket) {
  console.log('socket:connection');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('app started');
});