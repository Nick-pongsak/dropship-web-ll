import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;
import Vue from 'vue'
import router from '../../router'
import checkemailservice from '../../services/checkemail.service'


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

    checkEmail: ({ commit, state }, ) => {
        checkemailservice.checkEmail()
          .then((response) => {
             console.log(response)
          })
          .catch((error) => console.log('checkEmail'));

      }

  },
  getters: {
    status_(state) {
      return state.status_;
    }
  }
}

export default store;