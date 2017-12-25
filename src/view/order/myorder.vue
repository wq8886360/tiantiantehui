<template>
	<div class="myorder">
		<!--搜索框-->
		<search placeholder="搜索所有订单" v-model="value" position="absolute" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search">
   		</search>
		<!--tab分页-->
		<tab :line-width="1" custom-bar-width="60px">
      		<tab-item selected @on-item-click="onItemClick">全部</tab-item>
      		<tab-item @on-item-click="onItemClick">待付款</tab-item>
      		<tab-item @on-item-click="onItemClick">待发货</tab-item>
      		<tab-item @on-item-click="onItemClick">待收货</tab-item>
      		<tab-item @on-item-click="onItemClick">待评价</tab-item>
   		</tab>
   		<!--4个tab引入的组件-->
   		<div class="components" v-if='search_data==null'>
   			<allorder v-if='index==0'></allorder>
   			<payment  v-if='index==1'></payment>
   			<shipping v-if='index==2'></shipping>
   			<Receive  v-if='index==3'></Receive>
   			<evaluate v-if='index==4'></evaluate>
   		</div>
   		<!--搜索出来的数据-->
   		<div class="search_sc"  v-if='search_data!=null'>
			<scroller lock-x scrollbar-y use-pullup use-pulldown height="-100" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
   				<ul class="search_ul">
					<li v-for='(item,index) in search_data'>
						<div class="search_top">
							<img src="../../assets/img/storeIconAct.png" alt="">
							<span class="title">{{item.store_name}} > </span>
							<span class="success">{{item.status_text}}</span>
						</div>
						<div class="search_con" @click='orders_id(item.id)'>
							<div class="search_all" v-for='(itenm,index) in item.order_goods'>
								<div class="search_left">
									<img :src="itenm.thumb" alt="">
									<div class="appellation">
										<div class="text">
											<span v-if='itenm.offered== "拼"' class="spell">{{itenm.offered}}</span>
											<span>{{itenm.title}}</span>
										</div>
										<div class="model_number">{{itenm.sku_desc}}</div>
									</div>
								</div>
								<div class="search_right">
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
								<span @click="logistics(item.id)" v-if='item.status==3 || item.status==2' class="logistics_n">查看物流</span>
								<span v-if='false' class="appraise_c">邀请好友</span>
								<span v-if='item.status==0' class="logistics_n">联系商家</span>
								<span v-if='item.status==0' class="logistics_n" @click='cancelorder_show(item.id)'>取消订单</span>
								<span v-if='item.status==1' class="logistics_n" @click='remindseller_api(item_id)'>提醒发货</span>
								<span v-if='item.status==2' class="logistics_n" @click="postpone_api(item.id)">延长收货</span>
								<span v-if='item.status==3' class="appraise_c" @click='appraise(index)'>评价</span>
								<span v-if='item.status==0' class="appraise_c">付款</span>
								<span v-if='item.status==2' class="appraise_c" @click='Comeout(item.id)'>确认收货</span>
								<span v-if='item.is_append==1' class="appraise_c" @click="supplemental(index)">追加评论</span>
							</div>
						</div>
					</li>
				</ul>
				<div v-if='missing' class="missing">您已经没有更多的订单了</div>
			</scroller>	
		</div>
		<!--取消订单的弹窗-->
		<div v-transfer-dom>
			<popup class='tjiao' v-model="attrsState" position="bottom" max-height="80%">	
				<img src="../../assets/img/close_gray.png" alt="" class="Shut" @click='attrsState=false'>
			 	<checklist @on-change="change" label-position="left" :title="title" :options="commonList" v-model="radioValue" :max="1"></checklist>
			 	<div class="sure" @click='order_sure();'>提交</div>
			</popup>
		</div>
		<!--点击搜索聚焦出来的白色背景-->
		<div class="white" v-if='statedd'>
			<div class="seacher">
				<div class="seacher_top">
					<span>搜索历史</span>
					<img @click="shanchu()" src="../../assets/img/icon_common_search_delet@2x.png" alt="">
				</div>
				<ul class="seacher_ul">
					<li v-for='(item,index) in lishi_data.keyword'>
						{{item}}
					</li>
				</ul>
			</div>
		</div>
		<div v-transfer-dom>
      		<confirm v-model="show" @on-confirm="onConfirm">
      			<strong class="weui-dialog__title">要确认收货吗？</strong>
      			<div class="sure_s">确认收货后卖家将收到您的货款</div>
      		</confirm>
   		</div>
	</div>
