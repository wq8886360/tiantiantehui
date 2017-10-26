<template>
	<div class="sms">
		<i class="icon-back" @click='back'></i>
		<h1>验证码已发送到</h1>
		<div class="userTel">
			<p>{{tel}}</p>
			<x-button mini class="btn">重新获取</x-button>
		</div>
		<vue-input-code span-size="0.53rem" type="number" :number="4" height="50px" span-color="#000" input-color="#000" input-size="24px" :code="code"></vue-input-code>
		<div class="psw bm">
			<input class="sl-input" type="password" placeholder="请输入密码">
		</div>
		<div class="againpsw bm">
			<input class="sl-input" type="password" placeholder="请重新输入一遍密码">
		</div>
		<div class="nickname bm">
			<input class="sl-input" type="text" placeholder="请输入您的昵称">
		</div>
		<x-button class="sub" type="warn">绑定</x-button>
	</div>
</template>
<script>
import { XButton } from 'vux';
import VueInputCode from 'vue-input-code'
export default{
	components: {
		XButton,
		VueInputCode
	},
	data(){
		return {
			tel: this.$route.query.tel,
			code: []
		}
	},
	methods:{
		back(){
			this.$router.go(-1);
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