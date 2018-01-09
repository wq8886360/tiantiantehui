<template>
	<div class="Offerdetails">
		<div style="width:100%;overflow:auto; margin:0.333333rem 0;-webkit-overflow-scrolling : touch;" class='disConut'> 
    		<div style="width:100040px;color:white;-webkit-overflow-scrolling: touch;" v-if='offerdetails_length!=0'>       
        		<div class='disCountBox' style="float:left;-webkit-overflow-scrolling: touch;" v-for='item in offerdetails_data'>
        			<img v-if="item.is_get=='0'" class='ImgBox' src="../../assets/img/discount.png" alt="">
        			<img v-if="item.is_get=='1'" class='ImgBox' src="../../assets/img/discountCoupon.png" alt="">
					<div class='CouponsLeft'><span>￥</span><b>{{item.denomination}}</b></div>
					<div class='CouponsRight'><p>优惠券</p><p v-if='item.use_condition!=0'>满{{item.use_condition}}元可用</p><p v-else>无门槛</p></div>
        		</div>
    		</div>
		</div>
	</div>
</template>
<script>
import {goodsdetail} from '../../http/api.js'
export default{
	data(){
		return{
			offerdetails_data:null,
			goodd_id:null,
			offerdetails_length:null,
		}
	},
	methods:{
		goodsdetail_api(){
			goodsdetail({goods_id:54}).then((response)=>{
				let res=response.data;
				if(res.code==1000){
					
					this.offerdetails_data=res.data.voucher;
					console.log(this.offerdetails_data)
					this.offerdetails_length=this.offerdetails_data.length;
					console.log(res)
				}
			})
		}
	},
	created(){
		this.goodsdetail_api();
	}
}
</script>
<style lang='less'>
	  
/* ----------------优惠券------------------- */
	.Offerdetails .disCountBox{
		width:3.866667rem;
		height:1.6rem;
		position:relative;
		margin:0 0.066667rem;
	}
	.Offerdetails .disCountBox img{
		position:absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
	}
	.Offerdetails .disCountBox .CouponsLeft{
		position:absolute;
		left:0;
		top:0;
		width:1.733333rem;
		height:100%;
	}
	.Offerdetails .disCountBox .CouponsLeft span{
		font-size:0.266667rem;
		position: absolute;
		left:0.16rem;
		top:0.88rem;
		height:0.2rem;
		line-height: 0.2rem;
	}
	.Offerdetails .disCountBox .CouponsLeft b{
		font-size:0.733333rem;
		position: absolute;
		left:0.42rem;
		top:0.553333rem;
		height:0.56rem;
		line-height:0.56rem;
	}
	.Offerdetails  .CouponsRight{
		width:2.133333rem;
		float:left;
		height:100%;
		box-sizing: border-box;
		padding:0.28rem 0 0.28rem 0.1rem;
		position:absolute;
		left:1.733333rem;
		top:0;
	}
	.Offerdetails .CouponsRight p:last-child{
		position:absolute;
		bottom:0.28rem;
		font-size:0.266667rem;
		height:0.266667rem;
		line-height: 0.266667rem;
	}
	// .Offerdetails::-webkit-scrollbar{
	// 	height:0px
	// }
</style>