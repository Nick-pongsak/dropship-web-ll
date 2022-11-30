<template>
    <div style="" class="detail-table" v-resize="onResize">
      <div  class="" style=" ;padding:8px 23px 8px 0">
        <b-row>
        <b-col style="padding:20px 0 0px 8%" xl>
            <div style="width:90%">
                <div class="btn-filter-title">LIST SHIPPING</div>
            </div>
        </b-col>
      </b-row>

        <div class="count-subtitle" style="width:40%">
          <!-- พบ {{ data.length }} รายการ -->
        </div>
        <div style="padding:10px 20px 20px 0;width:100%;text-align:end;">
          <v-btn rounded  @click="view_add()" class="ok" style="padding:20px 10px 20px 10px;width:unset"
            >+ Add shipping
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
          :key="'card-' + index + '-' + row.order_no"
        >
          <div class="row-card" style="padding-left: 10px;">
            <div style="width:7%"></div>
            <div class="title-card" style="padding-top: 5px;">
              รหัสบริษัทขนส่ง
            </div>
            <div class="value-card" style="padding-top: 5px;">
              {{ row.shipping_code }}
            </div>
          </div>
          <div class="row-card">
            <div style="width:7%"></div>
            <div class="title-card">ชื่อบริษัทขนส่ง</div>
            <div class="value-card">
              {{ row.shipping_name }}
            </div>
          </div>
          <div class="row-card">
            <div style="width:7%"></div>
            <div class="title-card">ลิงก์ติดตามพัสดุ</div>
            <a @click="action_link(row.shipping_track_link)" style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis; " class="value-card">{{ row.shipping_track_link }}</a>
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
        ]
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
  