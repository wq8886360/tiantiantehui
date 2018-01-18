<template>
	<div class="dayspecial">
	  <div class="flexding">
		<div class="tiantian">
			<img src="../../../assets/img/img_active_tiantiantehui_title@2x.png"  class="tehui">
		</div>
		<!-- 即将开始倒计时 -->
		<div class="daybebaout">
			<ul>
				<li class="red">
					<p class="daytime">18:00</p>
					<p class="willbegin">即将开始</p>
					<div class="trigon"></div>
				</li>
				<li class="red">
					<p class="daytime">00:00</p>
					<p class="willbegin">即将开始</p>
					<div class="trigon"></div>
				</li>
				<li>
					<p class="daytime">12:00</p>
					<p class="willbegin">即将开始</p>
					<div class="trigon"></div>
				</li>
				<li>
					<p class="daytime">18:00</p>
					<p class="willbegin">即将开始</p>
					<div class="trigon"></div>
				</li>
			</ul>
		</div>
		<!-- 限时限量抢购 -->
		<div class="purchase">
			<span class="left">限时限量抢购</span>
			<span class="left mar">尖货低价抢</span>
			<p class="right bawu">距本场开始  <span class="black">22</span >:<span class="black">34</span>:<span class="black">45</span></p>
		</div>
	  </div>
		<!-- 中间内容部分 -->
		<div class="content">
			<!-- 商品展示 -->
			<div class="commshow">
				<!-- <img src="" class="commshowimg"> -->
			</div>
			<!-- 商品详情 -->
			<div class="commdetails">
				<p class="commname">麻衣布坊2016时尚数学问题毛边高腰涂鸦毛边牛仔短裤LCL017时尚短款阿萨德撒的所大</p>
				
				<div class="price">
					<div class="prcie-left">
						<div class="money">
							<strong style="font-size:0.4rem;">￥98</strong>
							<del style="font-size:0.29rem;">￥199</del>
						</div>
					</div>
					<div class="button">
						
					</div>

				</div>

			</div>
	
		</div>
		  

	</div>

</template>

<script>
	export default {
		data() {
			return {

			}
		}




	}


</script>

<style lang="less">
	.dayspecial {
		.flexding {
			width: 100%;
			overflow: hidden;
			position: fixed;
			top: 0;
			background-color: #fff;

		}
		/*天天特惠表头*/
		.tiantian {
			width: 100%;
			padding: 0.27rem 0;
			.tehui {
				width: 2.67rem;
				height: 0.53rem;
				display: block;
				margin: 0 auto;
			}
		}
		/*即将开始倒计时*/
		.daybebaout{
			width: 100%;
			height: 1.33rem;
			background-color: #1C1B20;
			box-sizing: border-box;
			ul {
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				line-height: 1;

				li {
				float: left;
				width: 25%;
				text-align:center;
				color: #fff;
				padding: 0.25rem 0;
				position: relative;
					.daytime{
						font-size: 0.43rem;
					}
					.willbegin {
						font-size: 0.29rem;
						margin-top: 0.09rem;
					}
					.trigon {
						width: 0;
						height: 0;
						border-left: 0.23rem solid transparent;
						border-right: 0.213rem solid transparent;
						border-top: 0.23rem solid #FB0036;
						position: absolute;
						bottom: -0.23rem;
						left: 45%;
					}
				}
			}
			
		}
		/*红色的样式*/
		.red {
			background: #FB0036;
		}
		/*浮动样式*/
		.left {
			float: left;			
		}
		.right {
			float: right
		}
		/*限时抢购*/
		.purchase {
			box-sizing: border-box;
			background-color: #F7F7F7;
			padding: 0.27rem;
			overflow: hidden;
			font-size: 0.32rem;
			.mar {
				margin-left: 0.4rem;
			}
			.bawu {
				color: #858585;
			}
			.black {
				display: inline-block;
				width: 0.4rem;
				height: 0.4rem;
				background-color: #1C1B20;
				text-align: center;
				line-height: 0.4rem;
				border-radius: 0.08rem;
				color: #fff;
				margin: 0 0.08rem;

			}
		}
		/*中间内容部分*/
		.content {
			width: 100%;
			height: 3.47rem;
			box-sizing: border-box;
			overflow: hidden;
			padding: 0.27rem 0.27rem 0.4rem 0;
			margin-top: 3.4rem;
			border-bottom: 0.01rem solid #eee;
			.commshow {
				width: 2.93rem;
				height: 2.72rem;
				background-color: pink;
				float: left;
				margin-top: 0.08rem;
			}
			.commdetails {
				float: left;
				margin-left: 0.27rem;
				box-sizing: border-box;
				/*overflow: hidden;*/
				.commname {
					width: 6.24rem;
					height: 0.83rem;
					font-size: 0.37rem;
					line-height: 1.2;
					overflow:hidden; 
					text-overflow:ellipsis;
					display:-webkit-box; 
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2; 
				}
				.price {
					width: 100%;
					margin-top: 1.07rem;
					overflow: hidden;
					.price-left {
						float: left;
						width: 3.07rem;

						.money {
							overflow: hidden;

							strong {
								float: left;
								
								font-weight: 700;

							}
							del {
								font-size:0.29rem;
								float: left;
								margin-left: 0.13rem;
								
							}
						}
					}
				}
			}



		}






	}
</style>