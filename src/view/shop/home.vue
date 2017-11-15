<template>
	<div class="storeHome">
<!-- 		<div class='CouponsBox'>
	<ul class='CouponsList'>
 				<li>:class="{'active':checkAllFlag}"
			<img v-if='isLq' class='ImgBox' src="../../assets/img/discountCoupon.png" alt="">
			<img v-else class='ImgBox' src="../../assets/img/discount.png" alt="">
			<div class='CouponsLeft'><span>￥</span><b>190</b></div>
			<div class='CouponsRight'><p>优惠券</p><p>满2900元可用</p></div>
		</li>
		<li> 
			<img class='ImgBox' src="../../assets/img/discount.png" alt="">
			<div class='CouponsLeft'><span>￥</span><b>190</b></div>
			<div class='CouponsRight'><p>优惠券</p><p>满2900元可用</p></div>
		</li>
		<li>
			<img class='ImgBox' src="../../assets/img/discountCoupon.png" alt="">
			<div class='CouponsLeft'><span>￥</span><b>190</b></div>
			<div class='CouponsRight'><p>优惠券</p><p>满2900元可用</p></div>
		</li>

	</ul>
</div> -->
		<div style="width:100%;overflow:auto; margin:0.333333rem 0;" class='disConut'> 
    		<div style="width:100040px;color:white">       
        		<div class='disCountBox' style="float:left;">
        			<img class='ImgBox' src="../../assets/img/discountCoupon.png" alt="">
					<div class='CouponsLeft'><span>￥</span><b>190</b></div>
					<div class='CouponsRight'><p>优惠券</p><p>满2900元可用</p></div>
        		</div>
        		<div class='disCountBox' style="float:left;">
        			<img class='ImgBox' src="../../assets/img/discountCoupon.png" alt="">
					<div class='CouponsLeft'><span>￥</span><b>190</b></div>
					<div class='CouponsRight'><p>优惠券</p><p>满2900元可用</p></div>
        		</div>   
    		</div>
		</div>

		 <div  v-for="(item,index) in storeInfo.body"> 
				<!-- 双排 -->
				<div class="Doublerowlayout" v-if="item.block_module_type == 1">
					<h1 v-if="item['title']">{{item.title}}</h1>
					<h1 v-else>双列排版</h1>
					<div class="box_list" v-if="item.data"  v-for="(items,index) in item.data" :key="index">
						<div class="img">
							<img :src="domain+items.thumb" alt="">
						</div>
						<div class='goodsInfo'>
							<p class="title">{{items.title}}</p>
							<div class="sale">
								<p class="price"><span>¥</span><b>{{items.price}}</b></p>
								<p class="SalesVolume">已售：12899</p>
							</div>
						</div>
					</div>
				</div> 
				<!-- 单排 -->
				<div class="Singlelayout" v-if="item.block_module_type == 2">
					<h1 v-if="item['title']">{{item.title}}</h1>
					<h1 v-else>单列排版</h1>
					<div v-if="item.data" class="list" v-for="(items,index) in item.data" :key="index">
						<div class="sl">
							<img :src="domain+items.thumb" alt="">
						</div>
						<div class="sr">
							<p class="title">{{items.title}}</p>
							 <p class="Sales">已售：12899</p>
							<div class="bottom">
								<p class="price"><span>¥</span><b>{{items.price}}</b></p>
								<img src="../../assets/img/shopCar.png" alt="">
							</div>
						</div>
					</div>
				</div> 
				<!-- 标题 -->
				<div class="Title" v-if="item.block_module_type == 3">
					{{item.title}}
				</div> 
				<!-- 文本 -->
				<div class="Text" v-if="item.block_module_type == 4">
					{{item.textare}}
				</div> 
				<!-- 单列图片 -->
				<div class="Singlepicture" v-if="item.block_module_type == 5">
					<div class="img">
						<img v-if="!item.data[0].thumb" src="http://v20-wx.shunliandongli.com/joinin/20170824/20170824140723361h.jpg" alt="">
						<img v-else :src="domain+item.data[0].thumb" alt="">
					</div>
					<div v-if="item.data[0].description" class="title">
						{{item.data[0].description}}
					</div>
				</div> 
				<!-- 双列图片 -->
				<div class="Doublepicture"  v-if="item.block_module_type == 6">
					<div class="double left">
						<div class="img">
							<img v-if="!item.data[0].thumb" src="http://v20-wx.shunliandongli.com/joinin/20170824/20170824140723361h.jpg" alt="">
							<img v-else :src="domain+item.data[0].thumb" alt="">
						</div>
						<div v-if="item.data[0].description" class="title">
							{{item.data[0].description}}
						</div>
					</div>
					<div class="double right">
						<div class="img">
							<img v-if="!item.data[1].thumb" src="http://v20-wx.shunliandongli.com/joinin/20170824/20170824140723361h.jpg" alt="">
							<img v-else :src="domain+item.data[1].thumb" alt="">
						</div>
						<div v-if="item.data[1].description" class="title">
							{{item.data[1].description}}
						</div>
					</div>
				</div>
			
				<!-- 三列图片 -->
		 		<div class="Threepicture" v-if="item.block_module_type == 8">
					<div class="three left">
						<div class="img">
							<img v-if="!item.data[0].thumb" src="http://v20-wx.shunliandongli.com/joinin/20170824/20170824140723361h.jpg" alt="">
							<img v-else :src="domain+item.data[0].thumb" alt="">
						</div>
						<div v-if="item.data[0].description" class="title">
							{{item.data[0].description}}
						</div>
					</div>
					<div class="three center">
						<div class="img">
							<img v-if="!item.data[1].thumb" src="http://v20-wx.shunliandongli.com/joinin/20170824/20170824140723361h.jpg" alt="">
							<img v-else :src="domain+item.data[1].thumb" alt="">
						</div>
						<div class="title">
							{{item.data[1].description}}
						</div>
					</div>
					<div class="three right">
						<div class="img">
							<img v-if="!item.data[2].thumb" src="http://v20-wx.shunliandongli.com/joinin/20170824/20170824140723361h.jpg" alt="">
							<img v-else :src="domain+item.data[2].thumb" alt="">
						</div>
						<div class="title">
							{{item.data[2].description}}
						</div>
					</div>
				</div> 
				<!-- 轮播图 -->
				<div class='banner' v-if="item.block_module_type == 7">
					<swiper :options="swiperOption" ref="mySwiper">
					    <swiper-slide v-for="(items,index) in item.data" :key="index">
					    		<img :src="domain+items.thumb" alt="">
					    		<div class='textBox'></div>
					    		<p>{{items.description}}</p>
					    		<!-- <div class='curcleNum'>	
					    			<span>1</span>
					    			<b>/</b>
					    			<i>3</i>
					    		</div> -->
					    </swiper-slide>
					</swiper>
				</div>
			</div> 

	</div>
