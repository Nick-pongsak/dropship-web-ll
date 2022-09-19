<template>
  <!-- <div id="maincorp">
     -->
<div id="Forgotpassword" v-resize="onResize">
    <div style="height:100%"  class="md-layout">
    <div   :class="screenDevice == 'desktop' ? 'box-left' : 'box-left-mobile'" class="f-w800 box-head font-Montserrat">
      <div v-if="screenDevice == 'desktop'" id="" style="height:5%">Dropship portal</div>
      <!-- {{this.screen_Hight}} {{this.screen_Width }} -->
      <div v-if="screenDevice == 'desktop'"  style="height:95%">
        <img v-if="step != 4"    class="img-forgot" src="@/assets/images/person-forgot.png">
        <img style="margin:25px 0 0 0;" v-else :style="{'height': this.screen_Hight,'width':this.screen_Width }"  class="img-forgot" src="@/assets/images/success.png">
      </div>
     
    </div>
    <div :class="screenDevice == 'desktop' ? 'box-right' : 'box-right-mobile'" >
      <div :style="{'transform' : this.tranformScale}" class="box-inp">
        <div v-if="step == 1 || step == 2" class="f-w1000 txt-forgot font-Bai-Jamjuree">ลืมรหัสผ่าน</div>
        <div v-else-if="step == 3" class="f-w1000 txt-forgot2 font-Bai-Jamjuree">ตั้งรหัสผ่านใหม่</div>
        <div v-if="step==4" class="f-w1000 txt-forgot font-Bai-Jamjuree">เปลี่ยนสำเร็จ</div>

<!-- Enter your E-mail  -->
<!-- {{this.loc_email_forgot}} -->
          <div v-if="step == 1" style="display: contents;">
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

         <div v-if="step == 4" style="display: contents;">
               <div class="pt-5 txt-detail-step1 font-Bai-Jamjuree">รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว</div>
                <div class="txt-detail-step1 font-Bai-Jamjuree">ใช้รหัสผ่านใหม่ของคุณเพื่อเข้าสู่ระบบ</div>
                <div class="pt-5 font-Bai-Jamjuree">
                </div>
                <div v-if="this.Error.errorClassEmail != ''"  class="txt-wrong">
                              <span class="mdi mdi-alert-octagon"></span>
                              {{this.Error.errorClassEmail_txt}}
                            </div>
                <div class="pt-5 font-Bai-Jamjuree"><input @click="btn_back"    class="font-Bai-Jamjuree btn-send_email" type="button" value="กลับเข้าหน้าสู่ระบบ"></div>
         </div>

         <div v-if="step == 2" style="display: contents;">
               <div style="display: flex;"  class="pt-5 txt-detail font-Bai-Jamjuree">ส่งไปแล้วที่อีเมล : <span style="padding:0 0 0 1px;font-weight: lighter;text-decoration: underline;color:#0085D1;">{{this.email_step2}}</span></div>
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
         
         <div v-if="step == 3" style="">
              <div style="font-weight: 400;font-size: 16px;" class="font-Bai-Jamjuree">รหัสผ่านใหม่ <span style="color:red">*</span></div>
             
              
              <div class="pt-3"> 
                <md-field :md-toggle-password="false" v-bind:class="[Error.errorClassNewPwd]" :style="{'border': this.Error.errorClassNewPwd_txt != ''  ? '2px solid red' : '' }" style="top:0 ; left:0" class="inp-new-username">
                  <md-input type="password" v-model="txt_new_password"   style="font-size:28px;height:100%" ></md-input>
                  <span :style="{'color':this.Error.errorClassNewPwd_txt != '' ? 'red' :'#1D4ED8'}" v-if="this.submit" class="md-suffix">
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
              <!-- <div v-if="err_new_password " class="pt-3 txt-wrong-new-password"> <span class="mdi mdi-alert-octagon"></span> Please enter your password more than 6 characters and </div>
              <div v-if="err_new_password " class="txt-wrong-new-password"> use both of number and alphabet</div> -->

              <div  style="font-weight: 400;font-size: 16px;" class="pt-5 font-Bai-Jamjuree">ยืนยันรหัสผ่านใหม่<span style="color:red"> *</span></div>
              
              
              <div class="pt-3"> 
                <md-field v-bind:class="[Error.errorClassConfNewPwd]" :md-toggle-password="false" :style="{'border': this.Error.errorClassConfNewPwd_txt  ? '2px solid red' : '' }" style="top:0 ; left:0" class="inp-new-username">
                  <md-input v-model="txt_confirm_password"  type="password"  style="font-size:28px;height:100%" ></md-input>
                  <span :style="{'color':this.Error.errorClassConfNewPwd_txt ? 'red' :'#1D4ED8'}" v-if="this.submit"  class="md-suffix">
                    <span v-if="!err_confirm_password" style="margin:0 10px 0 0" class="mdi-24px mdi mdi-window-close"></span>
                    <span v-else style="margin:0 10px 0 0" class="mdi-24px mdi  mdi-check"></span>
                  </span>
                </md-field> 
                
                <div v-if="this.Error.errorClassConfNewPwd_txt != ''">
                   <div  class="txt-wrong2">
                         <span class="mdi mdi-alert-octagon"></span>
                      {{this.Error.errorClassConfNewPwd_txt}}
                    </div>
                </div>
                <!-- <input :style="{'border': invalid_email || undefined_email ? '2px solid red' : '' }" v-model="txt_password" placeholder="" class="pl-5 inp-password" type="password" name="password" id="password"> -->
                
                </div>
              <div  style="font-weight: 400;font-size: 16px;" class="pt-10 font-Bai-Jamjuree">Captcha <span style="color:red"> *</span></div>
              <div class="pt-3" style="display: flex;width:100%">

                 <div style="width: 70%;"><input v-bind:class="[Error.errorClassCaptchar]" :style="{'border': this.Error.errorClassCaptchar ? '2px solid red' : '' }" v-model="txt_captchar" placeholder="" class="pl-5 inp-captcha" type="text" name="captchar" id="captchar"></div>
                 <div style="width: 25%;">
                    <vue-captcha 
                    ref="captcha" 
                    :captcha.sync="code"
                    @on-change="handleChange">
                    </vue-captcha>
                </div>
                 <div style="height: 50%;cursor: pointer;display: flex;margin:10px; align-items:center;background-color:#fff;width: 5%;"><span  @click="refresh" class="mdi-rotate-135  mdi mdi-sync"></span></div>
              </div>
              <div v-if="this.Error.errorClassCaptchar_txt != ''">
                   <div  class="txt-wrong2">
                         <span class="mdi mdi-alert-octagon"></span>
                      {{this.Error.errorClassCaptchar_txt}}
                    </div>
              </div>
              <div class="pt-10"><input  @click.prevent="confirm()" class="btn-comfirm font-Bai-Jamjureef" type="button" value="ยืนยัน"></div>
          </div>
