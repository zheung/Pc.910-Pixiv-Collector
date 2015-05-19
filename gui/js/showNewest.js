(function()
{
	var a = document.createElement('a');
	a.id = 'action-newest';
	a.innerHTML = '登出';
	a.className = 'button';
	
	a.onclick = function()
	{
		$ta({ action:'newest' }, function()
		{
			console.log('--action: newest');
		});
	};
	
	$tqs('#bar-loginInfo').appendChild(a);
	
	var barLogin = $tqs('#bar-login');
	
	if(barLogin)
		barLogin.parentNode.removeChild(barLogin);
})();