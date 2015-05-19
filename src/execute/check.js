(function()
{
	var data =
	{
		'check': '~check~',
		'result': '~result~'
	};
	
	$tc(data, function()
	{
		console.log('--check: '+data.check+' = '+data.result);
	});
})();