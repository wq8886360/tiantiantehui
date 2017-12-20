<template>
	<div class="addadress">
		<div class="deleting" @click="deleting" v-show='receive_data'>删除</div>
		<group label-width="2.4rem">
			<x-input title='收货人' placeholder="请输入收货人" type="text" :max="12" v-model="info.realname.value"></x-input>
			<x-input title='手机号码' placeholder="请输入常用的手机号码" type="tel" v-model="info.mobile.value"></x-input>
			<div class="icon_p">
				<x-address class="address" title="省市区" placeholder="点击选择" v-model="info.address.value" raw-value :list="addressData" value-text-align="left"></x-address>
				<i class="icon-location" @click="location"></i>
			</div>	
			<x-textarea v-model="info.addresstext.value" title="详细地址" :max="30" placeholder="请输入详细地址（5-30个字）"></x-textarea>
		</group>
		<div class="adswi">
			<x-switch title="设为默认地址" v-model="isdefault" :value-map="[0,1]"></x-switch>
		</div>
		
		<!-- 保存按钮 -->
		<div v-if='receive_data' class="preservation" @click="edit">保存</div>
		<div v-else class="preservation" @click="preservation">保存</div>
		<div v-transfer-dom>
      		<confirm v-model="show" @on-confirm="onConfirm">
      			<strong class="weui-dialog__title">提示</strong>
      			<div class="sure_n">确定删除该地址</div>
      		</confirm>
   		</div>
	</div>
