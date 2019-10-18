<template>
<div class="form_bg">
	<div class="form_logo">
		<img src="@/assets/images/logo_bl.png" alt="" />
	</div>
		<div class="form_wrap">
			<div class="row">
				<div class="col12">
					<div class="r_in">
						<label for="USER_ID" class="lb">아이디</label>
						<Form type="text" id="USER_ID" name="USER_ID" cssClass="ip" @jsKeyup13="fnLoginBtn" @v-model="fnUserFormModel" placeholder="아이디를 입력해주세요." />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col12">
					<div class="r_in">
						<label for="USER_PW" class="lb">비밀번호</label>
						<Form type="password" id="USER_PW" name="USER_PW" cssClass="ip" @v-model="fnUserFormModel" @jsKeyup13="fnLoginBtn" placeholder="비밀번호를 입력해주세요." />
					</div>
				</div>
			</div>
			<div class="btn_wrap MT25">
				<div class="row">
					<div class="col6">
						<ahref href="" cssClass="block big red" originTag @jsClick="fnLoginBtn">로그인</ahref>
					</div>
					<div class="col6">
						<ahref :href="{name:'UserRegister'}" cssClass="block big default">회원가입</ahref>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			USER_ID: '',
			USER_PW: '',
		}
	},
	computed: {
		popMessage() {
			if (!this.$store.state.login_state) {
				return '아이디 또는 비밀번호를 확인해주세요.'
			}
		}
	},
	mounted() {
		$('[name="USER_ID"]').focus();
		$('.modal').hide();
	},
	methods: {
		fnUserFormModel(...r) {
			for (var key in r[1]) {
				if(r[1][key]){
					this[key] = r[0];
				}
			}
		},
		fnLoginBtn() {
			if (!this.USER_ID) {
				alert('아이디빔');
				return false;
			}
			if (!this.USER_PW) {
				alert('비밀번호빔');
				return false;
			}
			this.$http.post(this.$DB_PATH['LOGIN'], {
				identifier: this.USER_ID,
				password: this.USER_PW
			}).then(res => {
				console.log(res);
				this.$router.push({name: 'Main'});
				this.$store.state.USER__ID = res.data.user._id;
				this.$store.state.USER_ID = this.USER_ID;
				this.$session.set('USER__ID' , res.data.user._id);
				this.$session.set('USER_ID' , this.USER_ID);
				//document.cookie = `accessToken=12312312312313123123`;
				//this.$http.defaults.headers.common['x-access-token'] = 12312312312313123123;
			}).catch(e=>{
				console.log(e);
				//alert('입력하신 정보가 없습니다.');
			});
		}
	}
}
</script>
<style scoped>
.form_wrap .row .r_in {
	min-width: 250px;
}
</style>
<style>

</style>