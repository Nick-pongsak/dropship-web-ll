import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './modules/app.store'
import login from './modules/login.store'
import supplier from './modules/supplier.store'
import checkforgot from './modules/checkforgot.store'
import admin from './modules/admin.store'

export default new Vuex.Store({
  modules: {
    app,
    login,
    supplier,
    checkforgot,
    admin
  }
})
