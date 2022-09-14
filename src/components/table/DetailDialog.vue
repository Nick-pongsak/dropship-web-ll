<template>
  <div v-resize="onResize" id="detail-dialog">
    <div
      class="d-dialog"
      :style="{
        padding: windowSize < 600 ? '10px 5px 10px 0px' : '25px 25px 15px 25px'
      }"
    >
      <div style="width:100%;display:flex">
        <div
          :style="{
            padding:
              windowSize < 600 ? '10px 10px 0px 10px' : '0px 0px 0px 5px',
            width: '70%'
          }"
        >
          <div class="btn-filter">Order Detail</div>
        </div>
        <div
          :style="{
            padding: windowSize < 600 ? '15px 2px 0px 0px' : '5px 5px 0px 0px',
            'text-align': 'end',
            width: '30%'
          }"
          @click="close()"
        >
          <v-icon
            v-text="'mdi-close'"
            style="color:#000000;cursor:pointer"
            size="24"
          ></v-icon>
        </div>
      </div>
      <div class="smaill-body">
        <div style="width:100%;padding:13px 0px 10px 20px">
          <div class="d-dialog-title">หมายเลขคำสั่งซื้อ</div>
          <div class="d-dialog-value">{{ data.purchase_id }}</div>
        </div>
        <div style="width:100%;padding:0px 20px">
          <!------------------>
          <div
            :style="{
              width: '100%',
              display: windowSize < 600 ? '' : 'flex'
            }"
          >
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex',
                'padding-bottom': windowSize < 600 ? '0px' : '0px'
              }"
            >
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '40%' : '30%',
                  'padding-bottom': windowSize < 600 ? '10px' : '0px'
                }"
              >
                ชื่อลูกค้า
              </div>
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '60%' : '70%',
                  'padding-bottom': windowSize < 600 ? '0px' : '0px',
                  'padding-right': windowSize < 600 ? '10px' : '0px'
                }"
              >
                {{ data.cus_name }} {{ data.cus_surname }}
              </div>
            </div>
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex'
              }"
            >
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '40%' : '30%',
                  'padding-bottom': windowSize < 600 ? '0px' : '0px'
                }"
              >
                วันที่สั่งซื้อ
              </div>
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '60%' : '70%'
                }"
              >
                {{ formatDate(data.order_date) }}
              </div>
            </div>
          </div>
          <!------------------>
          <div
            :style="{
              width: '100%',
              'padding-top': '6px',
              display: windowSize < 600 ? '' : 'flex'
            }"
          >
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex',
                'padding-bottom': windowSize < 600 ? '0px' : '0px'
              }"
            >
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '40%' : '30%',
                  'padding-bottom': windowSize < 600 ? '0px' : '0px'
                }"
              >
                ที่อยู่
              </div>
              <div
                :class="'d-dialog-title'"
                :style="{
                  width: windowSize < 600 ? '60%' : '70%',
                  'padding-bottom': windowSize < 600 ? '5px' : '0px'
                }"
              >
                {{ data.cus_address }}
              </div>
            </div>
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? '' : 'flex'
              }"
            >
              <div style="width:100%">
                <div style="width:100%;display:flex">
                  <div
                    class="d-dialog-title desc"
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    วันที่จัดส่ง
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    {{ formatDate(data.order_delivery_date) }}
                  </div>
                </div>
                <div style="width:100%;display:flex;padding-top:7px">
                  <div
                    class="d-dialog-title desc"
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    วันที่ส่งสำเร็จ
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    {{ formatDate(data.order_success_date) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!------------------>
          <div
            :style="{
              width: '100%',
              'padding-top': '6px',
              display: windowSize < 600 ? '' : 'flex'
            }"
          >
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex',
                'padding-bottom': windowSize < 600 ? '0px' : '0px'
              }"
            >
              <div
                class="d-dialog-title desc"
                :style="{
                  width: windowSize < 600 ? '40%' : '30%',
                  'padding-bottom': windowSize < 600 ? '10px' : '0px'
                }"
              >
                เบอร์โทรศัพท์
              </div>
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '60%' : '70%',
                  'padding-bottom': windowSize < 600 ? '5px' : '0px'
                }"
              >
                {{ data.cus_phone }}
              </div>
            </div>
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? '' : 'flex'
              }"
            >
              <div style="width:100%">
                <div style="width:100%;display:flex">
                  <div
                    class="d-dialog-title desc"
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    สถานะ
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    {{ data.order_status }}
                  </div>
                </div>
                <div style="width:100%;display:flex;padding-top:7px">
                  <div
                    class="d-dialog-title desc"
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    หมายเหตุ
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    {{ data.order_remarks }}
                  </div>
                </div>
                <div style="width:100%;display:flex;padding-top:7px">
                  <div
                    class="d-dialog-title desc"
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    จะต้องจัดส่งภายใน
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    <span> {{ formatDate(data.order_delivery_due_date) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!------------------>
          <div
            class="d-table"
            :style="{
              'padding-top': windowSize < 600 ? '10px' : '15px'
            }"
          >
            <div class="d-head" v-if="windowSize >= 600">
              <div style="width:3%;text-align:center">{{ headColum[0] }}</div>
              <div style="width:10%;padding-left:20px">{{ headColum[1] }}</div>
              <div style="width:47%;padding-left:10px;">
                {{ headColum[2] }}
              </div>
              <div style="width:10%;text-align:center;padding-left:5px;">
                {{ headColum[3] }}
              </div>
              <div style="width:30%;padding-left:17px">{{ headColum[4] }}</div>
            </div>
            <div class="d-body">
              <div
                class="d-body-row"
                v-for="(row, index) in data.items"
                :key="index + row.index"
                :style="{
                  'border-radius': renderBorder(index),
                  'border-top':
                    index == 0 ? '0.7px solid rgba(0, 0, 0, 0.2)' : '',
                  display: windowSize < 600 ? 'block' : 'flex',
                  padding: windowSize < 600 ? '0px 10px 0px 0px' : '8px 20px'
                }"
              >
                <div
                  :style="{
                    width: windowSize < 600 ? '100%' : '3%',
                    'text-align': windowSize < 600 ? 'left' : 'center'
                  }"
                >
                  <div style="width:100%;display:flex">
                    <div class="small-row-title" v-if="windowSize < 600">
                      {{ headColum[0] }}
                    </div>
                    <div
                      class="small-row-value"
                      :style="{ width: windowSize < 600 ? '60%' : '100%' }"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>
                </div>
                <div
                  :style="{
                    width: windowSize < 600 ? '100%' : '10%',
                    'padding-left': windowSize < 600 ? '0px' : '10px'
                  }"
                >
                  <div style="width:100%;display:flex">
                    <div class="small-row-title" v-if="windowSize < 600">
                      {{ headColum[1] }}
                    </div>
                    <div
                      class="small-row-value"
                      :style="{ width: windowSize < 600 ? '60%' : '100%' }"
                    >
                      {{ row.product_sku }}
                    </div>
                  </div>
                </div>
                <div
                  :style="{
                    width: windowSize < 600 ? '100%' : '47%',
                    'padding-right': windowSize < 600 ? '0px' : '10px'
                  }"
                >
                  <div style="width:100%;display:flex">
                    <div class="small-row-title" v-if="windowSize < 600">
                      {{ headColum[2] }}
                    </div>
                    <div
                      class="small-row-value"
                      :style="{ width: windowSize < 600 ? '60%' : '100%' }"
                    >
                      {{ row.product_name }}
                    </div>
                  </div>
                </div>
                <div
                  :style="{
                    width: windowSize < 600 ? '100%' : '10%'
                  }"
                >
                  <div style="width:100%;display:flex">
                    <div class="small-row-title" v-if="windowSize < 600">
                      {{ headColum[3] }}
                    </div>
                    <div
                      class="small-row-value"
                      :style="{
                        'text-align': windowSize < 600 ? 'left' : 'center',
                        width: windowSize < 600 ? '60%' : '100%'
                      }"
                    >
                      {{ currency(row.order_qty) }}
                    </div>
                  </div>
                </div>
                <div
                  :style="{
                    width: windowSize < 600 ? '100%' : '30%',
                    'padding-right': windowSize < 600 ? '0px' : '10px',
                    'padding-left': windowSize < 600 ? '' : '10px'
                  }"
                >
                  <div style="width:100%;display:flex;">
                    <div class="small-row-title" v-if="windowSize < 600">
                      {{ headColum[4] }}
                    </div>
                    <div
                      class="small-row-value"
                      :style="{ width: windowSize < 600 ? '60%' : '100%' }"
                    >
                      {{ data.order_detail_remark }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-dialog-action">
        <div
          @click="printIcon()"
          style="padding-right:25px;padding-top:8px"
          v-if="
            detect_device == 'not_mobile' && data.order_status == 'Delivery'
          "
        >
          <v-icon
            v-text="'mdi-printer'"
            style="color:#000000;cursor:pointer"
            size="20"
          ></v-icon>
        </div>
        <v-btn rounded @click="accept()" class="ok" v-if="renderBtn() !== ''">{{
          renderBtn()
        }}</v-btn>
      </div>
    </div>

    <v-dialog
      v-model="confirmDialog"
      max-width="500"
      :width="data.order_status == 'Delivering' ? 600 : 500"
    >
      <v-card>
        <div class="d-dialog">
          <div class="bg-confirm">
            <div style="text-align:center">
              <img
                v-if="confirmPrint"
                class="img"
                src="@/assets/images/other.png"
              />
              <img v-else class="img" src="@/assets/images/confrim.png" />
            </div>
            <div style="padding:0px 20px">{{ confirmText }}</div>
          </div>
          <div class="bg-confirm-action">
            <div
              class="bg-confirm-action-action"
              :style="{
                display: windowSize < 600 ? 'grid' : 'flex'
              }"
              v-if="data.order_status == 'Delivering'"
            >
              <div
                style="display:flex;margin-right:25px"
                @click="ratio('customer')"
              >
                <div
                  :class="radio == 'customer' ? 'd-ratio selected' : 'd-ratio'"
                ></div>
                <div class="d-v-label">พัสดุการนำจ่ายถึงลูกค้า</div>
              </div>
              <div style="display:flex" @click="ratio('supply')">
                <div
                  :class="radio == 'supply' ? 'd-ratio selected' : 'd-ratio'"
                ></div>
                <div class="d-v-label">พัสดุส่งกลับผู้ขาย</div>
              </div>
            </div>
            <div>
              <v-btn
                rounded
                @click="submit()"
                class="ok"
                style="margin-right:45px"
                >{{ confirmBtn }}</v-btn
              >
              <v-btn rounded @click="cancel()" class="clear">ไม่</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirmDialog_print"
      max-width="500"
      :width="data.order_status == 'Delivering' ? 600 : 500"
    >
      <v-card>
        <div class="d-dialog">
          <div class="bg-confirm">
            <div style="text-align:center">
              <img
                
                class="img"
                src="@/assets/images/other.png"
              />
            </div>
            <div style="padding:0px 20px">{{ confirmText_print }}</div>
          </div>
          <div class="bg-confirm-action">
            <div>
              <v-btn
                rounded
                @click="submit_print( data )"
                class="ok"
                style="color:#fff;margin-right:45px"
                > ใช่ </v-btn
              >
              <v-btn rounded @click="confirmDialog_print = false" class="clear">ไม่</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'detail-dialog',
  props: {
    data: Object,
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      windowSize: 1366,
      confirmText: '',
      confirmDialog_print:false,
      confirmText_print:'',
      confirmBtn: '',
      confirmDialog: false,
      confirmPrint: false,
      radio: 'customer',
      monthsShort: [
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
      ],
      headColum: ['#', 'SKU', 'รายการสินค้า', 'จำนวน', 'หมายเหตุ']
    }
  },
  computed: {
    detect_device () {
      return Vue.localStorage.get('DETECTED_DEVICE')
    },
    dialog: {
      get () {
        return this.show
      },
      set (value) {
        this.close()
      }
    }
  },
  watch: {},
  methods: {
    currency (qty) {
      return window.currency(qty)
    },
    ratio (val) {
      this.radio = val
    },
    renderBtn () {
      if (this.data.order_status == 'New') {
        return 'Accept'
      } else if (this.data.order_status == 'Accept') {
        return 'Delivery'
      } else if (this.data.order_status == 'Delivery') {
        return 'Delivering'
      } else if (this.data.order_status == 'Delivering') {
        return 'Complete'
      } else {
        return ''
      }
    },
    renderBorder (index) {
      if (index == 0) {
        return '8px 8px 0px 0px'
      } else if (index == this.data.items.length - 1) {
        return '0px 0px 8px 8px'
      } else {
        return '0px'
      }
    },
    formatDate (val) {
      if (val !== null) {
        let hours = ''
        let min = ''
        let today = new Date(val)
        const year = today.getFullYear()
        const fullYear = year
        const days = today.getDate()
        const monthName = this.monthsShort[today.getMonth()]

        return days + ' ' + monthName + ' ' + fullYear
      } else {
        return val
      }
    },
    close () {
      this.$emit('close', {})
    },
    submit_print( param ){
      let TheArray = []
      TheArray.push(param)
      Vue.localStorage.set('PRINT_LABEL', JSON.stringify(TheArray))

      setTimeout(() => {
        window.open('/#/PrintLabel')
      }, 1000)
      this.confirmDialog_print = false
      // console.log(param)
    },
    accept () {
      this.confirmPrint = false
      if (this.data.order_status == 'New') {
        this.confirmText = 'คุณต้องการยืนยันรายการเป็นสถานะ Accept ใช่หรือไม่ ?'
      } else if (this.data.order_status == 'Accept') {
        this.confirmText =
          'คุณต้องการยืนยันรายการเป็นสถานะ Delivery ใช่หรือไม่ ?'
      } else if (this.data.order_status == 'Delivery') {
        this.confirmText =
          'คุณต้องการยืนยันรายการเป็นสถานะ Delivering ใช่หรือไม่ ?'
      } else if (this.data.order_status == 'Delivering') {
        this.confirmText = 'การจัดส่งพัสดุสำเร็จ'
      } else {
        this.confirmText = ''
      }

      this.confirmBtn = 'ใช่'
      this.confirmDialog = true
    },
    submit () {
      let process = ''
      if (this.data.order_status == 'New') {
        this.radio = ''
        process = 'Accept'
      } else if (this.data.order_status == 'Accept') {
        this.radio = ''
        process = 'Delivery'
      } else if (this.data.order_status == 'Delivery' && !this.confirmPrint) {
        this.radio = ''
        process = 'Delivering'
      }  else if (
        this.data.order_status == 'Delivering' &&
        this.radio !== null
      ) {
        process = 'Complete'
      } else {
        process = ''
      }

      console.log(process)
      if (process != '') {
        let detail_remark = ''
        // let obj = {
        //   event: process,
        //   detail: this.radio
        // }
        if (this.radio == 'customer') {
          detail_remark = 'พัสดุการนำจ่ายถึงลูกค้า'
        } else if (this.radio == 'supply') {
          detail_remark = 'พัสดุส่งกลับผู้ขาย'
        }
        // console.log(detail_remark)
        let obj = {
          purchase_id: this.data.purchase_id,
          order_remark: detail_remark,
          order_status: process
        }

        this.$emit('submit', obj)
        this.$store
          .dispatch('sendOrderStatus', obj)
          .then(res => {
            this.confirmDialog = false
            // console.log(res.success.data)
            this.data.order_status = process
            this.data.order_remarks = detail_remark
          })
          .catch(error => {
            if (error.response.status == 401) {
              this.tokenExpired = true
              console.log('Error 401')
            }
          })
      }
    },
    printIcon () {
      this.confirmText_print = 'คุณต้องการปริ๊นใบปะหน้าใช่หรือไม่'
      this.confirmDialog_print = true
    },
    print () {
      this.confirmPrint = false
      this.confirmDialog = false
      this.$emit('print', {})
    },
    cancel () {
      this.confirmText = ''
      this.confirmBtn = ''
      this.confirmDialog = false
      this.confirmPrint = false
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
