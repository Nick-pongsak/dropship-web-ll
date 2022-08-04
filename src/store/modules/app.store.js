import axios from 'axios';
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
const debug = process.env.VUE_APP_PRODUCTION_STATUS;
import Vue from 'vue'
import router from './../../router'


const store = {
  state: {
    loading: false,
    loadHome: false,
    language: '',
    systemTheme: 'dark',

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
    }
  },
  actions: {

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
  }
}

export default store;