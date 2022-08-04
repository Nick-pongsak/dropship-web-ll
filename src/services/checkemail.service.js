import Vue from 'vue'

export default {
   
    checkEmail() {
        // var formData = new FormData();
        // formData.append('username', value.username);
        // formData.append('password', value.password);
        // return Vue.http.post(Vue.config['url'] + '/change-password', formData, {
        //     headers: {
        //         'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        //     },
        // }).then((response) => {
            return Promise.resolve('OK');
        // }).catch((error) => Promise.reject(error));
    }
}