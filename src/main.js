import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMaterial from 'vue-material'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


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

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
Vue.component('date-picker', DatePicker)

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


import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: false, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}
Vue.use(VueHtmlToPaper, options);

// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper);

Vue.use(VueI18n)
var i18n = new VueI18n({
  locale: 'wrong',
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
