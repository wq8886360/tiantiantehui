<template>
    <div class="regist">
        <i class="icon-back" @click="back"></i>
        <div class="logo">
            <img src="../../assets/img/login_logo.png" alt="">
        </div>
        <div class="form">
            <div class="referrer" style="margin-top:0">
                <input class="sl-input" v-model="referId" v-validate="'required'" name="推荐人ID" type="text" placeholder="请输入推荐人ID">
                <i class="sl-error" v-show="errors.has('推荐人ID')">{{errors.first('推荐人ID')}}</i>
                <i class="sl-error" v-if="referIdState">无效的邀请码</i>
                <x-button mini class="btn" @click.native="referrerShow = true">随机选择推荐人</x-button>
            </div>
            <div class="tel">
                <input class="sl-input"  v-model="tel" v-validate="'required|tel'" name="手机号" type="tel" placeholder="请输入手机号">
                <i class="sl-error" v-show="errors.has('手机号')">{{errors.first('手机号')}}</i>
                <i class="sl-error" v-if="telState">账号已被注册</i>
            </div>
            <div class="code">
                <input :disabled="disabledOne&&disabledTwo?false:true" class="sl-input" v-model="code" type="tel" placeholder="请输入验证码">
                <img :src="'http://v20-front-api.shunliandongli.com/member/Common/vcode?time='+time" @click="timer" alt="">
                <i class="sl-error" v-if="codeerror">验证码错误</i>
            </div>
        </div>
        <!-- 推荐人列表 -->
        <div class="referrerList" v-if="referrerShow">
            <i class="icon-back" @click="referrerShow = false"></i>
            <span class="change" @click="replace">换一批</span>
            <h1 class="title" style="text-align: left;">选择推荐人</h1>
            <div class="mainlist">
                <div class="box" @click="detail(index)" v-for='(item,index) in referList.list'>
                    <img v-if="index == choiceIndexSure" class="choice" src="../../assets/img/choice.png" alt="">
                    <div class="img"><img :src="item.avatar" alt=""></div>
                    <p class="name">{{item.nickname}}</p>
                    <div class="label">
                        <img v-if="item.level == 'V0'" class="v" src="../../assets/img/V0.png" alt="">
                        <img v-if="item.level == 'V1'" class="v" src="../../assets/img/V1.png" alt="">
                        <img v-if="item.level == 'V2'" class="v" src="../../assets/img/V2.png" alt="">
                        <img v-if="item.level == 'V3'" class="v" src="../../assets/img/V3.png" alt="">
                        <img v-if="item.level == 'V4'" class="v" src="../../assets/img/V4.png" alt="">
                        <img v-if="item.level == 'V5'" class="v" src="../../assets/img/V5.png" alt="">
                        <img v-if="item.level == 'V6'" class="v" src="../../assets/img/V6.png" alt="">
                        <div class="identity">
                            <img v-if="item.member_role == 2" src="../../assets/img/jingyingdaoshi.png" alt="">
                            <img v-if="item.member_role == 1" src="../../assets/img/changkejingying.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="choose">
                <x-button class="sl-button" @click.native="results" type="warn">确定</x-button>
            </div>
        </div>

        <!-- 推荐人详情 -->
        <div class="detail" v-if="detailShow">
            <div class="content">
                <div class="top">
                    <img class="avtor" :src="referList['list'][choiceIndex]['avatar']" alt="">
                </div>
                <p class="username">{{referList['list'][choiceIndex]['nickname']}}</p>
                <div style="margin:0.4rem 0;">
                    <img style="height:0.37rem;width: 0.51rem" class="v" :src="require('../../assets/img/'+referList['list'][choiceIndex]['level']+'.png')" alt="">
                    <!-- <img style="height:0.37rem;width: 0.51rem" v-if="referList['list'][choiceIndex]['level'] == 'V1'" class="v" src="../../assets/img/V1.png" alt="">
                    <img style="height:0.37rem;width: 0.51rem" v-if="referList['list'][choiceIndex]['level'] == 'V2'" class="v" src="../../assets/img/V2.png" alt="">
                    <img style="height:0.37rem;width: 0.51rem" v-if="referList['list'][choiceIndex]['level'] == 'V3'" class="v" src="../../assets/img/V3.png" alt="">
                    <img style="height:0.37rem;width: 0.51rem" v-if="referList['list'][choiceIndex]['level'] == 'V4'" class="v" src="../../assets/img/V4.png" alt="">
                    <img style="height:0.37rem;width: 0.51rem" v-if="referList['list'][choiceIndex]['level'] == 'V5'" class="v" src="../../assets/img/V5.png" alt="">
                    <img style="height:0.37rem;width: 0.51rem" v-if="referList['list'][choiceIndex]['level'] == 'V6'" class="v" src="../../assets/img/V6.png" alt=""> -->

                    <img style="height:0.37rem;width: 1.2rem"  v-if="referList['list'][choiceIndex]['member_role'] == 2" src="../../assets/img/jingyingdaoshi.png" alt="">
                    <img style="height:0.37rem;width: 1.2rem"  v-if="referList['list'][choiceIndex]['member_role'] == 1" src="../../assets/img/changkejingying.png" alt="">

                </div>
                <div style="border-top:1px dashed #e4e4e4;width:100%;"></div>

                <div class="info">
                    <p><i>注册时间：</i>{{referList['list'][choiceIndex]['regtime']}}</p>
                    <p><i>热度：</i>{{referList['list'][choiceIndex]['heat']}}</p>
                </div>
                <div class="btnch">
                    <x-button class="sl-button" type="warn" @click.native="choose">选择</x-button>
                    <x-button type="default"  @click.native="noChoose">不选择</x-button>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import { XButton } from 'vux'
