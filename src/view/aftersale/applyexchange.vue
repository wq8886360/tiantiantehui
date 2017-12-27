<template>
	<div class="applychange">
		<!-- 申请计时 -->
		<Exchange></Exchange>
		<!-- 转行条 -->
		<div class="line"></div>
		<!-- 物品详情子组件 -->
		<Offcial></Offcial>
		<!-- 联系商家子组件 -->
		<Relation class="fiexbott"></Relation>
	</div>
</template>

<script>
	import Offcial from './public/offcialshop'
	import Relation from './public/relationmer'
	import Exchange from './public/exchangeTop'
export default{
	data(){
		return {

		}
	},
	components:{
		Offcial,
		Relation,
		Exchange
	},




}		
	
</script>

<style lang="less">
	.applychange {
		background-color: #F7F7F7;
		margin-bottom: 1.33rem;

	/*转行条*/
	.line {
		width: 100%;
		height: 0.27rem;
		background-color: #F7F7F7;
	}
}
</style>