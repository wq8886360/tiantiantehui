<template>
	<div class="management" v-if='receive_data'>
		<ul class="management_ul">
			<li v-for='(item,index) in receive_data.address_list'>
				<div class="management_top">
					<div class="messages">
						<span class="name">{{item.realname}}</span>
						<span class="mobile">{{item.mobile}}</span>
					</div>
					<div class="address">{{item.detail_address}}</div>
					<div class="line"></div>
					<div class="management_bottom">
						<div class="management_left" @click='elect(index,item.id)'>
							<img class="photo" v-if='item.isdefault==1' src="../../assets/img/shoppingcar_selected_h.png" alt="">
							<img class="photo" v-else src="../../assets/img/shoppingcar_selected_n.png">
							<span class="acquiescence" v-if='item.isdefault==1'>默认地址</span>
							<span class="acquiescence_e" v-else>设置为默认地址</span>
						</div>
						<div class="management_right">
							<span class="edit" @click='Edit_success(item.id,index)'>编辑</span>
							<span class="delete" @click="deletet(item.id)">删除</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="new_add" @click="new_add()">新增收货地址</div>
		<div v-transfer-dom>
      		<confirm v-model="show" @on-confirm="onConfirm">
      			<strong class="weui-dialog__title">提示</strong>
      			<div class="sure_n">确定删除该地址</div>
      		</confirm>
   		</div>
	</div>
</template>
<script>
import {Confirm,TransferDomDirective as TransferDom} from 'vux';
import { addressall,deletet,modification} from '../../http/api';
export default{
	directives: {
    	TransferDom
 	 },
	components: {
		Confirm,
	},
	data(){
		return{
			receive_data:null, //收货地址的数据
			show:false, //删除弹窗的状态
			address_id:null,//地址id
		}
	},
	methods:{
		addressall_api(){
			addressall().then((response) => {
				let res=response.data;
				if(res.code==1000){
					console.log(res.data)
					this.receive_data=res.data;
				}
			})
		},
		/*点击设置默认地址*/
		elect(index,item_id){
			addressall().then((response) => {
				let res=response.data;
				if(res.code==1000){
					console.log(res.data)
					this.receive_data=res.data;
					this.receive_data.address_list.map((val,index,arr)=>{
						val.isdefault=0;
					})
					this.receive_data.address_list[index].isdefault=1;
					modification({address_id:item_id,isdefault:this.receive_data.address_list[index].isdefault}).then((response) => {
						let res=response.data;
						if(res.code==1000){
							this.addressall_api();
						}
					})
				}
			});
		},
		/*删除收货地址api*/
		api_delete(){
			deletet({address_id:this.address_id}).then((response) => {
				let res=response.data;
				if(res.code==1000){
					this.addressall_api();
				}
			})	
		},
		/*删除收货地址*/
		deletet(item_id){
			this.show=true;
			this.address_id=item_id;
		},
    	onConfirm () {
    		this.api_delete();
    	},
		/*跳转到新增地址*/
		new_add(){
			this.$router.push({path:"/addadress"})
		},
		Edit_success(address_id,index){
			this.$router.push({path:"/addadress",query:{address_id:address_id,index:index}})
		}
	},
	created(){
		/*地址api*/
		this.addressall_api();
	}
}
</script>
<style lang='less'>
.management{
	width: 100vw;
	height: 100%;
	border-top:1px solid #D8D8D8;
	margin-bottom: 1.33rem;
	background: #f7f7f7;
	.management_ul{
		width: 100%;
		height: 100%;
		li{
			padding: 0.52rem 0.27rem 0.52rem 0.27rem;
			overflow: hidden;
			margin-bottom: 0.27rem;
			background: #fff;
			.management_top{
				width: 100%;
				height: 100%;
				.messages{
					overflow: hidden;
					.name{
						width: 5.0rem;
						float: left;
						display: inline-block;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size: 0.37rem;
						font-family: PingFang-SC-Regular;
						color:#1C1B20;
					}
					.mobile{
						float: right;
						margin-right: 0.13rem;
						font-family: PingFang-SC-Regular;
						color:#1C1B20;
						font-size: 0.37rem;
					}
				}
				.address{
					font-family: PingFang-SC-Regular;
					font-size: 0.32rem;
					color:#1C1B20;
					margin-top: 0.15rem;
				}
				.line{
					width: 100%;
					height: 1px;
					background: #EEEEEE;
					margin-top: 0.52rem;
				}
				.management_bottom{
					overflow: hidden;
					width: 100%;
					.management_left{
						float: left;
						margin-top: 0.43rem;
						.photo{
							width: 0.45rem;
							height: 0.45rem;
							vertical-align: middle;
							margin-right: 0.2rem;
						}
						.acquiescence{
							font-family: PingFang-SC-Regular;
							font-size: 0.37rem;
							color:#FB0036;
							vertical-align: middle;
						}
						.acquiescence_e{
							font-family: PingFang-SC-Regular;
							font-size: 0.37rem;
							vertical-align: middle;
						}
					}
					.management_right{
						float: right;
						margin-top: 0.43rem;
						.edit{
							margin-right: 0.45rem;
						}
						span{
							vertical-align: middle;
							font-size: 0.37rem;
							color:#1C1B20;
							font-family: PingFang-SC-Regular;
						}
					}
				}		
			}
		}
	}
	.new_add{
		width: 100vw;
		height: 1.33rem;
		background: #FB0036;
		font-size: 0.4rem;
		color:#FAFAFA;
		text-align: center;
		line-height: 1.33rem;
		position: fixed;
		bottom: 0px;
	}
}
.weui-dialog__title{
	margin-top: -0.2rem !important;
}
.weui-dialog__btn_primary{
	color: #FB0036;
}
.weui-dialog__bd .sure_n{
	margin-top: 0.3rem;
	color:#999999;
	font-size: 0.21rem;
}
</style>