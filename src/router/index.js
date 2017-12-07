import Vue from 'vue'
import Router from 'vue-router'

//主入口
import Index from '@/view/index'
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
        }
	]
})
