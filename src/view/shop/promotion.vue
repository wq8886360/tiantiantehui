<template>
	<div class="promotion">
		<div class='promotionBox'>
			<ul class='promotionList'>
				<li class='select'>
					<span>asdasdasdasdasd</span>
				</li>
				<li> 
					<span>asdas</span>
				</li>
				<li>
					<span>满五十减三十</span>
				</li>
				<li>
					<span>满五十减三十</span>
				</li>
				<li>
					<span>满五十减三十</span>
				</li>
			</ul>
			<div class='promotionGoods'>
				<div class='time'>
					<p><b></b><span>时间：</span><i>9月8号 23:59分 59秒</i></p>
					<p><b></b><span>时间：</span><span>9月8号 23:59分 59秒</span></p>
				</div>
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
		</div>
		
	</div>
</template>
<script>
import {storeIndex,checkCode } from '../../http/api.js'
export default{
	data(){
		return{
		} 
	},
	methods:{
       
    },

	created() {	
		
	}
}
</script>
<style  lang="less">
/* ----------------------------------- */
.promotion{
	.promotionBox{
		border-top:1px solid #EEEEEE;
		.promotionList{
			list-style-type: none;
			display:-webkit-box;
			display:-webkit-flex;
			display:-ms-flexbox;
			display:flex;
			-webkit-flex-wrap:nowrap;
			-ms-flex-wrap:nowrap;
			flex-wrap:nowrap;
			-webkit-box-pack:justify;
			-webkit-justify-content:space-between;
			-ms-flex-pack:justify;
			justify-content:space-between;
			padding:0;
			overflow:auto;
			background:white;
			li{
				-webkit-box-flex:1;
				-webkit-flex:1 0 auto;
				-ms-flex:1 0 auto;
				flex:1 0 auto;
				background-size: cover;
				text-align: center;
				margin-top:0.4rem;
				span{
					display:inline-block;
					font-size:0.293333rem;
					height:0.533333rem;
					line-height:0.533333rem;
					color:#FB0036;
					border:1px solid #FB0036;
					border-radius:0.266667rem;
					padding:0 0.266667rem 0;
					margin:0 0.266667rem 0;
				}
			}
			.select{
				span{
					color:white;
					background:#FB0036;
				}
				
			}
		}
		.promotionList::-webkit-scrollbar{
			width:0px
		}
		.promotionGoods{
			.time{
				background:#F7F7F7;
				height:1.333333rem;
				font-size: 0.28rem;
				color:#1C1B20;
				box-sizing: border-box;
				padding-left:0.48rem;
				padding-top:0.186667rem;
				p{
					position:relative;
				}
				p:first-child{
					margin-bottom:0.1rem;
				}
				b{
					display:inline-block;
					width:0.08rem;
					height:0.08rem;
					background:#FB0036;
					position:absolute;
					top:50%;
					margin-top:-0.04rem;
					left:-0.15rem;
				}
			}
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

}

	
</style>