<template>
	<div class="sortSecond">
		<div class='search'>
			<div>
				<input type="text">
				<div><span>裙子</span><img src="../../assets/img/close.png" alt=""></div>
			</div>
			<div class='classify' @click='goToSort'><img src="../../assets/img/sortBlack.png" alt=""></span><b>分类</b></div>
		</div>

		<storeGoods></storeGoods>
	</div>
</template>
<script>
import storeGoods from './storeGoods';
export default{
	components: {
        'storeGoods':storeGoods,
    },
	data(){
		return {
		
		}
	},
	methods:{
    	//点击分类
    	goToSort(){
    		this.$router.push({path:"/sort",query:{storeId:this.storeId}})
    	}
		
	},
	created(){
		
	}
}
</script>
<style lang='less'>
.search{
	height:0.933333rem;
	margin-bottom:0.133333rem;
	padding-top:0.066667rem;
	div{
		width:8.2rem;
		height:0.906667rem;
		float:left;
	}
	input{
		width:100%;
		height:100%;
		border:none;
		background:#EDEDED;
		border-radius: 0.106667rem;
		color:white;
		font-size:0.36rem;
		box-sizing: border-box;
		padding:0 0.133333rem;
		margin-left:0.133333rem;
	}
	input::-webkit-input-placeholder{
		color:white;
	}
	.inputBox{
		float:left;
	}
	.classify{
		float:right;
		margin-top:0.056667rem;
		margin-left:0.306667rem;
		width:0.64rem;
		text-align: center;
		margin-right:0.266667rem;
		b{
			color:#858585;
			font-size:0.266667rem;
			width:100%;
			display:inline-block;
		}
		img{
			width:0.506667rem;
			height:0.466667rem;
		}
	}
} 
.storeGoods  {
	.fourFlex{
	    border-top: 1px solid white!important;
    }
}

</style>