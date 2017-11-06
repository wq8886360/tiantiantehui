<template>
    <div class="loginState" v-if="loading">
        <div class="box">
            <img src="../../assets/img/loading.gif" alt="">
        </div>
    </div>
</template>
<script>
export default {
    props:{
		loading: Boolean
	},
}
</script>
<style lang="less">
    .loginState{
        position: fixed;
        z-index: 999;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        overflow: hidden;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
            width: 2.13rem;
            height: 2.13rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, .8);
            img{
                width: 1.6rem;
                height: 1.6rem;
            }
        }
    }
</style>


