let E = window.wangEditor;
		let editor1 = new E('#div1','#div2');
		let text1 = document.querySelector('#text1');
		let div2 =  document.querySelector('#div2');
		editor1.customConfig.onchange = function(html) {
			// 监控变化，同步更新到 textarea
			text1.value = html;
		};
		editor1.customConfig.uploadImgServer = '/upload'
		editor1.create();
		// 初始化 textarea 的值
		text1.value = editor1.txt.text();
		
		let uhead = document.querySelector('input[name="uhead"]');
		
		uhead && (uhead.onchange=function() {
			let formdata = new FormData();
			formdata.append('uhead',this.files[0]);
			axios.post('/uphead',formdata)
			.then(function (response) {
		        document.querySelector('#headimg').src = response.data;
		        })
			.catch(function (error) {
			})	
		});
		
		let prebtn = document.querySelector('.prebtn');
		prebtn && (prebtn.onclick = function() {	
			// 先判断
			let errNum = 0
			let uname = document.querySelector('input[name="uname"]');
			let un_value = uname.value;
		
			if (un_value == "") {
				uname.parentElement.nextElementSibling.innerHTML = '*必填';
				uname.focus();
				errNum++;
			} else {
				uname.parentElement.nextElementSibling.innerHTML = '';
			}
			let uphone = document.querySelector('input[name="uphone"]');
			let up_value = uphone.value;
			if (up_value == "") {
				uphone.parentElement.nextElementSibling.innerHTML = '*必填';
				uphone.focus();
				errNum++;
			} else {
				uphone.parentElement.nextElementSibling.innerHTML = '';
			}
			let usex = document.querySelector('input[type="radio"]:checked').value;
			let uimgsrc = document.querySelector('#headimg').src;
			let unatur = document.querySelector('#text1').value;
			if (!errNum) {
				//通过ajax方式把数据发送到服务器
				axios.post('/updpre', {
					uname: un_value,
					uphone: up_value,
					usex: usex,
					uimgsrc: uimgsrc,
					unatur: unatur
				})
				.then(function(response) {
					if (response.data.r == 'ok') {
						window.location='/pre';
					} else {
						alert('未知错误，刷新后操作');
					}
				})
				.catch(function(error) {})
			}	
		});	