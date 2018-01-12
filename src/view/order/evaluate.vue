<template>
	<div class="evaluate">
		<!--列表页-->
		<scroller  v-if='evaluate_length!=0' lock-x scrollbar-y use-pullup use-pulldown height="-100" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
			<ul class="evaluate_ul">
				<li v-for='(item,index) in evaluate_data'>
					<div class="evaluate_top">
						<img src="../../assets/img/storeIconAct.png" alt="">
						<span class="title">{{item.store_name}}111111111111111111111111</span>
						<i class="icon-right right_c"></i>
						<span class="success">{{item.status_text}}</span>
					</div>
					<div class="evaluate_con"  @click='orders_id(item.id)'>
						<div class="evaluate_all" v-for='(itenm,index) in item.order_goods'>
							<div class="evaluate_left">
								<img :src="itenm.thumb" alt="">
								<div class="appellation">
									<div class="text">
										<span class="spell_bottom"><span v-if='itenm.offered== "拼"' class="spell">{{itenm.offered}}</span>{{itenm.title}}</span>
									</div>
									<div class="model_number">{{itenm.sku_desc}}</div>
								</div>
							</div>
							<div class="evaluate_right">
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
							<span @click="logistics(item.id)" class="logistics_n">查看物流</span>
							<span class="appraise_c" @click='appraise(index)'>评价</span>
							<span v-if='item.is_append==1' class="appraise_c" @click='supplemental(index)'>追加评论</span>
						</div>
					</div>
				</li>
			</ul>
			<div v-if='missing' class="missing">您已经没有更多的订单了</div>
		</scroller>
		<!--没有订单显示的图片-->
		<div v-if='evaluate_length==0' class="order">
			<img src="../../assets/img/img_empty_dingdan@2x.png" alt="">
			<div class="none">暂无订单信息</div>
		</div>
	</div>
</template>
<script>
import {orderlist} from '../../http/api'
import {Scroller} from 'vux'
export default{
	components: {
  		Scroller
  	},
	data(){
		return{
			evaluate_data:null, //待评价数据
			page:1, //页数
			page_size:10, //总页数
			statusd:3,	//传过去的状态
			key_word:null,	//关键词
			evaluate_length:null,//数据的长度
      		status: { //上拉刷新下拉加载的状态
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
			orderlist({page: 1,page_size: this.page_size,status:this.statusd,key_word:this.key_word}).then((response) => {
				let res=response.data;
				if(res.code==1000){
					console.log(res)
					this.evaluate_data=res.data.orders;
					this.evaluate_length=this.evaluate_data;
					this.total_page=res.data.total_page
				}
			})
		},
		/*评价*/
		appraise(index){
			this.$router.push({path:"/rate",query:{evaluate_data:JSON.stringify(this.evaluate_data[index])}})
		},
		orders_id(item_id){
			this.$router.push({path:"/orderdetails",query:{orders_id:item_id}})
		},
		logistics(item_id){
			this.$router.push({path:"/logistics",query:{orders_id:item_id}})
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
							res.data.orders.map((val,index,arr)=>{
								this.evaluate_data.push(val)
							})
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
    	/*追加评论*/
   	 	supplemental(index){
   	 		this.$router.push({path:"/AddBatchEva",query:{evaluate_data:JSON.stringify(this.evaluate_data[index])}})
   	 	}
	},
	created(){
		this.key_word=this.data
		this.orderlist_api();
	}
}
</script>
<style lang='less'>
	@import '../../assets/css/component/evaluate.less';
</style>