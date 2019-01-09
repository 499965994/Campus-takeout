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
// 连接到数据库
const mydb = mysql.createConnection({
	user: 'root',
	password: 'root',
	host: 'localhost',
	database: 'h51810',
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

//静态资源托管
app.use(express.static(__dirname + '/static'));
//端口监听
app.listen(81, () => {
	console.log('服务器已启动，端口为81');
});
