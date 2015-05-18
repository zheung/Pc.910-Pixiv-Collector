//log = console.log;
module.exports = function(app)
{
	var receiver = http.createServer(function(req, res)
	{
		if(req.url=='/file')//receive image
		{
			var data = [];

			req.on('data', function(chunk) { data.push(chunk); });
			
			req.on('end', function()
			{
				data = JSON.parse(Buffer.concat(data).toString());
				
				res.writeHead(200,
				{
					'Access-Control-Request-Method': 'GET, POST',
					'Access-Control-Allow-Origin':'*'
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
				data = JSON.parse(Buffer.concat(data).toString());
				
				res.writeHead(200,
				{
					'Access-Control-Request-Method': 'GET, POST',
					'Access-Control-Allow-Origin':'*'
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
				data = JSON.parse(Buffer.concat(data).toString());
				
				res.writeHead(200,
				{
					'Access-Control-Request-Method': 'GET, POST',
					'Access-Control-Allow-Origin':'*'
				});
				res.end();
				
				app.emit('action-'+data.action, data);
				log('[receiver] action: '+data.action);
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

	receiver.listen(910, null, null, function()
	{
		log('[receiver] started');
	});

	app.on('receive-file', function(data)
	{
		fs.writeFileSync(app.config.path.picSave+data.href.replace(/[^\/]*[\/]+/g, ''), new Buffer(data.data, 'base64'));
		log('[receiver] received a file: '+data.href.replace(/[^\/]*[\/]+/g, ''));
	});
	
	return receiver;
};