import axios from "axios";
import router from "../router/index.js";
//import Cookie from "js-cookie";
import qs from "qs";
import store from "@/store/index.js"
import Cookie from "js-cookie";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://v20-front-api.shunliandongli.com"; //开发
// axios.defaults.baseURL = 'http://v20-testseller.shunliandongli.com'; //测试
axios.defaults.timeout = 5000;
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

//var timer = null;
// request全局拦截
axios.interceptors.request.use(config => {
    // token
    const token = Cookie.get("token");
    if(token){
      config.headers['token'] = token;
    }

    // wechat请求
    if(config.method === 'post') {
      config.data += '&client_type=wechat'
    } else if(config.method === 'get') {
      config.params['client_type'] = 'wechat'
    }

    //请求超过1s显示加载动画
    // timer = setTimeout(function(){
    //     store.dispatch('SHOW')
    // },1000)
	return config
},error => {
	return Promise.reject(error)
})

//response全局拦截
axios.interceptors.response.use(
  response => {
    let res = response; 

    //全局loading状态
    if(res.status == 200){
        //清除动画
        //clearTimeout(timer);
        //store.dispatch('CLOSTLOAD')

        // 
        let code = res.data.code;
        if(code === 1000 && res.data.data){
          if(res.data.data.hasOwnProperty('token')){
            let time = res.data.data.token_expires_in/(60*60*24)
            Cookie.set('token', res.data.data.token, { expires: time });
          }
        }
    }
    return response
  },
  error => {
    return Promise.resolve(error.response);
  }
);

export const post = (url, params) => {
  return axios({
    method: "post",
    url: url,
    data: qs.stringify(params)
  });
};

export const get = (url, params) => {
  return axios({
    method: "get",
    url: url,
    params: params
  });
};
