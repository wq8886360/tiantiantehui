<template>
	<div class="merrefgoods">
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
		<!-- 商家发货物流 -->
		<div class="logistics">
			<span class="logspan">商家发货物流</span>
			<span class="logname">百世快递(656655656454)
			</span>
			<i class="icon-right right"></i>
		</div>
		<div class="logistics">
			<span class="logspan">商家退货物流</span>
			<span class="logname">百世快递(656655656454)
			</span>
			<i class="icon-right right"></i>
		</div>
		<div class="line"></div>
		<!-- 物品详情子组件 -->
		<Offcial></Offcial>
		<div class="line"></div>
		<!-- 联系商家子组价 -->
		<Relation></Relation>
		<!-- 平台介入 -->
		<span class="pingtai" @click="terrace">申请平台介入</span>
		<!-- 换货关闭 -->
		<span class="guanbi" @click="close">换货关闭</span>

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
		terrace(){
			this.$router.push({path:'applyterraceget'})
		},
		close(){
			this.$router.push({path:'closeovertime'})
		}
	}
}	

</script>

<style lang="less">
	.merrefgoods {
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
	/*发货物流*/
	.logistics {
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 0.35rem 0.27rem;
		border-bottom: 1px solid #eee;
		overflow: hidden;
		line-height: 1;
		.logspan {
			font-size: 0.37rem;
			float: left;
		}
		.logname {
			font-size: 0.32rem;
			color: #858585;
			/*float: right;*/
			margin-left: 3.07rem;
		}
		.icon-right {
			margin-top: 0.05rem;
		}
	}

	/*平台*/
	.pingtai {
		background-color: pink;
	}
	.guanbi {
		background-color: red;
	}
}
</style>