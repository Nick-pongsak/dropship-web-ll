import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;
import Vue from 'vue'
import router from '../../router'
import checkforgotservice from '../../services/checkforgot.service'


const store = {
  state: {
        forgot_status : false
  },
  mutations: {
    // SetLoading(state, data) {
    //   state.loading = data;
    // }
  },
  actions: {

    checkForgot: ({ commit, state }, value) => {
      checkforgotservice.checkForgot(value)
          .then((response) => {
           state.forgot_status = response 
            //  console.log('checkForgot=> ', response)
          })
          .catch((error) => console.error(error,'checkForgot'));

      }

  },
  getters: {
    forgot_status(state) {
      return state.forgot_status;
    }
  }
}

export default store;