<template>
	<div class="selectadress" v-if='receive_data'>
		<div class="selectadress_main">
			<div class="administer" @click="jump()">管理</div>
			<ul class="selectadress_ul">
				<li v-for='(item,index) in receive_data.address_list'>
					<div class="select_left">
						<div class="selectadressli_top">
							<span class="name">{{item.realname}}</span>
							<span class="mobile">{{item.mobile}}</span>
						</div>
						<div class="address">
							<span v-show='item.isdefault==1' class="acquiescence">默认地址</span>
							<span class="address_e">{{item.detail_address}}</span>
						</div>
					</div>
					<div class="select_right" @click="variation(item.id)">
						<img v-if='this_id==item.id' src="../../assets/img/shoppingcar_selected_h.png">
						<img v-else src="../../assets/img/shoppingcar_selected_n.png">
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { addressall } from '../../http/api';
export default{
	components: {
    
	},
	data(){
		return {
			receive_data:null,	//收货地址的数据
			this_id:'66', //收货地址的id
		}
	},
	methods:{
		/*点击改变默认地址*/
		variation(item_id){
			console.log(item_id)
		},
		jump(){
			this.$router.push({path:"/management"})
		}
	},
	created(){
		/*地址api*/
		addressall().then((response) => {
			let res=response.data;
			if(res.code==1000){
				console.log(res.data)
				this.receive_data=res.data;
			}
		})
	}
}
</script>
<style lang="less">
@import '../../assets/css/component/selectadress.less';
</style>