import axios from 'axios'
export default {
	fnContInfo({
		commit
	}, preload) {
		commit('reContInfo', preload);
	},
	fnContStrgCmit({
		state,
		dispatch
	}) {
		if(localStorage.getItem('token')) {
			axios.get('http://localhost:1337/users/me', {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
			}).then(res => {
				dispatch('fnContInfo', {
					jwt : localStorage.getItem('token'),
					data : res.data
				});
			})
		}
	}
}