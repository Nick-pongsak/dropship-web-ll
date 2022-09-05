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
        <div v-if="stepForgot != 3" class="f-w1000 txt-forgot font-Bai-Jamjuree">ลืมรหัสผ่าน</div>
        <div v-else class="f-w1000 txt-forgot2 font-Bai-Jamjuree">ตั้งรหัสผ่านใหม่</div>

<!-- Enter your E-mail  -->
<!-- {{this.loc_email_forgot}} -->
          <div v-if="stepForgot == 1" style="display: contents;">
               <div class="pt-5 txt-detail-step1 font-Bai-Jamjuree">กรุณากรอกอีเมลที่ทำการลงทะเบียนไว้</div>
                <div class="txt-detail-step1 font-Bai-Jamjuree">เพื่อทำการรีเซ็ตรหัสผ่านใหม่ของคุณ</div>
                <div class="pt-5 font-Bai-Jamjuree">
                  <input  v-bind:class="[Error.errorClassEmail]"  v-model="txt_email" placeholder="ที่อยู่อีเมล" class="pl-5 inp-email" type="text" name="email" id="email">
                </div>
                <div v-if="this.Error.errorClassEmail != ''"  class="txt-wrong">
                              <span class="mdi mdi-alert-octagon"></span>
                              {{this.Error.errorClassEmail_txt}}
                            </div>
                <div class="pt-5 font-Bai-Jamjuree"><input  @click="send_email"  class="font-Bai-Jamjuree btn-send_email" type="button" value="ยืนยัน"></div>
                <div @click="btn_back" class="txt-back pt-5 font-Bai-Jamjuree">กลับหน้าเข้าสู่ระบบ</div>
         </div>
         <div v-if="stepForgot == 2" style="display: contents;">
               <div class="pt-5 txt-detail font-Bai-Jamjuree">ส่งไปแล้วที่อีเมล :   <span style="font-weight: lighter;text-decoration: underline;color:#0085D1;">{{this.emailForgot}}</span></div>
                <div class="pt-10- txt-detail2 font-Bai-Jamjuree">กรุณาตรวจสอบที่อีเมลของท่าน</div>
              <div class="pt-10 font-Bai-Jamjuree"><input @click="btn_back"    class="btn-send_email" type="button" value="กลับหน้าเข้าสู่ระบบ"></div>
             
              <div style="font-size:15px" class="pt-10 font-Bai-Jamjuree">
                กรุณาคลิกลิงค์ที่อีเมลภายในระยะเวลา   15   นาที 
              </div>
              <div style="font-size:15px" class="font-Bai-Jamjuree">
                หากเลยกำหนดเวลาไปแล้ว ลิงค์ดังกล่าวจะไม่สามารถใช้ได้ 
              </div>
              <div style="font-size:15px" class="font-Bai-Jamjuree">
                กรุณาดำเนินการกรอกอีเมลใหม่อีกครั้งเพื่อทำการขอยืนยันใหม่
              </div>
         </div>
         
         <div v-if="stepForgot == 3" style="">
              <div style="font-weight: 400;font-size: 16px;" class="font-Bai-Jamjuree">รหัสผ่านใหม่ <span style="color:red">*</span></div>
             
              
              <div class="pt-3"> 
                <md-field :md-toggle-password="false" v-bind:class="[Error.errorClassNewPwd]" :style="{'border': this.Error.errorClassNewPwd_txt != ''  ? '2px solid red' : '' }" style="top:0 ; left:0" class="inp-new-username">
                  <md-input type="password" v-model="txt_new_password"   style="font-size:28px;height:100%" ></md-input>
                  <span :style="{'color':this.Error.errorClassNewPwd_txt != '' ? 'red' :'#1D4ED8'}" v-if="this.Error.errorClassNewPwd_txt != ''" class="md-suffix">
                    <span v-if="this.Error.errorClassNewPwd_txt != '' " style="margin:0 10px 0 0" class="mdi-24px mdi mdi-window-close"></span>
                    <span v-else style="margin:0 10px 0 0" class="mdi-24px mdi mdi-check"></span>
                  </span>
                </md-field> 
                
                  <div v-if="this.Error.errorClassNewPwd_txt != ''">
                   <div  class="txt-wrong2">
                         <span class="mdi mdi-alert-octagon"></span>
                      {{this.Error.errorClassNewPwd_txt}}
                    </div>
                </div>
              </div>
              <div v-if="err_new_password " class="pt-3 txt-wrong-new-password"> <span class="mdi mdi-alert-octagon"></span> Please enter your password more than 6 characters and </div>
              <div v-if="err_new_password " class="txt-wrong-new-password"> use both of number and alphabet</div>

              <div  style="font-weight: 400;font-size: 16px;" class="pt-5 font-Bai-Jamjuree">ยืนยันรหัสผ่านใหม่<span style="color:red"> *</span></div>
              
              
              <div class="pt-3"> 
                <md-field :style="{'border': err_confirm_password  ? '2px solid red' : '' }" style="top:0 ; left:0" class="inp-new-username">
                  <md-input v-model="txt_confirm_password" @focusout="confirm_password"   style="height:100%" ></md-input>
                  <span :style="{'color':err_confirm_password ? 'red' :'#1D4ED8'}" v-if="txt_check_confirm_password" class="md-suffix">
                    <span v-if="err_confirm_password" style="margin:0 10px 0 0" class="mdi-24px mdi mdi-window-close"></span>
                    <span v-else style="margin:0 10px 0 0" class="mdi-24px mdi mdi-check"></span>
                  </span>
                </md-field> 
                <!-- <input :style="{'border': invalid_email || undefined_email ? '2px solid red' : '' }" v-model="txt_password" placeholder="" class="pl-5 inp-password" type="password" name="password" id="password"> -->
                
                </div>
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
              <div class="pt-10"><input  @click.prevent="confirm()" class="btn-comfirm font-Bai-Jamjureef" type="button" value="ยืนยัน"></div>
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
      txt_new_password:'',
      invalid_email:false,
      undefined_email:false,
      screen_Width:'',
      screen_Hight:'',
      txt_email:'',
      txt_password:'',
      txt_confirm_password:'',
      txt_captchar:'',
      code:'',
      txt_check_new_password:false,
      txt_check_confirm_password:false,
      err_new_password:false,
      err_confirm_password:false,

      Error:{  
      errorClassEmail:'',
      errorClassEmail_txt:'',
      errorClassNewPwd:'',
      errorClassNewPwd_txt:'',
      errorClassConfNewPwd:'',
      errorClassConfNewPwd_txt:'',
    },


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
    emailForgot(){
      return Vue.localStorage.get('EMAIL-FORGOT')
    }
  },
  watch: {},
  methods: {
    confirm(){
      let inp1 =  this.checkErrorCase('inp-new-password' ,this.txt_new_password )
      console.log(inp1)
      },
        confirm_password(){
           console.log(this.err_new_password ,this.txt_new_password.length)
            if(this.err_new_password == false && this.txt_new_password.length != 0){
              if(this.txt_new_password != '' && this.txt_confirm_password != '' ){
                    this.txt_check_confirm_password = true
                if(this.txt_new_password == this.txt_confirm_password ){
                    this.err_confirm_password = false
                }else {
                    this.err_confirm_password = true          
                 }
                        console.log('check conf')
              }else {
                 this.txt_check_confirm_password = false
              }
            }
        },
     handleChange(code) {
      console.log('code: ', code);
    },
    refresh() {
      this.$refs.captcha.refreshCaptcha();
    },
    onResize () {

      let x = window.innerWidth
      let y = window.innerHeight

      console.log(x , y)
      this.screen_Width = (x)-(x*0.5)+'px'
      this.screen_Hight = (y)-(y*0.10)+'px'
      if (x <= 375) {
        this.tranformScale = 'scale(0.6)'
      } else if (x > 375 && x <= 550) {
        this.tranformScale = 'scale(0.6)'
      } else if (x <= 1110 && x >= 960) {
        this.tranformScale = 'scale(0.6)'
      } else {
        this.tranformScale = 'scale(1)'
      }
    },
    syntaxEmail(email){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
          } else {
            return false
          }
    },
    syntaxPassword(password){
      var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{7,}$/
      if(regex.test(password)){
        return true
      }else {
        return false
      }
    } ,
    send_email(){
      let in1 =  this.checkErrorCase( 'inp-email' , this.txt_email)
        if(in1){
          this.$store
              .dispatch('checkEmail',this.txt_email)
              .then(res => {
                  console.log(res.success.data)
                  if(res.success.data.length == 0){
                    this.Error.errorClassEmail = 'error-case',
                    this.Error.errorClassEmail_txt = this.$t('txt-wrong6')
                  }else {
                    Vue.localStorage.set('EMAIL-FORGOT',this.txt_email)
                    Vue.localStorage.set('ACTION_FORGOT_STEP',2)
                    location.reload();
                    this.Error.errorClassEmail = '',
                    this.Error.errorClassEmail_txt = ''
                  }
                })
                .catch(error => { 
                  // console.log(error.response.status)
                
                })
        }
    },
    checkErrorCase( type , value){

      if(type == 'inp-email'){
        if(value == null || value == ''){
          this.Error.errorClassEmail = 'error-case',
          this.Error.errorClassEmail_txt = this.$t('txt-wrong11')
          return false
        }else if(!this.syntaxEmail(value)) {
          this.Error.errorClassEmail = 'error-case',
          this.Error.errorClassEmail_txt = this.$t('txt-wrong5')
          return false
        }else {
          this.Error.errorClassEmail = '',
          this.Error.errorClassEmail_txt = ''
          return true
        }
      }

      if(type == 'inp-new-password'){
              if(value == null || value == ''){
                this.Error.errorClassNewPwd = 'error-case'
                this.Error.errorClassNewPwd_txt = this.$t('txt-wrong11')
                return false
              }else if(!this.syntaxPassword(value)){
                this.Error.errorClassNewPwd = 'error-case'
                this.Error.errorClassNewPwd_txt = this.$t('txt-wrong10')
                return false
              }else {
                this.Error.errorClassNewPwd = ''
                this.Error.errorClassNewPwd_txt = ''
                return true
              }
         }

    },
    goWeb(param){
      window.open(param)
    },
    btn_back(){
      this.$router.push('/')
    },
    moustout(){
      console.log('Test Method')
    }
  },
  components: {Footers,VueCaptcha},
  created () {
    // console.log(Vue.config["url"])
    if (Vue.localStorage.get("login") != null || Vue.localStorage.get("ACTION_FORGOT_STEP") == null) {
        this.$router.push('/home')
    } else {
        // this.$store.dispatch('checkForgot',this.val_email)
        // // console.log('==><==',this.stepForgot)
        // if(this.val_email != 'err' && this.stepForgot != '3' ){
          
        //   setTimeout(() => {
        //       // console.log('==> ',this.forgot_status ,this.stepForgot)
        //     if(this.forgot_status ){
        //       Vue.localStorage.set('ACTION_FORGOT_STEP','3')
        //       // location.reload();
        //     }else {
        //       // this.$router.push('/home')
        //     }
        //    }, 150);
        // }else {
        //   // console.log('A')
        //   // this.$router.push('/home')
        // }

    }
  },
  mounted () {
    
  }
}
</script>
<style>
</style>