<template>
	<div class="Refund" v-if='refund_data'>
		<!-- 详情头部 -->
		<div class="exchangeTop">
			<div class="exchange_i">
				<div class="exchange_t">
					<div class="title">{{refund_data.status_desc}}</div>
					<div class="timer">{{refund_data.time_desc}}</div>
				</div>
			</div>
		</div>
		<!-- 处理的信息 -->
		<div class="exchange_b">
			<div v-if='item.label==""' class="Serial" v-for='(item,index) in refund_data.msg_list'>
				<div class="title" style="margin-bottom:0.27rem">{{item.title}}</div>
				<div class="text_t" v-for='(ited,index) in combination'>{{ited}}</div>
			</div>
			<div v-else class="Serial" v-for='(item,index) in refund_data.msg_list'>
				<div class="Serial_why">
					<span class="Serial_title">{{item.label}}</span>
					<span class="Serial_left">{{item.title}}</span>
				</div>
				<div class="opinion">{{item.description}}</div>
			</div>
			<div class="collection" v-for='(item,index) in refund_data.opt_list'>
				<span v-if='item.is_highlight=="N"' class="collection_gray btn_coll" @click='jump(item.code)'>{{item.name}}</span>
				<span v-else class="collection_red btn_coll" @click='jump(item.code)'>{{item.name}}</span>
			</div>
		</div>
		<!-- 退货地址 -->
		<div class="re_address" v-if='refund_data.return_address.length!=0'>
			<div class="re_top">
				<div class="title">退货地址</div>
			</div>
			<div class="address">
				<div class="address_top">
					<div class="address_left">收件人：{{refund_data.return_address.name}}</div>
					<div class="iphone">联系电话：{{refund_data.return_address.phone}}</div>
				</div>
				<div class="adress_bottom">
					{{refund_data.return_address.address}}
				</div>
			</div>
		</div>
		<!-- 换货物流详情 -->
		<div class="re_address" v-if='refund_data.member_address.length!=0'>
			<div class="re_top">
				<div class="title">收货地址</div>
			</div>
			<div class="address">
				<div class="address_top">
					<div class="address_left">收件人：{{refund_data.member_address.name}}</div>
					<div class="iphone">联系电话：{{refund_data.member_address.phone}}</div>
				</div>
				<div class="adress_bottom">
					{{refund_data.member_address.address}}
				</div>
			</div>
		</div>
		<!-- 用户退货物流 -->
		<div v-if='refund_data.return_address.length!=0'  style="margin-bottom:0.27rem;" class="delivery" @click='attrsState=true'>
			<div class="delivery_top" style="border-bottom:none">
				<div class="delivery_left">用户退货物流</div>
				<div class="delivery_right">
					<span v-if='reason==null'>请选择</span>
					<span v-else>{{reason}}</span>
					<i class="icon-right"></i>
				</div>
			</div>	
		</div>
		<!-- 商家发货物流公司 -->
		<div v-if='refund_data.member_address.length!=0' class="delivery" @click='attrsState=true'>
			<div class="delivery_top">
				<div class="delivery_left">商家发货物流</div>
				<div class="delivery_right">
					<span v-if='reason==null'>请选择</span>
					<span v-else>{{reason}}</span>
					<i class="icon-right"></i>
				</div>
			</div>	
		</div>
		<!-- 物品栏 -->
		<div class="official">
			<!-- 物品表头 -->
			<div class="offic-head">			
				<p class="offic-name"><img src="../../assets/img/storeIconAct.png" alt="">{{refund_data.store_name}}</p>
			</div>
			<!-- 物品图片部分 -->
			<div class="offic-pic">
			  <div class="waiceng">
				<img :src="refund_data.thumb" class="offic-print"></img>
				<!-- 中间内容部分 -->
				<div class="offic-details">
					<div class="offic-intro">{{refund_data.title}}</div>
					<div class="offic-model">{{refund_data.sku_desc}}</div>
				</div>
				<!-- 价钱 -->
				<div class="offic-price">
					<p class="offic-pri">￥{{refund_data.price}}</p>
					<span class="mul">×{{refund_data.qty}}</span>
				</div>
			   </div>
				<!-- 赠品 -->
				<div class="complimentary" v-if='refund_data.gift.length!=0'>
					<div class="compicon"></div>
					<div class="compmatter">
						<span class="comzengpin">赠品</span>
						<img :src="refund_data.gift.thumb" alt="" class="comimg">
						<span class="comwenzi">{{refund_data.gift.title}}</span>
					</div>
				</div>
			</div>
			<!-- 退款退货详情 -->
			<div v-if='refund_data.refund_type!="4"' class="barter-details">
				<div class="bar-cause">退款原因: <span class="bar-cau">{{refund_data.buyer_message}}</span></div>
				<div class="bar-quantitl">退款数量: <span class="bar-quan">{{refund_data.goods_num}}</span></div>
				<div class="bar-time">申请时间: <span class="bar-cau">{{refund_data.add_time}}</span></div>
				<div class="bar-number">退款编号: <span class="bar-cau">{{refund_data.refund_sn}}</span></div>
			</div>
			<!-- 换货详情 -->
			<div v-else class="barter-details" v-if='false'>
				<div class="bar-cause">换货原因: <span class="bar-cau">{{refund_data.buyer_message}}</span></div>
				<div class="bar-quantitl">换货数量: <span class="bar-quan">{{refund_data.goods_num}}</span></div>
				<div class="bar-time">申请时间: <span class="bar-cau">{{refund_data.add_time}}</span></div>
				<div class="bar-number">换货编号: <span class="bar-cau">{{refund_data.refund_sn}}</span></div>
			</div>
		</div>
		<!--底部 -->
		<div class="relationmer">
			<div class="merchant">联系商家</div>
		</div>
		<div v-transfer-dom>
			<popup class='tjiao' v-model="attrsState" position="bottom" max-height="80%">	
				<img src="../../assets/img/close_gray.png" alt="" class="Shut" @click='attrsState=false'>
			 	<checklist @on-change="changer" label-position="left" :title="title" :options="commonList" v-model="radioValue" :max="1"></checklist>
			 	<div class="sureq" @click='attrsState=false'>关闭</div>
			</popup>
		</div>
	</div>