</template>
<script>
import {storeIndex,checkCode } from '../../http/api.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css';
export default{
	props: ['data'],
	components: {
	    swiper,
	    swiperSlide
	},
	data(){
		return{
			swiperOption: {
	          	notNextTick: true,
	          	autoplay: 4000,
	          	direction : 'horizontal',
	          	grabCursor : true,
	          	setWrapperSize :true,
	          	autoHeight: true,
	          	paginationClickable :true,
	          	autoplayDisableOnInteraction : false,//鼠标划过还能自动滚动
	          	mousewheelControl : true,//能让鼠标滑轮滚动
	          	debugger: false,
	          	
        	},
			storeInfo:'',//商品信息
			domain: '', //域名地址
			isLq:false,//是否已领取
		} 
	},
	methods:{
		onItemClick (index) {
      		console.log('on item click:', index)
    	},
    },

	created() {	
		this.storeInfo=this.data
		console.log(this.storeInfo,'1231231')
		this.domain =this.storeInfo.baseUrl
		console.log(this.domain,'12312312')
	},
	mounted() {
   		/*console.log(document.getElementById("li").offsetWidth)*/
  	},
}
</script>
<style>

/* ---------------底部----------------------- */

.store .components{
	margin-bottom:1.333333rem;
}
/* .store .footer{
	position:fixed;
	bottom:0;
	height:1.333333rem;
	box-sizing: border-box;
	padding:0.48rem 0;
	width:100%;
	background:white;
} */

