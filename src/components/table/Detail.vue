<template>
  <div class="detail-table" v-resize="onResize">
    <div class="action-bar" v-if="windowSize > 600">
      <v-checkbox v-model="checkbox" value="red" hide-details></v-checkbox>
      <div class="subtitle">Action</div>
      <div class="btn-filter">Print label</div>
      <v-btn rounded @click="submit()" class="ok">Submit</v-btn>
      <div class="count-subtitle">
        พบ {{ data.length }} รายการ (เลือกแล้ว {{ count }} รายการ)
      </div>
    </div>
    <div class="action-bar" v-else style="padding:5px 0 5px 0">
      <div class="count-subtitle" style="">พบ {{ data.length }} รายการ</div>
    </div>
    <div class="table d-flex flex-wrap justify-start">
      <div
        :class="checkbox ? 'card selected' : 'card'"
        v-for="(row, index) in data"
        :key="'card-' + index + '-' + row.order_no"
      >
        <div class="row-card" style="padding-left: 10px;">
          <div style="display:flex;width:100%">
            <div style="padding-top: 0px;width:7%">
              <v-checkbox
                v-model="checkbox"
                value="red"
                hide-details
              ></v-checkbox>
            </div>
            <div class="title-card" style="padding-top: 5px;">
              หมายเลขคำสั่งซื้อ
            </div>
            <div class="value-card" style="padding-top: 5px;">
              {{ row.order_no }}
            </div>
          </div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">ชื่อลูกค้า</div>
          <div class="value-card">{{ row.customer_name }}</div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">วันที่สั่งซื้อ</div>
          <div class="value-card">{{ formatDate(row.order_date) }}</div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">วันที่จัดส่ง</div>
          <div class="value-card">{{ formatDate(row.delivery_date) }}</div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">วันที่ส่งสำเร็จ</div>
          <div class="value-card">
            {{ formatDate(row.delivery_success) }}
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
            <div class="view-detail">
              ดูรายละเอียด
            </div>
            <v-icon
              v-if="row.status_order_code == 'delivering'"
              v-text="expandFilter ? 'mdi-menu-up' : 'mdi-menu-down'"
              style="color:#000000;cursor:pointer"
              size="28"
            ></v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let arr = []
let statusList = [
  { code: 'all', title: 'All' },
  { code: 'new', title: 'New' },
  { code: 'accept', title: 'Accept' },
  { code: 'delivery', title: 'Delivery' },
  { code: 'delivering', title: 'Delivering' },
  { code: 'complete', title: 'Complete' },
  { code: 'cancel', title: 'Cancel' }
]
for (let i = 0; i < 13; i++) {
  let random = Math.floor(Math.random() * 6)
  random = random == 0 ? 1 : random
  arr.push({
    order_no: 'P0000001' + i,
    customer_name: 'ปิยดา กิตติกรณ์กุล ' + i,
    order_date: '2022-09-02',
    delivery_date: '2022-05-15',
    delivery_success: '2022-11-02',
    status_order_code: statusList[random].code,
    status_order_title: statusList[random].title
  })
}
export default {
  name: 'detail-table',
  props: {
    // device: String
  },
  data () {
    return {
      windowSize: 1366,
      checkbox: false,
      count: 0,
      data: arr,
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
    formatDate (val) {
      let today = new Date(val)
      const year = today.getFullYear()
      const fullYear = year + 543
      const days = today.getDate()
      const monthName = this.monthsShort[today.getMonth()]
      return days + ' ' + monthName + ' ' + fullYear
    },
    submit () {},
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
