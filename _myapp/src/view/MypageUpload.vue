<template>
<div class="user_upload">
	<div class="inner">
		<form>
			<div class="form_wrap">
				<div class="row">
					<div class="col12">
						<div class="r_in requierd">
							<label
									for="fd0"
									class="lb"
							>타이틀</label>
							<Form
									type="text"
									id="fd0"
									name="title"
									cssClass="ip"
							></Form>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col12">
						<div class="r_in requierd">
							<label class="lb">이미지</label>
							<Form
									type="file"
									cssClass="ip"
									name="files"
							></Form>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col12">
						<div class="r_in requierd">
							<label
									for="fd0"
									class="lb"
							>설명글</label>
							<Form
									type="textarea"
									id="fd0"
									name="sub_title"
									cssClass="ip"
							></Form>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col12">
						<div class="r_in ">
							<label
									for="fd0"
									class="lb"
							>서비스URL</label>
							<Form
									type="text"
									id="fd0"
									name="url"
									cssClass="ip"
							></Form>
						</div>
					</div>
				</div>
			</div>
			<Form
					type="submit"
					cssClass="btns block big red MT30 inline"
					value="등록하기"
			></Form>
		</form>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			uploadImg: null,
			user_items: null
		}
	},
	mounted() {
		const formElement = document.querySelector('form');
		const request = new XMLHttpRequest();
		this.$http.get(this.$DB_PATH['USER_UPLOAD_FIND']).then(res => console.log(res))
		formElement.addEventListener('submit', e => {
			e.preventDefault();
			request.open('POST', this.$DB_PATH['USER_UPLOAD']);
			request.send(new FormData(formElement));
			request.onreadystatechange = () => {
				if (request.readyState === 4 && request.status === 200) {
					this.$http.get(this.$DB_PATH['USER_UPLOAD_FIND']).then(res => {
						let ls = res.data.length - 1;
						this.$http.get(this.$DB_PATH['USER_UPLOAD_FIND'] + res.data[ls].id).then(res => {
							this.uploadImg = res;
							this.user_items.push({
								"title": $('[name="title"]').val(),
								"sub_title": $('[name="sub_title"]').val(),
								"img": this.uploadImg.data,
								"url" :$('[name="url"]').val(),
								"count_favorite": 0,
								"count_view": 0,
								"count_comments": 0,
								"comments": [],
								"tags": [],
							});
							this.$http.put(this.$DB_PATH['USER_UPDATE'] + this.$route.params.id, {
								"user_items": this.user_items
							}).then(res => {
								res.data.user_items = $.extend(true, res.data.user_items, {
									a: 1
								});
								alert('등록완료하였습니다.');
								this.$router.push({name:'MypageUserItem'});
							});
						});
					});
				}
			};
		});
		this.$http.get(this.$DB_PATH['FIND_ON'] + this.$route.params.id).then(res => {
			this.user_items = res.data.user_items;
		});
	},
	methods: {
	}
}
</script>
<style scoped="">
.user_upload {}
</style>