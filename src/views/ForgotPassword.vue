<template>
  <!-- <div id="maincorp">
     -->
<div id="Forgotpassword" v-resize="onResize">
  
    <div style="height:100%" class="md-layout">
    <div class="box-left f-w800 box-head font-Montserrat">
      <div id="" style="height:5%">Dropship portal</div>
      <!-- {{this.screen_Hight}} {{this.screen_Width }} -->
      <div style="height:95%">
        <img :style="{'height': this.screen_Hight,'width':this.screen_Width }"  class="img-forgot" src="@/assets/images/person-forgot.png">
      </div>
     
    </div>
    <div class="box-right">
      <div :style="{'transform' : this.tranformScale}" class="box-inp">
        <div v-if="stepForgot != 3" class="f-w1000 txt-forgot font-Bai-Jamjuree">Forgot Password</div>
        <div v-else class="f-w1000 txt-forgot2 font-Bai-Jamjuree">Forgot Password</div>

<!-- Enter your E-mail  -->
<!-- {{this.loc_email_forgot}} -->
          <div v-if="stepForgot == 1" style="display: contents;">
               <div class="pt-5 txt-detail font-Bai-Jamjuree">Enter your E-mail and we’ll send you a</div>
                <div class="txt-detail font-Bai-Jamjuree">Link to reset you password</div>
                <div class="pt-5 font-Bai-Jamjuree">
                  <input :style="{'border': invalid_email || undefined_email ? '2px solid red' : '' }" v-model="txt_email" placeholder="Please input your E-mail address " class="pl-5 inp-email" type="text" name="email" id="email">
                </div>
                <div v-if="invalid_email" class="pt-3 txt-wrong-email"><span class="mdi mdi-alert-octagon"></span>Please enter  a valid  email  address</div>
                <div v-if="undefined_email" class="pt-3 txt-wrong-email"><span class="mdi mdi-alert-octagon"></span>Couldn’t find  your email</div>
                <div class="pt-5 font-Bai-Jamjuree"><input  @click="send_email"  class="btn-send_email" type="button" value="Send link to E-mail"></div>
                <div @click="btn_back" class="txt-back pt-5 font-Bai-Jamjuree">back</div>
         </div>
         <div v-if="stepForgot == 2" style="display: contents;">
               <div class="pt-5 txt-detail font-Bai-Jamjuree">E-mail send</div>
                <div class="txt-detail2 font-Bai-Jamjuree">Check your email and open link we sent to continue</div>
                <div class="pt-5 font-Bai-Jamjuree">
                </div>
                <div v-if="invalid_email" class="pt-3 txt-wrong-email"><span class="mdi mdi-alert-octagon"></span>Please enter  a valid  email  address</div>
                <div v-if="undefined_email" class="pt-3 txt-wrong-email"><span class="mdi mdi-alert-octagon"></span>Couldn’t find  your email</div>
                <div class="pt-5 font-Bai-Jamjuree"><input  @click="goWeb('http://www.gmail.com')"  class="btn-send_email" type="button" value="Check your e-mail"></div>
         </div>
         <div v-if="stepForgot == 3" style="">
              <div style="font-weight: 400;font-size: 16px;" class="font-Bai-Jamjuree">New Password <span style="color:red">*</span></div>
              <div class="pt-3"> <input :style="{'border': invalid_email || undefined_email ? '2px solid red' : '' }" v-model="txt_email" placeholder="" class="pl-5 inp-username" type="text" name="email" id="email"></div>
              <div  style="font-weight: 400;font-size: 16px;" class="pt-10 font-Bai-Jamjuree">Confirm Password <span style="color:red"> *</span></div>
              <div class="pt-3"> <input :style="{'border': invalid_email || undefined_email ? '2px solid red' : '' }" v-model="txt_password" placeholder="" class="pl-5 inp-password" type="password" name="password" id="password"></div>
              <div  style="font-weight: 400;font-size: 16px;" class="pt-10 font-Bai-Jamjuree">Captcha <span style="color:red"> *</span></div>
              <div class="pt-3" style="display: flex;width:100%">

                 <div style="width: 70%;"><input :style="{'border': invalid_email || undefined_email ? '2px solid red' : '' }" v-model="txt_captchar" placeholder="" class="pl-5 inp-captcha" type="text" name="captchar" id="captchar"></div>
                 <div style="width: 25%;">
                    <vue-captcha 
                    ref="captcha" 
                    :captcha.sync="code"
                    @on-change="handleChange">
                    </vue-captcha>
                </div>
                 <div style="height: 50%;cursor: pointer;display: flex;margin:10px; align-items:center;background-color:#fff;width: 5%;"><span  @click="refresh" class="mdi-rotate-135  mdi mdi-sync"></span></div>
              </div>
              <div class="pt-10"><input  @click.prevent="conf()" class="btn-comfirm font-Bai-Jamjureef" type="button" value="Comfirm"></div>
          </div>
       
