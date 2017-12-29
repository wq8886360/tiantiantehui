<template>
	<div class="Refund">
		<exchangeTop></exchangeTop>
		<leave></leave>
		<div class="re_address" >
			<div class="re_top">
				<div class="title">退货详情</div>
			</div>
			<div class="address">
				<div class="address_top">
					<div class="address_left">收件人：撒旦撒的尿是是</div>
					<div class="iphone">联系电话：13569855874</div>
				</div>
				<div class="adress_bottom">
					浙江省杭州市滨江区江陵路1916号浙江省杭州市滨江区江陵路1916号
				</div>
			</div>
		</div>
		<offcialshop style='margin-top:0.27rem'></offcialshop>
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
<style lang='less'>
.Refund{
	width: 100vw;
	background: #f7f7f7;
	padding-bottom: 1.6rem;
	.re_address{
		width: 100vw;
		margin-top: 0.27rem;
		background: #fff;
		padding-bottom: 0.4rem;
		.re_top{
			width: 100vw;
			.title{
				margin-left: 0.27rem;
				margin-right: 0.27rem;
				height: 1.07rem;
				border-bottom: 1px solid #EEEEEE;
				font-family: PingFang-SC-Regular;
				color:#1C1B20;
				font-size: 0.37rem;
				line-height: 1.07rem;
			}
		}
		.address{
			margin-right: 0.27rem;
			margin-left: 0.27rem;
			.address_top{
				width: 100%;
				overflow: hidden;
				margin-top: 0.4rem;
				.address_left{
					float: left;
					font-family: PingFang-SC-Regular;
					color:#1C1B20;
					font-size: 0.32rem;
					width: 4.0rem;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.iphone{
					width:3.8rem;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					float: right;
					font-family: PingFang-SC-Regular;
					color:#1C1B20;
					font-size: 0.32rem;
				}
			}
			.adress_bottom{
				font-family: PingFang-SC-Regular;
				color:#1C1B20;
				font-size: 0.32rem;
				margin-top: 0.27rem;
			}
		}
	}
}
</style>