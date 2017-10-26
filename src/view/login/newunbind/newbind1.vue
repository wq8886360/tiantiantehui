<template>
	<div class="regist">
		<i class="icon-close" @click="back"></i>
		<div class="logo">
			<h1 style="font-size:0.8rem;color:#000;margin-top:0.9rem;padding-left:0.27rem;">绑定手机号</h1>
		</div>
		<div class="form">
			<div class="referrer" style="margin-top:0">
				<input class="sl-input" v-model="referId" type="text" placeholder="请输入推荐人ID">
				<x-button mini class="btn" @click.native="referrerShow = true">随机选择推荐人</x-button>
			</div>
			<div class="tel">
				<input class="sl-input" v-model="tel" type="tel" placeholder="请输入手机号">
			</div>
			<div class="code">
				<input class="sl-input" v-model="code" type="tel" placeholder="请输入验证码">
				<img :src="'http://v20-api.shunliandongli.com/member/Common/vcode?time='+time" @click="timer" alt="">
			</div>
		</div>
		<!-- 推荐人列表 -->
		<div class="referrerList" v-if="referrerShow">
			<i class="icon-back" @click="referrerShow = false"></i>
			<button class="change">换一批</button>
			<h1 class="title">选择推荐人</h1>
			<div class="mainlist">
				<div class="box" @click="detail(index)" v-for='(item,index) in 9'>
					<img class="choice" src="../../../assets/img/choice.png" alt="">
					<div class="img"><img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3318583382,2915743720&fm=27&gp=0.jpg" alt=""></div>
					<p class="name">拉斯维加斯拉斯维加斯</p>
					<div class="label">
						<img class="v" src="../../../assets/img/v2.png" alt="">
						<div class="identity">
							<img src="../../../assets/img/jingyingdaoshi.png" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="choose">
				<x-button class="sl-button" type="warn">确定</x-button>
			</div>
		</div>

		<!-- 推荐人详情 -->
		<div class="detail" v-if="detailShow">
			<div class="content">
				<div class="top">
					<img class="avtor" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3318583382,2915743720&fm=27&gp=0.jpg" alt="">
				</div>
				<p class="username">史蒂夫绝地反击打飞机的肌肤</p>
				<div style="margin:0.4rem 0;">
					<img src="../../../assets/img/v3.png" style="height:0.37rem;width: 0.51rem" alt="">
					<img src="../../../assets/img/jingyingdaoshi.png" style="height:0.37rem;width: 1.2rem" alt="">
				</div>
				<div style="border-top:1px dashed #e4e4e4;width:100%;"></div>

				<div class="info">
					<p><i>注册时间：</i>2017-12-03</p>
					<p><i>热度：</i>998</p>
				</div>
				<div class="btnch">
					<x-button class="sl-button" type="warn" @click.native="detailShow = false">选择</x-button>
					<x-button type="default"  @click.native="detailShow = false">不选择</x-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { XButton } from 'vux';
export default{
	components: {
		XButton
	},
	data(){
		return {
			time: 1,
			referId: null,
			tel: null,
			code: null,
			referrerShow: false,
			detailShow: false
		}
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		timer(){
			this.time = Math.random();
		},
		detail(index){
			this.detailShow = true;
		}
	},
	watch:{
		'code': {
			handler: function() {
				if(this.code.length == 4){
					this.$router.push({path: '/user/set', query:{tel: this.tel}})
				}
			}
		}
	}
}
</script>
<style lang="less">
.icon-close{
	font-size: 0.67rem;
    position: absolute;
    left: 0.4rem;
    top: 0.4rem;
    color: #000;
}
.regist{
	position: relative;
	.logo{
		height: 4.27rem;
		padding: 0.4rem;
		box-sizing: border-box;
	}
	.detail{
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.5);
		display: flex;
		justify-content: center;
		align-items: center;
		.content{
			width: 80%;
			background: #fff;
			border-radius: 0.13rem;
			box-sizing: border-box;
			padding: 0.4rem 0.27rem 0.4rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			.info{
				padding: 0.53rem 0;
				font-size: 0.32rem;
				color: #858585;
				i{
					width: 2.13rem;
					color: #000;
					font-style: normal;
					text-align: right;
					display: inline-block;
				}
			}
			.btnch{
				width: 100%;
			}
			.top{
				width: 2.67rem;
				height: 2.67rem;
				border-radius: 50%;
				overflow: hidden;
				.avtor{
					width: 2.67rem;
					height: 2.67rem; 
				}
			}
			.username{
				font-size: 0.35rem;
				margin-top: 0.2rem;
			}
		}
	}
	.referrerList{
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;
		box-sizing: border-box;
		padding: 0 0.67rem;
		.mainlist{
			display: flex;
			flex-wrap: wrap;
			margin-top: 0.93rem;
			justify-content: space-between;
			.box{
				width: 33.3%;
				display: flex;
				align-items: center;
				flex-direction: column;
				position: relative;
				margin-bottom: 0.8rem;
				.choice{
					width: 0.53rem;
					height: 0.53rem;
					position: absolute;
					top: 0;
					right: 0.27rem;
				}
				.label{
					width: 2.13rem;
					display: flex;
					margin-top: 0.13rem;
					.v{
						width: 0.51rem;
						height: 0.37rem;
						margin-right: 0.27rem;
					}
					.identity{
						position: relative;
						text-align: center;
						img{
							width: 1.2rem;
							height: 0.37rem;
						}
						p{
							text-align: center;
							margin-left: 0.06rem;
							height: 0.37rem;
							line-height: 0.37rem;
							position: absolute;
							left: 0;
							top: 0;
							font-size: 12px;
							color: #fff;
						}
					}
				}
				.img{
					width: 2.13rem;
					height: 2.13rem;
					border-radius: 50%;
					overflow: hidden;
					img{
						width: 2.13rem;
						height: 2.13rem;
					}
				}
				.name{
					font-size: 0.35rem;
					width: 100%;
					margin-top: 0.13rem;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					width: 2.13rem;
				}
			}
		}
		.change{
			font-size: 0.4rem;
			position: absolute;
			right: 0.5rem;
			top: 0.5rem;
		}
		.title{
			font-size: 0.8rem;
			text-align: center;
			padding-top: 0.85rem;
		}
		.choose{
			margin-top: 0.67rem;
		}
	}
	.form{
		padding: 0 0.67rem;
		> div{
			border-bottom: 1px solid #d8d8d8;
			margin-top: 0.67rem;
		}
		.referrer{
			position: relative;
			.btn{
				position: absolute;
				right: 0.09rem;
				top: 0.1rem;
				border: none!important;
			}
		}
		.code{
			position: relative;
			height: 1.07rem;
			img{
				position: absolute;
				right: 0;
				top: 0;
				height: 1rem;
			}
		}
	}
}
</style>