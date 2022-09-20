<template>
  <div id="user-profile-page" v-resize="onResize">
    <div class="box-1">
      <div
        :style="{
          display: windowSize <= 600 ? '' : 'flex',
          width: windowSize <= 600 ? '100%' : '65%'
        }"
        class="left"
      >
        <div
          :style="{
            width: '100%',
            'font-family': 'Bai Jamjuree, sans-serif'
          }"
        >
          <div :style="{ width: '100%', padding: windowSize <= 600 ? '12px 15px 12px 15px' : '32px 15px 12px 15px' }">
            <div class="btn-filter">Profile</div>
          </div>
          <div
            :style="{ width: '100%', display: windowSize <= 600 ? '' : 'flex' }"
          >
            <div :style="{ width: windowSize <= 600 ? '100%' : '50%' }">
              <div :style="{ width: '100%', padding: '12px 15px 12px 15px' }">
                <div class="md-layout">
                  <div class="head-40">รหัสผู้ใช้งาน</div>
                  <div class="detail-40" style="">
                    {{ this.profile.user_id }}
                  </div>
                </div>
              </div>
              <div :style="{ width: '100%', padding: '12px 15px 12px 15px' }">
                <div class="md-layout">
                  <div class="head-40">
                    อีเมล <span style="color:red">*</span>
                  </div>
                  <div class="detail-40">
                    <input
                      v-bind:class="[Error.errorClassEmail]"
                      :style="{
                        'background-color':
                          isDisabled || input_cheang_password
                            ? '#DADADA'
                            : '#fff'
                      }"
                      :disabled="isDisabled || input_cheang_password"
                      v-model="profile.user_email"
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
              </div>
              <div :style="{ width: '100%', padding: '12px 15px 12px 15px' }">
                <div class="md-layout">
                  <div class="head-40">
                    ชื่อ <span style="color:red">*</span>
                  </div>
                  <div class="detail-40">
                    <input
                      v-bind:class="[Error.errorClassFirstName]"
                      :style="{
                        'background-color':
                          isDisabled || input_cheang_password
                            ? '#DADADA'
                            : '#fff'
                      }"
                      :disabled="isDisabled || input_cheang_password"
                      v-model="profile.user_name"
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
              </div>
              <div :style="{ width: '100%', padding: '12px 15px 12px 15px' }">
                <div class="md-layout">
                  <div class="head-40">
                    นามสกุล <span style="color:red">*</span>
                  </div>
                  <div class="detail-40">
                    <input
                      v-bind:class="[Error.errorClassLastName]"
                      :style="{
                        'background-color':
                          isDisabled || input_cheang_password
                            ? '#DADADA'
                            : '#fff'
                      }"
                      :disabled="isDisabled || input_cheang_password"
                      v-model="profile.user_surname"
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
              </div>
              <div :style="{ width: '100%', padding: '12px 15px 12px 15px' }">
                <div class="md-layout">
                  <div class="head-40">
                    เบอร์โทรศัพท์<span style="color:red">*</span>
                  </div>
                  <div class="detail-40">
                    <input
                      v-bind:class="[Error.errorClassTel]"
                      :style="{
                        'background-color':
                          isDisabled || input_cheang_password
                            ? '#DADADA'
                            : '#fff'
                      }"
                      :disabled="isDisabled || input_cheang_password"
                      v-model="profile.user_phone"
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
              </div>
            </div>
            <div :style="{ width: windowSize <= 600 ? '100%' : '50%' }">
              <div
                :style="{ width: '100%', padding: '12px 15px 12px 15px' }"
                v-if="windowSize > 600"
              >
                <div class="md-layout" style="visibility: hidden">test</div>
              </div>
              <div :style="{ width: '100%', padding: '12px 15px 12px 15px' }">
                <div v-if="!input_cheang_password" class="md-layout">
                  <div class="head-40">
                    รหัสผ่าน <span style="color:red">*</span>
                  </div>
                  <div class="detail-40">
                    <md-field
                      :md-toggle-password="false"
                      :style="{
                        'background-color': isDisabled ? '#DADADA' : '#fff'
                      }"
                      class="input-style"
                      style="min-height:34px ;margin:0;top:0 ; left:0"
                    >
                      <md-input
                        :disabled="true"
                        class="input-style"
                        type="password"
                        v-model="edit_val.val_pass"
                      ></md-input>
                      <div v-if="isDisabled">
                        <span
                          style="cursor: pointer;padding:0 10px 0 0;"
                          class="md-suffix mdi mdi-eye-off"
                        ></span>
                      </div>

                      <div style="display: flex;" v-else>
                        <span
                          @click="cheang_password"
                          style="display: flex;padding:0 10px 0 0;font-size:12px;align-items: center;cursor: pointer;"
                          >เปลี่ยน</span
                        >
                      </div>
                    </md-field>
                  </div>
                </div>

                <div v-else class="md-layout">
                  <div class="head-40">
                    รหัสผ่านปัจจุบัน <span style="color:red">*</span>
                  </div>
                  <div class="detail-40">
                    <md-field
                      v-bind:class="[Error.errorClassPwd]"
                      :md-toggle-password="false"
                      :style="{
                        'background-color': isDisabled ? '#DADADA' : '#fff'
                      }"
                      class="input-style"
                      style="min-height:34px ;margin:0;top:0 ; left:0"
                    >
                      <md-input
                        class="input-style"
                        :type="!this.icon_eye.password ? 'password' : 'text'"
                        v-model="edit_val.val_pass"
                      ></md-input>
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
                    </md-field>
                    <div
                      v-if="this.Error.errorClassPwd != ''"
                      class="txt-wrong"
                    >
                      <span class="mdi mdi-alert-octagon"></span>
                      {{ this.Error.errorClassPwd_txt }}
                    </div>
                  </div>
                </div>
              </div>
              <div :style="{ width: '100%', padding: '12px 15px 12px 15px' }">
                <div v-if="input_cheang_password" class="md-layout">
                  <div class="head-40">
                    รหัสผ่านใหม่ <span style="color:red">*</span>
                  </div>
                  <div class="detail-40">
                    <md-field
                      v-bind:class="[Error.errorClassNewPwd]"
                      :md-toggle-password="false"
                      :style="{
                        'background-color': isDisabled ? '#DADADA' : '#fff'
                      }"
                      class="input-style"
                      style="min-height:34px ;margin:0;top:0 ; left:0"
                    >
                      <md-input
                        class="input-style"
                        :type="
                          !this.icon_eye.new_password ? 'password' : 'text'
                        "
                        v-model="edit_val.new_password"
                      ></md-input>
                      <span
                        v-if="!this.icon_eye.new_password"
                        @click="HideShow('new_password')"
                        style="cursor: pointer;padding:0 10px 0 0;"
                        class="md-suffix mdi mdi-eye-off"
                      ></span>
                      <span
                        v-else
                        @click="HideShow('new_password')"
                        style="cursor: pointer;padding:0 10px 0 0;"
                        class="md-suffix mdi mdi-eye"
                      ></span>
                    </md-field>
                    <div v-if="this.Error.errorClassNewPwd_txt != ''">
                      <div class="txt-wrong">
                        <span class="mdi mdi-alert-octagon"></span>
                        {{ this.Error.errorClassNewPwd_txt }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div :style="{ width: '100%', padding: '12px 15px 12px 15px' }">
                <div v-if="input_cheang_password" class="md-layout">
                  <div class="head-40">
                    ยืนยันรหัสผ่าน <span style="color:red">*</span>
                  </div>
                  <div class="detail-40">
                    <md-field
                      v-bind:class="[Error.errorClassConfNewPwd]"
                      :md-toggle-password="false"
                      :style="{
                        'background-color': isDisabled ? '#DADADA' : '#fff'
                      }"
                      class="input-style"
                      style="min-height:34px ;margin:0;top:0 ; left:0"
                    >
                      <md-input
                        class="input-style"
                        :type="
                          !this.icon_eye.confrim_new_password
                            ? 'password'
                            : 'text'
                        "
                        v-model="edit_val.confrim_password"
                      ></md-input>
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
              </div>
            </div>
          </div>
          <div
            :style="{
              width: '100%',
              padding: '12px 15px 12px 15px',
              display: 'flex',
              'justify-content': 'flex-end'
            }"
          >
            <div
              v-if="!isDisabled"
              @click="cancel"
              style="cursor: pointer;padding:0 10px 0 0;display: flex;align-items: center;"
            >
              ยกเลิก
            </div>
            <v-btn v-if="isDisabled" rounded class="ok" @click="edit()">
              แก้ไข
            </v-btn>

            <v-btn v-else rounded class="ok" @click="save()">
              บันทึก
            </v-btn>
          </div>
        </div>
        <!-- <b-container
          style="font-family:'Bai Jamjuree', sans-serif "
          class=" accentbv-example-row"
        >
          <b-row>
            <b-col style="" xl>
              <div class="btn-filter">Profile</div>
            </b-col>
          </b-row>

          <b-row>
            <b-col xl>
              <div class="md-layout">
                <div class="head">รหัสผู้ใช้งาน</div>
                <div class="detail" style="">{{ this.profile.user_id }}</div>
              </div>
            </b-col>
            <b-col xl v-if="windowSize > 1200"></b-col>
          </b-row>

          <b-row>
            <b-col xl>
              <div class="md-layout">
                <div class="head">อีเมล <span style="color:red">*</span></div>
                <div class="detail">
                  <input
                    v-bind:class="[Error.errorClassEmail]"
                    :style="{
                      'background-color':
                        isDisabled || input_cheang_password ? '#DADADA' : '#fff'
                    }"
                    :disabled="isDisabled || input_cheang_password"
                    v-model="profile.user_email"
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
            <b-col xl>
              <div v-if="!input_cheang_password" class="md-layout">
                <div class="head">
                  รหัสผ่าน <span style="color:red">*</span>
                </div>
                <div class="detail">
                  <md-field
                    :md-toggle-password="false"
                    :style="{
                      'background-color': isDisabled ? '#DADADA' : '#fff'
                    }"
                    class="input-style"
                    style="min-height:34px ;margin:0;top:0 ; left:0"
                  >
                    <md-input
                      :disabled="true"
                      class="input-style"
                      type="password"
                      v-model="edit_val.val_pass"
                    ></md-input>
                    <div v-if="isDisabled">
                      <span
                        style="cursor: pointer;padding:0 10px 0 0;"
                        class="md-suffix mdi mdi-eye-off"
                      ></span>
                    </div>

                    <div style="display: flex;" v-else>
                      <span
                        @click="cheang_password"
                        style="display: flex;padding:0 10px 0 0;font-size:12px;align-items: center;cursor: pointer;"
                        >เปลี่ยน</span
                      >
                    </div>
                  </md-field>
                </div>
              </div>

              <div v-else class="md-layout">
                <div class="head">
                  รหัสผ่านปัจจุบัน <span style="color:red">*</span>
                </div>
                <div class="detail">
                  <md-field
                    v-bind:class="[Error.errorClassPwd]"
                    :md-toggle-password="false"
                    :style="{
                      'background-color': isDisabled ? '#DADADA' : '#fff'
                    }"
                    class="input-style"
                    style="min-height:34px ;margin:0;top:0 ; left:0"
                  >
                    <md-input
                      class="input-style"
                      :type="!this.icon_eye.password ? 'password' : 'text'"
                      v-model="edit_val.val_pass"
                    ></md-input>
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
                  </md-field>
                  <div v-if="this.Error.errorClassPwd != ''" class="txt-wrong">
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
                <div class="detail">
                  <input
                    v-bind:class="[Error.errorClassFirstName]"
                    :style="{
                      'background-color':
                        isDisabled || input_cheang_password ? '#DADADA' : '#fff'
                    }"
                    :disabled="isDisabled || input_cheang_password"
                    v-model="profile.user_name"
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
            <b-col xl>
              <div v-if="input_cheang_password" class="md-layout">
                <div class="head">
                  รหัสผ่านใหม่ <span style="color:red">*</span>
                </div>
                <div class="detail">
                  <md-field
                    v-bind:class="[Error.errorClassNewPwd]"
                    :md-toggle-password="false"
                    :style="{
                      'background-color': isDisabled ? '#DADADA' : '#fff'
                    }"
                    class="input-style"
                    style="min-height:34px ;margin:0;top:0 ; left:0"
                  >
                    <md-input
                      class="input-style"
                      :type="!this.icon_eye.new_password ? 'password' : 'text'"
                      v-model="edit_val.new_password"
                    ></md-input>
                    <span
                      v-if="!this.icon_eye.new_password"
                      @click="HideShow('new_password')"
                      style="cursor: pointer;padding:0 10px 0 0;"
                      class="md-suffix mdi mdi-eye-off"
                    ></span>
                    <span
                      v-else
                      @click="HideShow('new_password')"
                      style="cursor: pointer;padding:0 10px 0 0;"
                      class="md-suffix mdi mdi-eye"
                    ></span>
                  </md-field>
                  <div v-if="this.Error.errorClassNewPwd_txt != ''">
                    <div class="txt-wrong">
                      <span class="mdi mdi-alert-octagon"></span>
                      {{ this.Error.errorClassNewPwd_txt }}
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col xl>
              <div class="md-layout">
                <div class="head">นามสกุล <span style="color:red">*</span></div>
                <div class="detail">
                  <input
                    v-bind:class="[Error.errorClassLastName]"
                    :style="{
                      'background-color':
                        isDisabled || input_cheang_password ? '#DADADA' : '#fff'
                    }"
                    :disabled="isDisabled || input_cheang_password"
                    v-model="profile.user_surname"
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
            <b-col xl>
              <div v-if="input_cheang_password" class="md-layout">
                <div class="head">
                  ยืนยันรหัสผ่าน <span style="color:red">*</span>
                </div>
                <div class="detail">
                  <md-field
                    v-bind:class="[Error.errorClassConfNewPwd]"
                    :md-toggle-password="false"
                    :style="{
                      'background-color': isDisabled ? '#DADADA' : '#fff'
                    }"
                    class="input-style"
                    style="min-height:34px ;margin:0;top:0 ; left:0"
                  >
                    <md-input
                      class="input-style"
                      :type="
                        !this.icon_eye.confrim_new_password
                          ? 'password'
                          : 'text'
                      "
                      v-model="edit_val.confrim_password"
                    ></md-input>
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
          </b-row>

          <b-row>
            <b-col xl>
              <div class="md-layout">
                <div class="head">
                  เบอร์โทรศัพท์<span style="color:red">*</span>
                </div>
                <div class="detail">
                  <input
                    v-bind:class="[Error.errorClassTel]"
                    :style="{
                      'background-color':
                        isDisabled || input_cheang_password ? '#DADADA' : '#fff'
                    }"
                    :disabled="isDisabled || input_cheang_password"
                    v-model="profile.user_phone"
                    class="input-style"
                  />
                  <div v-if="this.Error.errorClassTel != ''" class="txt-wrong">
                    <span class="mdi mdi-alert-octagon"></span>
                    {{ this.Error.errorClassTel_txt }}
                  </div>
                </div>
              </div>
            </b-col>
            <b-col xl v-if="windowSize > 1200"></b-col>
          </b-row>

          <b-row>
            <b-col
              style="
            display: flex;
            justify-content: flex-end;"
              xl
            >
              <div
                v-if="!isDisabled"
                @click="cancel"
                style="cursor: pointer;padding:0 10px 0 0;display: flex;align-items: center;"
              >
                ยกเลิก
              </div>
              <v-btn v-if="isDisabled" rounded class="ok" @click="edit()">
                แก้ไข
              </v-btn>

              <v-btn v-else rounded class="ok" @click="save()">
                บันทึก
              </v-btn>
            </b-col>
          </b-row>
        </b-container> -->

        <v-dialog v-model="dialog" persistent max-width="454px">
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

        <v-dialog v-model="dialog_success" persistent max-width="454px">
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
                  <div>
                    <img
                      :style="{ height: '200px', width: '200px' }"
                      class="img"
                      src="@/assets/images/success.png"
                    />
                  </div>
                  <div
                    style="color: #000000;font-size: 16px;display: flex;justify-content: center;"
                  >
                    บันทึกสำเร็จ
                  </div>
                </div>
              </v-container>
            </v-card-text>
            <v-card-actions
              style="font-family: 'Bai Jamjuree', sans-serif ; display: flex;
              justify-content: center;"
            >
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
      <div :style="{ width: windowSize <= 600 ? '0%' : '35%' }" class="right">
        <img
          style="width:444px; height: 444px;"
          class="img"
          src="@/assets/images/confrim2.png"
        />
      </div>
    </div>
    <div class="box-2"></div>
  </div>
