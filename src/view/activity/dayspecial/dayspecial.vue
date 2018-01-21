<template>
	<div class="dayspecial">
	  <div class="flexding">
		<div class="tiantian">
			<img src="../../../assets/img/img_active_tiantiantehui_title@2x.png"  class="tehui">
		</div>
		<!-- 即将开始倒计时 -->
		
		<div class="daybebaout">
			<scroller class='chuxian' lock-y :scrollbar-x=false>
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
		</scroller>
		</div>
		
		<!-- 限时限量抢购 -->
		<div class="purchase">
			<span class="left">限时限量抢购</span>
			<span class="left mar">尖货低价抢</span>
			<!-- <p class="right bawu">距本场开始  <span class="black">22</span >:<span class="black">34</span>:<span class="black">45</span></p> -->
			<p class="right bawu">距本场结束  <span class="black">22</span >:<span class="black">34</span>:<span class="black">45</span></p>
		</div>
	  </div>
		<!-- 中间内容部分 -->
		<div class="content">
			<!-- 商品展示 -->
			<div class="commshow">
				<!-- <img src="" class="commshowimg"> -->
				<div class="sellout"><img src="../../../assets/img/img_active_guang.png"></div>
			</div>
			<!-- 商品详情 -->
			<div class="commdetails">
				<p class="commname">麻衣布坊2016时尚数学问题毛边高腰涂鸦毛边牛仔短裤LCL017时尚短款阿萨德撒的所大</p>
				<!-- 即将开始 -->
<!-- 				<div class="price">
					<div class="price-left">
						<div class="money">
							<strong class="bluec" style="font-size:0.4rem;">￥98</strong>
							<del style="font-size:0.29rem;">￥199</del>							
						</div>
						<p class="remind bulec">已有5996人设置提醒</p>
					</div>
					<div class="button"> -->
						<!-- <div class="xbutton blue" @click="showSuccess('middle')" >提醒我
							<img src="../../../assets/img/icon_active_time@2x.png">
						</div> -->
<!-- 						<div class="xbutton hui buttwo" @click="showCancel">取消提醒</div>
						
					</div>					
				</div> -->
				<!-- 抢购中 -->
				<div class="price">
					<div class="price-left">
						<div class="money">
							<strong class="redc" style="font-size:0.4rem;">￥98</strong>
							<del style="font-size:0.29rem;">￥199</del>							
						</div>
						<p class="jindt">
							<span class="bar-bg">
								<span class="barpo">已售666件</span>
								<span class="bar-on">
									
								</span>
							</span>
						</p>
					</div>
					<div class="button">
						<!-- <div class="xbutton buttwo red">立即抢购</div> -->
						<div class="xbutton buttwo hui">已抢光</div>
						
					</div>					
				</div>
					
			</div>
			
		</div>
		<!-- 弹出设置-提醒我 -->
<!-- 		<div class="popup">
			 <toast v-model="showPositionValue" type="text" :time="2600" is-show-mask :position="position" class="showsuccess">
			 	<img src="../../../assets/img/icon_common_duihao@2x.png" class="duihao">
			 	<strong class="txchengg">设置提醒成功</strong>
			 	<p class="sanfenzhong">将在开抢前三分钟提醒您</p>
			 </toast>
		</div> -->
		<div class="popup">
			 <toast v-model="showPositionCancel" type="text" :time="2600" is-show-mask :position="position" class="showsuccess">
			 	<img src="../../../assets/img/icon_common_tanhao@2x.png" class="duihao">
			 	<strong class="txchengg">取消提醒成功</strong>
			 	
			 </toast>
		</div>

	</div>

</template>

<script>
	import { XButton,Toast,Scroller} from 'vux'
	export default {
		components:{
			Toast,
			XButton,
			Scroller
		},
		data() {
			return {
				position: 'default',
				showPositionValue: false,//提醒成功
				showPositionCancel:false,//取消提醒
			}
		},
		methods:{
			showSuccess (position) {
			     this.position = position
			     this.showPositionValue = true
			   },
			showCancel(position) {
				this.position = position
				this.showPositionCancel = true
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
			.chuxian{
			overflow:visible !important;
			}
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
		.redc {
			color: #FB0036;
		}
		.blue {
			
			background-color: #2096F2;
		}
		.bluec {
			color: #2096F2;
		}
		.hui {
			background-color: #ccc;
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
				/*抢光了*/
				.sellout {
					margin: 0.50rem;
					img {
						width: 1.87rem;
						height: 1.87rem;
					}
					
				}
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
					margin-top: 0.8rem;
					overflow: hidden;

					.price-left {
						float: left;
						width: 3.66rem;
						height: 1.2rem;
						/*height: 0.91rem;*/
						.money {
							overflow: hidden;
							margin-bottom: 0.1rem;
							strong {
								float: left;
								
								font-weight: 700;

							}
							del {
								font-size:0.29rem;
								float: left;
								margin-left: 0.13rem;
								margin-top: 0.06rem;
								
							}
							.remind {
								font-size: 0.29rem;
							} 
						}
						/* 进度条 */
						.jindt {
							width: 3.2rem;
							height: 0.36rem;
							background-color:#FFBFFF;
							border-radius: 0.3rem;
							font-size: 0.12rem;
							color: #fff;
							line-height: 1;
							// padding-left: 0.3rem;

							.bar-bg{
							  width:100%;
							  height:0.36rem;
							  display:block;
							  border-radius:0.3rem;
							  position: relative;

							  .barpo {
							  	position: absolute;
							  	top: 0;
							  	left: 0.2rem;
							  }
							  
							  .bar-on{
							    width:10%;
							    display:block;/* 设为block */
							    border-radius:0.3rem;
							    height:0.36rem; /* okay 基本上就这样 剩下的就交给动画来控制了 */
							    // animation:bar 7s ease  infinite; /* 设置动画持续时间为7s 反复播放 */
							    background:linear-gradient(-45deg, rgba(251, 0, 54, 1) 0%,transparent 30%,rgba(252, 96, 118, 1) 60%,rgba(255, 154, 68, 1) 80% ,transparent 100%)							    
							  }
							  // @keyframes bar{
							  //   0%{
							  //     width:0;
							  //   }
							  //   100%{
							  //     width:100%;
							  //   }
							    
							  // }
							}
						}

					}
					.button .xbutton	{
						width: 2.13rem;
						height: 0.67rem;
						float: right;
						border-radius: 0.4rem;						
						margin-top: 0.30rem;						
						font-size: 0.32rem;
						color: #fff;
						text-align: center;
						overflow: hidden;
						img {
							width: 0.32rem;
							height: 0.32rem;
							margin-right: 0.08rem;
							margin-top: 0.16rem;
						}
					}
					.button .buttwo {
						line-height: 2
					}					
					
				}
			}

		}
		/*弹出设置-提醒我*/
		.popup {
			width: 100%;
			height: 100%;
			overflow: hidden;
			.showsuccess {
				overflow: hidden;
				.duihao {
					width: 0.8rem;
					height: 0.8rem;
					margin: 0.06rem 0 0.06rem;
				}
			}
			strong {
				display: block;
				width: 2.4rem;
				font-size: 0.4rem;
				/*margin: 0.28rem 0.68rem 0.12rem;*/
			}
			.sanfenzhong {
				font-size: 0.27rem;
				/*margin: 0 0.4rem;*/
				color: #E8E8E8;
			}
			.weui-toast{
				width: 3.73rem !important;
				height: 2.67rem;
			}	
			.weui-toast__content strong{
				width: auto !important;
			}

		}







	}
</style>