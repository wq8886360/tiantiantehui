<template>
	<div class="newGoods">
		<div class='news'  v-for="(item,index) in newSGoodsList">
			<p><span>{{item.day}}</span></p>
			<ul>
				<li v-for="itemLi in item.data">
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
				console.log(response,'getNewGoodsList')
				if(response.data.code==1000){
					this.newSGoodsList=response.data.data.data
					console.log(this.newSGoodsList)
				}
			})
		}
	}
}
</script>
<style lang="less">
.newGoods{
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


</style>