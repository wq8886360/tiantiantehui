// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "@/store/index.js"
//import Vux from 'vux'
import '@/assets/css/component/index.less' //样式模块入口文件
import '@/assets/font/font.css' //icon
//Vue.use(Vux)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
