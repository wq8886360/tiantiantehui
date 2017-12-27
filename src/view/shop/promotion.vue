<template>
	<div class="promotion" >
		<div class='promotionBox' v-if='promotionList!=""'>
			<div style="width:100%;overflow:auto; -webkit-overflow-scrolling: touch;" class='pushBox' :class="{'tabBarFixed':tabFix}"> 
	    		<div style="width:100040px;color:white;-webkit-overflow-scrolling: touch;">       
	        		<div class='pushCon' style="float:left;" v-for='item in promotionList.lable'>
	        			<span @click='getInfo(item)'>{{item.name}}</span>
	        		</div>
	    		</div>
			</div>

			<div class='promotionGoods' >
				<div class='time' v-if='promotionList.label!=null' v-show='promotionList.list.remark'>
					<p class='remark' v-for='item in promotionList.list.remark'>{{item}}</p>
				</div>
				<div v-if='promotionList.list!=null'>
					<div class='news' v-if='promotionList.list.goods.data!=null'>
						<ul v-if='promotionList.list.goods.data.length!=0'>
							<li v-for='item in promotionList.list.goods.data' @click='gotoDetail(item)'>
								<div class='imgBox'>
									<img :src="item.whole_thumb" alt="">
								</div>
								<div class='titlePrice'>
									<p>{{item.title}}</p>
									<div class='price'><span>￥</span><b>{{item.price}}</b><i>￥{{item.market_price}}</i></div>
								</div>
								<p class='gift' v-show='item.giftGoodsName'><span>赠品</span>{{item.giftGoodsName}}</p>
							</li>
						</ul>
						<div v-else class='noReview'>
				            <img src="../../assets/img/noReview.png" alt="">
				            <p>没有相关商品</p>
				        </div>
					</div>
					<div  class='combo' v-else-if='promotionList.list.goods!=null'>
						<div v-for='item in promotionList.list.goods' class='comboBottom'  v-if='promotionList.list.goods.length!=0' @click='combo(item.id)'>
							<div class='comboPriceBox'>
				    			<div>
					    			<span class='comboPrice'>套餐价</span>
			        				<i>￥</i>
			        				<b>{{item.price}}</b>
			        				<span class='oldPrice'>套餐原价￥{{item.old_price}}</span>
				    			</div>
		        			</div> 
	        				<p class='timeBox'>时间：2015.1.11结束</p>
							<div style="width:100%;overflow:auto;-webkit-overflow-scrolling: touch;" class='comboDiv'> 
					    		<div style="width:100040px;-webkit-overflow-scrolling: touch;"> 
					        		<div class='comboCon' style="float:left;" v-for='items in item.data'>
					        			<div class='single'>
					        				<img :src="items.whole_thumb" alt="">
					        			</div>
					        			<p>{{items.title}}</p>
					        		</div>
					    		</div>
							</div>
						</div>
					</div>

				</div>
				<div v-else class='noReview'>
		            <img src="../../assets/img/noReview.png" alt="">
		            <p>没有相关商品</p>
		        </div>
			</div>
		</div>
		<div v-else class='noReview'>
            <img src="../../assets/img/noReview.png" alt="">
            <p>没有相关商品</p>
        </div>
		
	</div>