</template>

<script>
import {orderlist,seacher,delhistory,cancelorder,postpone,remindseller,confirmreceipt}  from '../../http/api'
import { Tab, TabItem,Search,Popup, Checklist,TransferDom,Confirm,Scroller} from 'vux'
import allorder from './allorder';
import evaluate from './evaluate';
import payment from './payment';
import shipping from './shipping';
import Receive from './Receive';
export default{
	directives: {
		TransferDom
	},
	components: {
		Confirm,
		Tab,
		TabItem,
		Search,
		Popup,
    	Checklist,
    	Scroller,
		'allorder':allorder,
		'evaluate':evaluate,
		'payment':payment,
		'shipping':shipping,
		'Receive':Receive
	},
	data(){
		return{
			show:false,//点击确认收货的弹窗
      		value: '', //搜索框里面的提示
      		index:0, //tab切换的索引值
      		page:1, //页码
      		order_Id:null,//订单id
      		page_size:10, //页容量
      		statusd:'all', //传过去的状态
      		search_data:null, //搜索的数据
      		commonList: [ '我不想买了', '信息填写错误', '商家缺货','其他原因' ],
			attrsState:false, //取消订单弹窗的状态
			title:'请选择原因', //取消订单的标题
			radioValue:[], 
			statedd:false, //点击搜索框聚焦的时候出来的白色背景的状态
			lishi_data:null,//历史记录的数据
      		status: { //上拉加载下拉刷新的状态
        		pullupStatus: 'default',
        		pulldownStatus: 'default'
     		},
     		total_page:null,//总页数
     		missing:false,//没有数据的状态
     		reason:null, //取消订单的val
     		order_d:null,//确认收货的订单id
		}
	},
	methods:{
		/*订单的api*/
		orderlist_api(){
			orderlist({page: 1,page_size: this.page_size,status:this.statusd,key_word:this.value}).then((response) => {
				let res=response.data;
				if(res.code==1000){
					this.search_data=res.data.orders;
					this.total_page=res.data.total_page
				}
			})
		},
		/*进入订单详情页面*/
		orders_id(item_id){
			this.$router.push({path:'/orderdetails',query:{orders_id:item_id}})
		},
		/*历史订单api*/
		seacher_api(){
			seacher({}).then((response)=>{
				let res=response.data;
				console.log(res)
				if(res.code==1000){
					this.lishi_data=res.data;
				}
			})
		},
		/*清空历史记录api*/
		delhistory_api(){
			delhistory({}).then((response)=>{
				let res=response.data;
				if(res.code==1000){
					this.seacher_api();
				}
			})
		},
		/*清空历史记录*/
		shanchu(){
			this.delhistory_api();
		},
		/*tab切换*/
		onItemClick(index){
			this.index=index;
		},
		/*搜索框的聚焦*/
		onFocus(){
			this.value='';
			this.search_data=null;
			console.log(this.value)
			this.statedd=true;
		},
		/*搜索框成功搜索*/
		onSubmit(){
			this.orderlist_api();
			this.statedd=false;
			this.seacher_api();
		},
		/*搜索框的取消按钮*/
		onCancel(){
			this.search_data=null;
			this.statedd=false;
		},
   		appraise(index){
			this.$router.push({path:"/rate",query:{evaluate_data:this.search_data[index]}})
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
							this.search_data.push(res.data.orders[0])
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
    	/*点击出现取消订单的弹窗*/
		cancelorder_show(item_id){
			this.attrsState=true;
			this.order_Id=item_id;
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
		/*取消订单的选项的val*/
		change(val, label) {
			this.reason=val[0];
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
   	 	/*提醒发货*/
   	 	remindseller_api(item_id){
			remindseller({order_id:item_id}).then((response)=>{
   	 			let res=response.data;
   	 			if(res.code==1000){
   	 				this.$vux.toast.text(res.message, 'middle')
   	 			}
   	 		})
   	 	},
   	 	/*追加评论*/
   	 	supplemental(index){
   	 		this.$router.push({path:"/AddBatchEva",query:{evaluate_data:this.search_data[index]}})
   	 	},

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
		/*历史订单api*/
		this.seacher_api();
	}
}
</script>
<style lang="less">
	@import '../../assets/css/component/myorder.less';
</style>