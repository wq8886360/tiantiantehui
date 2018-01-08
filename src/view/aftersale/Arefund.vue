<template>
	<div class="Arefund" v-if="good_data">
		<!-- 商品头部 -->
		<div class="bar-mer-head">退款商品</div>
		<!-- 退款内容 -->
		<div class="bar-mer-con">
			<img class="bar-img" :src="good_data['thumb']" alt="">
			<div class="bar-con-intro">
				<p class="introduce">{{good_data['title']}}</p>
				<div class="intro-color">{{good_data['sku_desc']}}</div>
				<div class="intro-num">
					<x-number class="intro-number" v-model="qty"  :min="1" :max="Number(good_data['qty'])"></x-number>  <!-- 里面拿走了v-model="goodNum" -->
				</div>
			</div>
			<div class="bar-price">￥{{good_data['price']}}</div>
		</div>
		<!-- 退款金额 -->
		<div class="coin">
			<div class="coin_all">
				<div class="coin_top">
					<span class="money_t">退款金额：</span>
					<span class="money">￥{{refundaAmount}}</span>
				</div>
				<div class="line"></div>
				<div class="coin_b">
					<span>你最多能退￥{{maxrefundaAmount}}<span v-if="good_data['is_last'] == '1'">，含邮费￥{{good_data['shipping_fee']}}</span></span>
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
		<div class="bar-mer-exp">
            <x-textarea title="退款说明：" v-model="instruction"></x-textarea>
        </div>
		<!-- 上传凭证 -->
		<div class="up-gist">
			<div class="gist">上传凭证</div>
			<uploadimg @photo="photo" :imgdata="member_evidence_seller"></uploadimg>
		</div>
		<!-- 提交申请 -->
		<div class="refer-apply" @click="submit">提交申请</div>
		<!-- 退款原因弹窗 -->
		<div v-transfer-dom>
			<popup class='tjiao' v-model="attrsState" position="bottom" max-height="80%">	
				<img src="../../assets/img/close_gray.png" alt="" class="Shut" @click='attrsState=false'>
			 	<checklist @on-change="changer" label-position="left" :title="title" :options="commonList" v-model="radioValue" :max="1" :min="1"></checklist>
			 	<div class="sure" @click='attrsState=false'>关闭</div>
			</popup>
		</div>
	</div>
</template>

<script>
import { XNumber, Popup, TransferDom, Checklist, XTextarea} from 'vux'
import { refundgetrefundinfo, refundapplyRefund } from "../../http/api"
import Uploadimg from "./public/img.vue"
export default{
	directives: {
		TransferDom
	},
	components: {		
    	XNumber, 
    	Popup, 
        Checklist,
        XTextarea,
        Uploadimg
    },
    computed: {
        //计算退款金额
        refundaAmount(){
            let amount = this.good_data.return_price*this.qty;
            let shipping_fee = Number(this.good_data.shipping_fee);
            if(this.good_data.is_last == 1){
                return amount + shipping_fee;
            }else{
                return amount;
            }
        },
        //最大可退款金额
        maxrefundaAmount(){
            let amount = this.good_data.return_price*this.good_data.qty;
            let shipping_fee = Number(this.good_data.shipping_fee);
            if(this.good_data.is_last == 1){
                return amount + shipping_fee;
            }else{
                return amount;
            }
        }
    },
	data(){
		return {
			commonList: [], //退款原因选择列表
			attrsState:false, //货物的弹窗的状态
			title:'退款原因', //货物的弹窗的标题
			radioValue:[], 
            reason:'', //货物的弹窗的val

            good_data: null, //退款商品信息
            qty: 1, //退货商品数量
            instruction: '', //退款说明
            evidence_img: [],
            member_evidence_seller: [], //修改申请的图片
		}
	},
	methods: {
	 	changer(val, label) {
			this.reason=label[0];
        },
        //获取申请前商品数据
        api_refundgetrefundinfo(){
            let og_id = this.$route.query.og_id;
            refundgetrefundinfo({og_id: og_id}).then((response) => {
                console.log(response)
                this.good_data = response.data.data;
                //遍历处理checklist数据
                //init
                this.commonList = [];
                response.data.data.reason.map((val,index) => {
                    this.commonList.push({key: val.reason_id, value: val.reason_info});
                })


                //修改申请数据
                let modifyState = this.$route.query.edit;
                if(modifyState){
                    let modify = JSON.parse(modifyState)
                    this.qty = Number(modify.goods_num);
                    this.$set(this.radioValue,0,modify.reason_id);
                    this.instruction = modify.refund_remark_seller;
                    this.member_evidence_seller = modify.member_evidence_seller;
                }
            })
        },
        //提交申请
        submit(){
            let params = {
                og_id: this.$route.query.og_id,
                qty: this.qty,
                refund_id: this.$route.query.refund_id,
                amount: this.refundaAmount + '',
                type: this.$route.query.type,
                reason_id: this.radioValue[0],
                remark: this.instruction,
                evidence_img: this.evidence_img.join(','),
                is_edit: 0
            }
            console.log(params)
            if(this.radioValue.length != 0){
                if(this.$route.query.edit){
                    params.is_edit = 1; //编辑
                    refundapplyRefund(params).then((response) => {
                        console.log(response)
                        if(response.data.code == 1000){
                            this.$router.push({path: '/refund',query: {refund_id: response.data.data.refund_id}})
                        }else{
                            this.$vux.toast.text(response.data.message, 'middle')
                        }
                    })
                }else{
                    params.is_edit = 0; //申请
                    refundapplyRefund(params).then((response) => {
                        console.log(response)
                        if(response.data.code == 1000){
                            this.$router.push({path: '/refund',query: {refund_id: response.data.data.refund_id}})
                        }else{
                            this.$vux.toast.text(response.data.message, 'middle')
                        }
                    })
                }
            }else{
                this.$vux.toast.text(`请选择退款原因`, 'middle')
            }
        },
        photo(imgList){
            this.evidence_img = imgList;
        }
    },
    created(){
        this.api_refundgetrefundinfo();
    }
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


