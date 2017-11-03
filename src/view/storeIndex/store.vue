<template>
	<div class="store" v-if="storeInfo!=''">
		<div class='storeHeader'>
			<div class='backImg'><img :src='storeInfo.head.decoration_banner' alt=""></div>
			<div class='cover'>
			</div>
			<div class="coverInfo">
				<div class='search'>
					<div class='inputBox'></div>
					<input type="text">
					<div class='classify'><img src="../../assets/img/classify.png" alt=""></span><b>分类</b></div>
					<div class='iconMore'><img src="../../assets/img/icon_more.png" alt=""></div>
				</div>
				<div class="storeMes">
					<div class='storeImg'><img :src='storeInfo.head.decoration_logo' alt=""></div>
					<div class='storeName'><p>{{storeInfo.head.decoration_name}}</p><p>店铺等级</p></div>
					<div class='attention'><b><img src="../../assets/img/star.png" alt=""></b><span>关注</span><p>1999人</p></i></div>
				</div>
			</div>
		</div>
		<div class='backgroundBox'>
			<ul class='storeTab'>
				<li @click="tabSelect(1)" :class="{ 'tabActive': num==1?true:false}"><span><img  v-if='num==1' src="../../assets/img/storeIcon.png" alt=""><img v-else src="../../assets/img/storeIconAct.png" alt=""></span><p>店铺首页</p></li>
				<li  @click="tabSelect(2)"  :class="{ 'tabActive': num==2?true:false}"><span>1</span><p>店铺宝贝</p></li>
				<li  @click="tabSelect(3)" :class="{ 'tabActive': num==3?true:false}"><span>2</span><p>促销</p></li>
				<li  @click="tabSelect(4)" :class="{ 'tabActive': num==4?true:false}"><span>3</span><p>新品</p></li>
			</ul>
			<div class='CouponsBox'>
				<ul class='CouponsList'>
					<li>
						<div class='CouponsLeft'><span>￥</span><b>190</b></div>
						<div class='CouponsRight'><p>优惠券</p><p>满2900元可用</p></div>
					</li>
					<li :class="{'active':checkAllFlag}">
						<div class='CouponsLeft'><span>￥</span><b>190</b></div>
						<div class='CouponsRight'><p>优惠券</p><p>满2900元可用</p></div>
					</li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
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
				    		<img src="http://v20-wx.shunliandongli.com/joinin/20170824/20170824140723361h.jpg" alt="">
				    		<div class='textBox'></div>
				    		<p>{{items.description}}</p>
				    		<div class='curcleNum'>	
				    			<span>1</span>
				    			<b>/</b>
				    			<i>3</i>
				    		</div>
				    </swiper-slide>
<!-- 				    <swiper-slide>
		<img src="http://v20-wx.shunliandongli.com/joinin/20170824/20170824140723361h.jpg" alt="">
	 	<div class='textBox'></div>
	 	<p>你还待会发哦是发送</p>
</swiper-slide>
<swiper-slide>
		<img src="http://v20-wx.shunliandongli.com/joinin/20170824/20170824140723361h.jpg" alt="">
		<div class='textBox'></div>
		<p>你还待会发哦是发送</p>
</swiper-slide> -->
				    <!-- Optional controls -->
				   <!--  <div class="swiper-pagination"  slot="pagination"></div> -->
				    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
				    <div class="swiper-button-next" slot="button-next"></div> -->
				    <!--  <div class="swiper-scrollbar"   slot="scrollbar"></div> --> 
				</swiper>
			</div>
		</div>
	</div>
