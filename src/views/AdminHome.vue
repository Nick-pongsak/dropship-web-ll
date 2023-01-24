<template>
  <div style="height:100%" id="page-admin">
    <div style="overflow-x: scroll;height: 95%;background-color:#EFF6FF">
      <b-row>
        <b-col style="padding:50px 0 50px 10%" xl>
          <div class="head-title">Management</div>
        </b-col>
      </b-row>
 

      <div class="grid">
        <div
        style="cursor: pointer;"
          v-for="(row, index) in menu_admin"
                        :key="'card-' + index"
                        @click="cleck_card(row.path)" 
          >
          <div class="top-box-menu">
            <img style="" :src="require(`@/assets/images/${row.icon}.png`)"   />
          </div> 
          <div class="bottom-box-menu">{{row.txt}}</div>
        </div>
      </div>
      <!-- <div style="padding:0 0 2% 1%">
          <div
                style="margin:0 0 2% 1%;width:30%;"
                  class="cell-s"
                  @click="cleck_card(row.path)" 
                  v-for="(row, index) in menu_admin"
                  :key="'card-' + index">
                  <div 
                  class="box-menu-admin-home">
                  <div class="top-box-menu">
                    <img style="height:100px;" :src="require(`@/assets/images/${row.icon}.png`)"   />
                  </div> 
                  <div class="bottom-box-menu">{{row.txt}}</div>
                  </div>
          </div>
      </div> -->
    </div>
        <div  class="footer">
      <footers
        text="Copyright © 2019 DHA Siamwalla Ltd. All Rights Reserved."
      />
    </div>
  </div>
</template>

<script>
import Footers from '@/components/Footer'
export default {
  name: 'admin-home',
  data () {
    return {
      menu_admin:[
      {
        id:1,
        icon:'accout',
        txt:'จัดการบัญชี',
        path:'adminProfile'
      },
      {
        id:2,
        icon:'shopping',
        txt:'จัดการ การสั่งซื้อสินค้า',
        path:'adminManageOrder'
      },
      {
        id:3,
        icon:'Users-Settings',
        txt:'จัดการผู้ใช้งาน',
        path:'AdminUserManage'
      },
      {
        id:4,
        icon:'settings',
        txt:'จัดการ บริษัทขนส่ง',
        path:'AdminShipping'
      },
      {
        id:5,
        icon:'wallet',
        txt:'จัดการ อีเมลฝ่ายบัญชี',
        path:'AdminAccountEmail'
      },
    ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    cleck_card (param) {
      this.$router.push('/' + param)
    }
  },
  components: { Footers },
  created () {
    const items = { ...localStorage };

    console.log(items)

    if (
      this.$store.getters.user_profile === null &&
      sessionStorage.getItem('user_profile') === null
    ) {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    } else if (sessionStorage.getItem('user_profile') !== null) {
      let data = JSON.parse(sessionStorage.getItem('user_profile'))
      if (data.user_role == 'supplier') {
        this.$router.push('/' + 'home')
      }else {
      
      }
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
  padding: 0 20px 20px 0;
}

.cell-s {
  height: 250px;
  display: inline-block;
}



.grid {
  padding:0 10% 0 10%;
  /* height:250px; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.5fr 0.5fr 0.5fr;
  grid-gap: 70px;
}

.grid div {
  width: 100%;
  height: 220px;
  /* background: green; */
  padding: .1em;
}


</style>
