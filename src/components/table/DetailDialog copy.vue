<template>
  <div v-resize="onResize">
    <v-dialog
      v-model="dialog"
      width="1020"
      transition="dialog-bottom-transition"
      id="detail-dialog"
      fullscreen
      hide-overlay
    >
      <v-card :style="{}">
        <div
          class="d-dialog"
          :style="{
            padding:
              windowSize < 600 ? '15px 7px 15px 1px' : '25px 30px 20px 30px'
          }"
        >
          <div style="width:100%;display:flex">
            <div
              :style="{
                padding: windowSize < 600 ? '10px 10px 0px 10px' : '0px',
                width: '70%'
              }"
            >
              <div class="btn-filter">Order Detail</div>
            </div>
            <div style="text-align:end;width:30%" @click="close()">
              <v-icon
                v-text="'mdi-close'"
                style="color:#000000;cursor:pointer"
                size="24"
              ></v-icon>
            </div>
          </div>
          <div
            class="smaill-body"
            :style="{
              'overflow-y': windowSize < 600 ? 'scroll' : 'hidden',
              height: windowSize < 600 ? 'calc(6em * 5)' : ''
            }"
          >
            <div style="width:100%;padding:15px 0px 13px 20px">
              <div class="d-dialog-title">หมายเลขคำสั่งซื้อ</div>
              <div class="d-dialog-value">{{ data.order_no }}</div>
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
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    {{ data.customer_name }}
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
                    :class="
                      windowSize < 600
                        ? 'd-dialog-title desc'
                        : 'd-dialog-title'
                    "
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%',
                      'padding-bottom': windowSize < 600 ? '5px' : '0px'
                    }"
                  >
                    {{ data.customer_address }}
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
                        {{ formatDate(data.delivery_date) }}
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
                        {{ formatDate(data.delivery_success) }}
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
                    {{ data.customer_tel }}
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
                        {{ data.status_order_title }}
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
                        {{ data.comment }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!------------------>
              <div
                class="d-table"
                :style="{
                  'padding-top': windowSize < 600 ? '10px' : '25px'
                }"
              >
                <div class="d-head">
                  <div style="width:5%">#</div>
                  <div style="width:15%">SKU</div>
                  <div style="width:35%">รายการสินค้า</div>
                  <div style="width:15%">จำนวน</div>
                  <div style="width:30%">หมายเหตุ</div>
                </div>
                <div
                  class="d-body"
                  :style="{
                    'overflow-y': windowSize < 600 ? 'hidden' : 'scroll',
                    height: windowSize < 600 ? 'calc(2em * 4)' : 'calc(2em * 4)'
                  }"
                >
                  <div
                    class="d-body-row"
                    v-for="(row, index) in data.items"
                    :key="index + row.sku"
                    :style="{
                      'border-radius': renderBorder(index),
                      'border-top':
                        index == 0 ? '0.7px solid rgba(0, 0, 0, 0.2)' : ''
                    }"
                  >
                    <div style="width:5%">{{ index + 1 }}</div>
                    <div style="width:15%">{{ row.sku }}</div>
                    <div style="width:35%">{{ row.item_name }}</div>
                    <div style="width:15%">{{ row.qty }}</div>
                    <div style="width:30%">{{ row.comment }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-dialog-action">
            <div
              @click="printIcon()"
              style="padding-right:25px;padding-top:8px"
              v-if="data.status_order_code == 'delivery'"
            >
              <v-icon
                v-text="'mdi-printer'"
                style="color:#000000;cursor:pointer"
                size="20"
              ></v-icon>
            </div>
            <v-btn
              rounded
              @click="accept()"
              class="ok"
              v-if="renderBtn() !== ''"
              >{{ renderBtn() }}</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirmDialog"
      max-width="500"
      :width="data.status_order_code == 'delivering' ? 600 : 500"
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
              v-if="data.status_order_code == 'delivering'"
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
  </div>
</template>

<script>
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
      confirmBtn: '',
      confirmDialog: false,
      confirmPrint: false,
      radio: 'customer',
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
  computed: {
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
    ratio (val) {
      this.radio = val
    },
    renderBtn () {
      if (this.data.status_order_code == 'new') {
        return 'Accept'
      } else if (this.data.status_order_code == 'accept') {
        return 'Delivery'
      } else if (this.data.status_order_code == 'delivery') {
        return 'Delivering'
      } else if (this.data.status_order_code == 'delivering') {
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
      let today = new Date(val)
      const year = today.getFullYear()
      const fullYear = year + 543
      const days = today.getDate()
      const monthName = this.monthsShort[today.getMonth()]
      return days + ' ' + monthName + ' ' + fullYear
    },
    close () {
      this.$emit('close', {})
    },
    accept () {
      this.confirmPrint = false
      if (this.data.status_order_code == 'new') {
        this.confirmText = 'คุณต้องการยืนยันรายการเป็นสถานะ Accept ใช่หรือไม่ ?'
      } else if (this.data.status_order_code == 'accept') {
        this.confirmText =
          'คุณต้องการยืนยันรายการเป็นสถานะ Delivery ใช่หรือไม่ ?'
      } else if (this.data.status_order_code == 'delivery') {
        this.confirmText =
          'คุณต้องการยืนยันรายการเป็นสถานะ Delivering ใช่หรือไม่ ?'
      } else if (this.data.status_order_code == 'delivering') {
        this.confirmText = 'การจัดส่งพัสดุสำเร็จ'
      } else {
        this.confirmText = ''
      }

      this.confirmBtn = 'ใช่'
      this.confirmDialog = true
    },
    submit () {
      let process = ''
      if (this.data.status_order_code == 'new') {
        process = 'accept'
      } else if (this.data.status_order_code == 'accept') {
        process = 'delivery'
      } else if (
        this.data.status_order_code == 'delivery' &&
        !this.confirmPrint
      ) {
        process = 'delivering'
      } else if (
        this.data.status_order_code == 'delivery' &&
        this.confirmPrint
      ) {
        process = 'print'
      } else if (
        this.data.status_order_code == 'delivering' &&
        this.radio !== null
      ) {
        process = 'complete'
      } else {
        process = ''
      }
      if (process != '') {
        this.confirmDialog = false
        this.$emit('submit', process)
      }
    },
    printIcon () {
      this.confirmPrint = true
      this.confirmBtn = 'ใช่'
      this.confirmText = 'คุณต้องการปริ๊นใบปะหน้าใช่หรือไม่'
      this.confirmDialog = true
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
