window.onload = function() {
	userLogin(); //用户登录
	userReg(); //用户注册
}

function userLogin() {
	let button = document.querySelector('.userlogin');
	if (!button) {
		return;
	}
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
		//判断
		if (!errNum) {
			//通过ajax方式把数据发送到服务器
			axios.post('/userLogin', {
					username: u_value,
					apsswd: up_value
				})
				.then(function(response) {
					if (response.data.r == 'username_not_found') {
						username.parentElement.nextElementSibling.innerHTML = '*账号不存在';
						username.focus();
					} else if (response.data.r == 'userpasswd_err') {
						userpasswd.parentElement.nextElementSibling.innerHTML = '*密码错误';
						userpasswd.focus();
					} else if (response.data.r == 'ok') {
						window.location.href = '/ucont';
					} else {
						alert('未知错误，刷新后操作');
					}
				})
				.catch(function(error) {})
		}
	}

}

function userReg() {
	let button = document.querySelector('.userregist');
	if (!button) {
		return;
	}
	button.onclick = function() {
		let errNum = 0;
		//获取输入的信息，并检查
		let rname = document.querySelector('input[name="rname"]'); //属性选择器
		let r_value = rname.value;
		if (r_value == '') {
			rname.parentElement.nextElementSibling.innerHTML = '*必填';
			rname.focus();
			errNum++;
		} else {
			rname.parentElement.nextElementSibling.innerHTML = '';
		}
		let phonenum = document.querySelector('input[name="phonenum"]'); //属性选择器
		let phone_value = phonenum.value;
		if (phone_value == '') {
			phonenum.parentElement.nextElementSibling.innerHTML = '*必填';
			phonenum.focus();
			errNum++;
		} else {
			phonenum.parentElement.nextElementSibling.innerHTML = '';
		}
		let rpasswd = document.querySelector('input[name="rpasswd"]') //属性选择器
		let rp_value = rpasswd.value;
		if (rp_value == '') {
			rpasswd.parentElement.nextElementSibling.innerHTML = '*必填';
			rpasswd.focus();
			errNum++;
		} else {
			rpasswd.parentElement.nextElementSibling.innerHTML = '';
		}
		//判断
		if (!errNum) {
			//通过ajax方式把数据发送到服务器
			axios.post('/userLogin', {
					rname: r_value,
					phonenum: phone_value,
					apsswd: rp_value
				})
				.then(function(response) {
					if (response.data.r == 'ok') {
						window.location.href = '/userlogin';
					} else {
						alert('未知错误');
					}
				})
				.catch(function(error) {})
		}
	}
}
