<template>
	<div class="exchangeTop">
		<div class="exchange_i">
			<div class="exchange_t">
				<div class="title">退货退款申请成功，等待商家处理</div>
				<div class="timer">还剩23小时23分</div>
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
}
</style>
