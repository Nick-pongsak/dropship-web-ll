
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
                  <div class="btn-filter-head">Add Shipping</div>
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
                              v-model="FileEdit.company_code"
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
                              v-model="FileEdit.company_name"
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
                            
                              v-model="FileEdit.link"
                              class="input-style2"
                            >
                            </md-input>
                          </md-field>
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
          company_code:'',
          company_name:'',
          link:''   
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
          errorClassCompanyCode: '',
          errorClassCompanyCode_txt:'',
          errorClassCompanyName: '',
          errorClassCompanyName_txt:''
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
      save (param) {
        if(param == 'save'){
         let in1 =  this.checkErrorCase('cpy_code' , this.FileEdit.company_code)
         let in2 =  this.checkErrorCase('cpy_name' , this.FileEdit.company_name)
           
         if(in1 && in2){
          let data = 
             {  event:'insert',
                shipping_id:'',
                shipping_code:this.FileEdit.company_code,
                shipping_name:this.FileEdit.company_name,
                shipping_track_link:this.FileEdit.link,
                is_active:''
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
                  // console.log('Error 401')
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
            }else{
                // console.log("faill")
            }
        }else {
            this.close ()
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
  