<template>
	<div class="login">
		<i class="icon-close"></i>
		<div class="logo">
			<h1 style="font-size:0.8rem;color:#000;margin-top:0.9rem;padding-left:0.27rem;">绑定手机号</h1>
		</div>
		<div class="form">
			<!-- 验证码登录方式 -->
			<div class="loginMethod1">
				<div class="tel">
					<input class="sl-input" type="tel" placeholder="请输入手机号">
				</div>
				<!-- <i class="sl-error">请输入正确的手机号</i> -->

				<div class="verificationCode">
					<input class="sl-input" type="tel"  placeholder="请输入验证码">
					<img :src="'http://v20-api.shunliandongli.com/member/Common/vcode?time='+time" @click="Time" alt="">
				</div>
				<!-- <i class="sl-error">您输入的验证码有误，请重试</i> -->
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			time: 1
		}
	},
	methods:{
		Time(){
			var timestamp = Math.random();
			this.time = timestamp;
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