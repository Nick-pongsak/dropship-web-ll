<template>
  <div class="detail-table" v-resize="onResize">
    <div class="action-bar" v-if="windowSize > 600">
      <v-checkbox
        @click="check_all()"
        v-model="checkboxALL"
        hide-details
      ></v-checkbox>
      <div class="subtitle">Action</div>
      <div class="btn-filter">Print label</div>
      <v-btn
        rounded
        :disabled="this.select_order.length == 0 ? true : false"
        @click="submit()"
        class="ok"
        >Submit</v-btn
      >
      <div class="count-subtitle">
        พบ {{ data.length }} รายการ (เลือกแล้ว
        {{ this.select_order.length }} รายการ)
      </div>
    </div>
    <div class="action-bar" v-else style="padding:5px 0 5px 0">
      <div class="count-subtitle" style="">พบ {{ data.length }} รายการ</div>
    </div>
    <div class="table d-flex flex-wrap justify-center">

      <div v-if="loading_status"  style="z-index:1;position: absolute;">
      <v-progress-circular
      :size="100"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </div>

      <div
        :class="
          row.checked && row.order_status == 'Delivery'
            ? 'card selected'
            : 'card'
        "
        v-for="(row, index) in data"
        :key="'card-' + index + '-' + row.purchase_id"
      >
        <div class="row-card" style="padding-left: 10px;">
          <div style="display:flex;width:100%">
            <div style="padding-top: 0px;width:7%">
              <v-checkbox
                :disabled="row.order_status != 'Delivery' ? true : false"
                v-model="row.checked"
                @change="push(row.purchase_id)"
                hide-details
              ></v-checkbox>
            </div>
            <div class="title-card" style="padding-top: 5px;">
              หมายเลขคำสั่งซื้อ
            </div>
            <div class="value-card" style="padding-top: 5px;">
              {{ row.purchase_id }}
            </div>
          </div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">ชื่อลูกค้า</div>
          <div class="value-card">{{ row.cus_name }} {{ row.cus_surname }}</div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">วันที่สั่งซื้อ</div>
          <div class="value-card">{{ formatDate(row.order_date) }}</div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">วันที่จัดส่ง</div>
          <div class="value-card">
            {{ formatDate(row.order_delivery_date) }}
          </div>
        </div>
        <div class="row-card">
          <div style="width:7%"></div>
          <div class="title-card">วันที่ส่งสำเร็จ</div>
          <div class="value-card">
            {{ formatDate(row.order_success_date) }}
          </div>
        </div>
        <div class="row-card" style="margin-top: 11px;">
          <div style="width:7%"></div>
          <div style="width:60%;display:flex;padding-left:9px">
            สถานะ
            <div :class="'btn-filter ' + row.order_status.toLowerCase()">
              {{ row.order_status }}
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
            <div @click="print(row)" style="padding-right:5px">
              <v-icon
                v-if="
                  detect_device == 'not_mobile' &&
                    row.order_status == 'Delivery'
                "
                v-text="'mdi-printer'"
                style="color:#000000;cursor:pointer"
                size="20"
              ></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'detail-table',
  props: {
    data: Array,
    status: Array,
    loading_status:Boolean
    // device: String
  },
  data () {
    return {
      windowSize: 1366,
      checkboxALL: false,
      count: 0,
      select_order: [],
      row_select: [],
      dataPage: this.data,
      deviceType: null,
      calcCardWidth: 20,
      monthsShort: [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC'
        // 'ม.ค.',
        // 'ก.พ.',
        // 'มี.ค.',
        // 'เม.ย.',
        // 'พ.ค.',
        // 'มิ.ย.',
        // 'ก.ค.',
        // 'ส.ค.',
        // 'ก.ย.',
        // 'ต.ค.',
        // 'พ.ย.',
        // 'ธ.ค.'
      ]
    }
  },
  computed: {
    detect_device () {
      return Vue.localStorage.get('DETECTED_DEVICE')
    }
  },
  watch: {},
  methods: {
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

        return days + ' ' + monthName + ' ' + fullYear
      } else {
        return val
      }
    },
    push (param) {
      let Deliver = this.data.filter(x => x.order_status === 'Delivering')
      if (this.select_order.length == 0) {
        this.select_order.push(param)
      } else {
        const found = this.select_order.find(element => element == param)
        if (!found) {
          this.select_order.push(param)
        } else {
          this.select_order = this.select_order.filter(x => x !== param)
        }
      }
      if (Deliver.length == this.select_order.length) {
        this.checkboxALL = true
      } else {
        this.checkboxALL = false
      }
      let RowData = this.data.filter(
        x => x.order_status === 'Delivering' && x.checked === true
      )
      console.log('DATA - Check  => ', this.select_order)
      this.row_select = RowData
      console.log('PRINT =>', RowData)
    },
    check_all () {
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index]
        if (this.checkboxALL) {
          if (
            element.order_status == 'Delivery' &&
            element.checked == false
          ) {
            element.checked = true
            this.push(element.purchase_id)
          }
        } else {
          if (element.order_status == 'Delivery') {
            element.checked = false
            this.push(element.purchase_id)
          }
        }
      }
    },
    submit () {
      console.log(this.row_select)
      Vue.localStorage.set('PRINT_LABEL', JSON.stringify(this.row_select))
      setTimeout(() => {
        window.open('/#/PrintLabel')
      }, 200)
      this.$emit('submit', this.dataPage)
    },
    view (row) {
      this.$emit('view', row)
    },
    print (row) {
      let TheArray = []
      // this.$emit('print', row)
      TheArray.push(row)

      Vue.localStorage.set('PRINT_LABEL', JSON.stringify(TheArray))
      setTimeout(() => {
        window.open('/#/PrintLabel')
      }, 100)
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
