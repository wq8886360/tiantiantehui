<template>
	<div class="ranking">
		<div class="scroll_nav">
			<ul class="content" ref="wrapper">
	    		<li :class="{active: index == liIndex}" @click="liclick(index)" v-for="(item,index) in 10" >排行榜</li>
	    	</ul>
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
		}
	},
	methods:{
		api_toplist(){
			let parms={
				op_cid:37,
				page:this.page,
				page_size:this.page_size,
			}
			toplist(parms).then((response)=>{
				let res = response.data;
				if(res.code==1000){
					this.cates=res.data.category;
					this.$nextTick(() => {
						// let ulWidth = 0;
						// let li = document.querySelectorAll(".scroll_nav .content li");
						// li.forEach((item,index,domlist) => {
						// 	ulWidth += (item.offsetWidth + 1 + 6);
						// })
						// console.log(ulWidth)
						// document.querySelector(".scroll_nav .content").style.width = (ulWidth - 6) + 'px';
						// this.$nextTick(() => {
						// 	console.log(12)
						// 	//初始化bscroll
						// 	this.scroll = new BScroll(this.$refs.wrapper, {
						// 		scrollX: true,
						// 		scrolly: false,
						// 		click: true
						// 	})
						// })
					})
				}
			})
		},
		liclick(index){
			let Target = document.querySelectorAll('.scroll_nav .content li');
			console.log(Target)
			this.liIndex = index;
			this.scroll.scrollToElement(Target[index],500,true,true,'easing');
		},
	},
	mounted(){
		// let ulWidth = 0;
		// let li = document.querySelectorAll(".scroll_nav .content li");
		// li.forEach((item,index,domlist) => {
		// 	ulWidth += (item.offsetWidth + 1 + 6);
		// })
		// console.log(ulWidth)
		// document.querySelector(".scroll_nav .content").style.width = (ulWidth - 6) + 'px';
		// // this.$nextTick(() => {
		// 	console.log(12)
			//初始化bscroll
			this.scroll = new BScroll(this.$refs.wrapper, {
				scrollX: true,
				scrolly: false,
				click: true
			})
		// })
	},
	created(){
		this.api_toplist();
	}
}	
</script>
<style lang='less'>
@import '../../assets/css/component/ranking.less';	
</style>