import Vue from 'vue'
import Router from 'vue-router'
import UserView from '@/view/member/UserView'
import UserLogin from '@/view/member/UserLogin'
import UserRegister from '@/view/member/UserRegister'
import Main from '@/view/Main'
import Mypage from '@/view/Mypage'
import MypageUserItem from '@/view/layout/MypageUserItem'
import MypageUpload from '@/view/MypageUpload'
let title = 'Dobbidomi -';
Vue.use(Router)
const rounter = new Router({
	routes: [{
		path: '/user/:userName/:id',
		name: 'Mypage',
		meta: {
			title: title + '마이페이지'
		},
		component: Mypage,
		children: [{
			path: '',
			name: 'MypageUserItem',
			meta: {
				title: title + '마이페이지'
			},
			component: MypageUserItem
		},{
			path: 'upload',
			name: 'MypageUpload',
			meta: {
				title: title + '업로드'
			},
			component: MypageUpload
		}]
	}, {
		path: '/member',
		name: 'UserLogin',
		meta: {
			title: title + '로그인'
		},
		component: UserView,
		children: [{
			path: 'userlogin',
			name: 'UserLogin',
			meta: {
				title: title + '로그인'
			},
			component: UserLogin,
		},
		{
			path: 'userregister',
			name: 'UserRegister',
			meta: {
				title: title + '회원가입'
			},
			component: UserRegister,
		}]
	}, {
		path: '/',
		name: 'Main',
		meta: {
			title: title + '메인'
		},
		component: Main
	}]
});
rounter.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	if(to.name === 'MemeberJoin' || to.name === 'Login') {
		$('body').addClass('login');
	} else {
		$('body').removeClass('login');
	}
	// if(to.name !== 'Login' && to.name !== 'MemeberJoin' && !this.$store.state.user_info) {
	//   to.name = 'Login';
	// }
	next();
});
export default rounter;