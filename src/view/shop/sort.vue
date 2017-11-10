<template>
	<div class="sort">
		<ul class='sortUlBox' >
			<li>
				<p><span>全部</span></p>
			</li> 
			<li v-for="(item,index) in sortList">
				<p><span>{{item.name}}</span><b v-if='item.children.length>0'>查看全部</b><i v-else class='icon-right'></i></p>
				<div v-for="(items,index) in item.children">
					<span>{{items.name}}</span>
				</div>
			</li>
			
		</ul>
	</div>
</template>
<script>
import {storeCategories} from '../../http/api.js'
export default{
	data(){
		return {
			sortList:'',
			checkAll:'',
		}
	},
	methods:{
		getList(){
			storeCategories({storeId:this.$route.query.storeId}).then((response)=>{
				if(response.data.code=1000){
					this.sortList=response.data.data
					console.log(this.sortList)
				}
			})
		}
	},
	created(){
		this.getList()

	}
}
</script>
<style lang='less'>
#app{
	height:100%;
}
html,body{
	height:100%;
}
.sort{
	height:100%;
	.sortUlBox{
		height:100%;
		li:first-child{
			border-bottom:0.266667rem solid #F7F7F7;
			p{
				border-bottom:none;
			}
		}
		li{
			line-height:1.2rem;	

			p{
				margin:0 0.266667rem 0;
				border-bottom:1px solid #D8D8D8;
				span{
					font-size:0.4rem;
					color:#1C1B20;
				}
				b{
					font-size:0.293333rem;
					color:#858585;
					float:right;
					font-weight:normal;
				}
				i{
					float:right;
					line-height:1.2rem;
				}
			}
			div{
				span{
					width:50%;
					float:left;
					background:#F4F4F4;
					box-sizing: border-box;
					text-align: center;
					margin-top:0.133333rem;
				}
				span:nth-child(odd){
					border-right:0.066667rem solid white;
				}
				span:nth-child(even){
					border-left:0.066667rem solid white;
				}
			}

		}
	}
}

	
</style>