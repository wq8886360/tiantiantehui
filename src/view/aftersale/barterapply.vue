<template>
	<div class="barterapply">
		<!-- 商品头部 -->
		<div class="bar-mer-head">换货商品</div>
		<!-- 换货内容 -->
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
		<!-- 换货原因 -->
		<div class="bar-mer-cau" @click="barcau = true">换货原因 <span class="cause">大小/尺寸与描述不符 <i class="icon-right right"></i></span></div>
		<!-- 换货说明 -->
		<div class="bar-mer-exp"><p class="huhsm">换货说明: </p><textarea name="a" class="bem"></textarea> </div>
		<!-- 上传凭证 -->
		<Imaged></Imaged>
		<!-- 提交申请 -->
		<div class="refer-apply" @click="present">提交申请</div>
		<!-- 换货原因弹窗 -->
		<div v-transfer-dom class="tanchuang">
			<popup v-model="barcau" position="bottom" height="66%">
				<div class="barpop" >
					<p class="barpop-cus" style="font-size:0.43rem;text-align: center;padding: 0.45rem 0.27rem;">换货原因<i class="icon-close right" style="margin-top:0.07rem;" @click="barcau = false"></i></p>
					<p class="popcus">
						<checklist :options="commonList" :max="1" @on-change="change"></checklist>  <!-- v-model="radioValue" -->
					</p>
					<!-- 底部 -->
					<div class="barbootom" style="position: fixed;width: 100%;height: 1.33rem;background-color:#FB0036;
					color:#fff;bottom: 0;left: 0;font-size: 0.43rem;text-align: center;line-height: 1.33rem; " @click="barcau = false">关闭</div>
				</div>
			</popup>
		</div>
	</div>
</template>

<script>
import Imaged from './public/img.vue'
import { XNumber, Popup,TransferDom,Checklist} from 'vux'
export default{
	directives: {
		TransferDom
	},
	components: {		
    	XNumber, 
    	Popup, 
    	Checklist,
    	Imaged,   	
	},	
	data(){
		return {
			barcau:false,
			commonList: [ '协商一致换货', '大小不合适', '颜色/图案/款式与商品描述不符','材质面料与商品和描述不符','其他' ],
		}
	},
	created(index){
	    this.goodsInfo=this.$route.query.items
	    // console.log(this.goodsInfo)
	},
	methods: {
	  change (val, label) {
	    
	  },
	  present(){
	  	this.$router.push({path: '/applyexchange'})
	  }

	}




}	
	
</script>

<style lang="less">
.barterapply {
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
	/*换货内容*/
	.bar-mer-con {
	box-sizing: border-box;
	padding: 0.27rem 0.27rem 0.83rem 0.27rem;
	border-top:0.01rem solid #eee;
	overflow: hidden;
	background-color: #fff;
	}
	.bar-img {
	width: 2.53rem;
	height: 2.53rem;
	background-color: pink;
	float: left;
	}
	/*中间内容介绍*/
	.bar-con-intro {
	width: 4.89rem;
	float: left;
	margin-left: 0.35rem;
	}
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
	.weui-cell {
	padding: 0 !important;
    margin-top: 0.11rem !important;
    margin-right: 0.72rem !important;
	}
	.bar-price {
	float: right;
	font-size: 0.37rem;
	}

	/*换货原因*/
	.bar-mer-cau {
	margin-top: 0.27rem;
	box-sizing: border-box;
	padding: 0.49rem 0.27rem;
	font-size: 0.37rem;
	background-color: #fff;
		.cause {
		overflow: hidden;
		float: right;
		line-height: 0.37rem;
		.icon-right{
			margin-left: 0.27rem;
		}
	}

}

	/*换货说明*/
	.bar-mer-exp {
	margin-top: 0.27rem;
	min-height: 1.99rem;
	box-sizing: border-box;
	padding: 0.27rem;
	font-size: 0.37rem;
	background-color: #fff;
		.huhsm {
			width: 1.6rem;
			height: 100%;			
			float: left;
		}
		.bem {
			margin: 0.06rem 0 0 0.16rem;
			resize : none;
			border: none;
			width: 7.66rem;
			height: 1.36rem;

		}
	}
	/*上传凭证*/
	.show {
	box-sizing: border-box;
	padding: 0 0.27rem;
	background-color: #fff;
	margin-top: 0.27rem;
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

	/*换货弹窗*/
	.tanchuang {
		.barpop {
			box-sizing: border-box;
			.popcus {
				/*padding: 0.49rem 0;*/
				margin: 0 0.27rem;
				font-size: 0.37rem;
				/*border-bottom: 1px solid #eee;*/
				.weui-cell {
				padding: 0.49rem 0 !important;
				margin: 0 !important;
				border-top: 1px solid #eee;
				font-size: 0.37rem;
				}
				.weui-cell last-child {
					border-bottom: 0 !important;
				}
				 .weui-cell:before {
					border: 0 !important;
				}
				/*选择按钮*/
				.weui-cells_checkbox .weui-cell__hd {
				    position: absolute;
				    right: 0;   
				    padding: 0;
				}
			}
		}
	}

}
</style>


