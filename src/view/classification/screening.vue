<template>
	<div class="screening">
		<div>
			<span class="cancel">取消</span>
		</div>
		<div class="delivery">
			<div class="hair">发货</div>
			<ul class="location">
				<li>
					<span>杭州</span>
					<img src="../../assets/img/delete.png"  alt="">
				</li>
			</ul>
		</div>
		<div class="price">
			<div class="price_p">价格区间（元）</div>
			<div class="a_btn">
				<input type="text" placeholder="600">
				<span class="line"></span>
				<input class="right_c" type="text" placeholder="1000">
			</div>
		</div>
		<div class="gray"></div>
		<div class="brand_list">
			<div class="title">
				<span class="text_c">品牌</span>
				<div class="right_d" v-if='state==0' @click='bian()'>
					<span>更多</span>
					<img src="../../assets/img/icon_saixuan_gd@2x.png" alt="">
				</div>
				<div class="right_d" v-if='state==1' @click='bian()'>
					<span>收起</span>
					<img src="../../assets/img/icon_saixuan_sq@2x.png" alt="">
				</div>
			</div>
			<ul class="brand_ul" :style="{height:isheight}">
				<li v-for='(item,index) in recommend_brand_list'>{{item.brand_name}}</li>
				<div class="all_list" v-if='recommend_length==11'>全部品牌</div>
			</ul>
		</div>
		<div class="new_brand">
			<ul class="screening_ul">
				<div v-for='(item,index) in attr_list'>
					<div class="title">
						<span class="text_c">{{item.name}}</span>
						<div class="right_d">
						<span>更多</span>
						<img src="../../assets/img/icon_saixuan_gd@2x.png" alt="">
						</div>
						<div class="right_d" v-if='false'>
						<span>收起</span>
						<img src="../../assets/img/icon_saixuan_sq@2x.png" alt="">
						</div>
					</div>
					<li v-for='(itemm,index) in item.val_list'>
						{{itemm}}
					</li>
				</div>	
			</ul>
		</div>
	</div>
</template>
<script>
import {getListFilter} from '../../http/api.js'
export default{
	data(){
		return{
			recommend_length:null,
			recommend_brand_list:null,
			state:0,
			isheight:null,
			attr_list:null,	
		}
	},
	methods:{
		/*筛选api*/
		api_getListFilter(){
			getListFilter({cid:75,keyword:''}).then((response)=>{
				let res = response.data;
				if(res.code==1000){
					this.recommend_brand_list=res.data.recommend_brand_list;
					this.recommend_length=this.recommend_brand_list.length;
					this.attr_list=res.data.attr_list;
					console.log(res)
				}
			})
		},
		bian(){
			if(this.state==1){
				this.state=0
				this.isheight=2.8+'rem';
			}else{
				this.state=1;
				this.isheight='auto';
			}
		}
	},
	created(){
		this.api_getListFilter();
	}
}	
</script>
<style lang="less">
@import '../../assets/css/component/screening.less';	
</style>