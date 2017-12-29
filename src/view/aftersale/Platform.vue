<template>
	<div class="Platform">
		<exchangeTop></exchangeTop>
		<div class="goods_state" @click='attrsState=true'>
			<span class="state_s">货物状态</span>
			<div class="state_right">
				<span v-if='reason==null'>请选择</span>
				<span v-else>{{reason}}</span>
				<i class="icon-right right_c"></i>
			</div>
		</div>
		<div class="description">
			<div class="description_c">
				<span class="title">问题描述：</span>
				<span class="text_d">您好，查看您的商品是在运送的途中，商品还没有退回到我们公司</span>
			</div>
		</div>
		<div class="upload">
			<div class="credentials">
				<div class="title">上传凭证</div>
				<div class="show" v-if='evaImgArr!=null'>  
            	    <div class='imgBox'><img class='imgMain' alt=""><img class='trash' src="../../assets/img/trash.png"  alt="" ></div>
                	<div class='addImg' v-if='isShow'>
                	    <img src="../../assets/img/add.png" alt="">
                	    <input type="file" :id="'upload'" accept="image"  > <!-- accept="image/*" -->
                	</div>
            	</div>
			</div>
		</div>
		<div v-transfer-dom>
			<popup class='tjiao' v-model="attrsState" position="bottom" max-height="80%">	
				<img src="../../assets/img/close_gray.png" alt="" class="Shut" @click='attrsState=false'>
			 	<checklist @on-change="changer" label-position="left" :title="title" :options="commonList" v-model="radioValue" :max="1"></checklist>
			 	<div class="sure" @click='attrsState=false'>关闭</div>
			</popup>
		</div>
		<div class="submit">提交</div>
	</div>
</template>
<script>
import Exif from 'exif-js'  
import {Popup, Checklist,TransferDom} from 'vux'
import {Img} from '../../http/api.js'
import exchangeTop from './public/exchangeTop.vue'
export default{
	directives: {
		TransferDom
	},
	components: {
		'exchangeTop':exchangeTop,
		Popup,
    	Checklist,
	},
	data(){
		return{
			commonList: [ '未寄回', '已寄回'],
			attrsState:false, //货物的弹窗的状态
			title:'货物状态', //货物的弹窗的标题
			radioValue:[], 
			reason:'请选择', //货物的弹窗的val
			picValue:'',
			doMain:'', 
			evaImgArrShow:[],
			evaImgArr:[],
			isShow:true
		}
	},
	methods:{
		/*选择货物的选项的val*/
		changer(val, label) {
			this.reason=val[0];
   	 	},
	},
	created(){
	}
}	
</script>
<style lang='less'>
.Platform{
	width: 100vw;
	background: #f7f7f7;
	.goods_state{
		width: 100vw;
		height: 1.33rem;
		background: #fff;
		margin-top: 0.27rem;
		.state_s{
			font-size: 0.37rem;
			font-family: PingFang-SC-Regular;
			color:#1C1B20;
			line-height:  1.33rem;
			text-indent: 0.27rem;
			display: inline-block;
		}
		.state_right{
			float:right;
			line-height:  1.33rem;
			margin-right: 0.27rem;
			span{
				font-family: PingFang-SC-Regular;
				color:#858585;
				font-size: 0.37rem;
				vertical-align: middle;
			}
			.right_c{
				font-size: 15px;
				vertical-align: middle;
			}
		}
	}
	.description{
		width: 100vw;
		background: #fff;
		margin-top: 0.27rem;
		.description_c{
			padding: 0.27rem;
			.title{
				font-family: PingFang SC;
				color:#1C1B20;
				font-size: 0.37rem;
			}
			.text_d{
				font-family: PingFang SC;
				color:#858585;
				font-size: 0.37rem;
			}
		}	
	}
	.upload{
		margin-top: 0.27rem;
		width: 100vw;
		background: #fff;
		.credentials{
			padding: 0.52rem 0 0 0.27rem;
			.title{
				font-family: PingFang-SC-Regular;
				color:#1C1B20;
				font-size: 0.37rem;
			}
			   .show{
        overflow:hidden;

        .imgBox{
            border-radius: 4px;
            float:left;
            overflow: hidden;
            width:2.026667rem;
            height:2.026667rem;
            margin:0.133333rem;
            margin-top:0.4rem;
            position:relative;
            .imgMain{
                width:100%;
                height:100%;
            }
            .trash{
                width:0.666667rem;
                height:0.666667rem;
                position: absolute;
                top:0;
                right:0;
            }
        }
        .addImg{
            border-radius: 4px;
            margin-bottom:0.133333rem;
            width:2rem;
            height:2rem;
            float:left;
            box-sizing: border-box;
            border:1px solid #EEEEEE;
            background:#F5F5F5;
            position:relative;
            margin-top:0.4rem;
            input{
                position: absolute;
                width:100%;
                height:100%;
                left:0;
                top:0;
                opacity: 0;
                z-index:1000;
            }
            img{
                width:0.7rem;
                height:0.7rem;
                position:absolute;
                left:0.65rem;
                top:0.65rem;
                z-index:100;
            }
        }
    }
		}
	}
	.submit{
		width: 100vw;
		height: 1.33rem;
		background: #FB0036;
		color:#fff;
		font-family: PingFang-SC-Regular;
		font-size: 0.37rem;
		text-align: center;
		line-height: 1.33rem;
		position: fixed;
		bottom: 0px;
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
</style>