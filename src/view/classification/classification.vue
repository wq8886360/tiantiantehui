<template>
	<div class="classification">
		<flexbox align="center" justify="center" orient="vertical">
			<flexbox-item><div class="flex-demo" @click="go(54)">ID: 54</div></flexbox-item>
			<flexbox-item><div class="flex-demo" @click="go(56)">ID: 56</div></flexbox-item>
			<flexbox-item><div class="flex-demo" @click="go(155)">ID: 155</div></flexbox-item>
			<flexbox-item><div class="flex-demo" @click="go(26)">ID: 26</div></flexbox-item>
		</flexbox>

        <x-button mini type="primary" @click.native="goStroe(59)">店铺59</x-button>
        <x-button mini type="primary" @click.native="goStroe(53)">店铺53</x-button>
	</div>
</template>
<script>
import { Flexbox, FlexboxItem, XButton } from 'vux'
export default{
	components: {
		Flexbox,
        FlexboxItem,
        XButton
	},
	methods:{
		go(id){
			this.$router.push({path: '/good/detail',query: {goods_id: id}})
        },
        goStroe(id){
            this.$router.push({path: '/store', query: {store_id : id}})
        }
	}
}
</script>
<style>
.classification .vux-flexbox-item{
	background: #FB0036;
	border-radius: 4px;
}
.classification .flex-demo{
	text-align: center;
	color: #fff;
	font-size: 0.53rem;
}
</style>