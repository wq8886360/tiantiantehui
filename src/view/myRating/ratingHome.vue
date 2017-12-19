<template>
	<div class="ratingHome">
		<div class='fixed'>
			<div class='title'>
				<img v-if='myInfo.avatar!=""' :src="myInfo.avatar" alt="">
				<img v-else src="../../assets/img/login_logo.png" alt="">
				<span>{{myInfo.nickname}}</span>
			</div>
			<div class='border'></div>	
			<tab :animate="false">
		      <tab-item selected @on-item-click="onItemClick">全部评价</tab-item>
		      <tab-item @on-item-click="onItemClick">等待追评</tab-item>
		    </tab>
		</div>
		<div class='ratingCon'  v-if='index==0'>
			<div class='ratingBox'  v-for='item in evaData' v-if='evaData.length!=0'>
				<p class='evaDetail'>评价详情:</p>
				<div class='evaImg' v-if='item.star_level=="5"'>
					<img src="../../assets/img/goodBright.png" alt="">
					<img src="../../assets/img/goodBright.png" alt="">
					<img src="../../assets/img/goodBright.png" alt="">
					<img src="../../assets/img/goodBright.png" alt="">
					<img src="../../assets/img/goodBright.png" alt="">
					<span @click='addReview(item)' v-if='item.is_append=="1"'>写追评</span>
					<span class='already'  v-if='item.is_append=="2"'>已追评</span>
				</div>
				<div class='evaImg' v-if='item.star_level=="3"'>
					<img src="../../assets/img/generalBright.png" alt="">
					<img src="../../assets/img/generalBright.png" alt="">
					<img src="../../assets/img/generalBright.png" alt="">
					<span @click='addReview(item)' v-if='item.is_append=="1"'>写追评</span>
					<span class='already'  v-if='item.is_append=="2"'>已追评</span>
				</div>
				<div class='evaImg' v-if='item.star_level=="1"'>
					<img src="../../assets/img/badBright.png" alt="">
					<span @click='addReview(item)' v-if='item.is_append=="1"'>写追评</span>
					<span class='already'  v-if='item.is_append=="2"'>已追评</span>
				</div>
				<p class='evaDetailCon' @click='evaDetail(item.comment_id)'>{{item.content}}</p>
				<div class='imgBox' v-if='item.pics.length!=0'>
					<img :src="imgSrc" alt="" v-for='imgSrc in item.pics'>
				</div>
				<div class='review'>
					<p class='reviewText'>{{item.append_note}}</p>
					<p class='reviewCon'>{{item.append}}</p>
				</div>
				<div class='imgBox' v-if='item.append_pics.length!=0'>
					<img :src="imgSrc" alt="" v-for='imgSrc in item.append_pics'>
				</div>
				<div class='goodsInfo'>
					<div class='infoLeft'>
						<img v-if='item.thumb!=""' :src="item.thumb" alt="">
						<img v-else src="../../assets/img/login_logo.png" alt="">
					</div>
					<div class='infoRight'>
						<p>{{item.title}}</p>
						<p class='price'>￥{{item.price}}</p>
					</div>
				</div>
				<p class='commentNum'><span>{{item.addtime}}</span><b>{{item.praise_total}}</b><i>点赞数：</i></p>
				<div class='border'><b></b><i></i></div>	
			</div>
			<div class='noReview' v-if='evaData.length==0'>
				<img src="../../assets/img/noReview.png" alt="">
				<p>您还没有需要追评的商品</p>
			</div>
		</div>
		<div v-if='index==1' class='waitRate'>
			<div v-if='evaData.length!=0'>
				<p class='tip'>以下商品您还没有进行追评</p>
				<div class='ratingBox' v-for='item in evaData'>
					<div class='goodsInfo'>
						<div class='infoLeft'>
							<img v-if='item.thumb!=""' :src="item.thumb" alt="">
							<img v-else src="../../assets/img/login_logo.png" alt="">
						</div>
						<div class='infoRight'>
							<p>{{item.title}}</p>
							<p class='price'>￥{{item.price}}</p>
							<span  @click='addReview(item)'>写追评</span>
						</div>
					</div>
					<div class='border'><b></b><i></i></div>	
				</div>

			</div>
			<div class='noReview' v-if='evaData.length==0'>
				<img src="../../assets/img/noReview.png" alt="">
				<p>您还没有需要追评的商品</p>
			</div>
		</div>
	</div>
