$tqa = function(query)
{
	return document.querySelectorAll(query);
};
$tqs = function(query)
{
	return document.querySelector(query);
};

$ts = function(path, data, callback)
{
	var xhr = new XMLHttpRequest();
//	xhr.open('POST', 'http://127.0.0.1:910/'+path, true);
	xhr.open('POST', location.protocol+'//127.0.0.1:'+(location.protocol=='http:'?910:911)+'/'+path, true);
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.send(JSON.stringify(data));
	
	xhr.onload = function()
	{
		console.log('requested Receiver; Type='+path);
		if(callback) callback();
	};
};
$ta = function(data, callback) { $ts('action', data, callback) };
$tc = function(data, callback) { $ts('check', data, callback) };
$tf = function(data, callback) { $ts('file', data, callback) };

if(location.protocol=='https:')
{
	(function()
	{
		var m = document.createElement('meta');
		m.httpEquiv = 'Content-Security-Policy';
		m.content = "connect-src 'self' https://127.0.0.1:911";
		document.head.appendChild(m);
	})();
}