<template>
	<div class="storeGoods">
		<ul class='fourFlex'>
			<li><span>综合</span></li>
			<li><span>销量</span></li>
			<li><span>上新</span></li>
			<li><i>价格</i><div class='topBottom'><div class='top'><img src="../../assets/img/upRed.png" alt=""></div><div class='bottom'><img src="../../assets/img/downRed.png" alt=""></div></div></li>
		</ul>
		<div class='storeGoodsList'>
			<div class='news'>
				<ul>
					<li>
						<div class='imgBox'>
							<img src="https://img.shunliandongli.com/attachment/images/2016/12/qcWxXpAxzxBipxrpkwTeRTkf1TatEW.jpg_300x300.jpg" alt="">
						</div>
						<div class='titlePrice'>
							<p>阿三发达省份的撒旦发生的腐蚀毒粉是发的是带饭 </p>
							<div class='price'><span>￥</span><b>99</b><i>￥168</i></div>
						</div>
					</li>
					<li>
						<div class='imgBox'>
							<img src="https://img.shunliandongli.com/attachment/images/2016/12/qcWxXpAxzxBipxrpkwTeRTkf1TatEW.jpg_300x300.jpg" alt="">
						</div>
						<div class='titlePrice'>
							<p>阿三发达省 </p>
							<div class='price'><span>￥</span><b>99</b><i>￥168</i></div>
						</div>
					</li>
					<li>
						<div class='imgBox'>
							<img src="https://img.shunliandongli.com/attachment/images/2016/12/qcWxXpAxzxBipxrpkwTeRTkf1TatEW.jpg_300x300.jpg" alt="">
						</div>
						<div class='titlePrice'>
							<p>阿三发达省份的撒旦发生的腐蚀毒粉是发的是带饭 </p>
							<div class='price'><span>￥</span><b>99</b><i>￥168</i></div>
						</div>
					</li>
					<li>
						<div class='imgBox'>
							<img src="https://img.shunliandongli.com/attachment/images/2016/12/qcWxXpAxzxBipxrpkwTeRTkf1TatEW.jpg_300x300.jpg" alt="">
						</div>
						<div class='titlePrice'>
							<p>阿三发达省份的撒旦发生的腐蚀毒粉是发的是带饭 </p>
							<div class='price'><span>￥</span><b>99</b><i>￥168</i></div>
						</div>
					</li>
					<li>
						<div class='imgBox'>
							<img src="https://img.shunliandongli.com/attachment/images/2016/12/qcWxXpAxzxBipxrpkwTeRTkf1TatEW.jpg_300x300.jpg" alt="">
						</div>
						<div class='titlePrice'>
							<p>阿三发达省份的撒旦发生的腐蚀毒粉是发的是带饭 </p>
							<div class='price'><span>￥</span><b>99</b><i>￥168</i></div>
						</div>
					</li>
					<li>
						<div class='imgBox'>
							<img src="https://img.shunliandongli.com/attachment/images/2016/12/qcWxXpAxzxBipxrpkwTeRTkf1TatEW.jpg_300x300.jpg" alt="">
						</div>
						<div class='titlePrice'>
							<p>阿三发达省份的撒旦发生的腐蚀毒粉是发的是带饭 </p>
							<div class='price'><span>￥</span><b>99</b><i>￥168</i></div>
						</div>
					</li>
					
				</ul>
			</div>
		</div>
		<tab>
      		<tab-item selected @on-item-click="onItemClick"><span>店铺首页</span></tab-item>
      		<tab-item @on-item-click="onItemClick"><span>店铺宝贝</span></tab-item>
      		<tab-item @on-item-click="onItemClick"><span>促销</span></tab-item>
      		<tab-item @on-item-click="onItemClick"><span>新品</span></tab-item>
    	</tab>

	</div>
</template>
<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
export default {
  	components: {
    	Tab,
    	TabItem,
    	Sticky,
    	Divider,
    	XButton,
    	Swiper,
    	SwiperItem
  	},
  	data () {
    	return {
		    index: 0,
    	}
  	},
  	methods: {
    	onItemClick (index) {
      		console.log('on item click:', index)
    	},
  	}
}
	
</script>
<style lang="less">


.storeGoods{
	.fourFlex{
		display:flex;
		border-top:0.013333rem solid #EEEEEE;
		li{
			flex:1;
			height:1.173333rem;
			line-height:1.173333rem;
			text-align: center;
			background:#F7F7F7;
			color:#1C1B20;
			font-size: 0.373333rem;
			i{
				display:inline-block;
				height:100%;
				float:left;
				margin-left:0.7rem;
			}
			.topBottom{
				position:relative;
				float:left;
				height:100%;
				width:0.173333rem;
				margin-left:0.133333rem;
				div{
					height:0.093333rem;
					width:0.173333rem;	
					img{
						width:100%;
						float:left;
						height:100%;
					}
				}
				.top{
					position:absolute;
					top:0.48rem;

				}
				.bottom{
					position:absolute;
					top:54%;
				}
			}
		}
	}
	.storeGoodsList{
		.news{
			background:#F7F7F7;
			overflow: hidden;
			ul{
				li:nth-child(odd){
					padding-right: 0.066667rem;
				}
				li:nth-child(even){
					padding-left: 0.066667rem;
				}
				li{
					width:50%;
					float:left;
					box-sizing: border-box;
					p{
					    padding: 0.333333rem 0.16rem 0;
				        overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						word-break: break-all;
						text-align:left;
						color:#1C1B20;
					}
					.imgBox{
						position: relative;
					    width: 100%;
					    height: 0;
					    overflow: hidden;
					    margin: 0;
					    padding-bottom: 100%;
					   	img{
					   		width:100%;
					   	}
					}
					.titlePrice{
						height:1.933333rem;
						background:white;
						p{
							height:0.8rem;
							line-height:0.4rem;
							font-size:0.32rem;
						}
					}
					.price{
						padding:0.133333rem 0;
						background:white;
						b{
							color:#FB0036;
							font-size:0.306667rem;
						}
						span{
							color:#FB0036;
							font-size:0.16rem;
						}
						i{
							text-decoration: line-through;
							color:#858585;
							padding-left:0.266667rem;
						}
					}
				}
			}
		}	
	}
	
}


</style>