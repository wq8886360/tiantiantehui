<template>
	<div class="Platform" v-if="afterdata">
		<!-- 头部 -->
		<div class="exchangeTop">
			<div class="exchange_i">
				<div class="exchange_t">
					<div class="title">{{afterdata.status_desc}}</div>
					<timeDown v-if='countshu!=0' class='timer' @timerd='timerd' :timestamp='timestamd'></timeDown>
					<div v-else class="timer">{{afterdata.time_desc}}</div>
				</div>
			</div>
		</div>
		<div class="goods_state" @click='attrsState=true'>
			<span class="state_s">货物状态</span>
			<div class="state_right">
				<span v-if='reason==null'>请选择</span>
				<span v-else>{{reason}}</span>
				<i class="icon-right right_c"></i>
			</div>
		</div>
		<div class="description">
			<x-textarea title="退款说明：" v-model="instruction"></x-textarea>
		</div>
		<div class="upload">
			<div class="credentials">
				<div class="title">上传凭证</div>
				<uploadimg @photo="photo" :imgdata="imgurl"></uploadimg>  
			</div>
		</div>
		
		<div v-transfer-dom>
			<popup class='tjiao' v-model="attrsState" position="bottom" max-height="80%">	
				<img src="../../assets/img/close_gray.png" alt="" class="Shut" @click='attrsState=false'>
			 	<checklist @on-change="changer" label-position="left" :title="title" :options="commonList" v-model="radioValue" :max="1"></checklist>
			 	<div class="sure" @click='attrsState=false'>关闭</div>
			</popup>
		</div>
		<div class="submit" @click="submit">提交申请</div>
	</div>
</template>
<script>
import Exif from 'exif-js'  
import {Popup, Checklist,TransferDom, XTextarea} from 'vux'
import { refundapplyDetail, refundapplyTerrace } from '../../http/api'
import Uploadimg from "./public/img.vue"
import timeDown from './public/countdown.vue'
export default{
	props:['timestamp'],
	directives: {
		TransferDom
	},
	components: {
        Uploadimg,
		Popup,
        Checklist,
        XTextarea,
        timeDown
	},
	data(){
		return{
			commonList: [],
			attrsState:false, //货物的弹窗的状态
			title:'货物状态', //货物的弹窗的标题
			radioValue:[], 
			reason:'请选择', //货物的弹窗的val
            domain:null,

            afterdata: null, //申请前数据
            imgurl:[], 
            instruction: '',
            headerImage:[],//显示的图片
            countshu:null,
		}
	},
	methods:{
		/*选择货物的选项的val*/
		changer(val, label) {
			this.reason=label[0];
   	 	},
   	 	photo(headerImage){
   			this.headerImage = headerImage;
        },
        api_refundapplyDetail(){
            refundapplyDetail({refund_id: this.$route.query.refund_id}).then((response) => {
                console.log(response,1111)
                this.afterdata = response.data.data.refund_detail;
                this.timestamd=response.data.data.refund_detail.rest_second;
                console.log(this.timestamp)
                response.data.data.refund_detail.edit.user_status.map((val) => {
                    this.commonList.push({key: val.reason_id,value: val.reason_info})
                })
                let edit = this.$route.query.edit;
                if(edit){
                    let edit_data = JSON.parse(edit);
                    console.log(edit_data)
                    this.$set(this.radioValue,0,Number(edit_data.current_user_status.id));
                    this.instruction = edit_data.refund_remark_admin;
                    this.imgurl = edit_data.member_evidence_admin;
                }
            })
        },
        //提交申请
        submit(){
            let edit = this.$route.query.edit;
            let params = {
                refund_id: this.$route.query.refund_id,
                user_status: this.radioValue[0],
                remark: this.instruction,
                evidence_img: this.headerImage.join(','),
                is_edit: 0
            }
            if(edit){
                params.is_edit = 1;
            }else{
                params.is_edit = 0;
            }
            refundapplyTerrace(params).then((response) => {
                if(response.data.code == 1000){
                    this.$router.push({path: '/refund',query: {refund_id: this.$route.query.refund_id}})
                }else{
                    this.$vux.toast.text(response.data.message, 'middle')
                }
            })
        },
        timerd(countshu){
   	 		this.countshu=countshu;
   	 		if(countshu==0){
   	 			this.api_refundapplyDetail()
   	 		}
   	 	}
	},
	created(){
        this.api_refundapplyDetail()
	}
}	
</script>
<style lang='less'>
.Platform{
	width: 100vw;
	background: #f7f7f7;
	.exchangeTop{
		width: 100vw;
		.exchange_i{
			width: 100vw;
			height: 2.93rem;
			background: #FB0036;
			.exchange_t{
				padding-top: 0.97rem;
				margin-left: 1.07rem;
				.title{
					color:#ffffff;
					font-family: PingFang-SC-Regular;
					font-size: 0.43rem;
				}
				.timer{
					color:#FFFFFF;
					font-size: 0.32rem;
					margin-top: 0.25rem;
				}
			}
		}
	}
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
    .description{
        margin-top: 0.27rem;
		min-height: 1.99rem;
		box-sizing: border-box;
		padding: 0.27rem;
		font-size: 0.37rem;
		background-color: #fff;
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
.description .weui-cell{
    padding: 0!important;
}
.tjiao .weui-cell{
	font-size: 0.37rem !important;
	font-family: PingFang-SC-Regular !important;
	color:#1C1B20 !important;
    padding: 10px 0px 10px 15px !important;
}
.tjiao .weui-cell:before{
    left: 0px !important;
}
.tjiao .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
	color: #FB0036 !important;
}
.tjiao .weui-cells__title{
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