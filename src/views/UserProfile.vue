<template>
  <div id="user-profile-page" v-resize="onResize"  >
      <div class="box-1">
          <div  
          :style="{ 
            display: windowSize <= 600 ? '' : 'flex' ,
            width: windowSize <= 600 ? '100%' : '65%'
            }" class="left">
       <b-container style="font-family:'Bai Jamjuree', sans-serif" class=" accentbv-example-row">
        <b-row style="margin-top:10px;" >
          <b-col  style="" xl>
          <div class="btn-filter">Profile</div>
          </b-col>
        </b-row>

          <b-row >
            <b-col  xl>
              <div  class="md-layout">
                <div class="head">Supplier ID</div>
                <div class="detail" style="">{{this.profile.user_id}}</div>
              </div>
            </b-col>
            <b-col xl v-if="windowSize > 1200"></b-col>
      </b-row>

        <b-row>
          <b-col  xl>
           <div class="md-layout">
              <div class="head">อีเมล <span style="color:red">*</span></div>
              <div class="detail">
                <input 
                @input="checkFormat"
                :style="{
                  'border':this.wrong.invalid_email ? '2px solid red': '',
                  'background-color':'#DADADA'}"
                :disabled="true" v-model="this.profile.user_email"  class="input-style">
              <div v-if="this.wrong.invalid_email" class="txt-wrong"><span class="mdi mdi-alert-octagon"></span>Please enter  a valid  email  address</div>
            
            </div>
            </div>
        </b-col>
         <b-col> 
          <div class="md-layout">
              <div class="head">ชื่อบริษัท <span style="color:red">*</span></div>
              <div class="detail">
                <input 
                :style="{'background-color':'#DADADA'}"
                :disabled="true" v-model="this.profile.user_company" class="input-style">
              </div>
            </div>
         </b-col>
        </b-row>

        <b-row>
          <b-col  xl>

             <div v-if="!input_cheang_password" class="md-layout">
              <div class="head">รหัสผ่าน <span style="color:red">*</span></div>
              <div class="detail">
                <md-field :md-toggle-password="false" :style="{'background-color':isDisabled? '#DADADA':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input  :disabled="true" class="input-style"   type="password" v-model="pass"> </md-input>
                <div v-if="isDisabled ">
                  <span  style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('password')"  class="md-suffix mdi mdi-eye-off"></span>
                  <!-- <span  style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('password')" class="md-suffix mdi mdi-eye"></span> -->
                 </div>

                 <div style="display: flex;"  v-else>
                  <span @click="cheang_password" style="display: flex;padding:0 10px 0 0;font-size:12px;align-items: center;cursor: pointer;" >เปลี่ยน</span>
                 </div>
                </md-field>
                
               </div>
            </div>
           <div v-else class="md-layout">
              <div class="head">รหัสผ่านปัจจุบัน <span style="color:red">*</span></div>
              <div class="detail">
                <md-field v-bind:class="[Error.errorClassPwd]" :md-toggle-password="false" :style="{'background-color':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input autocomplete="off"  class="input-style" :type="!this.icon_eye.password ? 'password' : 'text'" v-model="edit_val.val_pass"></md-input>
                    <span v-if="!this.icon_eye.password" @click="HideShow('password')" style="cursor: pointer;padding:0 10px 0 0;" class="md-suffix mdi mdi-eye-off"></span>
                    <span v-else  @click="HideShow('password')" style="cursor: pointer;padding:0 10px 0 0;" class="md-suffix mdi mdi-eye"></span>
                </md-field>
                <div v-if="this.Error.errorClassPwd != ''"  class="txt-wrong">
                      <span class="mdi mdi-alert-octagon"></span>
                      {{this.Error.errorClassPwd_txt}}
                 </div>
               </div>
            </div>
        </b-col>
         <b-col> 
           <div class="md-layout">
              <div class="head">เบอร์โทรศัพท์<span style="color:red">*</span></div>
              <div class="detail" >
                <input 
                :style="{'background-color': '#DADADA'}"
                :disabled="true" v-model="this.profile.user_phone" class="input-style">
              </div>
            </div>
         </b-col>
        </b-row>

        <b-row>
          <b-col  xl>
           <div v-if="input_cheang_password"  class="md-layout">
              <div class="head">รหัสผ่านใหม่ <span style="color:red">*</span></div>
              <div class="detail">

                 <md-field v-bind:class="[Error.errorClassNewPwd]" :md-toggle-password="false" :style="{'background-color':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input  class="input-style"   :type="!this.icon_eye.new_password ? 'password' : 'text'" v-model="edit_val.new_password"></md-input>
                    <span v-if="!this.icon_eye.new_password" @click="HideShow('new_password')" style="cursor: pointer;padding:0 10px 0 0;" class="md-suffix mdi mdi-eye-off"></span>
                    <span v-else  @click="HideShow('new_password')" style="cursor: pointer;padding:0 10px 0 0;" class="md-suffix mdi mdi-eye"></span>
                </md-field>
                <div v-if="this.Error.errorClassNewPwd_txt != ''">
                   <div  class="txt-wrong">
                         <span class="mdi mdi-alert-octagon"></span>
                      {{this.Error.errorClassNewPwd_txt}}
                 </div>
                </div>
              </div>
            </div>
            <div v-else class="md-layout">
              <div class="head">ชื่อ <span style="color:red">*</span></div>
              <div class="detail">
                 <input 
                 :style="{'background-color':'#DADADA'}"
                 :disabled="true" v-model="this.profile.user_name" class="input-style">
              </div>
            </div>
        </b-col>
         <b-col> 
           <div class="md-layout">
              <div class="head">เบอร์โทรศัพท์สำรอง</div>
              <div class="detail" >
                <input 
                :style="{'background-color':'#DADADA'}"
                :disabled="true" v-model="this.profile.user_phone_secendary" class="input-style">
              </div>
            </div>
         </b-col>
        </b-row>

        <b-row>
          <b-col  xl>
            <div v-if="input_cheang_password" class="md-layout">
              <div class="head">ยืนยันรหัสผ่าน <span style="color:red">*</span></div>
              <div class="detail">

                 <md-field v-bind:class="[Error.errorClassConfNewPwd]" :md-toggle-password="false" :style="{'background-color':isDisabled? '#DADADA':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input  class="input-style"   :type="!this.icon_eye.confrim_new_password ? 'password' : 'text'" v-model="edit_val.confrim_new_password"></md-input>
                    <span v-if="!this.icon_eye.confrim_new_password" @click="HideShow('confrim_new_password')" style="cursor: pointer;padding:0 10px 0 0;" class="md-suffix mdi mdi-eye-off"></span>
                    <span v-else  @click="HideShow('confrim_new_password')" style="cursor: pointer;padding:0 10px 0 0;" class="md-suffix mdi mdi-eye"></span>
                </md-field>
                <div v-if="this.Error.errorClassConfNewPwd != ''"  class="txt-wrong">
                     <span class="mdi mdi-alert-octagon"></span>
                     {{this.Error.errorClassConfNewPwd_txt}}
                 </div>
                 </div>
            </div>
            <div v-else class="md-layout">
              <div class="head">นามสกุล <span style="color:red">*</span></div>
              <div class="detail">
                 <input 
                 :style="{'background-color':'#DADADA'}"
                 :disabled="true" v-model="this.profile.user_surname" class="input-style">
              </div>
            </div>
        </b-col>
         <b-col> 
           <div style="display: flex;align-items: flex-start;" class="md-layout">
              <div  class="head">ที่อยู่ <span style="color:red">*</span></div>
                <div class="detail" >
                  <textarea :disabled="true" :style="{'background-color':'#DADADA'}" :value="this.profile.user_address" style="border-radius: 8px;min-height:100px;width: 100%;padding:5px;"   name="w3review" rows="4">
                  </textarea>
                    <!-- <input
                    style="height:100px" 
                    :style="{'background-color':isDisabled? '#DADADA':'#fff'}"
                    :disabled="isDisabled" v-model="profile.address" class="input-style"> -->
                </div>
            </div>
         </b-col>
        </b-row>

        <b-row>
          <b-col  xl>
             <div v-if="input_cheang_password" class="md-layout">
              <div class="head">ชื่อ <span style="color:red">*</span></div>
              <div class="detail">
                 <input 
                 :style="{'background-color':isDisabled || input_cheang_password? '#DADADA':'#fff'}"
                 :disabled="isDisabled || input_cheang_password" v-model="this.profile.user_name" class="input-style">
              </div>
            </div>
        </b-col>
         <b-col> 
         </b-col>
        </b-row>

        <b-row>
          <b-col xl>
             <div v-if="input_cheang_password" class="md-layout">
              <div class="head">นามสกุล <span style="color:red">*</span></div>
              <div class="detail">
                 <input 
                 :style="{'background-color':isDisabled || input_cheang_password? '#DADADA':'#fff'}"
                 :disabled="isDisabled || input_cheang_password" v-model="this.profile.user_surname" class="input-style">
              </div>
            </div>
          </b-col>
          <b-col  
              style="
              display: flex;
              justify-content: flex-end;" xl>
              <div v-if="!isDisabled" @click="cancel" style="cursor: pointer;padding:0 10px 0 0;display: flex;align-items: center;">ยกเลิก</div>
                <v-btn v-if="isDisabled" rounded class="ok" @click="edit()"> แก้ไข</v-btn>
                <v-btn v-else rounded class="ok" @click="save()">บันทึก</v-btn>
          </b-col>
        </b-row>
       </b-container>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="454px">
            <v-card style="border-radius: 40px;padding: 0;">
              <v-card-text  style="border-radius: 40px;padding: 0;" >
                <v-container 
                style="display: flex;
                    border-radius: 40px 40px 0 0;
                      background-color: rgb(236, 241, 255);
                      justify-content: center;
                      font-family: 'Bai Jamjuree', sans-serif 
                      ">
                      <div class="my-layout">
                        <div><img  class="img" src="@/assets/images/lock.png"></div>
                        <div>คุณต้องการ<b>เปลี่ยนรหัสผ่าน</b>ใช่หรือไม่</div>
                      </div>
                      
                </v-container>
              </v-card-text>
              <v-card-actions 
                    style="font-family: 'Bai Jamjuree', sans-serif ; display: flex;
                    justify-content: center;">
                    <button   @click="confrim_dialog('OK')"
                        style="width: 84px;
                          height: 35px;
                          background: #000000;
                          border-radius: 8px;
                          color:#fff;"> ใช่ 
                    </button>
                    <button @click="confrim_dialog('cancel')"
                        style="
                          margin:0 0 0 20px;
                          width: 84px;
                          height: 35px;
                          background: #fff;
                          border-radius: 8px;
                          color:#000;
                          border:2px solid #000;"> ไม่ 
                    </button>
              </v-card-actions>
            </v-card>
        </v-dialog>

      <!-- DIALOG 2  -->
        <v-dialog
            v-model="dialog_save"
            persistent
            max-width="454px">
            <v-card style="border-radius: 40px;padding: 0;">
              <v-card-text  style="border-radius: 40px;padding: 0;" >
                <v-container 
                style="display: flex;
                    border-radius: 40px 40px 0 0;
                      background-color: rgb(236, 241, 255);
                      justify-content: center;
                      font-family: 'Bai Jamjuree', sans-serif ;
                      ">
                      <div   class="my-layout">
                        <div><img style="height:200px;width:200px" class="img" src="@/assets/images/success.png"></div>
                        <div style="color:#000;display: flex;justify-content: center;">แก้ไขข้อมูลส่วนตัวสำเร็จ</div>
                      </div>
                      
                </v-container>
              </v-card-text>
              <v-card-actions 
                    style="font-family: 'Bai Jamjuree', sans-serif ; display: flex;
                    justify-content: center;">
                    <button   @click="confrim_dialog('success')"
                        style="width: 84px;
                          height: 35px;
                          background: #000000;
                          border-radius: 8px;
                          color:#fff;"> ตกลง 
                    </button>
                  
              </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
      v-model="dialog_success"
      persistent
      max-width="454px"
    >
      <v-card style="border-radius: 40px;padding: 0;">
        <v-card-text  style="border-radius:40px;padding: 0;" >
          <v-container 
           style="display: flex;
               border-radius: 40px 40px 0 0;
                background-color: rgb(236, 241, 255);
                justify-content: center;
                font-family: 'Bai Jamjuree', sans-serif 
                ">
                <div class="my-layout">
                  <div><img :style="{'height':'200px','width':'200px' }"  class="img" src="@/assets/images/success.png"></div>
                <div style="color: #000000;font-size: 16px;display: flex;justify-content: center;">บันทึกสำเร็จ</div>
                </div>
                
          </v-container>
        </v-card-text>
        <v-card-actions 
              style="font-family: 'Bai Jamjuree', sans-serif ; display: flex;
              justify-content: center;">
              <button 
              @click="success_()"
              style="width: 84px;
                    height: 35px;
                    background: #000000;
                    border-radius: 8px;
                    color:#fff;
                    "
              > 
                 ตกลง 
              </button>
        </v-card-actions>
      </v-card>
    </v-dialog>


   </div>
          <div :style="{ width: windowSize <= 600 ? '0%' : '35%'}" class="right">
              <img  class="img" src="@/assets/images/user-profile.png">
          </div>
      </div >
      <div class="box-2">
      
        
      </div>
  </div>
