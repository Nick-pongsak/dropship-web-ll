<template>
  <div class="header-main">
     
    <div style="width:50%;display:flex;cursor:pointer" @click="goHome">
      <img src="@/assets/icons/logo.png" :style="{ height: logo , width: width }" />
      <div class="sys-name" :style="{ 'font-size': sysName }">
        Dropship portal
      </div>
    </div>
    <div style="color:#fff;display: flex;width:50%" class="right-header justify-end">
   <md-menu md-size="medium" md-align-trigger>
   
      <md-button style="text-transform:none" md-menu-trigger>{{info.frist_name}}{{' '}}{{info.last_name}} <span class="mdi mdi-account-circle mdi-18px"></span><span class="mdi mdi-menu-down"></span></md-button>

      <md-menu-content style="background-color:#fff;">
        <md-menu-item style="cursor: pointer;">Setting</md-menu-item>
        <md-menu-item @click="logout" style="cursor: pointer;">Logout</md-menu-item>
      </md-menu-content>
    </md-menu>
    </div>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Do you want to log out?"
      md-content="Log out of Dropship Portal."
      md-confirm-text="Yes"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
import Vue from "vue";
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
    info () {
      return JSON.parse(Vue.localStorage.get('user_profile'))
    }
  },
  methods: {
    onConfirm () {
        this.value = 'Yes'
         let reMove = [
          'login',
          'SIZE_SCREEN',
          'user_profile'
         ]
           reMove.forEach(function(element) {
          Vue.localStorage.remove(element);
        });
         this.$router.push('/')
    },
    onCancel () {
        this.value = 'Cancel'
    },
    onResize () {},
    changeTheme (val) {
      this.$store.commit('SetTheme', val)
    },
    goHome () {
      if (this.$router.app._route.path !== '/home') {
        this.$router.push('/home')
      }
    },
       logout(){
        this.value = 'Yes'
         let reMove = [
          'login',
          'SIZE_SCREEN',
          'CLICK_PAGE_FORGOT',
          'user_profile',
          'loc_email_forgor',

         ]
           reMove.forEach(function(element) {
          Vue.localStorage.remove(element);
        });
         this.$router.push('/')
        // this.active = true
    }
  },
  created () {},
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
.sys-name{
  color:#fff;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;

}
.md-overlay{
  background-color: unset !important;
}
  </style>
