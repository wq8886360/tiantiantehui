<template>
	<div class="rate">
		<div class='rateCenter'>
			<div v-for='(item,index) in evaData.order_goods'>
				<div class='rateCon'>
					<div class='rateGoodLeft'>
						<img :src="item.thumb" alt="">
					</div>
					<div  class='rateGoodRight'>
						<p>{{item.title}}</p>
						<p class='price'>￥{{item.price}}</p>
					</div>
				</div>
				<div class='goodsEva'>
					<span>商品评价</span>
					<div class='evaConBox' v-if='item.evaScore==0'>
						<div class='evaCon'>
							<img @click='evaClick(5,index,item)' src="../../assets/img/goodDim.png" alt="">
							<span>好评</span>
						</div>
						<div class='evaCon'>
							<img @click='evaClick(3,index,item)' src="../../assets/img/generalDim.png" alt="">
							<span>中评</span>
						</div>
						<div class='evaCon'>
							<img @click='evaClick(1,index,item)' src="../../assets/img/badDim.png" alt="">
							<span>差评</span>
						</div>
					</div>
					<div class='evaConBox' v-if='item.evaScore=="5"'>
						<div class='evaCon'  @click='evaClick(5,index,item)'>
							<img src="../../assets/img/goodBright.png" alt="">
							<span>好评</span>
						</div>
						<div class='evaCon' @click='evaClick(3,index,item)'>
							<img src="../../assets/img/generalDim.png" alt="">
							<span>中评</span>
						</div>
						<div class='evaCon' @click='evaClick(1,index,item)'>
							<img src="../../assets/img/badDim.png" alt="">
							<span>差评</span>
						</div>
					</div>
					<div class='evaConBox' v-if='item.evaScore==3'>
						<div class='evaCon'  @click='evaClick(5,index,item)'>
							<img  src="../../assets/img/goodDim.png" alt="">
							<span>好评</span>
						</div>
						<div class='evaCon'  @click='evaClick(3,index,item)'>
							<img src="../../assets/img/generalBright.png" alt="">
							<span>中评</span>
						</div>
						<div class='evaCon'  @click='evaClick(1,index,item)'>
							<img src="../../assets/img/badDim.png" alt="">
							<span>差评</span>
						</div>
					</div>
					<div class='evaConBox' v-if='item.evaScore==1'>
						<div class='evaCon'  @click='evaClick(5,index,item)'>
							<img src="../../assets/img/goodDim.png" alt="">
							<span>好评</span>
						</div>
						<div class='evaCon'  @click='evaClick(3,index,item)'>
							<img  src="../../assets/img/generalDim.png" alt="">
							<span>中评</span>
						</div>
						<div class='evaCon'  @click='evaClick(1,index,item)'>
							<img src="../../assets/img/badBright.png" alt="">
							<span>差评</span>
						</div>
					</div>
					
				</div>
				<div  class='textArea'>
					<textarea placeholder="您的评价，能帮助到更多的用户哦" v-model='item.evaConent'></textarea>
				</div>
				<div class="show">  
		      		<div class='imgBox'  v-for='(items,idx) in item.evaImgArr'><img class='imgMain' :src="items" alt=""><img class='trash' src="../../assets/img/trash.png"  alt=""  @click='deleted(idx,item,index)'></div>
		 
		        	<div class='addImg' v-if='item.isShow'>
		        		<img src="../../assets/img/add.png" alt="">
		        		<input type="file" :id="'upload'+index" accept="image/*" @change="upload(index,item)" > <!-- accept="image/*" -->
		        	</div>
		      	</div> 
			</div>
			<div class='storeScore'>
				<p><img src="../../assets/img/storeIconAct.png" alt=""><span>店铺评分</span></p>
				<div class='Logistics'>
					<span>物流服务：</span>
					<div v-if='LogisticsIndex==0'>
						<img @click='LogisticsSer(1)' src="../../assets/img/starDim.png" alt="">
						<img @click='LogisticsSer(4)' src="../../assets/img/starDim.png" alt="">
						<img @click='LogisticsSer(6)' src="../../assets/img/starDim.png" alt="">
						<img @click='LogisticsSer(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='LogisticsSer(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='LogisticsIndex==1'>
						<img @click='LogisticsSer(1)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(4)' src="../../assets/img/starDim.png" alt="">
						<img @click='LogisticsSer(6)' src="../../assets/img/starDim.png" alt="">
						<img @click='LogisticsSer(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='LogisticsSer(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='LogisticsIndex==4'>
						<img @click='LogisticsSer(1)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(6)' src="../../assets/img/starDim.png" alt="">
						<img @click='LogisticsSer(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='LogisticsSer(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='LogisticsIndex==6'>
						<img @click='LogisticsSer(1)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(6)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='LogisticsSer(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='LogisticsIndex==8'>
						<img @click='LogisticsSer(1)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(6)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(8)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='LogisticsIndex==10'>
						<img @click='LogisticsSer(1)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(6)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(8)' src="../../assets/img/starBright.png" alt="">
						<img @click='LogisticsSer(10)' src="../../assets/img/starBright.png" alt="">
					</div>
				</div>
				<div class='Logistics'>
					<span>服务态度：</span>
					<div v-if='serviceIndex==0'>
						<img @click='service(1)' src="../../assets/img/starDim.png" alt="">
						<img @click='service(4)' src="../../assets/img/starDim.png" alt="">
						<img @click='service(6)' src="../../assets/img/starDim.png" alt="">
						<img @click='service(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='service(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='serviceIndex==1'>
						<img @click='service(1)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(4)' src="../../assets/img/starDim.png" alt="">
						<img @click='service(6)' src="../../assets/img/starDim.png" alt="">
						<img @click='service(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='service(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='serviceIndex==4'>
						<img @click='service(1)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(6)' src="../../assets/img/starDim.png" alt="">
						<img @click='service(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='service(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='serviceIndex==6'>
						<img @click='service(1)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(6)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='service(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='serviceIndex==8'>
						<img @click='service(1)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(6)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(8)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(10)' src="../../assets/img/starDim.png" alt="">
					</div>	
					<div v-if='serviceIndex==10'>
						<img @click='service(1)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(6)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(8)' src="../../assets/img/starBright.png" alt="">
						<img @click='service(10)' src="../../assets/img/starBright.png" alt="">
					</div>			
				</div>
				<div class='Logistics'>
					<span>描述相符：</span>
					<div v-if='describeIndex==0'>
						<img @click='describe(2)' src="../../assets/img/starDim.png" alt="">
						<img @click='describe(4)' src="../../assets/img/starDim.png" alt="">
						<img @click='describe(6)' src="../../assets/img/starDim.png" alt="">
						<img @click='describe(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='describe(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='describeIndex==2'>
						<img @click='describe(2)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(4)' src="../../assets/img/starDim.png" alt="">
						<img @click='describe(6)' src="../../assets/img/starDim.png" alt="">
						<img @click='describe(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='describe(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='describeIndex==4'>
						<img @click='describe(2)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(6)' src="../../assets/img/starDim.png" alt="">
						<img @click='describe(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='describe(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='describeIndex==6'>
						<img @click='describe(2)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(6)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(8)' src="../../assets/img/starDim.png" alt="">
						<img @click='describe(10)' src="../../assets/img/starDim.png" alt="">
					</div>
					<div v-if='describeIndex==8'>
						<img @click='describe(2)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(6)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(8)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(10)' src="../../assets/img/starDim.png" alt="">
					</div>	
					<div v-if='describeIndex==10'>
						<img @click='describe(2)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(4)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(6)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(8)' src="../../assets/img/starBright.png" alt="">
						<img @click='describe(10)' src="../../assets/img/starBright.png" alt="">
					</div>

				</div>
			</div>
		</div>
		<p class='release' @click='comment'>发布</p>
	</div>
</template>
<script>
import {commentAdd} from '../../http/api.js'
import  { ToastPlugin } from 'vux'
export default {
	data () {
    	return {
    		LogisticsIndex:'0',//物流服务星级
    		serviceIndex:'0',//服务态度星级
    		describeIndex:'0',//描述相符星级
    		evaIndex:'0',//好中差评
    		evaData:'',

    	}
    },
    methods: {
    	//物流服务
    	LogisticsSer(index){
    		this.LogisticsIndex=index
    	},
    	//服务态度
    	service(index){
    		this.serviceIndex=index
    	},
    	//描述相符
    	describe(index){
    		this.describeIndex=index
    	},
    	//好中差评
    	evaClick(score,idx,item){
    		item.evaScore=score
    		this.$set(this.evaData.order_goods,idx,item)    
    	},
    	upload (index,item) {  
			var srcUrl='http://v20-test.shunliandongli.com/uploads/uploadotherimage'
			var dataBox = new FormData()
	        dataBox.append('file',document.getElementById('upload'+index).files[0])
	        dataBox.fileName = document.getElementById('upload'+index).files[0]
	        this.$axios.post(srcUrl,dataBox).then((res) => {
	            if (res.data.success) {
	          		this.doMain=res.data.data.domain
	          		var src=this.doMain+res.data.data.relativePath[0]
	          		item.evaImgArr.push(src)
	          		item.evaImgArrShow.push(res.data.data.relativePath[0])
	          		if(item.evaImgArr.length>=5){
						item.isShow=false
	          		}else{
	          			item.isShow=true
	          		}
	          		this.$set(this.evaData.order_goods,index,item)
	            }
	        }, (error) => {

	        });
	    }, 
	    deleted(index,item ,idx){
	    	var header=item.evaImgArr.splice(index,1)
	    	var image=item.evaImgArrShow.splice(index,1)
	    	this.$set(this.evaData.order_goods,idx,item)
      		if(item.evaImgArr.length>=5){
				item.isShow=false
      		}else{
      			item.isShow=true
      		}
	    },
	    comment(){
	    	var goods=[]
	    	for(var i=0;i<this.evaData.order_goods.length;i++){
	    		if(this.evaData.order_goods[i].evaScore=='0'){
	    			this.evaData.order_goods[i].evaScore='5'
	    		}
	    		var PriceBox = {
					goods_id:this.evaData.order_goods[i].goods_id,
					star_level:this.evaData.order_goods[i].evaScore,
					content:this.evaData.order_goods[i].evaConent,
					images:this.evaData.order_goods[i].evaImgArrShow.join(','),
				}
				goods.push(PriceBox)
	    	}
	    	let info={
	    		ordersn:this.evaData.order_sn,
	    		ship_star_level:this.LogisticsIndex,
	    		service_star_level:this.serviceIndex,
	    		desc_star_level:this.describeIndex,
	    		goods:JSON.stringify(goods),
	    	}
	    	console.log(info,'info')
	    	if(this.LogisticsIndex==0||this.serviceIndex==0||this.describeIndex==0){
	    		this.$vux.toast.text('请对店铺进行评分', 'middle')
	    	}else{
		    	commentAdd(info).then((response)=>{
		    		if(response.data.code=='1000'){
		    			this.$vux.toast.text(response.data.message, 'middle')
	    				this.$router.push({path: '/evaSuccess'})
		    		}else{
	    				this.$vux.toast.text(response.data.message, 'middle')
	    			}
		    	})
	    	}

	    }
    },
    created(){
    	console.log(this.$route.query.evaluate_data)
    	this.evaData=this.$route.query.evaluate_data
    	for(var i=0;i<this.evaData.order_goods.length;i++){
			this.evaData.order_goods[i].evaConent='';
			this.evaData.order_goods[i].evaScore='0';
			this.evaData.order_goods[i].evaImgArr=[];
			this.evaData.order_goods[i].evaImgArrShow=[];
			this.evaData.order_goods[i].isShow=true;
    	}
    }
}	
</script>
<style lang='less'>
.rate{
	box-sizing: border-box;
	padding:0 0.266667rem;
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
	.goodsEva{
		padding-top:0.533333rem;
		padding-bottom:0.386667rem;
		overflow:hidden;
		span{
			display:inline-block;
			height:0.64rem;
			line-height: 0.64rem;
			font-size:0.4rem;
			color:#1C1B20;
			float:left;
			margin-right:0.48rem;
		}
		.evaConBox{
			float:left;
			.evaCon{
				float:left;
				img{
					float:left;
					width:0.64rem;
					height:0.64rem; 
					margin-right:0.213333rem;
				}
				span{
					color:#AAAAAA;
					margin-right:0.36rem;
				}
			}
		}

	}
	.textArea{
		width:100%;
		padding-bottom:0.4rem;
		border-bottom:1px solid #EEEEEE;
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
	.pic{
		.picBox{
			position:relative;
			width:2.026667rem;
			height:2.026667rem;
			background:#F5F5F5;
			border-radius: 4px;
			box-sizing: border-box;
			padding:0.653333rem;
			margin:0.4rem 0.106667rem 0.4rem 0;
			span{
				text-align: center;
				line-height:0.733333rem;
				display:inline-block;
				width:0.733333rem;
				height:0.733333rem;
				font-size:0.733333rem;	
			}
			input{
				position:absolute;
				left:0;
				top:0;
				width:100%;
				height:100%;
			}
		}
	}
	.border{
		height:0.2rem;
		width:100%;
		position:relative;
		i{	
			display:inline-block;
			height:100%;
			width:100%;
			background:#F7F7F7;
			position:absolute;
			top:0;
			left:-0.266667rem;
		}
		b{
			display:inline-block;
			height:100%;
			width:100%;
			background:#F7F7F7;
			position:absolute;
			right:-0.266667rem;
			top:0;
		}
	}
	.storeScore{
		margin-top:0.466667rem;
		p{
			overflow:hidden;
			margin-bottom:0.066667rem;
			img{
				width:0.453333rem;
				height:0.413333rem;
				margin-right:0.24rem;
				float:left;
			}
			span{
				float:left;
				font-size:0.4rem;
				line-height: 0.413333rem;
				height:0.413333rem;
				display:inline-block;
				margin-top:0.01rem;
			}			
		}
		.Logistics{
			overflow:hidden;
			margin-top:0.546667rem;
			div{
				img{
					width:0.453333rem;
					height:0.453333rem;
					margin-right:0.44rem;
					float:left;
				}
			}
			span{
				float:left;
				font-size:0.373333rem;
				height:0.453333rem;
				line-height:0.453333rem; 
				margin-right:0.613333rem;
			}
		}

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
	.rateCenter{
		margin-bottom:2rem;
	}

}
</style>