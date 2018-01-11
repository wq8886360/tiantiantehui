<template>
	<div class="logcompany">
            <div class="logcompant_left" 
                ref="wrapper" 
            >
                <div class="ul content">
                    <div class="li" v-for='(item,index) in logcompany_data' :key="index">
                        <div class="letter" ref="first_letter">{{item.first_letter}}</div>
                        <ul class="logcom_ul content">
                            <li :class="{active: index == liIndex}" @click='jump(itemm)' v-for='(itemm,index) in item.item_list' :key="index">{{itemm}}</li>
                        </ul>
                    </div>
                </div>    	
            </div>    
		<div class="logcomant_right">
			<div @click='paging(index)' class="letter_c" v-for='(item,index) in letter_data' :class="{active: index == rightIndex}" :key="index">{{item}}</div>
		</div>
	</div>
</template>
<script>
import {refundExpressList} from '../../http/api.js';
import BScroll from 'better-scroll';
export default{
	data(){
		return{
			logcompany_data:null, //物流公司的信息
			letter_data:null, //物流公司 字母分页
            liIndex: 0,
            rightIndex: 0,
            scrollY: -1, //y轴距离
            rightLiarr: [],
		}
    },
    watch: {
        'scrollY': {
            handler: function() {
                this.rightLiarr.map((item,index) => {
                    let difference = item - this.scrollY;
                    console.log(difference)
                    if(difference < 5){
                        this.rightIndex = index;
                        return
                    }
                })
                console.log(this.rightIndex)
            }
        }
    },
	methods:{
		/*物流公司的api*/
		api_refundExpressList(){
			refundExpressList({}).then((response)=>{
				let res = response.data;
				if(res.code==1000){
					this.logcompany_data=res.data.express_list;
					this.letter_data=res.data.first_letter_list;
                    console.log(res)
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
		/*跳转到退货退款页面*/
		jump(item){
			let refundd_id=this.$route.query.refund_id;
			this.$router.push({path:'/content',query:{item_name:item,show_null:1,refund_id:refundd_id}});
			
		},
		/*点击分页*/
		paging(index){	
			let Target = document.querySelectorAll('.letter');
			this.scroll.scrollToElement(Target[index],500,0,0,'easing');
        },
	},
	created(){
		this.api_refundExpressList()
	}
}	
</script>
<style lang='less'>
.displayflex{display: -webkit-flex;display: flex;}
.align_items_center{-webkit-align-items: center;align-items: center;}
.justify_content_center{-webkit-justify-content: center;justify-content: center;}
.justify_content{-webkit-justify-content: space-between;justify-content: space-between;}

.logcompany{
    width: 100vw;
    height: 100vh;
	border-top:1px solid #EEEEEE;
	overflow:hidden;
	.logcompant_left{
		width: 9.2rem;
        float: left;
        height: 100vh;
        overflow: hidden;
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
		}
	}
	.logcomant_right{
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
}	
</style>