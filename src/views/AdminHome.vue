<template>
 
    <div style="height:100%" id="page-admin">
      <div style="height: 100%;background-color:#EFF6FF">
            <b-row >
                <b-col  style="padding:50px 0 50px 8%" xl>
                <div class="head-title">Management</div>
                </b-col>
              </b-row>

        <b-container class="admin-card bv-example-row">
          <b-row >

            <b-col @click="cleck_card('adminProfile')" class="card">
            <b-col style="border-radius:16px 16px 0 0;display: flex;justify-content: center;padding:10px 0 0 0;background-color:#000" >
             <img style="" src="@/assets/images/accout.png" alt="">
            </b-col>
            <b-col >
              <span class="txt-title">จัดการบัญชี</span>
            </b-col>
            </b-col>

              
            <b-col  @click="cleck_card('adminManageOrder')" class="card">
            <b-col style="border-radius:16px 16px 0 0;display: flex;justify-content: center;padding:10px 0 0 0;background-color:#000" >
             <img style="" src="@/assets/images/shopping.png" alt="">
            </b-col>
            <b-col >
              <span class="txt-title">จัดการ การสั่งซื้อสินค้า</span>
            </b-col>
            </b-col>

              
            <b-col  @click="cleck_card('AdminUserManage')" class="card">
            <b-col style="border-radius:16px 16px 0 0;display: flex;justify-content: center;padding:10px 0 0 0;background-color:#000" >
             <img style="" src="@/assets/images/Users-Settings.png" alt="">
            </b-col>
            <b-col >
              <span class="txt-title">การจัดการผู้ใช้งาน</span>
            </b-col>
            </b-col>

<!-- 
            <b-col class="card">จัดการ การสั่งซื้อสินค้า</b-col>
            <b-col class="card">การจัดการผู้ใช้งาน</b-col> -->
          </b-row>
        </b-container>

  </div>
<div class="footer">
  <footers text="Copyright © 2019 DHA Siamwalla Ltd. All Rights Reserved." />
</div>

</div>

</template>

<script>
import Vue from "vue";
import Footers from '@/components/Footer'
export default {
  name: 'admin-home',
  data () {
    return {}
  },
  computed: {
   
  },
  watch: {},
  methods: {
    cleck_card(param){
      console.log(param)

      this.$router.push('/'+param)
    }
  },
  components: {Footers},
  created () {
    var user_info = Vue.localStorage.get('user_profile')
    var TheArray = JSON.parse(user_info)
    console.log(TheArray)
     if (Vue.localStorage.get("login") == null && TheArray == null  ) {
      this.$router.replace("/");
    } else if(TheArray.type == 'admin') {


    }else {
       this.$router.replace("/");
    }
  },
  mounted () {}
}
</script>
<style>
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   color: white;
   text-align: center;
   padding:0 20px 20px 0;
}</style>
