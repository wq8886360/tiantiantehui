<template>
	<div class="logistics" v-if='logistics_data'>
		<div class="logistics_top">
			<div class="logistics_left">
				<img :src="logistics_data.thumb"  alt="">
				<div class="qty">{{logistics_data.qty}}件商品</div>
			</div>
			<div class="logistics_right">
				<div class="state">{{logistics_data.now_status.AcceptStation}}</div>
				<div class="delivery">
					<span>{{logistics_data.express_com}}：</span>
					<span>{{logistics_data.express_sn}}</span>
				</div>
				<div class="delivery">
					<span>官方电话：</span>
					<span>{{logistics_data.express_phone}}</span>
				</div>
			</div>
		</div>
		<div class="logistics_c">
			<div :class="styles">
       			<timeline>
       				<div v-for='(item,index) in logistics_data.traces'>
           				<timeline-item>
           				    <h4 :class="{'color_red':index==0}">{{item.AcceptStation}}</h4>
           				    <p style="margin-top:0.2rem;">{{item.AcceptTime}}</p>
           				</timeline-item>
           			</div>	
        		</timeline>
        	</div>	
        	<div v-if='isTrue' @click='logist_g()' class="message">查看你的物流信息</div>
		</div>
		<div class="success_c">
			<div class="title">
				<span class="line"></span>
				<span class="text">您的足迹</span>
				<span class="line" style="float:right;"></span>
			</div>
			<ul class="success_ul">
				<li v-for='(item,index) in logistics_data.history.mark_data'>
					<img :src="item.thumb"  alt="">
					<div class="titll">
						{{item.title}}
					</div>
					<div class="coin_god">
						<span class="coin_ll">￥</span>
						<span class="conin_rr">{{item.price}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {traces} from '../../http/api'
import { Timeline, TimelineItem} from 'vux'
export default{
	components: {
  		Timeline,
  		TimelineItem,
  		
  	},
	data(){
		return{
			order_id:52,
			page:1,
			page_size:10,
			logistics_data:null,
			styles:'logistics_cond',
			isTrue:true,
			traces_data:null,
		}
	},
	methods:{
		traces_api(){
			traces({order_id:this.order_id,page:this.page,page_size:this.page_size}).then((response)=>{
				let res=response.data;
				if(res.code==1000){
					this.logistics_data=res.data;
					this.traces_data=this.logistics_data.traces.reverse()
				}
			})
		},
		logist_g(){
			this.isTrue=false,
			this.styles='logistics_conc'
		}
	},
	created(){
		this.traces_api();
	}
}
</script>
<style lang='less'>
.logistics{
	width: 100vw;
	height: 100vh;
	border-top:1px solid #D8D8D8;
	background: #f7f7f7;
	.logistics_top{
		padding: 0.4rem 0.27rem 0.4rem 0.27rem;
		overflow: hidden;
		background: #fff;
		.logistics_left{
			width:2.0rem;
			height: 2.0rem;
			position: relative;
			float: left;
			img{
				width: 2.0rem;
				height: 2.0rem;
				position: absolute;
				top: 0px;
				left: 0px;
			}
			.qty{
				position: absolute;
				bottom: 0px;
				width: 2.0rem;
				height: 0.4rem;
				background:rgba(0,0,0,1);
				color:#fff;
				text-align: center;
				font-size: 0.32rem;
			}
		}
		.logistics_right{
			float: left;
			margin-left: 0.4rem;
			.state{
				font-family: PingFang-SC-Regular;
				font-size: 0.4rem;
				color:#FB0036;
				margin-bottom: 0.2rem;
			}
			.delivery{
				margin-bottom: 0.05rem;
				span{
					font-family: PingFang-SC-Regular;
					font-size: 0.4rem;
					color:#1C1B20;
				}
			}
		}
	}
	.logistics_c{
		width: 100vw;
		background: #fff;
		margin-top: 0.27rem;
		.logistics_cond{
			height: 2.3rem;
			overflow:hidden;
		}
		logistics_conc{
			height: auto;
		}
		.message{
			font-family: PingFang-SC-Regular;
			color:#858585;
			font-size:0.32rem;
			padding-left:2.2rem;
			padding-bottom:0.5rem;
		}
		.color_red{
			color:#FB0036;
		}
	}
	.success_c{
			width: 100vw;
			height: 100%;
			margin-top: 0.27rem;
			.title{
				width: 100%;
				text-align: center;
				padding-bottom: 0.47rem;
				background: #fff;
				padding-top: 0.67rem;
				.line{
					width: 3.55rem;
					height: 1px;
					background: #EEEEEE;
					float: left;
				}
				.text{
					font-family: PingFang-SC-Regular;
					color:#1C1B20;
					font-size: 0.41rem;
					position: relative;
					top: -0.25rem;
				}
			}
			.success_ul{
				width: 100vw;
				background: #f7f7f7;
				overflow: hidden;
				li{
					width: 4.93rem;
					float: left;
					margin-right: 0.13rem;
					margin-bottom: 0.13rem;
					background: #fff;
					img{
						width: 4.93rem;
						height: 4.93rem;
					}
					.titll{
						width: 4.5rem;
						font-family: PingFang-SC-Medium;
						color:#1C1B20;
						font-size: 0.32rem;
						padding-left: 0.15rem;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						height: 0.9rem;
					}
					.coin_god{
						padding-top: 0.27rem;
						padding-bottom: 0.27rem;
						padding-left: 0.15rem;
						span{
							color:#FB0036;
						}
						.coin_ll{
							font-size: 0.27rem;
						}
						.conin_rr{
							font-size: 0.4rem;
						}
					}
				}
				li:nth-child(2n){
					margin-right: 0rem;
				}
			}
		}
}
.vux-timeline-item-tail{
	background: #DDDDDD !important;
}
.vux-timeline-item-head-first{
	width: 0.48rem !important;
	height: 0.48rem !important;
	background: url('../../assets/img/img_wuliu_active@2x.png') !important;
	background-size: 100% auto !important;
	font-size: 0px !important;
	position: absolute;
	top: 0px !important;
	left:-2px !important;
}
.vux-timeline-item-checked.weui-icon-success-no-circle::before{
	font-size:0px !important;
}
.vux-timeline-item-color{
	background-color:#DDDDDD !important;
}
.vux-timeline{
	padding-bottom: 0px !important;
	padding-top: 0.5rem !important;
}
.vux-timeline-item-content{
	padding-bottom: 0.6rem !important;
}
</style>