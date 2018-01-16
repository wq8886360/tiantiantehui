<template>
	<div class="orderdetails" v-if='order_data'>
		<!--订单详情头部-->
		<div class="orderdetails_top">
			<div class="orderdetails_left">
				<div class="wait">{{order_data.notice_status.status_text}}</div>
				<div class="surplus">{{order_data.notice_status.status_small}}</div>
			</div>
			<img v-if='order_data.status==-1' class="logo_l" src="../../assets/img/img_orderdetails_close@2x.png" alt="">
			<img v-if='order_data.status==0' class="logo_l" src="../../assets/img/img_orderdetails_daifukuan@2x.png" alt="">
			<img v-if='order_data.status==1' class="logo_l" src="../../assets/img/img_orderdetails_daifahuo@2x.png" alt="">
			<img v-if='order_data.status==2' class="logo_l" src="../../assets/img/img_orderdetails_daishouhuo@2x.png" alt="">
			<img v-if='order_data.status==3 || order_data.status==4' class="logo_l" src="../../assets/img/img_orderdetails_success@2x.png" alt="">
		</div>
		<!--订单号码、收货地址、用户留言、copy按钮-->
		<div class="orderdetails_con">
			<div class="Order_number">
				<div class="Ordernumber_c">
					<span>订单号：</span>
					<input  readonly="readonly" id="text" type="text" v-model="order_data.order_sn">
					<div v-clipboard:copy="order_data.order_sn" v-clipboard:success="onCopy" v-clipboard:error="onError" class="copy" >复制</div>
				</div>
			</div>
			<div class="goods" v-if='order_data.receipt_address.realname!="" && order_data.receipt_address.mobile!="" && order_data.receipt_address.address!=""'>
				<div class="goods_main">
					<img src="../../assets/img/icon_order_address.png" alt="">
					<div class="goods_right">
						<div class="goods_top">
							<span>收货人：</span>
							<span class="province">{{order_data.receipt_address.realname}}</span>
							<span class="moblie">{{order_data.receipt_address.mobile}}</span>
						</div>
						<div class="good_bottom">
							<span>收货地址：{{order_data.receipt_address.address}}</span>
							<span></span>
						</div>
					</div>
				</div>
			</div>
			<div class="message">
				<div class="message_main">
					<span class="message_c">用户留言：</span>
					<span class="message_b">{{order_data.remark}}</span>
				</div>
			</div>
			<div class="flagship">
				<div class="flagship_top">
					<div class="flagship_store">
						<img src="../../assets/img/storeIconAct.png" alt="">
						<span>{{order_data.store_name}}</span>
						<i class="icon-right right_c"></i>
					</div>
				</div>
				<ul class="flagship_ul">
					<li v-for='(item,index) in order_data.order_goods'>
						<div class="Skin_care">
							<div class="Skin_n" style="overflow:hidden">
								<div class="skin_left">
									<img :src="item.thumb"  alt="">
								</div>
								<div class="skin_right">
									<div class="Skin_c">
										<div class="text">
											<span class="title">
											<span v-if='item.offered=="拼"' class="spell"><img src="../../assets/img/pin.png" alt=""></span>{{item.title}}</span>
										</div>
										<div class="sku">
											{{item.sku_desc}}
										</div>
									</div>
									<div class="skin_rr">
										<div class="price">￥{{item.price}}</div>
										<div class="price_hide">￥{{item.market_price}}</div>
										<div class="quantity">x{{item.qty}}</div>
									</div>
								</div>
								<div v-if='item.refund_button_desc!="" ' class="sales" @click='sales(item.og_id,item.refund_button_type,item.refund_id)	'>{{item.refund_button_desc}}</div>
							</div>
							
							<div class="gifts" v-if='item.gift.length!=0'>
								<div class="corner"></div>
								<div class="corner_right">
									<div class="conn_left" v-for='(itemm,index) in item.gift'>
										<div class="writing">赠品</div>
										<img class="photo_c" :src="itemm.thumb" alt="">
										<div class="title">{{itemm.title}}</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="Total_price">
					<div class="Total_top">
						<div class="along" v-if='order_data.goods_amount!=""'>
							<span>订单总价</span>
							<span class="along_right">￥{{order_data.goods_amount}}</span>
						</div>
						<div class="along" v-if='order_data.shipping_fee!=""'>
							<span>运费</span>
							<span class="along_right">￥{{order_data.shipping_fee}}</span>
						</div>
						<div class="along" v-if='order_data.promotion!=""'>
							<span>促销</span>
							<span class="along_right">-￥{{order_data.promotion}}</span>
						</div>
						<div class="along" v-if='order_data.voucher_amount!=""'>
							<span>优惠券</span>
							<span class="along_right">-￥{{order_data.voucher_amount}}</span>
						</div>
					</div>
				</div>
				<div class="Real_pay">
					<div class="coin">
						<span class="coin_left">实付金额</span>
						<span class="coin_right">￥{{order_data.total_amount}}</span>
					</div>
					<div class="coin_bottom">
						<div style="margin-bottom:0.1rem">
							<span>支付方式:</span>
							<span>{{order_data.paytype}}</span>
						</div>
						<div v-if='order_data.create_time!=""' style="margin-bottom:0.1rem;">
							<span>下单时间：</span>
							<span>{{order_data.create_time}}</span>
						</div>
						<div v-if='order_data.pay_time!=""' style="margin-bottom:0.1rem;">
							<span>付款时间：</span>
							<span>{{order_data.pay_time}}</span>
						</div>
						<div  v-if='order_data.send_time!=""' style="margin-bottom:0.1rem;">
							<span>发货时间：</span>
							<span>{{order_data.send_time}}</span>
						</div>
						<div  v-if='order_data.receive_time!=""' style="margin-bottom:0.1rem;">
							<span>成交时间：</span>
							<span>{{order_data.send_time}}</span>
						</div>
					</div>
				</div>
				<div class="good_have" v-if='order_data.status!=-1'>
					<div class="bianh" v-if='state'>
						<div class="contact">联系商家</div>
						<div class="three_jiao"></div>
					</div>
					<span class="more" v-if='order_data.status==2' @click="state=!state">更多</span>
					<div class="good_right">
						<span v-if='order_data.status==1 || order_data.status==3 || order_data.status==0' class="lin_gray">联系商家</span>
						<span v-if='order_data.status==2' class="lin_gray" @click='postpone_api()'>延长发货</span>
						<span v-if='order_data.status==0' class="lin_gray" @click='cancelorder_show()'>取消订单</span>
						<span v-if='order_data.status==2 || order_data.status==3' class="lin_gray" @click='logistics()'>查看物流</span>
						<span v-if='false' class="lin_red">邀请好友</span>
						<span v-if='order_data.status==1' class="lin_red" @click='remindseller_api()'>提醒发货</span>
						<span v-if='order_data.status==2' class="lin_red" @click='Comeout()'>确认收货</span>
						<span v-if='order_data.status==3' class="lin_red" @click="appraise()">评价</span>
						<span v-if='order_data.status==0' class="lin_red" @click="apply()">付款</span>
						<span v-if='order_data.is_append==1' class="lin_red" @click="supplemental()">追加评论</span>
					</div>
				</div>
			</div>
		</div>
		<!--取消订单的弹窗-->
		<div v-transfer-dom>
			<popup class='tjiao' v-model="attrsState" position="bottom" max-height="80%">	
				<img src="../../assets/img/close_gray.png" alt="" class="Shut" @click='attrsState=false'>
			 	<checklist  @on-change="change" label-position="left" :title="title" :options="commonList" v-model="radioValue" :max="1"></checklist>
			 	<div class="sure" @click='attrsState=false'>提交</div>
			</popup>
		</div>
		<!--确认收货弹窗-->
		<div v-transfer-dom>
      		<confirm v-model="show" @on-confirm="onConfirm">
      			<strong class="weui-dialog__title">要确认收货吗？</strong>
      			<div class="sure_s">确认收货后卖家将收到您的货款</div>
      		</confirm>
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
import {orderdetail,postpone,remindseller,confirmreceipt,getavailablepaymethod,payinorderlist} from '../../http/api'
import { Popup, Checklist,TransferDom,Confirm} from 'vux'

