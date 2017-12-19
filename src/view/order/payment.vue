<template>
	<div class="payment">
		<scroller v-if='pay_length!=0' lock-x scrollbar-y use-pullup use-pulldown height="-100" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
			<ul class="payment_ul">
				<li v-for='(item,index) in payment_data'>
					<div class="payment_top">
						<img src="../../assets/img/storeIconAct.png" alt="">
						<span class="title">{{item.store_name}} > </span>
						<span class="success">{{item.status_text}}</span>
					</div>
					<div class="payment_con"  @click='orders_id(item.id)'>
						<div class="payment_all" v-for='(itenm,index) in item.order_goods'>
							<div class="payment_left">
								<img :src="itenm.thumb" alt="">
								<div class="appellation">
									<div class="text">
										<span v-if='itenm.offered== "拼"' class="spell">{{itenm.offered}}</span>
										<span>{{itenm.title}}</span>
									</div>
									<div class="model_number">{{itenm.sku_desc}}</div>
								</div>
							</div>
							<div class="payment_right">
								<div class="now">￥{{itenm.price}}</div>
								<div class="discount">￥{{itenm.market_price}}</div>
								<div class="quantity">x{{itenm.qty}}</div>	
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
							<span class="logistics_n">联系商家</span>
							<span class="logistics_n" @click='attrsState=true'>取消订单</span>
							<span class="appraise_c">付款</span>
						</div>
					</div>
				</li>
			</ul>
			<div v-if='missing' class="missing">您已经没有更多的订单了</div>
		</scroller>	
		<div v-else class="order">
			<img src="../../assets/img/img_empty_dingdan@2x.png" alt="">
			<div class="none">暂无订单信息</div>
		</div>
		<div v-transfer-dom>
			<popup v-model="attrsState" position="bottom" max-height="80%">	
				<img src="../../assets/img/close_gray.png" alt="" class="close" @click='attrsState=false'>
			 	<checklist label-position="left" :title="title" :options="commonList" v-model="radioValue" :max="1"></checklist>
			 	<div class="sure" @click='attrsState=false'>提交</div>
			</popup>
		</div>
	</div>
</template>
<script>
import {orderlist} from '../../http/api'
import { Popup, Checklist,TransferDom,Scroller} from 'vux'
export default{
	directives: {
		TransferDom
	},
	components: {
    	Popup,
    	Checklist,
    	Scroller
  	},
	data(){
		return{
			payment_data:null, //待评价数据
			page:1, //页数
			page_size:10, //总页数
			statusd:0,	//传过去的状态
			commonList: [ '我不想买了', '信息填写错误', '商家缺货','其他原因' ],
			attrsState:false,
			title:'请选择原因',
			radioValue:[],
			pay_length:null, //数据的长度
      		status: { //上拉加载下来刷新的状态
        		pullupStatus: 'default',
        		pulldownStatus: 'default'
     		},
     		total_page:null,//总页数
     		missing:false,//没有数据的提示
		}
	},
	methods:{
		/*待评价的api*/
		orderlist_api(){
			orderlist({page:1,page_size: this.page_size,status:this.statusd}).then((response) => {
				let res=response.data;
				if(res.code==1000){
					console.log(res)
					this.payment_data=res.data.orders;
					this.pay_length=this.payment_data.length;
					this.total_page=res.data.total_page;
				}
			})
		},
		orders_id(item_id){
			this.$router.push({path:"/orderdetails",query:{orders_id:item_id}})
		},
		/*上拉加载*/
		loadMore () {
      		setTimeout(() => {
      		  this.page++;
      		  setTimeout(() => {
      		    this.$refs.scroller.donePullup();
      		  	if(this.page<=this.total_page){
      		  		orderlist({page: this.page,page_size: this.page_size,status:this.statusd}).then((response) => {
						let res=response.data;
						if(res.code==1000){
							this.payment_data.push(res.data.orders[0])
							console.log(this.allorder_data)
						}
					})	
      		  	}else{
      		  		this.missing=true;
      		  	}
      		  },10)
      		},1000)
    	},
    	/*下拉刷新*/
    	refresh () {
      		setTimeout(() => {
      		  this.$nextTick(() => {
      		    setTimeout(() => {
      		      this.$refs.scroller.donePulldown()
      		      this.pullupEnabled && this.$refs.scroller.enablePullup();
      		      this.orderlist_api();
      		      this.missing=false;
      		    },10)
      		  })
      		}, 2000)
    	},
	},
	created(){
		// this.key_word=this.data
		this.orderlist_api();

	}
}
</script>
<style lang='less'>
	@import '../../assets/css/component/payment.less';
</style>