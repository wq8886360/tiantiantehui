<template>
	<div class="goodsdetails">
		<!-- 商品banner -->
		<swiper dots-position='center' :aspect-ratio="1/1">
			<swiper-item v-for="(item, index) in pics" :key="index">
				<img class="bannerimg" :src="img_baseurl+item" alt="">
			</swiper-item>
		</swiper>
		<!-- 商品标题描述信息 -->
		<div class="information">
			
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
			img_baseurl: '', //图片域名
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
					this.img_baseurl = res.data.img_baseurl;
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
.goodsdetails{
	background: #F7F7F7;
	.bannerimg{
		width: 100%;
		height: 100%;
	}
}
</style>