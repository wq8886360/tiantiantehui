<template>
	<div class="index">
        <router-view></router-view>
		<tabbar></tabbar>
	</div>
</template>
<script>
import Tabbar from '@/view/tabbar.vue'
export default{
	components:{
		"tabbar": Tabbar,
	},
	data(){
		return {

		}
	}
}
</script>
<style>
	
</style>