</template>
<script>
import {storeIndex,checkCode } from '../../http/api.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.min.css';
require('swiper/dist/css/swiper.css')
export default{
	name: 'carrousel',
	data(){
		return {
			checkAllFlag:true,
			swiperOption: {
	          	notNextTick: true,
	          	autoplay: 4000,
	          	direction : 'horizontal',
	          	grabCursor : true,
	          	setWrapperSize :true,
	          	autoHeight: true,//自动轮播
	          	paginationClickable :true,
	          	autoplayDisableOnInteraction : false,//鼠标划过还能自动滚动
	          	mousewheelControl : true,//能让鼠标滑轮滚动
	          	debugger: true,
	          	
        	},
        	domain: '', //域名地址
        	storeInfo:'',//店铺的信息
        	num:'1',
        	number:'26',
        	response:'',

		}
	},
	components: {
	    swiper,
	    swiperSlide
	},
	methods:{
		tabSelect(sort){
			console.log(sort)
			this.num=sort
		}
	},
	created() {
		console.log(111)
/*		storeIndex({storeId:this.number}).then((response)=>{
			if(response.data.code==1000){
				console.log(response)
				this.storeInfo=response.data.data
				this.domain = response.data.data.baseUrl
			}
			
		})*/
		this.response={"code":1000,"message":"成功","data":{"decoration_id":"14","block_id":"49","head":{"decoration_id":"14","decoration_name":"我的小店huwanghao1","store_id":"26","decoration_banner":"http:\/\/v20-wx.shunliandongli.com\/joinin\/20170918\/20170918110234531z.jpg","decoration_logo":"http:\/\/v20-wx.shunliandongli.com\/uploads\/20171009\/20171009102329893s.png"},"body":[{"block_module_type":"1","name":"双列排版","title":"双列排版","rule":{"goods_count":"2","min_price":"","max_price":"","order_by":"new","category_id":""},"data":[{"id":"134","title":"这里是标题","thumb":"\/goods\/20170912\/20170912143433206d.jpg","price":"111.00","url":"http:\/\/v20-wx.shunliandongli.com\/goods\/134"},{"id":"133","title":"1111","thumb":"\/goods\/20170912\/20170912144410279v.jpg","price":"111.00","url":"http:\/\/v20-wx.shunliandongli.com\/goods\/133"}],"goods_ids":"","module_type":"1"},{"block_module_type":"2","name":"单列排版","title":"单列排版","rule":{"goods_count":"2","min_price":"","max_price":"","order_by":"new","category_id":""},"data":[{"id":"134","title":"这里是标题","thumb":"\/goods\/20170912\/20170912143433206d.jpg","price":"111.00","url":"http:\/\/v20-wx.shunliandongli.com\/goods\/134"},{"id":"133","title":"1111","thumb":"\/goods\/20170912\/20170912144410279v.jpg","price":"111.00","url":"http:\/\/v20-wx.shunliandongli.com\/goods\/133"}],"goods_ids":"","module_type":"1"}],"baseUrl":"http:\/\/v20-wx.shunliandongli.com"},"agent":"Mozilla\/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit\/601.1.46 (KHTML, like Gecko) Version\/9.0 Mobile\/13B143 Safari\/601.1 wechatdevtools\/1.01.171019 MicroMessenger\/6.5.7 Language\/zh_CN webview\/{{webviewID}} webdebugger port\/9974","client_type":"ios"}
		console.log(this.response)

				this.storeInfo=this.response.data
				this.domain = this.response.data.baseUrl


		
	}
}
</script>
<style>
/* -----------轮播图------------------ */
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
}
.banner .curcleNum b{
	float:left;
	padding-left:0.013333rem;
}
.banner .curcleNum i{
	float:left;
	font-size:10p;
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
	.store .CouponsBox .CouponsLeft{
		width:1.733333rem;
		float:left;
		position:relative;
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
		position:relative;

	}
	.store .CouponsRight p:first-child{
		position:absolute;
		top:0.28rem;
		font-size:0.346667rem;
		height:0.346667rem;
		line-height:0.346667rem;
	}
	.store .CouponsRight p:last-child{
		position:absolute;
		bottom:0.28rem;
		font-size:0.266667rem;
		height:0.266667rem;
		line-height: 0.266667rem;
	}
	.store .CouponsBox{
		background:#f7f7f7;
		padding-bottom:0.613333rem;
	}
	.store .CouponsBox .CouponsList::-webkit-scrollbar{width:0px}
	.store .CouponsBox .CouponsList{
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
		padding:0;overflow:auto;
		padding-top:0.293333rem;
		background:white;

	}
	.store .CouponsBox li{
		-webkit-box-flex:1;
		-webkit-flex:1 0 auto;
		-ms-flex:1 0 auto;
		flex:1 0 auto;
		color:white;
		margin:0 0.066667rem;
		background:url(../../assets/img/discount.png) no-repeat center;
		width:3.866667rem;
		height:1.6rem;
		background-size: cover;
	}
 	.store .CouponsBox .active{
	background:url(../../assets/img/discountCoupon.png) no-repeat center;
	width:3.866667rem;
	height:1.6rem;
	background-size: cover;
}
	


/* ----------------切换条------------------- */
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
/* 		border-bottom:0.053333rem solid #fb0036; */
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
	}
