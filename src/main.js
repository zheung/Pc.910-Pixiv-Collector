require('./init').globalInit();
require('./init').appInit();
require('./init').coreInit();
require('./action');

app.once('ready', function()
{
	app.gui = require('./gui').init(app, function()
	{
		log('[gui] started')
		app.core.checkLogin();
	});
});