/* -----------轮播图------------------ */
#app{height:100%;}
html,body{
	height:100%;
}
.storeNoInfo{
	position:relative;
	height:100%;
}
.storeNoInfo p{
	text-align: center;
	width:100%;
	height:0.5rem;
	line-height:0.5rem; 
	font-size:0.366667rem;
	position:absolute;
	top:50%;
	margin-top:-0.25rem;

}
.banner{
	width:100%;
	padding:0.066667rem 0;
	border-bottom:0.266667rem solid #f7f7f7;
}
.banner .swiper-slide{
	position:relative;
	width:100%;
}
.banner .swiper-slide img{
	width:100%;
	height:4.8rem;
	float:left;
}
.banner .swiper-slide .textBox{
	position:absolute;
	bottom:0;
	width:100%;
	height:0.666667rem;
	opacity: 0.5;
	background:#000000;
}
.banner .swiper-slide p{
	position:absolute;
	bottom:0;
	width:100%;
	height:0.666667rem;
	font-size:0.293333rem;
	line-height: 0.666667rem;
	color:white;
	text-align: center;
}
.banner .curcleNum{
	width:0.666667rem;
	height:0.666667rem;
	position:absolute;
	top:0.133333rem;
	right:0.133333rem;
	color:white;
	background:rgba(0,0,0,0.2);
	line-height:0.666667rem;
	font-size:0.293333rem; 
	border-radius: 50%;
	box-sizing: border-box;
	padding:0.026667rem;
}
.banner .curcleNum span{
	float:left;
	display:inline-block;
	position:absolute;
	left:0;

}
.banner .curcleNum b{
	float:left;
	position:absolute;
	left:0.21rem;
	height:100%;
}
.banner .curcleNum i{
	float:left;
	font-size:10p;
	position:absolute;
	left:0.4rem;
}
/* -------- 三列图片------------- */
	.Threepicture{
	  	padding-top: 4px;
        overflow: hidden;
        border-bottom:0.266667rem solid #f7f7f7;
	}
	.Threepicture .three{
		width: 3.24rem;
        float: left;
        margin-right: 4px;
	}
	.Threepicture .three .img{
 		width:100%;
        height: 5.173333rem;
        overflow: hidden;	
	}
	.Threepicture .three .img img{
		width: 100%;
		height:100%;
	}
	.Threepicture .three .title{
		padding:0.373333rem  0.133333rem 0.626667rem 0.133333rem;
        color: #1C1B20;
        font-size:0.32rem;
        line-height: 0.48rem;
	}
	.Threepicture .right{
	 	margin-right: 0;
	}


/* -----------双列图片-------------- */
	.Doublepicture{
		padding-top:0.133333rem;
		border-bottom:0.266667rem solid #f7f7f7;
		overflow: hidden;
	}
    .Doublepicture .double {
        float: left;
        position: relative;
        float: left;
	    width: 50%;
	    box-sizing: border-box;
    }
     .Doublepicture .double .img{
     	width:100%;
	    height: 0;
	    overflow: hidden;
	    margin: 0;
	    padding-bottom: 100%;
     }
    .Doublepicture .double .img img{
    	width:100%;
    }
    .Doublepicture .double:nth-child(odd) {
        padding-right: 0.066667rem;
    }
    .Doublepicture .double:nth-child(even) {
        padding-left: 0.066667rem;
    }
    .Doublepicture .double .title{
    	padding:0.4rem 0.133333rem 0.666667rem 0.133333rem;
    	font-size:0.32rem;
        line-height: 0.48rem;
    }
