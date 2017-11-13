<template>
	<div class="goodsdetails" v-if="data">
		<!-- 商品banner -->
		<swiper dots-position='center' :aspect-ratio="1/1">
			<swiper-item v-for="(item, index) in pics" :key="index">
				<img class="bannerimg" :src="item" alt="">
			</swiper-item>
		</swiper>
		<!-- 商品标题描述信息 -->
		<div class="information div_box">
			<!-- 标题、收藏功能 -->
			<div class="title">
				<div class="text"><span class="titletag" v-if="data['is_preferential']">店铺优惠</span>{{data.title}}</div>
				<div class="collect">
					<div class="border1px"></div>
				</div>
			</div>
			<!-- 价格、标签 -->
			<div class="price">
				<span class="newprice">¥{{data['price']}}</span>
				<del class="oldprice">¥{{data['market_price']}}</del>
				<img v-if="data['is_new']" src="../../assets/img/newProduct.png" alt="">
				<img v-if="data['is_explosion']" src="../../assets/img/hotstyle.png" alt="">
				<img v-if="data['is_hot']" src="../../assets/img/Hotsell.png" alt="">
			</div>
			<!-- 销售量 -->
			<div class="sales">
				<flexbox :gutter="0" wrap="wrap">
					<flexbox-item :span="1/3"><p class="textleft" v-if="data['free_shipping'] == 1">包邮</p></flexbox-item>
					<flexbox-item :span="1/3"><p class="textcenter">已售{{data['goods_data']['sales']}}件</p></flexbox-item>
					<flexbox-item :span="1/3"><p class="textright">{{data['area']}}</p></flexbox-item>
				</flexbox>
			</div>
		</div>
		<!-- 领券 -->
		<div class="voucher div_box">
			<div class="label">领券</div>
			<div class="voucherlist">
				<span v-for="item in 3">满999减199</span>
			</div>
			<i class="icon-right right"></i>
		</div>
		<!-- 分割 -->
		<div class="line"></div>
		<!-- 活动 -->
		<div class="activity div_box">
			<div class="label">活动</div>
			<div class="content">
				<div class="list" v-for='item in 4'>
					<span class="ai">满减</span>
					<span>满300减20，满400减30</span>
					<i class="icon-right right"></i>
				</div>
			</div>
		</div>
		<div class="line"></div>
		<!-- 套餐 -->
		<div class="meal div_box">
			<div class="label">套餐</div>
			<span>查看套餐</span>
			<i class="icon-right right"></i>
		</div>
		<!-- 产品参数 -->
		<div class="div_box parameter" @click="attrsState = true">
			<div class="label">产品参数</div>
			<span></span>
			<i class="icon-right right"></i>
		</div>
		<div class="line"></div>
		<!-- 选择 -->
		<div class="div_box choose" @click="specsState = true">
			<div class="label">选择</div>
			<span>颜色</span>
			<span>尺码</span>
			<i class="icon-right right"></i>
		</div>
		<div class="line"></div>
		<!-- 服务 -->
		<div class="div_box service">
			<span><img src="../../assets/img/support.png" alt="">7天无理由退后</span>
			<span><img src="../../assets/img/support.png" alt="">正品保障</span>
			<span><img src="../../assets/img/support.png" alt="">24小时发货</span>
		</div>

		<!-- 评价 -->
		<div class='appraiseBox'>
			<div class='appraise'>
				<p><div class='divLeft'><b>评价</b><b>(36)</b></div><div class='divRight'><span>好评率</span><span>98.6%</span><i class='icon-right'></i></div></p>
			</div>
			<div class='appraiseInfo'>
				<div class='infoLeft'>
					<div class='infoLeftCon'>
						<div class='leftTitle'>
							<img class='head' src="../../assets/img/attentionWhite.png" alt="">
							<span>是阿斯达</span>
							<img class='level' src="../../assets/img/V1.png" alt="">
						</div>
						<p>哈登哈卡的风阿斯蒂芬加拉斯地方阿苏的房间里打发士大夫阿斯蒂芬卡迪夫撒旦法撒旦法阿斯蒂芬</p>
					</div>
					<div class='infoRightCon'>
						<img src="../../assets/img/attentionWhite.png" alt="">
					</div>
				</div>
				<div class='infoLeft'>
					<div class='infoLeftCon'>
						<div class='leftTitle'>
							<img class='head' src="../../assets/img/attentionWhite.png" alt="">
							<span>是阿斯达</span>
							<img class='level' src="../../assets/img/V1.png" alt="">
						</div>
						<p>哈登哈卡的风阿斯蒂芬加拉斯地方阿苏的房间里打发士大夫阿斯蒂芬卡迪夫撒旦法撒旦法阿斯蒂芬</p>
					</div>
					<div class='infoRightCon'>
						<img src="../../assets/img/attentionWhite.png" alt="">
					</div>
				</div>
				<div class='infoLeft moreAppraise'>
					<span>更多评论></span>
				</div>
			</div>
			<div class='border'></div>
		</div>

		<!-- 收藏 -->
		<div class='collect'>
			<div class='storeCollectInfo'>
				<img src="../../assets/img/attentionWhite.png" alt="">
				<div class='stars'>
					<p>浙江丽水喜来多旗舰店<span>品质</span></p>
					<p><img src="../../assets/img/stars.png" alt=""></p>
				</div>
				<b>已收藏</b>
			</div>
			<ul>
				<li>
					<p><b>15646865</b></p>
					<p><span>商品数</span></p>
				</li>
				<li>
					<p><b>45457</b></p>
					<p><span>收藏数</span></p>
				</li>
				<li>
					<p><span>描述相符</span><b>4.63</b></p>
					<p><span>质量满意</span><b>4.63</b></p>
				</li>
			</ul>
		</div>
		<div class='footprint'>
			<img src="../../assets/img/footprint.png" alt="">
		</div>
		<div class='goToTop' v-show='goTop' @click='goToTop'> 
			<img src="../../assets/img/goTop.png" alt="" >
		</div>





		<!-- 商品参数弹窗 -->
		<div v-transfer-dom>
			<popup v-model="attrsState" position="bottom" max-height="50%">
				<div class="attrpopu">
					<div class="attrpoputitle">商品参数<i class="icon-close right" @click="attrsState = false"></i></div>
					<div class="attrcontent">
						<div class="list" v-for="item in data['attrs']">
							<div class="label">{{item['label']}}</div>
							<div class="value">{{item['value']}}</div>
						</div>
					</div>
				</div>
			</popup>
		</div>

		<!-- 商品sku -->
		<div v-transfer-dom class="sku_dig">
			<popup v-model="specsState" position="bottom" max-height="50%">
				<div class="specspopu">
					<i class="icon-close right" @click="specsState = false"></i>
					<div class="thumb"><img :src="defaultimage" alt=""></div>
					<div class="title">
						<p class="price">¥{{data['price']}}</p>
						<p class="stock">库存{{stock}}件</p>
						<p class="specification">请选择规格</p>
					</div>
				</div>
			</popup>
		</div>
	</div>
