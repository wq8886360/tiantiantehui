<template>
	<div class="gathertogether">
		<div class="top_pos">
			<div class="top">
				<search
				    v-model="search_value"
				    position="static"
				    :autoFixed="false"
				    :results='results'
				    placeholder="搜索促销商品"
				    cancel-text="搜索"
		    		ref="search">
		    	</search>
		    </div>	
	    	<div class="scroll_nav" ref="wrapper">
	    		<ul class="content">
	    			<li :class="{active: index == liIndex}" @click="liclick(index,item.cate_id)" v-for="(item,index) in cates" >{{item['cate_name']}}</li>
	    		</ul>
	    	</div>
	    	<div class="active_title">
	    		{{title}}
	    	</div>
	    </div>	
    	<div class="goods_list">
			<div class="box">
				<div class="item" v-for="(item,index) in join_goods">
					<div class="img">
						<x-img :src="item['thumb']" :offset="100"></x-img>
					</div>
					<div class="main">
						<p>{{item['goods_title']}}</p>
						<div class="join">
							<div class="left">
								<span class="price">¥{{item['price']}}</span>
								<span class="sale">已售:{{item['sales']}}</span>
							</div>
							<div class="right" @click="joinCar(item['goods_id'])"><img src="../../assets/img/icon_shoppingcar.png" alt=""></div>
						</div>
					</div>
				</div>
			</div>
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

    	<div class="clearing" v-if="cart_home">
    		<p class="smallscale">小计：¥{{cart_home['total_amount']}}</p>
    		<p class="reduce">可立减¥{{cart_home['total_reduce']}}</p>
    		<div class="btn">去购物车</div>
    	</div>
	</div>
</template>
<script>
import { Search, Scroller, XImg,TransferDom,Popup,Checker, CheckerItem,XNumber} from 'vux';
import BScroll from 'better-scroll';
import { getjoingoodsstorecates, joingoods, cartHome, cartadd ,	singleSku} from '../../http/api.js';
export default{
	directives: {
		TransferDom
	},
	components: {
		Search,
		Scroller,
		XImg,
		Popup,
		Checker,
    	CheckerItem,
    	XNumber,
	},
	data(){
		return {
			results: [{title: null,other: null}],
			search_value: '',
			liIndex: 0,
			cates: null, //类目列表
			title: '', //凑单页面标题
			join_goods: null, //类目商品列表
			cart_home: null, //购物车首页
			goods_id:null,//	商品ID

			specsState: false, //商品规格显示状态
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
		}
	},
	watch:{
		'bindId':{
			handler:function(){
				
				let idArr = this.bindId.map((val,index,arr) => {
					return val['id'];
				})
				console.log(idArr)
				//id从大到小排序
				idArr.sort(function (x,y) {
		            return x-y;
		        });
				let idArrStr = idArr.join('_');
				console.log(idArrStr)
				//查询sku
				this.sku.map((val,index,arr) => {
					if(val['specs'] == idArrStr){
						if(val.thumb){
							this.defaultimage = val.thumb;
						}
						console.log(val)
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
		api_cartHome(){
			cartHome().then((response) => {
				this.cart_home = response.data.data;
			})
		},
		//获取类目列表
		api_getjoingoodsstorecates(){
			let join_sign = this.$route.query.join_sign;
			getjoingoodsstorecates({join_sign: join_sign}).then((response) => {
				let res = response.data;
				if(res.code == 1000){
					this.cates = res.data.cates;
					this.title = res.data.title;
					//动态设置宽度
					this.$nextTick(() => {
						let ulWidth = 0;
						let li = document.querySelectorAll(".scroll_nav .content li");
						li.forEach((item,index,domlist) => {
							ulWidth += (item.offsetWidth + 1 + 6);
						})
						document.querySelector(".scroll_nav .content").style.width = (ulWidth - 6) + 'px';
						this.$nextTick(() => {
							//初始化bscroll
							this.scroll = new BScroll(this.$refs.wrapper, {
								scrollX: true,
								scrolly: false,
								click: true
							})
						})
					})

					this.api_joingoods(this.cates[0]['cate_id']);
				}
			})
		},
		//获取类目商品列表
		api_joingoods(cate_id){
			let join_sign = this.$route.query.join_sign;
			joingoods({join_sign: join_sign,cate_id: cate_id}).then((response) => {
				this.join_goods = response.data.data.join_goods;
			})
		},
		liclick(index,cate_id){
			let Target = document.querySelectorAll('.scroll_nav .content li');
			this.liIndex = index;
			this.scroll.scrollToElement(Target[index],500,true,true,'easing');
			this.api_joingoods(cate_id);
		},
		//获取商品SKU数据
		api_singleSku(){
			singleSku({goods_id:this.goods_id}).then((response) => {
				let res = response.data;
				if(res.data.code=1000){
					this.data = res.data;
					this.specs = res.data.specs;
					this.sku = res.data.sku;
					this.defaultprice=res.data.price;
					this.defaultimage='';
					console.log(this.specs)
					//遍历商品规格
					this.bindId = [];
					res.data.specs.forEach((val,index,arr) => {
						this.bindId.push({id: '',name: val.name})

					})
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
	   			this.sku_id = this.skuid;
	   			is_up = true;
	   			this.cartadd_api()
	   		}
	   	},
	   	cartadd_api(){
	   		cartadd({goods_id: this.goods_id,sku_id: this.sku_id,qty: this.goodNum}).then((response) => {
				if(response.data.code === 1000){
					this.specsState = false;
					this.api_cartHome();
				}else{
					this.$vux.toast.text(response.data.message, 'middle')
				}
			})
	   	},
	   	//加入购物车
	   	joinCar(goods_id){
			this.specsState=true;
			this.goods_id=goods_id;
			this.api_singleSku();
		},
	},
	created(){
		this.api_getjoingoodsstorecates();
		this.api_cartHome();
	}
}
</script>
<style lang="less">
@import '../../assets/css/component/gathertogether.less';
</style>