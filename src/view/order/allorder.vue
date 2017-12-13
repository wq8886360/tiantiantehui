<template>
	<div class="allorder">
		<ul class="allorder_ul">
			<li v-for='(item,index) in allorder_data'>
				<div class="allorder_top">
					<img src="../../assets/img/storeIconAct.png" alt="">
					<span class="title">{{item.store_name}} > </span>
					<span class="success">{{item.status_text}}</span>
				</div>
				<div class="allorder_con">
					<div class="allorder_all" v-for='(itenm,index) in item.order_goods'>
						<div class="allorder_left">
							<img :src="itenm.thumb" alt="">
							<div class="appellation">
								<div class="text">
									<span v-if='itenm.offered== "拼"' class="spell">{{itenm.offered}}</span>
									<span>{{itenm.title}}</span>
								</div>
								<div class="model_number">{{itenm.sku_desc}}</div>
							</div>
						</div>
						<div class="allorder_right">
							<div class="now">￥{{itenm.price}}</div>
							<div class="discount">￥{{itenm.market_price}}</div>
							<div class="quantity">X{{itenm.qty}}</div>
						</div>
					</div>
				</div>
				<div class="pieces">
					<div class="pieces_right">
						<span>共{{item.qty}}件商品</span>
						<span>合计:</span>
						<span class="coin">￥{{item.total_amount}}</span>
						<span>(含运费￥{{item.shipping_fee}})</span>
					</div>
				</div>
				<div class="view_v">
					<div class="view_t">
						<span v-if='item.status==0' class="appraise_c">付款</span>
						<span v-if='item.status==0' class="logistics">联系商家</span>
						<span v-if='item.status==0' class="logistics">取消订单</span>
						<span v-if='item.status==1' class="logistics">提醒发货</span>
						<span v-if='item.status==2' class="logistics">延长收货</span>
						<span v-if='item.status==2' class="appraise_c">确认收货</span>
						<span v-if='item.status==3' class="appraise_c" @click='appraise(index)'>评价</span>
						<span v-if='item.status==3 || item.status==2' class="logistics">查看物流</span>
						<span v-if='false' class="appraise_c">邀请好友</span>
					</div>
				</div>
			</li>
		</ul>
	</div>	
</template>
<script>
import {orderlist} from '../../http/api'
export default{
	data(){
		return{
			allorder_data:null,//全部的数据
			page:1, //页数
			page_size:10, //总页数
			status:'all',	//传过去的状态
			key_word:null,	//关键词

		}
	},
	methods:{
		orderlist_api(){
			orderlist({page: this.page,page_size: this.page_size,status:this.status,key_word:''}).then((response) => {
				let res=response.data;
				if(res.code==1000){
					console.log(res)
					this.allorder_data=res.data.orders;
				}
			})
		},
		appraise(index){
			this.$router.push({path:"/rate",query:{evaluate_data:this.allorder_data[index]}})
		}
	},
	created(){
		this.orderlist_api();
	}
}
</script>
<style lang='less'>
	@import '../../assets/css/component/allorder.less';
</style>