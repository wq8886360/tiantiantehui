<template>
	<div class="confirmorder">
		<div class="address" @click="route_address">
			<div class="info">
				<img src="../../assets/img/icon_order_address.png" alt="">
				<div v-if="!address" class="text">请添加您的收货地址</div>
				<div v-else class="text">
					<div class="nameTel">
						<span class="name left">
							阿拉斯加的企鹅
						</span>
						<span class="tel right">
							18358205737
						</span>
					</div>
					<div class="detailaddress">
						收货地址：浙江省杭州市滨江区江陵路1916号星耀城二期29楼705
					</div>
				</div>
				<i class="icon-right"></i>	
			</div>
			<img class="bom_img" src="../../assets/img/img_order_line.png" alt="">
		</div>

		<!-- 店铺列表 -->
		<div class="storelist">
			<div class="storename">
				<img src="../../assets/img/shop_icon.png" alt="">
				<span>美颜秘笈官方旗舰店</span>
			</div>
			<div class="content">
				<div class="good" v-for="itme in 2">
					<div class="img">
						<img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4009434610,3584345417&fm=27&gp=0.jpg" alt="">
					</div>
					<p class="goodname">美颜秘笈专柜变色磨砂唇膏粉漾魅惑润唇蜜口红保湿滋润001/004/005</p>
					<p class="color">颜色:紫红</p>
					<p class="price">¥179.5</p>
					<p class="num">x1</p>
				</div>
				<div class="distribution typeli">
					<div class="left">配送方式</div>
					<div class="right">快递 ¥6</div>
				</div>
				<div class="promotion typeli2">
					<div>促销</div>
					<div>赠袜子一双；已优惠 ¥6 <i class="icon-right"></i></div>	
				</div>
				<div class="treatment typeli2">
					<div>优惠</div>
					<div>满200减50 <i class="icon-right"></i></div>
				</div>
				<div class="textarea">
					<x-textarea placeholder="给卖家留言：" :autosize="true" v-model="message"></x-textarea>
				</div>
				<div class="reporter">
					<span>共计2件商品&nbsp;&nbsp;小计：</span>
					<span class="price">¥ 425</span>
				</div>
			</div>
		</div>

		<!-- 失效商品 -->
		<div class="disablegood">
			<div class="title">
				失效宝贝
			</div>
			<div class="list">
				<div class="item"  v-for="item in 2">
					<div class="img">
						<img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4009434610,3584345417&fm=27&gp=0.jpg" alt="">
					</div>
					<p class="name">VeroModa白鸭绒填充立立领合体立领合体领合体版型羽绒服|316412518</p>
					<p class="cause">库存不足</p>
					<p class="price">¥999.99</p>
					<p class="num">x1</p>
				</div>
			</div>
		</div>
		
		<!-- 底部支付 -->
		<div class="pay">
			合集：<span class="zong">¥1194.5</span>
			<div class="pay_btn">去支付</div>
		</div>
	</div>
</template>
<script>
import { orderconfirm } from '../../http/api.js';
import { XTextarea } from 'vux';
export default{
	components: {
		XTextarea
	},
	data(){
		return {
			address: null, //默认收货地址
			message: '', //给卖家留言
		}
	},
	methods: {
		api_orderconfirm(){
			let cart_ids = JSON.parse(this.$route.query.ids);
			orderconfirm({cart_ids: cart_ids.id}).then((response) => {
				console.log(response)
				let res = response.data;
				if(res.code == 1000){
					this.address = res.data.address;
				}else{
					this.$vux.toast.text(res.message, 'middle');
				}
			})
		},
		route_address(){
			if(this.address){
				this.$router.push({path: '/selectadress'})
			}else{
				this.$router.push({path: '/addadress'})
			}
		}
	},
	created(){
		this.api_orderconfirm();
	}
}
</script>
<style lang="less">
@import '../../assets/css/component/confirmorder.less';	
</style>