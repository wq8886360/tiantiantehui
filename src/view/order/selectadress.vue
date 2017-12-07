<template>
	<div class="selectadress">
		选择收获地址
	</div>
</template>
<script>
import { addressall } from '../../http/api';
export default{
	data(){
		return {

		}
	},
	created(){
		addressall().then((response) => {
			console.log(response)
		})
	}
}
</script>