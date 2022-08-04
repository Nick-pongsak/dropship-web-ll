import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;
import Vue from 'vue'
import router from '../../router'
import loginservice from '../../services/login.service'


const store = {
  state: {
  //   'SET_ALL_PATH_MENU'(state, value) {
  //     state.all_path_menu = value;
  // },
  },
  mutations: {
    // SetLoading(state, data) {
    //   state.loading = data;
    // }
  },
  actions: {

    loginService: ({ commit, state }, ) => {
      loginservice.loginService()
          .then((response) => {
             console.log(response)
          })
          .catch((error) => console.log('Login'));

      }

  },
  getters: {
    // isLoading(state) {
    //   return state.loading;
    // }
  }
}

export default store;