export default{
	directives: {
		TransferDom
	},
	components: {
    	Popup,
    	Checklist,
    	Confirm
  	},
	data(){
		return{
			show:false,//取消订单的弹窗状态
			order_id:null,//订单id
			order_data:null,//详情数据
			state:false,
			commonList: [ '我不想买了', '信息填写错误', '商家缺货','其他原因' ],
			attrsState:false,
			title:'请选择原因',
			radioValue:[],
			reason:null, //取消订单的val
			pay_types:null,
     		paytypeState:false,
		}
	},
	methods:{
		/*订单详情api*/
		orderdetail_api(){
			orderdetail({order_id:this.order_id}).then((response)=>{
				let res=response.data;
				if(res.code==1000){
					console.log(res)
					this.order_data=res.data
				}
			})
		},
		/*进入评价页面*/
		appraise(){
			this.$router.push({path:'/rate',query:{evaluate_data:JSON.stringify(this.order_data)}})
		},
		/*复制*/
		onCopy:function(e){
			this.$vux.toast.text('复制成功', 'middle')
		},
		onError:function(e){
			console.log(e)
		},
		onConfirm(){
			// console.log(1)
		},
		/*查看物流*/
		logistics(){
			this.$router.push({path:'/logistics',query:{order_id:this.order_id}})
		},
		/*点击出现取消订单的弹窗*/
		cancelorder_show(){
			this.attrsState=true;
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
   	 	postpone_api(){
   	 		postpone({order_id:this.order_id}).then((response)=>{
   	 			let res=response.data;
   	 			if(res.code==1000){
   	 				this.$vux.toast.text(res.message, 'middle')
   	 			}
   	 		})
   	 	},
   	 	/*提醒发货*/
   	 	remindseller_api(){
   	 		remindseller({order_id:this.order_id}).then((response)=>{
   	 			let res=response.data;
   	 			if(res.code==1000){
   	 				this.$vux.toast.text(res.message, 'middle')
   	 			}
   	 		})
   	 	},
   	 	/*点击获取当前的订单Id*/
   	 	Comeout(){
   	 		this.show=true
   	 	},
   	 	/*确认收货按钮*/
		onConfirm() {
			this.confirmreceipt_api();
   		},
   		/*确认收货*/
   	 	confirmreceipt_api(){
   	 		confirmreceipt({order_id:this.order_id}).then((response)=>{
   	 			let res = response.data;
   	 			if(res.code==1000){
   	 				this.orderlist_api()
   	 			}
   	 		})
   	 	},
   	 	/*追加评论*/
   	 	supplemental(index){
   	 		this.$router.push({path:"/AddBatchEva",query:{evaluate_data:JSON.stringify(this.order_data)}})
   	 	},
   	 	/*售后跳转*/
   	 	sales(item_id,jump,refund_id){
   	 		console.log(item_id)
   	 		if(jump=='apply'){
   	 			this.$router.push({path:"/servicetype",query:{og_id:item_id}})
   	 		}else{
   	 			this.$router.push({path:"/refund",query:{refund_id:refund_id}})
   	 		}
   	 	},
   	 	apply(){	
   	 		this.paytypeState=true;
   	 	},
   	 	/*去支付*/
   	 	zhifu(code){
			let params = {
				order_id:this.order_id,
				paytype: code
			}
			payinorderlist(params).then((response) => {
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
		this.order_id=this.$route.query.orders_id;
		getavailablepaymethod().then((response) => {
			console.log(response)
            this.pay_types = response.data.data.pay_method;
            //console.log(this.pay_types)
		})
		this.orderdetail_api();
	}
}
</script>
<style lang='less'>
	@import '../../assets/css/component/orderdetails.less';
</style>