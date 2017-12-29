<template>
	<div class="uncommitted">
		<Exchange></Exchange>
		<Leave></Leave>
		<Offcial class="mtop"></Offcial>
		<Relation></Relation>
	</div>
</template>

<script>
	import Offcial from './public/offcialshop'
	import Relation from './public/relationmer'
	import Exchange from './public/exchangeTop'	
	import Leave from './public/leave'
export default {
	data(){

	},
	components:{
		Offcial,
		Relation,
		Exchange,
		Leave
	}
}	
</script>

<style lang="less">
.uncommitted {
	background-color: #F7F7F7;
	height: 100vh;

	.mtop {
		margin-top: 0.27rem;
	}
}	
</style>