<template>
    <div class="salelist">
        <scroller  v-if='salelist_length!=0' lock-x scrollbar-y use-pullup use-pulldown height="-10" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
           <ul class="sale_ul">
               <li v-for='(item,index) in salelist_data'>
                    <div class="flagship">
                        <img src="../../assets/img/storeIconAct.png" alt="">
                         <span class="title">{{item.store_name}}</span>
                        <i class="icon-right right_c"></i>
                    </div>
                    <div class="line"></div>
                    <div class="sale_con">
                        <div class="sale_left">
                            <img :src="item.thumb" alt="">
                            <div class="app_right">
                                <div class="text">{{item.title}}</div>
                                <div class="model_n">{{item.sku_desc}}</div>
                                <div class="coin">
                                    <span>退款金额</span>
                                    <span>￥{{item.refund_amount}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="sale_right">
                            <div class="coni_b">￥{{item.price}}</div>
                            <span class="num_n">x{{item.qty}}</span>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="refund">
                        <img :src="item.type_icon" alt="">
                        <span>{{item.status_msg}}</span>
                    </div>
                    <div class="view">
                        <div class="view_z" @click='jump(item.refund_id)'>查看详情</div>
                    </div>
               </li>
           </ul>
           <div v-if='missing' class="missing">您已经没有更多的订单了</div>
        </scroller>   
        <!--没有订单显示的图片-->
        <div v-if='salelist_length==0' class="order">
            <img src="../../assets/img/img_empty_dingdan@2x.png" alt="">
            <div class="none">暂无订单信息</div>
        </div>
    </div>
</template>
<script>
import { refundapplyList } from '../../http/api'
import {Scroller} from 'vux'
export default {
    components: {
        Scroller
     },
    data(){
        return {
            salelist_data:null,
            page:1,
            page_size:10,
            missing:false,//没有数据的提示
            salelist_length:null,
            status: { //上拉刷新下拉加载的状态
                pullupStatus: 'default',
                pulldownStatus: 'default'
            },
        }
    },
    methods: {
        api_refundapplyList(){
            refundapplyList({page:this.page,page_size:this.page_size}).then((response)=>{
                let res = response.data;
                if(res.code==1000){
                   this.salelist_data=res.data.refund_list;
                   this.salelist_length=res.data.refund_list.length;
                }
            })
        },
        /*上拉加载*/
        loadMore () {
            setTimeout(() => {
              this.page++;
              setTimeout(() => {
                this.$refs.scroller.donePullup();
                if(this.page<=this.total_page){
                    refundapplyList({page: this.page,page_size: this.page_size}).then((response) => {
                        let res=response.data;
                        if(res.code==1000){
                            this.salelist_data.push(res.data.refund_list[0])
                            console.log(this.salelist_data)
                        }
                    })  
                }else{
                    this.missing=true;
                }
              },10)
            },1000)
        },
        /*下拉刷新*/
        refresh () {
            setTimeout(() => {
              this.$nextTick(() => {
                setTimeout(() => {
                  this.$refs.scroller.donePulldown()
                  this.pullupEnabled && this.$refs.scroller.enablePullup();
                  this.api_refundapplyList();
                  this.missing=false;
                },10)
              })
            }, 2000)
        },
        jump(item_id){
            this.$router.push({path:'/Refund',query:{refund_id:item_id}})
        }
    },
    created(){
        this.api_refundapplyList();
    }
}
</script>
<style lang='less'>
.salelist{
    width: 100vw;
    background: #f7f7f7;
    padding-bottom: 1.07rem;
    .sale_ul{
        width: 100%;
        background: #f7f7f7;
        padding-top: 0.27rem;
        li{
            width: 100vw;
            background: #fff;
            margin-bottom: 0.27rem;
            .flagship{
                margin-left: 0.27rem;
                padding-top: 0.35rem;
                padding-bottom: 0.35rem;
                img{
                    width: 0.36rem;
                    height: 0.33rem;
                    vertical-align: middle;
                }
                .title{
                    font-family: PingFang-SC-Regular;
                    margin-left: 0.13rem;
                    width: auto;
                    max-width: 3.8rem;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    display:inline-block;
                    color:#1C1B20;
                    font-size: 0.37rem;
                    vertical-align: middle;
                }
                .right_c{
                    font-size: 13px;
                    color:#1C1B20;
                    vertical-align: middle;
                    position: relative;
                    top: 0.05rem;
                }
            }
            .line{
                width: 100vw;
                height: 1px;
                background: #EEEEEE;
            }
            .sale_con{
                padding: 0.2rem 0.27rem 0.2rem 0.27rem;
                overflow: hidden;
               .sale_left{
                    width:7.37rem;
                    float: left;
                    img{
                        width: 2.13rem;
                        height: 2.13rem;
                        vertical-align: middle;
                    }
                    .app_right{
                        width: 4.91rem;
                        float: right;
                        .text{
                            width: 4.91rem;
                            font-size: 0.35rem;
                            font-family: PingFang-SC-Regular;
                            color:#1C1B20;
                            display: -webkit-box;
                            -webkit-box-orient:vertical;
                            -webkit-line-clamp:2;
                            overflow:hidden;
                        }
                        .model_n{
                            width: 4.91rem;
                            color:#858585;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                            display:block;
                            font-size: 0.32rem;
                            font-family: PingFang-SC-Regular;
                            margin-top: 0.1rem;
                        }
                        .coin{
                            margin-top: 0.27rem;
                            span{
                                font-family: PingFang-SC-Regular;
                                color:#858585;
                                font-size: 0.32rem;
                            }
                        }
                    }
               }
               .sale_right{
                    float: right;
                    .coni_b{
                        font-family: PingFang-SC-Regular;
                        color:#1C1B20;
                        font-size: 0.37rem;
                        text-align: right;
                    }
                    .num_n{
                       font-family: PingFang-SC-Regular;
                       color:#858585;
                       font-size: 0.32rem;
                       display: block;;
                       text-align: right;
                       margin-top: 0.08rem;
                    }
                }
            }
            .refund{
                padding: 0.27rem;
                border-bottom:1px solid #EEEEEE;
                img{
                    width: 0.45rem;
                    height: 0.45rem;
                    vertical-align: middle;
                }
                span{
                    vertical-align: middle;
                    font-family: PingFang-SC-Regular;
                    color:#1C1B20;
                    font-size: 0.37rem;
                    margin-left: 0.2rem;
                }
            }
            .view{
                width: 100vw;
                overflow: hidden;
               .view_z{
                    width: 1.87rem;
                    height: 0.72rem;
                    text-align:center;
                    line-height: 0.72rem;
                    border-radius: 15px;
                    border:1px solid #FB0036;
                    color:#FB0036;
                    font-size: 0.37rem;
                    float: right;
                    margin-right: 0.27rem;
                    margin-top: 0.27rem;
                    margin-bottom: 0.27rem;
               }
            }

        }
    }
    .missing{
        font-family: PingFang-SC-Regular;
        font-size: 0.32rem;
        color:#858585;
        text-align: center;
        padding: 0.17rem 0 0.37rem 0px;
    }
    .order{
        width: 100vw;
        height: 86vh;
        background: #fff;
        img{
            width: 4.03rem;
            height: 3.11rem;
            display: block;
            margin:0 auto;
            padding-top: 3rem;
        }
        .none{
            text-align: center;
            font-size: 0.24rem;
            margin-top: 0.5rem;
            color:#858585;
        }
    }
    .xs-plugin-pullup-container{
        display: none !important;
    }

}
</style>


