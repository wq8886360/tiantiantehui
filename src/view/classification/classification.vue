<template>
	<div class="classification">
		<flexbox align="center" justify="center" orient="vertical">
			<flexbox-item><div class="flex-demo" @click="go(54)">ID: 54</div></flexbox-item>
			<flexbox-item><div class="flex-demo" @click="go(56)">ID: 56</div></flexbox-item>
			<flexbox-item><div class="flex-demo" @click="go(155)">ID: 155</div></flexbox-item>
			<flexbox-item><div class="flex-demo" @click="go(26)">ID: 26</div></flexbox-item>
		</flexbox>
	</div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
export default{
	components: {
		Flexbox,
		FlexboxItem
	},
	methods:{
		go(id){
			this.$router.push({path: '/good/detail',query: {goods_id: id}})
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