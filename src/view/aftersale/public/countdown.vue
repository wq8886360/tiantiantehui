<template>
    <div>{{countshu}}</div>
</template>
<script>
export default {
  props:['timestamp'],
  data(){
    return{
      timer:null,
      countshu:null,
    }
  },
  wacth:{
    'timer':{
      handler:function(n,o){
        console.log(n)
      },
       deep: true
    }
  },
  methods:{
      formatSeconds(value) {  
        var theTime = parseInt(value);// 秒  
        var theTime1 = 0;// 分  
        var theTime2 = 0;// 小时  
        if(theTime > 60) {  
            theTime1 = parseInt(theTime/60);  
            theTime = parseInt(theTime%60);  
            if(theTime1 > 60) {  
                theTime2 = parseInt(theTime1/60);  
                theTime1 = parseInt(theTime1%60);  
            }  
        }  
        var result = ""+parseInt(theTime)+"秒";  
        if(theTime1 > 0) {  
            result = ""+parseInt(theTime1)+"分"+result;  
        }  
        if(theTime2 > 0) {  
            result = ""+parseInt(theTime2)+"小时"+result;  
        }  
        return result;  
    },
      
      
    time(){ 
        let that=this;
        that.countshu=that.formatSeconds(that.timer)
        if (that.timer == 0) {  
           that.$emit('timerd',that.timer);
        }else{  
            that.timer--;  
            // //定時器，每秒重新計算  
            setTimeout(function() { 
              that.time();
            },  
            1000)  
        }  
    },
  },
  created(){
    this.timer=this.timestamp;

    this.time();
  }
}
</script>