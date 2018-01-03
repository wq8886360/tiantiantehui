<template>
  <div>
    <div style="width:8rem;background:#E64340;text-align:center;margin:0.5rem auto 0;color:#fff;padding-top:0.1rem;padding-bottom:0.1rem;" @click='suoyou()'>我的所有订单</div>
     <div style="width:8rem;background:#E64340;text-align:center;margin:0.5rem auto 0;color:#fff;padding-top:0.1rem;padding-bottom:0.1rem;" @click='pingjia()'>全部评价</div>
     <div style="width:8rem;background:#E64340;text-align:center;margin:0.5rem auto 0;color:#fff;padding-top:0.1rem;padding-bottom:0.1rem;" @click="sale()">退款/售后</div>
    <h1>个人中心</h1><div><x-button class="sl-button" type="warn" @click.native="out">退出登录</x-button>
  </div></div>
</template>
<script>
import Cookie from "js-cookie"
import { XButton, Alert } from 'vux';
import { logout } from '../../http/api'
export default {
    components: {
		XButton,
    },
    methods: {
        out(){
            Cookie.remove("token");
            this.$router.push({path: "/"})
        },
        suoyou(){
            this.$router.push({path:'./myorder'})
        },
        pingjia(){
            this.$router.push({path:'./myrating'})
        },
        sale(){
            this.$router.push({path: '/salelist'})
        }
    }
}
</script>

