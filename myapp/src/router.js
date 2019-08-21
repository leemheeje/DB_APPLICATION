import Vue from 'vue'
import Router from 'vue-router'
import findUserLogin from './views/findUserLogin'
import findUserList from './views/findUserList'
import findUserField from './views/findUserField'
import findMyapp from './views/findMyapp'
import Home from './views/Home'
import store from './store'
Vue.use(Router)
const beforeEnter = (f, t, next) => {
	if(!localStorage.getItem('token')) {
		// store.commit('fnVmModal', {
		// 	bool: true,
		// 	title: '타이틀1111',
		// 	msg: '로그인이필요합니다'
		// });
		// next({
		// 	name: 'login'
		// });
		next();
	} else {
		next();
	}
}
const beforeEnterIsLogin = (f, t, next) => {
	if(localStorage.getItem('token')) {
		// store.commit('fnVmModal', {
		// 	bool: true,
		// 	title: '타이틀222',
		// 	msg: '로그인상태입니다'
		// });
		next();
	} else {
		next();
	}
}
export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
		path: '/',
		name: 'home',
		component: Home,
		children: [{
			path: '/',
			name: 'findUserList',
			beforeEnter,
			component: findUserList
		}, {
			path: '/findUserField',
			name: 'findUserField',
			beforeEnter,
			component: findUserField
		}]
	}, {
		path: '/findUserLogin',
		name: 'login',
		beforeEnter: beforeEnterIsLogin,
		component: findUserLogin
	}, {
		path: '/findMyapp',
		name: 'mypage',
		beforeEnter,
		component: findMyapp,
	}]
})