</template>
<script>
import { XInput, Group, XTextarea, XAddress, ChinaAddressV4Data, XSwitch,Confirm,TransferDomDirective as TransferDom } from 'vux'
import { addressadd ,addressall,modification,deletet} from '../../http/api'
export default{
	directives: {
    	TransferDom
 	 },
	components: {
		XInput,
		Group,
		XAddress,
		XTextarea,
		XSwitch,
		Confirm,
	},
	data(){
		return{
			info:{
				realname: {value: "", message: "请输入收货人姓名"},
				mobile: {value: "", message: "请输入常用手机号码"},
				address: {value: [],message: "请输入省市区信息"},
				addresstext: {value:"", message: "请输入详细地址"}
			},
			isdefault:0, //是否默认
			addressData: ChinaAddressV4Data, //省市区信息
			receive_data:null, //地址数据
			address_id:null, //地址的Id
			show:false, //弹窗的状态
			selected:null, //点击编辑然后遍历后的数组
		}
	},
	watch:{
		isdefault(){
			console.log(this.isdefault,23)
		}
	},
	methods:{
		location(){
			let _this = this;
			let latitude; //纬度
			let longitude; //经度
			if(navigator.geolocation){
                //浏览器支持geolocation
                navigator.geolocation.getCurrentPosition(function(position){
                	alert(position)
                },function(error){
                	console.log(error)
                	_this.$vux.toast.text("请打开定位功能", 'middle');
                });
            }else{
                _this.$vux.toast.text("浏览器不支持地理位置定位", 'middle');
            }
		},
		/*点击保存 验证*/
		preservation(){
			let mes = [];
			function Trim(str,is_global){
				var result;
				result = str.replace(/\s/g,"");
				return result;
			}
			//是否输入
			for(let i in this.info){
				if(typeof this.info[i].value == 'string'){
					if(Trim(this.info[i].value).length <= 0){
						mes.push(this.info[i]['message'])
					}
				}else{
					if(this.info[i].value.length <= 0){
						mes.push(this.info[i]['message'])
					}
				}
			}
			if(Trim(this.info.realname.value).length < 2 || Trim(this.info.realname.value).length > 12){
				mes.push("收货人姓名2~12个字以内")
			}
			if(Trim(this.info.addresstext.value).length < 5 || Trim(this.info.addresstext.value).length > 120){
				mes.push("详细地址5~120个字以内")
			}
			if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.info.mobile.value))){
				mes.push("手机号格式错误，请重新输入")
			}
			if(mes.length == 0){
				let params = {
					realname: this.info.realname.value,
					mobile: this.info.mobile.value,
					address: this.info.addresstext.value,
					isdefault: this.isdefault,
					district_ids: this.info.address.value.join(',')
				}
				addressadd(params).then((response) => {
					console.log(response)
					if(response.data.code == 1000){
						this.$router.push({path: '/selectadress'})
					}else{
						this.$vux.toast.text(mes[0], 'middle');
					}
				})
			}else{
				this.$vux.toast.text(mes[0], 'middle');
			}
		},
		/*编辑之后保存 验证*/
		edit(){
			let mes = [];
			function Trim(str,is_global){
				var result;
				result = str.replace(/\s/g,"");
				return result;
			}
			//是否输入
			for(let i in this.info){
				if(typeof this.info[i].value == 'string'){
					if(Trim(this.info[i].value).length <= 0){
						mes.push(this.info[i]['message'])
					}
				}else{
					if(this.info[i].value.length <= 0){
						mes.push(this.info[i]['message'])
					}
				}
			}
			if(Trim(this.info.realname.value).length < 2 || Trim(this.info.realname.value).length > 12){
				mes.push("收货人姓名2~12个字以内")
			}
			if(Trim(this.info.addresstext.value).length < 5 || Trim(this.info.addresstext.value).length > 120){
				mes.push("详细地址5~120个字以内")
			}
			if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.info.mobile.value))){
				mes.push("手机号格式错误，请重新输入")
			}
			if(mes.length == 0){
				let params = {
					realname: this.info.realname.value,
					mobile: this.info.mobile.value,
					address: this.info.addresstext.value,
					isdefault: this.isdefault,
					district_ids: this.info.address.value.join(',')
				}
				modification({address_id:this.address_id,realname:this.info.realname.value,mobile:this.info.mobile.value,district_ids:this.info.address.value.join(','),address	:this.info.addresstext.value,isdefault:this.isdefault}).then((response)=>{
					if(response.data.code==1000){
						this.$router.push({path:"/management"})
					}
					if(response.data.code==-1000){
						this.$router.push({path:"/management"})
					}
				})
			}else{
				this.$vux.toast.text(mes[0], 'middle');
			}
		},
		/*删除收货地址api*/
		detelld_api(){
			deletet({address_id:this.address_id}).then((response) => {
				let res=response.data;
				if(res.code==1000){
					addressall().then((response) => {
						let res=response.data;
						if(res.code==1000){
							this.$router.push({path:"/management"})
						}
					})
				}
			})	
		},
		/*编辑页面点击删除出现弹窗*/
		deleting(){
			this.show=true;
		},
		/*删除弹窗出现点击确定删除收货地址*/
		onConfirm () {
			this.detelld_api();	
   		},
	},
	created(){
		/*从管理收货地址进来*/
		if(this.$route.query.address_id){
			var index=this.$route.query.index;
			addressall().then((response) => {
				let res=response.data;
				if(res.code==1000){
					this.receive_data=res.data.address_list;
					this.selected=[];
					let selected=this.receive_data.map((val,index,arr)=>{
						if(val.id==this.$route.query.address_id){
							return val
						}
					})
					console.log(selected)
					this.address_id=selected[index].id;
					this.info.realname.value=selected[index].realname;
					this.info.mobile.value=selected[index].mobile;
					this.info.addresstext.value=selected[index].address;
					this.isdefault=Number(selected[index].isdefault);
					this.info.address.value=selected[index].district_ids;
				}
			})
		}
	}
}
</script>
<style lang="less">
.addadress{
	width: 100%;
	height: 100vh;
	background: #F7F7F7;
	position: relative;
	.deleting{
		font-size: 0.4rem;
		font-family: PingFang-SC-Regular;
		color: #858585;
		padding: 0.3rem 0.27rem 0.3rem 0.27rem;
		text-align: right;
		background: #ffff;
		margin-bottom: 0.27rem;
	}
	.address{
		.weui-cell__ft{
			display: none!important;
		}
	}
	.icon_p{
		position: relative;
		.icon-location{
			position: absolute;
			right: 0.27rem;
			top: 0.24rem;
			font-size: 0.48rem;
			color: #FB0036;
		}
	}
	.adswi{
		margin-top: 0.27rem;
		background: #fff;
	}
	.preservation{
		width: 100%;
		background: #FB0036;
		color: #fff;
		font-size: 0.4rem;
		height: 1.33rem;
		line-height: 1.33rem;
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.weui-cells{
		margin: 0!important;
		padding: 0!important;
	}
	.weui-cells:after{
		border: none!important;
	}
	.weui-cells:before{
		border: none!important;
	}
	.weui-cell:before{
		border: none!important;
	}
	.weui-cell{
		border-bottom: 1px solid #EEEEEE;
		font-size: 0.37rem!important;
		padding-right: 15px!important;
		padding-left: 15px!important;
	}
	.weui-label{
		font-size: 0.37rem!important;
	}
	.vux-cell-box:before{
		border: none!important;
	}
	.weui-switch{
		-webkit-appearance: none;
		appearance: none;
	}
	.weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box {
	    border-color: #FB0036!important;
	    background-color: #FB0036!important;
	}
}
.vux-cell-value{
	color: black!important;
}
.vux-popup-header-right{
	color: #FB0036!important;
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