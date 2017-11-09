<template>
	<div class="index">
		<v-header></v-header>
		<router-view></router-view>
	</div>
</template>
<script>
import Header from "./store.vue"

export default{
	components:{
		"v-header": Header,
	}
}
</script>
<style>
	
</style>