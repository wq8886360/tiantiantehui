<template>
	<div class="applyterraceget">
		<Exchange></Exchange>
		<div class="line"></div>
		<div class="status">
			<span class="logspan">货物状态</span>
			<span class="logname">请选择
			</span>
			<i class="icon-right right"></i>
		</div>
		<!-- 问题描述 -->
		<div class="describe">问题描述 :
			<span class="desshan">您好，查看到您的商品是在运送的途中，商品还没有退回到我们公司的哦，公司只能等货物退回公司后才能同意您的退款申请，我们现在需要先拒绝您的申请。感谢您的支持，祝您生活愉快~</span>
		</div>
		<div class="line"></div>
		<!-- 上传凭证 -->
		<div class="uploading">上传凭证
			<div class="uploadimg"></div>
		</div>
		<!-- 提交按钮 -->
		<div class="present">
		 	提交
		</div>
	</div>
</template>

<script>
import Exchange from './public/exchangeTop'	
export default {
	data(){
		return{

		}
	},
	components:{
		Exchange
	}
}	
</script>

<style lang="less">
	.applyterraceget {
		.line {
			width: 100%;
			height: 0.27rem;
			background-color: #F7F7F7;
		}
		/*货物状态*/
		.status{
			background-color: #fff;
			width: 100%;
			box-sizing: border-box;
			padding: 0.48rem 0.27rem;
			border-bottom: 1px solid #eee;
			overflow: hidden;
			line-height: 1;
			position: relative;
			.logspan {
				font-size: 0.37rem;
				float: left;
			}
			.logname {
				position: absolute;
				right: 0.75rem;
				top: 0.48rem;
				font-size: 0.37rem;
				color: #858585;
				/*float: right;*/
				margin-left: 3.07rem;
			}
			.icon-right {
				margin-top: 0.05rem;
			}
		}
		/*问题描述*/
		.describe {
			box-sizing: border-box;
			padding: 0.27rem;
			font-size: 0.37rem;
				
			.desshan {
				color: #858585;
			}
		}
		/*上传凭证*/
		.uploading {
			box-sizing: border-box;
			padding:0.53rem 0.27rem;
			font-size: 0.37rem;

			.uploadimg {
				width: 100%;
				height: 1.33rem;
				margin-top: 0.36rem;
				background-color: pink;
			}
		}
		/*提交按钮*/
		.present {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 1.33rem;
			background-color: #FB0036;
			border-radius: 0 ;
			font-size: 0.43rem;
			line-height: 1.33rem;
			text-align: center;
			color: #fff;
		}

	}
	
</style>