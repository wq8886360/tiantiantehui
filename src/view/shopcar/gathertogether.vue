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

    	<div class="clearing" v-if="cart_home">
    		<p class="smallscale">小计：¥{{cart_home['total_amount']}}</p>
    		<p class="reduce">可立减¥{{cart_home['total_reduce']}}</p>
    		<div class="btn">去购物车</div>
    	</div>
	</div>
</template>
<script>
import { Search, Scroller, XImg } from 'vux';
import BScroll from 'better-scroll';
import { getjoingoodsstorecates, joingoods, cartHome, cartadd } from '../../http/api.js';
export default{
	components: {
		Search,
		Scroller,
		XImg
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
		}
	},
	methods:{
		api_cartHome(){
			cartHome().then((response) => {
				console.log(response)
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
		joinCar(goods_id){
			cartadd({goods_id: goods_id,qty: '1'}).then((response) => {
				console.log(response)
				if(response.data.code == 1000){
					this.api_cartHome();
				}else{
					this.$vux.toast.text(response.data.message, 'middle')
				}
			})
		},
		//获取类目商品列表
		api_joingoods(cate_id){
			let join_sign = this.$route.query.join_sign;
			joingoods({join_sign: join_sign,cate_id: cate_id}).then((response) => {
				console.log(response)
				this.join_goods = response.data.data.join_goods;
			})
		},
		liclick(index,cate_id){
			let Target = document.querySelectorAll('.scroll_nav .content li');
			this.liIndex = index;
			this.scroll.scrollToElement(Target[index],500,true,true,'easing');
			this.api_joingoods(cate_id);
		}
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