<template>
  <div class="detail-table" v-resize="onResize">
    <div class="action-bar" style="padding:8px 23px 8px 0">
      <div class="count-subtitle" style="width:40%">
        พบ {{ data.length }} รายการ
      </div>
      <div style="width:60%;text-align:end;">
        <v-btn rounded @click="submit()" class="ok" style="width:unset"
          >+ Add Suppiler
        </v-btn>
      </div>
    </div>
    <div v-if="data.length != 0" class="table d-flex flex-wrap justify-center">
      <div 
        :class="checkbox ? 'card selected' : 'card'"
        v-for="(row, index) in data"
        :key="'card-' + index + '-' + row.order_no"
      >
        <div class="row-card" style="padding-left: 10px;">
          <div style="width:7%"></div>
          <div class="title-card" style="padding-top: 5px;">
            รหัสผู้ใช้งาน
          </div>
          <div class="value-card" style="padding-top: 5px;">
            {{ row.user_id }}
          </div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">ชื่อ</div>
          <div class="value-card">{{ row.user_name }}</div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">อีเมล</div>
          <div class="value-card">{{ row.user_email }}</div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">วันที่สร้าง</div>
          <div class="value-card">{{ formatDate(row.user_create_date) }}</div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">เข้าใช้งานล่าสุด</div>
          <div class="value-card">{{ formatDate(row.user_latest_login) }}</div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">อัปเดตล่าสุด</div>
          <div class="value-card">
            {{ formatDate(row.user_latest_active) }}
          </div>
        </div>
        <div class="row-card" style="margin-top: 11px;">
          <div style="width:7%"></div>
          <div style="width:60%;display:flex;padding-left:9px">
            สถานะ
            <div :class="'btn-filter ' + row.status_order_code">
              {{ row.status_order_title }}
            </div>
          </div>
          <div style="width:33%;display:flex">
            <div
              class="view-detail"
              @click="view(row)"
              style="margin-right:10px"
            >
              ดูรายละเอียด
            </div>
          </div>
        </div>
      </div>
  
    </div>
    <div style="padding-top:8%;font-size: 40px;color: rgba(0, 0, 0, 0.6);"  class="table d-flex flex-wrap justify-center" v-else>ไม่พบข้อมูลที่ค้นหา กรุณากรอกข้อมูลใหม่ </div>
  </div>
</template>

<script>
export default {
  name: 'detail-table',
  props: {
    data: Array
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
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    // formatDate(val) {
    //   console.log(val)
    //   let today = new Date(val)
    //   const year = today.getFullYear()
    //   const fullYear = year + 543
    //   const days = today.getDate()
    //   const monthName = this.monthsShort[today.getMonth()]
    //   return days + ' ' + monthName + ' ' + fullYear
    // },
    formatDate(val) {
     return val
    },
    submit () {
      this.$emit('submit', this.dataPage)
    },
    view (row) {
      this.$emit('view', row)
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
<style></style>
