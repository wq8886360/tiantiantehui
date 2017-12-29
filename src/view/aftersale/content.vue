<template>
	<div class="content">
		<div class="line_gray"></div>
		<div class="content_top">
			<div class="content_all">
				<span class="cope">物流公司</span>
				<div class="content_right">
					<span>请选择</span>
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
			<div class="instructions">
				<span class="title">说明：</span>
				<span class="textt">111111哈哈的说的好撒 </span>
			</div>
		</div>
		<div class="upload">
			<div class="credentials">
				<div class="title">上传凭证</div>
			</div>
		</div>
		<div class="submit">提交</div>
	</div>
</template>
<script>
export default{
	data(){
		return{

		}
	},
	methods:{

	},
	created(){

	}
}
</script>
<style lang='less'>
.content{
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
			.title{
				font-family: PingFang-SC-Regular;
				color:#1C1B20;
				font-size: 0.37rem;
			}
			.textt{
				font-size: 0.34rem;
				color:#858585;

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
</style>