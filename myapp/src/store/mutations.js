import router from '../router'
export default {
	reContInfo(state, payload) {
		if(payload.jwt != 'undifined' && payload.jwt) {
			state.USER_INFO = payload.data;
			state.USER_TOKEN = payload.jwt;
			localStorage.setItem('token', payload.jwt);
		}
	},
	fnLogout(state) {
		state.USER_INFO = null;
		state.USER_TOKEN = null;
		localStorage.removeItem('token');
		this.commit('fnVmModal', {
			bool: true,
			title: 'tq',
			msg: '로그아웃되었습니다.'
		});
		router.push({
			name: 'login'
		});
	},
	fnVmModal(state, payload) {
		state.vmModal = payload;
	},
	fnTransPayload(state, a) {
		state[a[0]] = a[1];
	},
}