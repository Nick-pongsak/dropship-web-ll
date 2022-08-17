import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import DefaultLayout from '@/views/Default.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import UserProfile from '@/views/UserProfile.vue'

import Logout from '@/views/Logout.vue'

// ADMIN
import AdminHome from '@/views/AdminHome.vue'
import AdminProfileManage from '@/views/AdminProfileManage.vue'
import AdminOrdereManage from '@/views/AdminOrderManage.vue'
import AdminAccounteManage from '@/views/AdminAccountManage.vue'


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
          component: Home
        },
        {
          path: "/forgotpassword",
          component: ForgotPassword,
          
        },
        {
          path: "/userprofile",
          component: UserProfile,
          
        },
        ,
        {
          path: "/admin",
          component: AdminHome,
          
        },
        {
          path: "/adminManageProfile",
          component: AdminProfileManage,
          
        },
        {
          path: "/adminManageOrder",
          component: AdminOrdereManage,
          
        },
        {
          path: "/adminAccounteAccount",
          component: AdminAccounteManage,
          
        },
        {
          path: "/logout",
          component: Logout,
          
        },
        
      ]
    },
   
   
  ]
})
