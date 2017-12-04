<template>
	<div class="footer">
		<div class='footerLeft'>
			<div>
				<img src="../../assets/img/sort.png" alt="">
			</div>
			<p>宝贝分类</p>
		</div>
		<div class='footerCenter' @click='toStoreIntro'>
			店铺简介
		</div>
		<div class='footerRight'>
			<div>
				<img src="../../assets/img/xiaoxi.png" alt="">
			</div>
			<p>客服</p>
		</div> 
	</div>
</template>
<script>

export default {
	props: ['data'],
	data(){
		return {
			storeId:''//店铺id
		}
	},
	created() {
		this.storeId=this.data
	},
	methods:{
		toStoreIntro() {
			this.$router.push({path:"/profile",query:{storeId:this.storeId}})
   		},
	}
}
	
</script>
<style lang="less">
	.footer{
		.footerLeft{
			float:left;
			height:100%;
			width:4.253333rem;
			border-right:1px solid #D8D8D8;
			text-align: center;
			div{
				width:0.386667rem;
				height:100%;
				float:left;
				margin-left:1.026667rem;
				margin-right:0.266667rem;
				img{
					width:100%;
				}
			}
			p{
				float:left;
			}
		}
		.footerCenter{
			float:left;
			height:100%;
			width:4.253333rem;
			text-align: center;
			border-right:1px solid #D8D8D8;
		}
		.footerRight{
			float:left;
			height:100%;
			-webkit-flex: 1;
			flex:1;
			position:relative;
			div{
				position:absolute;
				top:-0.24rem;
				left:0.533333rem;
				width:0.426667rem;
				height:0.426667rem;
				img{
					width:100%;
					height:100%;
				}
			}
			p{
				position:absolute;
				top:0.24rem;
				left:0.43rem;
				font-size:0.28rem;
				height:0.28rem;
				line-height:0.28rem;
				margin-top:0.106667rem;
				width:0.7rem;
				text-align: center;
			}
		}
	}




</style>