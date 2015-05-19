910 Pixiv-Collector
====
A app based on [Electron](http://github.com/atom/Electron)  
A personal dynamic crawler on [Pixiv](http://www.pixiv.net)  

About config.json
====
`user.id` : String. Your Pixiv ID or Email  
`user.password` : String. Your password  
`autoLogin` : Boolean, Auto login Pixiv or not  
`path.picSave` : String, Absolute path where you save picture, which end with `/`  
`port.http`: Number(Integer). Port on http receiver.  
`port.https`: Number(Integer). Port on https receiver.  

Example :
```json
{
	"user": {
		"id": "abcdedfh",
		"password": "1234567"
	},
	"autoLogin": true,
	"path": {
		"picSave": "C:/Pixiv-Collector/picture/"
	},
	"port": {
		"http": 910,
		"https": 911
	}
}
```

About Https Receiver
====
Before use `Pixiv-Collector`, you need to import `./ssl/ssl.crt` into your OS.  
Otherwise, Electron will hangs up all `https XHR request` which will sended to `Https Receiver`.  

Certificate `./ssl/ssl.crt` just is a temporary certificate Created by OpenSSL. So I uploaded it into Project.  
You can also create a certificate on your info, but certificate's `Common Name` must is `127.0.0.1`.  
There is a simple bash shell to create certificate on `./ssl/mkSSLCer`.  

About Author
====
[DanoR](http://weibo.com/zheung) :  
A university student without degrees in Computer Science because fail in University Physics