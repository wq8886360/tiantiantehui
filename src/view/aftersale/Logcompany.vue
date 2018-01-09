<template>
	<div class="logcompany">
		<div class="logcompant_left">
			<div v-for='(item,index) in logcompany_data'>
				<div class="letter">{{item.first_letter}}</div>
				<ul class="logcom_ul content">
					<li :class="{active: index == liIndex}" @click='jump(itemm)' v-for='(itemm,index) in item.item_list'>{{itemm}}</li>
				</ul>
			</div>	
		</div>
		<div class="logcomant_right">
			<div @click='paging(index)' class="letter_c" v-for='(item,index) in letter_data'>{{item}}</div>
		</div>
	</div>
</template>
<script>
import {refundExpressList} from '../../http/api.js';
import BScroll from 'better-scroll';
export default{
	data(){
		return{
			logcompany_data:null, //物流公司的信息
			letter_data:null, //物流公司 字母分页
			liIndex: 0,
		}
	},
	methods:{
		/*物流公司的api*/
		api_refundExpressList(){
			refundExpressList({}).then((response)=>{
				let res = response.data;
				if(res.code==1000){
					this.logcompany_data=res.data.express_list;
					this.letter_data=res.data.first_letter_list;
					console.log(res)
				}
			})
		},
		/*跳转到退货退款页面*/
		jump(item){
			let refundd_id=this.$route.query.refund_id;
			this.$router.push({path:'/content',query:{item_name:item,show_null:1,refund_id:refundd_id}});
			
		},
		/*点击分页*/
		paging(index){	
			console.log(index)
		}
	},
	created(){
		this.api_refundExpressList()
	}
}	
</script>
<style lang='less'>
.logcompany{
	width: 100vw;
	border-top:1px solid #EEEEEE;
	overflow:hidden;
	margin-bottom: 1.05rem;
	.logcompant_left{
		width: 9.2rem;
		float: left;
		.letter{
			border-bottom:1px solid #EEEEEE;
			height: 1.05rem;
			line-height: 1.05rem;
			font-family: PingFang-SC-Bold;
			font-size: 0.4rem;
			color:#FB0036;
			text-indent: 0.27rem;
		}
		.logcom_ul{
			width: 9.2rem;
			li{
				width: 100%;
				height: 1.05rem;
				line-height: 1.05rem;
				border-bottom:1px solid #EEEEEE;
				text-indent: 0.27rem;
				font-family: PingFang-SC-Regular;
				color:#1C1B20;
				font-size: 0.37rem;
			}
		}
	}
	.logcomant_right{
		width: 0.8rem;
		float: right;
		.letter_c{
			font-family: PingFang-SC-Regular;
			color:#AAAAAA;
			font-size: 0.32rem;
			text-align: center;
			margin-top: 0.33rem;
		}
	}
}	
</style>