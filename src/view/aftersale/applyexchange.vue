<template>
	<div class="applychange">
		<!-- 申请计时子组件 -->
		<Exchange></Exchange>
		<!-- 计时提示子组件 -->
		<Leave></Leave>
		<!-- 转行条 -->
		<div class="line"></div>
		<!-- 物品详情子组件 -->
		<Offcial></Offcial>
		<!-- 联系商家子组件 -->
		<Relation class="fiexbott"></Relation>
		<!-- 同意 -->
		<span class="agree" @click="agree">商家同意换货</span>
		<!-- 不同意 -->
		<span class="noagr" @click="noagr">商家拒绝换货</span>
	</div>
</template>

<script>
	import Offcial from './public/offcialshop'
	import Relation from './public/relationmer'
	import Exchange from './public/exchangeTop'
	import Leave from './public/leave'
export default{
	data(){
		return {

		}
	},
	components:{
		Offcial,
		Relation,
		Exchange,
		Leave
	},
	methods:{
		agree(){
			this.$router.push({path:'meragree'})
		},
		noagr(){
			this.$router.push({path:'merrefuse'})
		}
	}



}		
	
</script>

<style lang="less">
	.applychange {
		background-color: #F7F7F7;
		height: 100vh;

	/*转行条*/
	.line {
		width: 100%;
		height: 0.27rem;
		background-color: #F7F7F7;
	}
	.agree {
		background-color: green;
	}
	.noagr {
		background-color: red;
	}
}
</style>