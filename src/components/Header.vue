<template>
  <div style="z-index:1" class="header-main">
     
    <div style="width:50%;display:flex;">
      <img src="@/assets/icons/logo.png" :style="{ height: logo , width: width }" />
      <div class="sys-name" :style="{ 'font-size': sysName }">
        Dropship portal
      </div>
    </div>

    <div v-if="info.type == 'user' " style="color:#fff;display: flex;width:50%" class="right-header justify-end">
      <div style="padding:0 10px 0 0;font-weight: 400;font-size: 16px;display: flex; align-items: center;font-family:'Bai Jamjuree', sans-serif;">{{this.timeServer}}</div>
   <md-menu md-size="medium" md-align-trigger>
    
      <md-button style="text-transform:none" md-menu-trigger>{{info.frist_name}}{{' '}}{{info.last_name}}<span class="mdi mdi-menu-down"></span></md-button>
      <md-menu-content class="option-detail" >
        <md-menu-item @click="user_profile" style="cursor: pointer;">Setting Profile </md-menu-item>
        <md-menu-item @click="logout" style="cursor: pointer;">Log Out</md-menu-item>
      </md-menu-content>
    </md-menu>
    </div>

     <div  v-else style="color:#fff;display: flex;width:50%" class="right-header justify-end">
      <div style="padding:0 10px 0 0;font-weight: 400;font-size: 16px;display: flex; align-items: center;font-family:'Bai Jamjuree', sans-serif;">{{this.timeServer}}</div>
       <md-menu md-size="medium" md-align-trigger>
        <md-button style="border: 1px solid #000000; border-radius: 64px;background-color:#fff;" md-menu-trigger class="box-profile">
            <div class="md-layout"> 
              <div style="width:55%;color:#000; display: flex;align-items: center;">{{info.frist_name}}</div>
              <div style="width:25%;color:#000"><span class="mdi mdi-account-circle mdi-24px"></span></div> 
              <div style="text-align: center;width:20%;color:#000"><span class="mdi mdi-menu-down mdi-24px"></span>
            </div>
        </div>
           
        </md-button>
      <!-- <md-button class="box-profile" style="text-transform:none" md-menu-trigger>{{info.frist_name}}{{' '}}{{info.last_name}}<span class="mdi mdi-menu-down"></span></md-button> -->
      <md-menu-content class="option-detail" >
        <md-menu-item @click="user_profile" style="background-color:red;cursor: pointer;border-radius:5px;">Setting Profile </md-menu-item>
        <md-menu-item @click="logout" style="cursor: pointer;">Log Out</md-menu-item>
      </md-menu-content>
    </md-menu>
        <!-- <div  @click="logout" class="md-layout box-profile">
            <div style="text-align: center;width:55%;color:#000">{{info.frist_name}}</div>
            <div style="width:25%;color:#000"><span class="mdi mdi-account-circle mdi-24px"></span></div>
            <div style="text-align: center;width:20%;color:#000"><span class="mdi mdi-menu-down mdi-24px"></span></div>
        </div> -->
    </div>
    <!-- <md-dialog-confirm
      :md-active.sync="active"
      md-title="Do you want to log out?"
      md-content="Log out of Dropship Portal."
      md-confirm-text="Yes"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" /> -->
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
      value: null,
      // items: ['HOME', 'User management', 'Order management', 'Account management'],
      selectedItem: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
        statusList: [
        { code: 'all', title: 'All' },
        { code: 'new', title: 'New' },
        { code: 'accept', title: 'Accept' },
        { code: 'delivery', title: 'Delivery' },
        { code: 'delivering', title: 'Delivering' },
        { code: 'complete', title: 'Complete' }
      ],
    }
  },
  watch: {},
  computed: {
   
    timeServer(){
      return this.$store.getters.timeServer
    },
    info(){
        var user_info = Vue.localStorage.get('user_profile')
        var TheArray = JSON.parse(user_info)
      return TheArray
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
          'TYPE_USER'

         ]
           reMove.forEach(function(element) {
          Vue.localStorage.remove(element);
        });
         this.$router.push('/')
        // this.active = true
    },
    user_profile(){
       this.$router.push('/userprofile')
    }
  },
  created(){
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
.sys-name{
  color:#fff;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  padding:0 0 0 10px;

}
.md-overlay{
  background-color: unset !important;
}
.option-detail{
  border-radius: 6px !important;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  padding:10px;
  font-size: 12px !important;
  align-items: flex-end;
  /* width: 139px;
  height: 74px;  */

}
.md-menu-content-container{
    display: flex; 
    justify-content: flex-end;
}
.md-menu-content.md-menu-content-medium {
    min-width: 139px !important;
    min-height: 74px !important;
}
.box-profile{
  cursor: pointer;
  width: 131px;
  height: 31px;
  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 64px;
  align-items: center;
}

  </style>
