<template>
	<div class="confirmorder"  v-if="orderData">
		<div class="address" @click="route_address">
			<div class="info">
				<img src="../../assets/img/icon_order_address.png" alt="">
				<div v-if="!address" class="text">请添加您的收货地址</div>
				<div v-else class="text">
					<div class="nameTel">
						<span class="name left">
							{{address.realname}}
						</span>
						<span class="tel right">
							{{address.mobile}}
						</span>
					</div>
					<div class="detailaddress">
						收货地址：{{address.detail_address}}
					</div>
				</div>
				<i class="icon-right"></i>	
			</div>
			<img class="bom_img" src="../../assets/img/img_order_line.png" alt="">
		</div>

		<!-- 店铺列表 -->
		<div class="storelist" v-for="(item,index) in orderData.enabled">
			<div class="storename">
				<img src="../../assets/img/shop_icon.png" alt="">
				<span>{{item.store_name}}</span>
			</div>
			<div class="content">
				<div class="good" v-for="items in item.goods">
					<div class="img">
						<img :src="items.thumb" alt="">
					</div>
					<p class="goodname">{{items.title}}</p>
					<p class="color">{{items.sku}}</p>
					<p class="price">¥{{items.price}}</p>
					<p class="num">x{{items.qty}}</p>
				</div>
				<div class="distribution typeli">
					<div class="left">配送方式</div>
					<div class="right" v-if="item.shippingFee != '0'">快递 ¥{{item.shippingFee}}</div>
					<div class="right" v-else>包邮</div>
				</div>
				<div class="promotion typeli2" @click="chooseact(index)" v-if="item['promotion_info'].length != 0">
					<div>促销</div>
					<div>{{shop_goods[index]['acttitle']}} <i class="icon-right"></i></div>	
				</div>
				<div class="treatment typeli2" @click="choosecoupon(index)" v-if="item['voucher'].length != 0">
					<div>优惠</div>
					<div>{{shop_goods[index]['voucher_hint']}} <i class="icon-right"></i></div>
				</div>
				<div class="textarea">
					<x-textarea placeholder="给卖家留言：" :autosize="true" v-model="shop_goods[index]['remark']"></x-textarea>
				</div>
				<div class="reporter">
					<span>共计{{item.sub_count}}件商品&nbsp;&nbsp;小计：</span>
					<span class="price" v-if="!shop_goods[index]['denomination'] && !shop_goods[index]['prom_reduce']">¥ {{shop_goods[index]['sub_total']}}</span>
					<span class="price" v-if="shop_goods[index]['denomination'] && !shop_goods[index]['prom_reduce']">¥ {{shop_goods[index]['sub_total'] - shop_goods[index]['denomination'] + Number(shop_goods[index]['shippingFee'])}}</span>
					<span class="price" v-if="!shop_goods[index]['denomination'] && shop_goods[index]['prom_reduce']">¥ {{shop_goods[index]['sub_total'] - shop_goods[index]['prom_reduce'] + Number(shop_goods[index]['shippingFee'])}}</span>
					<span class="price" v-if="shop_goods[index]['denomination'] && shop_goods[index]['prom_reduce']">¥ {{shop_goods[index]['sub_total'] - shop_goods[index]['denomination'] - shop_goods[index]['prom_reduce'] + Number(shop_goods[index]['shippingFee'])}}</span>
				</div>
			</div>
		</div>

		<!-- 活动弹窗 -->
		<div v-transfer-dom class="act">
			<popup v-model="actState" position="bottom">
				<div class="box">
					<div class="main">
						<div class="title">促销</div>
						<div class="list">
							<checklist :max="1" :min="1" :disabled="dis" label-position="left" :options="actList" v-model="actval" @on-change="actchange"></checklist>
						</div>
					</div>	
					<div class="pclose" @click="actState = false">关闭</div>
				</div>
			</popup>
		</div>

		<!-- 优惠劵弹窗 -->
		<div v-transfer-dom class="coupon">
			<popup v-model="couponState" position="bottom">
				<div class="box">
					<div class="main">
						<div class="title">商品优惠劵</div>
						<div class="list">
							<checklist :max="1" :min="1" label-position="left" :options="commonList" v-model="value" @on-change="change"></checklist>
						</div>
					</div>	
					<div class="pclose" @click="couponState = false">关闭</div>
				</div>
			</popup>
		</div>

		<!-- 失效商品 -->
		<div class="disablegood">
			<div class="title">
				失效宝贝
			</div>
			<div class="list">
				<div class="item"  v-for="item in 2">
					<div class="img">
						<img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4009434610,3584345417&fm=27&gp=0.jpg" alt="">
					</div>
					<p class="name">VeroModa白鸭绒填充立立领合体立领合体领合体版型羽绒服|316412518</p>
					<p class="cause">库存不足</p>
					<p class="price">¥999.99</p>
					<p class="num">x1</p>
				</div>
			</div>
		</div>
		
		<!-- 底部支付 -->
		<div class="pay">
			合计：<span class="zong">¥{{pay_amount}}</span>
			<div class="pay_btn" @click="pay">去支付</div>
		</div>

		<!-- 支付方式弹窗 -->
		<div v-transfer-dom class="paytype">
			<popup v-model="paytypeState" position="bottom">
				<div class="box">
					<div class="title">
						选择支付方式
						<i class="icon-close right" @click="paytypeState = false"></i>
					</div>
					<div class="list" @click="zhifu(item.code)" v-for="(item,index) in pay_types">
						<div class="left">
							<img :src="item.pic" alt="">
							<p>{{item.name}}</p>
						</div>
						<i class="icon-right"></i>
					</div>
				</div>
			</popup>
		</div>
	</div>
