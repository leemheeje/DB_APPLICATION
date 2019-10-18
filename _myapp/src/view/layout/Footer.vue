<template>
<div class="footer">
	<ahref :href="{name :'MypageUpload'}" class="btn_upload" v-if="sesstionCheck">
		<fontIcon icon="plus" color="#fff" size="1x"></fontIcon>
	</ahref>
	<Modal :usersInfo="$store.state.USER_ITEMS_INFO"  :usersItemsId="$store.state.USER_ITEMS_ID" :usersItems="$store.state.USER_ITEMS_OBJECT" :usersItemsIndex="$store.state.USER_ITEMS_INDEX"></Modal>
</div>
</template>
<script>
export default {
	methods: {
		upload() {

		}
	},
	computed: {
		sesstionCheck() {
			if (this.$store.state.USER_ID && this.$store.state.USER_ID == this.$route.params.userName) {
				return true;
			} else {
				return false;
			}
		}
	}
}
</script>
<style scoped>
.btn_upload {
	position: fixed;
	right: 30px;
	min-width: 0;
	padding: 0;
	bottom: 30px;
	width: 60px;
	height: 60px;
	line-height: 60px;
	border-radius: 50%;
	background: #e0417e;
}
</style>