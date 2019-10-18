<template>
<div id="app">
	<Header></Header>
	<Toolbar></Toolbar>
	<transition name="fade" mode="out-in">
		<router-view />
	</transition>
	<Footer></Footer>
</div>
</template>

<script>
import Header from '@/view/layout/Header'
import Footer from '@/view/layout/Footer'
import Toolbar from '@/view/layout/Toolbar'
export default {
	name: 'App',
	components: {
		Header,
		Footer,
		Toolbar,
	},
	created() {
		this.$store.state.USER__ID = this.$session.get('USER__ID');
		this.$store.state.USER_ID = this.$session.get('USER_ID');
	}
}
</script>
<style scoped>
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

body.login .navbar-default,
body.login .footer {
	display: none;
}
</style>

