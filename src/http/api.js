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

//商品模块
export const goodsdetail = params => post("/goods/detail", params); //商品详情
