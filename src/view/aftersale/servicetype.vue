<template>
    <div class="servicetype">
        <div class="store">
            <div class="flagship">
				<div class="flagship_top">
					<div class="flagship_store">
						<img src="../../assets/img/storeIconAct.png" alt="">
						<span>1111111 </span>
					</div>
				</div>
				<ul class="flagship_ul">
					<li>
						<div class="Skin_care">
							<div class="Skin_n" style="overflow:hidden">
								<div class="skin_left">
									<img src="../../assets/img/proflie_logo.png" alt="">
									<div class="Skin_c">
										<div class="text">
											<span class="spell">拼</span>
											<span class="title">32131221</span>
										</div>
										<div class="sku">
											50
										</div>
									</div>
								</div>
								<div class="skin_right">
									<div class="price">￥70</div>
									
									<div class="quantity">x7</div>	
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
        </div>
        <div class="options">
        	<div class="options_refund">
        		<img class="photo_c" src="../../assets/img/img_aftersalesservice_tuikuan@2x.png" alt="">
        		<div class="options_comn">
        			<div class="jin">仅退款</div>
        			<div class="home">商家协商同意前提下</div>
        		</div>
        		<i class="icon-right right_r"></i>
        	</div>
        	<div class="options_refund">
        		<img class="photo_c" src="../../assets/img/img_aftersalesservice_tui@2x.png" alt="">
        		<div class="options_comn">
        			<div class="jin">退货退款</div>
        			<div class="home">已收到货,需要退还已收到的货物</div>
        		</div>
        		<i class="icon-right right_r"></i>
        	</div>
        	<div class="options_refund">
        		<img class="photo_c" src="../../assets/img/img_aftersalesservice_exchange@2x.png" alt="">
        		<div class="options_comn">
        			<div class="jin">换货</div>
        			<div class="home">已收到货，需要更换已收到的货</div>
        		</div>
        		<i class="icon-right right_r"></i>
        	</div>
        </div>
    </div>
</template>
<script>
export default {
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
.servicetype{
	width: 100vw;
	background:#F7F7F7;
	border-top:1px solid #D8D8D8;
	.flagship{
		width: 100%;
		.flagship_top{
			width: 100%;
			height: 100%;
			border-bottom:1px solid #EEEEEE;
			background: #fff;
			.flagship_store{
				padding: 0.36rem 0.27rem 0.36rem 0.27rem;
				img{
					width:0.36rem;
					height: 0.33rem;
					vertical-align: middle;
				}
				span{
					vertical-align: middle;
					font-family: PingFang-SC-Regular;
					font-size: 0.37rem;
					color:#1C1B20;
					margin-left: 0.2rem;
				}
			}
		}
		.flagship_ul{
			width: 100%;
			height: 100%;
			background: #fff;
			border-bottom:1px solid #EEEEEE;
			li{
				width: 100%;
				height: 100%;
				.Skin_care{
					padding: 0.2rem 0.27rem 0.2rem 0.27rem;
					overflow: hidden;
					.skin_left{
						width: 7.47rem;
						float: left;
						img{
							width: 2.13rem;
							height: 2.13rem;
						}
						.Skin_c{
							width: 4.91rem;
							float: right;
							.text{
								width: 4.91rem;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
								.spell{
									border-radius: 3px;
									background: #FB0036;
									font-size:12px;
									color: #fff;
									display: inline-block;
									line-height: 0.35rem;
									text-align: center;
									vertical-align: middle;
									padding: 0.02rem;
								}
								.title{
									font-size: 0.35rem;
									display: inline-block;
									vertical-align: middle;
								}
							}
							.sku{
								font-family: PingFang-SC-Regular;
								color: #858585;
								font-size: 0.32rem;
								margin-top: 0.07rem;
							}
						}
					}
					.skin_right{
						float: right;
						.price{
							font-family: PingFang-SC-Regular;
							color: #1C1B20;
							font-size: 0.37rem;
							text-align: right;
						}
						.price_hide{
							font-family: PingFang-SC-Regular;
							color:#858585;
							font-size: 0.32rem;
							text-align: right;
							text-decoration: line-through;
						}
						.quantity{
							margin-top: 0.07rem;
							text-align: right;
							color:#858585;
							font-size: 0.32rem;
						}
						.sales{
							font-family: PingFang-SC-Regular;
							color:#858585;
							border:1px solid #858585;
							font-size: 0.37rem;
							float: right;
							border-radius: 27px;
							width: 1.33rem;
							height: 0.72rem;
							text-align: center;
							line-height: 0.72rem;
							margin-top: 0.23rem;
						}
					}
					.gifts{
						width: 8.2rem;
						margin-left: 0.89rem;
						margin-top: 0.13rem;
						overflow: hidden;
						.corner{
							width: 0.37rem;
							height: 0.37rem;
							border-left: 1px solid #CCCCCC;
							border-bottom: 1px solid #CCCCCC;
							float: left;
						}
						.corner_right{
							width: 7.73rem;
							
							background: #F7F7F7;
							float: right;
							margin-top: 0.05rem;
							.conn_left{
								width: 100%;
								.writing{
									font-size:12px;
									color:#fff;
									writing-mode:tb-rl;
									background: #FB0036;
									float: left;
								}
								.photo_c{
									float: left;
									width: 0.67rem;
									height: 0.67rem;
									display: inline-block;
								}
								.title{
									font-family: PingFang-SC-Regular;
									font-size: 0.32rem;
									margin-left: 0.33rem;
									line-height: 0.67rem;
								}
							}
						}
					}
				}
			}
		}
	}
	.options{
		width: 100vw;
		height: 2rem;
		background: #fff;
		margin-top: 0.27rem;
		.options_refund{
			width: 100vw;
			border-bottom: 1px solid #EEEEEE;
			height: 1.85rem;
			background: #fff;
			.photo_c{
				width: 0.61rem;
				height: 0.61rem;
				float: left;
				margin-top: 0.48rem;
				margin-left: 0.37rem;
			}
			.options_comn{
				float: left;
				margin-left: 0.36rem;
				margin-top: 0.27rem;
				.jin{
					font-family: PingFang-SC-Regular;
					color:#1C1B20;
					font-size: 0.37rem;
					margin-bottom: 0.27rem;
				}
				.home{
					font-family: PingFang-SC-Regular;
					color:#858585;
					font-size: 0.32rem;
				}
			}
			.right_r{
				float: right;
				margin-right: 0.27rem;
				font-size: 15px;
				margin-top: 0.8rem;
			}
		}
	}
}
</style>


