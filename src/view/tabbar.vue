<template>
	<div class="tabbar">
		<div><router-link to="/list">首页</router-link></div>
		<div><router-link to="/list">分类</router-link></div>
		<div><router-link to="/list">购物车</router-link></div>
		<div><router-link to="/user">我的</router-link></div>
	</div>
</template>
<script>
	
</script>
<style lang="less">
.tabbar{
	height: 0.93rem;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	div{
		display: flex;
		flex: 1;
		a{
			display: block;
			width: 100%;
			background: #f1f1f1;
			line-height: 0.93rem;
			text-align: center;
		}
	}
}
</style>