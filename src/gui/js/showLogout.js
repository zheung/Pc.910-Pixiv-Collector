(function()
{
	var a = document.createElement('a');
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
})();