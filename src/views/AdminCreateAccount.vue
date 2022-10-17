<template>
  <div id="page-admin" v-resize="onResize">
    <div class="box-1">
      <div
        :style="{
          display: windowSize <= 600 ? '' : 'flex',
          width: windowSize <= 600 ? '100%' : '75%'
        }"
        class="left"
      >
        <b-container
          style="font-family:'Bai Jamjuree', sans-serif"
          class=" accentbv-example-row"
        >
          <b-row style="margin-top:5px;">
            <b-col style="" xl>
              <div class="btn-filter">Create Account</div>
            </b-col>
          </b-row>
          <b-row style="margin-top:10px;">
            <b-col xl>
              <div style="margin:0 0 15px 0;" class="md-layout">
                <div style="padding:0 30px 0 0;width:auto" class="head">
                  ประเภทผู้ใช้
                </div>
                <div class="detail" style="">
                  <v-select
                    style="box-shadow: none;width: 119px;"
                    v-on:change="OnCreate()"
                    v-model="statusInput"
                    :items="statusList"
                    label="Selece..."
                    item-text="title"
                    item-value="code"
                    :disabled="statusInput != null ? true : false"
                    solo
                    dense
                  ></v-select>
                </div>
              </div>
            </b-col>
          </b-row>
          <div v-if="statusInput === 'admin'">
            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">
                    Admin ID <span style="color:red">*</span>
                  </div>
                  <div class="detail" style="">
                    <input
                      v-model="admin.ID"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">
                    รหัสผ่าน <span style="color:red;">*</span>
                  </div>
                  <div class="detail" style="">
                    <input
                    type="password"
                      v-bind:class="[Error.errorClassPwd]"
                      v-model="admin.PASS"
                      style="background-color:#fff;"
                      class="input-style"
                    />
                    <div
                      v-if="this.Error.errorClassPwd != ''"
                      class="txt-wrong"
                    >
                      <span class="mdi mdi-alert-octagon"></span>
                      {{ this.Error.errorClassPwd_txt }}
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">ชื่อ <span style="color:red">*</span></div>
                  <div class="detail" style="">
                    <input
                      v-bind:class="[Error.errorClassFirstName]"
                      v-model="admin.NAME"
                      style="background: #fff;"
                      class="input-style"
                    />
                    <div
                      v-if="this.Error.errorClassFirstName != ''"
                      class="txt-wrong"
                    >
                      <span class="mdi mdi-alert-octagon"></span>
                      {{ this.Error.errorClassFirstName_txt }}
                    </div>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">
                    นามสกุล <span style="color:red;">*</span>
                  </div>
                  <div class="detail" style="">
                    <input
                      v-bind:class="[Error.errorClassLastName]"
                      v-model="admin.SERNAME"
                      :style="{
                        'background-color': '#fff'
                      }"
                      class="input-style"
                    />
                    <div
                      v-if="this.Error.errorClassLastName != ''"
                      class="txt-wrong"
                    >
                      <span class="mdi mdi-alert-octagon"></span>
                      {{ this.Error.errorClassLastName_txt }}
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">
                    เบอร์โทรศัพท์ <span style="color:red">*</span>
                  </div>
                  <div class="detail" style="">
                    <input
                      type="text"
                      v-bind:class="[Error.errorClassTel]"
                      v-model="admin.TEL"
                      style="background: #fff;"
                      class="input-style"
                    />
                    <div
                      v-if="this.Error.errorClassTel != ''"
                      class="txt-wrong"
                    >
                      <span class="mdi mdi-alert-octagon"></span>
                      {{ this.Error.errorClassTel_txt }}
                    </div>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">เบอร์โทรศัพท์อื่น</div>
                  <div class="detail" style="">
                    <input
                      type="number"
                      v-model="admin.TEL2"
                      :style="{
                        'background-color': '#fff'
                      }"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">
                    ชื่อบริษัท <span style="color:red">*</span>
                  </div>
                  <div class="detail" style="">
                    <input
                      v-bind:class="[Error.errorClassCompany]"
                      v-model="admin.COMPANY"
                      style="background: #fff;"
                      class="input-style"
                    />
                    <div
                      v-if="this.Error.errorClassCompany != ''"
                      class="txt-wrong"
                    >
                      <span class="mdi mdi-alert-octagon"></span>
                      {{ this.Error.errorClassCompany_txt }}
                    </div>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">อีเมล <span style="color:red">*</span></div>
                  <div class="detail" style="">
                    <input
                      v-bind:class="[Error.errorClassEmail]"
                      v-model="admin.EMAIL"
                      :style="{
                        'background-color': '#fff'
                      }"
                      class="input-style"
                    />
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

            <b-row style="background-color:">
              <b-col style="background-color:">
                <div class="md-layout">
                  <div style="width: 10%;" class="head">ที่อยู่</div>
                  <div style="width:80%" class="detail">
                    <input
                      v-model="admin.ADDRESS"
                      style="width:100%"
                      :style="{
                        'background-color': '#fff'
                      }"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">จังหวัด</div>
                  <div class="detail" style="">
                    <v-select
                      v-on:click="clear_('province')"
                      v-on:change="select_('province')"
                      style="max-height:34px ;box-shadow: none;width:100%"
                      v-model="admin.PROVINCE"
                      :items="select_province.province"
                      label="-กรุณาเลือกจังหวัด-"
                      :item-text="item => item.name_th"
                      :item-value="item => item"
                      solo
                      dense
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">รหัสไปรษณีย์</div>
                  <div class="detail" style="">
                    <v-select
                      v-on:change="select_('zip')"
                      style="max-height:34px ;box-shadow: none;width:100%"
                      v-model="admin.ZIP_CODE"
                      :items="select_province.zip"
                      label="-กรุณาเลือกรหัสไปรษณีย์-"
                      :item-text="item => item.id"
                      :item-value="item => item"
                      :disabled="select_province.zip == '' ? true : false"
                      solo
                      dense
                    ></v-select>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">แขวง/ตำบล</div>
                  <div class="detail" style="">
                    <v-select
                      v-on:change="select_('sub_district')"
                      style="max-height:34px ;box-shadow: none;width:100%"
                      v-model="admin.SUB_DISTRICT"
                      :items="select_province.subdistrict"
                      label="-กรุณาเลือกเเขวง/ตำบล-"
                      :item-text="item => item.name_th"
                      :item-value="item => item"
                      :disabled="
                        select_province.subdistrict == '' ? true : false
                      "
                      solo
                      dense
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">เขต/อำเภอ</div>
                  <div class="detail" style="">
                    <v-select
                      v-on:change="select_('district')"
                      style="max-height:34px ;box-shadow: none;width:100%"
                      v-model="admin.DISTRICT"
                      :items="select_province.district"
                      label="-กรุณาเลือกเขต/อำเภอ-"
                      :item-text="item => item.name_th"
                      :item-value="item => item"
                      :disabled="select_province.district == '' ? true : false"
                      solo
                      dense
                    ></v-select>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xs> </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head"></div>
                  <div
                    class="detail"
                    style="dwidth:100%;display: flex;justify-content: flex-end;"
                  >
                    <div
                      @click="cancel"
                      style="font-weight: 600;cursor: pointer;;padding:0 30px 0 0;display: flex;align-items: center;"
                    >
                      ยกเลิก
                    </div>
                    <v-btn
                      style="border-radius: 8px;"
                      rounded
                      class="ok"
                      @click="openDialog()"
                      >บันทึก</v-btn
                    >
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>

          <div v-if="statusInput === 'supplier'">
            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">
                    Suppile ID <span style="color:red">*</span>
                  </div>
                  <div class="detail" style="">
                    <v-select
                      style="max-height:34px ;box-shadow: none;width:100%"
                      v-on:change="selectSup_()"
                      v-model="info_sup"
                      :items="sup_list"
                      label="- กรุณาเลือกรหัสผู้ใช้งาน  -"
                      :item-text="
                        item =>
                          item.user_id +
                          ' : ' +
                          item.user_name +
                          ' ' +
                          item.user_surname
                      "
                      item-value="user_id"
                      solo
                      dense
                    ></v-select>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">
                    รหัสผ่าน <span style="color:red;">*</span>
                  </div>
                  <div class="detail" style="">
                    <input
                      v-bind:class="[Error.errorClassPwd]"
                      v-model="supplier.PASS"
                      :style="{
                        background:
                          info_sup == '' ? 'rgba(0, 0, 0, 0.12)' : '#fff'
                      }"
                      :disabled="info_sup == '' ? true : false"
                      class="input-style"
                    />
                    <div
                      v-if="this.Error.errorClassPwd != ''"
                      class="txt-wrong"
                    >
                      <span class="mdi mdi-alert-octagon"></span>
                      {{ this.Error.errorClassPwd_txt }}
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">ชื่อ <span style="color:red">*</span></div>
                  <div class="detail" style="">
                    <input
                      v-model="supplier.NAME"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">
                    นามสกุล <span style="color:red;">*</span>
                  </div>
                  <div class="detail" style="">
                    <input
                      v-model="supplier.SERNAME"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">
                    เบอร์โทรศัพท์ <span style="color:red">*</span>
                  </div>
                  <div class="detail" style="">
                    <input
                      v-model="supplier.TEL"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">เบอร์โทรศัพท์อื่น</div>
                  <div class="detail" style="">
                    <input
                      v-model="supplier.TEL2"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">
                    ชื่อบริษัท <span style="color:red">*</span>
                  </div>
                  <div class="detail" style="">
                    <input
                      v-model="supplier.COMPANY"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">อีเมล <span style="color:red">*</span></div>
                  <div class="detail" style="">
                    <input
                      v-model="supplier.EMAIL"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row style="background-color:">
              <b-col style="background-color:">
                <div class="md-layout">
                  <div style="width: 10%;" class="head">
                    ที่อยู่ <span style="color:red">*</span>
                  </div>
                  <div style="width:80%" class="detail">
                    <input
                      v-model="supplier.ADDRESS"
                      style="width:100%;background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">จังหวัด</div>
                  <div class="detail" style="">
                    <input
                      v-model="supplier.PROVINCE"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">รหัสไปรษณีย์</div>
                  <div class="detail" style="">
                    <input
                      v-model="supplier.ZIP_CODE"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl>
                <div class="md-layout">
                  <div class="head">แขวง/ตำบล</div>
                  <div class="detail" style="">
                    <input
                      v-model="supplier.DISTRICT"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head">เขต/อำเภอ</div>
                  <div class="detail" style="">
                    <input
                      v-model="supplier.SUB_DISTRICT"
                      style="background: rgba(0, 0, 0, 0.12);"
                      disabled="true"
                      class="input-style"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row>
              <b-col xl> </b-col>
              <b-col>
                <div class="md-layout">
                  <div class="head"></div>
                  <div
                    class="detail"
                    style="dwidth:100%;display: flex;justify-content: flex-end;"
                  >
                    <div
                      @click="cancel"
                      style="font-weight: 600;cursor: pointer;;padding:0 30px 0 0;display: flex;align-items: center;"
                    >
                      ยกเลิก
                    </div>
                    <v-btn
                      style="border-radius: 8px;"
                      rounded
                      :disabled="supplier.ID == null ? true :false"
                      class="ok"
                      @click="openDialog()"
                      >บันทึก</v-btn
                    >
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-container>

        <v-dialog
          v-model="dialog_save"
          persistent
          max-width="350"
          id="dialogCinfrim"
        >
          <v-card style="border-radius:14px">
            <v-card-title style="background-color:#000;" class="text-h5 ">
              <div style="color:#fff;width: 100%;" class="md-layout">
                <div style="width: 80%;">บันทึกการเปลี่ยนแปลง</div>
                <div style="justify-content: flex-end;display: flex;width: 20%">
                  <span
                    style="cursor: pointer;"
                    class="mdi mdi-close mdi-18px"
                  ></span>
                </div>
              </div>
            </v-card-title>
            <v-card-text
              style="font-family:'Bai Jamjuree', sans-serif;padding: 24px 24px 20px; flex-direction: row;color:#000;font-size: 16px;"
            >
              <div style="text-align: center;">
                คุณต้องการสร้าง<b>ผู้ใช้งานใหม่</b>
              </div>
              <div style="text-align: center;">ใช่หรือไม่ ?</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div style="width:100%;display: flex;justify-content: center;">
                <button @click="edit_save('yes')" class="btn-yes">ใช่</button>
                <button @click="edit_save('no')" class="btn-no">ไม่</button>
              </div>
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
            <v-card-title style="background-color:#000;" class="text-h5 ">
              <div style="color:#fff;width: 100%;" class="md-layout">
                <div style="width: 80%;">บันทึกการเปลี่ยนแปลง</div>
                <div style="justify-content: flex-end;display: flex;width: 20%">
                  <span
                    @click="edit_save('success')"
                    style="cursor: pointer;"
                    class="mdi mdi-close mdi-18px"
                  ></span>
                </div>
              </div>
            </v-card-title>
            <v-card-text
              style="font-family:'Bai Jamjuree', sans-serif;padding: 24px 24px 20px; flex-direction: row;color:#000;font-size: 16px;"
            >
              <div style="text-align: center;">
                <img class="img" src="@/assets/images/confSuccess.png" />
              </div>
              <div style="text-align: center;">บันทึกสำเร็จ</div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <div
        :style="{ width: windowSize <= 600 ? '0%' : '25%' }"
        style="display: flex;align-items: flex-end;"
        class="right"
      >
        <img class="img" src="@/assets/images/profile-admin.png" />
      </div>
    </div>
    <div class="box-2"></div>
  </div>
