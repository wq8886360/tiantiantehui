<template>
	<div class="turndownterrace">
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
		<!-- 通过 -->
		<span class="tongg" @click="agree">商家拒绝-平台通过</span>
		<span class="guanbi" @click="close">换货关闭-平台不通过</span>
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
			this.$router.push({path:'terracepadd'})
		},
		close(){
			this.$router.push({path:'ternopass'})
		},
	}



}		
	
</script>

<style lang="less">
	.turndownterrace {
		background-color: #F7F7F7;
		height: 100vh;

	/*转行条*/
	.line {
		width: 100%;
		height: 0.27rem;
		background-color: #F7F7F7;
	}
	.tongg {
		background-color: green;
	}
	.guanbi {
		background-color: red;
	}
}
</style>