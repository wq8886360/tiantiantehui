<template>
	<div class="confirmorder"  v-if="orderData">
		<div class="address" @click="route_address">
			<div class="info">
				<img src="../../assets/img/icon_order_address.png" alt="">
				<div v-if="!address" class="text">请添加您的收货地址</div>
				<div v-else class="text">
					<div class="nameTel">
						<span class="name left">
							{{address.realname}}
						</span>
						<span class="tel right">
							{{address.mobile}}
						</span>
					</div>
					<div class="detailaddress">
						收货地址：{{address.detail_address}}
					</div>
				</div>
				<i class="icon-right"></i>	
			</div>
			<img class="bom_img" src="../../assets/img/img_order_line.png" alt="">
		</div>

		<!-- 店铺列表 -->
		<div class="storelist" v-for="item in orderData.enabled">
			<div class="storename">
				<img src="../../assets/img/shop_icon.png" alt="">
				<span>{{item.store_name}}</span>
			</div>
			<div class="content">
				<div class="good" v-for="items in item.goods">
					<div class="img">
						<img :src="items.thumb" alt="">
					</div>
					<p class="goodname">{{items.title}}</p>
					<p class="color">{{items.sku}}</p>
					<p class="price">¥{{items.price}}</p>
					<p class="num">x{{items.qty}}</p>
				</div>
				<div class="distribution typeli">
					<div class="left">配送方式</div>
					<div class="right">快递 ¥{{item.shippingFee}}</div>
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
					<span>共计{{item.sub_count}}件商品&nbsp;&nbsp;小计：</span>
					<span class="price">¥ {{item.sub_total}}</span>
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
			合计：<span class="zong">¥{{orderData.pay_amount}}</span>
			<div class="pay_btn">去支付</div>
		</div>
	</div>
</template>
<script>
import { orderconfirm, orderbuy } from '../../http/api.js';
import { XTextarea } from 'vux';
export default{
	components: {
		XTextarea
	},
	data(){
		return {
			orderData: null, 
			address: null, //默认收货地址
			address_id: null,//收货地址ID
			message: '' //给卖家留言
		}
	},
	methods: {
		// 购物车跳转
		api_orderconfirm(){
			let cart_ids = JSON.parse(localStorage.info);
			orderconfirm({cart_ids: cart_ids.id,address_id:this.address_id}).then((response) => {
				console.log(response)
				let res = response.data;
				if(res.code == 1000){
					this.orderData = res.data;
					this.address = res.data.address;
				}else{
					this.$vux.toast.text(res.message, 'middle');
				}
			})
		},
		//立即购买跳转
		api_orderconfirm_direct(){
			let goodinfo = JSON.parse(localStorage.info);
			orderbuy({goods_id: goodinfo.goods_id,qty: goodinfo.num,sku_id: goodinfo.sku_id,address_id:this.address_id}).then((response) => {
				console.log(response)
				let res = response.data;
				if(res.code == 1000){
					this.orderData = res.data;
					this.address = res.data.address;
				}else{
					this.$vux.toast.text(res.message, 'middle');
				}
			})
		},
		route_address(){
			if(this.address){
				this.$router.push({path: '/selectadress',query:{address_id: this.address.id}})
			}else{
				this.$router.push({path: '/addadress'})
			}
		}
	},
	created(){
		if(this.$route.query.address_id){
			this.address_id = this.$route.query.address_id;
		}else{
			this.address_id = 0
		}
		let type = localStorage.type;
		//立即购买
		if(type == 'buynow'){
			this.api_orderconfirm_direct();
		}else{
			this.api_orderconfirm();
		}
	}
}
</script>
<style lang="less">
@import '../../assets/css/component/confirmorder.less';	
</style>