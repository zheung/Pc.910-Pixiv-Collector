(function()
{
	var div = document.createElement('div');
	div.id = 'bar-login';
	
	var pid = document.createElement('input');
	pid.id = 'input-id';
	pid.type = 'text';
	pid.placeholder = '请输入Pixiv ID或邮箱';
	pid.value = '~id~';
	
	var pwd = document.createElement('input');
	pwd.id = 'input-password';
	pwd.type = 'password';
	pwd.placeholder = '请输入密码';
	pwd.value = '~password~'
	
	var rem = document.createElement('input');
	rem.id = 'input-remember';
	rem.type = 'checkbox';
	rem.checked = '~checked~';

	var label = document.createElement('label');
	label.id = 'label-remember';
	label.appendChild(rem);
	label.innerHTML += '下次自动登录';
	
	var a = document.createElement('a');
	a.id = 'action-login'
	a.className = 'button';
	a.innerHTML = '登入';
	
	a.onclick = function()
	{
		$ta(
		{
			action:'login',
			id:$tqs('#input-id').value,
			password:$tqs('#input-password').value,
			remember:$tqs('#input-remember').checked
		}, function()
		{
			console.log('--action: login');
		});
	};
	
	div.appendChild(pid);
	div.appendChild(pwd);
	div.appendChild(label);
	div.appendChild(a);
	
	document.body.appendChild(div);
})();