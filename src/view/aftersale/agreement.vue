<template>
	<div class="Agreement" v-if='agreement_data'>
		<div class="Agreement_main">
			<timeline>
				<div v-for='(item,index) in agreement_data'>
					<timeline-item>
						<div class="Agreement_top">
							<img class="logo" :src="item.user_thumb" alt="">
							<span class="text">{{item.username}}</span>
							<div class="title">
								<span class="message">{{item.status_msg}}</span>
								<span class="timer">{{item.time}}</span>
							</div>
							<div class="agreement_c">
								<div class="triangle" v-if='item.content.length!=0'></div>
								<div class="agreement_mess" v-if='item.content.length!=0'>
									<div style='margin-bottom:0.27rem;' v-for='(itemm,index) in item.content'>
										<span class="capy">{{itemm.label}}：</span>
										<span class='capy_car'>{{itemm.title}}</span>
									</div>
								</div>
								<div class="credentials" v-if='item.images.length!=0'>
									<div class="credentials_top">凭证</div>
									<img v-for='(ited,index) in item.images' class="photo_c" :src="ited"  alt="">
								</div>
							</div>
						</div>
					</timeline-item>	
				</div>
			</timeline>	
		</div>
		<div class="contact_con">
			<div class="merchants_doc">
				<img src="../../assets/img/liuyan.png" alt="">
				<span>联系商家</span>
			</div>
		</div>
	</div>
</template>
<script>
import { Timeline, TimelineItem} from 'vux'
import {refundapplyLogList} from '../../http/api.js'
export default{
	components: {
  		Timeline,
  		TimelineItem, 		
  	},
	data(){
		return{
			agreement_data:null,
		}
	},
	methods:{
		/*协商历史api*/
		api_refundapplyLogList(){
			let refund_id=this.$route.query.refund_id;
			refundapplyLogList({refund_id:refund_id}).then((response)=>{
				let res=response.data
				if(res.code==1000){
					console.log(res)
					this.agreement_data=res.data.history_list;
				}
			})
		}
	},
	created(){
		this.api_refundapplyLogList();
	}
}	
</script>
<style lang='less'>
@import '../../assets/css/component/agreement.less';
</style>