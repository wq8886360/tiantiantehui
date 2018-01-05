<template>
	<div class="content_ds">
		<div class="line_gray"></div>
		<div class="content_top" @click='attrsState=true'>
			<div class="content_all">
				<span class="cope">物流公司</span>
				<div class="content_right">
					<span v-if='reason==null'>请选择</span>
                    <span v-else>{{reason}}</span>
					<i class="icon-right"></i>
				</div>
			</div>
		</div>
		<div class="content_b">
			<div class="con_left">
				<span>物流单号</span>
				<input type="text" placeholder="请输入物流单号">
			</div>
			<img class="con_right" src="../../assets/img/icon_aftersalesservice_saoyisao@2x.png" alt="">
		</div>
		<div class="content_f">
		<!--说明 -->
			<div class="bar-mer-exp">
        	    <x-textarea title="说明：" v-model="instruction"></x-textarea>
        	</div>
		</div>
		<div class="upload">
			<div class="credentials">
				<div class="title">上传凭证</div>
				<Imagesd></Imagesd>
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
import {refundapplyTerrace} from '../../http/api.js'
import {Popup, Checklist,TransferDom,XTextarea} from 'vux'
import Imagesd from './public/img.vue'
export default{
    directives: {
        TransferDom
    },
    components: {
        'Imagesd':Imagesd,
        TransferDom,
        Popup,
        Checklist,
        XTextarea
    },
	data(){
		return{
            commonList: [ '顺丰快递', '韵达快递','申通快递','中通快递','天天快递'],
            attrsState:false, //快递的弹窗的状态
            title:'快递公司', //快递的弹窗的标题
            radioValue:[], 
            reason:'请选择', //快递的弹窗的val
			headerImage:[],//显示的图片
            imageArr:[],//图片上传
            doMain:'', 
            inputShow:true,//input的显示与否  
            instruction: '', //说明
		}
	},
	methods:{
		changer(val, label) {
            this.reason=val[0];
        },
        api_refundapplyTerrace(){
        	let refund_id = this.$route.query.refund_id;
        	refundapplyTerrace({refund_id:refund_id}).then((response)=>{
        		console.log(response);
        	})
        }

	},
	created(){
		this.api_refundapplyTerrace()
	}
}
</script>
<style lang='less'>
.content_ds{
	width: 100vw;
	background: #f7f7f7;
	.line_gray{
		width: 100vw;
		height: 0.27rem;
		background: #f7f7f7;
	}
	.content_top{
		background: #fff;
		width: 100%;
		height: 1.33rem;
		overflow: hidden;
		.content_all{
			padding: 0.4rem 0.27rem 0.4rem 0.27rem;
			.cope{
				font-family: PingFang-SC-Regular;
				color:#1C1B20;
				font-size: 0.37rem;
			}
			.content_right{
				float: right;
				margin-top: 0.05rem;
				span{
					font-family: PingFang-SC-Regular;
					color:#858585;
					font-size: 0.37rem;
					vertical-align: middle;
				}
				i{
					font-size: 15px;
					vertical-align: middle;
				}
			}
		}	
	}
	.content_b{
		width: 100vw;
		overflow: hidden;
		background: #fff;
		margin-top: 0.27rem;
		.con_left{
			padding: 0.4rem 0rem 0.4rem 0.27rem;
			float: left;
			span{
				font-family: PingFang-SC-Regular;
				color:#1C1B20;
				font-size: 0.37rem;
			}
			input{
				outline: none;
				background: none;
				border: none;
				margin-left: 0.27rem;
				color:#858585;
				font-size: 0.37rem;
			}
		}
		.con_right{
			float: right;
			width: 0.48rem;
			height: 0.48rem;
			margin-top: 0.48rem;
			margin-right: 0.37rem;
		}
	}
	.content_f{
		width: 100vw;
		background: #fff;
		margin-top: 0.27rem;
		min-height: 2.0rem;
		.instructions{
			padding: 0.27rem;
			.text_ds{
				border: none;
				background: none;
				outline: none;
				width: 100%;
				word-break:break-all;
				resize: none;
				color:#1C1B20;
				font-size: 0.32rem;
				min-height: 1.5rem;
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
                .text_c{
                    font-family: PingFang-SC-Regular;
                    color:#AAAAAA;
                    font-size: 0.27rem;
                    width: 2rem;
                    left: 50%;
                    margin-left: -1rem;
                    text-align: center;
                    bottom:0.1rem;
                    position: absolute;
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