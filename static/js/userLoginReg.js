window.onload = function() {
	userLogin(); //用户登录
	userReg(); //用户注册
}

function userLogin() {
	let button = document.querySelector('');
	button.onclick = function() {
		let errNum = 0;
		//获取输入的信息，并检查
		let username = document.querySelector('input[name="username"]'); //属性选择器
		let u_value = username.value;
		if (u_value == '') {
			username.parentElement.nextElementSibling.innerHTML = '*必填';
			username.focus();
			errNum++;
		} else {
			username.parentElement.nextElementSibling.innerHTML = '';
		}
		let userpasswd = document.querySelector('input[name="userpasswd"]') //属性选择器
		let up_value = userpasswd.value;
		if (up_value == '') {
			userpasswd.parentElement.nextElementSibling.innerHTML = '*必填';
			userpasswd.focus();
			errNum++;
		} else {
			userpasswd.parentElement.nextElementSibling.innerHTML = '';
		}
		// 把数据提交到服务器  前提：数据填写完整
		if (!errNum) {
			// 发起ajax请求
			let xhr = new XMLHttpRequest();
			xhr.open('POST', '/userLogin');
			//设置请求头
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			//发送数据到服务器  ES6里面的字符串模板
			xhr.send(`username=${u_value}&userpasswd=${up_value}`);

			// 状态事件监听并接收响应数据
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					let result = xhr.responseText;
					// 接收的是字符串类型，需要转成对象
					result = JSON.parse(result);
					console.log(result);
					if (result.r == 'username_not_found') {
						username.parentElement.nextElementSibling.innerHTML = '*账号不存在';
						username.focus();
					} else if (result.r == 'userpasswd_err') {
						userpasswd.parentElement.nextElementSibling.innerHTML = '*密码错误';
						userpasswd.focus();
					} else if (result.r == 'ok') {
						window.location.href = '/ucont';
					} else {
						alert('未知错误，刷新后操作');
					}
				}
			}
		}


	}

}

function userReg() {
	let button = document.querySelector('');
	button.onclick = function() {
		let errNum = 0;
		//获取输入的信息，并检查
		let username = document.querySelector('input[name="username"]'); //属性选择器
		let u_value = username.value;
		if (u_value == '') {
			username.parentElement.nextElementSibling.innerHTML = '*必填';
			username.focus();
			errNum++;
		} else {
			username.parentElement.nextElementSibling.innerHTML = '';
		}
		let userpasswd = document.querySelector('input[name="userpasswd"]') //属性选择器
		let up_value = userpasswd.value;
		if (up_value == '') {
			userpasswd.parentElement.nextElementSibling.innerHTML = '*必填';
			userpasswd.focus();
			errNum++;
		} else {
			userpasswd.parentElement.nextElementSibling.innerHTML = '';
		}
		// 把数据提交到服务器  前提：数据填写完整
		if (!errNum) {
			// 发起ajax请求
			let xhr = new XMLHttpRequest();
			xhr.open('POST', '/userLogin');
			//设置请求头
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			//发送数据到服务器  ES6里面的字符串模板
			xhr.send(`username=${u_value}&userpasswd=${up_value}`);

			// 状态事件监听并接收响应数据
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					let result = xhr.responseText;
					// 接收的是字符串类型，需要转成对象
					result = JSON.parse(result);
					console.log(result);
					if (result.r == 'username_not_found') {
						username.parentElement.nextElementSibling.innerHTML = '*账号不存在';
						username.focus();
					} else if (result.r == 'userpasswd_err') {
						userpasswd.parentElement.nextElementSibling.innerHTML = '*密码错误';
						userpasswd.focus();
					} else if (result.r == 'ok') {
						window.location.href = '/ucont';
					} else {
						alert('未知错误，刷新后操作');
					}
				}
			}
		}


	}


}
