<template>
  <div class="filter" v-resize="onResize">
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
          </v-text-field>
        </div>
        <div
          :style="{
            width: '100%',
            'margin-top': windowSize <= 600 ? '7px' : '6px'
          }"
        >
          <div class="subtitle">
            ชื่อลูกค้า
          </div>
          <v-text-field solo dense v-model="customerInput"> </v-text-field>
        </div>
        <div
          :style="{
            width: '100%',
            'margin-top': windowSize <= 600 ? '7px' : '6px'
          }"
        >
          <div class="subtitle">
            หมายเลขคำสั่งซื้อ
          </div>
          <v-text-field solo dense v-model="orderInput"> </v-text-field>
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
            label=""
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
          ></date-picker>
        </div>
        <div
          :style="{
            width: '100%',
            'text-align': 'right',
            'padding-top': windowSize <= 600 ? '20px' : '24px'
          }"
        >
          <v-btn rounded @click="apply()">Apply</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-filter',
  props: {},
  data () {
    return {
      expandFilter: true,
      windowSize: 1366,
      formatDate: 'DD-MM-YYYY',
      searchInput: '',
      customerInput: '',
      orderInput: '',
      startOrderDate: null,
      endOrderDate: null,
      startDliveryDate: null,
      endDliveryDate: null,
      startSuccessDelivery: null,
      endSuccessDelivery: null,
      statusInput: 'all',
      statusList: [
        { code: 'all', title: 'All' },
        { code: 'new', title: 'New' },
        { code: 'accept', title: 'Accept' },
        { code: 'delivery', title: 'Delivery' },
        { code: 'delivering', title: 'Delivering' },
        { code: 'complete', title: 'Complete' }
      ]
    }
  },
  computed: {},
  methods: {
    showFilter () {
      this.expandFilter = !this.expandFilter
      // this.onResize()
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
        order: this.orderInput,
        startOrderDate: this.startOrderDate,
        endOrderDate: this.endOrderDate,
        startDliveryDate: this.startDliveryDate,
        endDliveryDate: this.endDliveryDate,
        startSuccessDelivery: this.startSuccessDelivery,
        endSuccessDelivery: this.endSuccessDelivery,
        status: this.statusInput
      }
      this.$emit('apply', result)
    }
  }
}
</script>
<style></style>
