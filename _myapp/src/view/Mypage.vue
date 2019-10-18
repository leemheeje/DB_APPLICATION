<template>
<div class="mypage_area">
	<MypageUserInfo></MypageUserInfo>
	<div class="mypage_useritem">
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</div>
</div>
</template>
<script>
import MypageUserInfo from '@/view/layout/MypageUserInfo';
export default {
	components: {
		MypageUserInfo,
	},
	mounted() {
	}
}
</script>
<style scoped="">
.fade-enter-active,
.fade-leave-active {
  transition-duration: .3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
.mypage_useritem {
	margin-left: 355px;
}

@media only screen and (max-width: 1200px) {
	.mypage_useritem {
		margin: 0;
	}
}
</style>