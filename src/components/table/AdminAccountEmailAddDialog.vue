
<template>
    <div>
      <v-dialog
        v-model="dialogDetail"
        persistent
        max-width="600"
        max-height="338"
        class="d-dialog"
      >
        <v-card style="border-radius:14px">
          <div v-resize="onResize" id="detail-dialog-admin">
            <div
              class="d-dialog"
              :style="{
                padding:
                  windowSize < 600 ? '0px 5px 10px 0px' : '25px 25px 15px 25px'
              }"
            >
              <div style="width:100%;display:flex">
                <div
                  :style="{
                    padding:
                      windowSize < 600 ? '20px 10px 0px 10px' : '0px 0px 0px 5px',
                    width: '70%'
                  }"
                >
                  <div class="btn-filter-head">Add Email</div>
                </div>
                
              </div>
              <div class="box-detail">
                <b-container
                  style="font-family:'Bai Jamjuree', sans-serif"  
                  class=" accentbv-example-row"
                >
                  <b-row>
                    <b-col style="padding:10px 0 0 10px" xl>
                      <div class="md-layout">
                        <div class="head">อีเมล <span style="color:red">*</span></div>
                        <div class="detail" style="">
                          <md-field
                            v-bind:class="[Error.errorClassEmail]"
                            style="height:34px;width: 100%;margin:0;min-height:0px;padding:0"
                          >
                            <md-input
                              v-model="FileEdit.email"
                              class="input-style2"
                            >
                            </md-input>
                          </md-field>
                          <div
                          v-if="this.Error.errorClassEmail != ''"
                          class="txt-wrong"
                        >
                          <span class="mdi mdi-alert-octagon"></span>
                          {{ this.Error.errorClassEmail_txt }}
                        </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col style="padding:10px 0 0 10px" xl>
                      <div class="md-layout">
                        <div class="head">ชื่อ <span style="color:red">*</span></div>
                        <div class="detail" style="">
                          <md-field
                          v-bind:class="[Error.errorClassName]"
                            style="height:34px;width: 100%;margin:0;min-height:0px;padding:0"
                          >
                            <md-input
                              v-model="FileEdit.name"
                              class="input-style2"
                            >
                        </md-input>
                          </md-field>
                          <div
                          v-if="this.Error.errorClassName != ''"
                          class="txt-wrong"
                        >
                          <span class="mdi mdi-alert-octagon"></span>
                          {{ this.Error.errorClassName_txt }}
                        </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                </b-container>
              </div>
  
              <div class="box-footer">
                <span  
                  @click="save('cancel')"
                  style="cursor: pointer;"
                  >ยกเลิก</span
                >
                <v-btn
                  rounded
                  @click="save('save')"
                  class="ok"
                  :style="{ 'margin-left': '20px' }"
                  >บันทึก</v-btn
                >
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
  
      <v-dialog
        v-model="dialog_success"
        persistent
        max-width="350"
        id="dialogCinfrim"
      >
        <v-card style="border-radius:14px">
          <v-card-title style="background-color:#ECF1FF;" class="text-h5 ">
            <div style="width: 100%;">
               <div style="text-align: center;margin-bottom:20px">
                <img
                  class="img"
                  src="@/assets/images/success.png"
                  style="height:120px"
                />
              </div>
              <div
                style="font-family: 'Bai Jamjuree';text-align: center;font-size:16px"
              >
              บันทึกสำเร็จ
              </div>
            </div>
          </v-card-title>
          <div style="padding:15px 0px;text-align:center">
            <v-btn
              rounded
              @click="close_success"
              class="ok"
              :style="{ 'margin-left': '20px' }"
              >ตกลง</v-btn
            >
            <!-- @click="close_success" -->
          </div>
        </v-card>
      </v-dialog>
  
    </div>
