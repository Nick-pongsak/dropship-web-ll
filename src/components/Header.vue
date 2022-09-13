<template>
  <div style="z-index:1" id="MenuBar" class="header-main">
    <div style="cursor: pointer;width:50%;display:flex;">
      <img
        src="@/assets/icons/logo.png"
        :style="{ height: logo, width: width }"
      />
      <div
        v-if="info.user_role == 'Supplier'"
        @click="action('home')"
        class="sys-name"
        :style="{ 'font-size': sysName }"
      >
        Dropship portal
      </div>
      <div
        v-else
        @click="action(info.user_role == 'supplier' ? 'home' : 'adminHome')"
        class="sys-name"
        :style="{ 'font-size': sysName }"
      >
        Dropship portal
      </div>
    </div>
    <div
      v-if="info.user_role == 'supplier'"
      style="color:#fff;display: flex;width:50%"
      class="right-header justify-end"
    >
      <div
        style="padding:0 10px 0 0;font-weight: 400;font-size: 16px;display: flex; align-items: center;font-family:'Bai Jamjuree', sans-serif;"
      >
        {{ this.timeServer }}
      </div>
      <md-menu md-size="medium" md-align-trigger>
        <md-button style="text-transform:none" md-menu-trigger
          >{{ info.user_name }}{{ ' ' }}{{ info.user_surname
          }}<span class="mdi mdi-menu-down"></span
        ></md-button>
        <md-menu-content class="option-detail">
          <md-menu-item
            @click="user_profile"
            style="font-family: 'Bai Jamjuree', sans-serif;cursor: pointer;"
            >ข้อมูลส่วนตัว
          </md-menu-item>
          <md-menu-item
            @click="action('Policy')"
            style="font-family: 'Bai Jamjuree', sans-serif;cursor: pointer;"
            >นโยบายความเป็นส่วนตัว</md-menu-item
          >
          <md-menu-item
            @click="logout"
            style="font-family: 'Bai Jamjuree', sans-serif;cursor: pointer;"
            >ออกจากระบบ</md-menu-item
          >
        </md-menu-content>
      </md-menu>
    </div>

    <div
      v-else
      style="color:#fff;display: flex;width:50%"
      class="right-header justify-end"
    >
      <div
        style="padding:0 10px 0 0;font-weight: 400;font-size: 16px;display: flex; align-items: center;font-family:'Bai Jamjuree', sans-serif;"
      >
        {{ this.timeServer }}
      </div>
      <md-menu md-size="medium" md-align-trigger>
        <md-button
          style="border: 1px solid #000000; border-radius: 64px;background-color:#fff;"
          md-menu-trigger
          class="box-profile"
        >
          <div class="md-layout">
            <div
              style="width:55%;color:#000; display: flex;align-items: center;"
            >
              {{ info.user_name }}
            </div>
            <div style="width:25%;color:#000">
              <span class="mdi mdi-account-circle mdi-24px"></span>
            </div>
            <div style="text-align: center;width:20%;color:#000">
              <span class="mdi mdi-menu-down mdi-24px"></span>
            </div>
          </div>
        </md-button>
        <!-- <md-button class="box-profile" style="text-transform:none" md-menu-trigger>{{info.frist_name}}{{' '}}{{info.last_name}}<span class="mdi mdi-menu-down"></span></md-button> -->
        <md-menu-content class="option-detail">
          <md-menu-item
            @click="action('adminHome')"
            :style="{
              'background-color': active_menu('adminHome') ? '#2372E7' : '',
              color: active_menu('adminHome') ? '#fff' : ''
            }"
            style="font-family: 'Bai Jamjuree', sans-serif;cursor: pointer;border-radius:5px;"
          >
            หน้าหลัก
          </md-menu-item>

          <md-menu-item
            @click="action('adminProfile')"
            :style="{
              'background-color': active_menu('adminProfile') ? '#2372E7' : '',
              color: active_menu('adminProfile') ? '#fff' : ''
            }"
            style="font-family: 'Bai Jamjuree', sans-serif;color:#fff;background-color: #2372E7;cursor: pointer;border-radius:5px;"
          >
            จัดการบัญชี
          </md-menu-item>

          <md-menu-item
            @click="action('adminManageOrder')"
            :style="{
              'background-color': active_menu('adminManageOrder')
                ? '#2372E7'
                : '',
              color: active_menu('adminManageOrder') ? '#fff' : ''
            }"
            style="font-family: 'Bai Jamjuree', sans-serif;cursor: pointer;border-radius:5px;"
          >
            จัดการ การสั่งซื้อสินค้า
          </md-menu-item>

          <md-menu-item
            @click="action('AdminUserManage')"
            :style="{
              'background-color': active_menu('AdminUserManage')
                ? '#2372E7'
                : '',
              color: active_menu('AdminUserManage') ? '#fff' : ''
            }"
            style="font-family: 'Bai Jamjuree', sans-serif;cursor: pointer;border-radius:5px;"
          >
            จัดการผู้ใช้งาน
          </md-menu-item>

          <md-menu-item
            @click="action('Policy')"
            style="font-family: 'Bai Jamjuree', sans-serif;cursor: pointer;"
            >นโยบายความเป็นส่วนตัว</md-menu-item
          >
          <md-menu-item
            @click="logout"
            style="font-family: 'Bai Jamjuree', sans-serif;cursor: pointer;"
            >ออกจากระบบ</md-menu-item
          >
        </md-menu-content>
      </md-menu>
    </div>
  </div>
