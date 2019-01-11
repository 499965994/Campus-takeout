const async = require('async');
const router = express.Router();
//此为个人中心首页，展示个人资料
router.get('/',(req,res)=>{
	res.render("uer");
});

module.exports = router;