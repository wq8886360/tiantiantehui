<template>
	<div class="ranking_c" v-if='list_data'>
		<div class="scroll_nav" ref="wrapper">
			<ul class="content">
	    		<li :class="{active: index == liIndex}" @click="liclick(index,item.g_cid)" v-for="(item,index) in cates" >{{item['name']}}</li>
	    	</ul>
	    	<div class="down" @click='show=true'>
	    		<img src="../../assets/img/icon_saixuan_gd@2x.png" alt="">
	    	</div>
		</div>
		<div class="ranking_con">
	    	<ul class="ranking_ul">
	    		<li v-for='(item,index) in list_data.goods_list'>
	    			<img class="thumb" :src="item.thumb" alt="">
	    			<div class="li_right">
	    				<div class="title">{{item.title}}</div>
	    				<div class="btn">
	    					<span v-if='item.is_new==1' class="new" style="background:#FBD500">新品</span>
	    					<span v-if='item.is_hot==1' class="new" style="background:#FB9F00">热卖</span>
	    					<span v-if='item.is_explosion==1' class="new" style="background:#FB6400">爆款</span>
	    					<span v-if='item.is_recommend==1' class="new" style="background:#7898DA">推荐</span>
	    					<span v-if='item.has_coupon==1' class="new_j">券</span>
	    					<span v-if='item.has_discount==1' class="new_j">折</span>
	    					<span v-if='item.has_gift==1' class="new_j">赠</span>
	    				</div>
	    				<div class="coin">
	    					<span class="money">￥{{item.price}}</span>
	    					<span v-if='item.free_ship==1' class="Package">包邮</span>
	    				</div>
	    				<div class="discuss">
	    					<span class="text">{{item.comment_num}}条评论</span>
	    					<span class="text">{{item.comment_rate}}好评</span>
	    					<span class="weizhi">{{item.send_area}}</span>
	    				</div>
	    			</div>
	    		</li>
	    	</ul>
	    </div>
	    <div class="mask" v-if='show'>
	    	<div class="mask_con">
	    		<div class="mask_top">
	    			<span class="title">{{Level}}-{{LevelT}}</span>
	    			<div class="down" @click='show=false'>
	    				<img src="../../assets/img/icon_saixuan_sq@2x.png" alt="">
	    			</div>
	    		</div>
	    		<ul class="mask_ul">
	    			<li @click="paging(item.g_cid,index)" v-for='(item,index) in cates'>{{item['name']}}</li>
	    		</ul>
	    	</div>
	    </div>
	</div>
</template>
<script>
import BScroll from 'better-scroll';
import {toplist} from '../../http/api.js'
export default{
	data(){
		return{
			op_cid:null,
			cid:null,
			page:1,
			page_size:10,
			liIndex: 0,
			cates: null, //类目列表
			list_data:null,//列表数据
			cid:null,
			Level:null,
			LevelT:null,
			show:false,
		}
	},
	methods:{
		/*排行榜api*/
		api_toplist(){
			let parms={
				op_cid:this.$route.query.op_cid,
				page:this.page,
				page_size:this.page_size,
			}
			toplist(parms).then((response)=>{
				let res = response.data;
				if(res.code==1000){
					this.cates=res.data.category;
					this.list_data=res.data.goods;
					console.log(res)
					//动态设置宽度
					this.$nextTick(() => {
						let ulWidth = 0;
						let li = document.querySelectorAll(".scroll_nav .content li");
						li.forEach((item,index,domlist) => {
							ulWidth += (item.offsetWidth + 1 + 6);
						})
						document.querySelector(".scroll_nav .content").style.width = (ulWidth+33)+ 'px';
						this.$nextTick(() => {
							//初始化bscroll
							this.scroll = new BScroll(this.$refs.wrapper, {
								scrollX: true,
								scrolly: false,
								click: true
							})
						})
					})
				}
			})
		},
		/*点击分类api*/
		api_fenlei(){
			let parms={
				cid:this.cid,
				page:this.page,
				page_size:this.page_size,
			}
			toplist(parms).then((response)=>{
				let res =response.data;
				if(res.code==1000){
					this.list_data=res.data.goods;
				}
			})
		},
		/*点击箭头的到时候请求的api*/
		paging(g_cid,index){
			this.cid=g_cid;
			let parms={
				cid:this.cid,
				page:this.page,
				page_size:this.page_size,
			}
			toplist(parms).then((response)=>{
				let res =response.data;
				if(res.code==1000){
					this.show=false;
					this.liIndex=index;
					let Target = document.querySelectorAll('.scroll_nav .content li');
					this.scroll.scrollToElement(Target[index],500,true,true,'easing');
					this.list_data=res.data.goods;
				}
			})
		},
		/*点击类目列表的api*/
		liclick(index,g_cid){
			let Target = document.querySelectorAll('.scroll_nav .content li');
			this.liIndex = index;
			this.scroll.scrollToElement(Target[index],500,true,true,'easing');
			this.cid=g_cid;
			this.api_fenlei();
		},
	},
	created(){
		this.api_toplist();
		this.Level=this.$route.query.level1;
		this.LevelT=this.$route.query.level2;
	}
}	
</script>
<style lang='less'>
@import '../../assets/css/component/ranking.less';	
</style>