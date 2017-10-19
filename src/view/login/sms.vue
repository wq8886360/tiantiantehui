<template>
	<div class="sms">
		<i class="icon-back"></i>
		<h1>验证码已发送到</h1>
		<div class="userTel">
			<p>{{tel}}</p>
			<button>按钮</button>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			tel: this.$route.query.tel
		}
	}
}
</script>
<style lang="less">
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
}
</style>