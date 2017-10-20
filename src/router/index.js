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
import Oldbind from '@/view/login/oldunbind/oldbind1' //无上级老用户绑定


Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
		  	name: 'index',
		  	component: Index
		},
		{
			path: '/user',
			component: User,
			children: [
				{path: 'login',component: Login},
				{path: 'sms',component: Sms},
				{path: 'regist',component: Regist},
                {path: 'set', component: userSet},
                {path: 'oldbind', component: Oldbind}
			],
			redirect: '/user/login'
		}
	]
})