</template>
<script>
import {promotionGoodsList} from '../../http/api.js'
export default{
	data(){
		return{
			info:{
				storeId:'',
				promotionId:'',
				type:'combo',
				page:1,
				pageSize:30,
			},
			promotionList:[],//促销列表
			promotionListDown:[],//促销列表下载
			tabFix:false,
			total:'',//总数
		} 
	},
	methods:{
		gotoDetail(item){
			this.$router.push({path:"/good/detail",query:{goods_id:item.item_id}})
		},
		getPromotion(){ 
			promotionGoodsList(this.info).then((response)=>{
				console.log(response,'response')
				if(response.data.code=='1000'){
					if(JSON.stringify(response.data.data)=="{}"){
						this.promotionList=''
						this.promotionListDown=''
						this.total=''
					}else{
						this.promotionList=response.data.data
						this.promotionListDown=response.data.data
						if(response.data.data.list!=null){
							this.total=response.data.data.list.goods.total
						}			
					}

				}
				console.log(this.promotionList,'this.promotionList')

			})
		},
		getInfo(item){
			this.info.promotionId=item.promotionId
			this.info.type=item.type
			this.getPromotion()
		},
		promo() {
    		this.scroll = document.body.scrollTop;
    		if(this.scroll>=0.172*document.documentElement.clientWidth){
    			this.tabFix=true
    		}else{
    			this.tabFix=false
    		}
           	if(document.body.scrollTop+document.body.clientHeight>=document.body.scrollHeight){
          		if(this.total>this.info.pageSize*this.info.page){
           			this.info.page=this.info.page+1
          			promotionGoodsList(this.info).then((response)=>{
						if(response.data.code=='1000'){
							this.promotionList=response.data.data
							for(var i=0;i<this.promotionList.list.goods.data.length;i++){
								this.promotionListDown.list.goods.data.push(this.promotionList.list.goods.data[i])
							}
							this.promotionList=this.promotionListDown
						}
					})

           		}
           	}
   		},
   		combo(id){
   			this.$router.push({path:'/packdetails',query:{combo_id:id}})
   		}
    },
	created() {	
		this.info.storeId=this.$route.query.store_id
		this.getPromotion()
	},
	mounted() {
   		window.addEventListener('scroll', this.promo) 
  	},
}
</script>
<style  lang="less">
/* ----------------------------------- */
.promotion{
	.noReview{
		background:white;
		padding-top:3.333333rem;
		img{

			width:5.133333rem;
			height:2.933333rem;
			display:block;
			margin:0 auto;
		}
		p{
			font-size:0.4rem;
			height:0.4rem;
			line-height: 0.4rem;
			margin-top:0.64rem;
			color:#ccc;
			text-align: center;
		}
	}
	.promotionBox{
		padding-bottom:2rem;
		.pushBox{
			border-top:1px solid #EEEEEE;
			.pushCon{
				margin:0.32rem 0;
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
		}
		.combo{
			border-top:1px solid #EEEEEE;
			.comboBottom{
				border-bottom:0.266667rem solid #F7F7F7;
			}
			.timeBox{
				margin:0.266667rem 0.266667rem;
			}
			.comboDiv::-webkit-scrollbar{
				height:0px
			}
			.comboCon{
				margin-right:0.133333rem;

				.single{
					width:2.933333rem;
					height:2.933333rem;
					img{
						width:100%;
						height:100%;
					}
				}	
				p{
					font-size:0.293333rem;
					height:0.293333rem;
					line-height: 0.293333rem;
					margin-top:0.266667rem;
					margin-bottom:0.266667rem;
					color:#1C1B20;
				}			
			}
			.comboPriceBox{
				margin-top:0.4rem;
				overflow: hidden;
				margin-left:0.266667rem;
				.comboPrice{
					font-size:0.293333rem;
					height:0.293333rem;
					line-height: 0.293333rem;
					padding:0.066667rem;
					border:1px solid #FB0036;
					border-radius: 4px;
					color:#fb0036;
				}
				.oldPrice{
					color:#858585 ;
					margin-left:0.24rem;
				}
				b{
					font-size:0.4rem;
					color:#fb0036;
					height:0.4rem;
					line-height: 0.4rem;
					margin-top:0.02rem;
				}
				span{
					float:left;
				}
				i{
					float:left;
					color:#fb0036;
					height:0.133333rem;
					line-height: 0.133333rem;
					margin-top:0.21rem;
				}
				b{
					float:left;
				}
			}
		}
		.tabBarFixed{
			position:fixed;
			top:2.566667rem;
			width:100%;
			background:white;
			z-index:10000;
		}
		.pushBox::-webkit-scrollbar{
			height:0px
		}
		.promotionList::-webkit-scrollbar{
			height:0px
		}
		.promotionGoods{
			.time{
				background:#F7F7F7;
/* 				height:1.333333rem; */
				font-size: 0.28rem;
				color:#1C1B20;
				box-sizing: border-box;
				padding-left:0.48rem;
/* 				padding-top:0.186667rem; */
				p{
					position:relative;
				}
				p:first-child{
					margin-bottom:0.1rem;
					padding-top:0.186667rem;
				}
				p:last-child{
					padding-bottom:0.2rem;
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
					margin-bottom:0.133333rem;
					.remark{
					    padding: 0.333333rem 0.16rem 0;
				        overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						word-break: break-all;
						text-align:left;
						color:#1C1B20;
					}
					.gift{
						height:0.653333rem;
						color:#1C1B20;
						font-size:0.266667rem;
						line-height: 0.653333rem;
						span{
							color:white;
							background:#FB0036;
							box-sizing: border-box;
							display:inline-block;
							height:0.373333rem;
							width:0.64rem;
							line-height:0.373333rem;
							font-size:0.266667rem;
							margin-left:0.133333rem;
							margin-right:0.12rem;

						}
					}
					.imgBox{
						position: relative;
					    width: 100%;
					    height: 0;
					    overflow: hidden;
					    margin: 0;
					    padding-bottom: 100%;
					    background:white;
					   	img{
					   		width:100%;
					   	}
					}
					.titlePrice{
						height:1.933333rem;
						background:white;
						padding-left:0.16rem;
						padding-top:0.333333rem;
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