</template>
<script>
import { orderconfirm, orderbuy, ordercheckout, getavailablepaymethod, orderbuycombo } from '../../http/api.js';
import { XTextarea, TransferDom, Popup, Checklist } from 'vux';
export default{
	directives: {
		TransferDom
	},
	components: {
		XTextarea,
		Popup,
		Checklist
	},
	data(){
		return {
			orderData: null, 
			address: null, //默认收货地址
			address_id: null,//收货地址ID
			shop_goods: [], //
			couponState: false, //优惠劵弹窗状态
			actState: false, //
			actList: [], //可选活动列表
			actval: [], //当前选中活动
			commonList: [], //优惠劵列表
			value: [], //当前选中的优惠劵
			couponIndex: null, //当前选择索引值
			pay_amount: 0, //支付总计啊
			dis: false, //促销活动是否可选
			paytypeState: false,
			pay_types: null, //支付方式
		}
	},
	watch:{
		'shop_goods': {
			handler: function() {
				this.pay_amount = 0;
				this.shop_goods.map((item,index,arr) => {
					if(item.denomination && item.prom_reduce){
						this.pay_amount += (parseFloat(item.sub_total) - item.denomination - item.prom_reduce + Number(item['shippingFee']));
					}else if(item.denomination && !item.prom_reduce){
						this.pay_amount += (parseFloat(item.sub_total) - item.denomination + Number(item['shippingFee']));
					}else if(!item.denomination && !item.prom_reduce){
						this.pay_amount += (parseFloat(item.sub_total) + Number(item['shippingFee']));
					}else if(!item.denomination && item.prom_reduce){
						this.pay_amount += (parseFloat(item.sub_total) - item.prom_reduce + Number(item['shippingFee']));
					}
				})
			},
			deep:true
		}
	},
	methods: {
		// 购物车跳转
		api_orderconfirm(){
			let cart_ids = JSON.parse(localStorage.info);
			orderconfirm({cart_ids: cart_ids.id,address_id:this.address_id}).then((response) => {
				console.log(response)
				let res = response.data;
				if(res.code == 1000){
					this.orderData = res.data;
					this.address = res.data.address;
					if(res.data.address){
						this.address_id = res.data.address.id
					}
					this.shop_goods_map(res.data)
				}else{
					this.$vux.toast.text(res.message, 'middle');
				}
			})
		},
		//立即购买跳转
		api_orderconfirm_direct(){
			let goodinfo = JSON.parse(localStorage.info);
			orderbuy({goods_id: goodinfo.goods_id,qty: goodinfo.num,sku_id: goodinfo.sku_id,address_id:this.address_id}).then((response) => {
				console.log(response)
				let res = response.data;
				if(res.code == 1000){
					this.orderData = res.data;
					this.address = res.data.address;
					if(res.data.address){
						this.address_id = res.data.address.id
					}
					this.shop_goods_map(res.data)
				}else{
					this.$vux.toast.text(res.message, 'middle');
				}
			})
        },
        api_orderbuycombo(){
            let goodinfo = localStorage.info;
            console.log(goodinfo)
            orderbuycombo({address_id:this.address_id, combo: goodinfo}).then((response) => {
                console.log(response)
				let res = response.data;
				if(res.code == 1000){
					this.orderData = res.data;
					this.address = res.data.address;
					if(res.data.address){
						this.address_id = res.data.address.id
					}
					this.shop_goods_map(res.data)
				}else{
					this.$vux.toast.text(res.message, 'middle');
				}
            })
        },
		//遍历组合shop_goods
		shop_goods_map(data){
			var _this = this;
			data.enabled.map(function(item,index,obj){
				let goodobj = {
					store_id: item.store_id, //店铺ID
					remark: '', //留言
					voucher_id: '', //优惠劵ID
					sub_total: item.sub_total, //店铺小计
					denomination: '', //优惠劵面额
					voucher_hint: '', //优惠劵描述
					goods_items: [], //商品列表
					shippingFee: item.shippingFee
				}
				if(item['promotion_info'].length != 0){
					goodobj.acttitle = item['promotion_info'][0]['prom_title']; //活动描述
					goodobj.prom_reduce = item['promotion_info'][0]['prom_reduce']; //活动减免
				}
				if(item['voucher'].length != 0){
					goodobj.voucher_id = item['voucher'][0]['voucher_id'];
					goodobj.voucher_hint = item['voucher'][0]['title'];
					goodobj.denomination = item['voucher'][0]['denomination'];
					_this.$nextTick(() => {
						_this.$set(_this.value,'0',item['voucher'][0]['voucher_id']);
					})
				}
				_this.shop_goods.push(goodobj)
			})
			this.shop_goods.map(function(sitem,sindex,sobj) {
				data.enabled[sindex]['goods'].map(function(gitem,gindex,gobj){
					let obj = {
						goods_id: gitem.goods_id,
						sku_id: gitem.sku_id,
						qty: gitem.qty,
					}
					if(data.enabled[sindex]['promotion_info'].length > 0){
						obj.prom_id = data.enabled[sindex]['promotion_info'][0]['prom_id'];
						console.log(data.enabled[sindex]['promotion_info'][0]['prom_id'],44)
					}else{
						obj.prom_id = "";
					}
					sitem.goods_items.push(obj)
				})
			})

			console.log(this.shop_goods,11111)
		},
		//选择优惠劵
		choosecoupon(index){
			let _this = this;
			this.commonList = [];
			this.couponIndex = index;
			this.orderData.enabled[index]['voucher'].map(function(items,indexs,arrs){
				_this.commonList.push({
					value: items.title,
					key: items.voucher_id,
					denomination: items.denomination
				})
			})
			this.couponState = true;
		},
		change(val, label){
			let _this = this;
			if(val.length != 0 && label.length != 0){
				this.$set(this.shop_goods[this.couponIndex],'voucher_hint',label[0])
				this.$set(this.shop_goods[this.couponIndex],'voucher_id',val[0])
				this.orderData.enabled[this.couponIndex]['voucher'].map(function(item,index,arr){
					if(item.voucher_id == val[0]){
						_this.$set(_this.shop_goods[_this.couponIndex],'denomination',item['denomination']);
					}
				})
			}
		},
		//选择活动
		chooseact(index){
			let _this = this;
			this.actList = [];
			this.couponIndex = index;
			this.orderData.enabled[index]['promotion_info'].map(function(item,index,arr){
				console.log(item)
				_this.actList.push({
					value: item.prom_title,
					key: item.prom_id
				})
			})
			this.$set(_this.actval,0,_this.shop_goods[index]['goods_items'][0]['prom_id'])
			this.actState = true;
		},
		actchange(val, label){
			let _this = this;
			if(val.length != 0 && label.length != 0){
				this.shop_goods[_this.couponIndex]['goods_items'].map(function(items, indexs, arrs){
					_this.$set(items,'prom_id',val[0])
				})
				_this.$set(_this.shop_goods[_this.couponIndex],'acttitle',label[0])
				this.orderData.enabled[this.couponIndex]['promotion_info'].map(function(pitem,pindex,parr){
					if(pitem.prom_id == val[0]){
						_this.$set(_this.shop_goods[_this.couponIndex],'prom_reduce',pitem['prom_reduce']);
					}
				})
			}
		},
		route_address(){
			if(this.address){
				this.$router.push({path: '/selectadress',query:{address_id: this.address.id}})
			}else{
				this.$router.push({path: '/addadress'})
			}
		},
		pay(){
			this.paytypeState = true;
		},
		zhifu(code){
			let params = {
				shop_goods: JSON.stringify(this.shop_goods),
				address_id: this.address_id,
				paytype: code
			}
			ordercheckout(params).then((response) => {
				console.log(response)
				if(response.data.code == 1000){
                    let jump_url = encodeURIComponent(window.location.host + '/#/Payoff');
					window.location.href = response.data.data.pay_url + '&' + jump_url;
				}
			})
		}
	},
	created(){
		getavailablepaymethod().then((response) => {
			console.log(response)
            this.pay_types = response.data.data.pay_method;
            //console.log(this.pay_types)
		})
		if(this.$route.query.address_id){
			this.address_id = this.$route.query.address_id;
		}else{
			this.address_id = 0
		}
        let type = localStorage.type;
		//立即购买
		if(type == 'buynow'){
			this.api_orderconfirm_direct();
			this.dis = false;
		}else if(type == 'buymeal'){
            this.api_orderbuycombo();
        }else{
			this.api_orderconfirm();
			this.dis = true;
		}
	}
}
</script>
<style lang="less">
@import '../../assets/css/component/confirmorder.less';	
</style>