<template>
	<div class="official">
		<!-- 物品表头 -->
		<div class="offic-head">			
			<p class="offic-name"><img src="../../../assets/img/storeIconAct.png" alt="">adidas官方旗舰店</p>
		</div>
		<!-- 物品图片部分 -->
		<div class="offic-pic">
			<img src="" class="offic-print"></img>
			<!-- 中间内容部分 -->
			<div class="offic-details">
				<div class="offic-intro">adidas 阿迪达斯111 足球 男子 COPA 18.2 FG 足球鞋 BB6357</div>
				<div class="offic-model"><span>亮白</span>/<span>1号黑色</span>/<span>质感金</span></div>
			</div>
			<!-- 价钱 -->
			<div class="offic-price">
				<p class="offic-pri">￥799.00</p>
				<span class="mul">×1</span>
			</div>
		</div>
		<!-- 换货详情 -->
		<div class="barter-details">
			<div class="bar-cause">换货原因: <span class="bar-cau">拍错/多拍/不想要</span></div>
			<div class="bar-quantitl">换货数量: <span class="bar-quan">1</span></div>
			<div class="bar-time">申请时间: <span class="bar-cau">2017-9-26 14:42:65</span></div>
			<div class="bar-number">换货编号: <span class="bar-cau">33333333</span></div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {

		}
	},





}	

</script>

<style>
	/*物品表头*/
	.offic-head {
		box-sizing: border-box;
		padding: 0.35rem 0.27rem;
		border-bottom: 1px solid #eee;
	}
	.offic-name {
		font-size: 0.37rem;
		color: #1C1B20;		
	}
	.offic-name img {
		margin-right: 0.2rem;
		width: 0.36rem;
		height: 0.33rem;
	}
	/*物品图片部分*/
	.offic-pic {
		padding: 0.27rem;
		border-bottom: 1px solid #eee;
		box-sizing: border-box;
		overflow: hidden;
	}
	.offic-print {
		width: 2.13rem;
		height: 2.13rem;
		float: left;
		background-color: pink;
	}
	/*内容部分*/
	.offic-details {
		float: left;
		padding-left: 0.33rem;
		box-sizing: border-box;
	}
	.offic-intro {
		width: 4.89rem;

	}
	.offic-model {
		font-size: 0.32rem;
		color: #858585;
		margin-top: 0.11rem;
	}
	.offic-price {
		font-size: 0.37rem;
		color: #1C1B20;
		float: right;
	}
	.offic-price .mul {
		float: right;
		font-size: 0.32rem;
		color: #858585;
	}
	/*换货详情*/
	.barter-details {
		box-sizing: border-box;
		font-size: 0.32rem;
		color: #858585;
		padding: 0.27rem;
	}
	.barter-details div {
		margin-bottom: 0.2rem;
	}
</style>