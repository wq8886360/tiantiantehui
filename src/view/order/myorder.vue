<template>
	<div class="myorder">
		<search v-model="value" position="absolute" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search">
   		</search>
		<tab :line-width="1" custom-bar-width="60px">
      		<tab-item selected @on-item-click="onItemClick">全部</tab-item>
      		<tab-item @on-item-click="onItemClick">待付款</tab-item>
      		<tab-item @on-item-click="onItemClick">待发货</tab-item>
      		<tab-item @on-item-click="onItemClick">待收货</tab-item>
      		<tab-item @on-item-click="onItemClick">待评价</tab-item>
   		</tab>
   		<div class="components">
   			<allorder :dataValue='value' v-if='index==0'></allorder>
   			<evaluate :dataValue='value' v-if='index==4'></evaluate>
   		</div>
	</div>
</template>

<script>
import { Tab, TabItem,Search} from 'vux'
import allorder from './allorder';
import evaluate from './evaluate'
export default{
	components: {
		Tab,
		TabItem,
		Search,
		'allorder':allorder,
		'evaluate':evaluate
	},
	watch:{
		value(){
			// console.log(this.value)
		}
	},
	data(){
		return{
      		value: '搜索所有的订单', //搜索框里面的提示
      		index:0, //tab切换的索引值
		}
	},
	methods:{
		onItemClick(index){
			this.index=index;
		},
		onFocus(){
			console.log('1')
		},
		onSubmit(){
			console.log('2')
		},
		onCancel(){
			console.log('3')
		}
	},
	created(){

	}
}
</script>
<style lang="less">
.myorder{
	width: 100vw;
	height: 100%;
	background: #F7F7F7;
}
.weui-search-bar{
	background-color: #FFFFFF !important;
}
.weui-search-bar__box{
	background-color: #EDEDED !important;
}
.weui-search-bar:before{
	border-top:1px solid transparent !important;
}
.weui-search-bar:after{
	border-bottom:1px solid transparent !important;
}
.weui-search-bar__box .weui-search-bar__input{
	color:#858585 !important;	
	font-size: 0.37rem !important;
}
.weui-search-bar__cancel-btn{
	color:#1C1B20  !important;
	font-size: 0.37rem !important;
	font-family: PingFang-SC-Regular !important;
}
.vux-tab .vux-tab-item{
	background: none !important;
}
.vux-tab .vux-tab-item.vux-tab-selected{
	color:#FB0036 !important;
	border-bottom:1px solid transparent !important;
}
.vux-tab-bar-inner{
	background: #FB0036 !important;
	height: 0.03rem !important;
}
</style>