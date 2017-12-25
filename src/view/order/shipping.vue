<template>
	<div class="shipping">
		<!--列表页-->
		<scroller v-if='shipping_length!=0' lock-x scrollbar-y use-pullup use-pulldown height="-100" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh"	 v-model="status" ref="scroller">	
			<ul class="shipping_ul"> 
				<li v-for='(item,index) in shipping_data'>
					<div class="shipping_top">
						<img src="../../assets/img/storeIconAct.png" alt="">
						<span class="title">{{item.store_name}} > </span>
						<span class="success">{{item.status_text}}</span>
					</div>
					<div class="shipping_con" @click='orders_id(item.id)'>
						<div class="shipping_all" v-for='(itenm,index) in item.order_goods'>
							<div class="shipping_left">
								<img :src="itenm.thumb" alt="">
								<div class="appellation">
									<div class="text">
										<span v-if='itenm.offered== "拼"' class="spell">{{itenm.offered}}</span>
										<span>{{itenm.title}}</span>
									</div>
									<div class="model_number">{{itenm.sku_desc}}</div>
								</div>
							</div>
							<div class="shipping_right">
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
							<span @click='remindseller_api(item.id)' class="logistics_n">提醒发货</span>
						</div>
					</div>
				</li>
			</ul>
			<div v-if='missing' class="missing">您已经没有更多的订单</div>
		</scroller>
		<!--没有订单显示的图片-->
		<div v-else class="order">
			<img src="../../assets/img/img_empty_dingdan@2x.png" alt="">
			<div class="none">暂无订单信息</div>
		</div>
	</div>
</template>
<script>
import {orderlist,remindseller} from '../../http/api'
import {Scroller} from 'vux'
export default{
	components: {
    	Scroller
  	},
	data(){
		return{
			shipping_data:null, //待评价数据
			page:1, //页数
			page_size:10, //总页数
			statusd:1,	//传过去的状态
			shipping_length:null,//数据的长度
      		status: {//上拉加载下拉刷新的状态
        		pullupStatus: 'default',
        		pulldownStatus: 'default'
     		},
     		total_page:null,//总页数
     		missing:false,//没有数据的状态
		}
	},
	methods:{
		/*待评价的api*/
		orderlist_api(){
			orderlist({page: 1,page_size: this.page_size,status:this.statusd}).then((response) => {
				let res=response.data;
				if(res.code==1000){
					this.shipping_data=res.data.orders;
					this.shipping_length=this.shipping_data.length;
					this.total_page=res.data.total_page
					console.log(this.shipping_data)
				}
			})
		},
		orders_id(item_id){
			this.$router.push({path:"/orderdetails",query:{orders_id:item_id}})
		},
		loadMore () {
      		setTimeout(() => {
      		  this.page++;
      		  setTimeout(() => {
      		    this.$refs.scroller.donePullup();
      		  	if(this.page<=this.total_page){
      		  		orderlist({page: this.page,page_size: this.page_size,status:this.statusd}).then((response) => {
						let res=response.data;
						if(res.code==1000){
							this.shipping_data.push(res.data.orders[0])
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
    	/*提醒发货*/
   	 	remindseller_api(item_id){
   	 		remindseller({order_id:item_id}).then((response)=>{
   	 			let res=response.data;
   	 			if(res.code==1000){
   	 				this.$vux.toast.text(res.message, 'middle')
   	 			}
   	 		})
   	 	}
	},
	created(){
		// this.key_word=this.data
		this.orderlist_api();

	}
}
</script>
<style lang='less'>
	@import '../../assets/css/component/shipping.less';
</style>