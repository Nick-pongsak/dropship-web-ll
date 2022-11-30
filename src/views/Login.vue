<template>
  <div id="login" v-resize="onResize">
    <div class="md-layout box">
      <div :class="screenDevice == 'desktop' ? 'box-left' : 'box-left-mobile'">
        <div class="f-w800 box-head font-Montserrat">Dropship portal</div>
        <div class="box-login">
          <div :style="{ transform: tranformScale }" class="container-login">
            <div class="f-w700 txt-login font-Bai-Jamjuree">เข้าสู่ระบบ</div>

            <div class="txt-detail pt-5 font-Bai-Jamjuree">อีเมล :</div>
            <div class="pt-1">
              <!-- {{this.screenWidth}} -->
              <input
                @keyup.enter="login"
                v-bind:class="[Error.errorClassEmail]"
                class="inp-login-username font-Bai-Jamjuree"
                type="text"
                v-model="username"
                name="username"
                :style="{
                  border:
                    this.Error.errorClassEmail == '' ? '1px solid #000000' : ''
                }"
              />
              <div
                v-if="
                  this.Error.errorClassEmail != '' &&
                    this.Error.errorClassEmail != 'error-case-red-border'
                "
                class="txt-wrong"
              >
                <span class="mdi mdi-alert-octagon"></span>
                {{ this.Error.errorClassEmail_txt }}
              </div>
              <!-- <div v-if="validateUsername!=null" class="txt-wrong">
              <span class="mdi mdi-alert-octagon"></span>
                {{this.validateUsername}}
            </div> -->
            </div>
            <div class="f-w400 txt-detail pt-5 font-Bai-Jamjuree">
              รหัสผ่าน :
            </div>
            <div class="pt-1">
              <input
                @keyup.enter="login"
                v-bind:class="[Error.errorClassPwd]"
                class="inp-login-password font-Bai-Jamjuree"
                type="password"
                v-model="password"
                name="password"
                :style="{
                  border:
                    this.Error.errorClassPwd == '' ? '1px solid #000000' : ''
                }"
              />
            </div>
            <div v-if="this.Error.errorClassPwd != ''" class="txt-wrong">
              <span class="mdi mdi-alert-octagon"></span>
              {{ this.Error.errorClassPwd_txt }}
            </div>
            <div class="pt-5">
              <input
                @click.prevent="login()"
                class="btn-login font-Bai-Jamjureef"
                type="button"
                value="เข้าสู่ระบบ"
              />
            </div>
            <div class="txt-forgot pt-3 font-Bai-Jamjuree">
              <span
                style="cursor: pointer;"
                @click.prevent="forgot('forgotpassword')"
                >ลืมรหัสผ่าน ?</span
              >
            </div>
          </div>
        </div>
        <div class="box-footer">
          <footers
            :style="{
              'font-size': screenDevice === 'desktop' ? '14px' : '10px'
            }"
            text="Copyright © 2019 DHA Siamwalla Ltd."
          />
        </div>
      </div>
      <div class="box-right">
        <img
          :style="{ left: screenWidth * 0.5 + 'px' }"
          v-if="screenDevice === 'desktop'"
          class="img-login"
          src="@/assets/images/person-login.png"
        />
      </div>
    </div>

    <v-dialog
      v-model="dialogPdpa"
      persistent
      max-width="100%"
      style="height:100%"
      id="dialogCinfrim"
    >
      <v-card style="padding: 0;">
        <div class="body">
          <div
            class="sticky-top"
            :style="{
              'text-align': 'end',
              width: '100%',
              'padding-right': '30px',
              'padding-top': '20px'
            }"
            @click="dialogPdpa = false"
          >
            <v-icon
              v-text="'mdi-close'"
              style="color:#000000;cursor:pointer"
              size="24"
            ></v-icon>
          </div>
          <div :style="{ width: '100%', 'text-align': 'center' }">
            <img class="img-login" src="@/assets/pdf/PDPA-1.png" />
            <img class="img-login" src="@/assets/pdf/PDPA-2.png" />
            <img class="img-login" src="@/assets/pdf/PDPA-3.png" />
            <img class="img-login" src="@/assets/pdf/PDPA-4.png" />
            <img class="img-login" src="@/assets/pdf/PDPA-5.png" />
            <img class="img-login" src="@/assets/pdf/PDPA-6.png" />
            <img class="img-login" src="@/assets/pdf/PDPA-7.png" />
          </div>
        </div>

        <!-- <v-card-text  style="padding: 0;" >
          <v-container style="" >
            <div style="margin:10px 20px 0 0;display: flex;justify-content: flex-end;">
              <v-icon
              @click="close_PDPA"
                v-text="'mdi-close'"
                style="color:#000000;cursor:pointer"
                size="24">
              </v-icon>
            </div>
        <img  class="img-login" src="@/assets/pdf/PDPA-1.png">
          <img  class="img-login" src="@/assets/pdf/PDPA-2.png">
          <img  class="img-login" src="@/assets/pdf/PDPA-3.png">
          <img  class="img-login" src="@/assets/pdf/PDPA-4.png">
          <img  class="img-login" src="@/assets/pdf/PDPA-5.png">
          <img  class="img-login" src="@/assets/pdf/PDPA-6.png">
          <img  class="img-login" src="@/assets/pdf/PDPA-7.png">
          </v-container>
        </v-card-text> -->
      </v-card>
    </v-dialog>

    <v-snackbar
      style="padding:0;margin:4.5% 0 0 0;"
      v-model="snackbar"
      :multi-line="multiLine"
      :color="color"
      :timeout="timeout"
    >
      <div
        style="
        align-items:center;
        justify-content: center;
        background-color:#EFF6FF;
        font-family: 'Bai Jamjuree', sans-serif;
        border-radius: 4px;
        height: 100%;"
        class="md-layout"
      >
        <div
          style="display: flex;justify-content: center;align-items: center;font-size:1em;color:#000;height:100%;width:95%;"
        >
          เว็บไซต์มีการเก็บข้อมูลความเป็นส่วนบุคคล
          เพื่อใช้อ้างอิงการดำเนินกิจกรรมของเว็ปไซต์
          ทั้งนี้สามารถอ่านข้อมูลเพิ่มเติมได้ที่
          <span
            @click="dialogPdpa = true"
            style="text-decoration: underline;color:#0085D1;cursor: pointer;margin:0 0 0 10px;"
            href=""
            >นโยบายความเป็นส่วนตัว</span
          >
        </div>

        <div style="width:5%;">
          <v-icon
            @click="snackbar = false"
            v-text="'mdi-close'"
            style="color:#000000;cursor:pointer"
            size="24"
          ></v-icon>
        </div>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
