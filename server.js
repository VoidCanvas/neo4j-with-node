var http = require('http');
var app = require('./app');
var port = 1111;


var server = http.createServer(app);
server.listen(port);
server.on('error', function () {
	console.log("error occured");
});
server.on('listening', function () {
	console.log("listening to port "+port);
});
