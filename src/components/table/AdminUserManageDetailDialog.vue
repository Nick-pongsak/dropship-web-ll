<template>
  <div>
    <v-dialog
      v-model="dialogDetail"
      persistent
      max-width="950"
      max-height="404"
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
                <div class="btn-filter-head">User Detail</div>
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
                      <div class="head">รหัสผู้ใช้งาน</div>
                      <div class="detail" style="">{{ this.data.user_id }}</div>
                    </div>
                  </b-col>
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">ชื่อ</div>
                      <div class="detail" style="">
                        <md-field
                          style="width: 100%;margin:0;min-height:0px;padding:0"
                        >
                          <md-input
                            v-model="data.user_name + ' ' + data.user_surname"
                            :disabled="true"
                            class="input-style"
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
                      <div class="head">อีเมล</div>
                      <div class="detail" style="">
                        <md-field
                          style="width: 100%;margin:0;min-height:0px;padding:0"
                        >
                          <md-input
                            v-model="data.user_email"
                            :disabled="true"
                            class="input-style"
                          >
                          </md-input>
                        </md-field>
                      </div>
                    </div>
                  </b-col>
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">วันที่สร้าง</div>
                      <div class="detail" style="">
                        {{ formatDate(data.user_create_date) }}
                      </div>
                    </div>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">
                        {{ this.editPassword ? 'รหัสผ่านใหม่ ' : 'รหัสผ่าน' }}
                        <span v-if="editPassword" style="color:red">*</span>
                      </div>
                      <div class="detail" style="">
                        <md-field
                          v-if="!editPassword"
                          :md-toggle-password="false"
                          :style="{
                            'background-color': editUser ? '#fff' : '#DADADA',
                            border: editUser
                              ? '1px solid rgba(0, 0, 0, 0.12)'
                              : ''
                          }"
                          class="input-style"
                          style="width: 100%;margin:0;min-height:0px;padding:0"
                        >
                          <md-input
                            v-model="data.user_email"
                            :disabled="true"
                            type="password"
                            class="input-style"
                            :style="{
                              'background-color': editUser ? '#fff' : '#DADADA'
                            }"
                          >
                          </md-input>
                          <div style="display: flex;" v-if="editUser">
                            <span
                              @click="cheang_password"
                              style="display: flex;padding:0 10px 0 0;font-size:12px;align-items: center;cursor: pointer;"
                              >เปลี่ยน</span
                            >
                          </div>
                        </md-field>

                        <md-field
                          v-else
                          v-bind:class="[Error.errorClassNewPwd]"
                          :md-toggle-password="false"
                          :style="{
                            border:
                              Error.errorClassNewPwd == ''
                                ? '1px solid rgba(0, 0, 0, 0.12)'
                                : '',
                            'background-color': '#fff'
                          }"
                          class="input-style"
                          style="width: 100%;margin:0;min-height:0px;padding:0"
                        >
                          <md-input
                            v-model="edit_val.new_password"
                            :disabled="false"
                            :type="
                              !this.icon_eye.password ? 'password' : 'text'
                            "
                            style="background-color:#fff"
                            class="input-style"
                          >
                          </md-input>
                          <div style="display: flex;">
                            <span
                              v-if="!this.icon_eye.password"
                              @click="HideShow('password')"
                              style="cursor: pointer;padding:0 10px 0 0;"
                              class="md-suffix mdi mdi-eye-off"
                            ></span>
                            <span
                              v-else
                              @click="HideShow('password')"
                              style="cursor: pointer;padding:0 10px 0 0;"
                              class="md-suffix mdi mdi-eye"
                            ></span>
                          </div>
                        </md-field>
                        <div
                          v-if="this.Error.errorClassNewPwd_txt != ''"
                          class="txt-wrong"
                        >
                          <span class="mdi mdi-alert-octagon"></span>
                          {{ this.Error.errorClassNewPwd_txt }}
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">เข้าใช้งานล่าสุด</div>
                      <div class="detail" style="">
                        {{ formatDate(data.user_latest_login) }}
                      </div>
                    </div>
                  </b-col>
                </b-row>

                <!--NOT EDIT PASS -->
                <b-row v-if="!editPassword">
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">ชื่อบริษัท</div>
                      <div class="detail" style="">
                        <md-field
                          style="width: 100%;margin:0;min-height:0px;padding:0"
                        >
                          <md-input
                            v-model="data.user_company"
                            :disabled="true"
                            class="input-style"
                          >
                          </md-input>
                        </md-field>
                      </div>
                    </div>
                  </b-col>
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">อัปเดตล่าสุด</div>
                      <div class="detail" style="">
                        {{ formatDate(data.user_latest_active) }}
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <!-- ///// -->

                <!-- EDIT PASS -->
                <b-row v-else>
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">
                        ยืนยันรหัสผ่านใหม่ <span style="color:red">*</span>
                      </div>
                      <div class="detail" style="">
                        <md-field
                          v-bind:class="[Error.errorClassConfNewPwd]"
                          :md-toggle-password="false"
                          :style="{
                            border:
                              Error.errorClassConfNewPwd == ''
                                ? '1px solid rgba(0, 0, 0, 0.12)'
                                : '',
                            'background-color': '#fff'
                          }"
                          class="input-style"
                          style="width: 100%;margin:0;min-height:0px;padding:0"
                        >
                          <md-input
                            v-model="edit_val.confrim_password"
                            :disabled="false"
                            :type="
                              !this.icon_eye.confrim_new_password
                                ? 'password'
                                : 'text'
                            "
                            style="background-color:#fff"
                            class="input-style"
                          >
                          </md-input>
                          <div style="display: flex;">
                            <span
                              v-if="!this.icon_eye.confrim_new_password"
                              @click="HideShow('confrim_new_password')"
                              style="cursor: pointer;padding:0 10px 0 0;"
                              class="md-suffix mdi mdi-eye-off"
                            ></span>
                            <span
                              v-else
                              @click="HideShow('confrim_new_password')"
                              style="cursor: pointer;padding:0 10px 0 0;"
                              class="md-suffix mdi mdi-eye"
                            ></span>
                          </div>
                        </md-field>
                        <div
                          v-if="this.Error.errorClassConfNewPwd != ''"
                          class="txt-wrong"
                        >
                          <span class="mdi mdi-alert-octagon"></span>
                          {{ this.Error.errorClassConfNewPwd_txt }}
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">อัปเดตล่าสุด</div>
                      <div class="detail" style="">
                        {{ data.user_latest_active }}
                      </div>
                    </div>
                  </b-col>
                </b-row>

                <b-row v-if="editPassword">
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">ชื่อบริษัท</div>
                      <div class="detail" style="">
                        <md-field
                          style="width: 100%;margin:0;min-height:0px;padding:0"
                        >
                          <md-input
                            v-model="data.user_company"
                            :disabled="true"
                            class="input-style"
                          >
                          </md-input>
                        </md-field>
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
                <!-- ///// -->
                <b-row>
                  <b-col style="padding:10px 0 0 10px" xl>
                    <div class="md-layout">
                      <div class="head">สถานะ</div>
                      <div class="detail" style="">
                        <div style="padding:0" class="md-layout box-inp">
                          <div>
                            <v-sheet v-if="editUser">
                              <v-switch
                                inset
                                @change="switch_user(data)"
                                v-model="switch1"
                                color="#58A55C"
                                style="height: 25px;top: 5px;margin-top: 0px;padding-top: 0px"
                              >
                              </v-switch>
                              <small style="font-size:12px;color:#898A8D">{{
                                data.user_status == 1 ? 'on' : 'off'
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
                v-if="editUser"
                @click="edit('cancel')"
                style="cursor: pointer;"
                >ยกเลิก</span
              >
              <v-btn
                v-if="!editUser"
                rounded
                @click="edit('edit')"
                class="ok"
                :style="{ 'margin-left': '20px' }"
                >แก้ไข</v-btn
              >

              <v-btn
                v-else
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
      multiLine: true,
      snackbar: false,
      textSnack: '',
      y: 'top',

      pass: '999999',
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
      icon_eye: {
        password: false,
        new_password: false,
        confrim_new_password: false
      },
      edit_val: {
        val_pass: '',
        new_password: '',
        confrim_password: ''
      },
      Error: {
        errorClassNewPwd: '',
        errorClassNewPwd_txt: '',
        errorClassConfNewPwd: '',
        errorClassConfNewPwd_txt: ''
      },
      monthsShort: [
        'ม.ค.',
        'ก.พ.',
        'มี.ค.',
        'เม.ย.',
        'พ.ค.',
        'มิ.ย.',
        'ก.ค.',
        'ส.ค.',
        'ก.ย.',
        'ต.ค.',
        'พ.ย.',
        'ธ.ค.'
        // 'JAN',
        // 'FEB',
        // 'MAR',
        // 'APR',
        // 'MAY',
        // 'JUN',
        // 'JUL',
        // 'AUG',
        // 'SEP',
        // 'OCT',
        // 'NOV',
        // 'DEC'
      ],
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
      if (param == 'edit') {
        this.editUser = true
      } else if (param == 'save') {
        if (this.editPassword) {
          let inp1 = this.checkErrorCase(
            'inp-new-password',
            this.edit_val.new_password
          )
          let inp2 = this.checkErrorCase(
            'inp-conf-new-password',
            this.edit_val.confrim_password
          )
          // console.log('save' , inp1 , inp2)
          let inp3 = false
          if (inp1 && inp2) {
            inp3 = this.checkErrorCase('inp-check-conf-pass', '')
          }

          if (inp1 && inp2 && inp3) {
            this.tempSnackbar =
              this.data.user_status == this.tempData.user_status ? false : true

            var pwd = this.edit_val.new_password
            let keyapp = 'DropShipSecretKey'
            var encrypted = CryptoJS.AES.encrypt(pwd, keyapp)

            let res = {
              user_id: this.data.user_id,
              new_password: encodeURI(encrypted),
              user_status: this.data.user_status
            }
            this.$store
              .dispatch('changePwdStatus', res)
              .then(res => {
                // console.log(res)
              })
              .catch(error => {
                console.log(error.response)
                if (error.response.status == 400) {
                }
              })
            this.dialogDetail = false
            this.dialog_success = true
          } else {
            // console.log('Not Save')
          }
        } else {
          this.tempSnackbar = true
          let res = {
            user_id: this.data.user_id,
            new_password: '',
            user_status: this.data.user_status
          }

          this.$store
            .dispatch('changePwdStatus', res)
            .then(res => {
              this.dialogDetail = false
              this.dialog_success = true
            })
            .catch(error => {
              console.log(error.response)
              if (error.response.status == 400) {
              }
            })
        }
      } else {
        this.Error.errorClassNewPwd = ''
        this.Error.errorClassNewPwd_txt = ''
        this.Error.errorClassConfNewPwd = ''
        this.Error.errorClassConfNewPwd_txt = ''
        ;(this.icon_eye.password = false),
          (this.icon_eye.new_password = false),
          (this.icon_eye.confrim_new_password = false)
        ;(this.edit_val.val_pass = ''), (this.edit_val.new_password = '')
        this.edit_val.confrim_password = ''

        this.editPassword = false
        this.editUser = false
      }
    },
    checkErrorCase (type, value) {
      if (type == 'inp-new-password') {
        if (value == null || value == '') {
          this.Error.errorClassNewPwd = 'error-case'
          this.Error.errorClassNewPwd_txt = this.$t('txt-wrong11')
          return false
        } else if (!this.syntaxPassword(value)) {
          this.Error.errorClassNewPwd = 'error-case'
          this.Error.errorClassNewPwd_txt = this.$t('txt-wrong10')
          return false
        } else {
          this.Error.errorClassNewPwd = ''
          this.Error.errorClassNewPwd_txt = ''
          return true
        }
      }

      if (type == 'inp-conf-new-password') {
        if (value == null || value == '') {
          this.Error.errorClassConfNewPwd = 'error-case'
          this.Error.errorClassConfNewPwd_txt = this.$t('txt-wrong11')
          return false
        } else if (!this.syntaxPassword(value)) {
          this.Error.errorClassConfNewPwd = 'error-case'
          this.Error.errorClassConfNewPwd_txt = this.$t('txt-wrong10')
          return false
        } else {
          this.Error.errorClassConfNewPwd = ''
          this.Error.errorClassConfNewPwd_txt = ''
          return true
        }
      }

      if (type == 'inp-check-conf-pass') {
        if (this.edit_val.new_password != this.edit_val.confrim_password) {
          this.Error.errorClassConfNewPwd = 'error-case'
          this.Error.errorClassNewPwd = 'error-case'
          this.Error.errorClassConfNewPwd_txt = this.$t('txt-wrong8')
          return false
        } else {
          this.Error.errorClassNewPwd = ''
          this.Error.errorClassConfNewPwd = ''
          this.Error.errorClassConfNewPwd_txt = ''
          return true
        }
      }
    },
    HideShow (param) {
      if (param == 'password') {
        if (this.icon_eye.password) {
          this.icon_eye.password = false
        } else {
          this.icon_eye.password = true
        }
      }

      if (param === 'new_password') {
        if (this.icon_eye.new_password) {
          this.icon_eye.new_password = false
        } else {
          this.icon_eye.new_password = true
        }
      }
      if (param == 'confrim_new_password') {
        if (this.icon_eye.confrim_new_password) {
          this.icon_eye.confrim_new_password = false
        } else {
          this.icon_eye.confrim_new_password = true
        }
      }
    },
    formatDate (val) {
      if (val !== null) {
        let hours = ''
        let min = ''
        let today = new Date(val)
        const year = today.getFullYear()
        const fullYear = year
        // const fullYear = year + 543
        const days = today.getDate()
        const h = today.getHours()
        const m = today.getMinutes()
        const monthName = this.monthsShort[today.getMonth()]

        if (h < 10) {
          hours = '0' + h
        } else {
          hours = h
        }

        if (m < 10) {
          min = '0' + m
        } else {
          min = m
        }

        return (
          days +
          ' ' +
          monthName +
          ' ' +
          fullYear +
          '  ' +
          hours +
          ':' +
          min +
          ' น.'
        )
      } else {
        return val
      }
    },
    cheang_password () {
      this.dialogConfrimEdit = true
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
        return row.user_status == 1 ? 'active' : 'inactive'
      } else {
        return row.user_status == 1 ? 'Active' : 'Inactive'
      }
    },
    switch_user (param) {
      if (param.user_status == 0) {
        this.data.user_status = 1
      } else {
        this.data.user_status = 0
      }
    },
    close () {
      this.$emit('close', {})
      this.$emit('fetch', {})
    },
    close_success () {
      let status = ''
      if (this.data.user_status == 1) {
        status = 'Active บัญชีผู้ใช้งาน'
      } else {
        status = 'Inactive บัญชีผู้ใช้งาน'
      }
      let detail_snack = {
        status_code: this.data.user_status,
        status: status,
        user_name: this.data.user_name + ' ' + this.data.user_surname,
        show: this.tempSnackbar
      }
      this.$emit('snack', detail_snack)
      this.$emit('close', {})
    },
    syntaxPassword (password) {
      var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/
      if (regex.test(password)) {
        return true
      } else {
        return false
      }
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
  font-size: 12px;
  font-family: 'Bai Jamjuree', sans-serif;
}
</style>
