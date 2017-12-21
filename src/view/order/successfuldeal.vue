<template>
	<div class="successoff">
		<div class="success_top">
			<div class="success_left">
				<div class="pay">交易成功</div>
				<div class="pay_bottom">卖家将收到您的</div>
			</div>
			<div class="success_right">
				<img src="../../assets/img/proflie_logo.png" alt="">
			</div>
		</div>
		<div class="two_btn">
			<span>查看订单</span>
			<span style="color:#FB0036">立即评价</span>
		</div>
		<div class="success_c">
			<div class="title">
				<span class="line"></span>
				<span class="text">您可能还想买</span>
				<span class="line" style="float:right;"></span>
			</div>
			<ul class="success_ul">
				<li v-for='item in 4'>
					<img src="../../assets/img/bg_pay_success@2x.png"  alt="">
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
		
	
	},
	created(){

	}
}
</script>
<style lang='less'>
	.successoff{
		width: 100vw;
		height: 100%;
		background: #f7f7f7;
		.success_top{
			width: 100vw;
			height:5.97rem;
			background: #FB0036;
			.success_left{
				float: left;
				margin-top: 3.4rem;
				margin-left: 1.05rem;
				.pay{
					font-size: 0.43rem;
					color:#fff;
				}
				.pay_bottom{
					color:#fff;
					font-size: 0.32rem;
					margin-top: 0.25rem;
				}
			}
			.success_right{
				width: 2.13rem;
				height: 2.48rem;
				float: right;
				margin-right: 1.07rem;
				margin-top: 2.87rem;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
		.two_btn{
			width: 100vw;
			height: 1.07rem;
			background: #fff;
			box-sizing: border-box;
			span{
				display: inline-block;
				width: 4.9rem;
				text-align: center;
				line-height: 1.07rem;
				color:#1C1B20;
				font-size: 0.37rem;
				height: 1.07rem;
			}
		}
		.success_c{
			width: 100vw;
			height: 100%;
			margin-top: 0.27rem;
			.title{
				width: 100%;
				height: 100%;
				text-align: center;
				padding-bottom: 0.47rem;
				background: #fff;
				padding-top: 0.67rem;
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
			.success_ul{
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