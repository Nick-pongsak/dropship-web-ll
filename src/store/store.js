import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './modules/app.store'
import login from './modules/login.store'
import checkemail from './modules/checkemail.store'
import checkforgot from './modules/checkforgot.store'

export default new Vuex.Store({
  modules: {
    app,
    login,
    checkemail,
    checkforgot
  }
})
