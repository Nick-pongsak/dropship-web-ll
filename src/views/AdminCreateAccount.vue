<template>
    <div id="page-admin" v-resize="onResize"  >
      <div class="box-1">
          <div

            :style="{ 
            display: windowSize <= 600 ? '' : 'flex' ,
            width: windowSize <= 600 ? '100%' : '75%'
            }"
            class="left">

            <b-container style="font-family:'Bai Jamjuree', sans-serif" class=" accentbv-example-row">
        <b-row style="margin-top:10px;" >
          <b-col  style="" xl>
          <div class="btn-filter">Create Account</div>
          </b-col>
        </b-row>

          <b-row >
            <b-col  xl>
              <div  class="md-layout">
                <div class="head">รหัสผู้ใช้งาน</div>
                <div class="detail" style="">V52086</div>
              </div>
            </b-col>
            <b-col>
               <div  class="md-layout">
                <div class="head">ชื่อบริษัท <span style="color:red;">*</span></div>
                <div class="detail" style="">
                <input 
                   v-model="account.company"
                  :style="{
                    'background-color':'#fff',
                    'border': account.company != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
      </b-row>

        <b-row >
            <b-col  xl>
              <div  class="md-layout">
                <div class="head">อีเมล <span style="color:red">*</span></div>
                <div class="detail" style="">
                  <input 
                   v-model="account.email"
                  :style="{
                    'background-color':'#fff',
                    'border': account.email != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
            <b-col>
               <div  class="md-layout">
                <div class="head">รหัสผ่าน <span style="color:red;">*</span></div>
                <div class="detail" style="">
                   <input 
                   :disabled="true"
                   v-model="account.password"
                  :style="{
                    'background-color':'#DADADA',
                    }"
                  class="input-style">
                </div>
              </div>
            </b-col>
      </b-row>

       <b-row >
            <b-col  xl>
              <div  class="md-layout">
                <div class="head">ชื่อ <span style="color:red">*</span></div>
                <div class="detail" style="">
                  <input 
                   v-model="account.frist_name"
                  :style="{
                    'background-color':'#fff',
                    'border': account.frist_name != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
            <b-col>
               <div  class="md-layout">
                <div class="head">นามสกุล <span style="color:red;">*</span></div>
                <div class="detail" style="">
                <input 
                   v-model="account.last_name"
                  :style="{
                    'background-color':'#fff',
                    'border': account.last_name != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
      </b-row>

      <b-row >
            <b-col  xl>
              <div  class="md-layout">
                <div class="head">เบอร์โทรศัพท์ <span style="color:red">*</span></div>
                <div class="detail" style="">
                  <input 
                   v-model="account.tel"
                  :style="{
                    'background-color':'#fff',
                    'border': account.tel != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
            <b-col>
               <div  class="md-layout">
                <div class="head">เบอร์โทรศัพท์อื่น</div>
                <div class="detail" style="">
                <input 
                   v-model="account.tel2"
                  :style="{
                    'background-color':'#fff',
                    'border': account.tel2 != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
      </b-row>

       <b-row style="background-color:" >
            <b-col style="background-color:">
              <div  class="md-layout">
                <div style="width: 10%;" class="head">ที่อยู่ <span style="color:red">*</span></div>
                <div style="width:80%" class="detail">
                  <input 
                   v-model="account.address"
                style="width:   100%"
                  :style="{
                    'background-color':'#fff',
                    'border': account.address != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
          
      </b-row>

       <b-row >
            <b-col  xl>
              <div  class="md-layout">
                <div class="head">จังหวัด <span style="color:red">*</span></div>
                <div class="detail" style="">
                  <input 
                   v-model="account.province"
                  :style="{
                    'background-color':'#fff',
                    'border': account.province != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
            <b-col>
               <div  class="md-layout">
                <div class="head">รหัสไปรณีย์ <span style="color:red;">*</span></div>
                <div class="detail" style="">
                <input 
                   v-model="account.zip_code"
                  :style="{
                    'background-color':'#fff',
                    'border': account.zip_code != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
      </b-row>

       <b-row >
            <b-col  xl>
              <div  class="md-layout">
                <div class="head">แขวง/ตำบล <span style="color:red">*</span></div>
                <div class="detail" style="">
                  <input 
                   v-model="account.province"
                  :style="{
                    'background-color':'#fff',
                    'border': account.province != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
            <b-col>
               <div  class="md-layout">
                <div class="head">เขต/อำเภอ <span style="color:red;">*</span></div>
                <div class="detail" style="">
                <input 
                   v-model="account.zip_code"
                  :style="{
                    'background-color':'#fff',
                    'border': account.zip_code != ''? '2px solid #2372E7' : '' 
                    }"
                   class="input-style">
                </div>
              </div>
            </b-col>
      </b-row>

      <b-row >
            <b-col  xl>
              
            </b-col>
            <b-col>
               <div  class="md-layout">
                <div class="head"></div>
                <div class="detail" style="dwidth:100%;display: flex;justify-content: flex-end;">
                  <div  @click="cancel" style="cursor: pointer;padding:0 30px 0 0;display: flex;align-items: center;">ยกเลิก</div>
                  <v-btn  rounded class="ok" @click="save()">บันทึก</v-btn>
                </div>
              </div>
            </b-col>
      </b-row>

       </b-container>

    
       <!-- DIALOG 1 -->
        <!-- <v-dialog
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
        </v-dialog> -->

      <!-- DIALOG 2  -->
        <!-- <v-dialog
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
        </v-dialog> -->
   </div>
          <div :style="{ width: windowSize <= 600 ? '0%' : '25%'}" style="display: flex;align-items: flex-end;"  class="right">
              <img  class="img" src="@/assets/images/profile-admin.png">
          </div>
      </div >
      <div class="box-2">
      
        
      </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: 'admin-create-acount',
  data () {
    return {
      windowSize:'',
      account:{
        company:'',
        email:'',
        password:'',
        frist_name:'',
        last_name:'',
        tel:'',
        tel2:'',
        address:'',
        province:'',
        zip_code:''
      }
    }
  },
  computed: {
   
  },
  watch: {},
  methods: {
    onResize () {
       let x = window.innerWidth
      let y = window.innerHeight
      this.windowSize = x

    },
    cancel(){},
    save(){},
    random(){
      var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }
        this.account.password = retVal
    }
  },
  components: {},
  created () {
     if (Vue.localStorage.get("login") == null) {
      this.$router.replace("/");
    } else {
      this.random()


    }
  },
  mounted () {}
}
</script>
<style></style>
