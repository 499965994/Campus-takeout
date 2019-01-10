// 1，引入express
global.express = require('express');
// 接收post过来的数据
const bodyParser = require('body-parser');
// 数据库操作模块
const mysql = require('mysql');
// 模板引擎
const ejs = require('ejs');
// 2，创建一个web应用
const app = express();
//接收post过来的数据
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json()); //接收json格式的数据
// 连接到数据库


global.mydb = mysql.createConnection({
	user: 'root',
	password: '123',
	host: 'localhost',
	database: 'campus-takeout',
	port: 3306
});
mydb.connect();

app.get('/', (req.res) => {
	res.send("首页");
})

//模板引擎设置
app.engine('html', ejs.renderFile); //自定义模板引擎html
app.set('views', 'myviews'); //模板文件所在的路径
app.set('view engine', 'html'); //注册模板引擎到express


//admin登录post路由
app.post('/adminLogin', (req, res) => {
	let adminLoginData = req.body;
	let sql = 'select * from admin where aname = ?';
	mydb.query(sql, [adminLoginData.aname], (err, result) => {
		//检查账号是否存在
		if (!result.length) {
			res.json({
				r: 'aname_not_found'
			});
			return;
		}
		//检查密码是否正确
		if (result[0].passwd != adminLoginData.passwd) {
			res.json({
				r: 'apasswd_err'
			});
			return;
		}
		//登录成功
		res.json({
			r: 'ok'
		});
	})
})
//user登录post路由
app.post('/userLogin', (req, res) => {
	let userLoginData = req.body;
	let sql = 'select * from user where username = ?';
	mydb.query(sql, [userLoginData.aname], (err, result) => {
		//检查账号是否存在
		if (!result.length) {
			res.json({
				r: 'username_not_found'
			});
			return;
		}
		//检查密码是否正确
		if (result[0].passwd != userLoginData.passwd) {
			res.json({
				r: 'userpasswd_err'
			});
			return;
		}
		//登录成功
		res.json({
			r: 'ok'
		});
	})
})

// 用户个人中心的子路由
app.use('/userinfo', require('./router/userinfo'));
// 用户购买页面子路由
app.use('./ucont')
// 商家管理界面的子路由
app.use('/acont', require('./router/acont'));

//静态资源托管
app.use(express.static(__dirname + '/static'));

//端口监听
app.listen(81, () => {
	console.log('服务器已启动，端口为81');
});
