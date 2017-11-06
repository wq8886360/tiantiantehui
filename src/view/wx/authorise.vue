<template>
    <div>

    </div>
</template>
<script>
import { getOauthUrl, wechat, callback_uri } from '../../http/api.js'
import Cookie from "js-cookie"
export default {
    created(){
        function GetRequest() { 
            var url = location.search; //获取url中"?"符后的字串 
            var theRequest = new Object(); 
            if (url.indexOf("?") != -1) { 
                var str = url.substr(1); 
                var strs = str.split("&"); 
                for(var i = 0; i < strs.length; i ++) { 
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
                } 
            } 
            return theRequest;
        }
        var Request = GetRequest();
        if(Request['code']){
            console.log(Request['code'])
            wechat({code: Request['code']}).then((response) => {
                console.log(response)
                let res = response;
                if(res.data.code == 1000){
                    let state = res.data.data.status;
                    if(state == 0){
                        this.$router.push({path: '/user/newbind1',query: {unique_sign: res.data.data.unique_sign}})
                    }else if(state == 1){
                        this.$router.push({path: Cookie.get('to')})
                    }else if(state == 2){
                        this.$router.push({path: '/user/bind1',query: {unique_sign: res.data.data.unique_sign}})
                    }else if(state == 3){
                        this.$router.push({path: '/user/newbind1',query: {unique_sign: res.data.data.unique_sign}})
                    }
                }else{
                    getOauthUrl({callback_url: callback_uri}).then((response) => {
                        console.log(response)
                        window.location.href = response.data.data.url;
                    })
                }
            })
        }else{
            getOauthUrl({callback_url: callback_uri}).then((response) => {
                console.log(response)
                window.location.href = response.data.data.url;
            })
        }
    }
}
</script>
<style>

</style>