</template>
<script>
import { Popup,TransferDom,Checklist} from 'vux'
import {refundapplyDetail,refundExpressList} from '../../http/api.js'
export default{
	directives: {
		TransferDom
	},
	components: {
		Popup, 
    	Checklist,
	},
	data(){
		return{
			commonList: [],
			attrsState:false, //快递的弹窗的状态
			title:'快递公司', //快递的弹窗的标题
			radioValue:[], 
			reason:'请选择', //快递的弹窗的val
			refund_id:null,
			refund_data:null,
			combination:null,
			edit:null,
			edit_apply_type:null,
		}
	},
	methods:{
		/*点击商家发货出现的弹窗*/
		changer(val, label) {
			this.reason=val[0];
   	 	},
   	 	/*退换货详情api*/
   	 	api_refundapplyDetail(){
   	 		refundapplyDetail({refund_id:'110'}).then((response)=>{
   	 			let res=response.data;
   	 			if(res.code==1000){
   	 				this.refund_data=res.data.refund_detail;
   	 				this.combination=res.data.refund_detail.msg_list[0].description;
   	 				this.combination=this.combination.split('\n');
   	 				this.edit=this.refund_data.edit;
   	 				this.edit_apply_type=this.edit.edit_apply_type;
   	 				this.refund_type=this.refund_data.refund_type;
   	 				this.og_id=this.edit.og_id;
   	 				console.log(this.refund_data)
   	 			}
   	 		})
   	 	},
   	 	/*物流公司api*/
   	 	api_refundExpressList(){
   	 		refundExpressList({}).then((response)=>{
   	 			let res=response.data;
   	 			if(res.code==1000){
   	 				this.commonList=res.data.express_list;
   	 				this.commonList=this.commonList.map(function(item,index,arr){
   	 					return item.name
   	 				})
   	 			}
   	 		})

   	 	},
   	 	/*跳转页面*/
   	 	jump(item_code){
   	 		if(item_code=='view_history_enable'){
   	 			
   	 		}
   	 		if(item_code=='edit_apply_enable'){
   	 			if(this.edit_apply_type==1){
   	 				this.$router.push({path:'/servicetype',query:{og_id:this.og_id}})
   	 			}else{
   	 				this.$router.push({path:'/arefund',query:{edit:JSON.stringify(this.edit),type:this.refund_type,og_id:this.og_id}})
   	 			}
   	 		}
   	 		if(item_code=='call_plat_enable'){

   	 		}
   	 		if(item_code=='edit_call_plat_enable'){

   	 		}
   	 		if(item_code=='add_ship_enable'){

   	 		}
   	 		if(item_code=='edit_ship_enable'){

   	 		}
   	 	}

	},
	created(){
		this.api_refundapplyDetail();
		this.api_refundExpressList();
	}
}	
</script>
<style lang='less'>
@import '../../assets/css/component/Refund.less';
</style>
<style>
	@import '../../assets/css/public/btn.css';
</style>