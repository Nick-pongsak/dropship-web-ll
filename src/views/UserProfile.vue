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
                <div class="detail" style="">{{this.profile.sup_id}}</div>
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
                  'background-color':isDisabled || input_cheang_password? '#DADADA':'#fff'}"
                :disabled="isDisabled || input_cheang_password" v-model="profile.email"  class="input-style">
              <div v-if="this.wrong.invalid_email" class="txt-wrong"><span class="mdi mdi-alert-octagon"></span>Please enter  a valid  email  address</div>
            
            </div>
            </div>
        </b-col>
         <b-col> 
          <div class="md-layout">
              <div class="head">ชื่อบริษัท <span style="color:red">*</span></div>
              <div class="detail">
                <input 
                :style="{'background-color':isDisabled || input_cheang_password? '#DADADA':'#fff'}"
                :disabled="isDisabled || input_cheang_password" v-model="profile.company" class="input-style">
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
                    <md-input  :disabled="true" class="input-style"   :type="type_password" v-model="profile.password"></md-input>
                <div v-if="isDisabled ">
                  <span v-if=" type_password == 'password'" style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('password')"  class="md-suffix mdi mdi-eye-off"></span>
                  <span v-else style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('password')" class="md-suffix mdi mdi-eye"></span>
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
                <md-field :md-toggle-password="false" :style="{'background-color':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input autocomplete="off"  class="input-style" type="text" v-model="profile.use_password"></md-input>
                </md-field>
               </div>
            </div>
        </b-col>
         <b-col> 
           <div class="md-layout">
              <div class="head">เบอร์โทรศัพท์<span style="color:red">*</span></div>
              <div class="detail" >
                <input 
                :style="{'background-color':isDisabled || input_cheang_password? '#DADADA':'#fff'}"
                :disabled="isDisabled || input_cheang_password" v-model="profile.tel" class="input-style">
              </div>
            </div>
         </b-col>
        </b-row>

        <b-row>
          <b-col  xl>
           <div v-if="input_cheang_password"  class="md-layout">
              <div class="head">รหัสผ่านใหม่ <span style="color:red">*</span></div>
              <div class="detail">

                 <md-field :md-toggle-password="false" :style="{'background-color':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input  class="input-style"   :type="type_new_password" v-model="profile.new_password"></md-input>
                <div v-if="profile.new_password != ''">
                  <span v-if=" type_new_password == 'password'" style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('newPassword')"  class="md-suffix mdi mdi-eye-off"></span>
                  <span v-else style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('newPassword')" class="md-suffix mdi mdi-eye"></span>
                 </div>
                </md-field>
              </div>
            </div>
            <div v-else class="md-layout">
              <div class="head">ชื่อ <span style="color:red">*</span></div>
              <div class="detail">
                 <input 
                 :style="{'background-color':isDisabled || input_cheang_password? '#DADADA':'#fff'}"
                 :disabled="isDisabled || input_cheang_password" v-model="profile.first_name" class="input-style">
              </div>
            </div>
        </b-col>
         <b-col> 
           <div class="md-layout">
              <div class="head">เบอร์โทรศัพท์สำรอง</div>
              <div class="detail" >
                <input 
                :style="{'background-color':isDisabled || input_cheang_password? '#DADADA':'#fff'}"
                :disabled="isDisabled || input_cheang_password" v-model="profile.tel2" class="input-style">
              </div>
            </div>
         </b-col>
        </b-row>

        <b-row>
          <b-col  xl>
            <div v-if="input_cheang_password" class="md-layout">
              <div class="head">ยืนยันรหัสผ่าน <span style="color:red">*</span></div>
              <div class="detail">

                 <md-field :md-toggle-password="false" :style="{'background-color':isDisabled? '#DADADA':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input  class="input-style"   :type="type_confrim_new_password" v-model="profile.confrim_new_password"></md-input>
                <div v-if="profile.confrim_new_password != ''">
                  <span v-if=" type_confrim_new_password == 'password'" style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('confrimNewPassword')"  class="md-suffix mdi mdi-eye-off"></span>
                  <span v-else style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('confrimNewPassword')" class="md-suffix mdi mdi-eye"></span>
                 </div>
                </md-field>
                 </div>
            </div>
            <div v-else class="md-layout">
              <div class="head">นามสกุล <span style="color:red">*</span></div>
              <div class="detail">
                 <input 
                 :style="{'background-color':isDisabled || input_cheang_password? '#DADADA':'#fff'}"
                 :disabled="isDisabled || input_cheang_password" v-model="profile.last_name" class="input-style">
              </div>
            </div>
        </b-col>
         <b-col> 
           <div style="display: flex;align-items: flex-start;" class="md-layout">
              <div  class="head">ที่อยู่ <span style="color:red">*</span></div>
                <div class="detail" >
                  <textarea :disabled="true" :style="{'background-color':'#DADADA'}" :value="profile.address" style="border-radius: 8px;min-height:100px;width: 100%;padding:5px;"   name="w3review" rows="4">
                
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
                 :disabled="isDisabled || input_cheang_password" v-model="profile.last_name" class="input-style">
              </div>
            </div>
        </b-col>
         <b-col> 
           <!-- <div class="md-layout">
              <div class="head">เบอร์โทรศัพท์</div>
              <div class="detail" >
                <input 
                :style="{'background-color':isDisabled? '#DADADA':'#fff'}"
                :disabled="isDisabled" v-model="profile.tel" class="input-style">
              </div>
            </div> -->
         </b-col>
        </b-row>

        <b-row>
          <b-col xl>
             <div v-if="input_cheang_password" class="md-layout">
              <div class="head">นามสกุล <span style="color:red">*</span></div>
              <div class="detail">
                 <input 
                 :style="{'background-color':isDisabled || input_cheang_password? '#DADADA':'#fff'}"
                 :disabled="isDisabled || input_cheang_password" v-model="profile.last_name" class="input-style">
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
      <!-- <b-container style="font-family:'Bai Jamjuree', sans-serif" class=" accentbv-example-row">
      <b-row >
        <b-col  style="" xl>
        <div class="btn-filter">Profile</div>
        </b-col>
      </b-row>

      <b-row >
        <b-col  xl>
          <div  class="md-layout">
            <div class="head">Supplier ID</div>
            <div class="detail" style="">{{this.profile.sup_id}}</div>
          </div>
        </b-col>
         <b-col xl v-if="windowSize > 1200"></b-col>
      </b-row>

      <b-row>
        <b-col xl>
          <div class="md-layout">
            <div class="head">
                อีเมล
            </div>
            <div class="detail">
                <input 
                :style="{'background-color':isDisabled? '#DADADA':'#fff'}"
                :disabled="isDisabled" v-model="profile.email"  class="input-style">
            </div>
          </div>
        </b-col>
        <b-col  xl>
            <div v-if="!input_cheang_password" class="md-layout">
              <div class="head">รหัสผ่าน</div>
              <div class="detail">
                <md-field :md-toggle-password="false" :style="{'background-color':isDisabled? '#DADADA':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input  :disabled="true" class="input-style"   :type="type_password" v-model="profile.password"></md-input>
                <div v-if="isDisabled ">
                  <span v-if=" type_password == 'password'" style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('password')"  class="md-suffix mdi mdi-eye"></span>
                  <span v-else style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('password')" class="md-suffix mdi mdi-eye-off"></span>
                 </div>

                 <div style="display: flex;"  v-else>
                  <span @click="cheang_password" style="display: flex;padding:0 10px 0 0;font-size:12px;align-items: center;cursor: pointer;" >เปลี่ยน</span>
                 </div>
                </md-field>
                
               </div>
            </div>

            <div v-else class="md-layout">
              <div class="head">รหัสผ่านปัจจุบัน</div>
              <div class="detail">
                <md-field :md-toggle-password="false" :style="{'background-color':isDisabled? '#DADADA':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input class="input-style" type="text" v-model="profile.use_password"></md-input>
                </md-field>
               </div>
            </div>


        </b-col>
      </b-row>

      <b-row>
        <b-col xl>
          <div class="md-layout">
              <div class="head">ชื่อ</div>
              <div class="detail">
                 <input 
                 :style="{'background-color':isDisabled? '#DADADA':'#fff'}"
                 :disabled="isDisabled" v-model="profile.first_name" class="input-style">
              </div>
            </div>
        </b-col>
        <b-col xl >
              <div v-if="input_cheang_password" class="md-layout">
              <div class="head">รหัสผ่านใหม่</div>
              <div class="detail">

                 <md-field :md-toggle-password="false" :style="{'background-color':isDisabled? '#DADADA':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input  class="input-style"   :type="type_new_password" v-model="profile.new_password"></md-input>
                <div v-if="profile.new_password != ''">
                  <span v-if=" type_new_password == 'password'" style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('newPassword')"  class="md-suffix mdi mdi-eye"></span>
                  <span v-else style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('newPassword')" class="md-suffix mdi mdi-eye-off"></span>
                 </div>
                </md-field>
              </div>
            </div>

        </b-col>
      </b-row>

      <b-row>
        <b-col  xl>
          <div class="md-layout">
              <div class="head">นามสกุล</div>
              <div class="detail">
                 <input 

                 :style="{'background-color':isDisabled? '#DADADA':'#fff'}"
                 :disabled="isDisabled" v-model="profile.last_name" class="input-style">
              </div>
            </div>
        </b-col>
         <b-col xl >
          <div v-if="input_cheang_password" class="md-layout">
              <div class="head">ยืนยันรหัสผ่าน</div>
              <div class="detail">

                 <md-field :md-toggle-password="false" :style="{'background-color':isDisabled? '#DADADA':'#fff'}" class="input-style"  style="min-height:34px ;margin:0;top:0 ; left:0" >
                    <md-input  class="input-style"   :type="type_confrim_new_password" v-model="profile.confrim_new_password"></md-input>
                <div v-if="profile.confrim_new_password != ''">
                  <span v-if=" type_confrim_new_password == 'password'" style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('confrimNewPassword')"  class="md-suffix mdi mdi-eye"></span>
                  <span v-else style="cursor: pointer;padding:0 10px 0 0;" @click="cheang('confrimNewPassword')" class="md-suffix mdi mdi-eye-off"></span>
                 </div>
                </md-field>
                 </div>
            </div>
         </b-col>
      </b-row>

      <b-row>
        <b-col  xl>
           <div class="md-layout">
              <div class="head">เบอร์โทรศัพท์</div>
              <div class="detail" >
                <input 
                :style="{'background-color':isDisabled? '#DADADA':'#fff'}"
                :disabled="isDisabled" v-model="profile.tel" class="input-style">
              </div>
            </div>
        </b-col>
         <b-col xl v-if="windowSize > 1200"></b-col>
      </b-row>

      <b-row>
        <b-col   xl>
          <div class="md-layout">
              <div class="head">บริษัท</div>
              <div class="detail">
                <input 
                :style="{'background-color':isDisabled? '#DADADA':'#fff'}"
                :disabled="isDisabled" v-model="profile.company" class="input-style">
              </div>
            </div>
        </b-col>
         <b-col xl v-if="windowSize > 1200"></b-col>
      </b-row>

      <b-row>
        <b-col  
            style="
            display: flex;
            justify-content: flex-end;" xl>
            <div v-if="!isDisabled" @click="cancel" style="cursor: pointer;padding:0 10px 0 0;display: flex;align-items: center;">ยกเลิก</div>
              <v-btn v-if="isDisabled" rounded class="ok" @click="edit()"> แก้ไข</v-btn>
              <v-btn v-else rounded class="ok" @click="save()">บันทึก</v-btn>
        </b-col>
      </b-row>
      </b-container> -->
      <!-- DIALOG 1 -->
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

