<template>
	<div class="exchangeTop">
		<div class="exchange_i">
			<div class="exchange_t">
				<div class="title">退货退款申请成功，等待商家处理</div>
				<div class="timer">还剩23小时23分</div>
			</div>
		</div>
		<div class="exchange_b">
			<div class="Serial">
				<div class="title">您已成功发起退款申请，请等待商家处理</div>
				<div class="text_t">	商家同意或者逾期未处理，系统将发送退货地址给您;如果商家拒绝，您可以修改申请或申请平台介入处理.</div>
			</div>
			<div class="collection">
				<span class="collection_gray btn_coll">协商历史</span>
				<span class="collection_gray btn_coll">修改申请</span>
				<span v-if='false' class="collection_red btn_coll">提交物流申请</span>
			</div>
		</div>
	</div>
</template>
<script>
export default{
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
.exchangeTop{
	width: 100vw;
	.exchange_i{
		width: 100vw;
		height: 2.93rem;
		background: #FB0036;
		.exchange_t{
			padding-top: 0.97rem;
			margin-left: 1.07rem;
			.title{
				color:#ffffff;
				font-family: PingFang-SC-Regular;
				font-size: 0.43rem;
			}
			.timer{
				color:#FFFFFF;
				font-size: 0.32rem;
				margin-top: 0.25rem;
			}
		}
	}
	.exchange_b{
		width: 100vw;
		background: #fff;
		padding-bottom: 0.3rem;
		overflow: hidden;
		.Serial{
			padding: 0.4rem 0.27rem 0.4rem 0.27rem;
			.title{
				font-family: PingFang-SC-Regular;
				color:#1C1B20;
				font-size: 0.37rem;
			}
			.text_t{
				font-family: PingFang-SC-Regular;
				color:#858585;
				font-size: 0.32rem;
				margin-top: 0.13rem;
			}
		}
		.collection{
			float: right;
			margin-right: 0.27rem;
		}
	}
}
</style>
<style>
	@import '../../../assets/css/public/btn.css';
</style>