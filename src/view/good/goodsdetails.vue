<template>
	<div class="goodsdetails">
		<!-- 商品banner -->
		<swiper dots-position='center' :aspect-ratio="1/1">
			<swiper-item v-for="(item, index) in pics" :key="index">
				<img class="bannerimg" :src="item" alt="">
			</swiper-item>
		</swiper>
		<!-- 商品标题描述信息 -->
		<div class="information">
			<div class="title div_box">
				<div class="text">道具收费绝世独地方都十分的舒服立就放肆的风景是对方觉得司法局来得及发</div>
				<div class="collect">ddd</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Swiper, SwiperItem } from 'vux'
import { goodsdetail } from '../../http/api.js'
export default{
	components: {
		Swiper,
		SwiperItem,
	},
	data(){
		return {
			data: null,
			goods_id: 54, //商品ID
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