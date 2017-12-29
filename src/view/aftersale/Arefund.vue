<template>
	<div class="Arefund">
		<!-- 商品头部 -->
		<div class="bar-mer-head">退货商品</div>
		<!-- 退款内容 -->
		<div class="bar-mer-con">
			<img class="bar-img" src="" alt="">
			<div class="bar-con-intro">
				<p class="introduce">adidas 阿迪达斯 足球 男子 COPA 18.2 FG 足球鞋 BB6357</p>
				<div class="intro-color"><span>亮白</span>/<span>1号黑色</span>/<span>质感金</span></div>
				<div class="intro-num">
					<x-number class="intro-number"  :min="1"></x-number>  <!-- 里面拿走了v-model="goodNum" -->
				</div>
			</div>
			<div class="bar-price">￥799.00</div>
		</div>
		<!-- 退款金额 -->
		<div class="coin">
			<div class="coin_all">
				<div class="coin_top">
					<span class="money_t">退款金额：</span>
					<span class="money">￥168.00</span>
				</div>
				<div class="line"></div>
				<div class="coin_b">
					<span>你最多能退￥177.6，含邮费￥5</span>
				</div>
			</div>
		</div>
		<!-- 退款原因 -->
		<div class="bar-mer-cau" @click="attrsState = true">
			<span>退款原因</span>
			<div class="bar_right">
				<span v-if='reason==null' class="cause">请选择</span>
				<span class="cause" v-else>{{reason}}</span>
				<i class="icon-right right_c"></i>
			</div>
		</div>
		<!-- 退款说明 -->
		<div class="bar-mer-exp"><p class="bme">退款说明: </p></div>
		<!-- 上传凭证 -->
		<div class="up-gist">
			<div class="gist">上传凭证</div>
			<div class="up-pic"></div>
		</div>
		<!-- 提交申请 -->
		<div class="refer-apply">提交申请</div>
		<!-- 退款原因弹窗 -->
		<div v-transfer-dom>
			<popup class='tjiao' v-model="attrsState" position="bottom" max-height="80%">	
				<img src="../../assets/img/close_gray.png" alt="" class="Shut" @click='attrsState=false'>
			 	<checklist @on-change="changer" label-position="left" :title="title" :options="commonList" v-model="radioValue" :max="1"></checklist>
			 	<div class="sure" @click='attrsState=false'>关闭</div>
			</popup>
		</div>
	</div>
</template>

<script>
import { XNumber, Popup,TransferDom,Checklist} from 'vux'
export default{
	directives: {
		TransferDom
	},
	components: {		
    	XNumber, 
    	Popup, 
    	Checklist
	},	
	data(){
		return {
			commonList: [ '拍错/多拍不想要', '协商一致退货','大小/尺寸与商品描述不符','颜色/图案/款式与商品描述不符','其他'],
			attrsState:false, //货物的弹窗的状态
			title:'退款原因', //货物的弹窗的标题
			radioValue:[], 
			reason:'请选择', //货物的弹窗的val
		}
	},
	methods: {
	 	changer(val, label) {
			this.reason=val[0];
   	 	},
	},




}	
	
</script>

<style lang='less'>
.Arefund {
	position: relative;
	background-color: #F7F7F7;
	margin-bottom: 1.33rem;
	/*商品头部*/
	.bar-mer-head {
		box-sizing: border-box;
		font-size: 0.37rem;
		padding: 0.35rem 0.27rem;
		border-top: 0.01rem solid #D8D8D8;
		background-color: #fff;
	}
	/*退款内容*/
	.bar-mer-con {
		box-sizing: border-box;
		padding: 0.27rem 0.27rem 0.83rem 0.27rem;
		border-top:0.01rem solid #eee;
		overflow: hidden;
		background-color: #fff;
		.bar-img {
			width: 2.53rem;
			height: 2.53rem;
			
			float: left;
		}
		/*中间内容介绍*/
		.bar-con-intro {
			width: 4.89rem;
			float: left;
			margin-left: 0.35rem;
			.introduce {
				font-size: 0.35rem;
			}
			.intro-color {
				color: #858585;
				font-size: 0.32rem;
				margin-top: 0.11rem;
			}
			.intro-number {
				float: left !important; 
			}
		}
		.bar-price {
			float: right;
			font-size: 0.37rem;
		}
	}
	.weui-cell {
		padding: 0 !important;
	    margin-top: 0.11rem !important;
	    margin-right: 0.72rem !important;
	}
	
	/*退款原因*/
	.bar-mer-cau {
		margin-top: 0.27rem;
		box-sizing: border-box;
		padding: 0.49rem 0.27rem;
		font-size: 0.37rem;
		background-color: #fff;
	}
	.bar_right{
		float: right;
		.cause{
			vertical-align: middle;
			color:#858585;
			font-size: 0.37rem;
		}
		i{
			vertical-align: middle;
			font-size: 15px;
		}
	}
	.bar-mer-cau .cause .icon-right{
		margin-left: 0.27rem;
	}
	/*退款金额*/
	.coin{
		width: 100vw;
		min-height: 1.8rem;
		background: #fff;
		margin-top: 0.27rem;
		.coin_all{
			padding: 0.35rem 0.27rem 0.35rem 0.27rem;
			.money_t{
				font-weight: PingFang-SC-Regular;
				color:#1C1B20;
				font-size: 0.37rem;
			}
			.money{
				font-family: PingFang-SC-Regular;
				color:#FB0036;
				font-size: 0.37rem;
			}
			.line{
				width: 100%;
				height: 1px;
				background: #EEEEEE;
				margin-top: 0.36rem;
			}
			.coin_b{
				margin-top: 0.2rem;
				span{
					font-family: PingFang-SC-Regular;
					color:#858585;
					font-size: 0.32rem;
				}
			}
		}
	}




	/*退款说明*/
	.bar-mer-exp {
		margin-top: 0.27rem;
		min-height: 1.99rem;
		box-sizing: border-box;
		padding: 0.27rem;
		font-size: 0.37rem;
		background-color: #fff;
	}
	/*上传凭证*/
	.up-gist {
		margin-top: 0.27rem;
		min-height: 6.28rem;
		box-sizing: border-box;
		padding: 0.53rem 0.27rem 1.6rem;
		background-color: #fff;
	}
	.up-gist .up-pic {
		width: 100%;
		height: 4.88rem;
		background-color: pink;
		margin-top: 0.36rem;
	}
	/*提交申请*/
	.refer-apply {
		position: fixed;
		width: 100%;
		height: 1.33rem;
		bottom: 0;
		left: 0;
		background: #FB0036;
		text-align: center;
		line-height: 1.33rem;
		font-size: 0.43rem;
		color: #fff;
	}
}
.tjiao .sure{
	width: 100vw;
	height: 1.33rem;
	background: #FB0036;
	color:#fff;
	font-size: 0.43rem;
	text-align: center;
	line-height: 1.33rem;
	margin-top: 2.72rem;
}
.weui-cell{
	font-size: 0.37rem !important;
	font-family: PingFang-SC-Regular !important;
	color:#1C1B20 !important;
}
.weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
	color: #FB0036 !important;
}
.weui-cells__title{
	color:#1C1B20 !important;
	font-family: PingFang-SC-Regular !important;
	font-size: 0.43rem!important;
	text-align: center !important;
	margin-bottom: 0.45rem !important;
}
.tjiao .Shut{
	position: absolute;
	top: 0.4rem;
	right: 0.27rem;
}
.intro-number .vux-number-selector svg{
	fill:#AAAAAA !important;
}
</style>


