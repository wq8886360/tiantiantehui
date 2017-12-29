<template>
	<div class="merrefuse">
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
		<!-- 申请平台介入 -->
		<span class="jieru" @click="intervene">申请平台介入</span>
		<!-- 换货关闭操作超时 -->
		<span class="chaoshi" @click="overtime">换货关闭-超时</span>
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
		intervene(){
			this.$router.push({path:'applyterraceget'})
		},
		overtime(){
			this.$router.push({path:'closeovertime'})
		}
	}



}		
	
</script>

<style lang="less">
	.merrefuse {
		background-color: #F7F7F7;
		height: 100vh;

	/*转行条*/
	.line {
		width: 100%;
		height: 0.27rem;
		background-color: #F7F7F7;
	}
	.jieru {
		background-color: green;
	}
	.chaoshi {
		background-color: red;
	}
}
</style>