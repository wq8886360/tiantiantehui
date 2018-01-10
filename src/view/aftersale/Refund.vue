<template>
	<div class="Refund" v-if='refund_data'>
		<!-- 详情头部 -->
		<div class="exchangeTop">
			<div class="exchange_i">
				<div class="exchange_t">
					<div class="title">{{refund_data.status_desc}}</div>
					<timeDown v-if='countshu!=0' class='timer' @timerd='timerd' :timestamp='timestamd'></timeDown>
					<div v-else class="timer">{{refund_data.time_desc}}</div>
				</div>
			</div>
		</div>
		<!-- 处理的信息 -->
		<div class="exchange_b">
			<div v-if='item.label==""' class="Serial" v-for='(item,index) in refund_data.msg_list'>
				<div class="title" style="margin-bottom:0.27rem">{{item.title}}</div>
				<div class="text_t" v-for='(ited,index) in combination'>{{ited}}</div>
			</div>
			<div v-else class="Serial">
				<div class="Serial_why" v-for='(item,index) in refund_data.msg_list'>
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
		<div class="re_address" v-if='JSON.stringify(refund_data.return_address)!="{}"'>
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
		
		<div class="re_address" v-if='JSON.stringify(refund_data.member_address)!="{}"'>
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
		<!-- 商家发货物流公司 -->
		<div @click='Business(refund_data.order_id)' class="delivery" v-if='refund_data.express!=""'>
			<div class="delivery_top">
				<div class="delivery_left">商家发货物流</div>
				<div class="delivery_right">  
					<span v-if='refund_data.express!=""'>{{refund_data.express}}</span>
					<i class="icon-right"></i>
				</div>
			</div>	
		</div>
		<!-- 用户退货物流 -->
		<div @click='userm(refund_data.order_id)'  v-if='refund_data.express!=""' class="delivery" style="margin-bottom:0.27rem;">
			<div class="delivery_top" style="border-bottom:none">
				<div class="delivery_left">用户退货物流</div>
				<div class="delivery_right">
					<span v-if='refund_data.s_express!=""'>{{refund_data.s_express}}</span>
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
				<div class="complimentary" v-if='JSON.stringify(refund_data.gift)!="{}"'>
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
			<div v-else class="barter-details">
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
	</div>
</template>
<script>
import { Popup,TransferDom,Checklist} from 'vux'
import {refundapplyDetail} from '../../http/api.js'
import timeDown from './public/countdown.vue'
export default{
	props:['timestamp'],
	directives: {
		TransferDom
	},
	components: {
		Popup, 
    	Checklist,
    	timeDown
	},
	data(){
		return{
			commonList: [],
			refund_data:null,
			combination:null,
			edit:null,
			edit_apply_type:null,
			countshu:null,		
		}
	},
	methods:{
   	 	/*退换货详情api*/
   	 	api_refundapplyDetail(){
   	 		let Refund_id=this.$route.query.refund_id;
   	 		refundapplyDetail({refund_id:Refund_id}).then((response)=>{
   	 			let res=response.data;
   	 			if(res.code==1000){
   	 				this.refund_data=res.data.refund_detail;
   	 				console.log(this.refund_data)
   	 				this.combination=res.data.refund_detail.msg_list[0].description;
   	 				this.combination=this.combination.split('\n');
   	 				this.edit=this.refund_data.edit;
   	 				this.edit_apply_type=this.edit.edit_apply_type;
   	 				this.refund_type=this.refund_data.refund_type;
   	 				this.og_id=this.edit.og_id;
   	 				this.timestamd=this.refund_data.rest_second;
   	 			}
   	 		})
   	 	},
   	 	/*跳转页面*/
   	 	jump(item_code){
   	 		if(item_code=='view_history_enable'){
   	 			let refundd_id=this.$route.query.refund_id;
   	 			this.$router.push({path:'/agreement',query:{refund_id:refundd_id}})
   	 		}
   	 		if(item_code=='edit_apply_enable'){
   	 			if(this.edit_apply_type==1){
   	 				this.$router.push({path:'/servicetype',query:{og_id:this.og_id}})
   	 			}else{
   	 				let refu_id=this.$route.query.refund_id;
   	 				this.$router.push({path:'/arefund',query:{edit:JSON.stringify(this.edit),type:this.refund_type,og_id:this.og_id,refund_id:refu_id}})
   	 			}
   	 		}
   	 		if(item_code=='call_plat_enable'){
   	 			this.$router.push({path:'/Platform',query:{refund_id:this.$route.query.refund_id}})
   	 		}
   	 		if(item_code=='edit_call_plat_enable'){
   	 			this.$router.push({path:'/Platform',query:{refund_id:this.$route.query.refund_id,edit:JSON.stringify(this.edit)}})
   	 		}
            if(item_code=='add_ship_enable'){
                let refu_id=this.$route.query.refund_id;
                this.$router.push({path:'/content',query:{refund_id:refu_id,first:1}})
            }
            if(item_code=='edit_ship_enable'){
                let refu_id=this.$route.query.refund_id;
                this.$router.push({path:'/content',query:{refund_id:refu_id,first:2}})
            }
   	 	},
   	 	/*跳转到物流公司页面**/
   	 	/*商家物流*/
   	 	Business(order_id){
   	 		this.$router.push({path:"/logistics",query:{orders_id:order_id}})
   	 	},
   	 	/*用户物流*/
   	 	userm(order_id){
   	 		this.$router.push({path:"/logistics",query:{orders_id:order_id}})
   	 	},
   	 	callback(timed){
   	 		console.log(timed,111111111)
   	 	},
   	 	timerd(countshu){
   	 		this.countshu=countshu;
   	 		if(countshu==0){
   	 			this.api_refundapplyDetail();
   	 		}
   	 	}
   	 
	},
	created(){
		this.api_refundapplyDetail();
	}
}	
</script>
<style lang='less'>
@import '../../assets/css/component/Refund.less';
@import '../../assets/css/public/btn.css';
</style>