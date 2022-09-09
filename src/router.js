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
import AdminOrdereManage from '@/views/AdminOrderManage.vue'
import AdminUserManage from '@/views/AdminUserManage.vue'
import AdminProfile from '@/views/AdminProfile.vue'
import AdminCreateAccount from '@/views/AdminCreateAccount.vue'


// PRINT
import Print from '@/views/PrintLabel.vue'

// TEST
import test from '@/views/test.vue'



Vue.use(Router)

// export default new Router({
const routes = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
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
          path: "/servicetest",
          component: test
        },
        
        {
          path: "/PrintLabel",
          component: Print
        },
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
          path: "/adminHome",
          component: AdminHome,
          
        },
        {
          path: "/adminManageOrder",
          component: AdminOrdereManage,
          
        },
        {
          path: "/AdminUserManage",
          component: AdminUserManage,
          
        },
        {
          path: "/adminProfile",
          component: AdminProfile,
          
        },
        {
          path: "/AdminCreateAccount",
          component: AdminCreateAccount,
          
        },
        {
          path: "/logout",
          component: Logout,
          
        }
        
      ]
    },
   
   
  ]
})
export default routes