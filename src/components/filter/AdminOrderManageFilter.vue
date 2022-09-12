<template>
  <div
    class="filter"
    v-resize="onResize"
    :style="{ 'padding-bottom': windowSize > 600 ? '16px' : '8px' }"
  >
    <div style="width:100%;display:flex">
      <div style="width:90%">
        <div class="btn-filter">Filter</div>
      </div>
      <div style="width:10%;text-align: right;" @click="showFilter()">
        <v-icon
          v-text="expandFilter ? 'mdi-menu-up' : 'mdi-menu-down'"
          style="color:#000000;cursor:pointer"
          size="28"
        ></v-icon>
      </div>
    </div>
    <div
      v-if="expandFilter"
      :style="{ display: windowSize <= 600 ? '' : 'flex' }"
    >
      <div
        class="filter-box"
        :style="{ width: windowSize <= 600 ? '100%' : '40%' }"
      >
        <div style="width:100%">
          <div class="subtitle">
            ค้นหา
          </div>
          <v-text-field solo dense v-model="searchInput">
            <v-icon slot="append" color="#D7D7D7" size="18">
              mdi-magnify
            </v-icon>
            <v-icon
              v-if="showClearInput('search')"
              slot="append"
              size="18"
              @click="clearInput('search')"
            >
              mdi-close
            </v-icon>
          </v-text-field>
        </div>
        <div
          :style="{
            width: '100%',
            'margin-top': windowSize <= 600 ? '7px' : '6px'
          }"
        >
          <div
            :style="{ display: windowSize <= 600 ? '' : 'flex', width: '100%' }"
          >
            <div :style="{ width: windowSize <= 600 ? '100%' : '50%' }">
              <div class="subtitle">
                ชื่อลูกค้า
              </div>
              <v-text-field solo dense v-model="customerInput">
                <v-icon
                  v-if="showClearInput('customer')"
                  slot="append"
                  size="18"
                  @click="clearInput('customer')"
                >
                  mdi-close
                </v-icon>
              </v-text-field>
            </div>
            <div
              :style="{
                width: windowSize <= 600 ? '100%' : '50%',
                'margin-left': windowSize <= 600 ? '' : '8px'
              }"
            >
              <div class="subtitle">
                ชื่อผู้ผลิต
              </div>
              <v-text-field solo dense v-model="manufacturerInput">
                <v-icon
                  v-if="showClearInput('manufacturer')"
                  slot="append"
                  size="18"
                  @click="clearInput('manufacturer')"
                >
                  mdi-close
                </v-icon>
              </v-text-field>
            </div>
          </div>
        </div>
        <div
          :style="{
            width: '100%',
            'margin-top': windowSize <= 600 ? '7px' : '6px'
          }"
        >
          <div
            :style="{ display: windowSize <= 600 ? '' : 'flex', width: '100%' }"
          >
            <div :style="{ width: windowSize <= 600 ? '100%' : '50%' }">
              <div class="subtitle">
                ชื่อบริษัท
              </div>
              <v-text-field solo dense v-model="companyInput">
                <v-icon
                  v-if="showClearInput('company')"
                  slot="append"
                  size="18"
                  @click="clearInput('company')"
                >
                  mdi-close
                </v-icon>
              </v-text-field>
            </div>
            <div
              :style="{
                width: windowSize <= 600 ? '100%' : '50%',
                'margin-left': windowSize <= 600 ? '' : '8px'
              }"
            >
              <div class="subtitle">
                หมายเลขคำสั่งซื้อ
              </div>
              <v-text-field solo dense v-model="orderInput">
                <v-icon
                  v-if="showClearInput('orderNo')"
                  slot="append"
                  size="18"
                  @click="clearInput('orderNo')"
                >
                  mdi-close
                </v-icon>
              </v-text-field>
            </div>
          </div>
        </div>
      </div>
      <div
        class="filter-box"
        :style="{
          width: windowSize <= 600 ? '100%' : '20%',
          'margin-top': windowSize <= 600 ? '13px' : ''
        }"
      >
        <div class="subtitle">
          วันที่สั่งซื้อ
        </div>
        <div style="display:flex">
          <span
            :style="{
              color: '#00000099',
              'margin-right': '13px',
              'padding-left': windowSize <= 600 ? '13px' : '0px',
              'font-weight': 400
            }"
            >เริ่ม</span
          >
          <date-picker
            :style="{ width: '100%' }"
            v-model="startOrderDate"
            :format="formatDate"
            value-type="YYYY-MM-DD"
            type="date"
            placeholder=""
            :lang="lang"
          ></date-picker>
        </div>
        <div
          :style="{
            display: 'flex',
            'margin-top': windowSize <= 600 ? '17px' : '30px'
          }"
        >
          <span
            :style="{
              color: '#00000099',
              'margin-right': '17px',
              'padding-left': windowSize <= 600 ? '13px' : '0px',
              'font-weight': 400
            }"
            >ถึง</span
          >
          <date-picker
            :style="{ width: '100%' }"
            v-model="endOrderDate"
            :format="formatDate"
            value-type="YYYY-MM-DD"
            type="date"
            placeholder=""
            :lang="lang"
            :disabled-date="disabledOrderDate"
          ></date-picker>
        </div>
        <div
          :style="{
            width: '100%',
            'margin-top': '5px'
          }"
        >
          <div class="subtitle">
            สถานะ
          </div>
          <v-select
            v-model="statusInput"
            :items="statusList"
            label="-"
            item-text="title"
            item-value="code"
            solo
            dense
          ></v-select>
        </div>
      </div>
      <div
        class="filter-box"
        :style="{
          width: windowSize <= 600 ? '100%' : '20%',
          'margin-top': windowSize <= 600 ? '11px' : ''
        }"
      >
        <div class="subtitle">
          วันที่จัดส่ง
        </div>
        <div style="display:flex">
          <span
            :style="{
              color: '#00000099',
              'margin-right': '13px',
              'padding-left': windowSize <= 600 ? '13px' : '0px',
              'font-weight': 400
            }"
            >เริ่ม</span
          >
          <date-picker
            :style="{ width: '100%' }"
            v-model="startDliveryDate"
            :format="formatDate"
            value-type="YYYY-MM-DD"
            type="date"
            placeholder=""
            :lang="lang"
          ></date-picker>
        </div>
        <div
          :style="{
            display: 'flex',
            'margin-top': windowSize <= 600 ? '17px' : '30px'
          }"
        >
          <span
            :style="{
              color: '#00000099',
              'margin-right': '17px',
              'padding-left': windowSize <= 600 ? '13px' : '0px',
              'font-weight': 400
            }"
            >ถึง</span
          >
          <date-picker
            :style="{ width: '100%' }"
            v-model="endDliveryDate"
            :format="formatDate"
            value-type="YYYY-MM-DD"
            type="date"
            placeholder=""
            :lang="lang"
            :disabled-date="disabledDliveryDate"
          ></date-picker>
        </div>
      </div>
      <div
        class="filter-box"
        :style="{
          width: windowSize <= 600 ? '100%' : '20%',
          'margin-top': windowSize <= 600 ? '11px' : ''
        }"
      >
        <div class="subtitle">
          วันที่ส่งสำเร็จ
        </div>
        <div style="display:flex">
          <span
            :style="{
              color: '#00000099',
              'margin-right': '13px',
              'padding-left': windowSize <= 600 ? '13px' : '0px',
              'font-weight': 400
            }"
            >เริ่ม</span
          >
          <date-picker
            :style="{ width: '100%' }"
            v-model="startSuccessDelivery"
            :format="formatDate"
            value-type="YYYY-MM-DD"
            type="date"
            placeholder=""
            :lang="lang"
          ></date-picker>
        </div>
        <div
          :style="{
            display: 'flex',
            'margin-top': windowSize <= 600 ? '17px' : '30px'
          }"
        >
          <span
            :style="{
              color: '#00000099',
              'margin-right': '17px',
              'padding-left': windowSize <= 600 ? '13px' : '0px',
              'font-weight': 400
            }"
            >ถึง</span
          >
          <date-picker
            :style="{ width: '100%' }"
            v-model="endSuccessDelivery"
            :format="formatDate"
            value-type="YYYY-MM-DD"
            type="date"
            placeholder=""
            :lang="lang"
            :disabled-date="disabledSuccessDelivery"
          ></date-picker>
        </div>
        <div
          :style="{
            width: '100%',
            'text-align': 'right',
            'padding-top': windowSize <= 600 ? '20px' : '24px'
          }"
        >
          <v-btn rounded @click="clearFilter()" class="clear">Clear</v-btn>
          <v-btn
            rounded
            @click="apply()"
            class="ok"
            :style="{ 'margin-left': windowSize <= 600 ? '10px' : '10px' }"
            >Apply</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
