<template>
	<div class="sortGoods">
		<div class='search'>
			<div class='inputBox'></div>
			<input type="text" placeholder="搜索店铺内商品" v-model='inputText' >
			<div class='classify' @click='goToSort'><img src="../../assets/img/sortIcon.png" alt=""></span><b>分类</b></div>
		</div>
		<ul class='fourFlex'>
			<li @click='goodsFour("default")' v-bind:class="{ active: goodsInfo.sort=='default' }"><span>综合</span></li>
			<li @click='goodsFour("sales")' v-bind:class="{ active: goodsInfo.sort=='sales' }"><span>销量</span></li>
			<li @click='goodsFour("new")' v-bind:class="{ active: goodsInfo.sort=='new' }"><span>上新</span></li>
			<li @click='goodsFour("priceDown")' v-if='fourthData=="defaultStatus"' ><i>价格</i><img src="../../assets/img/default.png" alt=""></li>
			<li @click='goodsFour("priceUp")' class='active' v-if='goodsInfo.sort=="priceUp"' ><i>价格</i><img src="../../assets/img/priceup.png" alt=""></li>
			<li @click='goodsFour("priceDown")' class='active' v-if='goodsInfo.sort=="priceDown"' ><i>价格</i><img src="../../assets/img/pricedown.png" alt=""></li>
		
		</ul>
		<div class='storeGoodsList'>
			<div class='news'>
				<ul>
					<li> 
						<div class='imgBox'>
							<img src="../../assets/img/sort.png" alt="">
						</div>
						<div class='titlePrice'>
							<p>你好你好</p>
							<div class='price'><span>￥</span><b>12</b><i>￥54</i></div>
						</div>
					</li>
					<li> 
						<div class='imgBox'>
							<img src="../../assets/img/sort.png" alt="">
						</div>
						<div class='titlePrice'>
							<p>你好你好</p>
							<div class='price'><span>￥</span><b>12</b><i>￥54</i></div>
						</div>
					</li>
					<li> 
						<div class='imgBox'>
							<img src="../../assets/img/sort.png" alt="">
						</div>
						<div class='titlePrice'>
							<p>你好你好</p>
							<div class='price'><span>￥</span><b>12</b><i>￥54</i></div>
						</div>
					</li>
					<li> 
						<div class='imgBox'>
							<img src="../../assets/img/sort.png" alt="">
						</div>
						<div class='titlePrice'>
							<p>你好你好</p>
							<div class='price'><span>￥</span><b>12</b><i>￥54</i></div>
						</div>
					</li>
					<li> 
						<div class='imgBox'>
							<img src="../../assets/img/sort.png" alt="">
						</div>
						<div class='titlePrice'>
							<p>你好你好</p>
							<div class='price'><span>￥</span><b>12</b><i>￥54</i></div>
						</div>
					</li>
					<li> 
						<div class='imgBox'>
							<img src="../../assets/img/sort.png" alt="">
						</div>
						<div class='titlePrice'>
							<p>你好你好</p>
							<div class='price'><span>￥</span><b>12</b><i>￥54</i></div>
						</div>
					</li>
					<li> 
						<div class='imgBox'>
							<img src="../../assets/img/sort.png" alt="">
						</div>
						<div class='titlePrice'>
							<p>你好你好</p>
							<div class='price'><span>￥</span><b>12</b><i>￥54</i></div>
						</div>
					</li>
					<li> 
						<div class='imgBox'>
							<img src="../../assets/img/sort.png" alt="">
						</div>
						<div class='titlePrice'>
							<p>你好你好</p>
							<div class='price'><span>￥</span><b>12</b><i>￥54</i></div>
						</div>
					</li>
					<li> 
						<div class='imgBox'>
							<img src="../../assets/img/sort.png" alt="">
						</div>
						<div class='titlePrice'>
							<p>你好你好</p>
							<div class='price'><span>￥</span><b>12</b><i>￥54</i></div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import {goodsList} from '../../http/api.js'
export default{
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
			inputText:'',//输入框内容

		}
	},
	methods:{
		//点击分类
    	goToSort(){
    		this.$router.push({path:"/sort",query:{storeId:this.$route.query.storeId}})
    	},
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
					console.log(response,'reeeeee')
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
	created() {
		this.getGoodsList()
		console.log(this.$route.query.searchText)
		this.inputText=this.$route.query.searchText
	},
	mounted() {
   		window.addEventListener('scroll', this.menu) 
  	},
}
</script>
<style lang='less'>
.sortGoods{
	overflow:hidden;
	.search{
		height:1.08rem;
		position:fixed;
		top:0;
		box-sizing: border-box;
		z-index:10000;
		width:100%;
		overflow: hidden;
		background:white;
		.inputBox{
			width:8.2rem;
			height:0.906667rem;
			margin-left:0.266667rem;
			border:0.013333rem solid #F4F4F1;
			border-radius: 0.106667rem;
			background:#BBBBBB;
			opacity: 0.5;
		}
		input{
			width:8.2rem;
			height:0.906667rem;
			border:none;
			background:#EDEDED;
			border-radius: 0.106667rem;
			position:absolute;
			left:0.266667rem;
			top:0;
			color:black;
			font-size:0.36rem;
			box-sizing: border-box;
			padding:0 0.133333rem;
		}
		input::-webkit-input-placeholder{
			color:white;
		}
		.inputBox{
			float:left;
		}
		.classify{
			float:right;
			margin-top:0.056667rem;
			margin-left:0.306667rem;
			width:0.64rem;
			text-align: center;
			margin-right:0.266667rem;

			b{
				color:#858585 ;
				font-size:0.266667rem;
				width:100%;
				display:inline-block;
			}
			img{
				width:0.506667rem;
				height:0.466667rem;
			}
		}
	}

	.fourFlex{
		position:fixed;
		top:1.08rem;
		width:100%;
		display:-webkit-flex;
		display:flex;
		z-index:100;
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

	.storeGoodsList{
		margin-top:2.253333rem;
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