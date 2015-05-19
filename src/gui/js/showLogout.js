(function()
{
	var a = document.createElement('a');
	a.id = 'action-logout';
	a.innerHTML = '登出';
	a.className = 'button';
	
	a.onclick = function()
	{
		$ta({ action:'logout' }, function()
		{
			console.log('--action: logout');
		});
	};
	
	$qs('#bar-loginInfo').appendChild(a);
	
	var barLogin = $qs('#bar-login');
	
	if(barLogin)
		barLogin.parentNode.removeChild(barLogin);
})();