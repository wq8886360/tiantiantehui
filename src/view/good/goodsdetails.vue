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
					<img @click="collect" v-if="is_fav == 0" src="../../assets/img/icon_souchag_n.png" style="width: 0.6rem;" alt="">
					<img @click="romovecollect" v-if="is_fav == 1" src="../../assets/img/icon_souchag_h.png" style="width: 0.6rem;" alt="">
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
		<div class="voucher div_box" @click="couponsState = true" v-if="data['voucher'].length != 0">
			<div class="label">领券</div>
			<div class="voucherlist">
				<span v-if="data['voucher'].length > 3" v-for="item in 3">满{{Number(data['voucher'][item]['use_condition'])}}减{{data['voucher'][item]['denomination']}}</span>
				<span v-if="data['voucher'].length < 3" v-for="items in data['voucher']">满{{items['use_condition']}}减{{items['denomination']}}</span>
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
			<span>{{choosespecs}}</span>
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
				<img :src="data['store_info']['store_icon']" alt="">
				<div class='stars'>
					<p>{{data['store_info']['decoration_name']}}<span v-if="data['store_info']['quality_logo']">品质</span></p>
					<p><img v-for="item in Number(data['store_info']['star'])" src="../../assets/img/stars.png" alt=""></p>
				</div>
				<b>已收藏</b>
			</div>
			<ul>
				<li>
					<p><b>{{data['store_info']['goods_count']}}</b></p>
					<p><span>商品数</span></p>
				</li>
				<li>
					<p><b>{{data['store_info']['attention_count']}}</b></p>
					<p><span>收藏数</span></p>
				</li>
				<li>
					<p><span>描述相符</span><b>{{data['store_info']['description_consistency']}}</b></p>
					<p><span>质量满意</span><b>{{data['store_info']['quality_satisfy']}}</b></p>
				</li>
			</ul>
		</div>

		<!-- tab切换 -->
		<tab :line-width="1">
	    	<tab-item selected @on-item-click="onItemClick">本店热销</tab-item>
	    	<tab-item @on-item-click="onItemClick">店主推荐</tab-item>
    	</tab>
    	<div class='hotSellBox' v-if='tabIndex==0' style="width:100%;overflow:auto;">
	    	<scroller lock-y :scrollbar-x=false>
	    		<div :style="'width:'+ data['store_info']['hot'].length * 3.5 + 'rem'">
			    	<div class='hotSell'  style="float:left;" v-for="item in data['store_info']['hot']">
			    		<img :src="item['thumb']" alt="">
			    		<p>{{item['title']}}</p>
						<div><span>￥</span><b>{{item['price']}}</b></div>
			    	</div>
			    </div>	
			</scroller>
    	</div>
    	<div class='hotSellBox' v-if='tabIndex==1' style="width:100%;overflow:auto;">
    		<scroller lock-y :scrollbar-x=false>
    			<div :style="'width:'+ data['store_info']['push'].length * 3.5 + 'rem'">
			    	<div class='hotSell'  style="float:left;" v-for="item in data['store_info']['push']">
			    		<img :src="item['thumb']" alt="">
			    		<p>{{item['title']}}</p>
						<div><span>￥</span><b>{{item['price']}}</b></div>
			    	</div>
			    </div>	
		    </scroller>
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

		<!-- 领取优惠卷弹窗 -->
		<div v-transfer-dom>
			<popup v-model="couponsState" position="bottom" max-height="80%">
				<div class="attrpopu couponspupu">
					<div class="attrpoputitle">领取店铺优惠卷<i class="icon-close right" @click="couponsState = false"></i></div>
					<div class="attrcontent">
						<scroller lock-x height="100%">
							<div>
								<div class="box" v-for="item in data['voucher']">
									<!-- 未领取 -->
									<div class="bg" v-if="item['is_get'] == '0'"><img src="../../assets/img/pickupbg.png" alt=""></div>
									<!-- 领取 -->
									<div class="bg" v-if="item['is_get'] == '1'"><img src="../../assets/img/nopickupbg.png" alt=""></div>
									<div class="content">
										<div class="left">
											¥{{item['denomination']}}
										</div>
										<div class="right">
											<p class="rule" v-if="item['use_condition'] != '0'">满{{Number(item['use_condition'])}}使用</p>
											<p class="rule" v-if="item['use_condition'] == '0'">无门槛优惠劵</p>
											<p class="type">{{item['title']}}</p>
											<!-- <p class="type" v-if="item['goods_scope'] == 'ALL'">全店通用</p>
											<p class="type" v-if="item['goods_scope'] == 'ASSIGN'">指定商品</p> -->
											<p class="time">有效期：{{item['start_time']}}-{{item['end_time']}}</p>
											<div class="pickupbtn btn" v-if="item['is_get'] == '1'">已领取</div>
											<div class="unpickupbtn btn" v-if="item['is_get'] == '0'" @click="getVoucher_api(item['voucher_id'])">领取</div>
										</div>

									</div>
								</div>
							</div>	
						</scroller>	
					</div>
				</div>
			</popup>
		</div>

		<!-- 商品sku -->
		<div v-transfer-dom class="sku_dig">
			<popup v-model="specsState" position="bottom" max-height="80%">
				<div class="specspopu">
					<i class="icon-close right" @click="specsState = false"></i>
					<div class="thumb"><img :src="defaultimage" alt=""></div>
					<div class="title">
						<p class="price">¥{{defaultprice}}</p>
						<p class="stock">库存{{stock}}件</p>
						<p class="specification">{{specstitle}}</p>
					</div>
					<div class="list">
						<div class="content" v-for="(item,index) in specs">
							<p class="specsTitle">{{item['name']}}</p>
							<div>
								<checker v-model="bindId[index]['id']" radio-required default-item-class="uncheck" selected-item-class="check">
									<checker-item v-for="(items,index) in item['values']" :value="items['id']" :key="index">{{items['name']}}</checker-item>
								</checker>
							</div>
						</div>
						<div class="num">
							<x-number title="数量" v-model="goodNum" :min="1"></x-number>
						</div>
					</div>
					<div class="success_btn" @click="specsdetermine">确定</div>
				</div>
			</popup>
		</div>


		<!-- 地步按钮 -->
		<div class="bottom_btn">
			<div class="left">
				<div><img src="../../assets/img/service_icon.png" alt="">客服</div>
				<div @click="gostore"><img src="../../assets/img/shop_icon.png" alt="">店铺</div>
				<div @click="gotoshopcar"><img src="../../assets/img/shopcar_icon.png"  alt="">购物车</div>
				<div class="noborder"></div>
			</div>
			<div class="right">
				<div class="join btn" @click="joincar">加入购物车</div>
				<div class="buy btn">立即购买</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Swiper, Scroller, SwiperItem, Group, Tab, TabItem, Flexbox, XNumber, FlexboxItem, TransferDom, Popup, Checker, CheckerItem } from 'vux'
