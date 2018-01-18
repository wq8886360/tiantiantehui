<template>
	<div class="brand">
            <div class="brand_left" ref="wrapper">
                <div class="ul_content">
                    <div class="li" v-for='(item,index) in brand_list' :key="index">
                        <div class="letter" ref="first_letter">{{item.first_letter}}</div>
                        <ul class="logcom_ul content">
                            <li :class="{active: indexArr.indexOf(index+''+indexx) != -1}"  @click='add(itemm.brand_name,index,indexx)' v-for='(itemm,indexx) in item.item_list' :key="index">{{itemm.brand_name}}</li>
                        </ul>
                    </div>
                </div>    	
            </div>    
		<div class="brand_right">
			<div @click='paging(index)' class="letter_c" v-for='(item,index) in brand_data' :class="{active: index == rightIndex}" :key="index">{{item}}</div>
		</div>
		<div class="advertising">
			<span @click='rest()' style="background:#FCEAEE;color:#FB0036">重置</span>	
			<span @click='complete()' style="background:#FB0036;color:#ffffff">完成</span>
		</div>
	</div>
</template>
<script>
import {getListFilter} from '../../http/api.js'
import BScroll from 'better-scroll';
export default{
	data(){
		return{
			brand_data:null,
			brand_list:null,
			liIndex: 0,
            rightIndex: 0,
            scrollY: -1, //y轴距离
            rightLiarr: [],
            arr:[],
            indexa:null,
            indexArr: []
		}
	},
	watch: {
        'scrollY': {
            handler: function() {
                this.rightLiarr.map((item,index) => {
                    let difference = item + this.scrollY;
                    if(difference < 5 && difference > -5){
                        this.rightIndex = index;
                        return
                    }
                })
            }
        }
    },
	methods:{
		api_getListFilter(){
			getListFilter({cid:75,keyword:''}).then((response)=>{
				let res =response.data;
				if(res.code==1000){
					console.log(res)
					this.brand_data=res.data.first_letter_list;
					this.brand_list=res.data.brand_list;
					this.$nextTick(() => {
                        let letter = this.$refs.first_letter;
                        this.rightLiarr = [];
                        letter.map((item) => {
                            this.rightLiarr.push(item.offsetTop)
                        })
                        //初始化bscroll
                        this.scroll = new BScroll(this.$refs.wrapper, {
                            scrollX: false,
                            scrolly: true,
                            click: true,
                            probeType: 3
                        })
                        //监听scroll滚动
                        this.scroll.on('scroll', (pos) => {
                            this.scrollY = pos.y;
                        })
					})
				}
			})
		},
		/*点击分页*/
		paging(index){	
			let Target = document.querySelectorAll('.letter');
			this.scroll.scrollToElement(Target[index],500,0,0,'easing');
        },
        /*选择*/
        add(item_name,index,indexx){
        	let new_arr=this.arr.length+1;
        	let new_indexArr=this.indexArr.length+1;
   			for(var i=0;i<new_arr;i++){
   				if(item_name == this.arr[i]){
   				   this.arr.splice(i,1);
   				   this.indexArr.splice(i,1);
   				   console.log(this.arr,this.indexArr,123)
   				   return;//利用函数的返回功能中断push操作
   				}
   			};
   			if(this.arr.length<8){
   				this.arr.push(item_name)
   				let res_index = index + '' + indexx;
   				if(this.indexArr.indexOf(res_index) == -1){
   					this.indexArr.push(res_index);
   					console.log(this.indexArr)
   				}
   				console.log(this.arr)
   			}else{
   				this.$vux.toast.text('已达到上限8个', 'middle')
   			}
        },
        /*重置*/
        rest(){
        	this.arr=[];
        	this.indexArr=[]
        	console.log(this.arr)
        },
        /*完成*/
        complete(){
        	if(this.arr.length==0){
        		this.$vux.toast.text('请选择', 'middle')
        	}else{
        		console.log(this.arr)
        	}
        }
	},
	created(){
		this.api_getListFilter();
	}
}	
</script>
<style lang='less'>
.displayflex{display: -webkit-flex;display: flex;}
.align_items_center{-webkit-align-items: center;align-items: center;}
.justify_content_center{-webkit-justify-content: center;justify-content: center;}
.justify_content{-webkit-justify-content: space-between;justify-content: space-between;}

.brand{
    width: 100vw;
    height: 94vh;
	border-top:1px solid #EEEEEE;
	overflow:hidden;
	.brand_left{
		width: 9.2rem;
        float: left;
        height: 100%;
        overflow: hidden;
       	margin-bottom: 1.07rem;
		.letter{
			border-bottom:1px solid #EEEEEE;
			height: 1.05rem;
			line-height: 1.05rem;
			font-family: PingFang-SC-Bold;
			font-size: 0.4rem;
			color:#FB0036;
			text-indent: 0.27rem;
		}
		.logcom_ul{
			width: 9.2rem;
			li{
				width: 100%;
				height: 1.05rem;
				line-height: 1.05rem;
				border-bottom:1px solid #EEEEEE;
				text-indent: 0.27rem;
				font-family: PingFang-SC-Regular;
				color:#1C1B20;
				font-size: 0.37rem;
			}
			.active{
	            color: #FB0036;
	        }
		}
	}
	.brand_right{
		width: 0.8rem;
        height: 100vh;
        position: fixed;
        right: 0;
        top: 0;
        .displayflex;
        .justify_content_center;
        -webkit-flex-direction: column;
        flex-direction: column;
		.letter_c{
			font-family: PingFang-SC-Regular;
			color:#AAAAAA;
			font-size: 0.32rem;
			text-align: center;
			padding: 0.067rem 0;
        }
        .active{
	        color: #FB0036;
	    }
	}
	.advertising{
		width: 100vw;
		height: 1.07rem;
		position: fixed;
		bottom:0px;
		box-sizing: border-box;
		left: 0px;
		span{
			width: 4.9rem;
			height: 1.07rem;
			display: inline-block;
			font-family: PingFang-SC-Regular;
			font-size: 0.37rem;
			text-align: center;
			line-height: 1.07rem;
		}
	}
	.make{
		color: #FB0036;
	}
}	
</style>