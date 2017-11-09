<template>
	<div class="store">
		<div class='storeHeader'>
			<div class='backImg'><img :src='storeInfo.head.decoration_banner' alt=""></div>
			<div class='cover'></div>
			<div class="coverInfo">
				<div class='search'>
					<div class='inputBox'></div>
					<input type="text">
					<div class='classify'><img src="../../assets/img/classify.png" alt=""></span><b>分类</b></div>
					
				</div>
				<div class="storeMes">
					<div class='storeImg'><img :src='storeInfo.head.decoration_logo' alt=""></div>
					<div class='storeName'><p>{{storeInfo.head.decoration_name}}</p><p>店铺等级</p></div>
					<div class='attention'>
						<div>
							<img v-if='attention' src="../../assets/img/attentionRed.png" alt="">
							<img v-else src="../../assets/img/attentionWhite.png" alt="">
							<span :class="{ 'select': attention}">关注</span>
						</div>
						<p>1999人</p>

					</div>
				</div>
			</div>
		</div>
		<tab>
      		<tab-item selected @on-item-click="onItemClick"><p class='imgBox'><img v-if='index==0' src="../../assets/img/storeIcon.png" alt=""><img v-else src="../../assets/img/storeIconAct.png" alt=""></p><p class='text'>店铺首页</p></tab-item>
      		<tab-item @on-item-click="onItemClick"><p>567</p><p class='text'>店铺宝贝</p></tab-item>
      		<tab-item @on-item-click="onItemClick"><p>12</p><p class='text'>促销</p></tab-item>
      		<tab-item @on-item-click="onItemClick"><p>12</p><p class='text'>新品</p></tab-item>
    	</tab>
		<div class='backgroundBox'>E
			
		</div> 
		<div class='components'>
			<home :data='storeInfo' v-if='index==0'></home>
			<storeGoods v-if='index==1'></storeGoods>
		 	<promotion v-if='index==2'></promotion>
			<newGoods v-if='index==3'></newGoods>
		</div>
		<div class='footer'>
		</div>
		
	</div>	
</template>
<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
import {storeIndex} from '../../http/api.js'
import newGoods from './newGoods';
import promotion from './promotion';
import storeGoods from './storeGoods';
import home from './home';
export default{
	name: 'carrousel',
	components: {
        'newGoods':newGoods,
        'promotion':promotion,
        'storeGoods':storeGoods,
        'home':home,
        Tab,
    	TabItem,
    	Sticky,
    	Divider,
    	XButton,
    	Swiper,
    	SwiperItem
    },
	data(){
		return {
			checkAllFlag:true,
        	domain: '', //域名地址
        	storeInfo:'',//店铺的信息
        	storeId:'',//店铺的id
        	index: 0,//tab切换的索引值
        	attention:false,//点击关注

		}
	},
	methods:{
		getStoreInfo(){
			storeIndex({storeId:this.storeId}).then((response)=>{
				if(response.data.code==1000){
					console.log(response)
					this.storeInfo=response.data.data
					this.domain = response.data.data.baseUrl
					console.log(this.domain,'this.domain')
				}else{
					alert(response.data.message)
				}
			})
    	},
    	onItemClick (index) {
      		console.log('on item click:', index)
      		this.index=index
    	},
	},
	created() {
		if(location.href.split('?').length<=1){
		}else{
			if(location.href.split('?')[1].split('=').length<=1){
			}else{
				this.storeId=location.href.split('?')[1].split('=')[1]
				console.log(this.storeId)
				this.getStoreInfo()
			}
			
		}
	}
}
</script>
<style  lang="less">


/* -----------------头部------------------- */
.store{
	.storeHeader{
		height:2.8rem;
		position:relative;
		.backImg{
			img{
				height:2.8rem;
				width:100%;
			}
		}
		.cover{
			width:100%;
			height:100%;
			position:absolute;
			left:0;
			top:0;
			background:#000000;
		 	opacity:0.55
		}
		.coverInfo{
			width:100%;
			height:100%;
			position:absolute;
			left:0;
			top:0;
		}
		.search{
			height:0.933333rem;
			position:relative;
			margin-top:0.133333rem;
			
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
				background:none;
				border-radius: 0.106667rem;
				position:absolute;
				left:0.266667rem;
				top:0;
				color:white;
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
					color:white;
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
	}
	.storeMes{
		position:absolute;
		left:0;
		bottom:0;
		overflow: hidden;
		height:1.333333rem;
		width:100%;
		color:white;
		.storeImg{
			width:1.066667rem;
			height:1.066667rem;
			float:left;
			margin-left:0.266667rem;
			img{
				width:100%;
				height:100%;
			}
		}
		.storeName{
			height:1.066667rem;
			float:left;
			width:6.5rem;
			margin-left:0.293333rem;
			box-sizing: border-box;
			font-size:0.293333rem;
			p:first-child{
				font-size:0.373333rem
			}
		}
		.attention{
			float:right;
			
			
			div{
				width:1.6rem;
				height:0.626667rem;
				position:relative;
				img{
					width:100%;
					height:100%;
				}
				span{
					position:absolute;
					line-height:0.626667rem;
					top:0;
					color:black;
					left:0.6rem;
					font-size:0.32rem;
					display:inline-block;
					height:0.626667rem;
					color:white;

				}
				.select{
					color:#FB0036;
				}
			}

			p{
				text-align: center;
				font-size:0.293333rem;
				padding-top:0.1rem;
			}
		}
	}
	.vux-tab{
		height:1.466667rem;
		background:red!important;
		.vux-tab-item.vux-tab-selected{
			color:  #fb0036!important;

		}
		.vux-tab-item{
			height:1.466667rem;
			background:white!important;
			img{
				width:0.56rem;
				height:0.506667rem;
			}
			p{
				height:0.32rem;
				font-size:0.32rem;
				line-height:0.32rem;
				margin-top:0.32rem;
			}
			.text{
				margin-top:0.226667rem;
			}
			.imgBox{
				margin-top:0.146667rem;
				height:0.506667rem;

			}


		}
	}
	.vux-tab-ink-bar{
		background-color:#fb0036!important;
	}
}




/* ----------------切换条-------------------
	.store .backgroundBox{
		background:#f7f7f7;
	}
	.store .storeTab{
		overflow:hidden;
	}

	.store .storeTab li{
		width:25%;
		height:1.466667rem;
		float:left;
		box-sizing: border-box;
		padding-top:0.16rem;
		font-size:0.32rem;
		box-sizing: border-box;
border-bottom:0.053333rem solid #fb0036;
	}
	.store .storeTab .tabActive{
		color:red;
		border-bottom:0.053333rem solid #fb0036;
	}
	.store .storeTab li span{
		display:block;
		width:1.333333rem;
		height:0.506667rem;
		margin:0 auto;
		text-align: center;
		font-size:0.4rem;

	}
	.store .storeTab li p{
		text-align: center;
		height:0.666667rem;
		line-height:0.666667rem; 
	}
	.store .storeTab li:first-child img{
		width:0.56rem;
		height:0.506667rem;
	} */
	
</style>