</template>
<script>
import { Swiper, SwiperItem, Flexbox, FlexboxItem, TransferDom, Popup } from 'vux'
import { goodsdetail } from '../../http/api.js'
export default{
	directives: {
		TransferDom
	},
	components: {
		Swiper,
		SwiperItem,
		Flexbox,
		FlexboxItem,
		Popup
	},
	data(){
		return {
			scroll:'', //滚动条高度
			goTop:false, //是否显示回到顶部按钮
			data: null,
			goods_id: 148, //商品ID
			pics: null, //banner列表
			attrsState: false, //商品参数显示状态
			specsState: false, //商品规格显示状态
			defaultimage: null, //商品规格默认图片
			stock: null, //默认库存
		}
	},
	methods:{
		goodsdetail_api(){
			goodsdetail({goods_id: this.goods_id}).then((response) => {
				console.log(response)
				let res = response.data;
				if(res.code === 1000){
					this.data = res.data;
					this.defaultimage = res.data.pics[0];
					this.stock = res.data.stock;
					this.pics = res.data.pics;
				}
			})
		},
		//滚动事件
		Scroll() {
    		this.scroll = document.body.scrollTop;
    		let curHeight = document.documentElement.clientHeight;
    		console.log(this.scroll)
    		console.log(curHeight)
    		if(curHeight/2<=this.scroll){
    			this.goTop=true
    		}else{
    			this.goTop=false
    		}

   		},
   		//回到顶部
   		goToTop(){
   			let timer = setInterval(function(){
	            //获取滚动条的滚动高度
	            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
	            //用于设置速度差，产生缓动的效果
	            var speed = Math.floor(-osTop / 6);
	            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
	            if(osTop == 0){
	                clearInterval(timer);
	            }
	        },30);
	   	}
	},
	created(){
		this.goodsdetail_api();
	},
	mounted() {
   		window.addEventListener('scroll', this.Scroll)
  	},
}
</script>
<style lang="less">
@import '../../assets/css/component/goodsdetails.less';
</style>