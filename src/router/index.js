import Vue from 'vue'
import Router from 'vue-router'

//主入口
import Index from '@/view/index'

import Classification from '@/view/classification/classification'

//登录注册
import User from '@/view/login/entry'
import Login from '@/view/login/login'
import Sms from '@/view/login/sms'
import Regist from '@/view/login/regist'
import userSet from '@/view/login/set'
import Oldbind1 from '@/view/login/oldunbind/oldbind1' //无上级老用户绑定
import Oldbind2 from '@/view/login/oldunbind/oldbind2'
import Newbind1 from '@/view/login/newunbind/newbind1' //无上级新用户绑定
import Newbind2 from '@/view/login/newunbind/newbind2'
import Bind1 from '@/view/login/bind/bind1' //有上级用户绑定
import Bind2 from '@/view/login/bind/bind2'
import Forget1 from '@/view/login/forget/forget1' //忘记密码
import Forget2 from '@/view/login/forget/forget2'

import Authorise from '@/view/wx/authorise' //微信授权

import Store from '@/view/shop/store.vue' // 店铺
import NewGoods from '@/view/shop/newGoods.vue' // 店铺新品
import Home from '@/view/shop/home.vue' // 店铺新品
import StoreGoods from '@/view/shop/storeGoods.vue' // 店铺宝贝
import Promotion from '@/view/shop/promotion.vue' // 店铺新品
import Profile from '@/view/shop/profile' //店铺简介
import Sort from '@/view/shop/sort' //店铺分类
import SortSecond from '@/view/shop/sortSecond' //店铺二级分类

//商品
import Default from '@/view/good/default' //入口页面
import Goodsdetails from '@/view/good/goodsdetails' //商品详情

//购物车
import Shopcar from '@/view/shopcar/shopcar' //购物车页面
import Gathertogether from '@/view/shopcar/gathertogether' //凑单

//订单
import Confirmorder from '@/view/order/confirmorder' //确认订单
import Addadress from '@/view/order/addadress' //添加收货地址
import Selectadress from '@/view/order/selectadress' //选择收获地址
import Management from '@/view/order/management' //管理收货地址

//订单列表
import Myorder from '@/view/order/myorder' //我的订单
import orderDetails from '@/view/order/orderdetails' //订单详情
import Payoff from '@/view/order/payoff' //支付成功
import successfuldeal from '@/view/order/successfuldeal' //交易成功
import logistics from '@/view/order/logistics' //物流信息
import Offerdetails from '@/view/good/Offerdetails' //详情优惠券
import packdetails from '@/view/good/packdetails' //套餐详情


//我的评价
import MyRating from '@/view/myRating/ratingHome'
import Rate from '@/view/myRating/rate'
import AdditionalReview from '@/view/myRating/addReview'
import EvaDetail from '@/view/myRating/evaDetail'
import EvaSuccess from '@/view/myRating/evaSuccess'
import ChangeGoodEva from '@/view/myRating/changeGoodEva'
import Eva from '@/view/myRating/eva'
import AddBatchEva from '@/view/myRating/addBatchEva'


//退换货流程
import Servicetype from '@/view/aftersale/servicetype' //选择服务类型
//换货流程
import Barterapply from '@/view/aftersale/barterapply' //换货申请
import Applyex from '@/view/aftersale/applyexchange' //申请换货
import Meragree from '@/view/aftersale/meragree' //商家同意换货
import Uncommitted from '@/view/aftersale/uncommitted'  //换货关闭-用户未提交
import Refund from '@/view/aftersale/Refund' //退款申请
import Merrefuse from '@/view/aftersale/merrefuse'   //商家拒绝换货
import Affgoodsnone from  '@/view/aftersale/affgoodsnone'  //商家确认收货-未发货
import Mershipments from '@/view/aftersale/mershipments' //商家发货
import Bartersuccess from '@/view/aftersale/bartersuccess'  //换货成功
import Usersendexp from  '@/view/aftersale/usersendexp' //用户已寄快递
import Closeovertime from '@/view/aftersale/closeovertime'  //换货关闭-用户操作超时
import Turndownterrace from '@/view/aftersale/turndownterrace' //商家拒绝换货-申请平台介入
import Terracepadd from '@/view/aftersale/terracepadd' //商家拒绝换货-平台介入审核通过
import Ternopass from '@/view/aftersale/ternopass' //商家拒绝换货-平台介入审核不通过
import Merrefgoods from '@/view/aftersale/merrefgoods'  //商家拒绝收货
import Mernogoodsterr from '@/view/aftersale/mernogoodsterr'  //商家拒绝收货-申请平台介入
import Merrejterpass from '@/view/aftersale/merrejterpass'  //商家拒绝收货-申请平台介入通过-等待发货
import Inputlogistics from '@/view/aftersale/inputlogistics'  //输入物流信息
import Applyterraceget from '@/view/aftersale/applyterraceget'  //申请平台介入


