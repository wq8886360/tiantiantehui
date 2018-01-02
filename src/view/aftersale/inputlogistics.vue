<template>
	<div class="inputlogistics">
		<div class="line"></div>
		<!-- 物流公司 -->
		<div class="company">
			<span class="logspan">物流公司</span>
			<span class="logname">请选择
			</span>
			<i class="icon-right right"></i>
		</div>
		<div class="line"></div>
		<!-- 物流单号 -->
		<div class="odd-numbers">
			<span class="oddspan">物流单号</span>
			<input type="text" class="oddnum" placeholder="请输入物流单号">
			<img src="../../assets/img/icon_saoyisao.png" class="icon_sao right" alt="">
		</div>
		<div class="line"></div>
		<!-- 说明 -->
		<div class="explain">说明:</div>
		<div class="line"></div>
		<!-- 上传凭证 -->
		<Imaged></Imaged>
		<!-- 提交按钮 -->
		<div class="present" @click="present">
		 	提交
		</div>
	</div>	
</template>

<script>
	import Exif from 'exif-js' 
	import Imaged from './public/img.vue' 
	import {commentAppend,Img} from '../../http/api.js'
	import  { ToastPlugin } from 'vux'
	export default { 
		components: {			    	
	    	Imaged
		}, 
	    data () {  
	        return {  

	        }  
	    },  
	    mounted () {  
	    },  
	    created(index){
	        this.goodsInfo=this.$route.query.items
	        // console.log(this.goodsInfo)
	    },
	    methods: {  	        
	        present(){
	        	this.$router.push({path:'usersendexp'})
	        } 
	    }  
	}
</script>

<style lang="less">
	.inputlogistics {
		/*转行条*/
		.line {
			width: 100%;
			height: 0.27rem;
			background-color: #F7F7F7;
		}
		/*物流公司*/
		.company{
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
				top: 0.35rem;
				font-size: 0.37rem;
				color: #858585;
				/*float: right;*/
				margin-left: 3.07rem;
			}
			.icon-right {
				margin-top: 0.05rem;
			}
		}
		/*物流单号*/
		.odd-numbers{
			background-color: #fff;
			width: 100%;
			box-sizing: border-box;
			padding: 0.48rem 0.27rem;
			border-bottom: 1px solid #eee;
			overflow: hidden;
			.oddspan {
				font-size: 0.37rem;
				float: left;
			}
			.oddnum {
				font-size: 0.26rem;
				color: #858585;
				margin-left: 0.27rem;
				border:none;
				margin-top: 0.08rem;
			}
			.icon_sao {
				width: 0.48rem;
				height: 0.48rem;
				margin-top: 0.05rem;
			}
		}
		/*说明*/
		.explain {
			box-sizing: border-box;
			padding: 0.27rem;
			font-size: 0.37rem;
			width: 100%;
			min-height: 2.0rem;
		}
		/*上传凭证*/
		.show {
			padding: 0 0.27rem;
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