export default {
  name: 'userprofilepage',
  data () {
    return {
      windowSize:'',
      isDisabled:true, 
      dialog:false,
      dialog_save:false,
      input_cheang_password:false,
      type_password:'password',
      type_new_password:'password',
      type_confrim_new_password:'password',
      profile:{
        sup_id:'V52082',
        email:'yoshihisa_y@uni.com',
        password:'UniAdmin1234',
        use_password:'',
        new_password:'',
        confrim_new_password:'',
        first_name:'Yuki',
        last_name:'Yoshihisa',
        tel:'81620943322',
        tel2:'',
        company:'Uni Mitsubushi Pencil Official',
        address:'29/1 อาคารปิยะเพลส หลังสวน ชั้น 7 ยูนิต 7ซี ซอยหลังสวน ถนนเพลินจิต แขวงลุมพินี เขตปทุมวัน กรุงเทพมหานคร 10330'
      },
      wrong:{
        invalid_email:false
      }
     
     
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    },
    
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
      if(this.FormatEmail()){
          this.dialog_save = true
          console.log('=> Save')
      }else {
        console.log('อีเมลไม่ถูกต้อง')
      }
     
      console.log('save')
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
     if (Vue.localStorage.get("login") == null) {
      this.$router.replace("/");
    } else {


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

/* Handle on hover */
/* ::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
} */
</style>
