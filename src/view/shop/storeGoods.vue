<template>
	<div class="storeGoods">
		<ul class='fourFlex' :class="{'tabBarFixed':tabFix}">
			<li @click='goodsFour("default")' v-bind:class="{ active: goodsInfo.sort=='default' }"><span>综合</span></li>
			<li @click='goodsFour("sales")' v-bind:class="{ active: goodsInfo.sort=='sales' }"><span>销量</span></li>
			<li @click='goodsFour("new")' v-bind:class="{ active: goodsInfo.sort=='new' }"><span>上新</span></li>
			<li @click='goodsFour("priceDown")' v-if='fourthData=="defaultStatus"' ><i>价格</i><img src="../../assets/img/default.png" alt=""></li>
			<li @click='goodsFour("priceUp")' class='active' v-if='goodsInfo.sort=="priceUp"' ><i>价格</i><img src="../../assets/img/priceup.png" alt=""></li>
			<li @click='goodsFour("priceDown")' class='active' v-if='goodsInfo.sort=="priceDown"' ><i>价格</i><img src="../../assets/img/pricedown.png" alt=""></li>

		</ul>
		<div v-if='newSGoodsList.length==0' class='noReview'>
            <img src="../../assets/img/noReview.png" alt="">
            <p>没有相关商品</p>
        </div>
		<div v-else class='storeGoodsList'>
			<div class='news'>
				<ul>
					<li v-for='item in newSGoodsList'> 
						<div class='imgBox'>
							<img :src="item.whole_thumb" alt="">
						</div>
						<div class='titlePrice'>
							<p>{{item.title}}</p>
							<div class='price'><span>￥</span><b>{{item.price}}</b><i>￥{{item.market_price}}</i></div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import {goodsList} from '../../http/api.js'
export default {
	data(){
		return {
			newSGoodsList:[],//新品列表
			newSGoodsListDown:[],//新品列表已下载
			fourthData:'defaultStatus',
			goodsInfo:{
				storeId:'',//店铺id
				page:1,//页数
				sort:'default',//排序
				pageSize:30,//每页条数
			},
			tabFix:false,
			total:'',//总数


		}
	},
	created() {
		this.getGoodsList()
	},
	methods:{
		goodsFour(index){
			this.goodsInfo.sort=index
			if(index=='priceDown'){
				this.goodsInfo.sort='priceUp'
				this.fourthData=''
			}else if(index=='priceUp'){
				this.goodsInfo.sort='priceDown'
				this.fourthData=''
			}else{
				this.goodsInfo.sort=index
				this.fourthData='defaultStatus'
			}
			this.goodsInfo.page=1
			this.getGoodsList()
		},
		getGoodsList(){
			this.goodsInfo.storeId=this.$route.query.store_id
			goodsList(this.goodsInfo).then((response)=>{
				if(response.data.code==1000){
					this.newSGoodsList=response.data.data.data
					this.newSGoodsListDown=this.newSGoodsList
					this.total=response.data.data.total
				}
			})
		},
		menu() {
    		this.scroll = document.body.scrollTop;
    		if(this.scroll>=0.172*document.documentElement.clientWidth){
    			this.tabFix=true
    		}else{
    			this.tabFix=false
    		}
           	if(document.body.scrollTop+document.body.clientHeight>=document.body.scrollHeight){
           		if(this.total>this.goodsInfo.pageSize*this.goodsInfo.page){
           			this.goodsInfo.page=this.goodsInfo.page+1
           			goodsList(this.goodsInfo).then((response)=>{
						if(response.data.code==1000){
							this.newSGoodsList=response.data.data.data
							for(var i=0;i<this.newSGoodsList.length;i++){
								this.newSGoodsListDown.push(this.newSGoodsList[i])
							}
							this.newSGoodsList=this.newSGoodsListDown
							
						}
					})
           		}
           	}
   		},
	},
	mounted() {
   		window.addEventListener('scroll', this.menu) 
  	},
}
</script>
<style lang="less">

.storeGoods{
	overflow-y: scroll;
	.noReview{
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
	.fourFlex{
		display:-webkit-flex;
		display:flex;
		border-top:1px solid #EEEEEE;
		li{
			-webkit-flex: 1;
			flex:1;
			height:1.173333rem;
			line-height:1.173333rem;
			text-align: center;
			background:white;
			color:#1C1B20;
			font-size: 0.373333rem;
			i{
				display:inline-block;
				height:100%;
				float:left;
				margin-left:0.8rem;
			}
			img{
				width:0.173333rem;
				height:0.253333rem;
				float:left;
				margin-top:0.47rem;
				margin-left:0.1rem;
			}

		}
		.active{
			color:#fb0036;
		}

	}
	.tabBarFixed{
		position:fixed;
		top:2.566667rem;
		width:100%;
		background:white;
		z-index:10000;
	}
	.storeGoodsList{
		padding-bottom:2rem;
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
					    background:white;
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
						padding:0.133333rem 0  0.133333rem  0.16rem;
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