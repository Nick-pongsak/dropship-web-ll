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
    <div class="table">
      <div
        class="card"
        v-for="(row, index) in data"
        :key="'card-' + index + '-' + row.order_no"
      >
        <!-- :style="{ width: calcCardWidth + '%' }" -->
        {{ row.order_no }}
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
  { code: 'complete', title: 'Complete' }
]
for (let i = 0; i < 13; i++) {
  let random = Math.floor(Math.random() * 6)
  let m = i + 1 > 12 ? 1 : i + 1
  arr.push({
    order_no: 'P0000001' + i,
    customer_name: 'ปิยดา กิตติกรณ์กุล ' + i,
    order_date: '2022-' + m + '-' + i,
    delivery_date: '2022-' + m + '-' + i,
    delivery_success: '2022-' + m + '-' + i,
    status_order: statusList[random].code
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
      calcCardWidth: 20
    }
  },
  computed: {},
  watch: {},
  methods: {
    // calcCardWidth () {
    //   for (let i = 5; i > 0; i--) {
    //     let step = this.windowSize / i
    //     if (step > 427) {
    //       return step
    //     } else {
    //       console.log(step)
    //     }
    //   }
    // },
    submit () {},
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      this.windowSize = x
      this.deviceType = window.deviceType()
      console.log(x)
    }
  }
}
</script>
<style></style>