</template>

<script>
import Vue from 'vue'
var CryptoJS = require('crypto-js')
export default {
  name: 'userprofilepage',
  data () {
    return {
      windowSize: '',
      isDisabled: true,
      dialog: false,
      dialog_success: false,
      input_cheang_password: false,
      type_password: 'password',
      Error: {
        errorClassPwd: '',
        errorClassPwd_txt: '',
        errorClassNewPwd: '',
        errorClassNewPwd_txt: '',
        errorClassConfNewPwd: '',
        errorClassConfNewPwd_txt: '',
        errorClassFirstName: '',
        errorClassFirstName_txt: '',
        errorClassLastName: '',
        errorClassLasttName_txt: '',
        errorClassTel: '',
        errorClassTel_txt: '',
        errorClassEmail: '',
        errorClassEmail_txt: ''
      },
      profile: {},
      edit_val: {
        val_pass: '999999',
        new_password: '',
        confrim_password: ''
      },

      icon_eye: {
        password: false,
        new_password: false,
        confrim_new_password: false
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
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
    edit () {
      this.type_password = 'text'
      this.isDisabled = false
    },
    save () {
      let inp1 = this.checkErrorCase('inp-email', this.profile.user_email)
      let inp2 = this.checkErrorCase('inp-name', this.profile.user_name)
      let inp3 = this.checkErrorCase('inp-surname', this.profile.user_surname)
      let inp4 = this.checkErrorCase('inp-phone', this.profile.user_phone)

      if (this.input_cheang_password) {
        let inp8 = false
        let inp5 = this.checkErrorCase('inp-password', this.edit_val.val_pass)
        let inp6 = this.checkErrorCase(
          'inp-new-password',
          this.edit_val.new_password
        )
        let inp7 = this.checkErrorCase(
          'inp-conf-new-password',
          this.edit_val.confrim_password
        )

        if (inp6 && inp7 && inp5) {
          inp8 = this.checkErrorCase('inp-check-conf-pass', '')
        }

        // console.log('save & cheang Password')
        if (inp1 && inp2 && inp3 && inp4 && inp5 && inp6 && inp7 && inp8) {
          var pwd = this.edit_val.val_pass
          let keyapp = 'DropShipSecretKey'
          var encrypted = CryptoJS.AES.encrypt(pwd, keyapp)

          var pwd2 = this.edit_val.new_password
          let keyapp2 = 'DropShipSecretKey'
          var encrypted2 = CryptoJS.AES.encrypt(pwd2, keyapp2)

          let res = {
            user_id: this.profile.user_id,
            old_password: encodeURI(encrypted),
            new_password: encodeURI(encrypted2)
          }
          this.$store
            .dispatch('changePassword', res)
            .then(res => {
              // console.log(res)
              this.Error.errorClassPwd = ''
              this.Error.errorClassPwd_txt = ''

              this.dialog_success = true
              this.cancel()
            })
            .catch(error => {
              if (error.response.status == 400) {
                this.Error.errorClassPwd = 'error-case'
                this.Error.errorClassPwd_txt = this.$t('txt-wrong9')
                console.log('Error 400')
              }
            })
        } else {
          console.log('save & cheang Password  ==> NOT OK!!!')
        }
      } else {
        if (inp1 && inp2 && inp3 && inp4) {
          let res = {
            user_id: this.profile.user_id,
            user_email: this.profile.user_email,
            user_name: this.profile.user_name,
            user_surname: this.profile.user_surname,
            user_phone: this.profile.user_phone.replace(/ |_/g, '')
          }
          // console.log(res)
          this.$store
            .dispatch('updateProfile', res)
            .then(res => {
              let TheArray = JSON.parse(Vue.localStorage.get('user_profile'))
              TheArray.user_email = this.profile.user_email
              TheArray.user_name = this.profile.user_name
              TheArray.user_surname = this.profile.user_surname
              TheArray.user_phone = this.profile.user_phone
              Vue.localStorage.set('user_profile', JSON.stringify(TheArray))
              this.dialog_success = true

              this.cancel()
            })
            .catch(error => {
              if (error.response.status == 400) {
                this.Error.errorClassEmail = 'error-case'
                this.Error.errorClassEmail_txt = this.$t('txt-wrong14')
                console.log('Error 400')
              }
            })
          console.log('save Profile ==> OK')
        } else {
          console.log('save Profile ==> NOT OK!!!')
        }
      }

      console.log('save')
    },
    checkErrorCase (type, value) {
      // console.log(type , '==> ',value)

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
          this.Error.errorClassEmail = ''
          this.Error.errorClassEmail_txt = ''
          return true
        }
      }

      if (type == 'inp-name') {
        if (value == null || value == '') {
          this.Error.errorClassFirstName = 'error-case'
          this.Error.errorClassFirstName_txt = this.$t('txt-wrong11')
          return false
        } else {
          this.Error.errorClassFirstName = ''
          this.Error.errorClassFirstName_txt = ''
          return true
        }
      }

      if (type == 'inp-surname') {
        if (value == null || value == '') {
          this.Error.errorClassLastName = 'error-case'
          this.Error.errorClassLastName_txt = this.$t('txt-wrong11')
          return false
        } else {
          this.Error.errorClassLastName = ''
          this.Error.errorClassLastName_txt = ''
          return true
        }
      }

      if (type == 'inp-phone') {
        console.log(value)

        if (value == null || value == '' || value == '-') {
          ;(this.Error.errorClassTel = 'error-case'),
            (this.Error.errorClassTel_txt = this.$t('txt-wrong11'))
          return false
        } else {
          ;(this.Error.errorClassTel = ''), (this.Error.errorClassTel_txt = '')
          return true
        }
      }

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
    cancel () {
      this.profile = JSON.parse(Vue.localStorage.get('user_profile'))

      this.Error.errorClassPwd = ''
      this.Error.errorClassPwd_txt = ''
      this.Error.errorClassNewPwd = ''
      this.Error.errorClassNewPwd_txt = ''
      this.Error.errorClassConfNewPwd = ''
      this.Error.errorClassConfNewPwd_txt = ''
      this.Error.errorClassFirstName = ''
      this.Error.errorClassFirstName_txt = ''
      this.Error.errorClassLastName = ''
      this.Error.errorClassLasttName_txt = ''
      this.Error.errorClassTel = ''
      this.Error.errorClassTel_txt = ''
      this.Error.errorClassEmail = ''
      this.Error.errorClassEmail_txt = ''

      this.edit_val.val_pass = '999999'
      this.isDisabled = true
      this.input_cheang_password = false
      this.type_password = 'password'
    },
    cheang () {
      if (this.type_password == 'password') {
        this.type_password = 'text'
      } else {
        this.type_password = 'password'
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
    cheang_password () {
      this.dialog = true
    },
    success_ () {
      this.dialog_success = false
      location.reload()
    },
    confrim_dialog (param) {
      this.dialog = false
      if (param == 'OK') {
        ;(this.Error.errorClassPwd = ''),
          (this.Error.errorClassPwd_txt = ''),
          (this.Error.errorClassNewPwd = ''),
          (this.Error.errorClassNewPwd_txt = ''),
          (this.Error.errorClassConfNewPwd = ''),
          (this.Error.errorClassConfNewPwd_txt = '')

        this.edit_val.val_pass = ''
        this.edit_val.new_password = ''
        this.edit_val.confrim_password = ''

        this.input_cheang_password = true
        this.profile.use_password = ''
        this.profile.confrim_new_password = ''
        this.profile.new_password = ''

        this.profile = JSON.parse(Vue.localStorage.get('user_profile'))
      } else {
      }
    },
    syntaxEmail (email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
      } else {
        return false
      }
    },
    syntaxPassword (password) {
      var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/
      if (regex.test(password)) {
        return true
      } else {
        return false
      }
    }
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
      if (data.user_role != 'admin') {
        this.$router.push('/' + 'adminHome')
      } else {
        this.profile = JSON.parse(Vue.localStorage.get('user_profile'))
      }
    }
    //  if (Vue.localStorage.get("login") == null) {
    //   this.$router.replace("/");
    // } else {
    //   this.profile = JSON.parse(Vue.localStorage.get('user_profile'))

    // }
  },
  mounted () {}
}
</script>
<style>
.v-dialog:not(.v-dialog--fullscreen) {
  border-radius: 40px;
}
.error-case {
  border: 1px solid red;
  font-size: 12px;
  font-family: 'Bai Jamjuree', sans-serif;
}
</style>