</template>

<script>
import Vue from 'vue'
var CryptoJS = require('crypto-js')
export default {
  name: 'admin-create-acount',
  data () {
    return {
      Error: {
        errorClassPwd: '',
        errorClassPwd_txt: '',
        errorClassFirstName: '',
        errorClassFirstName_txt: '',
        errorClassFirstName: '',
        errorClassFirstName_txt: '',
        errorClassLastName: '',
        errorClassLasttName_txt: '',
        errorClassTel: '',
        errorClassTel_txt: '',
        errorClassCompany: '',
        errorClassCompany_txt: '',
        errorClassEmail: '',
        errorClassEmail_txt: ''
      },
      select_province: {
        province: [],
        zip: [],
        subdistrict: [],
        district: []
      },
      temp_select_province: {
        province: [],
        zip: [],
        subdistrict: [],
        district: []
      },
      dialog_save: false,
      dialog_success: false,
      windowSize: '',
      statusList: [
        { code: 'admin', title: 'Admin' },
        { code: 'supplier', title: 'supplier' }
      ],
      sup_list: [],
      statusInput: null,
      statusInput_sup: null,
      info_sup: '',
      admin: {
        ID: '-',
        PASS: '1234hhh5a',
        NAME: '-',
        SERNAME: '-',
        TEL: '0982713122',
        TEL2: '-',
        COMPANY: '-',
        EMAIL: 'piyathat_j@dhas.com',
        ADDRESS: '-',
        PROVINCE: null,
        ZIP_CODE: null,
        DISTRICT: null,
        SUB_DISTRICT: null
      },
      supplier: {
        ID: null,
        PASS: null,
        NAME: null,
        SERNAME: null,
        TEL: null,
        TEL2: null,
        COMPANY: null,
        EMAIL: null,
        ADDRESS: null,
        PROVINCE: null,
        ZIP_CODE: null,
        DISTRICT: null,
        SUB_DISTRICT: null
      },
      account: {
        company: '',
        email: '',
        password: '',
        frist_name: '',
        last_name: '',
        tel: '',
        tel2: '',
        address: '',
        province: '',
        zip_code: ''
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      this.windowSize = x
    },
    cancel () {
      this.statusInput = null
      this.statusInput_sup = null
      this.supplier = {
        ID: null,
        PASS: null,
        NAME: null,
        SERNAME: null,
        TEL: null,
        TEL2: null,
        COMPANY: null,
        EMAIL: null,
        ADDRESS: null,
        PROVINCE: null,
        ZIP_CODE: null,
        DISTRICT: null,
        SUB_DISTRICT: null
      }
      this.admin = {
        ID: '-',
        PASS: '',
        NAME: '-',
        SERNAME: '-',
        TEL: '',
        TEL2: '-',
        COMPANY: '-',
        EMAIL: '-',
        ADDRESS: '-',
        PROVINCE: null,
        ZIP_CODE: null,
        DISTRICT: null,
        SUB_DISTRICT: null
      }
    },
    openDialog () {
      this.dialog_save = true
    },
    edit_save (param) {
      let res = ''
      if (param == 'yes') {
        if (this.statusInput === 'admin') {
          let in1 = this.checkErrorCase('inp-password', this.admin.PASS)
          let in2 = this.checkErrorCase('inp-first_name', this.admin.NAME)
          let in3 = this.checkErrorCase('inp-last_name', this.admin.SERNAME)
          let in4 = this.checkErrorCase('inp-tel', this.admin.TEL)
          let in5 = this.checkErrorCase('inp-company', this.admin.COMPANY)
          let in6 = this.checkErrorCase('inp-email', this.admin.EMAIL)
          if (in1 && in2 && in3 && in4 && in5 && in6) {
            let t = this.admin
            var pwd = this.admin.PASS
            let keyapp = 'DropShipSecretKey'
            var encrypted = CryptoJS.AES.encrypt(pwd, keyapp)
            // console.log(this.admin.DISTRICT )
            // if(!t.DISTRICT.name_th){
            //   console.log('null')
            // }
            let res = {
              user_role: 'admin',
              user_id: t.ID,
              user_name: t.NAME,
              user_surname: t.SERNAME,
              user_company: t.COMPANY,
              user_email: t.EMAIL,
              user_phone: t.TEL,
              user_phone_secendary: t.TEL2,
              user_password: encodeURI(encrypted),
              user_address: t.ADDRESS,
              user_district: t.DISTRICT == null ? '' : t.DISTRICT.name_th,
              user_subdistrict: t.SUB_DISTRICT  == null ? '' : t.SUB_DISTRICT.name_th,
              user_province: t.PROVINCE  == null ? '' : t.PROVINCE.name_th,
              user_postal: t.ZIP_CODE  == null ? '' : t.ZIP_CODE.id
            }
            this.$store.dispatch('Register', res).then(res => { 
              this.dialog_success = true
              this.statusInput = null
          })
            .catch(error => { 
              // console.log(error.response.status)
                  if(error.response.status == 400){
                    this.Error.errorClassEmail = 'error-case'
                    this.Error.errorClassEmail_txt = this.$t('txt-wrong14')
                    console.log('Error 400')
                  }
                })
           
            // console.log('Save => ', res)
          } else {
            // console.log('Not Save', res)
          }

          res = this.admin
          this.dialog_save = false
        } else {
          let in1 = this.checkErrorCase('inp-password', this.supplier.PASS)

          if (in1) {
            var pwd = this.supplier.PASS
            let keyapp = 'DropShipSecretKey'
            var encrypted = CryptoJS.AES.encrypt(pwd, keyapp)
            let t = this.supplier
            let res = {
              user_role: 'supplier',
              user_id: t.ID,
              user_name: t.NAME,
              user_surname: t.SERNAME,
              user_company: t.COMPANY,
              user_email: t.EMAIL,
              user_phone: t.TEL,
              user_phone_secendary: t.TEL2,
              user_password: encodeURI(encrypted),
              user_address: t.ADDRESS,
              user_district: t.DISTRICT,
              user_subdistrict: t.SUB_DISTRICT,
              user_province: t.PROVINCE,
              user_postal: t.ZIP_CODE
            }
            this.$store.dispatch('Register', res).then(res => {})
            this.dialog_success = true
            this.statusInput = null
            // console.log('Save sup => ', res)
          } else {
            // console.log('Not Save')
          }
          res = this.supplier
          this.dialog_save = false
        }
      } else if (param == 'no') {
        this.dialog_save = false
        this.dialog_success = false
      } else if (param == 'success') {
        this.cancel()
        this.statusInput = null
        this.dialog_save = false
        this.dialog_success = false
      }
      // console.log('API EDIT PROFILE =>', res)
    },
    OnCreate () {
      this.clear_data()
      let data = {
        value: this.statusInput
      }
      if (this.statusInput == 'admin') {
        this.$store.dispatch('getDataUserCreate', data).then(res => {
          this.admin.ID = res.success.data.user_id
          // console.log( res.success)
        })
      } else {
        this.$store.dispatch('getDataUserCreate', data).then(res => {
          this.sup_list = res.success.data
          // console.log(res.success)
        })
      }
      // this.$store.dispatch('getDataUserCreate', data )
    },
    selectSup_ () {
    
      let t = this.supplier
      let user = this.sup_list.findIndex(x => x.user_id === this.info_sup)
      t.ID = this.sup_list[user].user_id
      // t.PASS=this.sup_list[user].
      t.NAME = this.sup_list[user].user_name
      t.SERNAME = this.sup_list[user].user_surname
      t.TEL = this.sup_list[user].user_phone
      t.TEL2 = this.sup_list[user].user_phone_secendary
      t.COMPANY = this.sup_list[user].user_company
      t.EMAIL = this.sup_list[user].user_email
      t.ADDRESS = this.sup_list[user].user_address
      t.PROVINCE = this.sup_list[user].user_province
      t.ZIP_CODE = this.sup_list[user].user_postal
      t.DISTRICT = this.sup_list[user].user_district
      t.SUB_DISTRICT = this.sup_list[user].user_subdistrict
    },
    select_ (data) {
      if (data == 'province') {
        let res = {
          province_id: this.admin.PROVINCE.id,
          zip_code: '',
          subdistrict_id: '',
          district_id: ''
        }
        this.$store.dispatch('GetProvince', res).then(res => {
          this.select_province = res.success.data
        })
      } else if (data == 'zip') {
        let res = {
          province_id: this.admin.PROVINCE.id,
          zip_code: this.admin.ZIP_CODE.id,
          subdistrict_id: '',
          district_id: ''
        }
        this.$store.dispatch('GetProvince', res).then(res => {
          this.select_province = res.success.data
        })
      } else if (data == 'sub_district') {
        let res = {
            province_id  : this.admin.PROVINCE.id,
            zip_code  :this.admin.ZIP_CODE.id,
            subdistrict_id :this.admin.SUB_DISTRICT.id,
            district_id :''
          }
        this.$store
              .dispatch('GetProvince',res)
              .then(res => {
                this.select_province = res.success.data
        })
      } else {
      }
    },
    clear_ (data) {
      if (data == 'province') {
        let res = {
          province_id: '',
          zip_code: '',
          subdistrict_id: '',
          district_id: ''
        }
        this.$store.dispatch('GetProvince', res).then(res => {
          if (this.admin.PROVINCE == null) {
            this.select_province = res.success.data
          } else {
            this.select_province.province = res.success.data.province
          }
        })
      } else if (data == 'zip') {
        let res = {
          province_id: this.admin.PROVINCE,
          zip_code: '',
          subdistrict_id: '',
          district_id: ''
        }
        this.$store.dispatch('GetProvince', res).then(res => {
          this.select_province = res.success.data
        })
      } else if (data == 'sub_district') {
        let res = {
          province_id: this.admin.PROVINCE,
          zip_code: this.admin.PROVINCE,
          subdistrict_id: '',
          district_id: ''
        }
        this.$store.dispatch('GetProvince', res).then(res => {
          this.select_province = res.success.data
        })
      } else {
      }
    },
    checkErrorCase (type, value) {
      if (type == 'inp-password') {
        if (value == null || value == '') {
          this.Error.errorClassPwd = 'error-case'
          this.Error.errorClassPwd_txt = this.$t('txt-wrong11')
          return false
        } else if (!this.syntaxPassword(value)) {
          this.Error.errorClassPwd = 'error-case'
          this.Error.errorClassPwd_txt = this.$t('txt-wrong10')
          return false
        } else {
          this.Error.errorClassPwd = ''
          this.Error.errorClassPwd_txt = ''
          return true
        }
      }

      if (type == 'inp-first_name') {
        if (value == null || value == '') {
          ;(this.Error.errorClassFirstName = 'error-case'),
            (this.Error.errorClassFirstName_txt = this.$t('txt-wrong11'))
          return false
        } else {
          ;(this.Error.errorClassFirstName = ''),
            (this.Error.errorClassFirstName_txt = '')
          return true
        }
      }

      if (type == 'inp-last_name') {
        if (value == null || value == '') {
          ;(this.Error.errorClassLastName = 'error-case'),
            (this.Error.errorClassLastName_txt = this.$t('txt-wrong11'))
          return false
        } else {
          ;(this.Error.errorClassLastName = ''),
            (this.Error.errorClassLastName_txt = '')
          return true
        }
      }

      if (type == 'inp-tel') {
        // console.log(value)
        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
        if (value == null || value == '' || value == '-') {
          ;(this.Error.errorClassTel = 'error-case'),
            (this.Error.errorClassTel_txt = this.$t('txt-wrong11'))
          return false
        }  else {
          ;(this.Error.errorClassTel = ''), (this.Error.errorClassTel_txt = '')
          return true
        }
      }

      if (type == 'inp-company') {
        if (value == null || value == '') {
          ;(this.Error.errorClassCompany = 'error-case'),
            (this.Error.errorClassCompany_txt = this.$t('txt-wrong11'))
          return false
        } else {
          ;(this.Error.errorClassCompany = ''),
            (this.Error.errorClassCompany_txt = '')
          return true
        }
      }

      if (type == 'inp-email') {
        if (value == null || value == '') {
          ;(this.Error.errorClassEmail = 'error-case'),
            (this.Error.errorClassEmail_txt = this.$t('txt-wrong11'))
          return false
        } else if (!this.syntaxEmail(value)) {
          ;(this.Error.errorClassEmail = 'error-case'),
            (this.Error.errorClassEmail_txt = this.$t('txt-wrong5'))
          return false
        } else {
          ;(this.Error.errorClassEmail = ''),
            (this.Error.errorClassEmail_txt = '')
          return true
        }
      }
    },
    syntaxPassword (password) {
      var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/
      if (regex.test(password)) {
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
    clear_data(){
      
      this.supplier.ID = null
      this.supplier.PASS = null
      this.supplier.NAME = null
      this.supplier.SERNAME = null
      this.supplier.TEL = null
      this.supplier.TEL2 = null
      this.supplier.COMPANY = null
      this.supplier.EMAIL = null
      this.supplier.ADDRESS = null
      this.supplier.PROVINCE = null
      this.supplier.ZIP_CODE = null
      this.supplier.DISTRICT = null
      this.supplier.SUB_DISTRICT = null
      
    
      this.admin.ID = '-'
      this.admin.PASS = ''
      this.admin.NAME = '-'
      this.admin.SERNAME = '-'
      this.admin.TEL = ''
      this.admin.TEL2 = '-'
      this.admin.COMPANY = '-'
      this.admin.EMAIL = '-'
      this.admin.ADDRESS = '-'
      this.admin.PROVINCE = null
      this.admin.ZIP_CODE = null
      this.admin.DISTRICT = null
      this.admin.SUB_DISTRICT = null

      
        this.Error.errorClassPwd =  ''
        this.Error.errorClassPwd_txt =  ''
        this.Error.errorClassFirstName =  ''
        this.Error.errorClassFirstName_txt =  ''
        this.Error.errorClassFirstName =  ''
        this.Error.errorClassFirstName_txt =  ''
        this.Error.errorClassLastName =  ''
        this.Error.errorClassLasttName_txt =  ''
        this.Error.errorClassTel =  ''
        this.Error.errorClassTel_txt =  ''
        this.Error.errorClassCompany =  ''
        this.Error.errorClassCompany_txt =  ''
        this.Error.errorClassEmail =  ''
        this.Error.errorClassEmail_txt =  ''

        this.info_sup = ''
      
      
      
    }
  },
  components: {},
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.$router.replace('/')
    } else {
    }
  },
  mounted () {}
}
</script>
<style>
.v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
  height: 26px;
  min-height: 26px;
}

.v-text-field .v-input__slot {
  border-radius: 8px;
  min-height: 34px;
}

.v-text-field.v-input--dense:not(.v-text-field--outlined) input {
  padding-top: 0px;
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none;
  font-size: 16px;
  border: 2px solid rgba(0, 0, 0, 0.12);
}

.v-select:not(.v-select--is-multi).v-text-field--single-line
  .v-select__selections {
  font-size: 14px;
}

.v-dialog {
  border-radius: 8px;
}

.btn-yes {
  width: 104px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 27px;
  margin: 0 10px 10px 0;
}
.btn-no {
  width: 112px;
  height: 40px;
  background: #000000;
  border-radius: 27px;
  color: #fff;
  margin: 0 0 10px 10px;
}
.error-case {
  border: 1px solid red;
  font-size: 12px;
  font-family: 'Bai Jamjuree', sans-serif;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
