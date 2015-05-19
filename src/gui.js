var BrowserWindow = require('browser-window');

var win;

exports.init = function(app, callback)
{
	win = new BrowserWindow(
	{
		'width': 1280,
		'height': 720,
		'show': false,
	});
	
	win.openDevTools();

	win.once('closed', function()
	{
		app.receiver.http.close();
		app.receiver.https.close();
		app.quit();
	});
	
	win.webContents.once('did-finish-load', function()
	{
		win.execute('tool');
		
		win.show();
		
		win.execute = function(script, dictS, dictC)
		{
			try
			{
				var exeScript = fs.readFileSync('./gui/js/'+script+'.js').toString();
				
				for(var key in dictS)
					exeScript = exeScript.replace(eval('/\'~'+key+'~\'/'), '\''+dictS[key]+'\'');
				
				for(var key in dictC)
					exeScript = exeScript.replace(eval('/\'~'+key+'~\'/'), dictC[key]);

				win.webContents.executeJavaScript(exeScript);
			}
			catch(err)
			{
				win.webContents.executeJavaScript(script);
			}
		}
		
		if(callback) callback();
	});
	
	win.loadWinUrl('file://'+ __dirname.replace('\src', '\gui') +'/main.html');
	
	return exports;
};

exports.execute = function(script, dictS, dictC)
{
	if(win)
		win.execute(script, dictS, dictC);
};

exports.setLogined = function(content)
{
	if(win)
		win.execute('$tqs("#bar-loginInfo>span").innerHTML = "'+content+'"');
};