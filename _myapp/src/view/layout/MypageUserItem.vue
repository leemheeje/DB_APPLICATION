<template>
<div class="useritem_area" v-if="user_items">
	<template v-for="(key,index) in user_items.user_items">
		<Items :usersItemsId="key.img._id" :usersInfo="user_info" :usersItems="key" :usersItemsIndex="index"></Items>
	</template>
</div>
</template>
<script>
export default {
	data() {
		return {
			user_items: null,
			user_info:null
		}
	},
	watch: {
		$route(t, f) {
			this.fnGetParams();
		}
	},
	created() {
		this.fnGetParams();
	},
	methods: {
		fnGetParams() {
			this.$http.get(this.$DB_PATH['FIND_ON'] + this.$route.params.id).then(res => {
				this.user_items = res.data;
				this.user_info = res.data;
			}).catch(e => {
				console.log(e);
			})
		}
	}
}
</script>
<style scoped="">
</style>