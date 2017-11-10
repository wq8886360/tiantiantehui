<template>
	<div class="profile" v-if="getdata">
		<div class="profile_m">
			<div class="profile_left">
				<img class="proflie_logo" :src="getdata.store_label" >
				<div class="profile_t">
					<span class="profile_mz">{{getdata.store_name}}</span>
					<span class="profile_d">店铺等级</span>
				</div>
			</div>
			<div class="profile_right">
				<div class="attention">
					<div @click="change()" :class="{attention_z:index==1,attention_b:index!=1}">
						<span class="attention_zt">{{msg}}</span>
					</div>
				</div>
				<span class="people">1669人</span>
			</div>
		</div>
		<div class="merchandise">
			<div class="merchandise_c">
				<span class="praise">商品好评率</span>
				<span class="praise_c">99.8%</span>
			</div>
		</div>
		<div class="appraise">
			<div class="appraise_c">
				<div class="appraise_h">
					<span class="evaluation">商品评价</span>
					<span class="fractions">4.92分</span>
					<span class="above">高于同行89.98%</span>
				</div>
				<div class="service">
					<span class="attitude">服务态度</span>
					<span class="fractions">4.92分</span>
					<span class="above">高于同行89.98%</span>
				</div>
				<div class="logistics">
					<span class="logistcn">物流服务</span>
					<span class="fractions">4.92分</span>
					<span class="above">高于同行89.98%</span>
				</div>	
			</div>	
		</div>
		<div class="Grey"></div>
		<div class="contact">
			<ul class="contact_c">
				<li class="contact_n">
					<span class="seller">联系卖家</span>
					<img class="message" src="../../assets/img/liuyan.png" >
				</li>
				<li class="contact_n">
					<span class="seller">服务电话</span>
					<span class="telephone">{{getdata.store_phone}}</span>
				</li>
				<li class="contact_n">
					<span class="seller">微信服务</span>
					<span class="telephone">{{getdata.store_wx}}</span>
				</li>
				<li style="border-bottom:1px solid transparent" class="contact_n">
					<span class="seller">店铺二维码</span>
					<img class="erweima" src="../../assets/img/erweima.png" >
				</li>
			</ul>
		</div>
		<div class="deposit">
			<div class="deposit_c">
				<ul class="deposit_ul">
					<li>
						<span class="cash">保证金</span>
						<span class="cash_y">{{getdata.paying_amount}}</span>
					</li>
					<li>
						<span class="cash">开店时间</span>
						<span class="cash_y">{{getdata.store_time}}</span>
					</li>
					<li style="border-bottom:1px solid transparent">
						<span class="license">营业执照</span>
						<i class="icon-right you"></i>
					</li>
				</ul>
			</div>
		</div>
		<div class="Grey_b"></div>
	</div>
</template>
<script>
import {introduce,addMark,delMark} from '../../http/api.js'
	export default{
		data(){
			return{
				index:1,
				msg:'关注',
				storeId:47,
				getdata:null,
				storeid:'26',
				isTrue:true
			}
		},
		methods:{
       		api_introduce(){
       			introduce({storeId:this.storeId}).then((response)=>{
       				console.log(response)
       				let res = response.data;
					if(res.code==1000){
						this.getdata=res.data;
					}
       			})
       		},
       		api_addMark(){
       			addMark({storeId:this.storeid}).then((response)=>{
       				console.log(response)
       				let res=response.data;
       				//console.log(res);
       				//  if(res.code==1000){
       				//  	this.index=2;
       				//  	this.msg='已关注';
       				// 	this.isTrue=false;
       				// 	alert('以关注')
       				// }
       			})
       		},
       		api_delMark(){
       			delMark({storeId:this.storeid}).then((response)=>{
       				console.log(response)
       				let res=response.data;
       				 // if(res.code==1000){
       				 // 	this.index=1;
       					// this.msg='关注';
       					
       					// alert('关注')
       				 // }
       			})
       		},
       		change(){
       			if(this.isTrue){
       				this.api_addMark();
       				this.isTrue=false;		
       			}else{
       				this.api_addMark();
       				alert(1)
       				this.isTrue=true;
       			}
       		}
       		
    	},
    	created(){
    		this.api_introduce();
    		
    	}
	}
