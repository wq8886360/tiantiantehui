<template>
	<div class="meragree">
		<!-- 物流计时组件 -->
		<Exchange></Exchange>
		<!-- 计时提示组件 -->
		<Leave></Leave>
		<!-- 转行条 -->
		<div class="line"></div>
		<!-- 退货地址 -->
		<div class="sales-return">
			<div class="sare-title">退货地址</div>
			<div class="sare-parlic">
				<div class="man-phone">
					<span class="consignee">收件人：adidas官方旗舰店</span>
					<span class="sare-ph">联系电话：13569855874</span>
				</div>
				<p class="address">浙江省 杭州市 滨江区 江陵路1916号星耀城二期29楼705 浙江顺联网络科技有限公司</p>
			</div>
		</div>
		<!-- 转行条 -->
		<div class="line"></div>
		<!-- 收货地址 -->
		<div class="sales-return">
			<div class="sare-title">收货地址</div>
			<div class="sare-parlic">
				<div class="man-phone">
					<span class="consignee">收件人：来自阿拉斯加的南极圈的..</span>
					<span class="sare-ph">联系电话：13569855874</span>
				</div>
				<p class="address">浙江省 杭州市 滨江区 江陵路1916号星耀城二期29楼705</p>
			</div>
		</div>
		<!-- 转行条 -->
		<div class="line"></div>
		<!-- 物品详情子组件 -->
		<Offcial></Offcial>
		<div class="line"></div>
		<!-- 联系商家子组价 -->
		<Relation></Relation>
		<!-- 换货关闭 -->
		<div class="close" @click="close">关闭</div>
		<span class="wuliu" @click="wuliu">输入物流</span>
	</div>
</template>

<script>
import Offcial from './public/offcialshop'
import Relation from './public/relationmer'
import Exchange from './public/exchangeTop'	
import Leave from './public/leave'
export default {
	data() {
		return {

		}
	},
	components:{
		Offcial,
		Relation,
		Exchange,
		Leave
	},
	methods:{
		close(){
			this.$router.push({path:'uncommitted'})
		},
		wuliu(){
			this.$router.push({path:'inputlogistics'})
		}
	}
}	

</script>

<style lang="less">
	.meragree {
		margin-bottom: 1.33rem;
		background-color: #F7F7F7;

	/*物流计时*/
	.pink {
		width: 100%;
		height: 6.23rem;
		background-color: pink;
	}
	/*转行条*/
	.line {
		width: 100%;
		height: 0.27rem;
		background-color: #F7F7F7;
	} 
	/*退货地址*/
	.sales-return {
		box-sizing: border-box;
		padding: 0 0.27rem;
		background-color: #fff;
		.sare-title {
			padding: 0.36rem 0;
			font-size: 0.37rem;
			border-bottom: 1px solid #eee;
		}
		.sare-parlic {
			box-sizing: border-box;
			padding: 0.4rem 0;
			
			.man-phone {
				overflow: hidden;

				.consignee {
					float: left;
				}
				.sare-ph {
					float: right ;
				}
			}
			.address {
				margin-top: 0.27rem;
			}
		}
	}
	/*换货关闭*/
	.close {
		width: 0.67rem;
		height: 0.67rem;
		background-color: red;
	}
	.wuliu {
		background-color: green;
	}
}
</style>