/* -----------单列图片-------------- */
	.Singlepicture{
		border-bottom:0.266667rem solid #f7f7f7;
	}
	.Singlepicture .img{
		padding-top: 0.133333rem;
        width:100%;
        height:4.8rem;
        overflow: hidden;
	}
	.Singlepicture .img img {
      	width: 100%;
    }
 	.Singlepicture .title{
 		padding:0.4rem 0.293333rem 0.666667rem;
        color: #ababac;
        font-size:0.32rem;
        line-height: 0.48rem;
 	}
 /*-------------- 文本-------------- */
    .store .Text {
	  	padding: 18px 8px;
	  	color: #ababac;
	  	font-size:0.32rem;
	  	border-bottom:0.266667rem solid #f7f7f7;
	  	line-height:0.48rem;

    }
/* --------------标题------------ */
    .store .Title {
      	height:1.466667rem;
      	line-height:1.466667rem;
      	text-align: center;
      	font-size:0.4rem;
      	border-bottom:0.266667rem solid #f7f7f7;
      	font-weight:700;
    }
/* -----------单排--------------- */
	.store h1{
		height:1.546667rem;
		line-height: 1.546667rem;
		font-size:0.4rem;
		box-sizing: border-box;
		padding-left:0.266667rem;
	}
        .Singlelayout {
          border-bottom:0.266667rem solid #f7f7f7;
        }
        .Singlelayout  .list{
        	height:3.466667rem;
            margin-bottom:0.666667rem;
            display:flex; 
        }
        .Singlelayout  .list .sl{
        	float: left;
              height:3.466667rem;
              width:3.466667rem;
              overflow: hidden;
        }
        .Singlelayout  .list .sl img{
        	width: 100%;
        	height:100%;
        }
        .Singlelayout .bottom img{
         	 float: right;
            width: 0.493333rem;
            height: 0.426667rem;
        }
        .Singlelayout .bottom .price {
          float: left;
          color: #fb0036;
        }
        .Singlelayout .bottom .price span{
			font-size:0.15rem;
        }
        .Singlelayout .bottom .price b{
        	font-size:0.32rem;
        	font-weight:bold;
        }
        .Singlelayout .bottom {
            position: absolute;
            bottom: 0.08rem;
            overflow: hidden;
            width:100%; 
            box-sizing: border-box;
            padding: 0 0.533333rem 0 0.4rem;

        }
        .Singlelayout .sr .Sales {    
            color: #c5c5c5;
            position:absolute;
            top:1.12rem;
            padding-left:0.4rem;
            font-size:0.293333rem;
        }
        .Singlelayout .sr .title{
			padding: 0 0.533333rem 0 0.4rem;
			height:0.8rem;
	        overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			word-break: break-all;
			font-size:0.32rem;
			line-height:0.4rem;
        }
        .Singlelayout  .sr {
            float: left;
            position: relative;
            display:flex;
            height:100%;
            flex:1;
        }
/* --------------双排-------- */
    .Doublerowlayout {
      overflow: hidden;
      border-bottom:0.266667rem solid #f7f7f7;
    }
    .Doublerowlayout .box_list {
        float: left;
        position: relative;
        float: left;
	    width: 50%;
	    box-sizing: border-box;
    }
    .Doublerowlayout .box_list:nth-child(even) {
        padding-right: 0.066667rem;
    }
    .Doublerowlayout .box_list:nth-child(odd) {
        padding-left: 0.066667rem;
    }
   	.Doublerowlayout .img {
        width:100%;
	    height: 0;
	    overflow: hidden;
	    margin: 0;
	    padding-bottom: 100%;
	    box-sizing: border-box;
    } 
    .Doublerowlayout .img img {
        width: 100%;
    }
    .Doublerowlayout .title {
        padding: 0.333333rem 0.16rem 0;
        overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		font-size:0.32rem;
		line-height:0.4rem;
    }  
    .Doublerowlayout .sale  .SalesVolume {
        color: #c5c5c5;
        font-size:0.293333rem;
    }
    .Doublerowlayout .sale .price {
        color: #fb0036;
    }
    .Doublerowlayout .sale .price span{
		font-size:0.15rem;

    }
    .Doublerowlayout .sale .price b{
		font-size:0.32rem;
		font-weight:bold;
    }
    .Doublerowlayout .sale {
        width:100%;
		box-sizing: border-box;
		font-size:0.16rem;
		padding: 0px 0.133333rem;
		position: absolute;
		bottom: 0.666667rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
    }
    .Doublerowlayout .goodsInfo{
    	height:2.466667rem;
    }
  
