<template>  
    <div class='eva'>  
       <div class='evaHeader'>
            <span v-for='(item,index) in label' v-bind:class="{ active: spanIndex==index}" @click='count(index,item)'>{{item.name}}({{item.count}})</span>
       </div>
       <div class='border'><b></b><i></i></div>
        <div v-if='list.length==0' class='noReview'>
            <img src="../../assets/img/noReview.png" alt="">
            <p>您还没有相关的评价</p>
        </div>
       <div class='evaBox' v-for='(item,index) in list' v-else>
            <div class='evaBoxCon'>
                <img class='avtor' :src="item.avatar" alt="">
                <span class='title'>{{item.nickname}}</span>
                <img class='level' src="../../assets/img/goodDim.png" alt="">
                <img class='star' src="../../assets/img/goodDim.png" alt="">
                <span class='time'>{{item.add_time}}</span>
            </div>
            <p class='rateCon'>{{item.content}}</p>
            <div class='imgBox' v-if='item.pics.length!="0"'>
                <img v-for='pic in item.pics' :src="pic" alt="" >
            </div>
            <p class='addEvaTitle' v-if='item.append_time!=""'>{{item.append_time}}</p>
            <p class='rateCon' v-if='item.append!=""'>{{item.append}}</p>
             <div class='imgBox' v-if='item.append_pics.length!="0"'>
                <img v-for='append_pic in item.append_pics' :src="item" alt="" >
            </div>
            <p class='size' v-if='item.goods_option!=""'>{{item.goods_option}}</p>
            <div class='zan'>
                <span class='zanTime'>购买日期：{{item.buy_time}}</span><img v-if='item.is_praise' @click='zan(item,index)'  src="../../assets/img/zanBright.png" alt=""><img v-else  src="../../assets/img/zanDim.png" @click='zan(item,index)' alt=""><span class='zanNum'>{{item.praise_total}}</span>
            </div>
            <div class='borderSim'><b></b><i></i></div>
       </div>


    </div>  
</template>  
  
<script>  
import {commentList,commentPraise} from '../../http/api.js'
export default {  
    data () {  
        return {  
            label:'',//头部列表
            list:'',//评价信息
            listToatl:'',//评价信息总的
            spanIndex:'0',
            info:{
                goods_id:'',
                type:'ALL',
                page:1,
                pageSize:30,
                id:''
            },
            totalSize:'',//总数
        }  
    },  
    mounted() {
        if(this.$route.path=='/Eva'){
            window.addEventListener('scroll', this.menu)
        }
    }, 
    methods: {  
        getList(){
            commentList(this.info).then((response)=>{
                if(response.data.code='1000'){
                    this.label=response.data.data.label
                    this.list=response.data.data.list.data
                    this.listTatal=response.data.data.list.data
                    this.totalSize=response.data.data.list.allPage
                }
            })
        },
        count(idx,item){
            this.spanIndex=idx
            this.info.type=item.type
            this.getList()
        },
        zan(item,index){
            this.$set(this.list,index,item)
            commentPraise({comment_id:item.comment_id}).then((response)=>{
                if(response.data.code=='1000'){
                    this.$vux.toast.text(response.data.message, 'middle')
                    item.is_praise=!item.is_praise
                    this.getList() 
                }else if(response.data.code=='1001'){
                    this.$vux.toast.text(response.data.message, 'middle')
                }
            })
        },
        menu() {
            if(this.$route.path=='/Eva'){
                if(document.body.scrollTop!='0'){
                    if(document.body.scrollHeight-document.body.scrollTop-document.documentElement.clientHeight<='5'){
                       if(this.info.page<this.totalSize){
                            this.info.page++
                            commentList(this.info).then((response)=>{
                                if(response.data.code='1000'){
                                    this.listTatal=response.data.data.list.data
                                    for(var i=0;i<this.listTatal.length;i++){
                                        this.list.push(this.listTatal[i])
                                    }
                                }
                            })
                        }else{
                            this.$vux.toast.text('没有更多的内容了', 'middle')
                        }
                    }
                }

            }
        },
    },
  created(){
    if(this.$route.query.comment_id==null){
        this.info.goods_id=this.$route.query.goods_id
    }else{
        this.info.id=this.$route.query.comment_id
        this.info.goods_id=this.$route.query.goods_id
    }
    this.getList()
  }  
}  
</script>  
  
