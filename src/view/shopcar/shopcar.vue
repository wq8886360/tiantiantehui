<template>
	<div class="shopcar">
		<div v-if="enabled" style="padding-bottom: 2.67rem;">
			<p class="h1_title" @click="alledit = !alledit">{{alleditstate}}</p>
			<!-- 商品 -->
			<div class="good">
				<div class="store" v-for="(enabled_item,enabled_index) in enabled">
					<div class="storename">
						<div class="left">
							<div class="check" @click="storecheck(enabled_index)">
								<img v-if="enabled_item['all_check'] == 1" src="../../assets/img/shoppingcar_selected_h.png" alt="">
								<img v-else src="../../assets/img/shoppingcar_selected_n.png" alt="">
							</div>
							<img class="shop_icon" src="../../assets/img/shop_icon.png" alt="">
							<p class="name">{{enabled_item['store_name']}}</p>
							<i class="icon-right"></i>
						</div>
						<div class="right" v-if="!alledit">
							<span @click="pickup(enabled_index)">领卷</span>
							<i></i>
							<span v-if="!enabled_item['edit']" @click="Localeditor(enabled_index)">编辑</span>
							<span v-if="enabled_item['edit']" @click="ExitLocaleditor(enabled_index)">完成</span>
						</div>
					</div>
					<!-- 商品列表 -->
					<div class="goodlist" v-for="(promotion_item,promotion_index) in enabled_item['promotion']">
						<div class="activity" v-if="promotion_item['prom_id'] != '0'">
							<div class="left">
								<div class="label">{{promotion_item['prom_label']}}</div>
								<div class="prompt">{{promotion_item['hint']}}</div>
							</div>
							<router-link :to="{path: '/gathertogether',query: {join_sign: promotion_item['need_more']}}">
								<div class="single" v-if="promotion_item['need_more']">去凑单<i class="icon-right"></i></div>
							</router-link>
						</div>
						<div class="box" v-for="(goods_item,goods_index) in promotion_item['goods']">
							<!-- 商品信息 -->
							<div class="inform">
								<div class="check" @click="check(enabled_index,promotion_index,goods_index)">
									<img v-if="goods_item['is_check'] == 1" src="../../assets/img/shoppingcar_selected_h.png" alt="">
									<img v-else src="../../assets/img/shoppingcar_selected_n.png" alt="">
								</div>
								<div class="main">
									<div class="thumb">
										<img :src="goods_item['thumb']" alt="">
									</div>
									<div class="goodnum">
										<p class="name" v-if="!enabled_item['edit']">{{goods_item['title']}}</p>
										<div class="xnumber" v-if="enabled_item['edit']">
											<div class="box">
												<div class="sub" @click="sub(enabled_index,promotion_index,goods_index)">-</div>
												{{goods_item['qty']}}
												<div class="add" @click="add(enabled_index,promotion_index,goods_index)">+</div>
											</div>
										</div>
										<div class="editsku" v-if="enabled_item['edit']" @click="changespecs(enabled_index,promotion_index,goods_index)">
											<span>{{goods_item['sku']}}</span>
											<img src="../../assets/img/1_u2842.png" alt="">
										</div>

										<p class="specs" v-if="!enabled_item['edit']">{{goods_item['sku']}}</p>
										<p class="surplus" v-if="goods_item['left'] <= 3 && !enabled_item['edit']">仅剩{{goods_item['left']}}件</p>
										<p class="price">¥{{goods_item['price']}}</p>
										<span class="num" v-if="!enabled_item['edit']">x{{goods_item['qty']}}</span>
										<div class="num delbtn" v-if="enabled_item['edit']" @click="goods_del(enabled_index,promotion_index,goods_index)">删除</div>
									</div>
								</div>
							</div>
							<!-- 优惠劵选择 -->
							<div class="choose_pre">
								<div class="youhui" v-if="promotion_item['prom_id'] != '0'">
									<span class="label">{{promotion_item['title_label']}}</span>
									<span class="content">{{promotion_item['prom_title']}}</span>
									<span class="change" @click="offerChange(enabled_index,promotion_index,goods_index)">修改<i class="icon-right"></i></span>
								</div>	
							</div>
						</div>	
					</div>
				</div>
			</div>
			<!-- 失效商品 -->
			<div class="disablegood" v-if="disabled.length != 0">
				<div class="title">
					<div class="left">失效宝贝</div>
					<div class="right">清空失效宝贝</div>
				</div>
				<div class="list" v-for="item in disabled">
					<div class="img"><img :src="item['thumb']" alt=""></div>
					<p class="name">{{item['goods_title']}}</p>
					<p class="color">{{item['sku']}}</p>
					<p class="state"><span v-if="item['status'] == '3'">宝贝已下架</span><span v-if="item['status'] == '2'">宝贝已售完</span></p>
				</div>
			</div>

			<!-- 可能还想买 -->
			<div class="might">
				<div class="title">
					<div></div>
					<p>您可能还想买</p>
					<div></div>
				</div>
				<div class="header">
					<div class="img"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510993633352&di=49e0c34663da6d4029e8f4cfb8cd8484&imgtype=0&src=http%3A%2F%2Fwww.787866.com%2Fupload%2Fnews%2F20111206%2F034314.jpg" alt=""></div>
					<p class="content">购买该商品的人还购买了下面的商品</p>
				</div>
				<!-- 列表 -->
				<div class="list">
					<div class="item" v-for="item in 6">
						<div class="img">
							<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510993633352&di=49e0c34663da6d4029e8f4cfb8cd8484&imgtype=0&src=http%3A%2F%2Fwww.787866.com%2Fupload%2Fnews%2F20111206%2F034314.jpg" alt="">
						</div>
						<div class="bottom">
							<p class="text">(新品上市)雅号女士套装2016夏季新品时尚职业装</p>
						</div>
						<p class="price">￥99 <del>￥168</del></p>
					</div>
				</div>
			</div>
			
			<!-- 结算 -->
			<div class="clearing">
				<div class="icon" v-if="allcheckstate" @click="Allcheck">
					<img v-if="!allcheck" src="../../assets/img/shoppingcar_selected_n.png" alt="">
					<img v-if="allcheck" src="../../assets/img/shoppingcar_selected_h.png" alt="">
					全选
				</div>
				<div v-if="!alledit">
					<div class="finalprice">
						<p class="top"><span class="yun">不含运费</span><span class="heji">合计:</span><span v-if="!total_reduce" class="pri">¥{{total_amount}}</span><span v-else class="pri">¥{{total_amount - total_reduce}}</span></p>
						<p class="bot">已优惠:¥{{total_reduce}}</p>
					</div>
					<div class="clearbtn" @click="clearing">
						结算({{total_count}})
					</div>
				</div>
				<div v-if="alledit">
					<!-- 移入收藏夹 -->
					<div class="collect edbtn" @click="all_collect">收藏</div>
					<!-- 删除 -->
					<div class="del edbtn" @click="all_del">删除</div>
				</div>	
			</div>

			
			<!-- 商品sku -->
			<div>
				<div v-transfer-dom class="sku_dig">
					<popup v-model="specsState" position="bottom" max-height="80%">
						<div class="specspopu">
							<i class="icon-close right" @click="specsState = false"></i>
							<div class="thumb"><img :src="thumb" alt=""></div>
							<div class="title">
								<p class="price">¥{{price}}</p>
								<p class="stock">库存{{stock}}件</p>
								<p class="specification"></p>
							</div>
							<div class="list">
								<div class="content" v-for="(item,index) in specs">
									<p class="specsTitle">{{item['name']}}</p>
									<div>
										<checker v-model="bindId[item['name']]" radio-required default-item-class="uncheck" selected-item-class="check">
											<checker-item v-for="(items,indexs) in item['values']" :value="items['id']" :key="indexs">{{items['name']}}</checker-item>
										</checker>
									</div>
								</div>
							</div>
							<div class="success_btn" @click="change_specs">确定</div>
						</div>
					</popup>
				</div>
			</div>


			<!-- 优惠选择弹窗 -->
			<div>
				<div v-transfer-dom class="offerlist_popu">
					<popup v-model="offerlistState" position="bottom" max-height="50%">
						<div class="offerbox">
							<div class="title">修改优惠</div>
							<div class="list">
								<checklist :max="1" label-position="left" :options="commonList" v-model="value" @on-change="change"></checklist>
							</div>
							<div class="bottom" @click="offerlistState = false">关闭</div>
						</div>
					</popup>
				</div>
			</div>

			<div v-transfer-dom>
				<popup v-model="couponsState" position="bottom" max-height="80%">
					<div class="attrpopu couponspupu">
						<div class="attrpoputitle">领取店铺优惠卷<i class="icon-close right" @click="couponsState = false"></i></div>
						<div class="attrcontent">
							<scroller lock-x height="100%">
								<div>
									<div class="box" v-for="item in voucher">
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
											<div class="unpickupbtn btn" v-if="item['is_get'] == '0'" @click="getVoucher(item.voucher_id)">领取</div>
											</div>

										</div>
									</div>
								</div>	
							</scroller>	
						</div>
					</div>
				</popup>
			</div>


		</div>

		<!-- 购物车没有商品 -->
		<div v-else class="no_good">
			<img src="../../assets/img/img_empty_gouwuche.png" alt="">
			<p>您当前购物车为空</p>
			<router-link to="">
				<div>去逛逛</div>
			</router-link>	
		</div>

	</div>
