import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMaterial from 'vue-material'

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

import 'vue-material/dist/vue-material.min.css'

Vue.config.productionTip = false

import Axios from 'axios';
import vuetify from './plugins/vuetify';
Vue.prototype.$axios = Axios;

const EventBus = new Vue();
Vue.prototype.$eventbus = EventBus;

import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueMaterial)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// var bcrypt = require('bcryptjs');
// Vue.use(bcrypt)
import FontRoboto from './assets/fonts/fontRoboto.css'
import FontLato from './assets/fonts/fontLato.css'
import FontKanit from './assets/fonts/fontKanit.css'
Vue.use(FontRoboto)
Vue.use(FontLato)
Vue.use(FontKanit)

import './filters';
import './global';

import VueI18n from 'vue-i18n'
import locales from './locales'
Vue.use(VueI18n)
var i18n = new VueI18n({
  locale: 'th',
  messages: locales
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  // bcrypt,
  render: h => h(App)
}).$mount('#app')