/* -----------------头部------------------- */
	.store .storeHeader{
		height:2.8rem;
		position:relative;
	}
	.store .storeHeader .backImg img{
		height:2.8rem;
		width:100%;
	}
	.store .storeHeader .cover{
		width:100%;
		height:100%;
		position:absolute;
		left:0;
		top:0;
		background:#000000;
		 opacity:0.55
	}
	.store .storeHeader .coverInfo{
		width:100%;
		height:100%;
		position:absolute;
		left:0;
		top:0;
	}
	.store  .search{
		height:0.933333rem;
		position:relative;
		margin-top:0.133333rem;
	}
	.store .search  .inputBox{
		width:7.6rem;
		height:0.906667rem;
		margin-left:0.266667rem;
		border:0.013333rem solid #F4F4F1;
		border-radius: 0.106667rem;
		background:#BBBBBB;
		opacity: 0.5;
	}
	.store .search   input{
		width:7.6rem;
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

	.store  .search input::-webkit-input-placeholder {
	    color:white;
	} 
	.store .storeMes{
		position:absolute;
		left:0;
		bottom:0;
		overflow: hidden;
		height:1.333333rem;
		width:100%;
		color:white;
	}
	.store .storeMes .storeImg{
		width:1.066667rem;
		height:1.066667rem;
		float:left;
		margin-left:0.266667rem;
	}
	.store .storeMes .storeImg img{
		width:100%;
		height:100%;
	}
	.store .storeMes .storeName{
		height:1.066667rem;
		float:left;
		width:6.666667rem;
		margin-left:0.293333rem;
		box-sizing: border-box;
		font-size:0.293333rem;
	}
	.store .storeMes .storeName p:first-child{
		font-size:0.373333rem
	}
	.store .storeMes .attention{
		float:right;
		position:relative;
	}
	.store .storeMes .attention span{
		width:1.6rem;
		height:0.626667rem;
		display:inline-block;
		border-radius:0.306667rem 0 0 0.306667rem ;
		background:#f90137;
		text-align: right;
		line-height:0.626667rem;
		box-sizing: border-box;
		padding-right:0.3rem;
		font-size:0.32rem;
	}
	.store .storeMes .attention img{
		width:0.28rem;
		height:0.28rem;
		float:left;
	}
	.store .storeMes .attention b{
		position:absolute;
		right:1.066667rem;
		top:0.17rem;
		height:0.28rem;
	}
	.store .storeMes .attention p{
		text-align: center;
		font-size:0.293333rem;
		padding-top:0.1rem;
	}
	.store  .search .inputBox{
		float:left;
	}
	.store  .search .classify{
		float:left;
		width:0.7rem;
		margin-top:0.066667rem;
	}
	.store  .search img{
		width:0.506667rem;
		height:0.466667rem;
	}
	.store .search .classify{
		margin-left:0.306667rem;
		width:0.64rem;
		text-align: center;
	}
	.store .search .classify b{
		color:white;
		font-size:0.266667rem;
		width:100%;
		display:inline-block;
	}
	.store .search .iconMore{
		float:right;
		margin:0.186667rem 0.16rem 0 0;
	}
	.store .search .iconMore img{
		width:0.706667rem;
		height:0.306667rem;
	}

</style>