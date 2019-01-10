window.onload = function() {
	userLogin(); //用户登录
	userReg(); //用户注册
	adminLogin(); //管理员登录
}
function userLogin() {
	let button = document.querySelector('.userlogin');
	if (!button) {
		return;
	}
	button.onclick = function() {
		let errNum = 0;
		//获取输入的信息，并检查
		let phonenum = document.querySelector('input[name="phonenum"]'); //属性选择器
		let u_value = phonenum.value;
		if (u_value=='') {
			phonenum.parentElement.nextElementSibling.innerHTML = '*必填';
			phonenum.focus();
			errNum++;
		} else {
			phonenum.parentElement.nextElementSibling.innerHTML = '';
		}
		if(u_value.length>11){
			phonenum.parentElement.nextElementSibling.innerHTML = '*格式错误';
			phonenum.focus();
			errNum++;
		}else{
			phonenum.parentElement.nextElementSibling.innerHTML = '';
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
					phonenum: u_value,
					userpasswd: up_value
				})
				.then(function(response) {
					if (response.data.r == 'phonenum_not_found') {
						phonenum.parentElement.nextElementSibling.innerHTML = '*账号不存在';
						phonenum.focus();
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
		if(phone_value.length>11){
			phonenum.parentElement.nextElementSibling.innerHTML = '*格式错误';
			phonenum.focus();
			errNum++;
		}else {
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
			axios.post('/userRegist', {
					rname: r_value,
					phonenum: phone_value,
					apsswd: rp_value
				})
				.then(function(response) {
					if(response.data.r=="phonenum_has_exists"){
						phonenum.parentElement.nextElementSibling.innerHTML = '已注册';
						phonenum.focus();
						return;
					}
					else if (response.data.r == 'ok') {
						phonenum.parentElement.nextElementSibling.innerHTML = '';
						alert("注册成功！去登录吧！")
						window.location.href = '/userlogin';
						return;
					} else {
						alert('注册失败！');
					}
				})
				.catch(function(error) {})
		}
	}
}

//管理员登录
function adminLogin() {
	let button = document.querySelector('.adminlogin');
	if(!button){return;}
	button.onclick = function() {
		let errNum = 0;
		//获取输入的信息，并检查
		let aname = document.querySelector('input[name="aname"]'); //属性选择器
		let a_value = aname.value;
		if (a_value == "") {
			aname.parentElement.nextElementSibling.innerHTML = '*必填';
			aname.focus();
			errNum++;
		} else {
			aname.parentElement.nextElementSibling.innerHTML = '';
		}
		let apasswd = document.querySelector('input[name="apasswd"]') //属性选择器
		let ap_value = apasswd.value;
		if (ap_value == "") {
			apasswd.parentElement.nextElementSibling.innerHTML = '*必填';
			apasswd.focus();
			errNum++;
		} else {
			apasswd.parentElement.nextElementSibling.innerHTML = '';
		}
		//判断
		if (!errNum) {
			//通过ajax方式把数据发送到服务器
			axios.post('/adminLogin', {
					aname: a_value,
					apasswd: ap_value
				})
				.then(function(response) {
					if (response.data.r == 'aname_not_found') {
						aname.parentElement.nextElementSibling.innerHTML = '*账号不存在';
						aname.focus();
					} else if (response.data.r == 'apasswd_err') {
						apasswd.parentElement.nextElementSibling.innerHTML = '*密码错误';
						apasswd.focus();
					} else if (response.data.r == 'ok') {
						window.location.href = '/acont';
					} else {
						alert('未知错误，刷新后操作');
					}
				})
				.catch(function(error) {})
		}
	}
}
