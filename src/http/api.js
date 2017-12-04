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

//订单
export const orderconfirm = params => post('/order/confirm', params); //确认订单