<style lang='less'>  
.eva{
    box-sizing: border-box;
    padding:0 0.253333rem;
    .evaHeader{
        box-sizing: border-box;
        padding:0.573333rem 0 0.306667rem;
        span{
            display:inline-block;
            height:0.64rem;
            line-height:0.64rem;
            padding:0 0.146667rem;
            font-size:0.306667rem;
            margin-right:0.253333rem;
            margin-bottom:0.253333rem;
            background:#FDEEF1;
            border-radius: 4px;
            color:#1C1B20;
        }
        .active{
            background:red;
            color:#FFFFFF;
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
            left:-0.253333rem;
        }
        b{
            display:inline-block;
            height:100%;
            width:100%;
            background:#F7F7F7;
            position:absolute;
            right:-0.253333rem;
            top:0;
        }
    }
    .borderSim{
        height:1px;
        width:100%;
        position:relative;
        i{  
            display:inline-block;
            height:100%;
            width:100%;
            background:#F7F7F7;
            position:absolute;
            top:0;
            left:-0.253333rem;
        }
        b{
            display:inline-block;
            height:100%;
            width:100%;
            background:#F7F7F7;
            position:absolute;
            right:-0.253333rem;
            top:0;
        }
    }
    .evaBox{
        .evaBoxCon{
            box-sizing: border-box;
            padding:0.453333rem 0 0.293333rem;
            overflow: hidden;
            .avtor{
                width:0.813333rem;
                height:0.813333rem;
                float:left;
            }
            .title{
                height:0.813333rem;
                line-height:0.813333rem;
                color:#1C1B20;
                font-size:0.333333rem;
                display:inline-block;
                 float:left;
                 margin-left:0.186667rem;
                 margin-right:0.16rem;
            }
            .level{
                width:0.293333rem;
                height:0.306667rem;
                margin-top:0.24rem;
                float:left;
                margin-right:0.16rem;
            }
            .star{
                width:0.293333rem;
                height:0.306667rem;
                margin-top:0.24rem;
                float:left;
                margin-right:0.16rem;
            }
            .time{
                color:#BBBBBB;
                font-size:0.24rem;
                height:0.813333rem;
                line-height:0.813333rem;
                float:right;
            }
        }
        .rateCon{
            color:#1C1B20;
            line-height:0.506667rem;
            font-size:0.346667rem;
            margin-bottom:0.373333rem;
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
        .addEvaTitle{
            color:#FB0036;
            font-size:0.346667rem;
            margin-bottom:0.16rem;
        }
        .size{
            color:#BBBBBB;
            font-size:0.32rem;
            margin-bottom:0.4rem;
        }
        .zan{
            overflow: hidden;
            color:#BBBBBB;
            .zanTime{
                float:left;
                font-size: 0.32rem;
                margin-bottom:0.48rem;
            }
            .zanNum{
                float:right;
                font-size: 0.32rem;
            }
            img{
                float:right;
                width:0.253333rem;
                height:0.28rem;
                margin-top:0.04rem;
                margin-left:0.186667rem;
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





<!-- <template>
	<div class="evaDetail">
		<div class='title'>
			<img v-if='myInfo.avatar!=""' :src="myInfo.avatar" alt="">
			<img v-else src="../../assets/img/login_logo.png" alt="">
			<span>海绵宝宝的派大星</span>
		</div>
		<div class='border'></div>
		<div class='evaCon'>
			<p class='pDetail'>评价详情:</p>
			<p class='pCon'>{{detailData.content}}</p>
			<p class='addReviewTitle'>{{detailData.append_note}}</p>
			<p  class='pCon'>{{detailData.append}}</p>
			<div class='rateCon'>
				<div class='rateGoodLeft'>
					<img v-if='detailData.thumb!=""' :src="detailData.thumb" alt="">
					<img v-else src="../../assets/img/login_logo.png" alt="">
				</div>
				<div  class='rateGoodRight'>
					<p>{{detailData.title}}</p>
					<p class='price'>￥{{detailData.price}}</p>
				</div>
			</div>
			<div class='goodeva'>
				<span @click='changeGoodEva(detailData)' v-if='detailData.is_change==1'>改为好评</span>
				<span class='reviewEva' @click='addEva(detailData)' v-if='detailData.is_append==1'>写追评</span>
			</div>
		</div>	
		
	</div>
</template>
<script>
import {commentDetalis} from '../../http/api.js'
export default {
	data () {
    	return {
    		detailData:'',//商品详情
    		myInfo:'',
    	}
    },
    methods: {
    	addEva(item){
    		this.$router.push({path: '/additionalReview',query:{items:item}})
    	},
    	changeGoodEva(item){
    		this.$router.push({path: '/changeGoodEva',query:{items:item}})
    	},
    	evaDetail(){
    		commentDetalis({comment_id:this.$route.query.comment_id}).then((response)=>{
    			if(response.data.code==1000){
    				this.detailData=response.data.data.list
    			}
    		})
    	}
    },
    created(){
    	this.myInfo=this.$route.query.myInfo
    	this.evaDetail()
    }
}	
</script>
<style lang='less'>
.evaDetail{
	.release{
		position:fixed;
		bottom:0;
		left:0;
		width:100%;
		height:1.333333rem;
		line-height: 1.333333rem;
		background:#fb0036;
		color:white;
		text-align: center;
		font-size:0.453333rem;
		z-index:100000;
	}
	.title{
		position:fixed;
		top:0;
		left:0;
		width:100%;
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
		margin-top:1.47rem;
		height:0.2rem;
		width:100%;
		background:#F7F7F7;
	}
	.rateCon{
		display:flex;
		padding-bottom:0.36rem;
		border-bottom:1px solid #EEEEEE;
		padding-top:0.613333rem;
		.rateGoodLeft{
			float:left;
			width:1.6rem;
			height:1.6rem;
			img{
				width:100%;
				height:100%;
			}
		}
		.rateGoodRight{
			flex:1;
			float:left;
			padding-left:0.466667rem;
			position:relative;
			p{
				font-size:0.346667rem;
				line-height: 0.453333rem;
				margin-top:0.053333rem;
			}
			.price{
				position:absolute;
				bottom:0.08rem;
				left:0.533333rem;
			}
		}	
	}
	.evaCon{
		box-sizing: border-box;
		padding:0 0.266667rem;
		.pDetail{
			font-size:0.4rem;
			height:0.4rem;
			line-height: 0.4rem;
			margin:0.466667rem 0;
		}
		.pCon{
			line-height: 0.533333rem;
			font-size:0.4rem;
			color:#1C1B20;
		}
		.addReviewTitle{
			font-size: 0.4rem;
			height:0.4rem;
			line-height: 0.4rem;
			color:#FB0036 ;
			margin-top:0.533333rem;
			margin-bottom:0.453333rem;
		}
		.goodeva{
			margin-top:0.613333rem;
			overflow:hidden;
			span{
				width:3.013333rem;
				height:1.013333rem;
				display:inline-block;
				text-align: center;
				float:right;
				line-height: 1.013333rem;
				background:#FD523C;
				color: white;
				border-radius: 4px;
				font-size:0.4rem;
			}
			.reviewEva{
				background:#FF8A18;
				margin-right:0.213333rem;
			}
		}
	}
}
</style> -->