<!-- --- -->
      </div>
      <div style="padding: 0 30px 0 0;height:5%;"><footers /></div>
    </div>  
  </div>
</div>

</template>

<script>

import Footers from '@/components/Footer'
import VueCaptcha from 'vue-captcha-code';
import Vue from "vue";
import { tickStep } from 'd3-array'
import { Verify } from 'crypto';


export default {
  name: 'forgot',
  data () {
    return {
      tranformScale:'',
      txt_email:'',
      invalid_email:false,
      undefined_email:false,
      screen_Width:'',
      screen_Hight:'',
      txt_email:'',
      txt_password:'',
      txt_captchar:'',
      code:'',
    }
  },
  computed: {
    loc_email_forgot(){
      return Vue.localStorage.get('loc_email_forgor')
    },
    val_email(){
      try { 
          return window.atob(String(this.$route.query.email))
      }
          catch(err) {
           return 'err'
      }
    },
    stepForgot(){
      return Vue.localStorage.get('ACTION_FORGOT_STEP')
    },
    forgot_status(){
      return this.$store.getters.forgot_status
    },
   
  },
  watch: {},
  methods: {

     handleChange(code) {
      console.log('code: ', code);
    },
    refresh() {
      this.$refs.captcha.refreshCaptcha();
    },
    onResize () {

      let x = window.innerWidth
      let y = window.innerHeight
      this.screen_Width = (x)-(x*0.5)+'px'
      this.screen_Hight = (y)-(y*0.10)+'px'
      if (x <= 375) {
        this.tranformScale = 'scale(0.8)'
      } else if (x > 375 && x <= 550) {
        this.tranformScale = 'scale(0.9)'
      } else if (x <= 1110 && x >= 960) {
        this.tranformScale = 'scale(0.8)'
      } else {
        this.tranformScale = 'scale(1)'
      }

    },
    send_email(){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.txt_email)) {

          this.invalid_email = false
          if(this.txt_email === 'piyathat_j@dhas.com'){
            // Vue.localStorage.set('loc_email_forgor','piyathat_j@dhas.com')
            Vue.localStorage.set('ACTION_FORGOT_STEP','2')
            location.reload();
            this.undefined_email = false
          }else {
            this.undefined_email = true
          }
          } else {
            this.invalid_email = true
            // console.log('No')
          }
    },
    goWeb(param){
      window.open(param)
    },
    btn_back(){
      this.$router.push('/')
    }
  },
  components: {Footers,VueCaptcha},
  created () {
    console.log(Vue.config["url"])
    if (Vue.localStorage.get("login") != null || Vue.localStorage.get("ACTION_FORGOT_STEP") == null) {
        this.$router.push('/home')
    } else {
        this.$store.dispatch('checkForgot',this.val_email)
        console.log('==><==',this.stepForgot)
        if(this.val_email != 'err' && this.stepForgot != '3' ){
          
          setTimeout(() => {
              console.log('==> ',this.forgot_status ,this.stepForgot)
            if(this.forgot_status ){
              Vue.localStorage.set('ACTION_FORGOT_STEP','3')
              // location.reload();
            }else {
              // this.$router.push('/home')
            }
           }, 150);


        }else {
          console.log('A')
          // this.$router.push('/home')
        }

    }
  },
  mounted () {
    
  }
}
</script>
<style></style>