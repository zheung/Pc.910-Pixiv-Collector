var core = app.core = {};
var wins = core.wins = {};

core.checkLogin = function()
{
	if(!wins.login)
	{
		app.once('check-login', function(result)
		{
			if(!result)
			{
				app.gui.setLogined("你尚未登录");
				
				if(app.config.autoLogin)
				{
					app.gui.setLogined("你尚未登录, 自动登录中...");
					core.login(app.config.user.id, app.config.user.password);
				}
				else
					app.gui.execute('showLogin', {'id':app.config.user.id, 'password':app.config.user.password}, {'checked':app.config.autoLogin});
			}
			else
			{
				app.gui.setLogined('你已经登录, 用户名: '+result);
				app.gui.execute('showLogout');
				wins.login.close();
			}
		});
		
		wins.login = newWin();
		
		wins.login.webContents.once('dom-ready', function()
		{
			wins.login.stop();
			wins.login.execute('tool');
			wins.login.execute('check', { 'check':'login' }, { 'result':'$tqs("h1.user")?$tqs("h1.user").innerHTML:false' });
		});
		
		wins.login.once('closed', function()
		{
			log('[gui] wins.login closed');
			delete wins.login;
		});

		wins.login.loadWinUrl('http://www.pixiv.net/mypage.php');		

//		wins.login.webContents.on('did-start-loading', function()
//		{
//			log('did-start-loading');
//		});
//		var loadTimer = setInterval(function()
//		{
//			if(wins.login)
//			{
//				log('check-dom-load-'+(wins.login.getTitle()!='Electron'));
//				
//				if(wins.login.getTitle() != 'Electron')
//					clearInterval(loadTimer);
//				else
//				{
//					wins.login.stop();
//					wins.login.loadWinUrl();
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
				app.gui.setLogined('登录失败, 可能是账户或密码错误.');
				app.gui.execute('showLogin', {'id':app.config.user.id, 'password':app.config.user.password}, {'checked':app.config.autoLogin});
				wins.login.show()
//				wins.login.close();
			}
			else
			{
				app.gui.setLogined('你已经登录, 用户名: '+result);
				app.gui.execute('showLogout');
				wins.login.close();	
			}
		});
		
		wins.login.stop();
		wins.login.execute('tool');
		wins.login.execute('check', { 'check':'login' }, { 'result':'$tqs("h1.user")?$tqs("h1.user").innerHTML:false' });
	}
};

core.login = function(id, password)
{
	if(wins.login)
	{
		wins.login.webContents.once('dom-ready', function()
		{
			core.checkLogin();
		});
		
		wins.login.execute('login', { 'id':id, 'password':password });
	}
	else
	{
		wins.login = newWin();
		
		wins.login.webContents.once('dom-ready', function()
		{
			wins.login.stop();
			wins.login.execute('tool');
			wins.login.execute('login', { 'id':id, 'password':password });
		});
		
		wins.login.once('closed', function()
		{
			log('[gui] wins.login closed');
			delete wins.login;
		});

		wins.login.loadWinUrl('http://www.pixiv.net/');		
	}
};

core.logout = function()
{
	wins.logout = newWin();
	
	wins.logout.webContents.once('dom-ready', function()
	{
		app.gui.setLogined('你已经成功登出');
		app.gui.execute('showLogin', {'id':app.config.user.id, 'password':app.config.user.password}, {'checked':app.config.autoLogin});
		
		wins.logout.close();
	});
	
	wins.logout.once('closed', function()
	{
		log('wins.logout closed');
		delete wins.logout;
	});
	
	wins.logout.loadWinUrl('http://www.pixiv.net/logout.php?return_to=%2Fapps.php%3Fref%3Dlogout');
}