import Vue from 'vue'

export default {
   
    getTimeServer() {
        
        // var formData = new FormData();
        // formData.append('username', value.username);
        // formData.append('password', value.password);
        // return Vue.http.post(Vue.config['url'] + '/change-password', formData, {
        //     headers: {
        //         'Authorization': 'Bearer ' + Vue.localStorage.get('token')
        //     },
        // }).then((response) => {
            const date = new Date()
            const result = date.toLocaleDateString('th', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                //   weekday: 'long',
            })
            return Promise.resolve(result);
        // }).catch((error) => Promise.reject(error));
    }
}