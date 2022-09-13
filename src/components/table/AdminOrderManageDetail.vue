<template>
  <div class="detail-table" v-resize="onResize">
    <div class="action-bar" v-if="windowSize > 600">
      <v-checkbox
        @change="push_all()"
        v-model="checkbox_all"
        hide-details
      ></v-checkbox>
      <!-- value="red" -->
      <div class="subtitle">Action</div>
      <div class="btn-filter">Disable</div>
      <v-btn
        :disabled="this.select_order.length == 0 ? true : false"
        rounded
        @click="confirmDisable = true"
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
    <div
      class="table d-flex flex-wrap justify-center"
    >
      <div
        id="test"
        :class="[
          row.disable != 1 &&
          find(row.purchase_id) &&
          row.order_status == 'Complete'
            ? 'card selected'
            : 'card',
          row.disable == 1 ? 'card disable' : ''
        ]"
        v-for="(row, index) in data"
        :key="'card-' + index + '-' + row.purchase_id"
      >
        <div class="row-card" style=";padding-left: 10px;">
          <div style="display:flex;width:100%">
            <div style="padding-top: 0px;width:7%">
              <v-checkbox
                v-if="row.disable == 0 && row.order_status != 'Complete'"
                :disabled="true"
                v-model="checkbox_true"
                hide-details
              ></v-checkbox>
              <!-- :v-model="select_(row.purchase_id)" -->
              <!-- @change="push(row.purchase_id)" -->
              <v-checkbox
                v-else-if="row.disable == 0"
                v-model="select_order"
                :value="row.purchase_id"
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
          <div class="title-card">ชื่อผู้ผลิต</div>
          <div class="value-card">{{ row.sup_name }} {{ row.sup_surname }}</div>
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
          </div>
        </div>
      </div>
      <div
        style="padding-top:8%;font-size: 40px;color: rgba(0, 0, 0, 0.6);"
        class="table d-flex flex-wrap justify-center"
        v-if="data.length == 0"
      >
        ไม่พบข้อมูลที่ค้นหา กรุณากรอกข้อมูลใหม่
      </div>
    </div>

    <v-dialog v-model="confirmDisable" max-width="454" width="454">
      <v-card>
        <div class="d-dialog">
          <div class="bg-confirm">
            <div style="text-align:center">
              <img class="img" src="@/assets/images/no.png" />
            </div>
            <div style="padding:0px 10px">
              คุณต้องการ
              <span style="font-weight: bold;">ลบหมายเลขคำสั่งซื้อใ</span
              >ช่หรือไม่
            </div>
          </div>
          <div class="bg-confirm-action">
            <div>
              <v-btn
                rounded
                @click="submit()"
                class="ok"
                style="margin-right:45px"
                >ใช่</v-btn
              >
              <v-btn rounded @click="confirmDisable = false" class="clear"
                >ไม่</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
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
      confirmDisable: false,
      select_order: [],
      windowSize: 1366,
      checked: true,
      checkbox_all: false,
      checkbox_true: true,
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
  watch: {
    select_order (newValue) {
      let result = this.data.filter(
        x => x.order_status == 'Complete' && x.disable == 0
      )
      if (result.length > 0) {
        if (result.length !== newValue.length) {
          this.checkbox_all = false
        } else {
          this.checkbox_all = true
        }
      }
    }
  },
  methods: {
    push (param) {
      if (this.select_order.length == 0) {
        // console.log('push')
        this.select_order.push(param)
      } else {
        const found = this.select_order.find(element => element == param)
        // console.log(found)
        if (!found) {
          this.select_order.push(param)
        } else {
          this.select_order = this.select_order.filter(x => x !== param)
        }
      }
    },
    formatDate (val) {
      if (val !== null) {
        let hours = ''
        let min = ''
        let today = new Date(val)
        const year = today.getFullYear()
        const fullYear = year + 543
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
    push_all () {
      /*
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        if(element.order_status == 'Complete' && element.disable == 0){
          this.push(element.purchase_id)
        }
      }
      */
      let result = this.data.filter(
        x => x.order_status == 'Complete' && x.disable == 0
      )
      let select_order = JSON.parse(JSON.stringify(this.select_order))
      let purchase = result.map(e => e.purchase_id)
      if (this.checkbox_all) {
        this.select_order = select_order.concat(purchase)
      } else {
        this.select_order = select_order.filter(function (n) {
          return result.indexOf(n) !== -1
        })
      }
    },
    submit () {
      this.confirmDisable = false
      this.checkbox_all = false
      this.$emit('submit', this.select_order)
      this.select_order = []
    },
    find (param) {
      const found = this.select_order.find(element => element == param)
      if (!found) {
        return false
      } else {
        return true
      }
    },
    select_ (param) {
      const found = this.select_order.find(element => element == param)
      if (!found) {
        return false
      } else {
        return true
      }
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
    }
  }
}
</script>
<style></style>
