import Vue from 'vue'
import axios from 'axios'
export default {
    fnContInfo({
        commit
    }, preload) {
        commit('reContInfo', preload);
    },
    fnLogin({
        commit,
        dispatch
    }, payload) {
        /*
        * payload = [{
        	identifier: this.userId,
        	password: this.userPw
        }, callback]
        */
        axios.post(this._vm.$DB_PATH['AUTH']['CALLBACK'], payload[0]).then(res => {
            let data = res.data;
            axios.get(this._vm.$DB_PATH['USER']['ME'], {
                headers: {
                    Authorization: `Bearer ${data.jwt}`
                }
            }).then(response => {
                dispatch('fnContInfo', data);
                payload[1]();
            }).catch(error => {});
        }).catch(err => {
            this.snamckbarTxt = '잘못된 정보입니다.';
            this.snackbarColor = 'error';
            this.snackbar = true;
        });
    },
    fnContStrgCmit({
        state,
        dispatch
    }) {
        if (localStorage.getItem('token')) {
            axios.get(this._vm.$DB_PATH['USER']['ME'], {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                dispatch('fnContInfo', {
                    jwt: localStorage.getItem('token'),
                    data: res.data
                });
            })
        }
    },
    fnLogout({
        commit
    }) {
        commit('fnLogout');
    },
}