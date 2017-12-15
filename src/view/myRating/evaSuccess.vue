<template>
	<div class="evaSuccess">
		<div class='imgBox'>
			<img src="../../assets/img/evaSuccess.png" alt="">
		</div>
		<div class='evaSuccessCon'>
			<p class='evaContinue' v-if='evaList.length!=0'>接着评下去</p>
			<div v-for='item in evaList'>
			<div v-for='items in item.order_goods'>
				<div class='addReview'>
					<div class='addReviewLeft'>
						<img v-if='items.order_goods!=""' :src="items.order_goods" alt="">
						<img v-else src="../../assets/img/login_logo.png" alt="">
					</div>
					<div class='addReviewCenter'>
						<p>{{items.title}}</p>
					</div>
					<div class='addReviewRight'>
						<span @click='gotoEva(item)'>去评价</span>
					</div>
				</div>
				<div class='border'><b></b><i></i></div>
			</div>
			</div>
			<p  class='evaContinue' v-if='addList.length!=0'>这些商品可以追加</p>	
			<div>
				<div class='addReview  addView' v-for='item in addList'>
					<div class='addReviewLeft'>
						<img v-if='item.thumb!=""' :src="item.thumb" alt="">
						<img v-else src="../../assets/img/login_logo.png" alt="">
					</div>
					<div class='addReviewCen'>
						<p>{{item.title}}</p>
					</div>
					<div class='addReviewRight rightCon'>
						<span @click='addEva(item)'>去追评</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {memberCommentList,personalcenterOrderlist} from '../../http/api.js'
export default {
	data () {
    	return {
    		addList:[],
    		evaList:[]

    	}
    },
    methods: {
    	//追评列表
    	getAddList(){
    		memberCommentList({status:'1'}).then((response)=>{
    			if(response.data.code==1000){
    				this.addList=response.data.data.list
    			}
    		})
    	},
    	//评价列表
    	getEvaList(){
    		personalcenterOrderlist({status:'3'}).then((response)=>{
    			if(response.data.code==1000){
    				this.evaList=response.data.data.orders

    			}
    		})
    	},
    	//去追评
    	addEva(item){
    		this.$router.push({path: '/additionalReview',query:{items:item}})
    	},
    	//去评价
    	gotoEva(item){
    		this.$router.push({path: '/Rate',query:{evaluate_data:item}})
    	}
    },
    created(){
    	this.getAddList()
    	this.getEvaList()
    }
}	
</script>
<style lang='less'>
.evaSuccess{
	.imgBox{
		height:1.853333rem;
		width:100%;
		img{
			width:100%;
			height:100%;
		}
	}
	.evaSuccessCon{
		box-sizing: border-box;
		padding:0 0.266667rem;
		.evaContinue{
			height:0.373333rem;
			line-height: 0.373333rem;
			font-size:0.373333rem;
			margin-top:0.56rem;
			margin-bottom:0.466667rem;
			text-align: center;
		}	
		.addReview{
			display:flex;
			margin-bottom:0.8rem;
			.addReviewLeft{
				width:1.6rem;
				height:1.6rem;
				float:left;
				img{
					width:100%;
					height:100%;
				}
			}
			.addReviewCenter{
				flex:1;
				font-size: 0.346667rem;
				line-height: 0.48rem;
				box-sizing: border-box;
				padding:0.333333rem;
				background:#F7F7F7;
				color:#1C1B20;
			}
			.addReviewCen{
				color:#1C1B20;
				font-size:0.346667rem;
				box-sizing: border-box;
				padding:0.626667rem 0.333333rem;
				background:#F7F7F7;
				p{
					width:5.533333rem;				
					overflow : hidden;
					text-overflow: ellipsis;
					white-space:nowrap;
				}

			}
			.addReviewRight{
				width:1.6rem;
				height:1.6rem;
				float:right;
				span{
					display:inline-block;
					width:100%;
					height:100%;
					text-align: center;
					line-height: 1.6rem;
					font-size: 0.346667rem;
					background:#FF0036;
					color:white; 
				}				
			}
			.rightCon{
				span{
					background:#FEEAEA;
					color:#FF0036;
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
		.addView{
			margin-bottom:0.266667rem;
		}
	}

}
</style>
