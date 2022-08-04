import Vue from 'vue'

export default {
   
    checkForgot(value) {
        var st_forgot = 1
        if(value === 'piyathat_j@dhas.com' && st_forgot == 1){
            return Promise.resolve(true);
        }else {
            return Promise.resolve(false);
        }
        // var formData = new FormData();
        // formData.append('username', value.username);
        // formData.append('password', value.password);
        // return Vue.http.post(Vue.config['url'] + '/change-password', formData, {
        //     headers: {
        //         'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        //     },
        // }).then((response) => {
            // return Promise.resolve(value);
        // }).catch((error) => Promise.reject(error));
    }
}