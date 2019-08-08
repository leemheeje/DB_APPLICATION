import Vue from 'vue'
import Router from 'vue-router'
import findUserLogin from './views/findUserLogin'
import findMyapp from './views/findMyapp'
import Home from './views/Home'
import store from './store'
Vue.use(Router)
const beforeEnter = (f, t, next) => {
	if(!localStorage.getItem('token')) {
		alert('로그인이필요합니다.')
		next({
			name: 'login'
		});
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
		beforeEnter,
		component: Home,
	}, {
		path: '/findUserLogin',
		name: 'login',
		component: findUserLogin
	}, {
		path: '/findMyapp',
		name: 'mypage',
		beforeEnter,
		component: findMyapp,
	}]
})