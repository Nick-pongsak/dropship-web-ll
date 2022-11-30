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
                <div class="btn-filter-head">Edit Shipping</div>
              </div>
              <div
                :style="{
                  padding:
                    windowSize < 600 ? '25px 2px 0px 0px' : '5px 5px 0px 0px',
                  'text-align': 'end',
                  width: '30%'
                }"
                @click="close()"
              >
                <v-icon
                  v-text="'mdi-close'"
                  style="color:#000000;cursor:pointer"
                  size="24"
                ></v-icon>
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
                        <div class="head">รหัสบริษัทขนส่ง <span style="color:red">*</span></div>
                        <div class="detail" style="">
                          <md-field
                            v-bind:class="[Error.errorClassCompanyCode]"
                            style="height:34px;width: 100%;margin:0;min-height:0px;padding:0"
                          >
                            <md-input
                              v-model="data.shipping_code"
                              class="input-style2"
                            >
                            </md-input>
                          </md-field>
                          <div
                          v-if="this.Error.errorClassCompanyCode != ''"
                          class="txt-wrong"
                        >
                          <span class="mdi mdi-alert-octagon"></span>
                          {{ this.Error.errorClassCompanyCode_txt }}
                        </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col style="padding:10px 0 0 10px" xl>
                      <div class="md-layout">
                        <div class="head">ชื่อบริษัทขนส่ง <span style="color:red">*</span></div>
                        <div class="detail" style="">
                          <md-field
                          v-bind:class="[Error.errorClassCompanyName]"
                            style="height:34px;width: 100%;margin:0;min-height:0px;padding:0"
                          >
                            <md-input
                              v-model="data.shipping_name"
                              class="input-style2"
                            >
                        </md-input>
                          </md-field>
                          <div
                          v-if="this.Error.errorClassCompanyName != ''"
                          class="txt-wrong"
                        >
                          <span class="mdi mdi-alert-octagon"></span>
                          {{ this.Error.errorClassCompanyName_txt }}
                        </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col style="padding:10px 0 0 10px" xl>
                      <div class="md-layout">
                        <div class="head">ลิงก์ติดตามพัสดุ</div>
                        <div class="detail" style="">
                          <md-field
                            style="width: 100%;margin:0;min-height:0px;padding:0"
                          >
                            <md-input
                            
                              v-model="data.shipping_track_link"
                              class="input-style2"
                            >
                            </md-input>
                          </md-field>
                        </div>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row>
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">สถานะ</div>
                      <div class="detail" style="">
                        <div style="padding:0" class="md-layout box-inp">
                          <div>
                            <v-sheet>
                              <v-switch
                                inset
                                @change="switch_user(data)"
                                v-model="switch1"
                                color="#58A55C"
                                style="height: 25px;top: 5px;margin-top: 0px;padding-top: 0px"
                              >
                              </v-switch>
                              <small style="font-size:12px;color:#898A8D">{{
                                data.is_active == 1 ? 'on' : 'off'
                              }}</small>
                            </v-sheet>
                          </div>

                          <div
                            :class="'btn-filter ' + renderStatus(data, 'class')"
                          >
                            {{ renderStatus(data, 'text') }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head"></div>
                      <div class="detail" style=""></div>
                    </div>
                  </b-col>
                </b-row>
  
                </b-container>
              </div>

            <div class="box-footer">
              <span
                @click="edit('cancel')"
                style="cursor: pointer;"
                >ยกเลิก</span
              >
          
              <v-btn
                rounded
                @click="edit('save')"
                class="ok"
                :style="{ 'margin-left': '20px' }"
                >บันทึก</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfrimEdit" persistent max-width="454px">
      <v-card style="border-radius: 40px;padding: 0;">
        <v-card-text style="border-radius:40px;padding: 0;">
          <v-container
            style="display: flex;
               border-radius: 40px 40px 0 0;
                background-color: rgb(236, 241, 255);
                justify-content: center;
                font-family: 'Bai Jamjuree', sans-serif 
                "
          >
            <div class="my-layout">
              <div><img class="img" src="@/assets/images/lock.png" /></div>
              <div>คุณต้องการ<b>เปลี่ยนรหัสผ่าน</b>ใช่หรือไม่</div>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions
          style="font-family: 'Bai Jamjuree', sans-serif ; display: flex;
              justify-content: center;"
        >
          <button
            @click="confrim_dialog('OK')"
            style="width: 84px;
                    height: 35px;
                    background: #000000;
                    border-radius: 8px;
                    color:#fff;
                    "
          >
            ใช่
          </button>
          <button
            @click="confrim_dialog('cancel')"
            style="
                    margin:0 0 0 20px;
                    width: 84px;
                    height: 35px;
                    background: #fff;
                    border-radius: 8px;
                    color:#000;
                    border:2px solid #000;
                    "
          >
            ไม่
          </button>
        </v-card-actions>
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
            <!-- <div style="width: 80%;">บันทึกการเปลี่ยนแปลง</div> -->
            <!-- <div style="justify-content: flex-end;display: flex;width: 20%"><span @click="close_success" style="cursor: pointer;" class="mdi mdi-close mdi-18px"></span></div> -->
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

    <div class="text-center"></div>
  </div>
</template>

<script>
var CryptoJS = require('crypto-js')
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
             company_code:'',
             company_name:'',
             link:''   
        },
        Error: {
          errorClassCompanyCode: '',
          errorClassCompanyCode_txt:'',
          errorClassCompanyName: '',
          errorClassCompanyName_txt:''
        },

      multiLine: true,
      snackbar: false,
      textSnack: '',
      y: 'top',

     
      windowSize: 1366,
      dialog_success: false,
      confirmText: '',
      confirmBtn: '',
      confirmDialog: false,
      dialogDetail: true,
      dialogConfrimEdit: false,
      switch1: false,
      editUser: false,
      editPassword: false,
      tempSnackbar: false,
      tempData: JSON.parse(JSON.stringify(this.data))
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
    edit (param) {

      if(param == 'save'){
        let in1 =  this.checkErrorCase('cpy_code' , this.data.shipping_code)
        let in2 =  this.checkErrorCase('cpy_name' , this.data.shipping_name)
   
          if(in1 && in2){
          

              let data = 
             {  event:'update',
                shipping_id:this.data.shipping_id,
                shipping_code:this.data.shipping_code,
                shipping_name: this.data.shipping_name,
                shipping_track_link:this.data.shipping_track_link,
                is_active:this.data.is_active
              }
            this.$store
              .dispatch('shippingMaster', data)
              .then(res => {
                this.dialogDetail = false
                this.dialog_success = true
                this.dialogConfrimEdit = false
                //
              })
              .catch(error => {
                if (error.response.status == 401) {
                  this.tokenExpired = true
                  console.log('Error 401')
                }
                if (error.response.status == 400) {
                  let er = error.response.data.error.data
                    if(!er.shipping_code){
                      this.Error.errorClassCompanyCode = 'error-case'
                      this.Error.errorClassCompanyCode_txt = this.$t('txt-wrong20')
                    }
                    if(!er.shipping_name){
                      this.Error.errorClassCompanyName = 'error-case'
                      this.Error.errorClassCompanyName_txt = this.$t('txt-wrong20')
                    }
                }
              })
          }
     
      }else {
          this.close()
      }

    },
    checkErrorCase (type, value) {
      if (type == 'cpy_code') {
        if (value == null || value == '') {
          this.Error.errorClassCompanyCode = 'error-case'
          this.Error.errorClassCompanyCode_txt = this.$t('txt-wrong17')
          return false
        } else {
          this.Error.errorClassCompanyCode = ''
          this.Error.errorClassCompanyCode_txt = ''
          return true
        }
        
      }
      if (type == 'cpy_name') {
        if (value == null || value == '') {
          this.Error.errorClassCompanyName = 'error-case'
          this.Error.errorClassCompanyName_txt = this.$t('txt-wrong18')
          return false
        } else {
          this.Error.errorClassCompanyName = ''
          this.Error.errorClassCompanyName_txt = ''
          return true
        }
      }
        
    },
   
    confrim_dialog (param) {
      this.dialogConfrimEdit = false
      if (param == 'OK') {
        this.editPassword = true
      } else {
        // console.log('cancel')
      }
    },
    renderStatus (row, mode) {
      if (mode == 'class') {
        return row.is_active == 1 ? 'active' : 'inactive'
      } else {
        return row.is_active == 1 ? 'Active' : 'Inactive'
      }
    },
    switch_user (param) {
      if (param.is_active == 0) {
        this.data.is_active = 1
      } else {
        this.data.is_active = 0
      }
    },
    close () {
      this.$emit('close', {})
      this.$emit('fetch', {})
    },
    close_success () {
      let status = ''
      if (this.data.is_active == 1) {
        status = 'Active บัญชีผู้ใช้งาน'
      } else {
        status = 'Inactive บัญชีผู้ใช้งาน'
      }
      let detail_snack = {
        status_code: this.data.is_active,
        status: status,
        user_name: this.data.user_name + ' ' + this.data.user_surname,
        show: this.tempSnackbar
      }
      this.$emit('snack', detail_snack)
      this.$emit('close', {})
    },
    onResize () {
      if (this.data.is_active == 1) {
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
  font-size: 12px;
  font-family: 'Bai Jamjuree', sans-serif;
}
</style>
