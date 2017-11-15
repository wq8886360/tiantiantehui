// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "@/store/index.js"
import Cookie from "js-cookie";
import './validate.js'
import './assets/css/public/reset.css'
import '@/assets/css/component/index.less' //样式模块入口文件
import '@/assets/font/font.css' //icon
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)
import  { AlertPlugin, ToastPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

Vue.config.productionTip = false

//const routerList = ['/user/login','/user/sms','/user/regist','/user/set','/user/oldbind1','/user/oldbind2','/user/newbind1','/user/newbind2','/user/bind1','/user/bind2','/user/forget1','/user/forget2'];
const routerPrivate = ['/person','/shopcar'];
router.beforeEach((to, from, next) => {
    store.dispatch('CLOSTLOAD')
    const token = Cookie.get("token");
    //访问私有页面
    if(routerPrivate.indexOf(to.fullPath) != -1){
        //user_token校验
        if (token) {
            next()
        }else{
            Cookie.set('from',from.fullPath)
            Cookie.set('to',to.fullPath)
            next({
                path: '/user/login',
            })
        }
    }else{
        next()
    }
    next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