const d = new Date()
let year = d.getFullYear()
let month = d.getMonth() + 1
month = month > 9 ? month : '0' + month
let startDay = year + '-' + month + '-' + '01'
export default {
  name: 'order-filter',
  props: {
    status: Array
  },
  data () {
    return {
      expandFilter: true,
      windowSize: 1366,
      formatDate: 'DD MMM YYYY',
      searchInput: null,
      customerInput: null,
      manufacturerInput: null,
      orderInput: null,
      companyInput: null,
      startOrderDate: new Date(startDay).toISOString().slice(0, 10),
      endOrderDate: new Date().toISOString().slice(0, 10),
      startDliveryDate: null,
      endDliveryDate: null,
      startSuccessDelivery: null,
      endSuccessDelivery: null,
      statusInput: '',
      statusList: this.status,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
          months: [
            'มกราคม',
            'กุมภาพันธ์',
            'มีนาคม',
            'เมษายน',
            'พฤษภาคม',
            'มิถุนายน',
            'กรกฎาคม',
            'สิงหาคม',
            'กันยายน',
            'ตุลาคม',
            'พฤศจิกายน',
            'ธันวาคม'
          ],
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
          ],
          weekdaysMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
        },
        months: [
          'มกราคม',
          'กุมภาพันธ์',
          'มีนาคม',
          'เมษายน',
          'พฤษภาคม',
          'มิถุนายน',
          'กรกฎาคม',
          'สิงหาคม',
          'กันยายน',
          'ตุลาคม',
          'พฤศจิกายน',
          'ธันวาคม'
        ],
        monthFormat: 'MMMM',
        monthBeforeYear: false
      }
    }
  },
  computed: {},
  watch: {
    startOrderDate: {
      handler (newValue) {
        if (newValue == null) {
          this.startOrderDate = new Date(startDay).toISOString().slice(0, 10)
          this.endOrderDate = new Date().toISOString().slice(0, 10)
        } else {
          if (this.endOrderDate == null) {
            this.endOrderDate = newValue
          } else {
            const today = new Date(newValue)
            const end = new Date(this.endOrderDate)
            today.setHours(0, 0, 0, 0)
            end.setHours(0, 0, 0, 0)
            if (end < today) {
              this.endOrderDate = newValue
            }
          }
        }
      }
    },
    startDliveryDate: {
      handler (newValue) {
        if (newValue == null) {
          this.endDliveryDate = null
        } else {
          if (this.endDliveryDate == null) {
            this.endDliveryDate = newValue
          } else {
            const today = new Date(newValue)
            const end = new Date(this.endDliveryDate)
            today.setHours(0, 0, 0, 0)
            end.setHours(0, 0, 0, 0)
            if (end < today) {
              this.endDliveryDate = newValue
            }
          }
        }
      }
    },
    startSuccessDelivery: {
      handler (newValue) {
        if (newValue == null) {
          this.endSuccessDelivery = null
        } else {
          if (this.endSuccessDelivery == null) {
            this.endSuccessDelivery = newValue
          } else {
            const today = new Date(newValue)
            const end = new Date(this.endSuccessDelivery)
            today.setHours(0, 0, 0, 0)
            end.setHours(0, 0, 0, 0)
            if (end < today) {
              this.endSuccessDelivery = newValue
            }
          }
        }
      }
    },
    endOrderDate: {
      handler (newValue) {
        if (newValue == null) {
          this.endOrderDate = this.startOrderDate
        }
      }
    },
    endDliveryDate: {
      handler (newValue) {
        if (newValue == null) {
          this.endDliveryDate = this.startDliveryDate
        }
      }
    },
    endSuccessDelivery: {
      handler (newValue) {
        if (newValue == null) {
          this.endSuccessDelivery = this.startSuccessDelivery
        }
      }
    }
  },
  methods: {
    showFilter () {
      this.expandFilter = !this.expandFilter
      // this.onResize()
    },
    showClearInput (val) {
      if (val == 'customer') {
        if (this.customerInput == null) {
          return false
        } else if (this.customerInput.trim().length == 0) {
          return false
        } else {
          return true
        }
      } else if (val == 'orderNo') {
        if (this.orderInput == null) {
          return false
        } else if (this.orderInput.trim().length == 0) {
          return false
        } else {
          return true
        }
      } else if (val == 'search') {
        if (this.searchInput == null) {
          return false
        } else if (this.searchInput.trim().length == 0) {
          return false
        } else {
          return true
        }
      } else if (val == 'manufacturer') {
        if (this.manufacturerInput == null) {
          return false
        } else if (this.manufacturerInput.trim().length == 0) {
          return false
        } else {
          return true
        }
      } else if (val == 'company') {
        if (this.companyInput == null) {
          return false
        } else if (this.companyInput.trim().length == 0) {
          return false
        } else {
          return true
        }
      }
    },
    clearInput (val) {
      if (val == 'customer') {
        this.customerInput = null
      } else if (val == 'orderNo') {
        this.orderInput = null
      } else if (val == 'search') {
        this.searchInput = null
      } else if (val == 'manufacturer') {
        this.manufacturerInput = null
      } else if (val == 'company') {
        this.companyInput = null
      }
    },
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      this.windowSize = x
      // console.log(x)
    },
    apply () {
      let result = {
        search: this.searchInput,
        customer: this.customerInput,
        manufacturer: this.manufacturerInput,
        order: this.orderInput,
        company: this.companyInput,
        startOrderDate: this.startOrderDate,
        endOrderDate: this.endOrderDate,
        startDliveryDate: this.startDliveryDate,
        endDliveryDate: this.endDliveryDate,
        startSuccessDelivery: this.startSuccessDelivery,
        endSuccessDelivery: this.endSuccessDelivery,
        status: this.statusInput
      }
      this.$emit('apply', result)
    },
    clearFilter () {
      this.searchInput = null
      this.customerInput = null
      this.orderInput = null
      this.manufacturerInput = null
      this.companyInput = null
      this.startOrderDate = new Date(startDay).toISOString().slice(0, 10)
      this.endOrderDate = new Date().toISOString().slice(0, 10)
      this.startDliveryDate = null
      this.endDliveryDate = null
      this.startSuccessDelivery = null
      this.endSuccessDelivery = null
      this.statusInput = ''
    },
    disabledSuccessDelivery (date) {
      const today = new Date(this.startSuccessDelivery)
      today.setHours(0, 0, 0, 0)
      return date < today
    },
    disabledDliveryDate (date) {
      const today = new Date(this.startDliveryDate)
      today.setHours(0, 0, 0, 0)
      return date < today
    },
    disabledOrderDate (date) {
      const today = new Date(this.startOrderDate)
      today.setHours(0, 0, 0, 0)
      return date < today
    }
  }
}
</script>
<style></style>
