<template>
	<div class="store">
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
			
		</div>
	</div>	
</template>
<script>
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
        	storeId:'',//店铺的id
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
				}
			})
    	},
	},
	created() {
		if(location.href.split('?').length<=1){
		}else{
			if(location.href.split('?')[1].split('=').length<=1){
			}else{
				this.storeId=location.href.split('?')[1].split('=')[1]
				this.getStoreInfo()
			}
			
		}
	}
}
</script>
<style>
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