/* ----------------优惠券------------------- */
	.store .disCountBox{
		width:3.866667rem;
		height:1.6rem;
		position:relative;
		margin:0 0.066667rem;
	}
	.store .disCountBox img{
		position:absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
	}
	.store .disCountBox .CouponsLeft{
		position:absolute;
			left:0;
			top:0;
			width:1.733333rem;
			height:100%;
	}
	.store .disCountBox .CouponsLeft span{
		font-size:0.266667rem;
		position: absolute;
		left:0.16rem;
		top:0.88rem;
		height:0.2rem;
		line-height: 0.2rem;
	}
	.store .disCountBox .CouponsLeft b{
		font-size:0.733333rem;
				position: absolute;
				left:0.38rem;
				top:0.553333rem;
				height:0.56rem;
				line-height:0.56rem;
	}
	.store  .CouponsRight{
		width:2.133333rem;
		float:left;
		height:100%;
		box-sizing: border-box;
		padding:0.28rem 0 0.28rem 0.1rem;
		position:absolute;
		left:1.733333rem;
		top:0;
	}

	.disConut::-webkit-scrollbar{
		width:0px
	}
	/* .store .CouponsRight p:last-child{
		position:absolute;
		bottom:0.28rem;
		font-size:0.266667rem;
		height:0.266667rem;
		line-height: 0.266667rem;
	}
	.store .CouponsBox{
		background:#f7f7f7;
		border-top:0.013333rem solid #EEEEEE;
	}
	.store .CouponsBox .CouponsList::-webkit-scrollbar{width:0px}
	.store .CouponsBox .CouponsList{
		list-style-type: none;
		display:flex;
		flex-wrap:nowrap;
		-webkit-box-pack:justify;
		justify-content:space-between;
		padding:0;overflow:auto;
		padding-top:0.293333rem;
		background:white;
	
	}
	.store .CouponsBox li{
		-webkit-box-flex:1;
		flex:1 0 auto;
		color:white;
		margin:0 0.066667rem;
		width:3.866667rem;
		height:1.6rem;
		background-size: cover;
		position:relative
	}
	.store .CouponsBox li .ImgBox{
		width:100%;
		height:100%;
	}
	.store .CouponsBox li .CouponsLeft{
		position:absolute;
		left:0;
		top:0;
		width:1.733333rem;
		height:100%;
	}
	.store .CouponsLeft span{
		font-size:0.266667rem;
		position: absolute;
		left:0.16rem;
		top:0.88rem;
		height:0.2rem;
		line-height: 0.2rem;
	}
	.store .CouponsLeft b{
		font-size:0.733333rem;
		position: absolute;
		left:0.38rem;
		top:0.553333rem;
		height:0.56rem;
		line-height:0.56rem;
	}
	.store .CouponsBox .CouponsRight{
		width:2.133333rem;
		float:left;
		height:100%;
		box-sizing: border-box;
		padding:0.28rem 0 0.28rem 0.1rem;
		position:absolute;
		left:1.733333rem;
		top:0;
	
	}
	.store .CouponsRight p:first-child{
		position:absolute;
		top:0.28rem;
		font-size:0.346667rem;
		height:0.346667rem;
		line-height:0.346667rem;
	}
	
	 	.store .CouponsBox .active{
	width:3.866667rem;
	height:1.6rem;
	background-size: cover;
	} */
	
</style>