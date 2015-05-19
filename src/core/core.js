var core = app.core = {};
var wins = core.wins = {};

core.checkLogin = function()
{
	if(!wins.checkLogin)
	{
		app.once('check-login', function(result)
		{
			if(!result)
			{
				app.gui.setLogined("你尚未登录");
				
				if(app.config.autoLogin)
					core.login(app.config.user.id, app.config.user.password);
				else
					app.gui.execute('showLogin', {'id':app.config.user.id, 'password':app.config.user.password}, {'checked':app.config.autoLogin});
			}
			else
			{
				app.gui.setLogined('你已经登录, 用户名: '+result);
				app.gui.execute('showLogout');
			}
		});
		
		wins.checkLogin = new BrowserWindow(winOption);
		
		wins.checkLogin.openDevTools();
		wins.checkLogin.webContents.setUserAgent(userAgent);
		
		wins.checkLogin.webContents.once('dom-ready', function()
		{
			wins.checkLogin.stop();
			wins.checkLogin.execute('init');
			wins.checkLogin.execute('check', { 'check':'login' }, { 'result':'$tqs("h1.user")?$tqs("h1.user").innerHTML:false' });
		});
		
		wins.checkLogin.once('closed', function()
		{
			log('[gui] wins.checkLogin closed');
			delete wins.checkLogin;
		});

		wins.checkLogin.loadWinUrl('http://www.pixiv.net/mypage.php');		

//		wins.checkLogin.webContents.on('did-start-loading', function()
//		{
//			log('did-start-loading');
//		});
//		var loadTimer = setInterval(function()
//		{
//			if(wins.checkLogin)
//			{
//				log('check-dom-load-'+(wins.checkLogin.getTitle()!='Electron'));
//				
//				if(wins.checkLogin.getTitle() != 'Electron')
//					clearInterval(loadTimer);
//				else
//				{
//					wins.checkLogin.stop();
//					wins.checkLogin.loadWinUrl();
//				}
//			}
//		}, 5214);
	}
	else
	{
		app.once('check-login', function(result)
		{
			if(!result)
			{
				app.gui.setLogined('登录失败, 可能是账户或密码错误');
				app.gui.execute('showLogin', {'id':app.config.user.id, 'password':app.config.user.password}, {'checked':app.config.autoLogin});
				
				wins.checkLogin.close();
			}
			else
			{
				app.gui.setLogined('你已经登录, 用户名: '+result);
				app.gui.execute('showLogout');
				wins.checkLogin.close();	
			}
		});
		
		wins.checkLogin.stop();
		wins.checkLogin.execute('init');
		wins.checkLogin.execute('check', { 'check':'login' }, { 'result':'$tqs("h1.user")?$tqs("h1.user").innerHTML:false' });
	}
};

core.login = function(id, password)
{
	wins.checkLogin.webContents.once('dom-ready', function()
	{
		core.checkLogin();
	});
	
	wins.checkLogin.execute('login', { 'id':id, 'password':password });
};

core.logout = function()
{
	wins.logout = new BrowserWindow(winOption);	
	
	wins.logout.openDevTools();
	wins.logout.webContents.setUserAgent(userAgent);
	
	wins.logout.webContents.once('dom-ready', function()
	{
		app.gui.setLogined('你已经成功登出');
		app.gui.execute('showLogin', {'id':app.config.user.id, 'password':app.config.user.password}, {'checked':app.config.autoLogin});
	});
	
	wins.logout.once('closed', function()
	{
		log('wins.logout closed');
		delete wins.logout;
	});
	
	wins.logout.loadWinUrl('http://www.pixiv.net/logout.php?return_to=%2Fapps.php%3Fref%3Dlogout');
}