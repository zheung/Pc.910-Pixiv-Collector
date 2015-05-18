exports.globalInit = function()
{
//Init official module
	http = require('http');
	fs = require('fs');
	EventEmitter = require('events').EventEmitter;
//Init electron module
	app = require('app');
	BrowserWindow = require('browser-window');
//Init util function
	log = function(data)
	{
		var req = http.request(
		{
	        hostname: '127.0.0.1',
	        port: 911,
	        path: '/output',
	        method: 'POST'
	    });

		req.on('error', function() {});
		
		req.write('[Pc.910] ');
		req.write(typeof some == 'string'?data:String(data));
		req.end();
	};

	execute = function(script, dictS, dictC)
	{
		try
		{
			var content = fs.readFileSync('./src/core/execute/'+script+'.js').toString();
			
			for(var key in dictS)
				content = content.replace(eval('/\'~'+key+'~\'/'), '\''+dictS[key]+'\'');
			
			for(var key in dictC)
				content = content.replace(eval('/\'~'+key+'~\'/'), dictC[key]);

			return content;
		}
		catch(err)
		{
			return null;
		}
	};
//Init prototype function
	BrowserWindow.prototype.loadWinUrl = function()
	{
		if(arguments[0])
			this.winUrl = arguments[0];

		return this.webContents.loadUrl(this.winUrl);
	};
	BrowserWindow.prototype.execute = function(script, dictS, dictC)
	{
		var exeScript = execute(script, dictS, dictC);
		
		if(exeScript)
			this.webContents.executeJavaScript(exeScript);
		else
			this.webContents.executeJavaScript(script);
	};
//Init variable
	winOption =
	{
		'width': 1280,
		'height': 720,
		'show': true,
		'node-integration': false,
	}

	userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36';
}

exports.appInit = function()
{
	app.setMaxListeners(100);
	
	app.commandLine.appendSwitch('ignore-gpu-blacklist');
	app.commandLine.appendSwitch('disable-direct-write');
	
	app.config = require('../../config');
	app.receiver = require('./receiver')(app);
}