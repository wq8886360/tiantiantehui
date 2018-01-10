<template>
	<div id="app">
        <loading :loading="loadingState"></loading>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
import Loading from './view/loading/loading.vue'
import {mapGetters,mapActions} from 'vuex'
export default {
    name: 'app',
    components: {
        Loading
    },
    computed:mapGetters([
		"loadingState"
	]),
}
</script>

<style>

</style>