</template>
  
  <script>
  export default {
    name: 'admin-user-manage-detail-dialog',
    props: {
      data: Object,
      temp_data: Object,
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        FileEdit:{
          email:'',
          name:''
        },
        snackbar: false,
        textSnack: '',
        y: 'top',
        windowSize: 1366,
        dialog_success: false,
        confirmDialog: false,
        dialogDetail: true,
        switch1: false,
        Error: {
          errorClassEmail:'',
          errorClassEmail_txt:'',
          errorClassName: '',
          errorClassName_txt:''
        },
        tempSnackbar: false,
      }
    },
    computed: {
      dialog: {
        get () {
          return this.show
        },
        set (value) {
          this.close()
        }
      }
    },
    watch: {},
    methods: {


      checkErrorCase (type, value) {
      if (type == 'email') {

        if (value == null || value == '') {
          this.Error.errorClassEmail = 'error-case'
          this.Error.errorClassEmail_txt = this.$t('txt-wrong23')
          return false
        } else if (!this.syntaxEmail(value)) {
            this.Error.errorClassEmail = 'error-case'
            this.Error.errorClassEmail_txt = this.$t('txt-wrong5')
          return false
        }else if(!this.checkMail_DHAS(value)){
            this.Error.errorClassEmail = 'error-case'
            this.Error.errorClassEmail_txt = this.$t('txt-wrong22')
        }
        
        else {
          this.Error.errorClassEmail = ''
          this.Error.errorClassEmail_txt = ''
          return true
        }
      }

      if (type == 'name') {
        if (value == null || value == '') {
          this.Error.errorClassName = 'error-case'
          this.Error.errorClassName_txt = this.$t('txt-wrong11')
          return false
        } else {
          this.Error.errorClassName = ''
          this.Error.errorClassName_txt = ''
          return true
        }
      }

      if (type == 'check_dup_email') {
        if (value != null && value != '') {
          let res = 
            {
            id:'',
            event:'add',
            acc_email:this.FileEdit.email,
            acc_name: this.FileEdit.name,
            is_active:1}

      this.$store
        .dispatch('getAccountEmail', res)
        .then(res => {
            // console.log(res)
            this.dialogDetail = false
            this.dialog_success = true
          // this.data = res
          // this.loading_status = false
        })
        .catch(error => {
          if (error.response.status == 401) {
            sessionStorage.removeItem('user_profile'); 
            sessionStorage.removeItem('token_seesion');
            this.tokenExpired = true
            // console.log('Error 401')
          }

          if (error.response.status == 400) {
            this.Error.errorClassEmail = 'error-case'
            this.Error.errorClassEmail_txt = this.$t('txt-wrong14')
            // console.log('Error 400')
          }else{
            this.Error.errorClassEmail = ''
            this.Error.errorClassEmail_txt = ''
          }
        })
        } 
         
      }

      },
      save (param) {
        if(param == 'save'){
        let in1 =  this.checkErrorCase('email' , this.FileEdit.email)
        let in2 =  this.checkErrorCase('name' ,  this.FileEdit.name)

          if(in1 && in2 ){
             this.checkErrorCase('check_dup_email' ,  this.FileEdit.email)
          }
        }else {
          this.close ()
        }
      },
      syntaxEmail (email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
      } else {
        return false
      }
    },
    checkMail_DHAS( param ){
      let row_case = param.toLowerCase();
      console.log(row_case)
      let result = row_case.indexOf("@dhas.com");
      if(result!= -1){
        this.FileEdit.email = row_case
          return true
      }else {
          return false
      }
    },
      close () {
        this.$emit('close', {})
        this.$emit('fetch', {})
      },
      close_success () {
        this.$emit('close', {})
        this.$emit('fetch', {})
      },
      onResize () {
        if (this.data.user_status == 1) {
          this.switch1 = true
        } else {
          this.switch1 = false
        }
        let x = window.innerWidth
        let y = window.innerHeight
        this.windowSize = x
        this.deviceType = window.deviceType()
      }
    }
  }
  </script>
  <style>
  .error-case {
    border: 1px solid red;
    border-radius: 8px;
    font-size: 12px;
    font-family: 'Bai Jamjuree', sans-serif;
    border-radius: 7px;
  }
  </style>
  