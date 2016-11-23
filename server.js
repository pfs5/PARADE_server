var http = require('http');
var fs = require('fs');
var url = require('url');

var PORT = 8080;


// Create server
http.createServer(function(request, response) {

	// Get requested file
	var pathname = url.parse(request.url).pathname;
	
	// Redirect / to /index.html
	if (pathname == '/') {
		pathname = '/index.html';		
	}
	console.log('Request for ' + pathname + ' recieved.');

	// Response
	fs.readFile(pathname.substr(1), function(err, data) {
		if (err) {
			// Page not found
			console.log(err);
			response.writeHead(404, {'Content-Type': 'text/html'});	
			response.write('Page ' + pathname + ' not found.');	
		} else {
			// Page found
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data.toString());
		}	

		response.end();
	});

}).listen(PORT);

// Print to console
console.log('Started server at localhost:' + PORT);
