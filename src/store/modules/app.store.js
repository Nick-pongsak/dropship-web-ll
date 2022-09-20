import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;
import Vue from 'vue'
import router from './../../router'
import timeServer from '../../services/timeserver.service'


const store = {
  state: {
    loading: false,
    loadHome: false,
    language: '',
    systemTheme: 'dark',
    timeServer: '',
    policy: false,

  },
  mutations: {
    SetLoading(state, data) {
      state.loading = data;
    },
    SetLoadHome(state, data) {
      state.loadHome = data;
    },
    SetLanguage(state, data) {
      state.language = data;
    },
    SetTheme(state, data) {
      state.systemTheme = data;
    },
    ShowPolicy(state, data) {
      // console.log(data)
      state.policy = data;
    }
  },
  actions: {
    getTimeServer: ({ commit, state },) => {
      timeServer.getTimeServer()
        .then((response) => {
          state.timeServer = response
        })
        .catch((error) => console.log('getTimeServer'));

    }

  },
  getters: {
    isLoading(state) {
      return state.loading;
    },
    isLanguage(state) {
      return state.language;
    },
    loadHome(state) {
      return state.loadHome;
    },
    systemTheme(state) {
      return state.systemTheme;
    },
    timeServer(state) {
      return state.timeServer
    },
    policy(state) {
      return state.policy
    }
  }
}

export default store;