import '@/assets/css/style.css';
import 'expose-loader?$!expose-loader?jQuery!jquery'
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueSession from 'vue-session'
import router from './router'
import axios from 'axios'
import 'url-search-params-polyfill';
import {
	library
} from '@fortawesome/fontawesome-svg-core'
import {
	faCoffee,
	faSearch,
	faPlus,
	faHeart,
	faTimes,
	faComment,
	faEye,
	faUser,
	faSignInAlt,
	faSignOutAlt,
	faRegistered,
} from '@fortawesome/free-solid-svg-icons'
import {
	FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import Form from '@/components/Form';
import Link from '@/components/Link';
import Modal from '@/components/Modal';
import Items from '@/components/Items';
library.add(faCoffee, faSearch, faPlus, faHeart, faTimes, faComment, faEye, faSignInAlt, faUser, faRegistered, faSignOutAlt)
Vue.component('fontIcon', FontAwesomeIcon)
Vue.component('ahref', Link)
Vue.component('Form', Form)
Vue.component('Modal', Modal)
Vue.component('Items', Items)
Vue.use(Vuex);
Vue.use(VueSession);
const DB_DOMAIN = process.env.NODE_ENV === 'development' ? '//localhost:1337' : '//localhost:1337' //'../';
const ROOT_PATH = process.env.NODE_ENV === 'development' ? '/' : '/study/vue' //'../';
const store = new Vuex.Store({
	state: {
		USER__ID: null,
		USER_ID: '',
		USER_ITEMS_INFO: null,
		USER_ITEMS_OBJECT: null,
		USER_ITEMS_INDEX: 0,
	},
	mutations: {}
});
Vue.config.productionTip = false;
Vue.prototype.$devServer = process.env.NODE_ENV;
Vue.prototype.$http = axios;
Vue.prototype.$ROOT_PATH = ROOT_PATH;
Vue.prototype.$DB_DOMAIN = DB_DOMAIN;
Vue.prototype.$PROFILE_NULL_IMG = DB_DOMAIN + '/uploads/0fd84ea0bab94a6aa070c992a69df611.jpg';
Vue.prototype.$DB_PATH = {
	MYPASPDFPASPDFP: DB_DOMAIN + '/users/me', //get
	FIND_ON: DB_DOMAIN + '/users/', //get //:_id
	ALLUSER: DB_DOMAIN + '/users', //get
	LOGIN: DB_DOMAIN + '/auth/local', //post
	REGISTER: DB_DOMAIN + '/auth/local/register', //post
	USER_UPDATE: DB_DOMAIN + '/users/', //put ///users/:_id
	USER_UPLOAD: DB_DOMAIN + '/upload/', //post
	USER_UPLOAD_FIND: DB_DOMAIN + '/upload/files/', //get
	USER_UPLOAD_COUNT: DB_DOMAIN + '/upload/files/count', //get
};
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App,
	},
	template: '<App/>',
})