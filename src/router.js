import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import MainDropship from '@/views/MainDropship.vue'
import DefaultLayout from '@/views/Default.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Login,
      meta: {
        rule: "isPublic"
      }
    },
    {
      path: "/home",
      component: DefaultLayout,
      children: [
        {
          path: "/home",
          component: MainDropship
        },
        {
          path: "/forgotpassword",
          component: ForgotPassword,
          
        },
        
      ]
    },
   
   
  ]
})
