//log = console.log;
module.exports = function(app)
{
	var server = function(req, res)
	{
		if(req.url=='/file')//receive image
		{
			var data = [];

			req.on('data', function(chunk) { data.push(chunk); });
			
			req.on('end', function()
			{
				if(data.length)
					data = JSON.parse(Buffer.concat(data).toString());
				
				res.writeHead(200,
				{
					'Access-Control-Request-Method': 'GET, POST',
					'Access-Control-Allow-Origin':'*',
					'Cache-Control': 'no-cache'
				});
				res.end();
				
				app.emit('receive-image', data);
			});
		}
		else if(req.url=='/check')//receive check-result form page
		{
			var data = [];

			req.on('data', function(chunk) { data.push(chunk); });
			
			req.on('end', function()
			{
				if(data.length)
					data = JSON.parse(Buffer.concat(data).toString());
				
				res.writeHead(200,
				{
					'Access-Control-Request-Method': 'GET, POST',
					'Access-Control-Allow-Origin':'*',
					'Cache-Control': 'no-cache'
				});
				res.end();
				
				app.emit('check-'+data.check, data.result);
				log('[receiver] check: '+data.check+" = "+data.result);
			});
		}
		else if(req.url=='/action')//receive action from gui
		{
			var data = [];

			req.on('data', function(chunk) { data.push(chunk); });
			
			req.on('end', function()
			{
				if(data.length)
					data = JSON.parse(Buffer.concat(data).toString());
				
				res.writeHead(200,
				{
					'Access-Control-Request-Method': 'GET, POST',
					'Access-Control-Allow-Origin':'*',
					'Cache-Control': 'no-cache'
				});
				res.end();
				
				app.emit('action-'+data.action, data);
				log('[receiver] action: '+data.action);
			});
		}
		else if(req.url=='/get')//get Test
		{
			res.writeHead(200,
			{
				'Access-Control-Request-Method': 'GET, POST',
				'Access-Control-Allow-Origin':'*',
				'Cache-Control': 'no-cache'
			});
			res.write('Hello World');
			res.end();
			
			log('[receiver] get');
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
	}
	
	var receiver = { http:http.createServer(server), https:https.createServer({ pfx: fs.readFileSync('./ssl/ssl.pfx') }, server) };
		
	receiver.http.listen(app.config.port.http, null, null, function()
	{
		log('[receiver] http receiver started');
		receiver.https.listen(app.config.port.https, null, null, function()
		{
			log('[receiver] https receiver started');
		});
	});

	app.on('receive-file', function(data)
	{
		fs.writeFileSync(app.config.path.picSave+data.href.replace(/[^\/]*[\/]+/g, ''), new Buffer(data.data, 'base64'));
		log('[receiver] received a file: '+data.href.replace(/[^\/]*[\/]+/g, ''));
	});
	
	return receiver;
};