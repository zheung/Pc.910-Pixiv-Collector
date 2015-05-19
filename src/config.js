var config;

try
{
	config = require('../config');
}
catch(err)
{
	config =
	{
		"user":
		{
			"id": "",
			"password": ""
		},
		"autoLogin": false,
		"path":
		{
			"picSave": "C:/Pixiv-Collector/picture/"
		},
		"port":
		{
			"http": 910,
			"https": 911
		}
	};
}

module.exports = config;