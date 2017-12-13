<template>
	<div class="evaluate">
		<ul class="evaluate_ul">
			<li v-for='(item,index) in evaluate_data'>
				<div class="evaluate_top">
					<img src="../../assets/img/storeIconAct.png" alt="">
					<span class="title">{{item.store_name}} > </span>
					<span class="success">{{item.status_text}}</span>
				</div>
				<div class="evaluate_con">
					<div class="evaluate_all" v-for='(itenm,index) in item.order_goods'>
						<div class="evaluate_left">
							<img :src="itenm.thumb" alt="">
							<div class="appellation">
								<div class="text">
									<span v-if='itenm.offered== "拼"' class="spell">{{itenm.offered}}</span>
									<span>{{itenm.title}}</span>
								</div>
								<div class="model_number">{{itenm.sku_desc}}</div>
							</div>
						</div>
						<div class="evaluate_right">
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
						<span class="logistics">查看物流</span>
						<span class="appraise_c" @click='appraise(index)'>评价</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import {orderlist} from '../../http/api'
export default{
	props: ['dataValue'],
	data(){
		return{
			evaluate_data:null, //待评价数据
			page:1, //页数
			page_size:10, //总页数
			status:3,	//传过去的状态
			key_word:null,	//关键词
		}
	},
	watch:{
		dataValue(){
			this.key_word=this.dataValue
		}
	},
	methods:{
		/*待评价的api*/
		orderlist_api(){
			orderlist({page: this.page,page_size: this.page_size,status:this.status,key_word:''}).then((response) => {
				let res=response.data;
				if(res.code==1000){
					console.log(res)
					this.evaluate_data=res.data.orders;
				}
			})
		},
		appraise(index){
			this.$router.push({path:"/rate",query:{evaluate_data:this.evaluate_data[index]}})
		}
	},
	created(){
		// this.key_word=this.data
		this.orderlist_api();

	}
}
</script>
<style lang='less'>
	@import '../../assets/css/component/evaluate.less';
</style>