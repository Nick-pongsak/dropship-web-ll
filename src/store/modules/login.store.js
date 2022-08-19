import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;

const store = {
  state: {
    user_profile: null,
    access_token: null
  },
  mutations: {
    SetAccessToken(state, data) {
      state.access_token = data;
    },
    SetUserProfile(state, data) {
      state.user_profile = data;
    },
  },
  actions: {
    Login({ state, commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post(`${url}/apiweb/api/auth/login`, { "username": data.username, "password": data.password }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          let res = response.data.success.data
          sessionStorage.setItem('user_profile', JSON.stringify(res))
          sessionStorage.setItem('token_seesion', res.access_token)
          commit("SetUserProfile", res)
          commit("SetAccessToken", res.access_token)

          localStorage.setItem('login', 'true')
          localStorage.setItem('user_profile', JSON.stringify(res))

          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })

    },
    LogOut({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        let reMove = [
          'login',
          'SIZE_SCREEN',
          'CLICK_PAGE_FORGOT',
          'user_profile',
          'loc_email_forgor',
          'TYPE_USER'
        ]
        reMove.forEach(function (element) {
          localStorage.removeItem(element)
        })
        sessionStorage.removeItem("token_seesion")
        sessionStorage.removeItem("user_profile")
        commit('SetAccessToken', null);
        commit('SetUserProfile', null);
        resolve();
      })
    }
  },
  getters: {
    user_profile(state) {
      return state.user_profile;
    },
    access_token(state) {
      return state.access_token;
    },
  }
}

export default store;