<template>
	<div class="goodsdetails" v-if="data">
		<!-- 商品banner -->
		<swiper dots-position='center' :aspect-ratio="1/1">
			<swiper-item v-for="(item, index) in pics" :key="index">
				<img class="bannerimg" :src="item" alt="">
			</swiper-item>
		</swiper>
		<!-- 商品标题描述信息 -->
		<div class="information div_box">
			<!-- 标题、收藏功能 -->
			<div class="title">
				<div class="text">{{data.title}}</div>
				<div class="collect">
					<div class="border1px"></div>
				</div>
			</div>
			<!-- 价格、标签 -->
			<div class="price">
				<span class="newprice">¥{{data['price']}}</span>
				<del class="oldprice">¥{{data['market_price']}}</del>
				<img src="../../assets/img/newProduct.png" alt="">
				<img src="../../assets/img/hotstyle.png" alt="">
				<img src="../../assets/img/Hotsell.png" alt="">
			</div>
			<!-- 销售量 -->
			<div class="sales">
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="1/3"><p class="textleft" v-if="data['free_shipping'] == 1">包邮</p></flexbox-item>
					<flexbox-item :span="1/3"><p class="textcenter">已售{{data['goods_data']['sales']}}件</p></flexbox-item>
					<flexbox-item :span="1/3"><p class="textright">{{data['area']}}</p></flexbox-item>
				</flexbox>
			</div>
		</div>
		<!-- 领券 -->
		<div class="voucher table div_box">
			<div class="label tablecell">领券</div>
			<div class="voucherlist tablecell">
				<span v-for="item in 3">满999减199</span>
			</div>
			<i class="icon-right tablecell textright"></i>
		</div>
	</div>
</template>
<script>
import { Swiper, SwiperItem, Flexbox, FlexboxItem } from 'vux'
import { goodsdetail } from '../../http/api.js'
export default{
	components: {
		Swiper,
		SwiperItem,
		Flexbox,
		FlexboxItem
	},
	data(){
		return {
			data: null,
			goods_id: 148, //商品ID
			pics: null, //banner列表
		}
	},
	methods:{
		goodsdetail_api(){
			goodsdetail({goods_id: this.goods_id}).then((response) => {
				console.log(response)
				let res = response.data;
				if(res.code === 1000){
					this.data = res.data;
					this.pics = res.data.pics;
				}
			})
		}
	},
	created(){
		this.goodsdetail_api();
	}

}
</script>
<style lang="less">
@import '../../assets/css/component/goodsdetails.less';
</style>