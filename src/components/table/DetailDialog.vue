<template>
  <div v-resize="onResize">
    <v-dialog v-model="show" width="1020" id="detail-dialog">
      <v-card>
        <div
          class="d-dialog"
          :style="{ padding: windowSize < 600 ? '5px' : '50px' }"
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
              height: windowSize < 600 ? 'calc(7em * 5)' : ''
            }"
          >
            <div style="width:100%;padding:25px 20px 20px 20px">
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
                  'padding-top': '10px',
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
                    <div style="width:100%;display:flex;padding-top:10px">
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
                  'padding-top': '10px',
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
                    <div style="width:100%;display:flex;padding-top:10px">
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
                  'padding-top': windowSize < 600 ? '10px' : '40px'
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
                    height: windowSize < 600 ? '' : 'calc(4em * 5)'
                  }"
                >
                  <div
                    class="d-body-row"
                    v-for="(row, index) in data.items"
                    :key="index + row.sku"
                    :style="{
                      'border-radius': renderBorder(index)
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
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="close()">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'detail-dialog',
  props: {
    data: Object,
    show: Boolean

    // status: Array
    // device: String
  },
  data () {
    return {
      windowSize: 1366,
      dataPage: this.data,
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
    renderBorder (index) {
      if (index == 0) {
        return '8px 8px 0px 0px'
      } else if (index == this.data.items.length) {
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
