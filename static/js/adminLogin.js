window.onload = function() {
	adminLogin(); //管理员登录
}

function adminLogin() {
	let button = document.querySelector('.adminlogin');
	if(!button){return;}
	button.onclick = function() {
		let errNum = 0;
		//获取输入的信息，并检查
		let aname = document.querySelector('input[name="aname"]'); //属性选择器
		let a_value = aname.value;
		if (a_value == "" ){
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
