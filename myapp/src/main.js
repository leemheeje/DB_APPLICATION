import '@/assets/scss/style.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
const DB_PATH = '//61.78.72.233:1337';
Vue.config.productionTip = false
var firebaseConfig = {
	apiKey: "AIzaSyAOZvV7foRoxRBrLdokxR4RlBpuy1r4-qs",
	authDomain: "my-vue-project-92b14.firebaseapp.com",
	databaseURL: "https://my-vue-project-92b14.firebaseio.com",
	projectId: "my-vue-project-92b14",
	storageBucket: "my-vue-project-92b14.appspot.com",
	messagingSenderId: "377878918273",
	appId: "1:377878918273:web:077afee6913885eae48980",
	measurementId: "G-D92DY13WDL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
Vue.prototype.$http = axios;
Vue.prototype.$title = 'Account Book';
Vue.prototype.$DOMAIN = DB_PATH;
Vue.prototype.$DB_PATH = {
	AUTH: {
		CALLBACK: `${DB_PATH}/auth/local`, //post
	},
	USER: {
		ME: `${DB_PATH}/users/me`, //get
	},
}
Vue.prototype.$currentTime = () => {
	let d = new Date();
	let getFullYear = d.getFullYear();
	let getMonth = d.getMonth() + 1 < 10 ? `0${d.getMonth()+1}` : d.getMonth() + 1;
	let getDate = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
	let getTime = d.getTime();
	return {
		getFullYear,
		getMonth,
		getDate,
		getTime,
		calendar: `${getFullYear}${getMonth}${getDate}`
	}
}
Vue.filter('fnFormatComma', (str) => {
	let s = str.toString();
	if(s.indexOf(',') != -1 || s.indexOf('원') != -1) {
		s = s.replace(/[^0-9]/g, '');
	}
	let regexp = /\B(?=(\d{3})+(?!\d))/g;
	return s.toString().replace(regexp, ',');
})
Vue.filter('fnFormatDate', (s) => {
	let regexp = /([0-9]{4})([0-9]{2})([0-9]{2})/i
	return s.replace(regexp, '$1년$2월$3일');
})
new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')