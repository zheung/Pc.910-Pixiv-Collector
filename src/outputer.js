var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res)
{
	if(req.url=='/output')
	{
		var body = [];

		req.on('data', function(chunk)
		{
			body.push(chunk);
		});
		
		req.on('end', function()
		{
			body = Buffer.concat(body);
			
			res.writeHead(200,
			{
				'Access-Control-Request-Method': 'GET, POST',
				'Access-Control-Allow-Origin':'*'
			});
			res.end();
			
			console.log(body.toString());
		});
	}
	else
	{
		console.log(req.url);
		
		req.on('end', function()
		{
			res.writeHead(404);
			res.end();
		});
	}
});

server.listen(912);

console.log('Outputer started');
exports.server = server;