</template>

<script>
import { equal } from 'assert'
import Vue from 'vue'
export default {
  name: 'headers',
  props: {},
  data () {
    return {
      sysName: '20px',
      logo: '30px',
      width: '30px',
      resizeHeader: true,
      active: false,
      value: null
    }
  },
  watch: {},
  computed: {
    timeServer () {
      return this.$store.getters.timeServer
    },
    info () {
      var user_info = Vue.localStorage.get('user_profile')
      var TheArray = JSON.parse(user_info)
      return TheArray
    }
  },
  methods: {
    onConfirm () {
      this.value = 'Yes'
      let reMove = ['login', 'SIZE_SCREEN', 'user_profile']
      reMove.forEach(function (element) {
        Vue.localStorage.remove(element)
      })
      this.$router.push('/')
    },
    onCancel () {
      this.value = 'Cancel'
    },
    onResize () {},
    changeTheme (val) {
      this.$store.commit('SetTheme', val)
    },
    action (param) {
      if (param == 'Policy') {
        this.$store.commit('ShowPolicy', true)
      } else {
        let path = '/' + param
        if (path !== this.$route.path) {
          this.$router.push('/' + param)
        }
      }
    },
    active_menu (param) {
      let path = this.$router.app._route.path
      const sliceWay = path.slice(1)
      if (sliceWay === param) {
        return true
      } else {
        false
      }
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        this.value = 'Yes'
        this.$router.push('/')
      })
    },
    user_profile () {
      this.$router.push('/userprofile')
    }
  },
  created () {
    this.$store.dispatch('getTimeServer')
  },
  components: {}
}
</script>
<style>
.header-main {
  width: 100%;
  position: absolute;
  height: 60px;
  left: 0px;
  top: 0px;
  background: #000000;
  display: flex;
  align-items: center;
}

.sys-name {
  color: #fff;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  padding: 0 0 0 10px;
}
.md-overlay {
  background-color: unset !important;
}
.option-detail {
  border-radius: 6px !important;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 12px !important;
  display: flex;
  padding: 10px;
  align-items: flex-end;
  /* width: 139px;
  height: 74px;  */
}

.md-list-item-button.md-list-item-content {
  min-height: 10px;
}
.md-menu-content {
  height: auto;
  /* height: 270px !important; */
  max-height: 350px !important;
}
.md-menu-content-container {
  display: flex;
  justify-content: flex-end;
}
.md-menu-content.md-menu-content-medium {
  min-width: 139px !important;
  min-height: 30px !important;
}
.box-profile {
  cursor: pointer;
  width: 131px;
  height: 31px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 64px;
  align-items: center;
}
</style>