</script>
<style>
/* --------头部---------- */
.profile{
	width: 100%;
	height: 100%;
	border-top:1px solid #D8D8D8;
}
.profile .profile_m{
	padding:0.3333333rem 0.2666667rem 0.3333333rem 0.2666667rem;
	background: #FFF;
	overflow: hidden;
}
/*头部左边*/
.profile .profile_m .profile_left{
	overflow: hidden;
	float: left;
}
.profile .profile_m .proflie_logo{
	width: 1.0666667rem;
	height: 1.0666667rem;
	float: left;
}
.profile_m .profile_left .profile_t{
	float: left;
	margin-left: 0.2666667rem;
}
.profile_m .profile_left .profile_t .profile_mz{
	font-family: 'PingFang-SC-Regular';
	font-size: 0.3733333rem;
	color:#1C1B20;
	display: block;
}
.profile_m .profile_left .profile_t .profile_d{
	font-family: 'PingFang-SC-Regular';
	color: #858585;
	font-size: 0.2933333rem;
}
/*头部右边*/
.profile_m .profile_right{
	float: right;
	position: relative;
	
}
.profile_m .profile_right .attention{
	max-width: 1.6rem;
	height:0.6266667rem;
	position: absolute;
	top: -0.1066667rem;
	box-sizing: border-box;
	right: 0px;
}
.profile_right .attention .attention_z{
	min-width: 1.6rem;
	height:0.6266667rem;
	text-align: center;
	background: url(../../assets/img/attentionWhite.png);
	background-size: 100% 100%;
}
.profile_right .attention .attention_b{
	min-width: 1.7rem;
	height:0.6266667rem;
	text-align: center;
	background: url(../../assets/img/attentionRed.png);
	background-size: 100% 100%;
}
.attention .attention_z .attention_zt{
	font-size: 0.32rem;
	color:#FFFFFF;
	line-height: 0.6266667rem;
	margin-left:0.2333333rem; 
}
.attention .attention_b .attention_zt{
	font-size: 0.32rem;
	color:#FB0036 ;
	line-height: 0.6266667rem;
	float: right;
	margin-right: 0.1rem;
}
.profile_right .people{
	text-align: center;
	color: #858585;
	font-size: 0.2933333rem;
	margin-top: 0.57733333rem;
	display: block;
	margin-right: 0.1rem;
	
}
/*商品好评率*/
.profile .merchandise{
	padding:0 0.2666667rem 0 0.2666667rem;
	background: #FFF;
}
.profile .merchandise_c{
	width: 100%;
	padding:0.3333333rem 0rem 0.3333333rem 0;
	height: 100%;
	border-top: 1px solid #D8D8D8;
	border-bottom: 1px solid #D8D8D8;
}
.profile .merchandise_c .praise{
	font-family: 'PingFang-SC-Medium';
	color: #1C1B20;
	font-size: 0.3733333rem;
}
.profile .merchandise_c .praise_c{
	font-family: 'PingFang-SC-Medium';
	color: #FB0036;
	font-size: 0.3733333rem;
	float: right;
}
/*商品评价区域*/
.profile .appraise{
	padding:0 0.2666667rem 0 0.2666667rem;
	background: #FFF;
}
.profile .appraise_c{
	width: 100%;
	padding:0.3333333rem 0rem 0.3333333rem 0;
	height: 100%;
}
.profile .appraise_c .appraise_h{
	margin-bottom: 0.36rem;
}
.profile .appraise_c .appraise_h .evaluation{
	font-family: 'PingFang-SC-Regular';
	font-size: 0.3733333rem;
	color:#858585;
	margin-right: 0.7733333rem;
}
.profile .appraise_c .appraise_h .fractions{
	color: #FB0036;
	font-size: 0.3733333rem;
	font-family: 'PingFang-SC-Regular';
	margin-right: 0.8rem;
}
.profile .appraise_c .appraise_h .above{
	color: #FB0036;
	font-size: 0.3733333rem;
	font-family: 'PingFang-SC-Regular';
}
/*服务态度*/
.profile .appraise_c .service{
	margin-bottom: 0.36rem;
}
.profile .appraise_c .service .attitude{
	font-family: 'PingFang-SC-Regular';
	font-size: 0.3733333rem;
	color:#858585;
	margin-right: 0.7733333rem;
}
.profile .appraise_c .service .fractions{
	color: #FB0036;
	font-size: 0.3733333rem;
	font-family: 'PingFang-SC-Regular';
	margin-right: 0.8rem;
}
.profile .appraise_c .service .above{
	color: #FB0036;
	font-size: 0.3733333rem;
	font-family: 'PingFang-SC-Regular';
}
/*物流服务*/
.profile .appraise_c .logistics .logistcn{
	font-family: 'PingFang-SC-Regular';
	font-size: 0.3733333rem;
	color:#858585;
	margin-right: 0.7733333rem;
}
.profile .appraise_c .logistics .fractions{
	color: #FB0036;
	font-size: 0.3733333rem;
	font-family: 'PingFang-SC-Regular';
	margin-right: 0.8rem;
}
.profile .appraise_c .logistics .above{
	color: #FB0036;
	font-size: 0.3733333rem;
	font-family: 'PingFang-SC-Regular';
}
/**/
.profile .Grey{
	width: 100%;
	height: 0.2666667rem;
	background: #F7F7F7;
}
/*联系卖家列表*/
.profile .contact{
	background: #FFF;
}
.profile .contact_c{
	padding-left: 0.2666667rem;
	padding-right: 0.2666667rem;
}
.profile .contact_n{
	width: 100%;
	padding:0.3333333rem 0rem 0.3333333rem 0rem;
	height: 100%;
	border-bottom: 1px solid #D8D8D8;
}
.profile .contact_n .seller{
	font-family: 'PingFang-SC-Medium';
	color: #1C1B20;
	font-size: 0.3733333rem;
}
.profile .contact_n .message{
	width: 0.48rem;
	height: 0.48rem;
	float: right;
}
.profile .contact_n .telephone{
	font-family: 'PingFang-SC-Medium';
	color: #858585;
	font-size: 0.3733333rem;
	float: right;
}
.profile .contact_n .erweima{
	width: 0.5066667rem;
	height: 0.5066667rem;
	float: right;
}
/*保证金下面的列表*/
.profile .deposit{
	margin-top: 0.2666667rem;
	background: #FFF;
}
.profile .deposit_ul{
	padding-left: 0.2666667rem;
	padding-right: 0.2666667rem;
}
.profile .deposit_ul li{
	width: 100%;
	padding:0.3333333rem 0rem 0.3333333rem 0rem;
	height: 100%;
	border-bottom: 1px solid #D8D8D8;
}
.profile .deposit_ul li .cash{
	font-family: 'PingFang-SC-Medium';
	color: #1C1B20;
	font-size: 0.3733333rem;
}
.profile .deposit_ul li .cash_y{
	font-family: 'PingFang-SC-Medium';
	color: #858585;
	font-size: 0.3733333rem;
	float: right;
}
.profile .deposit_ul li .license{
	font-family: 'PingFang-SC-Medium';
	color: #1C1B20;
	font-size: 0.3733333rem;
}
.profile .deposit_ul li .you{
	float: right;
	font-size: 0.16rem;
	margin-top: 0.1rem;
}
.profile .Grey_b{
	width: 100%;
	background: #F7F7F7;
	height: 0.5733333rem;
}
</style>