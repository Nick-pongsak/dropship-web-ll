import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;

const store = {
  state: {
        status_ : false
  },
  mutations: {
    // SetLoading(state, data) {
    //   state.loading = data;
    // }
  },
  actions: {

    checkEmail({ state, commit, dispatch }, data) {
      console.log("🚀 ~ file: checkemail.store.js ~ line 21 ~ checkEmail ~ data", data)
 
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/auth/checkemail`, {
          user_email: data
          
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(response => {
          console.log(response)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
  },
  getters: {
    status_(state) {
      return state.status_;
    }
  }
}

export default store;