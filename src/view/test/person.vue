<template>
  <div><h1>个人中心</h1><div><x-button class="sl-button" type="warn" @click.native="out">退出登录</x-button></div></div>
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
        }
    }
}
</script>

