<template>
<div
		id="header"
		class="header"
>
	<div class="header_in">
		<ahref
				:href="{name:'Main'}"
				cssClass="logo"
				style="width: 86px; padding: 0; line-height: 56px; text-align: center; background: #222; border-radius: 0; color: #fff;"
		>Home</ahref>
		<div
				class="regs_w"
				v-if="!$store.state.USER_ID"
		>
			<ahref
					:href="{name: 'UserLogin'}"
					cssClass="tooltip"
					cssStyle="width: 86px; padding: 0; line-height: 56px; text-align: center; background: #444; border-radius: 0; color: #fff;"
					tooltipMsg="로그인"
			>
			로그인
			</ahref>
			<ahref
					:href="{name: 'UserRegister'}"
					cssClass="tooltip"
					cssStyle="width: 86px; padding: 0; line-height: 56px; text-align: center; background: #444; border-radius: 0; color: #fff;"
					tooltipMsg="회원가입"
			>
				회원가입
			</ahref>
		</div>
		<div
				class="regs_w"
				v-else
		>
			<ahref
					:href="{path: '/user/'+$store.state.USER_ID+'/'+$store.state.USER__ID}"
					cssClass="tooltip"
					cssStyle="width: 86px; padding: 0; line-height: 56px; text-align: center; background: #444; border-radius: 0; color: #fff;"
					tooltipMsg="마이페이지"
			>마이페이지
			</ahref>
			<ahref
					href=""
					@jsClick="fnLoginOutBtn"
					cssClass="tooltip"
					cssStyle="width: 86px; padding: 0; line-height: 56px; text-align: center; background: #444; border-radius: 0; color: #fff;"
					tooltipMsg="로그아웃"
			>로그아웃
			</ahref>
		</div>
		<!-- <div class="search_area">
			<fontIcon icon="search" color="#555"></fontIcon>
			<Form type="text" id="search_input" placeholder="검색어를 입력해주세요" class="search_input"></Form>
		</div> -->
	</div>
</div>
</template>
<script>
export default {
	methods: {
		fnLoginOutBtn() {
			let c = confirm('로그아웃하겠습니까?');
			if (c) {
				this.$store.state.USER__ID = '';
				this.$store.state.USER_ID = '';
				this.$session.remove('USER__ID');
				this.$session.remove('USER_ID');
				this.$router.push({
					name: 'Main'
				});
			}
		}
	}
}
</script>
<style scoped>
.header {
	height: 56px;
	background: rgba(47, 47, 47, 0.98);
}

.header_in {
	height: 100%;
	position: relative;
	padding: 0 30px;
}

.header_in {}

.search_area {
	position: absolute;
	right: 30px;
	top: 50%;
	margin-top: -17px;
	width: 190px;
	padding: 7px 5px 7px 35px;
	font-size: 13px;
	font-weight: normal;
	vertical-align: middle;
	color: #bbb;
	border: none;
	background-color: #fff;
	background-repeat: no-repeat;
	background-position: 7px 50%;
	border-radius: 4px;
}

.regs_w {
	position: absolute;
	right: 30px;
	text-align: right;
	min-width: 70px;
	top: 50%;
	transform: translateY(-50%);
}

.search_area .fa-search {
	position: absolute;
	left: 11px;
	top: 50%;
	margin-top: -5px;
}

.search_area .search_input {
	border: none;
	padding: 0;
	outline: none;
	vertical-align: middle;
	display: block;
	width: 100%;
	font-size: 13px;
	height: 20px;
}

.search_area .search_input:focus {
	outline: none;
}
</style>