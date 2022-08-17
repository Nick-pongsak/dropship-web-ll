<template>
  <div id="login" v-resize="onResize">
    <div class="md-layout box">
      <div 
      :class="screenDevice =='desktop' ? 'box-left':'box-left-mobile'"
      >
        <div class="f-w800 box-head font-Montserrat">Dropship portal</div>
          <div class="box-login">
            <div :style="{'transform':tranformScale}" class="container-login">
                <div class="f-w700 txt-login font-Bai-Jamjuree">Login</div>
                <div  class="txt-detail pt-5">Username / E-mail :</div>
                <div class="pt-1"> 
                  <!-- {{this.screenWidth}} -->
                  <input
                    @keyup.enter="login"
                    :style="{'border': wrong ? '2px solid red' : '' }"
                    class="inp-login-username font-Bai-Jamjuree" type="text" v-model="username" name="username" >  
                </div>
                <div class="f-w400 txt-detail pt-5">Password:</div>
                <div class="pt-1">
                  <input 
                   @keyup.enter="login"
                   :style="{'border': wrong ? '2px solid red' : '' }"
                   class="inp-login-password font-Bai-Jamjuree" type="password" v-model="password" name="password" >  
                </div>
                <div v-if="wrong" class="txt-wrong"><span class="mdi mdi-alert-octagon"></span>Invalid username or password. Please try again</div>
                <div class="pt-5">
                   <input   @click.prevent="login()" class="btn-login font-Bai-Jamjureef" type="button" value="Login">
                </div>
                <div @click.prevent="forgot('forgotpassword')" class="txt-forgot pt-3">Forgot Password</div>
            </div>
          </div>
          <div class="box-footer">
             <footers text="Copyright © 2019 DHA Siamwalla Ltd." />
          </div>
      </div>
    <div
      class="box-right"
     >
        <!-- <img  :style="{'left':screenWidth*0.3 + 'px'}" v-if="screenDevice === 'desktop'"  class="img-login" src="@/assets/images/person-login.png"> -->
    </div>
  </div>
  </div>
</template>

<script>
// var CryptoJS = require('crypto-js')
import Vue from "vue";
import Footers from '@/components/Footer'
export default {
  name: 'login',
  components: {Footers},
  data () {
    return {
      username:'test',
      password:'1234',
      wrong:false,
      tranformScale:'',
      screenWidth:'',
      screenHeight:'',
      screenDevice:'',
    }
  },
  methods: {

    //  login () {
    //   if (this.username.length == 0 || this.password == 0 ) {
    //     this.wrong = true
       
    //  } else {
    //     var formData = new FormData()
    //     formData.append('username', this.edt_username)
    //     formData.append('password', this.edt_password)
    //     this.$http
    //       .post(Vue.config['url'] + '/auth/login', formData, {
    //         headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //           Accept: 'application/json'
    //         }
    //       })
    //       .then(
    //         response => {
    //           // this.$store.commit('SET_STATUS_LOGIN', true)
    //           let rs = response.body.success

    //           Vue.localStorage.set('login', true)
    //           Vue.localStorage.set('token', rs.token)
    //           Vue.localStorage.set('emp_id', rs.user_detail[0].emp_id)
    //           Vue.localStorage.set('emp_code', rs.user_detail[0].emp_code)
    //           Vue.localStorage.set('first_name', rs.user_detail[0].first_name)
    //           Vue.localStorage.set('last_name', rs.user_detail[0].last_name)
    //           // role2 closed
    //           Vue.localStorage.set('role_id', rs.user_detail[0].role_id)
    //           Vue.localStorage.set('user_id', rs.user_detail[0].user_id)
    //           Vue.localStorage.set('email', rs.user_detail[0].email)
             
            
    //           let fisrtMenu = _.filter(rs.menu_data, function (o) {
    //             return o.m_code != 'setting'
    //           })
    //           if (fisrtMenu.length > 0) {
    //             if (fisrtMenu[0].sub_menu.length > 0) {
    //               let firstPath = fisrtMenu[0].sub_menu[0].m_path
    //               this.$router.push({ path: firstPath })
    //             }
    //           }
    //         }
    //         // ,
    //         // response => {
    //         //   this.$store.commit('SET_STATUS_LOGIN', false)
    //         //   this.httpStatus = response.status
    //         //   if (response.status == 401) {
    //         //     this.txt_warning =
    //         //       'Please check your username/password and try again.'
    //         //   } else {
    //         //     this.txt_warning = 'System error.'
    //         //   }
    //         //   this.$refs.snackbar.open()
    //         // }
    //       )
    //   }
    // },
    login() {
      // console.log(this.username , this.password)
      if(this.username == '' ||  this.password == ''){
        this.wrong = true
      }else {

          if(this.username == 'test' && this.password == '1234'){
          // this.$store.dispatch("loginService");
           this.wrong = false
              let user_profile = {
                frist_name :"User",
                last_name:'Test',
                token:'...',
                type:'user'
              }
            Vue.localStorage.set("login",'true')
            Vue.localStorage.set("user_profile",JSON.stringify(user_profile))
            // Vue.localStorage.set("TYPE_USER",'user')
            this.$router.push('/' + 'home')
          }else if(this.username == 'admin' && this.password == 'admin') {
             let admin_profile = {
                frist_name :"Admin",
                last_name:'Test',
                token:'...',
                type:'admin'
              }
            Vue.localStorage.set("login",'true')
            Vue.localStorage.set("user_profile",JSON.stringify(admin_profile))
            // Vue.localStorage.set("TYPE_USER",'admin')
            this.$router.push('/' + 'admin')
          }else {
             this.wrong = true
          }
      }
    
    },
    forgot(){
      Vue.localStorage.set('ACTION_FORGOT_STEP','1')
       this.$router.push('/' + 'forgotpassword')
    },
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      this.screenWidth = x
      this.screenHeight = y

      if(x <= 450){
        this.screenDevice = 'mobile'
      }else {
        this.screenDevice = 'desktop'
      }
      if (x <= 375) {
        this.tranformScale = 'scale(0.65)'
      } else if (x > 375 && x <= 550) {
        this.tranformScale = 'scale(0.65)'
      } else if (x <= 1110 && x >= 960) {
        this.tranformScale = 'scale(0.8)'
      } else {
        this.tranformScale = 'scale(1)'
      }

    }
  },
  created () {
    if (Vue.localStorage.get("login") != null) {
        this.$router.push('/home')
    } else {
        Vue.localStorage.remove('ACTION_FORGOT_STEP');
        
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style>
</style>
