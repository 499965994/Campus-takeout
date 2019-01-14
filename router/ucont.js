const async = require('async');
const router = express.Router();
//用户操作
//用户登录时获取到用户名，在首页右上角显示,页面显示商品信息
router.get('/', (req, res) => {
	let username = req.session.username;
	let sql = "select * from products where status=1";
	mydb.query(sql, (err, result) => {
		if (err) {
			console.log(err);
			return;
		}
		res.render("uer", {
			username: username,
			plist: result
		});
	});
});

//处理购物车提交过来的数据
router.post("/cardel", (req, res) => {
	res.json({
		delname: req.body.oname,
		allprice: req.body.oprice
	});
});

//购物车渲染到订单页面
router.get("/cardel", (req, res) => {
	res.render("del", {
		delname: req.query.delname,
		allprice: req.query.allprice
	});
});

//评论页面路由
router.get("/comment", (req, res) => {
	let username = req.session.username;
	//将其余用户的评论内容，展示到页面上
	mydb.query("select * from usertalk", (err, result) => {
		if (err) {
			console.log(err);
			return;
		}
		res.render("comment", {
			username: username,
			tlist: result
		});
	})

});

//用户评论内容提交到数据库
router.post("/comment",(req,res)=> {
	let about = req.body.about;
	mydb.query("insert into usertalk(username,about,talktimes) values(?,?,now())",[req.session.username,about],(err,result)=>{
		if(err){console.log(err);return;}
		res.json({r:"ok"});
	});
});

module.exports = router;