import { checkMobile, checkCode, codeList, CommoncheckCode, sendSmsCode, getOauthUrl } from '../../http/api'
export default{
	components: {
        XButton,
	},
	data(){
		return {
			time: 1,
			referId: null,
			tel: null,
            code: null,
            referList: null,
			referrerShow: false,
            detailShow: false,
            referIdState: false,
            codeerror: false,
            telState: false,
            page: 1,
            disabledOne: false,
            disabledTwo: false,
            nickname: '',

            choiceIndex: null,
            choiceIndexSure: null,
		}
	},
	methods:{
		back(){
			this.$router.go(-1);
        },
		timer(){
			this.time = Math.random();
		},
		detail(index){
            this.choiceIndex = index;
			this.detailShow = true;
        },
        // 确认选择
        choose(){
            this.detailShow = false
            this.choiceIndexSure = this.choiceIndex
        },
        // 最后选择结果
        results(){
            this.referrerShow = false;
            if(this.choiceIndexSure >= 0){
                this.referId = this.referList.list[this.choiceIndexSure].code;
                this.nickname = this.referList.list[this.choiceIndexSure].nickname;
            }
        },
        noChoose(){
            this.detailShow = false;
            this.choiceIndexSure = null;
        },
        replace(){
            this.choiceIndexSure = null;
            this.page++;
            this.api_refer(9,this.page);
        }, 
        api_refer(size,page){
            codeList({pageSize: size,page:page}).then((response) => {
                let res = response;
                if(res.data.data.list.length != 0){
                    this.referList = res.data.data;
                }else{
                    this.page = 1;
                    this.api_refer(9,this.page)
                }
            })
        }
    },
    created(){
        this.api_refer(9,1)
        /*getOauthUrl({callback_url:'http://v20-vue.shunliandongli.com/#/user/login'}).then((response) => {
            console.log(response)
            window.location.href = response.data.data.url;
        })*/
    },  
	watch:{
		'code': {
			handler: function() {
				if(this.code.length == 4){
                    CommoncheckCode({vcode: this.code}).then((response) => {
                        let res = response;
                        if(res.data.code == 1000){
                            this.codeerror =false;
                            let data = {
                                referId: this.referId,
                                tel: this.tel,
                                code: this.code
                            }
                            this.$router.push({path: '/user/set', query:{data: JSON.stringify(data)}})
                        }else{
                            this.timer();
                            this.code = '';
                            this.codeerror = true;
                        }
                    })
				}
			}
        },
        'referId': {
            handler: function() {
                if(this.referId){
                    checkCode({code: this.referId}).then((response) => {
                        let res = response;
                        if(res.data.code == 2011){
                            this.referIdState = true; 
                            this.disabledOne = false; 
                        }else{
                            this.referIdState = false;
                            this.disabledOne = true
                        }
                    })
                }else{
                    this.referIdState = false;
                    this.disabledOne = false;
                }
            }
        },
        'tel': {
            handler: function() {
                if(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)){
                    checkMobile({mobile: this.tel}).then((response) => {
                        let res = response;
                        if(res.data.code == 2001){
                            this.telState = true;
                            this.disabledTwo = false;
                        }else{
                            this.telState = false;
                            this.disabledTwo = true;
                        }
                    })
                }else{
                    this.telState = false;
                    this.disabledTwo = false;
                }
            }
        }
	}
}
</script>
<style lang="less">
.icon-back{
	font-size: 0.45rem;
	position: absolute;
	left: 0.5rem;
	top: 0.5rem;
	font-weight: 700;
}
.regist{
    .weui-btn:after{
        border: none!important;
    }
	position: relative;
	.logo{
		height: 4.27rem;
		padding: 0.4rem;
		box-sizing: border-box;
		text-align: center;
		img{
			width: 2.13rem;
			height: 2.13rem;
            margin-top: 0.67rem;
		}
	}
	.detail{
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.5);
		display: flex;
		justify-content: center;
		align-items: center;
		.content{
			width: 80%;
			background: #fff;
			border-radius: 0.13rem;
			box-sizing: border-box;
			padding: 0.4rem 0.27rem 0.4rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			.info{
				padding: 0.53rem 0;
				font-size: 0.32rem;
				color: #858585;
				i{
					width: 2.13rem;
					color: #000;
					font-style: normal;
					text-align: right;
					display: inline-block;
				}
			}
			.btnch{
				width: 100%;
			}
			.top{
				width: 2.67rem;
				height: 2.67rem;
				border-radius: 50%;
				overflow: hidden;
				.avtor{
					width: 2.67rem;
					height: 2.67rem; 
				}
			}
			.username{
				font-size: 0.35rem;
				margin-top: 0.2rem;
			}
		}
	}
	.referrerList{
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;
		box-sizing: border-box;
        padding: 0 0.67rem;
        .mainlist::-webkit-scrollbar {display:none}
		.mainlist{
			display: flex;
			flex-wrap: wrap;
            margin-top: 0.93rem;
            height: 65%;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
			justify-content: space-between;
			.box{
				width: 33.3%;
				display: flex;
				align-items: center;
				flex-direction: column;
				position: relative;
				margin-bottom: 0.8rem;
				.choice{
					width: 0.53rem;
					height: 0.53rem;
					position: absolute;
					top: 0;
					right: 0.27rem;
				}
				.label{
					width: 2.13rem;
					display: flex;
					margin-top: 0.13rem;
					.v{
						width: 0.51rem;
						height: 0.37rem;
						margin-right: 0.27rem;
					}
					.identity{
						position: relative;
						text-align: center;
						img{
							width: 1.2rem;
							height: 0.37rem;
						}
						p{
							text-align: center;
							margin-left: 0.06rem;
							height: 0.37rem;
							line-height: 0.37rem;
							position: absolute;
							left: 0;
							top: 0;
							font-size: 12px;
							color: #fff;
						}
					}
				}
				.img{
					width: 2.13rem;
					height: 2.13rem;
					border-radius: 50%;
					overflow: hidden;
					img{
						width: 2.13rem;
						height: 2.13rem;
					}
				}
				.name{
					font-size: 0.35rem;
					width: 100%;
					margin-top: 0.13rem;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
                    width: 2.13rem;
                    text-align: center;
				}
			}
		}
		.change{
			font-size: 0.4rem;
			position: absolute;
			right: 0.5rem;
			top: 0.5rem;
		}
		.title{
			font-size: 0.8rem;
			padding-top: 1.3rem;
		}
		.choose{
            margin-top: 0.67rem;
            margin-bottom: 0.67rem;
		}
	}
	.form{
		padding: 0 0.67rem;
		> div{
			border-bottom: 1px solid #d8d8d8;
			margin-top: 0.67rem;
		}
		.referrer{
			position: relative;
			.btn{
				position: absolute;
				right: 0rem;
				top: 0.1rem;
				border: none!important;
            }
            .weui-btn_mini{
                padding: 0 0.2rem;
            }
		}
		.code{
			position: relative;
			height: 1.07rem;
			img{
				position: absolute;
				right: 0;
				top: 0;
				height: 1rem;
			}
		}
	}
}
</style>