</template>
<script>
import Vue from 'vue';
import { Flexbox, Scroller, FlexboxItem, XNumber, Popup, TransferDom, Checker, CheckerItem, Checklist } from 'vux'
import { cartHome, checkcartgoods, cartedit, cartremove, cartremovetofav, getVoucher } from '../../http/api.js'
export default{
	directives: {
		TransferDom
	},
	components: {
		Flexbox,
		FlexboxItem,
		XNumber,
		Popup,
		Checker,
    	CheckerItem,
    	Checklist,
    	Scroller
	},
	data(){
		return {
			enabled: null,
			disabled: null, //失效商品列表
			checked_cartId: [], //以选中商品
			total_amount: null, //购物车总价格
			total_count: null, //购物车总件数
			total_reduce: null, //购物车总减免
			alledit: false, //是否全局编辑
			allcheck: false, //是否全部选中
			allcheckstate: true, //局部编辑时不显示全选按钮

			specsState: false, //sku弹窗状态
			sku: null,
			specs: null,
			bindId: {},
			thumb: '',
			specs_name: '',//规格名称
			sku_id: null, //规格ID
			stock: '', //弹窗库存
			price: '', //弹窗价格
			enabled_index: null,
			promotion_index: null,
			goods_index: null,

			offerlistState: false, //优惠活动选择列表
			commonList: [],
			value: [],
			couponsState: false,
			voucher: null
		}
	},
	computed: {
		alleditstate: function(){
			return this.alledit ? '完成' : '编辑';
		}
	},
	watch: {
		'bindId': {
			handler: function(){
				let sku_arr = [];
				for(let item in this.bindId){
					sku_arr.push(this.bindId[item])
				}
				//id从大到小排序
				sku_arr.sort(function (x,y) {
		            return x-y;
		        });
		        let sku_str = sku_arr.join('_')
				//查询sku
				this.sku.map((val,index,arr) => {
					if(val['specs'] == sku_str){
						this.thumb = val.thumb;
						this.stock = val.stock;
						this.price = val.price;
						this.specs_name = val.name;
						this.sku_id = val.id;
						return val;
					}else{
						return false;
					}
				})
			},
			deep: true
		},
		'alledit': {
			handler: function() {
				var _this = this;
				if(this.enabled){
					if(this.alledit){
						this.enabled.map(function(item,index,arr){
							_this.$set(item,'edit',true)
							_this.$set(item,'all_check','0')
							//全局编辑取消商品选中状态
							item['promotion'].map(function(items,indexs,arrs){
								items['goods'].map(function(itemss,indexss,arrss){
									_this.$set(itemss,'is_check','0')
								})
							})
						})
					}else{
						this.enabled.map(function(item,index,arr){
							_this.$set(item,'edit',false)
						})
						this.api_carthome();
					}
				}
			},
			deep: true
		},
		'enabled': {
			handler: function(){
				if(this.enabled){
					let _this = this;
					let store = _this.enabled.filter(function(enabled_item){
						if(enabled_item['all_check'] == '1'){
							return enabled_item
						}
					})
					if(store.length == _this.enabled.length){
						_this.allcheck = true;
					}else{
						_this.allcheck = false;
					}
				}
			},
			deep: true
		},
	},
	methods:{
		api_carthome(){
			cartHome().then((response) => {
				console.log(response)
				if(response.data.code === 1000){
					this.alledit = false;
					this.enabled = response.data.data.enabled;
					this.disabled = response.data.data.disabled;
					this.total_amount = response.data.data.total_amount;
					this.checked_cartId = response.data.data.checked_cartId;
					this.total_count = response.data.data.total_count;
					this.total_reduce = response.data.data.total_reduce;
				}
			})
		},
		api_checkcartgoods(is_check,store_id){
			checkcartgoods({is_check: is_check,store_id: store_id}).then((response) => {
				console.log(response)
				if(response.data.code === 1000){
					this.alledit = false;
					this.enabled = response.data.data.enabled;
					this.disabled = response.data.data.disabled;
					this.total_amount = response.data.data.total_amount;
					this.checked_cartId = response.data.data.checked_cartId;
					this.total_count = response.data.data.total_count;
					this.total_reduce = response.data.data.total_reduce;
				}
			})
		},
		api_cartedit(cart_id,qty,sku_id,prom_id,is_check,is_up){
			if(is_up){
				let params = {
					cart_id: cart_id,
					qty: qty,
					sku_id: sku_id,
					prom_id: prom_id,
					is_check: is_check
				}
				cartedit(params).then((response) => {
					console.log(response)
					if(response.data.code === 1000){
						this.alledit = false;
						this.enabled = response.data.data.enabled;
						this.disabled = response.data.data.disabled;
						this.total_amount = response.data.data.total_amount;
						this.checked_cartId = response.data.data.checked_cartId;
						this.total_count = response.data.data.total_count;
						this.total_reduce = response.data.data.total_reduce;
					}
				})
			}else{
				let params = {
					cart_id: cart_id,
					qty: qty,
					sku_id: sku_id,
					prom_id: prom_id,
				}
				cartedit(params).then((response) => {
					console.log(response)
					if(response.data.code === 1000){
						// this.total_amount = response.data.data.total_amount;
						// this.total_count = response.data.data.total_count;
						// this.total_reduce = response.data.data.total_reduce;
					}
				})
			}
		},
		//修改商品规格
		changespecs(enabled_index,promotion_index,goods_index){
			this.enabled_index = enabled_index;
			this.promotion_index = promotion_index;
			this.goods_index = goods_index;
			this.sku = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['goods_info']['sku'];
			this.specs = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['goods_info']['specs'];
			this.thumb = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['thumb'];
			this.stock = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['stock'];
			this.price = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['price'];
			let sku_specs_str = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['sku_specs'];
			let sku_specs_arr = sku_specs_str.split('_');
			let specsobj = {}
			this.specs.map((item,index,arr) => {
				this.$set(specsobj,item['name'],[])
				item['values'].map((items,indexs,arrs) => {
					specsobj[item['name']].push(items['id'])
				})
			})

			this.specs.map((item,index,arr) => {
				sku_specs_arr.map((items,indexs,arrs) => {
					if(specsobj[item['name']].indexOf(items) != -1){
						this.$set(this.bindId,item['name'],items);
					}
				})
			})
			this.specsState = true;
		},
		//改变商品规格
		change_specs(){
			let enabled_index = this.enabled_index;
			let promotion_index = this.promotion_index;
			let goods_index = this.goods_index;
			this.$set(this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index],'sku',this.specs_name);
			this.$set(this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index],'sku_id',this.sku_id);
			let goods_info = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index];
			this.api_cartedit(goods_info.cart_id,goods_info.qty,goods_info.sku_id,goods_info.prom_id,false);
			this.specsState = false;
		},
		change(val, label){
			let enabled_index = this.enabled_index;
			let promotion_index = this.promotion_index;
			let goods_index = this.goods_index;
			if(enabled_index != null && promotion_index != null && goods_index != null){
				let enabled = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index];
				this.api_cartedit(enabled.cart_id,enabled.qty,enabled.sku_id,val[0],'1',true)
			}
		},
		//修改商品优惠
		offerChange(enabled_index,promotion_index,goods_index){
			this.enabled_index = enabled_index;
			this.promotion_index = promotion_index;
			this.goods_index = goods_index;
			this.commonList = [];//初始化
			let promList = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['all_prom'];
			this.value = [this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['prom_id']];//初始化
			promList.map((item,index,arr) => {
				this.commonList.push({value: item.prom_title,key: item.prom_id,title: item.title})
			})
			this.offerlistState = true;
		},
		//局部删除商品
		goods_del(enabled_index,promotion_index,goods_index){
			let _this = this;
			let cart_id = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['cart_id'];
			this.$vux.confirm.show({
				title: '提示',
				content: '确定删除选中的商品吗？',
				onCancel () {
					return false;
				},
			  	onConfirm () {
			  		cartremove({cart_ids: cart_id}).then((response) => {
			  			console.log(response)
			  			if(response.data.code == 1000){
			  				if(response.data.data.enabled){
			  					let oldgoods = _this.enabled[enabled_index]['promotion'][promotion_index]['goods'];
				  				oldgoods.splice(goods_index,1);
				  				_this.$set(_this.enabled[enabled_index]['promotion'][promotion_index],'goods',oldgoods);
				  				_this.total_amount = response.data.data.total_amount;
				  				_this.checked_cartId = response.data.data.checked_cartId;
								_this.total_count = response.data.data.total_count;
								_this.total_reduce = response.data.data.total_reduce;
			  				}else{
			  					_this.enabled = null;
			  				}
			  			}
			  		})
			  	}
			})
		},
		all_collect(){
			if(this.alledit){
				let cart_ids_arr = [];
				this.enabled.map((e_item,e_index,enabled) => {
					e_item['promotion'].map((p_item,p_index,promotion) => {
						p_item['goods'].map((g_item,g_index,goods) => {
							if(g_item['is_check'] == '1'){
								cart_ids_arr.push(g_item['cart_id'])
							}
						})
					})
				})
				let cart_ids = cart_ids_arr.join(',');
				if(cart_ids){
					cartremovetofav({cart_ids: cart_ids}).then((response) => {
						console.log(response)
						if(response.data.code == 1000){
							this.alledit = false;
						}else{
							this.$vux.toast.text(response.data.message, 'middle')
						}
					})
				}
			}
		},
		//批量删除商品
		all_del(){
			let _this = this;
			this.$vux.confirm.show({
				title: '提示',
				content: '确定删除选中的商品吗？',
				onCancel () {
					return false;
				},
			  	onConfirm () {
			  		if(_this.alledit){
						let cart_ids_arr = [];
						_this.enabled.map((e_item,e_index,enabled) => {
							e_item['promotion'].map((p_item,p_index,promotion) => {
								p_item['goods'].map((g_item,g_index,goods) => {
									if(g_item['is_check'] == '1'){
										cart_ids_arr.push(g_item['cart_id'])
									}
								})
							})
						})
						let cart_ids = cart_ids_arr.join(',');
						if(cart_ids){
							cartremove({cart_ids: cart_ids}).then((response) => {
								console.log(response)
								if(response.data.code == 1000){
									_this.alledit = false;
									if(response.data.data.enabled){
										_this.enabled = response.data.data.enabled;
										_this.disabled = response.data.data.disabled;
										_this.total_amount = response.data.data.total_amount;
										_this.checked_cartId = response.data.data.checked_cartId;
										_this.total_count = response.data.data.total_count;
										_this.total_reduce = response.data.data.total_reduce;
									}else{
										_this.enabled = null;
									}
								}else{
									_this.$vux.toast.text(response.data.message, 'middle')
								}
							})
						}
					}
			  	}
			})
		},
		//局部编辑
		Localeditor(enabled_index){
			this.$set(this.enabled[enabled_index],'edit',true);
			this.$set(this.enabled[enabled_index],'all_check','0');
			this.enabled[enabled_index]['promotion'].map((item,index,arr) => {
				item['goods'].map((items,indexs,arrs) => {
					this.$set(items,'is_check','0')
				})
			})
		},
		//退出局部编辑
		ExitLocaleditor(enabled_index){
			this.$set(this.enabled[enabled_index],'edit',false);
			this.api_carthome();
		},
		//商店全部选中
		storecheck(enabled_index){
			if(this.enabled){
				//点击改变
				let _this = this;
				let ischeck = this.enabled[enabled_index]['all_check'];
				if(ischeck == '0'){
					this.$set(this.enabled[enabled_index],'all_check','1');
					_this.enabled[enabled_index]['promotion'].map((p_item,p_index,promotion) => {
						p_item['goods'].map((g_item,g_index,goods) => {
							_this.$set(g_item,'is_check','1')
						})
					})
				}else{
					this.$set(this.enabled[enabled_index],'all_check','0');
					_this.enabled[enabled_index]['promotion'].map((p_item,p_index,promotion) => {
						p_item['goods'].map((g_item,g_index,goods) => {
							_this.$set(g_item,'is_check','0')
						})
					})
				}
				//遍历店铺全选状态
				let store = _this.enabled.filter(function(enabled_item){
					if(enabled_item['all_check'] == '1'){
						return enabled_item
					}
				})
				if(store.length == _this.enabled.length){
					_this.allcheck = true;
				}else{
					_this.allcheck = false;
				}

				//是否请求接口
				if(!this.alledit){
					if(!this.enabled[enabled_index]['edit']){
						let is_check = this.enabled[enabled_index]['all_check'];
						let store_id = this.enabled[enabled_index]['store_id'];
						this.api_checkcartgoods(is_check,store_id)
					}
				}
			}
		},
		//局部选中
		check(enabled_index,promotion_index,goods_index){
			//点击改变
			let ischeck = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['is_check'];
			if(ischeck == '1'){
				this.$set(this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index],'is_check','0');
			}else{
				this.$set(this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index],'is_check','1');
			}

			//遍历商品全选状态
			let _this = this;
			_this.enabled.map((en_item,en_index,enabled) => {
				let num = 0;
				let numlenth = 0;
				en_item['promotion'].map((p_item,p_index,promotion) => {
					p_item['goods'].filter(function(g_item){
						numlenth++;
						if(g_item['is_check'] == '1'){
							num++;
						}else{
							return false;
						}
					})
				})
				if(num == numlenth){
					_this.$set(en_item,'all_check','1')
				}else{
					_this.$set(en_item,'all_check','0')
				}
			})
			//遍历店铺全选状态
			let store = _this.enabled.filter(function(enabled_item){
				if(enabled_item['all_check'] == '1'){
					return enabled_item
				}
			})
			if(store.length == _this.enabled.length){
				_this.allcheck = true;
			}else{
				_this.allcheck = false;
			}

			//是否请求接口
			if(!this.alledit){
				if(!this.enabled[enabled_index]['edit']){
					let is_check = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['is_check'];
					let goodinfo = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index];
					this.api_cartedit(goodinfo.cart_id,goodinfo.qty,goodinfo.sku_id,goodinfo.prom_id,is_check,true)
				}
			}

		},
		//全部选中
		Allcheck(){
			let _this = this;
			//点击改变
			this.allcheck = !this.allcheck;

			function allamp(_this,state){
				_this.enabled.map((en_item,en_index,enabled) => {
					_this.$set(en_item,'all_check',state);
					en_item['promotion'].map((p_item,p_index,promotion) => {
						p_item['goods'].map((g_item,g_index,goods) => {
							_this.$set(g_item,'is_check',state)
						})
					})
				})
			}
			//遍历状态
			if(this.allcheck){
				allamp(this,"1");
			}else{
				allamp(this,"0");
			}
			//是否请求接口
			if(!this.alledit){
				let is_check = '';
				if(this.allcheck){
					is_check = '1'
				}else{
					is_check = '0'
				}
				let store_id = '0';
				this.api_checkcartgoods(is_check,store_id)
			}
		},
		//编辑商品数量
		sub(enabled_index,promotion_index,goods_index){
			let qty = Number(this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['qty']);
			if(qty != 1){
				let newqty = String(qty-1);
				this.$set(this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index],'qty',newqty);
				let is_check = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['is_check'];
				let goodinfo =this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index];
				this.api_cartedit(goodinfo.cart_id,goodinfo.qty,goodinfo.sku_id,goodinfo.prom_id,is_check,false)
			}			
		},
		add(enabled_index,promotion_index,goods_index){
			let qty = Number(this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['qty']);
			let newqty = String(qty+1);
			this.$set(this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index],'qty',newqty);
			let is_check = this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index]['is_check'];
			let goodinfo =this.enabled[enabled_index]['promotion'][promotion_index]['goods'][goods_index];
			this.api_cartedit(goodinfo.cart_id,goodinfo.qty,goodinfo.sku_id,goodinfo.prom_id,is_check,false)
			
		},
		//结算
		clearing(){
			if(this.checked_cartId.length == 0){
				this.$vux.toast.text('您还没有选择宝贝哦', 'middle')
			}else{
				let cart_ids = this.checked_cartId.join(',');
				let data = {
					id: cart_ids,
				}
				localStorage.type = "shopcar";
				localStorage.info = JSON.stringify(data)
				this.$router.push({path: "/confirmorder"})
			}
		},
		//领取店铺优惠卷
		pickup(enabled_index){
			console.log(this.enabled)
			this.voucher = this.enabled[enabled_index]['store_voucher'];
			this.couponsState = true;
		},
		//普通领取优惠劵
		getVoucher(voucher_id){
			getVoucher({voucher_id: voucher_id}).then((response) => {
				console.log(response)
				if(response.data.code == 1000){
					this.$vux.toast.text('领取成功', 'middle');
				}
			})
		}
	},
	created(){
		this.api_carthome();
	}
}
</script>
<style lang="less">
@import '../../assets/css/component/shopcar.less';
</style>