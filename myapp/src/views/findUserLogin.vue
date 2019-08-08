<template>
	<v-flex xs12 sm8 md4>
		<v-card class="elevation-12">
			<v-snackbar v-model="snackbar" :top="true" :color="snackbarColor" :timeout="1000">
				{{snamckbarTxt}}
			</v-snackbar>
			<v-toolbar color="primary" dark flat>
				<v-toolbar-title>Login form</v-toolbar-title>
				<v-spacer></v-spacer>
			</v-toolbar>
			<v-card-text>
				<v-form>
					<v-text-field @keyup.13="fnUserLogin" v-model="userId" label="Login" name="login" prepend-icon="person" type="text"></v-text-field>
					<v-text-field @keyup.13="fnUserLogin" v-model="userPw" label="Password" name="password" prepend-icon="lock" type="password"></v-text-field>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn @click="fnUserLogin" block rounded color="primary">Login</v-btn>
			</v-card-actions>
		</v-card>
	</v-flex>
</template>

<script>
import {
	mapActions
} from 'vuex';
export default {
	data: () => ({
		snackbar: false,
		snackbarColor: 'error',
		snamckbarTxt: '',
		userId: '',
		userPw: '',
	}),
	computed: {},
	methods: {
		...mapActions(['fnContInfo']),
		fnUserLogin() {
			if (!this.userId && !this.userPw) {
				this.snamckbarTxt = '잘못된 정보입니다.';
				this.snackbarColor = 'error';
				this.snackbar = true;
				return;
			}
			let params = {
				identifier: this.userId,
				password: this.userPw
			};

			this.$http.post('http://localhost:1337/auth/local', params).then(res => {
				let data = res.data;
				this.$http.get('http://localhost:1337/users/me', {
					headers: {
						Authorization: `Bearer ${data.jwt}`
					}
				}).then(response => {
					this.snamckbarTxt = '로그인되었습니다.';
					this.snackbarColor = 'success';
					this.snackbar = true;
					this.fnContInfo(data);
					setTimeout(() => {
						this.$router.push({
							name: 'home',
						});
					}, 1000);
				}).catch(error => {});
			}).catch(err => {
				console.log(err);
				this.snamckbarTxt = '잘못된 정보입니다.';
				this.snackbarColor = 'error';
				this.snackbar = true;
			});
		}
	}
}
</script>