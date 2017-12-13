<template>
	<div class="selectadress" v-if='receive_data'>
		<div class="selectadress_main">
			<div class="administer" @click="jump()">管理</div>
			<ul class="selectadress_ul">
				<li v-for='(item,index) in receive_data.address_list'  @click="variation(item.id)">
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
					<div class="select_right">
						<img v-if='address_id==item.id' src="../../assets/img/shoppingcar_selected_h.png">
						<img v-else src="../../assets/img/shoppingcar_selected_n.png">
					</div>
				</li>
			</ul>
			<div class="new_add" @click="new_add()">新增收货地址</div>
		</div>
	</div>
</template>
<script>
import { addressall } from '../../http/api';
export default{
	data(){
		return {
			receive_data:null,	//收货地址的数据
			address_id:'', //收货地址的id
		}
	},
	methods:{
		/*点击改变默认地址*/
		variation(item_id){
			localStorage.setItem("temp",item_id);
			this.$router.push({path:"/confirmorder",query:{address_id:item_id}})
		},
		jump(){
			this.$router.push({path:"/management"})
		},
		/*跳转到新增地址*/
		new_add(){
			this.$router.push({path:"/addadress"})
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
		/*判断是从那个入口进来的*/
		if(this.$route.query.address_id){
			this.address_id=this.$route.query.address_id;
		}else{
			this.address_id=localStorage.getItem(['temp']);
		}
	}
}
</script>
<style lang="less">
@import '../../assets/css/component/selectadress.less';
</style>