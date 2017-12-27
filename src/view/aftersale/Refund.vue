<template>
	<div class="Refund">
		<exchangeTop></exchangeTop>
		<leave></leave>
		<offcialshop></offcialshop>
		<relationmer></relationmer>
	</div>
</template>
<script>
import exchangeTop from './public/exchangeTop.vue'
import offcialshop from './public/offcialshop.vue'
import relationmer from './public/relationmer.vue'
import leave from './public/leave.vue'
export default{
	components: {
		'exchangeTop':exchangeTop,
		'offcialshop':offcialshop,
		'relationmer':relationmer,
		'leave':leave,
	},
	data(){
		return{

		}
	},
	methods:{

	},
	created(){

	}
}	
</script>
<style>
.Refund{
	width: 100vw;
	background: #f7f7f7;
}
</style>