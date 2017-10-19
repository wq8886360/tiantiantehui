import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import common from "./modules/public.js"
import login from "./user/login.js" //用户登录模块
export default new Vuex.Store({
	modules:{
		common,
		login
	}
})