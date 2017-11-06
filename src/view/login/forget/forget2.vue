<template>
	<div class="sms">
		<i class="icon-back" @click='back'></i>
		<h1>验证码已发送到</h1>
		<div class="userTel">
			<p>{{tel}}</p>
			<x-button :disabled="disabled" @click.native="countdown" mini class="btn">{{text}}</x-button>
		</div>
		<vue-input-code span-size="0.53rem" type="number" :number="4" height="50px" span-color="#000" input-color="#000" input-size="24px" :code="code"></vue-input-code>
		<div class="psw bm">
			<input class="sl-input" v-validate="'required|pwd'" v-model="pwd" name="密码" :disabled="dis" type="password" placeholder="请输入密码">
            <i class="sl-error" v-show="errors.has('密码')">{{errors.first('密码')}}</i>
        </div>
		<div class="againpsw bm">
			<input class="sl-input" v-validate="'required|pwd'" name="确认密码" v-model="pwdagain" :disabled="dis" type="password" placeholder="请重新输入一遍密码">
            <i class="sl-error" v-show="errors.has('确认密码')">{{errors.first('确认密码')}}</i>
            <i class="sl-error" v-if="againState">两次密码输入不相同</i>
        </div>
		<x-button class="sub" @click.native="submit" :disabled="dis" type="warn">完成</x-button>
	</div>
</template>
<script>
import { XButton } from 'vux';
import { sendSmsCode, findPwd } from '../../../http/api.js'
import VueInputCode from 'vue-input-code'
export default{
	components: {
		XButton,
		VueInputCode
	},
	data(){
		return {
			tel: null,
            code: [],
            vcode: null,
            resCode: null,
            time: 60,
            dis: true,
            againState: false,
            pwd: null,
            pwdagain: null
		}
    },
    computed: {
        text: function () {
            return this.time > 0 ? this.time + 's' : '重新获取';
        },
        disabled: function () {
            return this.time > 0 ? true : false;
        }
    },
    created(){
        let data = JSON.parse(this.$route.query.data);
        this.tel = data.mobile;
        this.vcode = data.vcode;
        this.countdown();
    },
    watch: {
        'code': {
            handler: function() {
                if(this.code.length == 4){
                    let codestr = this.code.join("");
                    if(codestr == this.resCode){
                        this.dis = false;
                    }else{
                        this.dis = true;
                        this.$vux.toast.text('验证码输入错误', 'middle')
                    }
                }else{
                    this.dis = true;
                }
            },
            deep: true
        },
        'pwdagain': {
            handler: function() {
                if(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/.test(this.pwdagain)){
                    if(this.pwdagain == this.pwd){
                        this.againState = false;
                    }else{
                        this.againState = true;
                    }
                }else{
                    this.againState = false;
                }
            }
        }
    },
	methods:{
		back(){
			this.$router.go(-1);
        },
        countdown(){
            sendSmsCode({mobile: this.tel,vcode: this.vcode}).then((response) => {
                console.log(response)
                if(response.data.code == 1000 ){
                    this.resCode = response.data.data;

                    this.time = 60;
                    var _this = this;
                    var timer = setInterval(function(){
                        _this.time--;
                        if(_this.time<0){
                            clearInterval(timer)
                        }
                    },1000)
                }
            })
        },
        submit(){
            this.$validator.validateAll().then((result) => {
                if (result) {
                    if(this.pwd == this.pwdagain){
                        let code = this.code.join("")
                        let params = {
                            mobile: this.tel,
                            password: this.pwd,
                            pwd: this.pwdagain,
                            code: code
                        }
                        console.log(params)
                        findPwd(params).then((response) => {
                            let res = response;
                            console.log(res)
                            if(res.data.code == 1000){
                                this.$router.push({path: '/user/login'})
                            }
                        })
                    }
                    return;
                }
            });
        }
	}
}
</script>
<style lang="less">
.bm{
	border-bottom: 1px solid #d8d8d8;
	margin-top: 0.67rem;
	height: 1.07rem;
}
.sms{
	position: relative;
	padding: 1.33rem 0.67rem 0;
	.icon-back{
		font-size: 0.45rem;
		position: absolute;
		left: 0.5rem;
		top: 0.5rem;
		font-weight: 700;
	}
	h1{
		font-size: 0.8rem;
	}
	.userTel{
		position: relative;
		height: 0.8rem;
		margin-top: 0.33rem;
		p{
			font-size: 0.53rem;
		}
		.btn {
			position: absolute;
			right: 0.09rem;
			top: 0;
		}
	}
	.vue_input_code{
		margin-top: 1.33rem;
		.input{
			.first{
				border-radius: 0;
			}
			span{
				border: none;
				border-bottom: 0.01rem solid #d8d8d8;
				margin: 0 0.2rem;
			}
			> span:last-child{
				border-radius: 0;
				border-right: none;
			}
		}
	}
	.sub{
		margin-top: 0.91rem;
		background: #fb0036;
	}
}
</style>