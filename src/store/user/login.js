import router from '../../router/index.js'
import { sendSmsCode } from '../../http/api.js'

var state = {
	tel: null,
	// 验证码登录
	telState: false,
	codeState: false,
	codedis: true,
	time: 111
}

const actions = {
	//初始化
	INIT({commit, state}){
		state.telState = false;
		state.codeState = false;
		state.codedis = true;
	},
	//验证码登录
	TELSTATE({commit, state}, telnum){
		state.tel = telnum;
		let Telnum = Number(telnum)
		if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(Telnum))){ 
	    	state.telState = true;
	    	state.codedis = true;
	        return false; 
	    }else{
	    	state.telState = false;
	    	state.codedis = false;
	    }
	},
	CODESTATE({commit, state}, codenum){
		sendSmsCode({mobile: state.tel, vcode: state.codenum}).then((response) => {
			console.log(response)
			let res = response;
			if(res.data.success){
				state.codeState = false;
				router.push({path: '/user/sms', query:{tel:state.tel}})
			}else{
				state.codeState = true;
			}
		})
	},
	TIME({commit, state}){
		var timestamp = Math.random();
		state.time = timestamp;
	},
}

const mutations = { 
  
}

const getters = {
	codedis(state){return state.codedis},
	codeState(state){return state.codeState},
	telState(state){return state.telState},
	time(state){return state.time}
}


export default {
	actions,
	mutations,
	state,
	getters
}