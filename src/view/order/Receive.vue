<template>
	<div class="Receive">
		<!--列表页-->
		<scroller v-if='Receive_length!=0' lock-x scrollbar-y use-pullup use-pulldown height="-100" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
			<ul class="Receive_ul">
				<li v-for='(item,index) in Receive_data'>
					<div class="Receive_top">
						<img src="../../assets/img/storeIconAct.png" alt="">
						<span class="title">{{item.store_name}}</span>
						<i class="icon-right right_c"></i>
						<span class="success">{{item.status_text}}</span>
					</div>
					<div class="Receive_con"  @click='orders_id(item.id)'>
						<div class="Receive_all" v-for='(itenm,index) in item.order_goods'>
							<div class="Receive_left">
								<img :src="itenm.thumb" alt="">
								<div class="appellation">
									<div class="text">
										<span class="spell_bottom"><span v-if='itenm.offered== "拼"' class="spell">{{itenm.offered}}</span>{{itenm.title}}</span>
									</div>
									<div class="model_number">{{itenm.sku_desc}}</div>
								</div>
							</div>
							<div class="Receive_right">
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
							<span>(含运费￥{{item.Receive_fee}})</span>
						</div>
					</div>
					<div class="view_v">
						<div class="view_t">
							<span @click="postpone_api(item.id)" class="logistics_n">延长收货</span>
							<span @click="logistics(item.id)" class="logistics_n">查看物流</span>
							<span @click='Comeout(item.id)' class="appraise_c">确认收货</span>
						</div>
					</div>
				</li>
			</ul>
			<div v-if='missing' class="missing">您已经没有更多的订单了</div>
		</scroller>	
		<!--没有订单显示的图片-->
		<div v-if='Receive_length==0' class="order">
			<img src="../../assets/img/img_empty_dingdan@2x.png" alt="">
			<div class="none">暂无订单信息</div>
		</div>
		<!--确认收货的弹窗-->
		<div v-transfer-dom>
      		<confirm v-model="show" @on-confirm="onConfirm">
      			<strong class="weui-dialog__title">要确认收货吗？</strong>
      			<div class="sure_s">确认收货后卖家将收到您的货款</div>
      		</confirm>
   		</div>
	</div>
</template>
<script>
import {orderlist,postpone,confirmreceipt} from '../../http/api'
import { TransferDom,Confirm,Scroller} from 'vux'
export default{
	directives: {
		TransferDom
	},
	components: {
		Confirm,
		Scroller,
	},
	data(){
		return{
			show:false,//点击确认收货的弹窗
			Receive_data:null, //待评价数据
			page:1, //页数
			page_size:10, //总页数
			statusd:2,	//传过去的状态
			Receive_length:null,//数据的长度
      		status: { //上拉刷新下拉加载的状态
        		pullupStatus: 'default',
        		pulldownStatus: 'default'
     		},
     		total_page:null,//总页数
     		missing:false,//没有数据的提示
     		order_d:null,//确认收货的id
		}
	},
	methods:{
		/*待评价的api*/
		orderlist_api(){
			orderlist({page: 1,page_size: this.page_size,status:this.statusd}).then((response) => {
				let res=response.data;
				if(res.code==1000){
					console.log(res)
					this.Receive_data=res.data.orders;
					this.Receive_length=this.Receive_data.length;
					this.total_page=res.data.total_page
				}
			})
		},
		orders_id(item_id){
			this.$router.push({path:"/orderdetails",query:{orders_id:item_id}})
		},
		onConfirm(){
			console.log(11)
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
								this.Receive_data.push(val)
							})
						}
					})	
      		  	}else{
      		  		this.missing=true;
      		  		document.querySelector('.xs-plugin-pullup-undefined').style.display='none';
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
    	/*延长发货api*/
   	 	postpone_api(item_id){
   	 		postpone({order_id:item_id}).then((response)=>{
   	 			let res=response.data;
   	 			if(res.code==1000){
   	 				this.$vux.toast.text(res.message, 'middle')
   	 			}
   	 		})
   	 	},
   	 	/*点击获取当前的订单Id*/
   	 	Comeout(item_index){
   	 		this.show=true
   	 		this.order_d=item_index

   	 	},
   	 	/*确认收货按钮*/
		onConfirm() {
			this.confirmreceipt_api();
   		},
   	 	/*确认收货*/
   	 	confirmreceipt_api(){
   	 		confirmreceipt({order_id:this.order_d}).then((response)=>{
   	 			let res = response.data;
   	 			if(res.code==1000){
   	 				this.orderlist_api()
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
	@import '../../assets/css/component/Receive.less';
</style>