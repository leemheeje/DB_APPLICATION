<template>
<!-- <v-slide-x-transition mode="out-in">
	<router-view />
</v-slide-x-transition> -->
<transition :name="isChildTransition">
	<router-view />
</transition>
</template>
<script>
import {
	mapGetters,
	mapState,
} from 'vuex'
export default {
	computed: {
		...mapGetters(['isChildTransition'])
	},
}
</script>
<style>
body {
	overflow-x: hidden;
}

.slide-enter-active,
.slide-leave-active {
	transition: transform .5s;
	position: absolute;
	width: 100%
}

.slide-enter {
	transform: translateX(100%);
}

.slide-enter-to {
	transform: translateX(0);
}

.slide-leave {
	transform: translateX(0);
}

.slide-leave-to {
	transform: translateX(-100%);
}

.slide-revers-enter-active,
.slide-revers-leave-active {
	transition: transform .5s;
	position: absolute;
	width: 100%
}

.slide-revers-enter {
	transform: translateX(-100%);
}

.slide-revers-enter-to {
	transform: translateX(0);
}

.slide-revers-leave {
	transform: translateX(0);
}

.slide-revers-leave-to {
	transform: translateX(100%);
}
</style>