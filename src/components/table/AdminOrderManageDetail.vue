<template>
  <div class="detail-table" v-resize="onResize">
    <div class="action-bar" v-if="windowSize > 600">
      <v-checkbox v-model="checkbox" value="red" hide-details></v-checkbox>
      <div class="subtitle">Action</div>
      <div class="btn-filter">Delete</div>
      <v-btn rounded @click="submit()" class="ok">Submit</v-btn>
      <div class="count-subtitle">
        พบ {{ dataPage.length }} รายการ (เลือกแล้ว {{ count }} รายการ)
      </div>
    </div>
    <div class="action-bar" v-else style="padding:5px 0 5px 0">
      <div class="count-subtitle" style="">พบ {{ dataPage.length }} รายการ</div>
    </div>
    <div class="table d-flex flex-wrap justify-center">
      <div
        :class="checkbox ? 'card selected' : 'card'"
        v-for="(row, index) in dataPage"
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
          <div class="title-card">ชื่อผู้ผลิต</div>
          <div class="value-card">{{ row.manufacturer_name }}</div>
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
  </div>
</template>

<script>
export default {
  name: 'detail-table',
  props: {
    data: Array,
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
    formatDate (val) {
      let today = new Date(val)
      const year = today.getFullYear()
      const fullYear = year + 543
      const days = today.getDate()
      const monthName = this.monthsShort[today.getMonth()]
      return days + ' ' + monthName + ' ' + fullYear
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
