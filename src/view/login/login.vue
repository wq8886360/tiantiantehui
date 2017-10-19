<template>
	<div class="login">
		<i class="icon-close"></i>
		<div class="logo">
			<img src="../../assets/img/login_logo.png" alt="">
		</div>
		<div class="form">
			<!-- 验证码登录方式 -->
			<div class="loginMethod1">
				<div class="tel">
					<input class="sl-input" v-model="tel" type="tel" placeholder="请输入手机号">
				</div>
				<i class="sl-error" v-if='telState'>请输入正确的手机号</i>

				<div class="verificationCode">
					<input class="sl-input" v-model="code" type="tel" :disabled="codedis"  placeholder="请输入验证码">
					<img :src="'http://v20-api.shunliandongli.com/member/Common/vcode?time='+time" @click="TIME" alt="">
				</div>
				<i class="sl-error" v-if="codeState">您输入的验证码有误，请重试</i>

				<div class="login_type">
					<div class="left"><i class="icon-CN_tencent-wechat"></i>微信登录</div>
					<div class="right"><router-link to="/user/regist">新用户注册</router-link></div>
				</div>

			</div>
			<!-- 账号密码登录方式 -->
			<div v-if="false" class="loginMethod2">
				登录方式2
			</div>
		</div>
	</div>
</template>
<script>
import { XButton } from 'vux'
import { mapActions, mapGetters } from 'vuex'
import { codeList } from '../../http/api.js'
export default {
	components: {
		XButton
	},
	data(){
		return {
			//方式1数据
			tel: null,
			code: null,

		}
	},
	computed: mapGetters([
		'codedis',
		'telState',
		'codeState',
		'time'
	]),
	methods: mapActions([
		'TELSTATE',
		'CODESTATE',
		'INIT',
		'TIME'
	]),
	watch:{
		'tel': {
			handler: function() {
                this.TELSTATE(this.tel)
            },
            deep: true
		},
		'code': {
			handler: function() {
				if(this.code.length == 4){
					this.CODESTATE(this.code)
				}
			}
		}
	},
	created(){
		codeList({page: '1'}).then((response) => {
			console.log(response)
		})
		this.INIT();

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
		}
	}
}
</style>