</template>
<script>
import {memberCommentList} from '../../http/api.js'
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, ToastPlugin  } from 'vux'
export default {
	components: {
	    Tab,
	    TabItem,
	    Sticky,
	    Divider,
	    XButton,
	    Swiper,
	    SwiperItem
	},
	data () {
    	return {
    		index:0,
    		page:1,
    		pageSize:30,
    		MaxPage:'',
    		evaData:'',//评价的列表
    		myInfo:'',//我的头像和名字
    	}
    },
    methods: {
    	onItemClick (index) {
	      	this.index=index
	      	this.getList()
	    },
	    getList(){
	    	let info={
	    		status:this.index,
	    		page:this.page,
	    		page_size:this.pageSize,
	    	}
	    	memberCommentList(info).then((response) => {
	    		if(response.data.code==1000){
	    			this.MaxPage=response.data.data.max_page
	    			this.evaData=response.data.data.list
	    			this.myInfo=response.data.data
	    		}
	    	})
	    },
	    addReview(item){
	    	this.$router.push({path: '/additionalReview',query:{items:item}})
	    },
	    evaDetail(comment_id){
	    	this.$router.push({path: '/evaDetail',query:{comment_id:comment_id,myInfo:this.myInfo}})
	    },
	    menu() {
	    	if(this.$route.path=='/MyRating'){
		    	if(document.body.scrollHeight-document.body.scrollTop-document.documentElement.clientHeight=='0'){
		    		if(this.MaxPage>this.page){
		    			this.page=this.page+1
				    	let info={
				    		status:this.index,
				    		page:this.page,
				    		page_size:this.pageSize,
				    	}
				    	memberCommentList(info).then((response) => {
				    		console.log(response)
				    		if(response.data.code==1000){
				    			var data=response.data.data.list
				    			for(var i=0;i<data.length;i++){
				    				this.evaData.push(data[i])
				    			}
				    		}
				    	})
		    		}else{
		    			this.$vux.toast.text('没有更多的内容了', 'middle')
		    		}
		    	}
		    }
   		},
    },
    created(){
    	this.getList()
    	console.log(111)
    },
    mounted() {
    	if(this.$route.path=='/MyRating'){
    		window.addEventListener('scroll', this.menu) /*ready*/
    	}
  	},
}	
</script>
<style lang='less'>
.ratingHome{

	.fixed{
		width:100%;
		position:fixed;
		top:0;
		z-index:1000;
		.title{
			box-sizing: border-box;
			padding:0.36rem 0.266667rem;
			overflow: hidden;
			background:white;
			img{
				width:0.75rem;
				height:0.75rem;
				border-radius: 100%;
				float:left;
			}
			span{
				float:left;
				height:0.75rem;
				line-height:0.75rem;
				margin-left:0.146667rem;
				font-size:0.373333rem;
			}
		}
		.border{
			height:0.2rem;
			width:100%;
			background:#F7F7F7;
		}
		.vux-tab{
			height:1.2rem;
			overflow:hidden;
			.vux-tab-selected{
				color:#fb0036!important;
				border-bottom: 3px solid #fb0036!important;

			}
			.vux-tab-item{
				font-size:0.4rem;
				color: #1C1B20;
			}
		} 
	}
	.ratingCon{
		margin-top:2.87rem;
		box-sizing: border-box;
		padding:0 0.266667rem;
		.ratingBox{
			.border{
				height:0.2rem;
				width:100%;
				position:relative;
				i{	
					display:inline-block;
					height:100%;
					width:100%;
					background:#F7F7F7;
					position:absolute;
					top:0;
					left:-0.266667rem;
				}
				b{
					display:inline-block;
					height:100%;
					width:100%;
					background:#F7F7F7;
					position:absolute;
					right:-0.266667rem;
					top:0;
				}
			}
			.evaDetail{
				font-size:0.4rem;
				height:0.4rem;
				line-height: 0.4rem;
				padding-top:0.493333rem;
				padding-bottom:0.453333rem;
			}
			.evaImg{
				overflow:hidden;
				img{
					height:0.64rem;
					width:0.64rem;
					margin-right:0.133333rem;
					float:left;
				}
				span{
					width:1.426667rem;
					height:0.64rem;
					float:right;
					color:#FB0036;
					font-size:0.346667rem;
					border:1px solid #fb0036;
					line-height:0.64rem;
					text-align: center;
					box-sizing: border-box;
					border-radius: 4px; 
				}
				.already{
					background:#fb0036;
					color:white;
				}
			}
			.evaDetailCon{
				color:#1C1B20;
				font-size:0.4rem;
				line-height: 0.533333rem;
				padding-top:0.4rem;
				padding-bottom:0.533333rem;
			}
			.imgBox{
				overflow:hidden;
				margin-bottom:0.533333rem;
				img{
					width:3.066667rem;
					height:3.066667rem;
					float:left;
					margin-bottom:0.133333rem;
				}
				img:nth-child(2){
					margin:0 0.133333rem;
				}
				img:nth-child(5){
					margin:0 0.133333rem;
				}
			}
			.review{
				.reviewText{
					color:#FB0036;
					height:0.373333rem;
					font-size:0.373333rem;
					line-height:0.373333rem;
					margin-bottom:0.4rem;
				}
				.reviewCon{
					color:#1C1B20;
					font-size:0.4rem;
					line-height:0.533333rem;
					margin-bottom:0.533333rem;
				}
			}
			.goodsInfo{
				display:flex;
				.infoLeft{
					float:left;
					overflow: hidden;
					width:2.666667rem;
					height:2.666667rem;
					img{
						width:100%;
						height:100%;
					}
				}
				.infoRight{
					float:left;
					flex:1;
					box-sizing: border-box;
					padding:0.493333rem 0.266667rem 0.346667rem 0.333333rem;
					position:relative;
					font-size:0.373333rem;
					background:#F8F8F8;
					.price{
						font-size:0.453333rem;
						color:#1C1B20;
						position:absolute;
						left:0.333333rem;
						bottom:0.346667rem;
					}

				}
			}
			.commentNum{
				overflow:hidden;
				padding-top:0.586667rem;
				padding-bottom:0.7rem;
				span{
					color:#BBBBBB;
					float:left;
					font-size:0.346667rem;
				}
				i{
					float:right;
					color:#1C1B20;
					font-size:0.373333rem;
					height:0.373333rem;
					line-height:0.373333rem; 
				}
				b{
					float:right;
					color:#fb0036;
					font-size:0.373333rem;
					height:0.373333rem;
					line-height:0.373333rem; 
				}
			}
		}
	}
	.waitRate{
		margin-top:2.87rem;
		box-sizing: border-box;
		padding:0 0.24rem;
		.tip{
			color:#1C1B20;
			padding-top:0.626667rem;
			font-size:0.4rem;
			line-height: 0.4rem;
			height:0.4rem;
		}
		.ratingBox{
			margin-top:0.693333rem;
			.goodsInfo{
				display:flex;
				margin-bottom:0.706667rem;
				.infoLeft{
					float:left;
					overflow: hidden;
					width:2.666667rem;
					height:2.666667rem;
					img{
						width:100%;
						height:100%;
					}
				}
				.infoRight{
					float:left;
					flex:1;
					box-sizing: border-box;
					padding:0.493333rem 0.266667rem 0.346667rem 0.333333rem;
					position:relative;
					font-size:0.373333rem;
					background:#F8F8F8;
					.price{
						font-size:0.453333rem;
						color:#1C1B20;
						position:absolute;
						left:0.333333rem;
						bottom:0.346667rem;
					}
					span{
						display:inline-block;
						width:1.426667rem;
						height:0.64rem;
						font-size:0.346667rem;
						color:#FB0036;
						line-height:0.64rem;
						text-align: center;
						border:1px solid #FB0036;
						position: absolute;
						right:0.266667rem;
						bottom:0.346667rem;
						border-radius: 4px;

					}
				}
			}
			.border{
				height:0.2rem;
				width:100%;
				position:relative;
				i{	
					display:inline-block;
					height:100%;
					width:100%;
					background:#F7F7F7;
					position:absolute;
					top:0;
					left:-0.24rem;
				}
				b{
					display:inline-block;
					height:100%;
					width:100%;
					background:#F7F7F7;
					position:absolute;
					right:-0.24rem;
					top:0;
				} 
			}			
		}
	}
		.noReview{
			padding-top:3.333333rem;
			img{

				width:5.133333rem;
				height:2.933333rem;
				display:block;
				margin:0 auto;
			}
			p{
				font-size:0.4rem;
				height:0.4rem;
				line-height: 0.4rem;
				margin-top:0.64rem;
				color:#ccc;
				text-align: center;
			}
		}
}
</style>