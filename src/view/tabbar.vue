<template>
	<div class="tabbar">
		<div class="box" @click="routerlink(0)">
			<div class="normal all" v-if="index != 0">
				<div><img src="../assets/img/tab_1_n.png" alt=""></div>
				<p>首页</p>
			</div>
			<transition
				name="custom-classes-transition"
				enter-active-class="animated fadeIn"
			>
				<div class="active all" v-if="index == 0">
					<div><img src="../assets/img/tab_1_h.png" alt=""></div>
					<p>首页</p>
				</div>
			</transition>	
		</div>
		<div class="box" @click="routerlink(1)">
			<div class="normal all" v-if="index != 1">
				<div><img src="../assets/img/tab_2_n.png" alt=""></div>
				<p>分类</p>
			</div>
			<transition
				name="custom-classes-transition"
				enter-active-class="animated fadeIn"
			>
				<div class="active all" v-if="index == 1">
					<div><img src="../assets/img/tab_2_h.png" alt=""></div>
					<p>分类</p>
				</div>
			</transition>	
		</div>
		<div class="box" @click="routerlink(2)">
			<div class="normal all" v-if="index != 2">
				<div><img src="../assets/img/tab_3_n.png" alt=""></div>
				<p>发现中心</p>
			</div>
			<transition
				name="custom-classes-transition"
				enter-active-class="animated fadeIn"
			>
				<div class="active all" v-if="index == 2">
					<div><img src="../assets/img/tab_3_h.png" alt=""></div>
					<p>发现中心</p>
				</div>
			</transition>	
		</div>
		<div class="box" @click="routerlink(3,'/shopcar')">
			<div class="normal all" v-if="index != 3">
				<div><img src="../assets/img/tab_4_n.png" alt=""></div>
				<p>购物车</p>
			</div>
			<transition
				name="custom-classes-transition"
				enter-active-class="animated fadeIn"
			>
				<div class="active all" v-if="index == 3">
					<div><img src="../assets/img/tab_4_h.png" alt=""></div>
					<p>购物车</p>
				</div>
			</transition>	
		</div>
		<div class="box" @click="routerlink(4,'/person')">
			<div class="normal all" v-if="index != 4">
				<div><img src="../assets/img/tab_5_n.png" alt=""></div>
				<p>个人中心</p>
			</div>
			<transition
				name="custom-classes-transition"
				enter-active-class="animated fadeIn"
			>
				<div class="active all" v-if="index == 4">
					<div><img src="../assets/img/tab_5_h.png" alt=""></div>
					<p>个人中心</p>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
export default{
	data() {
		return {
			index: 0
		}
	},
	watch:{
		'$route': 'changerouter'
	},
	methods: {
		changerouter(){
			let path = this.$route.fullPath;
			if(path.indexOf('/person') != -1){
				this.index = 4
			}else if(path.indexOf('/shopcar') != -1){
				this.index = 3
			}
		},
		routerlink(index,path){
			this.index = index;
			this.$router.push({path: path})
		}
	},
	created(){
		this.changerouter()
	}
}
</script>
<style lang="less">
.tabbar{
	height: 1.17rem;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	border-top: 1px solid #E7E7E7;
	background: #fff;
	z-index: 999;
	.box{
		width: 20%;
		height: 100%;
		float: left;
		.all{
			text-align: center;
			padding-top: 0.13rem;
			img{
				height: 0.48rem;
			}
			p{
				font-size: 0.24rem;
			}
		}
		.active{
			color: #FB0036;
		}
	}
}
</style>