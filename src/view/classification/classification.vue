<template>
    <div class="classification" v-if="list_data">
        <search
            :results="results"
            v-model="search_value"
            position="fixed"
            auto-scroll-to-top
            ref="search">
        </search>
        <div class="main">
            <div class="left" ref="leftScroll">
                <ul>
                    <li v-for="(item,index) in list_data.categoryList" :key="index" @click="chooseLeft(index)" :class="{active: index == currentIndex}"><i class="border_left"></i>{{item.name}}</li>
                </ul>
            </div>
            <div class="right" ref="rightScroll">
                <div class="ul">
                    <div class="li" v-for="(item,index) in list_data.categoryList" :key="index">
                        <div class="item__box" v-for="(secondary,secondary_index) in item.children" :key="secondary_index">
                            <div class="title">
                                <i></i>
                                <p>{{secondary.name}}</p>
                                <i></i>
                            </div>
                            <!--  -->
                            <div class="rank" v-if="secondary.on_ranking == 1" @click="rank(item.name,secondary.name)">排行榜 <i class="icon-right"></i></div>
                            <div class="mianlist">
                                <div class="type_list" v-for="(threeclass,threeclass_index) in secondary.children" :key="threeclass_index">
                                    <img :src="threeclass.thumb"  alt="">
                                    <p>{{threeclass.name}}</p>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import { Search } from 'vux'
import { operatecategory } from '../../http/api'
export default {
    components: {
        Search
    },
    data(){
        return{
            search_value: '',//搜索关键字
            results: [{}], //搜索结果列表（不展示） 处理没数据显示undefined bug
            list_data: null, //列表数据
            left_index: 0, //左侧当前选中
            listHeight: [],
            scrollY: 0,
        }
    },
    computed: {
        currentIndex() {
            for(let i=0;i< this.listHeight.length;i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                if(height2 && (this.scrollY >= height1 && this.scrollY < height2)){
                    this.left.scrollToElement(document.querySelectorAll('.left ul li')[i],500,true,true,'easing');
                    return i;
                }
            }
            return 0;
        }
    },
    methods: {
        //获取所有分类
        api_operatecategory(){
            operatecategory().then((response) => {
                if(response.data.code == 1000){
                    this.list_data = response.data.data;
                    this.$nextTick(() => {
                        this.init_dom();
                    })
                }
            })
        },
        //选中左侧
        chooseLeft(index){
            this.left.scrollToElement(document.querySelectorAll('.left ul li')[index],500,true,true,'easing');
            this.right.scrollToElement(document.querySelectorAll('.right .ul .li')[index],500,false,false,'easing');
        },
        calculateHeight() {
            let foodList = document.querySelectorAll(".right .li");
            let height = 0;
            this.listHeight.push(height);
            for(let i=0;i<foodList.length;i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        init_dom(){
            let height = document.querySelector(".classification .weui-search-bar").offsetHeight;
            document.querySelector(".main").style.top = height + 'px';
            //初始化左侧列表
            this.left = new BScroll(this.$refs.leftScroll, {
                scrollX: false,
                scrolly: true,
                click: true
            })

            //初始化右侧列表
            this.right = new BScroll(this.$refs.rightScroll, {
                scrollX: false,
                scrolly: true,
                click: true,
                probeType : 3
            })
            this.calculateHeight(); //计算高度集合
            this.right.on('scroll', (pos) => {
                this.scrollY = -pos.y;
            })
        },
        rank(level1,level2){
            this.$router.push({path: '/ranking',query:{ level1: level1,level2: level2}})
        }
    },
    created(){
        this.api_operatecategory();
    }
}
</script>
<style lang='less'>
@import "../../assets/css/component/classification.less";
</style>

