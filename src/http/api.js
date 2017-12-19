import { post, get } from "./config";

//登录注册模块
export const callback_uri = 'http://v20-wx.shunliandongli.com/#/user/authorise'; //微信回调域名
export const codeList = params => get('/member/register/codeList', params); //推荐人列表
export const sendSmsCode = params => post('/member/common/sendSmsCode', params); //发送验证码
export const checkMobile = params => get('/member/register/checkMobile', params); //手机号验证
export const checkCode = params => get('/member/register/checkCode', params); //推荐人ID验证
export const CommoncheckCode = params => post('/member/Common/checkCode', params); //验证图文验证码
export const index = params => post('/member/register/index', params); //注册
export const loginindex = params => post('/member/login/index', params); //登录
export const findPwd = params => post('/member/userinfo/findPwd', params); //找回密码
export const getOauthUrl = params => get("/member/oauth/getOauthUrl", params); //微信授权
export const wechat = params => post('/member/oauth/wechat', params); //拉取用户信息
export const logout = params => post('/member/login/logout', params); //退出登录

//店铺模块
export const storeIndex = params => get("/store/index", params); //店铺首页
export const delMark = params => post("/store/delMark", params); //取消关注
export const addMark = params => post("/store/addMark", params); //关注店铺
export const introduce= params => get("/store/introduce", params); //店铺简介
export const storeCategories = params => get("/store/categories", params); //店铺类目
export const newGoodsList = params => get("/store/newGoodsList", params); //新品列表
export const goodsList = params => get("/store/goodsList", params); //宝贝商品列表
export const promotionGoodsList = params  => get("/store/promotionGoodsList", params); //促销商品列表


//商品模块
export const goodsdetail = params => post("/goods/detail", params); //商品详情
export const getVoucher = params => post('/voucher/getVoucher', params); //普通领取优惠劵
export const goodsfavoriteadd = params => post('/member/goodsfavorite/add', params); //收藏商品
export const goodsfavoriteremove = params => post('/member/goodsfavorite/remove', params); //取消收藏
export const cartHome = params => post("/cart/home", params); //购物车首页
export const cartadd = params => post("/cart/add", params); //加入购物车
export const checkcartgoods = params => post('/cart/checkcartgoods',params); //购物车多选
export const cartedit = params => post('/cart/edit',params); //修改购物车
export const cartremove = params => post('/cart/remove',params); //删除购物车商品
export const cartremovetofav = params => post('/cart/removetofav', params);//购物车商品移入收藏夹
export const getjoingoodsstorecates = params => post('/cart/getjoingoodsstorecates', params); //凑单类目接口
export const joingoods = params => post('/cart/joingoods', params); //凑单接口
export const singleSku = params => post('/goods/getgoodssku', params); //凑单sku接口

//评价
//评价列表 
export const memberCommentList = params => get("/member/comment/list", params); //我的评价列表
export const commentDetalis = params => get("/member/comment/details", params); //评价详情
export const commentAppend = params => post('/member/comment/append', params); //添加追评
export const commentChange = params => post('/member/comment/change', params); //中差评改为好评
export const commentAdd = params => post('/member/comment/add', params); //添加评价
export const personalcenterOrderlist = params => get("/personalcenter/orderlist", params); //我的个人中心
export const commentList = params => get("/comment/list", params); //商品详情的评价列表
export const commentPraise = params => post('/comment/praise', params); //点赞

//订单
export const orderconfirm = params => post('/order/confirm', params); //确认订单
export const addressadd = params => post('/member/address/add', params); //添加收货地址
export const addressall = params => post('/member/address/all', params); //收货地址列表
export const orderbuy = params => post('/order/buy', params); //立即购买
export const deletet = params => post('/member/address/remove', params); //删除收货地址
export const modification =params => post('/member/address/edit',params); //编辑收货地址

//订单列表
export const orderlist = params => get('/personalcenter/orderlist',params); //个人订单列表页
export const orderdetail =params => get('/personalcenter/orderdetail',params); //个人订单详情页
export const seacher= params => get('/personalcenter/searchhistory',params); //订单搜索历史
export const delhistory= params =>get('/personalcenter/delhistory',params);//清空历史搜索记录
export const traces = params => get('/personalcenter/traces',params); //查看物流
export const cancelorder = params => post('/personalcenter/cancelorder',params);//取消订单
export const remindseller= params => post('/personalcenter/remindseller',params);//提醒发货
export const postpone = params => post('/personalcenter/postpone',params);//延迟发货