import axios from "axios";
import router from "../router/index.js";
//import Cookie from "js-cookie";
import qs from "qs";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://v20-front-api.shunliandongli.com"; //开发
// axios.defaults.baseURL = 'http://v20-testseller.shunliandongli.com'; //测试
axios.defaults.timeout = 5000;
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

// request全局拦截
axios.interceptors.request.use(config => {
    if(config.method === 'post') {
        config.data += '&client_type=wechat'
    } else if(config.method === 'get') {
        config.params['client_type'] = 'wechat'
    }
	return config
},error => {
	return Promise.reject(error)
})

// response全局拦截
// axios.interceptors.response.use(
//   response => {
//     // code处理
//     const code = response.data.code;
//     // 203||服务端登录 && ....
//     if (code == -200) {
//       window.CloseIm && window.CloseIm();
//       Message({
//         message: response.data.message,
//         type: "error",
//         duration: 2 * 1000
//       });
//       // 登出
//       setTimeout(function() {
//         router.push({ path: "/" });
//       }, 1000);
//     } else {
//       return response;
//     }
//   },
//   error => {
//     return Promise.resolve(error.response);
//   }
// );

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