<!-- --- -->
      </div>
      <div style="padding: 0 30px 0 0;height:5%;">
        <footers  :style="{'font-size': '14px' }" text="Copyright © 2019 DHA Siamwalla Ltd." />
      </div>
    </div>  
  </div>

  <token-dialog
    v-if="tokenExpired"
    ></token-dialog>


</div>

</template>
<script>
const url = `${process.env.VUE_APP_API_URL}${process.env.VUE_APP_API_PORT}`;
import axios from 'axios';
import Footers from '@/components/Footer'
import VueCaptcha from 'vue-captcha-code';
import Vue from "vue";
import { tickStep } from 'd3-array'
var CryptoJS = require('crypto-js')

import TokenDetailDialog from '@/components/dialog/TokenDialog2'


export default {
  name: 'forgot',
  data () {
    return {
      screenDevice:'',
      screenDevice: '',
      tokenExpired:false,
      step:'1',
      submit:false,
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
      email_step2:'',

      Error:{  
      errorClassEmail:'',
      errorClassEmail_txt:'',
      errorClassCaptchar:'',
      errorClassCaptchar_txt:'',
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
    user_id(){ 
          return this.$route.query.user_id
    },
    token(){ 
          return this.$route.query.token
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
      console.log(this.txt_captchar , this.code)
      this.submit = true
      let inp4 = false
      let inp1 =  this.checkErrorCase('inp-new-password' ,this.txt_new_password )
      let inp2 =   this.checkErrorCase( 'inp-conf-new-password' ,this.txt_confirm_password )
      let inp3 =   this.checkErrorCase( 'inp-captchar' ,this.txt_captchar )
      
      if(inp1 && inp2){
         inp4 =   this.checkErrorCase( 'inp-check-conf-pass' ,'' )
      }
      if( inp1 && inp2 && inp3 && inp4 ){

        var pwd = this.txt_new_password
                  let keyapp = 'DropShipSecretKey'
                  var encrypted = CryptoJS.AES.encrypt(pwd, keyapp)

             let res = {
              user_id:this.$route.query.user_id,
              new_password:encodeURI(encrypted),
              user_status:'',
            }
            axios.post(`${url}/apiweb/api/change-pwd-status`, {
              user_id: res.user_id,
              new_password: res.new_password,
              user_status: res.user_status,
            }, {
              headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.$route.query.token}`,
              }
            }).then(response => {
              this.step = 4
            }).catch(error => {
              console.log(error.response.statu)
                  this.tokenExpired  = true
                  if(error.response.status == 400){
                    
                  }
            })
            console.log('OK' ,this.txt_captchar)
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
      this.screenWidth = x
      this.screenHeight = y

      if (x <= 450) {
        this.screenDevice = 'mobile'
      } else {
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
    },
    syntaxEmail(email){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
          } else {
            return false
          }
    },
    syntaxPassword(password){
      var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/
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
              .dispatch('forgotSendEmail',this.txt_email)
              .then(res => {
                  console.log(res.success.data)
                    this.step = 2
                    this.email_step2 = this.txt_email
                    // Vue.localStorage.set('EMAIL-FORGOT',this.txt_email)
                    // Vue.localStorage.set('ACTION_FORGOT_STEP',2)
                    // console.log('Send')
                    // location.reload();
                    this.Error.errorClassEmail = '',
                    this.Error.errorClassEmail_txt = ''
                  
                })
                .catch(error => { 
                    if(error.response.status == 400){
                      this.Error.errorClassEmail = 'error-case',
                      this.Error.errorClassEmail_txt = this.$t('txt-wrong6')
                    }
                 console.log(error.response.status)
                
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

      if(type == 'inp-captchar'){
        console.log('cap')
        if(value == null || value == ''){
          this.Error.errorClassCaptchar = 'error-case',
          this.Error.errorClassCaptchar_txt = this.$t('txt-wrong11')
          return false
        }else if(this.txt_captchar != this.code) {
          console.log('s')
          this.Error.errorClassCaptchar = 'error-case',
          this.Error.errorClassCaptchar_txt = this.$t('txt-wrong13')
          return false
        }else {
          this.Error.errorClassCaptchar = '',
          this.Error.errorClassCaptchar_txt = ''
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

      if(type == 'inp-conf-new-password'){
        if(value == null || value == ''){
          this.Error.errorClassConfNewPwd = 'error-case'
          this.Error.errorClassConfNewPwd_txt = this.$t('txt-wrong11')
          this.err_confirm_password = false
          return false
        }else if(!this.syntaxPassword(value)){
          this.Error.errorClassConfNewPwd = 'error-case'
          this.Error.errorClassConfNewPwd_txt = this.$t('txt-wrong10')
          this.err_confirm_password = false
          return false
        }else {
          this.err_confirm_password = true
          this.Error.errorClassConfNewPwd = ''
          this.Error.errorClassConfNewPwd_txt = ''
          return true
        }
      }

      if(type == 'inp-check-conf-pass'){
        if(this.txt_new_password != this.txt_confirm_password){
          this.Error.errorClassConfNewPwd = 'error-case'
          this.Error.errorClassNewPwd = 'error-case'
          this.Error.errorClassConfNewPwd_txt = this.$t('txt-wrong8')
          this.err_confirm_password = false
          return false
        }else {
          this.Error.errorClassNewPwd = ''
          this.Error.errorClassConfNewPwd = ''
          this.Error.errorClassConfNewPwd_txt = ''
          this.err_confirm_password = true
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
    },
   
  },
  components: {
    'footers' :Footers ,
    VueCaptcha,
    'token-dialog': TokenDetailDialog,
  },
  created () {
    if( this.$route.query.user_id && this.$route.query.token){
      this.$store
              .dispatch('timeTokenForgot',this.$route.query.token)
              .then(res => {
                this.step = 3
                })
                .catch(error => { 
                  console.log(error.response.statu)
                  this.tokenExpired  = true
                  if(error.response.status == 400){
                    
                  }
                })
     
    }
  },
  mounted () {
    
  }
}
</script>
<style>
  .error-case{
         border: 1px solid red;
         font-size: 12px;
         font-family:'Bai Jamjuree', sans-serif;
        }
</style>