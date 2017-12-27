<template>
	<div class="applychange">
		<!-- 申请计时 -->
		<div class="pink">
			
		</div>
		<!-- 转行条 -->
		<div class="line"></div>
		<!-- 物品详情子组件 -->
		<Offcial></Offcial>
		<!-- 大转行条 -->
		<!-- <div class="bigline"></div> -->
		<!-- 联系商家子组件 -->
		<Relation class="fiexbott"></Relation>
	</div>
</template>

<script>
	import Offcial from './public/offcialshop'
	import Relation from './public/relationmer'
export default{
	data(){
		return {

		}
	},
	components:{
		Offcial,
		Relation
	},




}		
	
</script>

<style lang="less">
	/*申请计时*/
	.pink {
		height: 6.2rem;
		width: 100%;
		background-color: pink;
	}
	/*转行条*/
	.line {
		width: 100%;
		height: 0.27rem;
		background-color: #F7F7F7;
	}
	/*大转行条*/
	.bigline {
		width: 100%;
		height: 1.39rem;
		background-color: #F7F7F7;
	}
</style>