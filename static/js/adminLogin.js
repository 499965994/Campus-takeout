window.onload = function() {
	adminLogin(); //管理员登录
}

function adminLogin() {
	let button = document.querySelector('');
	button.onclick = function() {
		let errNum = 0;
		//获取输入的信息，并检查
		let aname = document.querySelector('input[name="aname"]'); //属性选择器
		let a_value = aname.value;
		if (a_value == '') {
			aname.parentElement.nextElementSibling.innerHTML = '*必填';
			aname.focus();
			errNum++;
		} else {
			aname.parentElement.nextElementSibling.innerHTML = '';
		}
		let apasswd = document.querySelector('input[name="apasswd"]') //属性选择器
		let ap_value = apasswd.value;
		if (ap_value == '') {
			apasswd.parentElement.nextElementSibling.innerHTML = '*必填';
			apasswd.focus();
			errNum++;
		} else {
			apasswd.parentElement.nextElementSibling.innerHTML = '';
		}

		//通过ajax方式把数据发送到服务器
		axios.post('/adminLogin', {
				aname: a_value,
				apsswd: ap_value
			})
			.then(function(response) {
				if (response.data == 'aname_not_found') {
					aname.parentElement.nextElementSibling.innerHTML = '*账号不存在';
					aname.focus();
				}else if(response.data == 'apasswd_err')
			})
		// 把数据提交到服务器  前提：数据填写完整
		if (!errNum) {
			// 发起ajax请求
			let xhr = new XMLHttpRequest();
			xhr.open('POST', '/adminLogin');
			//设置请求头
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			//发送数据到服务器  ES6里面的字符串模板
			xhr.send(`aname=${a_value}&apasswd=${ap_value}`);

			// 状态事件监听并接收响应数据
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					let result = xhr.responseText;
					// 接收的是字符串类型，需要转成对象
					result = JSON.parse(result);
					console.log(result);
					if (result.r == 'aname_not_found') {
						aname.parentElement.nextElementSibling.innerHTML = '*账号不存在';
						aname.focus();
					} else if (result.r == 'apasswd_err') {
						apasswd.parentElement.nextElementSibling.innerHTML = '*密码错误';
						apasswd.focus();
					} else if (result.r == 'ok') {
						window.location.href = '/acont';
					} else {
						alert('未知错误，刷新后操作');
					}
				}
			}
		}


	}

}
