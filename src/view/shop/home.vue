<template>
	<div class="storeHome">
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
	data(){

	},
	components: {
	    swiper,
	    swiperSlide
	},
}
</script>
<style>
	
</style>