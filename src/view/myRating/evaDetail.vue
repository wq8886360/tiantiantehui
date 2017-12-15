<template>
	<div class="evaDetail">
		<div class='title'>
			<img v-if='myInfo.avatar!=""' :src="myInfo.avatar" alt="">
			<img v-else src="../../assets/img/login_logo.png" alt="">
			<span>海绵宝宝的派大星</span>
		</div>
		<div class='border'></div>
		<div class='evaCon'>
			<p class='pDetail'>评价详情:</p>
			<p class='pCon'>{{detailData.content}}</p>
			<p class='addReviewTitle'>{{detailData.append_note}}</p>
			<p  class='pCon'>{{detailData.append}}</p>
			<div class='rateCon'>
				<div class='rateGoodLeft'>
					<img v-if='detailData.thumb!=""' :src="detailData.thumb" alt="">
					<img v-else src="../../assets/img/login_logo.png" alt="">
				</div>
				<div  class='rateGoodRight'>
					<p>{{detailData.title}}</p>
					<p class='price'>￥{{detailData.price}}</p>
				</div>
			</div>
			<div class='goodeva'>
				<span @click='changeGoodEva(detailData)' v-if='detailData.is_change==1'>改为好评</span>
				<span class='reviewEva' @click='addEva(detailData)' v-if='detailData.is_append==1'>写追评</span>
			</div>
		</div>	
		
	</div>
</template>
<script>
import {commentDetalis} from '../../http/api.js'
export default {
	data () {
    	return {
    		detailData:'',//商品详情
    		myInfo:'',
    	}
    },
    methods: {
    	addEva(item){
    		this.$router.push({path: '/additionalReview',query:{items:item}})
    	},
    	changeGoodEva(item){
    		this.$router.push({path: '/changeGoodEva',query:{items:item}})
    	},
    	evaDetail(){
    		commentDetalis({comment_id:this.$route.query.comment_id}).then((response)=>{
    			if(response.data.code==1000){
    				this.detailData=response.data.data.list
    			}
    		})
    	}
    },
    created(){
    	this.myInfo=this.$route.query.myInfo
    	this.evaDetail()
    }
}	
</script>
<style lang='less'>
.evaDetail{
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
	.title{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		box-sizing: border-box;
		padding:0.36rem 0.266667rem;
		overflow: hidden;
		background:white;
		img{
			width:0.75rem;
			height:0.75rem;
			border-radius: 100%;
			float:left;
		}
		span{
			float:left;
			height:0.75rem;
			line-height:0.75rem;
			margin-left:0.146667rem;
			font-size:0.373333rem;
		}
	}
	.border{
		margin-top:1.47rem;
		height:0.2rem;
		width:100%;
		background:#F7F7F7;
	}
	.rateCon{
		display:flex;
		padding-bottom:0.36rem;
		border-bottom:1px solid #EEEEEE;
		padding-top:0.613333rem;
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
	.evaCon{
		box-sizing: border-box;
		padding:0 0.266667rem;
		.pDetail{
			font-size:0.4rem;
			height:0.4rem;
			line-height: 0.4rem;
			margin:0.466667rem 0;
		}
		.pCon{
			line-height: 0.533333rem;
			font-size:0.4rem;
			color:#1C1B20;
		}
		.addReviewTitle{
			font-size: 0.4rem;
			height:0.4rem;
			line-height: 0.4rem;
			color:#FB0036 ;
			margin-top:0.533333rem;
			margin-bottom:0.453333rem;
		}
		.goodeva{
			margin-top:0.613333rem;
			overflow:hidden;
			span{
				width:3.013333rem;
				height:1.013333rem;
				display:inline-block;
				text-align: center;
				float:right;
				line-height: 1.013333rem;
				background:#FD523C;
				color: white;
				border-radius: 4px;
				font-size:0.4rem;
			}
			.reviewEva{
				background:#FF8A18;
				margin-right:0.213333rem;
			}
		}
	}
}
</style>