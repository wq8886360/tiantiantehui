import Vue from 'vue'
import Router from 'vue-router'

//主入口
import Index from '@/view/index'

import Classification from '@/view/classification/classification'
import Ranking from '@/view/classification/ranking' //排行榜

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
import Salelist from '@/view/aftersale/salelist' //售后列表
import Servicetype from '@/view/aftersale/servicetype' //选择服务类型
//换货流程
import Barterapply from '@/view/aftersale/barterapply' //换货申请
//退货流程          
import Platform from '@/view/aftersale/Platform'//申请平台介入
import content from '@/view/aftersale/content'//提交物流信息
import Arefund from '@/view/aftersale/Arefund' //退款申请
import Refund from '@/view/aftersale/Refund' //退款申请
import Agreement from '@/view/aftersale/agreement' //协商历史
import Logcompany from '@/view/aftersale/Logcompany' //物流公司


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
                    meta: { title: '商品分类' }
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
            meta: { title: '购物车凑单' },
            component: Gathertogether
        },
        {
            path: '/confirmorder',
            meta: { title: '确认订单' },
            component: Confirmorder
        },
        {
            path: '/addadress',
            component: Addadress,
            meta: { title: '添加收货地址' },
        },
        {
            path: '/selectadress',
            component: Selectadress,
            meta: { title: '选择收货地址' },
        },
        {
            path: '/management',
            component: Management,
            meta: { title: '管理收货地址' },
        },
        {
            path: '/myorder',
            component: Myorder,
            meta: { title: '我的订单', keepAlive: true },
        },
        {
            path: '/MyRating',
            meta: { title: '我的评价' },
            component: MyRating
        },
        {
            path: '/Rate',
            meta: { title: '发布评价' },
            component: Rate
        },
        {
            path: '/additionalReview',
            meta: { title: '追评' },
            component: AdditionalReview
        },
        {
            path: '/evaDetail',
            meta: { title: '评价详情' },
            component: EvaDetail
        },
        {
            path: '/evaSuccess',
            meta: { title: '评价成功' },
            component: EvaSuccess
        },
        {
            path: '/changeGoodEva',
            meta: { title: '改为好评' },
            component: ChangeGoodEva
        },
        {
            path: '/Eva',
            meta: { title: '商品页评价' },
            component: Eva
        },
        {
            path: '/addBatchEva',
            meta: { title: '批量追加' },
            component: AddBatchEva
        },
        {
            path: '/orderdetails',
            meta: { title: '订单详情' },
            component: orderDetails,
        },
        {
            path: '/Payoff',
            component: Payoff,
            meta: { title: '支付成功' },
        },
        {
            path: '/successfuldeal',
            component: successfuldeal,
            meta: { title: '交易成功' },
        },
        {
            path: '/logistics',
            component: logistics,
            meta: { title: '物流信息' },
        },
        {
            path: '/Offerdetails',
            component: Offerdetails,
            meta: { title: '详情优惠券' },
        },
        {
            path: '/packdetails',
            component: packdetails,
            meta: { title: '套餐详情' },
        },
        {
            path: '/servicetype',
            component: Servicetype,
            meta: { title: '选择服务类型' },
        },
        {
            path:'/barterapply',
            component:Barterapply,
            meta: { title: '换货申请' },
        },
        {
            path: '/Refund',
            component: Refund,
            meta: { title: '退款申请' },
        },
        {
            path: '/Platform',
            component: Platform,
            meta: { title: '申请平台介入' },
        },
        {
            path:'/content',
            component: content,
            meta: { title: '提交物流信息' },
        },
        {
            path:'/arefund',
            component:Arefund,
            meta: { title: '退款申请' },
        },
        {
            path: '/salelist',
            component: Salelist,
            meta: { title: '退款/售后'}
        },
        {
            path: '/agreement',
            component: Agreement,
            meta: {title:'协商历史'}
        },
        {
            path: '/logcompany',
            component: Logcompany,
            meta: {title:'选择物流公司'}
        },
        {
            path: '/ranking',
            component: Ranking,
            meta:{title:'排行榜'}
        }
	]
})
