<template>
	<div class="store" v-if='storeInfo'>
		<div class='storeHeader'>
			<div class='backImg'><img :src='storeInfo.head.decoration_banner' alt=""></div>
			<div class='cover'></div>
			<div class="coverInfo">
				<div class='search' :class="{'searchFixed':tabFix}">
					<div class='inputBox'></div>
					<input type="text" placeholder="搜索店铺内商品">
					<div class='classify' @click='goToSort'><img src="../../assets/img/classify.png" alt=""></span><b>分类</b></div>
				</div>
				<div class="storeMes">
					<div class='storeImg'><img :src='storeInfo.head.decoration_logo' alt=""></div>
					<div class='storeName'><p>{{storeInfo.head.decoration_name}}</p><p>店铺等级</p></div>
					<div class='attention'>
						<div @click='attentionClick'>
							<img v-if='attention' src="../../assets/img/attentionRed.png" alt="">
							<img v-else src="../../assets/img/attentionWhite.png" alt="">
							<span v-if='attention' class='select'>已关注</span>
							<span v-else >关注</span>
						</div>
						<p>1999人</p>

					</div>
				</div>
			</div>
		</div>
		<tab id='tab' :class="{'tabFixed':tabFix}">
      		<tab-item selected @on-item-click="onItemClick"><p class='imgBox'><img v-if='index==0' src="../../assets/img/storeIcon.png" alt=""><img v-else src="../../assets/img/storeIconAct.png" alt=""></p><p class='text'>店铺首页</p></tab-item>
      		<tab-item @on-item-click="onItemClick"><p>567</p><p class='text'>店铺宝贝</p></tab-item>
      		<tab-item @on-item-click="onItemClick"><p>12</p><p class='text'>促销</p></tab-item>
      		<tab-item @on-item-click="onItemClick"><p>12</p><p class='text'>新品</p></tab-item>
    	</tab>
		<div class='backgroundBox'>
			
		</div> 
		<div class='components'>
			<home :data='storeInfo' v-if='index==0'></home>
			<storeGoods v-if='index==1'></storeGoods>
		 	<promotion v-if='index==2'></promotion>
			<newGoods v-if='index==3'></newGoods>
		</div>
		<div class='footerBottom'>
			<!-- <div class='footerLeft'>
				<div>
					<img src="../../assets/img/sort.png" alt="">
				</div>
				<p>宝贝分类</p>
			</div>
			<div class='footerCenter'>
				店铺简介
			</div>
			<div class='footerRight'>
				<div>
					<img src="../../assets/img/xiaoxi.png" alt="">
				</div>
				<p>客服</p>
			</div> -->
			<foot  @refreshList="goToSort"></foot>
		</div>
	</div>	
	<div class="store storeNoInfo"   v-else>
		<p>没有商品id</p>
	</div>
</template>
<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
import {storeIndex,addMark,delMark} from '../../http/api.js'
import newGoods from './newGoods';
import promotion from './promotion';
import storeGoods from './storeGoods';
import home from './home';
import foot from './foot';
export default{
	name: 'carrousel',
	components: {
        'newGoods':newGoods,
        'promotion':promotion,
        'storeGoods':storeGoods,
        'home':home,
        'foot':foot,
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
        	scroll: '',//距离顶部的距离
        	tabFix:false,


		}
	},
	methods:{
		menu() {
    		this.scroll = document.body.scrollTop;
    		console.log(this.scroll)
    		if(this.scroll>=0.172*document.documentElement.clientWidth){
    				console.log(this.scroll,'qweqw')
    				console.log(0.172*document.documentElement.clientWidth,'1231323')
    				this.tabFix=true
    		}else{
    			this.tabFix=false
    		}
   		},
		getStoreInfo(){
			storeIndex({storeId:this.storeId}).then((response)=>{
				if(response.data.code==1000){
					console.log(response)
					this.storeInfo=response.data.data
					this.domain = response.data.data.baseUrl
					this.attention=response.data.data.head.is_mark
					console.log(this.attention)
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
    	//点击关注
    	attentionClick(){
    		
    		if(this.attention){
    			delMark({storeId:this.storeId}).then((response)=>{
    				console.log(response)
    				if(response.data.code=1000){
						this.attention=!this.attention
    				}
				})	
    		}else{
    			addMark({storeId:this.storeId}).then((response)=>{
    				console.log(response)
    				if(response.data.code=1000){
						this.attention=!this.attention
    				}
				})

    		}
    	},
    	//点击分类
    	goToSort(){
    		this.$router.push({path:"/sort",query:{storeId:this.storeId}})
    	}

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
	},
	mounted() {
   		window.addEventListener('scroll', this.menu)
  	},
}
</script>
<style  lang="less">
/* -----------------头部------------------- */
#app{
	height:100%;
}
html,body{
	height:100%;
}
.storeNoInfo{
	position:relative;
	height:100%;
	p{
		text-align: center;
		width:100%;
		height:0.5rem;
		line-height:0.5rem; 
		font-size:0.366667rem;
		position:absolute;
		top:50%;
		margin-top:-0.25rem;

	}
}
.store{
	.footerBottom{
		position:fixed;
		bottom:0;
		display:flex;
		height:1.333333rem;
		box-sizing: border-box;
		padding:0.48rem 0;
		width:100%;
		background:white;
		border-top:1px solid #EEEEEE;
		z-index:10000;
	}
	.storeHeader{
		height:3rem;
		position:relative;
		.backImg{
			img{
				height:3rem;
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
			height:1.08rem;
			position:fixed;
			/* top:0.14rem; */
			box-sizing: border-box;
			z-index:10000;
			width:100%;
			
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
		.searchFixed{
			background:red;
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
	.tabFixed{
		position:fixed;
		top:1.1rem;
		width:100%;
		background:white;
		z-index:10000;
	}
	.vux-tab-ink-bar{
		background-color:#fb0036!important;
	}
}



</style>