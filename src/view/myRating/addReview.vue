<template>
	<div class="rate">
		<div class='rateCenter'>
			<div class='rateCon'>
				<div class='rateGoodLeft'>
					<img :src="goodsInfo.thumb" alt="">
				</div>
				<div  class='rateGoodRight'>
					<p>{{goodsInfo.title}}</p>
					<p class='price'>￥{{goodsInfo.price}}</p>
				</div>
			</div>
			<div  class='textArea'>
				<textarea placeholder="您的评价，能帮助到更多的用户哦" v-model='textareaData'></textarea>
			</div>
	      	<div class="show">  
	      		<div class='imgBox'  v-for='(item,index) in headerImage'><img class='imgMain' :src="item" alt=""><img class='trash' src="../../assets/img/trash.png"  alt=""  @click='deleted(index)'></div>
	        	<div class='addImg' v-if='inputShow'>
	        		<img src="../../assets/img/add.png" alt="">
	        		<input type="file" id="upload" accept="image/*" @change="upload" > <!-- accept="image/*" -->
	        	</div>
	      	</div> 
		</div>
		<p @click='comment'  class='release'>发布</p>
	</div>
</template>
<script>
import {commentAppend,Img} from '../../http/api.js'
import  { ToastPlugin } from 'vux'
export default {

	data () {
    	return {
			textareaData:'',//文本域内容
			imgArr:'',//图片数组
			goodsInfo:'',//商品信息
			headerImage:[],//显示的图片
			imageArr:[],//图片上传
		    doMain:'', 
		    inputShow:true,//input的显示与否 
    	}
    },
    methods: {
    	comment(){
    		let info={
    			comment_id:this.$route.query.items.comment_id,
    			content:this.textareaData,
    			images:this.imageArr.join(','),
    		}
    		commentAppend(info).then((response)=>{
    			if(response.data.code=='1000'){
    				this.$vux.toast.text(response.data.message, 'middle')
    				this.$router.push({path: '/evaSuccess'})
    			}else{
    				this.$vux.toast.text(response.data.message, 'middle')
    			}
    		})
    	},
    	upload (e) {  
			var srcUrl='http://v20-test.shunliandongli.com/uploads/uploadotherimage'
			var dataBox = new FormData()
	        dataBox.append('file',document.getElementById("upload").files[0])
	        dataBox.fileName = document.getElementById("upload").files[0]
	        this.$axios.post(srcUrl,dataBox).then((res) => {
	            if (res.data.success) {
	          		this.doMain=res.data.data.domain
	          		var src=this.doMain+res.data.data.relativePath[0]
	          		this.headerImage.push(src)
	          		this.imageArr.push(res.data.data.relativePath[0])
	          		if(this.imageArr.length>=5){
						this.inputShow=false
	          		}else{
	          			this.inputShow=true
	          		}
	            }
	        }, (error) => {
	        });
	    }, 
	    deleted(index){
	    	var header=this.headerImage.splice(index,1)
	    	var image=this.imageArr.splice(index,1)
	    	if(this.imageArr.length>=5){
				this.inputShow=false
      		}else{
      			this.inputShow=true
      		}
	    } 
    },
    created(index){
    	this.goodsInfo=this.$route.query.items

    }
}	
</script>
<style lang='less'>
.rate{
	box-sizing: border-box;
	padding:0 0.266667rem;
	.rateCenter{
		margin-bottom:1.5rem;
	}
	.release{
		position:fixed;
		bottom:0;
		left:0;
		width:100%;
		height:1.333333rem;
		line-height: 1.333333rem;
		background:#fb0036;
		color:white;
		text-align: center;
		font-size:0.453333rem;
		z-index:100000;
	}
	.rateCon{
		display:flex;
		padding-bottom:0.36rem;
		border-bottom:1px solid #EEEEEE;
		padding-top:0.333333rem;
		.rateGoodLeft{
			float:left;
			width:1.6rem;
			height:1.6rem;
			img{
				width:100%;
				height:100%;
			}
		}
		.rateGoodRight{
			flex:1;
			float:left;
			padding-left:0.466667rem;
			position:relative;
			p{
				font-size:0.346667rem;
				line-height: 0.453333rem;
				margin-top:0.053333rem;
			}
			.price{
				position:absolute;
				bottom:0.08rem;
				left:0.533333rem;
			}
		}	
	}
	.textArea{
		width:100%;
		padding-bottom:0.4rem;
		border-bottom:1px solid #EEEEEE;
		margin-top:0.4rem;
		textarea{
			width:100%;
			resize: none;
			height:3.4rem;
			background:#F5F5F5;
			border:none;
			box-sizing: border-box;
			padding:0.333333rem 0.266667rem;
			font-size:0.4rem;
			line-height: 0.533333rem;

		}
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
</style>



<!-- <template>  
  	<div>  
 
	      	<div class="show">  
	        	<img v-for='item in headerImage' :src="item" alt="">
	      	</div>  
	      	<div style="margin-top:20px;">  
	        	<input type="file" id="upload" accept="image/*" @change="upload">  
	        	<label for="upload" ></label>  
	      	</div>  
  	</div>  
</template>  
  
<script>  
export default { 
  data () {  
    return {  
      headerImage:[],
      picValue:'',
      doMain:'',  
    }  
  },  
  mounted () {  
  },  
  methods: { 
    upload (e) {  
		var srcUrl='http://v20-test.shunliandongli.com/uploads/uploadotherimage'
		var dataBox = new FormData()
		console.log(dataBox,'dataNBox')
        dataBox.append('file',document.getElementById("upload").files[0])
        console.log(document.getElementById("upload").files[0])
        dataBox.fileName = document.getElementById("upload").files[0]
        console.log(dataBox,'dataBox')
        this.$axios.post(srcUrl,dataBox).then((res) => {
            if (res.data.success) {
          		console.log(res,'res')
          		this.doMain=res.data.data.domain
          		var src=this.doMain+res.data.data.relativePath[0]
          		this.headerImage.push(src)
          		console.log(src)
            }
        }, (error) => {

        });
    },  
 
  }  
}  
</script>  
  
<style>  

</style> -->