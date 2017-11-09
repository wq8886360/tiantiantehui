<template>
	<div class='sort'>
		<ul>	
			<li class='firstLi'><span>全部</span></li>
			<li><span>毛衣</span></li>
			<li><span>衬衫</span>
				<ul>
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>5</li>
				</ul>
			</li>
			<li><span>卫衣</span></li>
			<li><span>夹克</span></li>
		</ul>
	</div>
</template>
<script>
	export default {
        data() {
            return {

            }
        }
    }
</script>
<style lang="less">
html,body,#app{
	height:100%;
}
.sort{
	background:#F7F7F7;
	height:100%;
	ul{
		
		li{
			box-sizing: border-box;
			padding:0 0.266667rem 0;
			background:white;
			line-height: 1.2rem;
			font-size:0.373333rem;
			span{
				width:100%;
				display:inline-block;
				border-bottom:1px solid #D8D8D8;
			}
			ul{
				li{
					float:left;
					width:50%;
				}
			}
		}
		.firstLi{
			margin-bottom:0.266667rem;
			span{
				border-bottom:none;
			}
		}

	}
}
</style>