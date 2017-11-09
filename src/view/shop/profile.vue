<template>
	<div class="profile">
		<div class="profile_m">
			<div class="profile_left">
				<img class="proflie_logo" src="../../assets/img/proflie_logo.png" >
				<div class="profile_t">
					<span class="profile_mz">美特斯邦威</span>
					<span class="profile_d">店铺等级</span>
				</div>
			</div>
			<div class="profile_right">
				<div class="attention">
					<div class="attention_z">
						
						<span class="attention_zt">关注</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		methods:{
       
    	},
	}
</script>
<style>
/* --------头部---------- */
body{
	background: #F7F7F7;
}
.profile{
	width: 100%;
	height: 100%;
	border-top:1px solid #D8D8D8;
}
.profile .profile_m{
	padding:0.3333333rem 0.2666667rem 0.3333333rem 0.2666667rem;
	background: #FFF;
	overflow: hidden;
}
/*头部左边*/
.profile .profile_m .profile_left{
	overflow: hidden;
	float: left;
}
.profile .profile_m .proflie_logo{
	width: 1.0666667rem;
	height: 1.0666667rem;
	float: left;
}
.profile_m .profile_left .profile_t{
	float: left;
	margin-left: 0.2666667rem;
}
.profile_m .profile_left .profile_t .profile_mz{
	font-family: 'PingFang-SC-Regular';
	font-size: 0.3733333rem;
	color:#1C1B20;
	display: block;
}
.profile_m .profile_left .profile_t .profile_d{
	font-family: 'PingFang-SC-Regular';
	color: #858585;
	font-size: 0.2933333rem;
}
/*头部右边*/
.profile_m .profile_right{
	float: right;
}
.profile_m .profile_right .attention{
	min-width: 1.6rem;
	width: 100%;
	height:0.6266667rem;
	position: relative;
	top: -0.1066667rem;
	box-sizing: border-box;
}
.profile_right .attention .attention_z{
	min-width: 1.6rem;
	width: 100%;
	height:0.6266667rem;
	text-align: center;
	background: url(../../assets/img/attentionWhite.png);
	background-size: 100% 100%;
}
.attention .attention_z .attention_zt{
	font-size: 0.32rem;
	color:#FFFFFF;
	line-height: 0.6266667rem;
}
</style>