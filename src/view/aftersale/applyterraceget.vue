<template>
	<div class="applyterraceget">
		<Exchange></Exchange>
		<div class="line"></div>
		<div class="status">
			<group label-width="4.5em" label-margin-right="14em" label-align="right">
				<selector title="货物状态" placeholder="请选择" :options="['已寄回', '未寄回']" v-model="value7"></selector>
			</group>
		</div>
		<!-- 问题描述 -->
		<div class="describe">问题描述 :
			<span class="desshan">您好，查看到您的商品是在运送的途中，商品还没有退回到我们公司的哦，公司只能等货物退回公司后才能同意您的退款申请，我们现在需要先拒绝您的申请。感谢您的支持，祝您生活愉快~</span>
		</div>
		<div class="line"></div>
		<!-- 上传凭证 -->
		<div class="up-gist">
			<div class="gist">上传凭证</div>
			<Imaged @photo="photo"></Imaged>
		</div>
		<!-- 提交按钮 -->
		<div class="present" @click="merfuse">
		 	提交申请
		</div>
	</div>
</template>

<script>
import Exif from 'exif-js'  
import {commentAppend,Img} from '../../http/api.js'
import  { ToastPlugin,GroupTitle,Group,Selector } from 'vux'
import Imaged from './public/img.vue'
import Exchange from './public/exchangeTop'	
export default {
	data () {  
	  return {  
        picValue:'',
        textareaData:'',//文本域内容
        imgArr:'',//图片数组
        goodsInfo:'',//商品信息
        headerImage:[],//显示的图片
        imageArr:[],//图片上传
        doMain:'', 
        inputShow:true,//input的显示与否 
        value7:'' 
	    }  
	},
	components:{
		Exchange,
		ToastPlugin,
		GroupTitle,
		Group,
		Selector,
		Imaged
	},
	mounted() {  
	    },  
	    created(index){
	        this.goodsInfo=this.$route.query.items
	        // console.log(this.goodsInfo)
	    },
	    methods: {  
	        
	        merfuse(){
	        	this.$router.push({path:'turndownterrace'})
	        }  
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
			/*padding: 0.48rem 0.27rem;
			border-bottom: 1px solid #eee;*/
			overflow: hidden;
			line-height: 1;
			position: relative;

			.weui-cells {
				margin-top:0;
			}
			.vux-selector.weui-cell_select-after {
				padding-left: 0.07rem;
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

		/*拒绝*/
		.jujue {
			background-color: red;
		}

	}
	
</style>