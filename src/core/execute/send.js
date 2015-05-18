(function()
{
	var xhr = new XMLHttpRequest();
	
	xhr.open('get', location.href, true);
	xhr.responseType = 'blob';
	xhr.onload = function()
	{
		var reader = new FileReader();
		reader.onload = function(e)
		{
			var data =
			{
				'href': location.href,
				'data': e.target.result.replace(/.*base64,/,"")
			};
			
			$tf(data, function()
			{
				console.log('--file: '+data.href);
			});
		};
		
		reader.readAsDataURL(this.response);
	};
	
	xhr.send();
})();