import { goodsdetail, cartadd, carthome, getVoucher, goodsfavoriteadd, goodsfavoriteremove } from '../../http/api.js'
export default{
	directives: {
		TransferDom
	},
	components: {
		Swiper,
		SwiperItem,
		Flexbox,
		FlexboxItem,
		Popup,
		Checker,
    	CheckerItem,
    	XNumber,
    	Group,
    	Tab,
    	TabItem,
    	Scroller
	},
	data(){
		return {
			tabIndex: 0,
			scroll:'', //滚动条高度
			goTop:false, //是否显示回到顶部按钮
			data: null,
			goods_id: 151, //商品ID
			pics: null, //banner列表
			attrsState: false, //商品参数显示状态
			specsState: false, //商品规格显示状态
			couponsState: false, //领取店铺优惠卷显示状态
			is_fav: null, //是否关注了商品
			favorite_id: null, //收藏记录ID

			defaultimage: null, //商品规格默认图片
			stock: null, //默认库存
			specstitle: '请选择规格', //规格描述
			defaultprice: '', //规格价格

			sku: null, //sku表
			specs: null, //上屏规格
			bindId: [], //规格选择ID值
			skuid: '', //商品skuid
			sku_id: '', //确定后的sku_id
			goodNum: 1, //加入购物车数量
			choosespecs: '', //选择后的规格

		}
	},
	watch:{
		'bindId':{
			handler:function(){
				let idArr = this.bindId.map((val,index,arr) => {
					return val['id'];
				})
				//id从大到小排序
				idArr.sort(function (x,y) {
		            return x-y;
		        });
				let idArrStr = idArr.join('_');
				//查询sku
				this.sku.map((val,index,arr) => {
					if(val['specs'] == idArrStr){
						if(val.thumb){
							this.defaultimage = val.thumb;
						}
						this.defaultprice = val.price;
						this.specstitle = val.name;
						this.stock = val.stock;
						this.skuid = val.id;
						return val;
					}else{
						return false;
					}
				})
			},
			deep: true
		}
	},
	methods:{
		onItemClick (index) {
      		this.tabIndex=index
    	},
		goodsdetail_api(){
			goodsdetail({goods_id: this.goods_id}).then((response) => {
				console.log(response)
				let res = response.data;
				if(res.code === 1000){
					this.data = res.data;
					this.defaultimage = res.data.pics[0];
					this.stock = res.data.stock;
					this.defaultprice = res.data.price;
					this.pics = res.data.pics;
					this.sku = res.data.sku;
					this.specs = res.data.specs;
					this.is_fav = res.data.is_fav;
					//遍历商品规格
					res.data.specs.forEach((val,index,arr) => {
						this.choosespecs += ` ${val.name}`;
						this.bindId.push({id: '',name: val.name})
					})
				}
			})
		},
		//滚动事件
		Scroll() {
    		this.scroll = document.body.scrollTop;
    		let curHeight = document.documentElement.clientHeight;
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
	   	},
	   	//普通领取优惠劵
	   	getVoucher_api(voucher_id){
	   		getVoucher({voucher_id: voucher_id}).then((response) => {
	   			console.log(response)
	   			let res = response.data
	   			if(res.code === 1000){

	   			}else{
	   				this.$vux.toast.text(res.message, 'middle')
	   			}
	   		})
	   	},
	   	//商品规格确定按钮
	   	specsdetermine(){
	   		let is_up = true;
	   		this.bindId.forEach((val,index,arr) => {
	   			if(!val['id']){
	   				is_up = false
	   				this.$vux.toast.text(`请选择${val['name']}`, 'middle')
	   				return false;
	   			}
	   		})
	   		if(is_up){
	   			this.choosespecs = this.specstitle;
	   			this.sku_id = this.skuid
	   			is_up = true;
	   			this.cartadd_api()
	   		}
	   	},
	   	cartadd_api(){
	   		cartadd({goods_id: this.goods_id,sku_id: this.sku_id,qty: this.goodNum}).then((response) => {
				console.log(response)
				if(response.data.code === 1000){
					this.specsState = false;
					this.$vux.toast.text('操作成功', 'middle')
				}else{
					this.$vux.toast.text(response.data.message, 'middle')
				}
			})
	   	},
	   	//加入购物车
	   	joincar(){
	   		this.specsState = true;
	   	},
	   	//跳转购物车
	   	gotoshopcar(){
	   		this.$router.push({path: '/shopcar'})
	   	},
	   	//关注
	   	collect(){
	   		goodsfavoriteadd({goods_id: this.goods_id}).then((response) => {
	   			console.log(response)
	   			if(response.data.code == 1000){
	   				this.is_fav = 1;
	   				this.favorite_id = response.data.data.favorite_id;
	   			}else{
	   				this.$vux.toast.text(response.data.message, 'middle')
	   			}
	   		})
	   	},
	   	//取消关注
	   	romovecollect(){
	   		goodsfavoriteremove({ids: this.favorite_id}).then((response) => {
	   			if(response.data.code == 1000){
	   				this.is_fav = 0;
	   			}else{
	   				this.$vux.toast.text(response.data.message, 'middle')
	   			}
	   		})
	   	},
	   	//跳转店铺页
	   	gostore(){
	   		this.$router.push({path: '/store',query:{store_id: this.data['store_info']['store_id']}})
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