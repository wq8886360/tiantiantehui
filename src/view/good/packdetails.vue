<template>
	<div class="packdetails" v-if='packdetails_data'>
		<div class="packdetails_top">
			<div class="logo">
				<img :src="packdetails_data.current_combo.combo_thumb" alt="">
			</div>
			<div class="title">{{packdetails_data.current_combo.combo_title}}</div>
		</div>
		<div class="packdetails_con">
			<div class="titlle">
				<span class="Setmeal">套餐价</span>
				<span class="coin">￥</span>
				<span class="money">{{packdetails_data.current_combo.combo_price}}</span>
				<span class="all_a" style="margin-left:0.2rem;">套餐原价</span>
				<span class="all_a">￥</span>
				<span class="all_a">{{packdetails_data.current_combo.old_combo_price}}</span>
			</div>
			<ul class="packdetails_ul">
				<li v-for='(item,index) in packdetails_data.current_combo.goods'>
					<div class="content">
						<img class="packdetails_left" :src="item.thumb"  alt="">
						<div class="packdetails_right">
							<div class="titled">{{item.title}}</div>
							<input v-model="map_arr[index].choice" class="frame" type="text" placeholder="请选择" readonly="readonly" @click='earphone(item.goods_id,index)'>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="others">
			<div class="category">其他套餐</div>
			<div class="others_con" v-for='(item,index) in packdetails_data.others_combo'>
				<div class="titlle">
					<span class="Setmeal">套餐价</span>
					<span class="coin">￥</span>
					<span class="money">{{item.combo_price}}</span>
					<span class="all_a" style="margin-left:0.2rem;">套餐原价</span>
					<span class="all_a">￥</span>
					<span class="all_a">{{item.old_combo_price}}</span>
				</div>
				<div class="scroller_ll">
					<scroller lock-y :scrollbar-x='false'>
     					<div class="Roller" :style="'width:'+ item.goods.length * 2.59 + 'rem'">
     					  	<div class="Roller-item" v-for='(itenn,index) in item.goods'>
     					  		<img :src="itenn.thumb" alt="">
     					  	</div>
     					</div>
    				</scroller>
    			</div>	

			</div>	
		</div>
		<!-- 商品sku -->
		<div v-transfer-dom class="sku_dig">
			<popup v-model="specsState" position="bottom" max-height="80%">
				<div class="specspopu">
					<i class="icon-close right" @click="specsState = false,specstitle = '请选择规格'"></i>
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
					<div class="success_btn" @click="specsdetermine()">确定</div>
				</div>
			</popup>
				</div>
		<div class="shop" @click='immediately()'>立即购买</div>
	</div>
</template>
<script>
import {Scroller,TransferDom,Popup,Checker, CheckerItem,XNumber} from 'vux'
import {getcombodetail} from '../../http/api.js'
export default{
	directives: {
		TransferDom
	},
	components: {
  		Scroller,
  		Popup,
		Checker,
    	CheckerItem,
    	XNumber,
  	},
	data(){
		return{
			data:null,
			combo_id:null,//套餐Id
			goods_id:null,//商品id 
			packdetails_data:null,//套餐详情的数据
			sku_data:null,//sku数据
			specsState: false, //商品规格显示状态
			defaultimage: null, //商品规格默认图片
			stock: null, //默认库存
			specstitle: '请选择规格', //规格描述
			defaultprice: '', //规格价格
			index_index:null,
			sku: null, //sku表
			specs: null, //上屏规格
			bindId: [], //规格选择ID值
			skuid: '', //商品skuid
			goodNum: 1, //加入购物车数量
			map_arr:[], //请选择的时候更改的数组
			sku_id: '', //确定后的sku_id
		}
	},
	watch:{
		'bindId':{
			handler:function(){
				console.log(this.bindId)
				let idArr = this.bindId.map((val,index,arr) => {
					return val['id'];
				})
				//id从大到小排序
				idArr.sort(function (x,y) {
		            return x-y;
		        });
		        console.log(idArr,888)
				let idArrStr = idArr.join('_');
				console.log(idArrStr)
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
		/*详情的数据的api*/
		getcombodetail_api(){
			getcombodetail({combo_id:14,goods_id:54}).then((response)=>{
				let res = response.data;
				if(res.code==1000){
					this.packdetails_data=res.data;
					this.packdetails_data.current_combo.goods.map((val,index,arr)=>{
						this.map_arr.push({choice:null})
					})
				}
			})
		},
		earphone(item_goods_id,index){
			this.index_index=index;
			this.goods_id=item_goods_id;
			getcombodetail({combo_id:14,goods_id:item_goods_id}).then((response)=>{
				let res = response.data;
				if(res.code==1000){
					this.sku_data=res.data.current_combo.goods[index].goods_info;
					this.specs =this.sku_data.specs;
					this.sku = this.sku_data.sku;
					this.defaultprice=this.sku_data.price;
					this.defaultimage='';
					//遍历商品规格
					this.bindId = [];
					this.sku_data.specs.forEach((val,index,arr) => {
						this.bindId.push({id: '',name: val.name})
					})
					this.specsState=true
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
	   			is_up = true;
	   			this.specsState=false;
	   			this.sku_id = this.skuid
	   			if(this.specstitle!='请选择规格'){
	   				this.map_arr[this.index_index].choice='已选择'+this.specstitle;
	   				console.log(this.specstitle)
	   				this.specstitle='请选择规格'
	   			}else{
	   				this.specstitle='请选择规格';
	   			}
	   		}
	   	},
	   	//立即购买
	   	immediately(){
	   		this.specsState = false;
	   		console.log(this.sku_id)
	   		let params = {
   				goods_id: this.goods_id,
   				num: this.goodNum,
   				sku_id: this.sku_id
   			}
   			localStorage.type = 'buynow';
   			localStorage.info=JSON.stringify(params)
	   		this.$router.push({path:'/confirmorder'})
	   	}
	},
	created(){
		this.getcombodetail_api();
	}
}	
</script>
<style lang='less'>
	@import '../../assets/css/component/packdetails.less';
</style>