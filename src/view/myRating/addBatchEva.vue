<template>  
    <div class="rate">
        <div class='rateCenter' v-for='(item,index) in goodsInfo'> 
            <div class='rateCon'>
                <div class='rateGoodLeft'>
                    <img :src="item.thumb" alt="">
                </div>
                <div  class='rateGoodRight'>
                    <p>{{item.title}}</p>
                    <p class='price'>￥{{item.price}}</p>
                </div>
            </div>
            <div  class='textArea'>
                <textarea placeholder="您的评价，能帮助到更多的用户哦" v-model='item.content'></textarea>
            </div>
            <div class="show" v-if='item.evaImgArr!=null'>  
                <div class='imgBox'  v-for='(items,idx) in item.evaImgArr'><img class='imgMain' :src="items" alt=""><img class='trash' src="../../assets/img/trash.png"  alt=""  @click='deleted(idx,item,index)'></div>
     
                <div class='addImg' v-if='item.isShow'>
                    <img src="../../assets/img/add.png" alt="">
                    <input type="file" :id="'upload'+index" accept="image"  @change="upload($event,index,item)" > <!-- accept="image/*" -->
                </div>
            </div>
        </div>
         <p @click='comment'  class='release'>发布</p>
    </div>
</template> 
<script>  
import Exif from 'exif-js'  
import {commentAppend,Img,batchAppend} from '../../http/api.js'
import  { ToastPlugin } from 'vux'
export default {  
    data () {  
        return {  
            picValue:'',
            goodsInfo:'',//商品信息
            doMain:'',  
        }  
    },  
    mounted () {  
    },  
    created(){
        this.goodsInfo=JSON.parse(this.$route.query.evaluate_data).order_goods;
        for(var i=0;i<this.goodsInfo.length;i++){
            this.goodsInfo[i].content=''
            this.goodsInfo[i].evaImgArr=[];
            this.goodsInfo[i].evaImgArrShow=[];
            this.goodsInfo[i].isShow=true;
        }
        console.log( this.goodsInfo)
        
    },
    methods: {  
        upload (e,index,item) {  
            let files = e.target.files || e.dataTransfer.files;  
            if (!files.length) return;  
            this.picValue = files[0];  
            this.imgPreview(this.picValue,index,item);  
        },  
        imgPreview (file,index,item) {  
            let self = this;  
            let Orientation;  
            //去获取拍照时的信息，解决拍出来的照片旋转问题  
            Exif.getData(file, function(){  
                Orientation = Exif.getTag(this, 'Orientation');  
            });  
            // 看支持不支持FileReader  
            if (!file || !window.FileReader) return;  
            if (/^image/.test(file.type)) {  
                // 创建一个reader  
                let reader = new FileReader();  
                // 将图片2将转成 base64 格式  
                reader.readAsDataURL(file);  
                // 读取成功后的回调  
                reader.onloadend = function () {  
                    let result = this.result;  
                    let img = new Image();  
                    img.src = result;  
                    var srcUrl='http://v20-test.shunliandongli.com/uploads/uploadotherimage'
                    //判断图片是否大于100K,是就直接上传，反之压缩图片  
                    if (this.result.length <= (1000000)) {  
                       /* self.headerImage = this.result;  */
                        var blob = self.dataURItoBlob(this.result);
        		        var fd = new FormData();
        			    fd.append("file", blob, 'image.png');
        			    fd.fileName =  blob
                        self.$axios.post(srcUrl,fd).then((res) => {
                           if (res.data.success) {
                            console.log(item)
                                self.doMain=res.data.data.domain
                                var src=self.doMain+res.data.data.relativePath[0]
                                item.evaImgArr.push(src)
                                item.evaImgArrShow.push(res.data.data.relativePath[0])
                                if(item.evaImgArr.length>=5){
                                    item.isShow=false
                                }else{
                                    item.isShow=true
                                }
                                self.$set(self.goodsInfo,index,item)
                                console.log(self.goodsInfo)
                            }
		  	            })
                        
                    }else {  
                        img.onload = function () {  
                            let data = self.compress(img,Orientation);  
                            /*self.headerImage = data;  */
                            var blob = self.dataURItoBlob(data);
                            var fd = new FormData();
                            fd.append("file", blob, 'image.png');
                            fd.fileName =  blob;
                            self.$axios.post(srcUrl,fd).then((res) => {
                               if (res.data.success) {
                                    self.doMain=res.data.data.domain
                                    var src=self.doMain+res.data.data.relativePath[0]
                                    item.evaImgArr.push(src)
                                    item.evaImgArrShow.push(res.data.data.relativePath[0])
                                    if(item.evaImgArr.length>=5){
                                        item.isShow=false
                                    }else{
                                        item.isShow=true
                                    }
                                    self.$set(self.goodsInfo,index,item)
                                    console.log(self.goodsInfo)
                                }
                            })
                        }   
                    }  
                }   
            }  
        },   
        dataURItoBlob(base64Data) {
		    var byteString;
		    if (base64Data.split(',')[0].indexOf('base64') >= 0){
		        byteString = atob(base64Data.split(',')[1]);
		    }
		    else{
		        byteString = unescape(base64Data.split(',')[1]);
		    }
		    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
		    var ia = new Uint8Array(byteString.length);
		    for (var i = 0; i < byteString.length; i++) {
		        ia[i] = byteString.charCodeAt(i);
		    }
		    return new Blob([ia], {type:mimeString});
		},
        rotateImg (img, direction,canvas) {  
            //最小与最大旋转方向，图片旋转4次后回到原方向      
            const min_step = 0;      
            const max_step = 3;        
            if (img == null)return;      
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错      
            let height = img.height;      
            let width = img.width;        
            let step = 2;      
            if (step == null) {      
                step = min_step;      
            }      
            if (direction == 'right') {      
                step++;      
                //旋转到原位置，即超过最大值      
                step > max_step && (step = min_step);      
            } else {      
                step--;      
                step < min_step && (step = max_step);      
            }       
            //旋转角度以弧度值为参数      
            let degree = step * 90 * Math.PI / 180;      
            let ctx = canvas.getContext('2d');      
            switch (step) {      
              case 0:      
                  canvas.width = width;      
                  canvas.height = height;      
                  ctx.drawImage(img, 0, 0);      
                  break;      
              case 1:      
                  canvas.width = height;      
                  canvas.height = width;      
                  ctx.rotate(degree);      
                  ctx.drawImage(img, 0, -height);      
                  break;      
              case 2:      
                  canvas.width = width;      
                  canvas.height = height;      
                  ctx.rotate(degree);      
                  ctx.drawImage(img, -width, -height);      
                  break;      
              case 3:      
                  canvas.width = height;      
                  canvas.height = width;      
                  ctx.rotate(degree);      
                  ctx.drawImage(img, -width, 0);      
                  break;  
            }      
        },  
        compress(img,Orientation) {  
            let canvas = document.createElement("canvas");  
            let ctx = canvas.getContext('2d');  
            //瓦片canvas  
            let tCanvas = document.createElement("canvas");  
            let tctx = tCanvas.getContext("2d");  
            let initSize = img.src.length;  
            let width = img.width;  
            let height = img.height;  
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
            let ratio;  
            if ((ratio = width * height / 4000000) > 1) {  
                console.log("大于400万像素")  
                ratio = Math.sqrt(ratio);  
                width /= ratio;  
                height /= ratio;  
            } else {  
                ratio = 1;  
            }  
            canvas.width = width;  
            canvas.height = height;  
            //铺底色  
            ctx.fillStyle = "#fff";  
            ctx.fillRect(0, 0, canvas.width, canvas.height);  
            //如果图片像素大于100万则使用瓦片绘制  
            let count;  
            if ((count = width * height / 1000000) > 1) {  
                console.log("超过100W像素");  
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
                //计算每块瓦片的宽和高  
                let nw = ~~(width / count);  
                let nh = ~~(height / count);  
                tCanvas.width = nw;  
                tCanvas.height = nh;  
                for (let i = 0; i < count; i++) {  
                    for (let j = 0; j < count; j++) {  
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
                    }  
                }  
            } else {  
                ctx.drawImage(img, 0, 0, width, height);  
            }  
            //修复ios上传图片的时候 被旋转的问题  
            if(Orientation != "" && Orientation != 1){  
                switch(Orientation){  
                    case 6://需要顺时针（向左）90度旋转  
                        this.rotateImg(img,'left',canvas);  
                        break;  
                    case 8://需要逆时针（向右）90度旋转  
                        this.rotateImg(img,'right',canvas);  
                        break;  
                    case 3://需要180度旋转  
                        this.rotateImg(img,'right',canvas);//转两次  
                        this.rotateImg(img,'right',canvas);  
                        break;  
                }  
            }  
            //进行最小压缩  
            let ndata = canvas.toDataURL('image/jpeg', 0.1);   
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
            return ndata;  
        }, 
        comment(){
            console.log(this.goodsInfo,'goodsInfo')
            var goods=[]
            var flag=true
            for(var i=0;i<this.goodsInfo.length;i++){
                if(this.goodsInfo[i].content==''){
                    this.$vux.toast.text('请输入追评内容', 'middle')
                    flag=false
                }else{
                    var PriceBox = {
                        comment_id:this.goodsInfo[i].comment_id,
                        ordersn:this.goodsInfo[i].order_sn,
                        content:this.goodsInfo[i].content,
                        images:this.goodsInfo[i].evaImgArrShow.join(','),
                    }
                    flag=true
                    goods.push(PriceBox)
                }
            }
            if(flag){
                batchAppend({goods:JSON.stringify(goods)}).then((response)=>{
                    if(response.data.success){
                        this.$vux.toast.text('追评成功', 'middle') 
                        this.$router.push({path: '/evaSuccess'})
                    }
                })
            }
            


        },
        deleted(index,item ,idx){
            var header=item.evaImgArr.splice(index,1)
            var image=item.evaImgArrShow.splice(index,1)
            this.$set(this.goodsInfo,idx,item)
            if(item.evaImgArr.length>=5){
                item.isShow=false
            }else{
                item.isShow=true
            }
        }, 
    }  
}  
</script>  
<style lang='less'>
.rate{
    box-sizing: border-box;
    padding:0 0.266667rem;
    .rateCenter{
        margin-bottom:1.5rem;
    }
    .release{
        position:fixed;
        bottom:0;
        left:0;
        width:100%;
        height:1.333333rem;
        line-height: 1.333333rem;
        background:#fb0036;
        color:white;
        text-align: center;
        font-size:0.453333rem;
        z-index:100000;
    }
    .rateCon{
        display:flex;
        padding-bottom:0.36rem;
        border-bottom:1px solid #EEEEEE;
        padding-top:0.333333rem;
        .rateGoodLeft{
            float:left;
            width:1.6rem;
            height:1.6rem;
            img{
                width:100%;
                height:100%;
            }
        }
        .rateGoodRight{
            flex:1;
            float:left;
            padding-left:0.466667rem;
            position:relative;
            p{
                font-size:0.346667rem;
                line-height: 0.453333rem;
                margin-top:0.053333rem;
            }
            .price{
                position:absolute;
                bottom:0.08rem;
                left:0.533333rem;
            }
        }    
    }
    .textArea{
        width:100%;
        padding-bottom:0.4rem;
        border-bottom:1px solid #EEEEEE;
        margin-top:0.4rem;
        textarea{
            width:100%;
            resize: none;
            height:3.4rem;
            background:#F5F5F5;
            border:none;
            box-sizing: border-box;
            padding:0.333333rem 0.266667rem;
            font-size:0.4rem;
            line-height: 0.533333rem;

        }
    }
    .show{
        overflow:hidden;

        .imgBox{
            border-radius: 4px;
            float:left;
            overflow: hidden;
            width:2.026667rem;
            height:2.026667rem;
            margin:0.133333rem;
            margin-top:0.4rem;
            position:relative;
            .imgMain{
                width:100%;
                height:100%;
            }
            .trash{
                width:0.666667rem;
                height:0.666667rem;
                position: absolute;
                top:0;
                right:0;
            }
        }
        .addImg{
            border-radius: 4px;
            margin-bottom:0.133333rem;
            width:2rem;
            height:2rem;
            float:left;
            box-sizing: border-box;
            border:1px solid #EEEEEE;
            background:#F5F5F5;
            position:relative;
            margin-top:0.4rem;
            input{
                position: absolute;
                width:100%;
                height:100%;
                left:0;
                top:0;
                opacity: 0;
                z-index:1000;
            }
            img{
                width:0.7rem;
                height:0.7rem;
                position:absolute;
                left:0.65rem;
                top:0.65rem;
                z-index:100;
            }
        }
    }
}
</style>
