<template>
	<div class="payment">
		<scroller v-if='pay_length!=0' lock-x scrollbar-y use-pullup use-pulldown height="-100" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
			<ul class="payment_ul">
				<li v-for='(item,index) in payment_data'>
					<div class="payment_top">
						<img src="../../assets/img/storeIconAct.png" alt="">
						<span class="title">{{item.store_name}}</span>
						<i class="icon-right right_c"></i>
						<span class="success">{{item.status_text}}</span>
					</div>
					<div class="payment_con"  @click='orders_id(item.id)'>
						<div class="payment_all" v-for='(itenm,index) in item.order_goods'>
							<div class="payment_left">
								<img :src="itenm.thumb" alt="">
								<div class="appellation">
									<div class="text">
										<span class="spell_bottom"><span v-if='itenm.offered== "拼"' class="spell">{{itenm.offered}}</span>{{itenm.title}}</span>
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
							<span class="logistics_n" @click='cancelorder_show(item.id)'>取消订单</span>
							<span class="appraise_c" @click='apply(item.id)'>付款</span>
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
			<popup class='tjiao' v-model="attrsState" position="bottom" max-height="80%">	
				<img src="../../assets/img/close_gray.png" alt="" class="Shut" @click='attrsState=false'>
			 	<checklist  @on-change="change" label-position="left" :title="title" :options="commonList" v-model="radioValue" :max="1"></checklist>
			 	<div class="sure" @click='order_sure()'>提交</div>
			</popup>
		</div>
		<!-- 支付方式弹窗 -->
		<div v-transfer-dom class="paytype">
			<popup v-model="paytypeState" position="bottom">
				<div class="box">
					<div class="title">
						选择支付方式
						<i class="icon-close right" @click="paytypeState = false"></i>
					</div>
					<div class="list" @click="zhifu(item.code)" v-for="(item,index) in pay_types">
						<div class="left">
							<img :src="item.pic" alt="">
							<p>{{item.name}}</p>
						</div>
						<i class="icon-right"></i>
					</div>
				</div>
			</popup>
		</div>
	</div>
</template>
<script>
import {orderlist,cancelorder,getavailablepaymethod,payinorderlist} from '../../http/api'
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
			order_Id:null,//订单ID
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
     		reason:null, //取消订单的val
     		pay_types:null,
     		paytypeState:false,
     		orded_ii:null, //支付的订单Id
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
							
							res.data.orders.map((val,index,arr)=>{
								this.payment_data.push(val)
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
    	/*点击出现取消订单的弹窗*/
		cancelorder_show(item_id){
			this.attrsState=true;
			this.order_Id=item_id;
		},
		/*取消订单的选项的val*/
		change(val, label) {
			this.reason=val[0];
   	 	},
		/*取消订单api*/
		cancelorder_api(){
			cancelorder({order_id:this.order_Id,reason:this.reason}).then((response)=>{
				let res=response.data;
				if(res.code==1000){
					this.attrsState=false;
					this.orderlist_api()
				}
			})
		},
		/*取消订单提交*/
		order_sure(){
			this.cancelorder_api();
		},
   	 	apply(item_id){
   	 		this.paytypeState=true;
   	 		this.orded_ii=item_id;
   	 	},
   	 	/*去支付*/
   	 	zhifu(code){
			let params = {
				order_id:this.orded_ii,
				paytype: code
			}
			payinorderlist(params).then((response) => {
				console.log(response.data)
				
				if(response.data.code == 1000){
                    if(response.data.data.paytype == 'credit'){
                        window.location.href = '/#/Payoff?pay_sn=' + response.data.data.pay_sn;
                    }else{
                        let jump_url = encodeURIComponent(window.location.protocol + '//' + window.location.host + '/#/Payoff?pay_sn=' + response.data.data.pay_sn);
					    window.location.href = response.data.data.pay_url + '&jump_url=' + jump_url;
                    }
				}else{
                    this.$vux.toast.text(response.data.message, 'middle')
                }
			})
		}
	},
	created(){
		// this.key_word=this.data
		this.orderlist_api();
		getavailablepaymethod().then((response) => {
			console.log(response)
            this.pay_types = response.data.data.pay_method;
            //console.log(this.pay_types)
		})

	}
}
</script>
<style lang='less'>
	@import '../../assets/css/component/payment.less';
</style>