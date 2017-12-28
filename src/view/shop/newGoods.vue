<template>
	<div class="newGoods">
		<div class='news'  v-for="(item,index) in newSGoodsList" v-if='newSGoodsList.length!=0'>
			<p><span>{{item.day}}</span></p>
			<ul>
				<li v-for="itemLi in item.data" @click='gotoDetail(itemLi)'>
					<div class='imgBox'>
						<img :src="itemLi.whole_thumb" alt="">
					</div>
					<div class='titlePrice'>
						<p>{{itemLi.title}}</p>
						<div class='price'><span>￥</span><b>{{itemLi.price}}</b><i>￥{{itemLi.market_price}}</i></div>
					</div>
				</li>
			</ul>
		</div>
		<div v-else class='noReview'>
            <img src="../../assets/img/noReview.png" alt="">
            <p>没有相关商品</p>
        </div>
	</div>
</template>
<script>
import {newGoodsList} from '../../http/api.js'
export default {
	data(){
		return {
			newSGoodsList:[],//新品列表

		}
	},
	created() {
		this.getNewGoodsList()

	},
	methods:{
		getNewGoodsList(){
			newGoodsList({storeId:this.$route.query.store_id}).then((response)=>{
				if(response.data.code==1000){
					this.newSGoodsList=response.data.data.data
				}
			})
		},
		gotoDetail(item){
			this.$router.push({path:"/good/detail",query:{goods_id:item.item_id}})
		}
	}
}
</script>
<style lang="less">
.newGoods{
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
	.news{
		background:#F7F7F7;
		overflow: hidden;
		border-top:1px solid #EEEEEE;
		p{
			text-align: center;
			height:1.066667rem;
			line-height:1.066667rem; 

		}
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
					font-size:0.306667rem;
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
					padding:0.133333rem 0 0.133333rem 0.16rem;
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
	.news:last-child{
		padding-bottom:2rem;
	}
}


</style>