// var CryptoJS = require('crypto-js')
import Vue from 'vue'
import Footers from '@/components/Footer'
var CryptoJS = require('crypto-js')
export default {
  name: 'login',
  components: { Footers },
  data () {
    return {
      multiLine: true,
      snackbar: true,
      textSnack: '',
      color: '#fff',
      timeout: 9999999,

      dialogPdpa: false,
      validateUsername: null,
      validatePassword: null,
      validate: null,
      activeClassUs: '',
      errorClassUs: false,
      activeClassPwd: '',
      errorClassPwd: false,
      username: '',
      password: '',
      wrong: false,
      tranformScale: '',
      screenWidth: '',
      screenHeight: '',
      screenDevice: '',

      Error: {
        errorClassEmail: '',
        errorClassEmail_txt: '',
        errorClassPwd: '',
        errorClassPwd_txt: ''
      }
    }
  },
  methods: {
    login () {

      if(this.username == '' &&  this.password == ''){
         this.Error.errorClassEmail = 'error-case-red-border'
         this.Error.errorClassPwd = 'error-case'
         this.Error.errorClassPwd_txt = this.$t('txt-wrong1')
      }else {

        let inp1 = this.checkErrorCase('inp-email', this.username)
        let inp2 = this.checkErrorCase('inp-password', this.password)

        if (inp1 && inp2) {
          var pwd = this.password
          let keyapp = 'DropShipSecretKey'
          var encrypted = CryptoJS.AES.encrypt(pwd, keyapp)

          let result = {
            username: this.username,
            password: encodeURI(encrypted)
          }

          this.$store
            .dispatch('Login', result)
            .then(res => {
              let data = res.success.data
              if (data.user_role == 'user') {
                this.$router.push('/' + 'home')
              } else if (data.user_role == 'admin') {
                this.$router.push('/' + 'adminHome')
              } else {
              this.$router.push('/' + 'home')
              // this.wrong = true
            }
          })
          .catch(error => {
            if (error && error.response && error.response.status === 400) {
              // this.errorClassUs = 'border-wrong'
              // this.errorClassPwd = 'border-wrong'
              // this.validate  = this.$t('txt-wrong3')
              this.Error.errorClassEmail = 'error-case-red-border'
              this.Error.errorClassPwd = 'error-case'
              this.Error.errorClassPwd_txt = this.$t('txt-wrong3')

              // this.error = true
            }
          })
      }
      }



      // if(this.username.length == 0 && this.password.length == 0){
      //   this.validate = this.$t('txt-wrong1')
      //   this.errorClassUs = false
      //   this.errorClassPwd = 'border-wrong'
      //   this.activeClassPwd =''
      // }else

      // if (this.username.length == 0) {

      //     this.validateUsername = null
      //     this.validate = this.$t('txt-wrong1')
      //     this.errorClassUs = 'border-wrong'
      //     this.activeClassUs =''

      // } else  if(this.password.length == 0){
      //   this.validate = this.$t('txt-wrong1')
      //   this.errorClassUs = false
      //   this.errorClassPwd = 'border-wrong'
      //   this.activeClassPwd =''
      // } else {
      //   this.errorClassPwd = false

      //   if(this.forMatEmail(this.username)){
      //       this.errorClassUs = false
      //       this.validateUsername  = null
      //       this.validate  = null

      //       var pwd = this.password
      //       let keyapp = 'DropShipSecretKey'
      //       var encrypted = CryptoJS.AES.encrypt(pwd, keyapp)

      //       let result = {
      //         username: this.username,
      //         password: encodeURI(encrypted)
      //       }
      //       this.$store
      //         .dispatch('Login', result)
      //         .then(res => {
      //           let data = res.success.data
      //           if (data.user_role == 'user') {
      //             this.$router.push('/' + 'home')
      //           } else if (data.user_role == 'admin') {
      //             this.$router.push('/' + 'adminHome')
      //           } else {
      //             this.$router.push('/' + 'home')
      //             // this.wrong = true
      //           }
      //         })
      //         .catch(error => {
      //           if (error && error.response && error.response.status === 400) {

      //             this.errorClassUs = 'border-wrong'
      //             this.errorClassPwd = 'border-wrong'
      //             this.validate  = this.$t('txt-wrong3')

      //             // this.error = true
      //           }
      //         })
      //   }else {
      //     this.validateUsername = this.$t('txt-wrong2')
      //     this.validate = null
      //     this.errorClassUs = 'border-wrong'
      //     this.activeClassUs =''
      //       console.log('No !!')
      //   }

      // }
    },
    checkErrorCase (type, value) {
      // console.log(type , '==> ',value)
      if (type == 'inp-email') {
        if (value == null || value == '') {
          this.Error.errorClassEmail = 'error-case'
          if (this.password == null || this.password == '') {
            this.Error.errorClassEmail_txt = this.$t('txt-wrong11')
          } else {
            this.Error.errorClassEmail_txt = this.$t('txt-wrong4')
          }
          return false
        } else if (!this.syntaxEmail(value)) {
          this.Error.errorClassEmail = 'error-case'
          this.Error.errorClassEmail_txt = this.$t('txt-wrong5')
          return false
        } else {
          this.Error.errorClassEmail = ''
          this.Error.errorClassEmail_txt = ''
          return true
        }
      }

      if (type == 'inp-password') {
        if (value == null || value == '') {
          this.Error.errorClassPwd = 'error-case'
          if (this.username == null || this.username == '') {
            this.Error.errorClassPwd_txt = this.$t('txt-wrong11')
          } else {
            this.Error.errorClassPwd_txt = this.$t('txt-wrong15')
          }
          return false
        } else {
          this.Error.errorClassPwd = ''
          this.Error.errorClassPwd_txt = ''
          return true
        }
      }
    },
    open_pdpa () {
     
      this.$store.commit('ShowPolicy', true)
    },
    close_PDPA () {
      this.dialogPdpa = false
    },
    forgot () {
      Vue.localStorage.set('ACTION_FORGOT_STEP', '1')
      this.$router.push('/' + 'forgotpassword')
    },
    forMatEmail (param) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(param)) {
        return true
      } else {
        return false
      }
    },
    syntaxEmail (email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
      } else {
        return false
      }
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
    }
  },
  created () {
 

    if (Vue.localStorage.get('login') != null) {
      this.$router.push('/home')
    } else {
      // Vue.localStorage.remove('ACTION_FORGOT_STEP')
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style>
.error-case {
  border: 1px solid red;
  font-size: 12px;
  font-family: 'Bai Jamjuree', sans-serif;
}

.error-case-red-border {
  border: 1px solid red;
  font-size: 12px;
  font-family: 'Bai Jamjuree', sans-serif;
}

.sticky-top {
  position: sticky;
  top: 0;
}
</style>
