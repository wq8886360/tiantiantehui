<template>
	<div class="Payoff">
		<div class="Pay_top">
			<img src="../../assets/img/img_pay_success@2x.png" alt="">
			<div class="coin">
				<span class="coin_left">￥</span>
				<span class="coin_right">286.98</span>
			</div>
			<div class="Pay_cpm">
				<span class="store_order" @click='order()'>查看订单</span>
				<span class="store_index">返回首页</span>
			</div>
		</div>
		<div class="Pay_c">
			<div class="title">
				<span class="line"></span>
				<span class="text">您可能还想买</span>
				<span class="line" style="float:right;"></span>
			</div>
			<ul class="Pay_ul">
				<li v-for='item in 4'>
					<img src="../../assets/img/bg_pay_success@2x.png" alt="">
					<div class="titll">
						(新品上市)雅号女士套装2016夏季新品时尚职业装
					</div>
					<div class="coin_god">
						<span class="coin_ll">￥</span>
						<span class="conin_rr">99</span>
					</div>
				</li>
			</ul>
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
		/*跳转到订单详情*/
		order(){
			this.$router.push({path:"/orderdetails"})
		}
	},
	created(){

	}
}
</script>
<style lang='less'>
	.Payoff{
		width: 100vw;
		height: 100%;
		.Pay_top{
			width: 100vw;
			height:5.97rem;
			background: url('../../assets/img/bg_pay_success@2x.png');
			background-size: 100% auto;
			img{
				width: 1.72rem;
				height: 1.72rem;
				margin: 0 auto;
				display: block;
				padding-top: 1.32rem;
			}
			.coin{
				text-align: center;
				margin-top: 0.35rem;
				color:#fff;
				.coin_left{
					font-size: 0.32rem;
				}
				.coin_right{
					font-size: 0.63rem;

				}
			}
			.Pay_cpm{
				padding: 0.55rem 1.73rem 0.55rem 1.73rem;
				overflow: hidden;
				span{
					color:#FFFFFF;
					font-family: PingFang-SC-Regular;
					font-size: 0.37rem;
				}
				.store_order{
					float: left;
				}
				.store_index{
					float: right;
				}
			}
		}
		.Pay_c{
			width: 100vw;
			height: 100%;
			margin-top: 0.69rem;
			.title{
				width: 100%;
				height: 100%;
				text-align: center;
				margin-bottom: 0.47rem;
				.line{
					width: 3.55rem;
					height: 1px;
					background: #EEEEEE;
					float: left;
				}
				.text{
					font-family: PingFang-SC-Regular;
					color:#1C1B20;
					font-size: 0.41rem;
					position: relative;
					top: -0.25rem;
				}
			}
			.Pay_ul{
				width: 100vw;
				height: 100%;
				background: #f7f7f7;
				overflow: hidden;
				li{
					width: 4.93rem;
					float: left;
					margin-right: 0.13rem;
					margin-bottom: 0.13rem;
					background: #fff;
					img{
						width: 4.93rem;
						height: 4.93rem;
					}
					.titll{
						width: 4.5rem;
						font-family: PingFang-SC-Medium;
						color:#1C1B20;
						font-size: 0.32rem;
						padding-left: 0.15rem;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						height: 0.9rem;
					}
					.coin_god{
						padding-top: 0.27rem;
						padding-bottom: 0.27rem;
						padding-left: 0.15rem;
						span{
							color:#FB0036;
						}
						.coin_ll{
							font-size: 0.27rem;
						}
						.conin_rr{
							font-size: 0.4rem;
						}
					}
				}
				li:nth-child(2n){
					margin-right: 0rem;
				}
			}
		}
	}
</style>