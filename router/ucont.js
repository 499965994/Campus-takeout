const async = require('async');
const router = express.Router();
//用户操作
//用户登录时获取到用户名，在首页右上角显示,页面显示商品信息
router.get('/',(req,res)=>{
	let phonenum=req.query.phonenum;
	//控制执行顺序
	async.series({
		username: function(cb) {
			let sql="select * from user where phonenum=?";
			mydb.query(sql,[phonenum],(err,result)=>{
				if(err){console.log(err);return}
				let usern=result[0].username;
				cb(null,usern);
			});
		},
		list:function(cb) {
			let sql="select * from products where status=1";
			mydb.query(sql,(err,result)=>{
				if(err){console.log(err);return}
				cb(null,result);
			});
		}
	},function(err,result){
		res.render("uer",{username:result.username,plist:result.list});
	});
});

//处理购物车提交过来的数据
router.post("/cardel",(req,res)=>{
	res.json({delname:req.body.oname,allprice:req.body.oprice});
});

//购物车渲染到订单页面
router.get("/cardel",(req,res)=>{
	res.render("del",{delname:req.query.delname,allprice:req.query.allprice});
});

module.exports = router;