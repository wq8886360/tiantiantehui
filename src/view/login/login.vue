<template>
	<div class="login">
		<i @click="close" class="icon-close"></i>
		<div class="logo">
			<img @click="changeType" src="../../assets/img/login_logo.png" alt="">
		</div>
		<div class="form">

            <swiper v-model="index" height="8rem" :show-dots="false">
                <swiper-item>
                    <!-- 验证码登录方式 -->
                    <div class="loginMethod1">
                        <div class="tel">
                            <input class="sl-input" v-model="tel" v-validate="'required|tel'" name="手机号" type="tel" placeholder="请输入手机号">
                            <i class="sl-error" v-show="errors.has('手机号')">{{errors.first('手机号')}}</i>
                        </div>

                        <div class="verificationCode">
                            <input class="sl-input" v-model="code" type="tel" :disabled="codedis"  placeholder="请输入验证码">
                            <img :src="'http://v20-api.shunliandongli.com/member/Common/vcode?time='+time" @click="Time" alt="">
                        </div>
                        <i class="sl-error" v-if="codeState">您输入的验证码有误，请重试</i>

                        <div class="login_type">
                            <div class="left"><i class="icon-CN_tencent-wechat"></i>微信登录</div>
                            <div class="right"><router-link to="/user/regist">新用户注册</router-link></div>
                        </div>

                    </div>
                </swiper-item>
                <swiper-item>
                    <!-- 账号密码登录方式 -->
                    <div class="loginMethod2">
                        <div class="username">
                            <input class="sl-input" v-model="username" v-validate="'required'" name="账号" type="text" placeholder="请输入手机号/用户ID">
                            <i class="sl-error" v-show="errors.has('账号')">{{errors.first('账号')}}</i>
                        </div>
                        <div class="pwd">
                            <input class="sl-input" v-model="password" v-validate="'required'" name="密码" type="password" placeholder="请输入密码">
                            <i class="sl-error" v-show="errors.has('密码')">{{errors.first('密码')}}</i>
                        </div>
                        <div class="login_type">
                            <div class="left"><i class="icon-CN_tencent-wechat"></i>微信登录</div>
                            <div class="right"><router-link to="/user/regist">新用户注册</router-link></div>
                        </div>
                        <x-button :disabled="!(username && password)" class="sl-button loginBtn" @click.native="login" type="warn">登录</x-button>
                        <div style="margin-top:0.67rem;">
                            <div class="left"><router-link to="/user/forget1">忘记密码</router-link></div>
                        </div>
                    </div>
                </swiper-item>
            </swiper>
		</div>
        <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
            <div class="sl_error_box" v-if="err_msg">
                <div class="sl_error_msg">{{loginerrmsg}}</div>
            </div>
        </transition>    
	</div>
</template>
<script>
import { XButton, Swiper, SwiperItem } from 'vux'
import { CommoncheckCode, loginindex } from '../../http/api.js'
import Cookie from "js-cookie";
export default {
	components: {
        XButton,
        Swiper,
        SwiperItem
	},
	data(){
		return {
			//方式1数据
			tel: null,
			code: null,
            codedis: true,
            time: 1,
            codeState: false,
            username: null,
            password: null,
            err_msg: false,
            index:  0,

            loginerrmsg: ''
		}
    },
    methods: {
        Time(){
            var timestamp = Math.random();
		    this.time = timestamp;
        },
        changeType(){
            if(this.index == 1){
                this.index = 2
            }else{
                this.index = 1
            }
        },
        login(){
            let params = {
                type: 'username',
                username: this.username,
                password: this.password
            }
            loginindex(params).then((response) => {
                console.log(response)
                if(response.data.code != 1000){
                    this.loginerrmsg = response.data.message;
                    var _this = this;
                    this.err_msg = true;
                    setTimeout(function() {
                        _this.err_msg = false;
                    },1000)
                }else{
                    this.$router.push({path: Cookie.get('to')})
                }
            })
        },
        close(){
            this.$router.push({path: Cookie.get('from')})
        }
    },
	watch:{
        'tel': {
            handler: function(){
                if(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)){
                    this.codedis = false;
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
                            vcode: this.code
                        }
                        if(response.data.code == 1000){
                            this.$router.push({path: '/user/sms',query: {data: JSON.stringify(data)}})
                        }else{
                            this.codeState = true;
                        }
                    })
                }
            }
        }
	},
	created(){

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
	.icon-close{
		font-size: 0.67rem;
		position: absolute;
		left: 0.4rem;
		top: 0.4rem;
		color: #000;
	}
	.logo{
		height: 4.27rem;
		padding: 0.4rem;
		box-sizing: border-box;
		text-align: center;
		img{
			width: 2.13rem;
			height: 2.13rem;
			margin-top: 0.67rem;
		}
	}
	.form{
		padding: 0 0.67rem;
		.loginMethod1,.loginMethod2{
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
        .login_type{
            margin-top: 0.6rem;
            overflow: hidden;
            .icon-CN_tencent-wechat{
                color: #3fb03b;
                font-size: 0.4rem;
                vertical-align: middle;
                margin-right: 0.07rem;
            }
        }
        .loginMethod2{
            .username{
                border-bottom: 1px solid #d8d8d8;
            }
            .pwd{
                margin-top: 0.67rem;
                border-bottom: 1px solid #d8d8d8;
            }
            .loginBtn{
                margin-top: 0.67rem;
            }
        }
	}
}
</style>