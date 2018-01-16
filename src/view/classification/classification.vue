<template>
	<div class="categories">
		<!--搜索框-->
		<search placeholder="搜索所有订单" v-model="value" position="absolute" @on-cancel="onCancel" @on-submit="onSubmit" ref="search">
   		</search>
   		<div style="border-top:1px solid #ECECEC">
   			<div class="scroll_nav" ref="wrapper">
	    	<ul class="content">
	    		<li :class="{active: index == liIndex}" @click="liclick(index,item.name)" v-for="(item,index) in cates" >{{item['name']}}</li>
	    	</ul>
	    	</div>
	    	<div class="categories_right" :scrollTop.prop='scrollTop'>
	    		<div class="categories_con d_jump" v-for='(item,index) in children_data'>
	    			<div class="box" v-for='(itemm,index) in item'>
	    				<div class="title">
	    					<span class="line"></span>
	    					<span class="title_c">{{itemm.name}}</span>
	    					<span class="line"></span>
	    					<span @click='rangking(itemm.id,itemm.name)' v-if='itemm.on_ranking==1' class="ranking">排行榜 <i class="icon-right"></i></span>
	    				</div>
	    				<ul class="categories_ul">
	    					<li v-for='(itefn,index) in itemm.children'>
	    						<div class="thumb">
	    							<img :src="itefn.thumb" alt="">
	    						</div>	
	    						<div class="text">{{itefn.name}}</div>
	    					</li>
	    				</ul>
	    			</div>
	    		</div>
	    	</div>
	    </div>	
	</div>
</template>
<script>
import {Search} from 'vux'
import BScroll from 'better-scroll';
import {alllist} from '../../http/api.js'
export default{
	components: {
		Search
	},
	data(){
		return{
			value: '', //搜索框里面的提示
			liIndex: 0,
			cates:null,
			top_id:null,
			classification:null,
			children_data:null,
			scrollTop:null,
			Level:null,
			LevelT:null,
		}
	},
	mounted(){
            // 监听scroll事件
            const _this = this;
            setTimeout(function(){
                // _this.currentStick();    
                const rightItem = document.querySelectorAll('.d_jump');
                const catelist = document.querySelectorAll('.categories_right')[0];
                var length = rightItem.length;
                var height = rightItem[length-1].offsetHeight;
                var scrollHeight = document.querySelectorAll('.box')[0].offsetHeight;
              // 设置最后一个类别菜品列表的高度(小于适配器高度的话与适配器等高)，不然点击锚点不能够置顶
                if(height < scrollHeight){
                    rightItem[length-1].style.height = scrollHeight+'px';
                } 
                var arr =[];
                rightItem.forEach(function(v, i){
                    arr.push({top: v.offsetTop, height: v.offsetHeight, index: i});
                })
                _this.itemVal = arr;  
                const cateList = document.querySelectorAll('.categories_right')[0];
                window.addEventListener('scroll', _this.onScroll);
                _this.container = cateList;
            }, 500)
        },
	methods:{
		/*分类的api*/
		api_alllist(){
			alllist({}).then((response)=>{
				let res = response.data;
				if(res.code==1000){
					this.cates=res.data.categoryList;
					console.log(res)
					this.children_data=this.cates.map((val,index,arr)=>{
						return val.children;
					})
					this.$nextTick(() => {
						let top = document.querySelector('.vux-search-box').offsetHeight;
						document.querySelector(".scroll_nav").style.top = top +1+ 'px';
						//初始化bscroll
						this.scroll = new BScroll(this.$refs.wrapper, {
							scrollX: false,
							scrolly: true,
							click: true,
						})
					})
				}
			})	
		},
		liclick(index,item_name){
			let Target = document.querySelectorAll('.scroll_nav .content li');
			this.Level=item_name;
			console.log(item_name,123)
			this.liIndex = index;
			this.scroll.scrollToElement(Target[index],500,true,true,'easing');
			// this.top_id=item_id;
			const cateItem = document.querySelectorAll('.d_jump');
                let total = cateItem[index].offsetTop;
                let distance =document.querySelector('.categories_right').scrollTop; // 获取到顶部的距离(this.container便是.cate-list,为了方便存起来了)
                let step = total / 50;
                this.isActive = index; // 菜单列表显示当前样式
                const _this = this;
                if (total > distance) {
                    smoothDown()
                } else {
                    let newTotal = distance - total
                    step = newTotal / 50
                    smoothUp()
                }
                function smoothDown () {
                  if (distance < total) {
                    distance += step
                    _this.scrollTop = distance;
                    setTimeout(smoothDown, 10);
                  } else {
                    _this.scrollTop = total
                  }
                }
                function smoothUp () {
                  if (distance > total) {
                    distance -= step
                    _this.scrollTop = distance
                    setTimeout(smoothUp, 10)
                  } else {
                    _this.scrollTop = total
                  }
                } 
		},
		onCancel(){
			console.log(1)
		},
		onSubmit(){
			console.log(2)
		},
		rangking(id,itemm_name){
			this.$router.push({path:'/ranking',query:{op_cid:id,Level:this.Level,LevelT:itemm_name}})
		}
	},
	created(){
		this.api_alllist();
	}
}
</script>
<style lang='less'>
@import '../../assets/css/component/classification.less';
</style>