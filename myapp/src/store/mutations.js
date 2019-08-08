export default {
	reContInfo(state, preload) {
		if(preload.jwt != 'undifined' && preload.jwt) {
			state.USER_INFO = preload.data;
			state.USER_TOKEN = preload.jwt;
			localStorage.setItem('token', preload.jwt);
		}
	},
}