</template>

<script>
import Vue from "vue";
var CryptoJS = require('crypto-js')
export default {
  name: 'userprofilepage',
  data () {
    return {
      windowSize:'',
      isDisabled:true, 
      dialog:false,
      dialog_success:false,
      dialog_save:false,
      input_cheang_password:false,
      pass:'999999999',
      type_password:'password',
      type_new_password:'password',
      type_confrim_new_password:'password',
      Error:{  
        errorClassPwd:'',
        errorClassPwd_txt:'',
        errorClassNewPwd:'',
        errorClassNewPwd_txt:'',
        errorClassConfNewPwd:'',
        errorClassConfNewPwd_txt:'',
        errorClassFirstName:'',
        errorClassFirstName_txt:'',
        errorClassLastName:'',
        errorClassLasttName_txt:'',
        errorClassTel:'',
        errorClassTel_txt:'',
        errorClassEmail:'',
        errorClassEmail_txt:''
      },
      edit_val:{
        val_pass:'',
        new_password:'',
        confrim_new_password :''
      },
      icon_eye:{
        password : false,
        new_password:false,
        confrim_new_password:false
      },
      profile:{},
      wrong:{
        invalid_email:false
      }
     
     
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    },
    user_info(){

      return JSON.parse(Vue.localStorage.get('user_profile'))
    }
    
  },
  watch: {},
  methods: {
     onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      this.windowSize = x
      // console.log(x)
    },
    edit(){
      this.type_password = 'text'
      this.isDisabled = false
    },
    save(){
      // console.log(this.edit_val)
     let inp1 = this.checkErrorCase( 'inp-password' ,this.edit_val.val_pass )
     let inp2 = this.checkErrorCase( 'inp-new-password' ,this.edit_val.new_password )
     let inp3 = this.checkErrorCase( 'inp-conf-new-password' ,this.edit_val.confrim_new_password )

     
      if(inp1 && inp2 && inp3){
            let inp4 =   this.checkErrorCase( 'inp-check-conf-pass' ,'')

            if(inp1 && inp2 && inp3 && inp4){

              var pwd = this.edit_val.val_pass
              let keyapp = 'DropShipSecretKey'
              var encrypted = CryptoJS.AES.encrypt(pwd, keyapp)

              var pwd2 = this.edit_val.new_password
              let keyapp2 = 'DropShipSecretKey'
              var encrypted2 = CryptoJS.AES.encrypt(pwd2, keyapp2)

             let res = {
              user_id:this.profile.user_id,
              old_password:encodeURI(encrypted),
              new_password:encodeURI(encrypted2),
            }

            this.$store
              .dispatch('changePassword',res)
              .then(res => {
                // console.log(res)
                this.Error.errorClassPwd = ''
                this.Error.errorClassPwd_txt =''

                this.dialog_success = true
                this.cancel()
                })
                .catch(error => { 
                  if(error.response.status == 400){
                    this.Error.errorClassPwd = 'error-case'
                    this.Error.errorClassPwd_txt = this.$t('txt-wrong9')
                    console.log('Error 400')
                  }
                })


              console.log('OK' , res)
            }else {
              console.log('NOT OK !!')
            }
      }
      // let inp1 =  this.checkErrorCase( 'inp-password' ,this.profile.user_email)
      // if(this.FormatEmail()){
      //     this.dialog_save = true
      //     console.log('=> Save')
      // }else {
      //   console.log('อีเมลไม่ถูกต้อง')
      // }
     
      // console.log('save')
    },
    checkErrorCase( type , value){
      console.log(type , '==> ',value)

      if(type == 'inp-password'){
        if(value == null || value == ''){
          this.Error.errorClassPwd = 'error-case'
          this.Error.errorClassPwd_txt = this.$t('txt-wrong11')
          return false
        }else if(!this.syntaxPassword(value)){
          this.Error.errorClassPwd = 'error-case'
          this.Error.errorClassPwd_txt = this.$t('txt-wrong10')
          return false
        }else {
          this.Error.errorClassPwd = ''
          this.Error.errorClassPwd_txt = ''
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
          return false
        }else if(!this.syntaxPassword(value)){
          this.Error.errorClassConfNewPwd = 'error-case'
          this.Error.errorClassConfNewPwd_txt = this.$t('txt-wrong10')
          return false
        }else {
          this.Error.errorClassConfNewPwd = ''
          this.Error.errorClassConfNewPwd_txt = ''
          return true
        }
      }

      if(type == 'inp-check-conf-pass'){
        if(this.edit_val.new_password != this.edit_val.confrim_new_password){
          this.Error.errorClassConfNewPwd = 'error-case'
          this.Error.errorClassNewPwd = 'error-case'
          this.Error.errorClassConfNewPwd_txt = this.$t('txt-wrong8')
          return false
        }else {
          this.Error.errorClassNewPwd = ''
          this.Error.errorClassConfNewPwd = ''
          this.Error.errorClassConfNewPwd_txt = ''
          return true
        }
      }

    },
    cancel(){
      this.isDisabled = true
      this.input_cheang_password = false
      this.type_password = 'password'
    },
    cheang( param ){

      if(param === 'password'){
         if(this.type_password == 'password'){
        this.type_password = 'text'
        }else{
          this.type_password = 'password'
        }
      }
      if(param === 'newPassword'){
         if(this.type_new_password == 'password'){
        this.type_new_password = 'text'
        }else{
          this.type_new_password = 'password'
        }
      }
      if(param === 'confrimNewPassword'){
         if(this.type_confrim_new_password == 'password'){
        this.type_confrim_new_password = 'text'
        }else{
          this.type_confrim_new_password = 'password'
        }
      }
    },
    cheang_password(){
      this.dialog = true
    },
     HideShow( param ){
      if(param == 'password'){
          if(this.icon_eye.password){
            this.icon_eye.password  = false
          }else {
            this.icon_eye.password  = true
          }
      }

      if(param === 'new_password'){
        if(this.icon_eye.new_password){
            this.icon_eye.new_password  = false
          }else {
            this.icon_eye.new_password  = true
          }
      }
      if(param == 'confrim_new_password'){
        if(this.icon_eye.confrim_new_password){
            this.icon_eye.confrim_new_password  = false
          }else {
            this.icon_eye.confrim_new_password  = true
          }
      }
    },
    confrim_dialog(param){
        this.dialog = false
        if(param == 'OK'){
            this.input_cheang_password = true
            this.profile.use_password = ''
            this.profile.confrim_new_password = ''
            this.profile.new_password = ''
        }else if(param === 'success') {
          this.dialog_save = false
        }else {
        }
    },
      success_(){
      this.dialog_success = false
    },
    checkFormat(){
       if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.profile.email)) {
            console.log('Yes')
          } else {
            console.log('No')
          }
    },
    FormatEmail( ){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.profile.email)) {
           this.wrong.invalid_email = false
           this.setDefault()
           return true
          } else {
            this.wrong.invalid_email = true
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
    setDefault(){

      this.isDisabled=true
      this.dialog=false
      this.dialog_save=false
      this.input_cheang_password=false
      this.type_password='password'
      this.type_new_password='password'
      this.type_confrim_new_password='password'

    },
  },
  components: {},
  created () {

    if (
      this.$store.getters.user_profile === null &&
      sessionStorage.getItem('user_profile') === null
    ) {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    } else if (sessionStorage.getItem('user_profile') !== null) {
      let data = JSON.parse(sessionStorage.getItem('user_profile'))
      if (data.user_role == 'admin') {
        this.$router.push('/' + 'adminHome')
      } else {
        this.profile = JSON.parse(Vue.localStorage.get('user_profile'))
      }
    }
  },
  mounted () {
    
  }
}
</script>
<style>

.v-dialog{
  border-radius:40px ;
}

        /* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background:#d9d9d9;; 
  border-radius: 10px;
}

.error-case{
  border: 1px solid red;
   font-size: 12px;
   font-family:'Bai Jamjuree', sans-serif;
 }
/* Handle on hover */
/* ::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
} */
</style>
