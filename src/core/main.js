require('./init').globalInit();
require('./init').appInit();
require('./core');
require('./action');

app.once('ready', function()
{
	app.gui = require('./gui').init(app, function()
	{
		log('[gui] started')
		app.core.checkLogin();
	});
});