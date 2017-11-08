<template>
    <div class="loginState" v-if="loading">
        <div class="loading_d">
            <div class="box">
                <div class="loading">
                  <div class="left"></div>
                  <div class="right"></div>
                  <div class="progress">
                    <div class="small_c"></div>
                  </div>
                   <div class="bigbox"></div>
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
		loading: Boolean
	},
}
</script>
<style scoped>

.loginState{
    width: 100vw;
    height: 100vh;
    
}
.loading_d{
    width:76px;
    position: relative;
    height: 76px;
    border-radius: 10px;
    margin: 0 auto;
    background: #fff;
    opacity: 0.95;
    top:50%;
    margin-top:-38px;
}
.progress .small_c{
   width: 26px;
   height: 26px;
   background: url(../../assets/img/login_logo.png)no-repeat;
   background-size:  26px  26px;
   position: absolute;
   top: 50%;
   margin-top: -13px;
   left: 50%;
   margin-left: -13px;
 }
 .box{
   position: absolute;
   width: 60px; 
   height:60px; 
   left: 50%;
   margin-left: -30px;
   top:50%;
   margin-top: -30px;
  
 }
 .loading{
   top: 0px;
   left: 0px;
   width: 60px;
   height:60px;
   box-sizing: border-box;
   position: relative;
   border-radius:50%;
   left: 50%;
   margin-left: -30px;
   top: 50%;
   margin-top: -30px;

 }
 .box .bigbox{
   width: 60px;
   height: 60px;
   border-radius: 50%;
   border:4px solid #eeeeee;
   position: absolute;
   top: 0rem;
   left:0rem;
   box-sizing: border-box;
   z-index: -1;
 }
 
 .loading .progress{
   position: absolute; 
   width:52px; 
   height:52px; 
   background-color: white; 
   border-radius: 50%;
   left:50%; 
   top: 50%; 
   margin-left: -26px;
   margin-top: -26px;
   line-height: 52px; 
   
   box-sizing: border-box;
 }
 .left,.right{
   width: 30px;
   height:60px;
   position: relative; 
   float: left;
   overflow: hidden;
   box-sizing: border-box;
 }
 .left{ 
   border-radius: 37px 0 0 37px;

 }
 .right{ 
   border-radius: 0 37px 37px 0;
 }
 .left:after,.right:after{
   content:"";  
   position:absolute; 
   display:block; 
   width: 30px;
   height:60px;
   border-radius: 37px 0 0 37px;
   background-color: red;
 }
 .right:after{
   content:"";  
   position:absolute; 
   display:block;   
    border-radius: 0 8rem 8rem 0;
 }
 @-webkit-keyframes rotateB{
   25%,50%{
     transform:rotateZ(180deg);
   }
   75%,100%{
     transform:rotateZ(360deg);
   }
 }
 @-webkit-keyframes rotateA{
   0%,25%{
     transform:rotateZ(0deg);
   }
   50%,75%{
     transform:rotateZ(180deg);
   }
   100%{
     transform:rotateZ(360deg);
   }
 }
 .left:after{
   -webkit-animation:rotateA 2s infinite linear; 
   transform-origin:right center;  
 }
 .right:after{
   -webkit-animation:rotateB 2s infinite linear; 
   transform-origin:left center;
 }
</style>


