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
			<input class="sl-input" :disabled="dis" v-model="pwd" type="password" v-validate="'required|pwd|nbsp'" name="密码" placeholder="请输入密码">
            <i class="sl-error" v-show="errors.has('密码')">{{errors.first('密码')}}</i>
		</div>
		<div class="againpsw bm">
			<input class="sl-input" :disabled="dis" v-validate="'required|pwd|nbsp'" v-model="pwdagain" name="再次输入密码" type="password" placeholder="请重新输入一遍密码">
            <i class="sl-error" v-show="errors.has('再次输入密码')">{{errors.first('再次输入密码')}}</i>
            <i class="sl-error" v-show="againState">两次密码输入不相同</i>
        </div>
		<div class="nickname bm">
			<input class="sl-input" :disabled="dis" v-model="nickname" v-validate="'required'" type="text" name="昵称" placeholder="请输入您的昵称">
            <i class="sl-error" v-show="errors.has('昵称')">{{errors.first('昵称')}}</i>
		</div>
		<x-button class="sub" novalidate :disabled="dis" @click.native="submit" type="warn">完成</x-button>
	</div>
</template>
<script>
import { XButton, Alert } from 'vux';
import VueInputCode from 'vue-input-code'
import { sendSmsCode, index } from '../../http/api'
import Cookie from "js-cookie";
export default{
	components: {
		XButton,
        VueInputCode,
        Alert,
    },
	data(){
		return {
            tel: null,
            vcode: null, //图文验证码
            referId: null,
            time: 60,//倒计时时间
            code: [],
            pwd: '',
            pwdagain: '',
            againState: false,
            dis: true,
            resCode: '',
            nickname: null,
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
        this.tel = data.tel;
        this.vcode = data.code;
        this.referId = data.referId;
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
                if(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/.test(this.pwdagain) && /^\S+$/.test(this.pwdagain)){
                    if(this.pwdagain === this.pwd){
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
        submit(){
            var self = this
            this.$validator.validateAll().then((result) => {
                if (result) {
                    if(this.pwd == this.pwdagain){
                        let code = this.code.join("")
                        let params = {
                            mobile: this.tel,
                            mobile_code: code,
                            code: this.referId,
                            password: this.pwd,
                            nickname: this.nickname
                        }
                        index(params).then((response) => {
                            let res = response;
                            if(res.data.code == 1000){
                                this.$router.push({path: Cookie.get('to')})
                            }
                        })
                    }
                    return;
                }
            });
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