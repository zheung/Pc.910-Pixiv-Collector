app.on('action-logout', function()
{
	app.core.logout();
});

app.on('action-login', function(data)
{
	app.core.login(data.id, data.password);
	
	if(data.remember)
	{
		app.config.user.id = data.id;
		app.config.user.password = data.password;
		app.config.autoLogin = true;

		fs.writeFile('./config.json', JSON.stringify(app.config, null, '\t'));
	}
});
