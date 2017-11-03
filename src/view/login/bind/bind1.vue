<template>
	<div class="login">
		<i @click="back" class="icon-back"></i>
		<div class="logo">
			<h1 style="font-size:0.8rem;color:#000;margin-top:0.9rem;padding-left:0.27rem;text-algin:center">绑定手机号</h1>
		</div>
		<div class="form">
			<!-- 验证码登录方式 -->
			<div class="loginMethod1">
				<div class="tel">
					<input class="sl-input" v-model="tel" v-validate="'required|tel'" name="手机号" type="tel" placeholder="请输入手机号">
                    <i class="sl-error" v-show="errors.has('手机号')">{{errors.first('手机号')}}</i>
				</div>
				<!-- <i class="sl-error">请输入正确的手机号</i> -->

				<div class="verificationCode">
					<input class="sl-input" v-model="code" type="tel" :disabled="codedis"  placeholder="请输入验证码">
                    <img :src="'http://v20-front-api.shunliandongli.com/member/Common/vcode?time='+time" @click="Time" alt="">
				</div>
				<!-- <i class="sl-error">您输入的验证码有误，请重试</i> -->
			</div>
		</div>
	</div>
</template>
<script>
import { CommoncheckCode, loginindex, checkMobile } from '../../../http/api.js'
import Cookie from "js-cookie"
export default {
	data(){
		return {
            time: 1,
            tel: null,
            code: null,
            codedis: true
		}
    },
    watch:{
        'tel': {
            handler: function(){
                if(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)){
                    checkMobile({mobile: this.tel}).then((response) => {
                        console.log(response)
                        if(response.data.code == 2001){
                            this.$vux.toast.text('账号已注册', 'middle')
                        }else{
                            this.codedis = false;
                        }
                    })
                }else{
                    this.codedis = true;
                }
            }
        },
        'code': {
            handler: function() {
                if(this.code.length == 4){
                    CommoncheckCode({vcode: this.code}).then((response) => {
                        console.log(response)
                        let data = {
                            mobile: this.tel,
                            vcode: this.code,
                            unique_sign: this.$route.query.unique_sign
                        }
                        if(response.data.code == 1000){
                            this.$router.push({path: '/user/bind2',query: {data: JSON.stringify(data)}})
                        }else{
                            this.$vux.toast.text('验证码错误', 'middle')
                        }
                    })
                }
            }
        }
    },
	methods:{
		Time(){
			var timestamp = Math.random();
			this.time = timestamp;
        },
        back(){
            this.$router.go(-1);
        }
	}
}
</script>
<style lang="less">
.login{
	position: relative;
	color: #858585;
	a{
		color: inherit;
	}
	.icon-back{
		font-size: 0.45rem;
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
        font-weight: 700;
        color: #000;
	}
	.logo{
		height: 4.27rem;
		padding: 0.4rem;
		box-sizing: border-box;
	}
	.form{
		padding: 0 0.67rem;
		.loginMethod1{
			.tel{
				border-bottom: 1px solid #d8d8d8;
			}
			.verificationCode{
				border-bottom: 1px solid #d8d8d8;
				margin-top: 0.67rem;
				position: relative;
				img{
					position: absolute;
					right: 0;
					top: 0;
					height: 1rem;
				}
			}
		}
	}
}
</style>