//测试
import Person from '@/view/test/person'



Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
		  	name: 'index',
            component: Index,
            children: [
                {
                    path: 'shopcar',
                    component: Shopcar
                },
                {
                    path: 'person',
                    component: Person
                },
                {
                    path: 'classification',
                    component: Classification,
                    name: "商品分类"
                }
            ]
		},
		{
			path: '/user',
			component: User,
			children: [
				{path: 'login',component: Login},
				{path: 'sms',component: Sms},
				{path: 'regist',component: Regist},
                {path: 'set', component: userSet},
                {path: 'oldbind1', component: Oldbind1},
                {path: 'oldbind2', component: Oldbind2},
                {path: 'newbind1', component: Newbind1},
                {path: 'newbind2', component: Newbind2},
                {path: 'bind1', component: Bind1},
                {path: 'bind2', component: Bind2},
                {path: 'forget1', component: Forget1},
                {path: 'forget2', component: Forget2},
                {path: 'authorise', component: Authorise}
			],
			redirect: '/user/login'
        },
        {
            path: '/good',
            component: Default,
            children: [
                {path: 'detail',component: Goodsdetails}
            ],
        },
        {
            path: '/store',
            component: Store,    
        },
        {
            path: '/profile',
            component: Profile,
        },
        {
            path: '/sort',
            component: Sort,
        },
        {
            path: '/sortSecond',
            component: SortSecond,
        },
        {
            path: '/gathertogether',
            name: '购物车凑单',
            component: Gathertogether
        },
        {
            path: '/confirmorder',
            name: '确认订单',
            component: Confirmorder
        },
        {
            path: '/addadress',
            component: Addadress,
            name: "添加收货地址",
        },
        {
            path: '/selectadress',
            component: Selectadress,
            name: "选择收货地址",
        },
        {
            path: '/management',
            component: Management,
            name: "管理收货地址",
        },
        {
            path: '/myorder',
            component: Myorder,
            name: "我的订单",
        },
        {
            path: '/MyRating',
            name: '我的评价',
            component: MyRating
        },
        {
            path: '/Rate',
            name: '发布评价',
            component: Rate
        },
        {
            path: '/additionalReview',
            name: '追评',
            component: AdditionalReview
        },
        {
            path: '/evaDetail',
            name: '评价详情',
            component: EvaDetail
        },
        {
            path: '/evaSuccess',
            name: '评价成功',
            component: EvaSuccess
        },
        {
            path: '/changeGoodEva',
            name: '改为好评',
            component: ChangeGoodEva
        },
        {
            path: '/Eva',
            name: '商品页评价',
            component: Eva
        },
        {
            path: '/addBatchEva',
            name: '批量追加',
            component: AddBatchEva
        },
        {
            path: '/orderdetails',
            component: orderDetails,
            name: "订单详情"
        },
        {
            path: '/Payoff',
            component: Payoff,
            name: "支付成功"
        },
        {
            path: '/successfuldeal',
            component: successfuldeal,
            name: "交易成功"
        },
        {
            path: '/logistics',
            component: logistics,
            name: "物流信息"
        },
        {
            path: '/Offerdetails',
            component: Offerdetails,
            name: "详情优惠券"
        },
        {
            path: '/packdetails',
            component: packdetails,
            name: "套餐详情"
        },
        {
            path: '/servicetype',
            component: Servicetype,
            name: '选择服务类型'
        },
        {
            path:'/barterapply',
            component:Barterapply,
            name:'换货申请'
        },
        {
            path:'/applyexchange',
            component:Applyex,
            name:'申请换货'
        },
        {
            path:'/meragree',
            component:Meragree,
            name:'商家同意换货'
        },
        {
            path:'/uncommitted',
            component:Uncommitted,
            name:'关闭 用户未提交'
        },
        {
            path: '/Refund',
            component: Refund,
            name: '退款申请'
        },
        {
            path:'/merrefuse',
            component:Merrefuse,
            name:'商家拒绝换货'
        },
        {
            path:'/affgoodsnone',
            component:Affgoodsnone,
            name:'商家确认收货未发货'
        },
        {
            path:'/mershipments',
            component:Mershipments,
            name:'商家发货'
        },
        {
            path:'/bartersuccess',
            component:Bartersuccess,
            name:'换货成功'
        },
        {
            path:'/usersendexp',
            component:Usersendexp,
            name:'用户已寄快递'
        },
        {
            path:'/closeovertime',
            component:Closeovertime,
            name:'换货关闭-用户操作超时'
        },
        {
            path:'/turndownterrace',
            component:Turndownterrace,
            name:'商家拒绝换货-申请平台介入'
        },
        {
            path:'/terracepadd',
            component:Terracepadd,
            name:'商家拒绝换货-平台介入审核通过'
        },
        {
            path:'/ternopass',
            component:Ternopass,
            name:'商家拒绝换货-平台介入审核不通过'
        },
        {
            path:'/merrefgoods',
            component:Merrefgoods,
            name:'商家拒绝收货'
        },
        {
            path:'/mernogoodsterr',
            component:Mernogoodsterr,
            name:'商家拒绝收货-申请平台介入'
        },
        {
            path:'/merrejterpass',
            component:Merrejterpass,
            name:'商家拒绝收货-申请平台介入通过-等待发货'
        },
        {
            path:'/inputlogistics',
            component:Inputlogistics,
            name:'输入物流信息'
        },
        {
            path:'/applyterraceget',
            component:Applyterraceget,
            name:'申请平台介入'
        }
	]
})
