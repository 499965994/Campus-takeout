window.onload = function() {
	userLogin(); //用户登录
	userReg(); //用户注册
	adminLogin(); //管理员登录
	addShopCar(); //菜品添加到购物车
	clearshopCar(); //清空购物车
	todelCar(); //提交购物车商品到结算页面
}
//用户登录
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
						window.location.href = "ucont?phonenum="+u_value;
					} else {
						alert('未知错误，刷新后操作');
					}
				})
				.catch(function(error) {})
		}
	}
}

//用户注册
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

//添加购物车与删除商品
function addShopCar(){
	let addcarbtn=document.querySelector(".goods");
	let car=document.querySelector(".layui-table tbody");
	if(!addcarbtn){return;}
	addcarbtn.onclick=function(e){
		if(e.target.classList.contains("addcar")){
			let pname=e.target.parentNode.parentNode.childNodes[1].innerHTML;
			let price=e.target.parentNode.firstElementChild.innerHTML;
			//在添加菜品之前，先去检查购物车中是否有该菜品，如果有，就数量增加，没有就创建新的。
			let carshop=document.querySelectorAll(".layui-table tbody tr");
			for(let i=0;i<carshop.length;i++){
				if(carshop[i].firstElementChild.innerHTML===pname){
					carshop[i].children[1].innerHTML=parseInt(carshop[i].children[1].innerHTML)+1;
					return;
				}
			}
			//添加行
			let carpro=document.createElement("tr");
			car.appendChild(carpro);
			//添加商品名
			let cpname=document.createElement("td");
			cpname.innerHTML=pname;
			carpro.appendChild(cpname);
			//商品数量
			let num=document.createElement("td");
			num.innerHTML="1";
			carpro.appendChild(num);
			//商品价格
			let cprice=document.createElement("td");
			cprice.innerHTML=price;
			carpro.appendChild(cprice); 
			//删除按钮
			let delbtn=document.createElement("td");
			let dela=document.createElement("a");
			dela.className="deletecar";
			dela.innerHTML="删除";
			delbtn.appendChild(dela);
			carpro.appendChild(delbtn);
			//删除商品
			dela.onclick=function(){
				this.parentNode.parentNode.remove();
			}
		}
	}
}

//清空购物车
function clearshopCar(){
	let clearbtn=document.querySelector(".clearcar");
	if(!clearbtn){return;}
	clearbtn.onclick=function(){
		document.querySelector(".layui-table tbody").innerHTML="";
	}
}
//提交购物车数据到结算页面
function todelCar(){
	let todelbtn=document.querySelector(".todel");
	if(!todelbtn){return;}
	todelbtn.onclick=function(){
		let products=document.querySelector(".layui-table tbody").children;
		let foodsArray=[]; //存放购物车商品信息
		let allprice=0; //记录购物车中的商品总价
		for(let i=0;i<products.length;i++){
				let food=products[i].children;
				let arrexp=[];
				let str=food[2].innerHTML;
				let arr=str.split("¥");
				let pname=food[0].innerHTML;
				arrexp.push(pname);
				let num=food[1].innerHTML+"份";
				arrexp.push(num);
				let price=parseInt(food[1].innerHTML)*arr[1]+"元";
				arrexp.push(price);
				let strexp=arrexp.join("---");
				foodsArray.push(strexp);
				allprice+=parseInt(food[1].innerHTML)*arr[1];
		}
		// console.log(foodsArray.join(","),allprice);
		if(foodsArray.length){
			// 发起一个get请求,将这些数据渲染到订单提交,付款页面.
			let orderstr=foodsArray.join(",");
			axios.post("ucont/cardel",{
						oname:orderstr,
						oprice:allprice
			})
			.then(function (response){
				window.location.href=`ucont/cardel?delname=${response.data.delname}&allprice=${response.data.allprice}`;
			})
			.catch(function (response){
				console.log(response);
			});
		}
	}
}



