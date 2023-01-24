<template>
    <div style="" class="detail-table" v-resize="onResize">
      <div  class="" style=" ;padding:8px 23px 8px 0">
        <b-row>
        <b-col style="padding:20px 0 0px 8%" xl>
            <div style="width:90%">
                <div class="btn-filter-title">Accounts Email</div>
            </div>
        </b-col>
      </b-row>

        <div class="count-subtitle" style="width:40%">
          <!-- พบ {{ data.length }} รายการ -->
        </div>
        <div style="padding:10px 20px 20px 0;width:100%;text-align:end;">
          <v-btn rounded  @click="view_add()" class="ok" style="padding:20px 10px 20px 10px;width:unset"
            >+ Add Email
          </v-btn>
        </div>
      </div>
      <div v-if="data.length != 0" class="table d-flex flex-wrap justify-center">
        <div v-if="loading_status"  style="z-index:1;position: absolute;">
        <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
      </div>
        <div
    
          :class="checkbox ? 'card selected' : 'card'"
          v-for="(row, index) in data"
          :key="'card-' + index + '-' + row.id"
        >
          <div class="row-card" style="padding-left: 10px;">
            <div style="width:7%"></div>
            <div class="title-card" style="padding-top: 5px;">
              อีเมล
            </div>
            <div class="value-card" style="padding-top: 5px;">
              {{ row.acc_email }}
            </div>
          </div>
          <div class="row-card">
            <div style="width:7%"></div>
            <div class="title-card">ชื่อ</div>
            <div class="value-card">
              {{ row.acc_name }}
            </div>
          </div>
        

          <div class="row-card" style="margin-top: 11px;">
            <div style="width:7%"></div>
            <div style="width:60%;display:flex;padding-left:9px">
              สถานะ
              <div :class="'btn-filter ' + renderStatus(row, 'class')">
                {{ renderStatus(row, 'text') }}
              </div>
            </div>
            <div style="width:33%;display:flex;justify-content:center">
              <div
                class="view-detail"
                @click="view(row)"
                style="margin-right:10px"
              >
                แก้ไข
              </div>
            </div>
          </div>
         
          
        </div>

  
      </div>
      <div
        style="padding-top:8%;font-size: 40px;color: rgba(0, 0, 0, 0.6);"
        class="table d-flex flex-wrap justify-center"
        v-else
      >
        ไม่พบข้อมูลที่ค้นหา กรุณากรอกข้อมูลใหม่
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'detail-table',
    props: {
      data: Array,
      loading_status: Boolean
    },
    data () {
      return {
        windowSize: 1366,
        checkbox: false,
        count: 0,
        dataPage: this.data,
        deviceType: null,
        calcCardWidth: 20,
       
      }
    },
    computed: {},
    watch: {},
    methods: {
      action_link( param ){
        window.open(param);
      },
      renderStatus (row, mode) {
        if (mode == 'class') {
          return row.is_active == 1 ? 'active' : 'inactive'
        } else {
          return row.is_active == 1 ? 'Active' : 'Inactive'
        }
      },
     
      // formatDate(val) {
      //  return val
      // },
      submit () {
        this.$emit('submit', this.dataPage)
      },
      view (row) {
        this.$emit('viewEdit', row)
      },
      view_add(){
        this.$emit('viewAdd')
      },
      print (row) {
        this.$emit('print', row)
      },
      onResize () {
        let x = window.innerWidth
        let y = window.innerHeight
        this.windowSize = x
        this.deviceType = window.deviceType()
        // console.log(x)
      }
    }
  }
  </script>
  <style>
  .footer-card {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: red;
    color: white;
    text-align: center;
  }
</style>
  