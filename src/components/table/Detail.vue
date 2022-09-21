<template>
  <div class="detail-table" v-resize="onResize">
    <div class="action-bar" v-if="windowSize > 600">
      <v-checkbox
        :disabled="detect_device == 'not_mobile' ? false : true"
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
      <div v-if="loading_status" style="z-index:1;position: absolute;">
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
                :disabled="
                  row.order_status != 'Delivery' || detect_device == 'mobile'
                    ? true
                    : false
                "
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
      <div
        style="padding-top:8%;font-size: 40px;color: rgba(0, 0, 0, 0.6);"
        class="table d-flex flex-wrap justify-center"
        v-if="data.length == 0"
      >
        ไม่พบข้อมูลที่ค้นหา กรุณากรอกข้อมูลใหม่
      </div>
    </div>

    <v-dialog v-model="confirmDisable" max-width="400" width="400">
      <v-card>
        <div style="font-family:'Bai Jamjuree', sans-serif" class="d-dialog">
          <div class="bg-confirm">
            <div style="text-align:end;padding:15px 20px 20px 20px;">
              <span
                style="cursor: pointer;"
                @click="confirmDisable = false"
                class="mdi mdi-close"
              ></span>
            </div>
            <div style="padding:0px 10px">
              มีรายการสถานะ Delivery สามารถที่
              <span style="font-weight: bold;">Print label </span><br />จำนวน
              {{ this.show_count }} รายการ
            </div>
          </div>
          <div class="bg-confirm-action">
            <div>
              <v-btn
                rounded
                @click="print_confrim"
                class="ok"
                style="margin-right:45px"
                >ตกลง</v-btn
              >
              <v-btn rounded @click="confirmDisable = false" class="clear"
                >ยกเลิก</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import AppServices from '@/services/app'
export default {
  name: 'detail-table',
  props: {
    data: Array,
    status: Array,
    loading_status: Boolean
    // device: String
  },
  data () {
    return {
      confirmDisable: false,
      show_count: '',
      windowSize: 1366,
      checkboxALL: false,
      count: 0,
      select_order: [],
      row_select: [],
      dataPage: this.data,
      deviceType: null,
      calcCardWidth: 20,

      page_first: 12,
      page_ohter: 19,
      mapObj: [],

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
      // console.log(param)
      let Deliver = this.data.filter(x => x.order_status === 'Delivery')
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
        x => x.order_status === 'Delivery' && x.checked === true
      )
      // console.log('DATA - Check  => ', this.select_order)
      this.row_select = RowData
      // console.log('PRINT =>', RowData)
    },
    check_all () {
      this.select_order = []
      this.row_select = []
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index]
        if (this.checkboxALL) {
          if (element.order_status == 'Delivery') {
            element.checked = true
            this.select_order.push(element.purchase_id)
            this.row_select.push(element)
          }
        } else {
          if (element.order_status == 'Delivery') {
            element.checked = false
          }
        }
      }
    },
    submit () {
      let TheArray = []
      let perc_id = []
      this.mapObj = []
      perc_id.push(this.select_order)
      this.$store
        .dispatch('getOrderDetail', JSON.stringify(this.select_order))
        .then(res => {
          for (let index = 0; index < res.success.data.length; index++) {
            const element = res.success.data[index]
            // console.log(element)
            this.fromData(element)
          }
          TheArray.push(res.success.data)
          Vue.localStorage.set('PRINT_LABEL', JSON.stringify(res.success.data))
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.tokenExpired = true
            console.log('Error 401')
          }
        })

      this.show_count = this.select_order.length
      this.confirmDisable = true
      this.$emit('submit', this.dataPage)
    },
    view (row) {
      let theArray = []
      theArray.push(row.purchase_id)
      // console.log(row.purchase_id)
      this.$store
        .dispatch('getOrderDetail', JSON.stringify(theArray))
        .then(res => {
          this.$emit('view', res.success.data[0])
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.tokenExpired = true
            console.log('Error 401')
          }
        })
      this.$emit('view', row)
    },
    print_confrim () {
      let TheArray = []
      // console.log(this.mapObj)
      // TheArray.push(this.mapObj)
      Vue.localStorage.set('PRINT_LABEL', JSON.stringify(this.mapObj))
      setTimeout(() => {
        // window.open('/#/PrintLabel')
        let check = 1
        if (check == 1) {
          let myWindow = window.open('about:blank', '_blank')
          let objHtml =
            '<html style=" padding: 0 !important; overflow: hidden;">'
          objHtml += '<head>'
          objHtml +=
            '  <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&amp;display=swap" rel="stylesheet">'
          objHtml +=
            '  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&amp;family=Open+Sans:wght@500&amp;display=swap" rel="stylesheet">'
          objHtml +=
            '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'
          objHtml += '</head>'
          objHtml +=
            '<body style="font-family: Bai Jamjuree;display: flex;position: relative;">'
          objHtml += '<div class="body-main" style="width: 100%;">'

          objHtml +=
            ' <div style="height: 100%; overflow-x: hidden;width:100%;display: flex;justify-content: center;" id="printLablePage">'

          // objHtml +=
          //   '<div ref="printLable"  style="display:flex;justify-content: flex-end; margin: 0 30px; padding-top: 30px">'
          // objHtml +=
          //   '<div  @click="print()" style="font-weight: bold; padding-right: 10px; cursor: pointer">'
          // objHtml += '    PRINT LABEL'
          // objHtml += '  </div>'
          // let icon = 'mdi-printer'
          // objHtml += '  <v-icon'
          // objHtml += '    @click="print()"'
          // objHtml += '    v-text="' + icon + '"'
          // objHtml += '   style="color: #000000; cursor: pointer"'
          // objHtml += '    size="20"'
          // objHtml += '  ></v-icon>'
          // objHtml += ' </div>'

          objHtml += '<div id="print-label">'

          objHtml +=
            '<div style="width:100%;font-weight: bold; padding-right: 10px; cursor: pointer;display: flex;justify-content: end;"'
          objHtml +=
            ' onclick="window.print()">'
          objHtml += 'PRINT LABEL'
          objHtml += '</div>'

          for (let i = 0; i < this.mapObj.length; i++) {
            let row = this.mapObj[i]
            objHtml += ' <div>'
            if (row.page_ == 1) {
              objHtml += '<div class="grid-header-page">'
              objHtml += '  <div class="header-page-box1">'
              let urlPic =
                'http://dev-dropshipportal.dhas.com/img/head.8cdaa517.jpg'
              objHtml +=
                '    <img src="' +
                urlPic +
                '" width="300" height="200" style="width:300px;height:70px "/>'
              objHtml += '  </div>'
              objHtml +=
                '  <div class="header-page-box2" style="font-weight: bold">เลขที่คำสั่งซื้อ</div>'
              objHtml +=
                '  <div class="header-page-box3" style="font-weight: bold">' +
                row.order_num +
                '</div>'
              objHtml += '  <div class="header-page-box4">SO No.</div>'
              objHtml +=
                '  <div class="header-page-box5">' +
                row.salesorder_id +
                '</div>'
              objHtml += '  <div class="header-page-box6">PO No.</div>'
              objHtml +=
                '  <div class="header-page-box7">' + row.purchase_id + '</div>'
              objHtml += '</div>'
              objHtml += '<div class="grid-head-page">'
              objHtml += '  <div class="head-box1">ผู้ส่ง</div>'
              objHtml += '  <div class="head-box2">ผู้รับ</div>'
              objHtml += '  <div class="head-box3">ชื่อ :</div>'
              objHtml +=
                '  <div class="head-box4">' + row.sup_company + '</div>'
              objHtml += '  <div class="head-box5">ชื่อบริษัท :</div>'
              objHtml +=
                '  <div class="head-box6">' + row.cus_company + '</div>'
              objHtml += '  <div class="head-box7">เบอร์โทร :</div>'
              objHtml += '  <div class="head-box8">' + row.sup_phone + '</div>'
              objHtml += '  <div class="head-box9">ชื่อ-นามสกุลผู้รับ :</div>'
              objHtml +=
                '  <div class="head-box10">' +
                row.cus_name +
                ' ' +
                row.cus_surname +
                '</div>'
              objHtml += '  <div class="head-box11">ที่อยู่ :</div>'
              objHtml +=
                '  <div class="head-box12">' +
                row.sup_address +
                ' ' +
                row.sup_district +
                ' ' +
                row.sup_subdistrict +
                ' ' +
                row.sup_province +
                ' ' +
                row.sup_postal +
                '</div>'
              objHtml +=
                '  <div class="head-box13">เบอร์โทรติดต่อผู้รับ :</div>'
              objHtml +=
                '  <div class="head-box14">' +
                row.cus_phone_secendary +
                '</div>'
              objHtml +=
                '  <div class="head-box15">เบอร์โทรติดต่อบริษัท :</div>'
              objHtml += '  <div class="head-box16">' + row.cus_phone + '</div>'
              objHtml += '  <div class="head-box17">ที่อยู่ :</div>'
              objHtml +=
                '  <div class="head-box18">' +
                row.cus_address +
                ' ' +
                row.cus_district +
                ' ' +
                row.cus_subdistrict +
                ' ' +
                row.cus_province +
                ' ' +
                row.cus_postal +
                '</div>'
              objHtml +=
                '  <div class="head-box19">หมายเหตุ (วันที่สั่งซื้อ) : ' +
                this.datetoThaiDateString(row.order_date) +
                '</div>'
              objHtml += '</div>'

              objHtml +=
                '<div style="font-family: "Noto Sans Thai", sans-serif;color: #959595;font-size: 14px; width: 100%;margin: 20px 0 0 0;font-weight: bold;">'
              objHtml += ' พิมพ์ใบปะหน้าพัสดุนี้และติดลงบนกล่องพัสดุ'
              objHtml += '</div>'
              objHtml +=
                '<div style="color: #959595;font-size: 12px;width: 100%;margin: 10px 0 0 0;font-weight: bold;">'
              objHtml += ' <div style="display: flex" class="hr-droid">'
              objHtml +=
                '   <div style=" width: 5%;position: relative;margin: 5px;border-top: 3px dotted #959595;margin: 10px 0 0 0;" class="hr-line hr-droid"></div>'
              objHtml += '   <div><img src="@/assets/icons/Cut.png" /></div>'
              objHtml +=
                '   <div style="border-top: 3px dotted #959595;margin: 10px 0 0 0;width: 95%;" class="hr-line hr-droid"></div>'
              objHtml += ' </div>'
              objHtml += '</div>'

              objHtml +=
                '<div style="display: flex; margin: 20px 0 0 0; width: 100%">'
              objHtml +=
                '  <div style="width: 50%; font-size: 18px">รายการสินค้า</div>'
              objHtml +=
                '  <div style="width: 50%; font-size: 16px; text-align: right">จำนวนรวม<span style="font-weight: bold">' +
                9999 +
                // this.formatNumber(row.sum_order_item) +
                '</span>รายการ</div>'
              objHtml += '</div>'
            }

            objHtml +=
              '<div class="grid-detail-head" style="padding-top: 20px">'
            objHtml += '<div class="detail-h-box1">#</div>'
            objHtml += '<div class="detail-h-box2">SKU</div>'
            objHtml += '<div class="detail-h-box3">ชื่อรายการสินค้า</div>'
            objHtml += '<div class="detail-h-box4">จำนวน</div>'
            objHtml += '<div class="detail-h-box5">หมายเหตุ</div>'
            objHtml += '</div>'

            for (let k = 0; k < row.items.length; k++) {
              let d_row = row.items[k]
              let runNo = d_row.index + 1
              objHtml += '<div class="grid-detail">'
              objHtml += '<div class="detail-box1">'
              objHtml += '<div class="align-justify-center">' + runNo + '</div>'
              objHtml += '</div>'
              objHtml += '<div class="detail-box2">'
              objHtml +=
                ' <div class="align-center">' + d_row.product_sku + '</div>'
              objHtml += '</div>'
              objHtml += '<div class="detail-box3">'
              objHtml +=
                ' <div class="align-center">' + d_row.product_name + '</div>'
              objHtml += '</div>'
              objHtml += '  <div class="detail-box4">'
              objHtml +=
                '    <div class="align-center-justify-end">' +
                this.formatNumber(d_row.order_qty, 0) +
                '</div>'
              objHtml += '  </div>'
              objHtml += '  <div class="detail-box5">'
              let order_detail_remark = ''
              if (d_row.order_detail_remark !== null) {
                order_detail_remark = d_row.order_detail_remark
              }
              objHtml +=
                '    <div class="align-center">' +
                order_detail_remark +
                '</div>'
              objHtml += '  </div>'
              objHtml += ' </div>'
            }

            objHtml += '<div style="padding: 20px 0; text-align: right">'
            objHtml += 'เลขหน้า ' + row.page_ + '/' + row.page_count
            objHtml += '</div>'

            if (row.page_ == row.page_count) {
              objHtml +=
                '<div class="grid-footer" style="padding: 50px 0 30px 0" >'
              objHtml += '<div class="footer-box1">ลายเซ็นผู้ส่ง</div>'
              objHtml += '<div class="footer-box2">'
              objHtml +=
                '.............................................................'
              objHtml += '</div>'
              objHtml += '<div class="footer-box4">ลายเซ็นผู้รับ</div>'
              objHtml += '<div class="footer-box5">'
              objHtml +=
                ' ...............................................................................'
              objHtml += ' </div>'
              objHtml += ' </div>'

              objHtml += '<div class="break-page"></div>'
            }

            objHtml += '</div>'
          }
          objHtml += '</div>'
          objHtml += '</div>'

          objHtml += '</body>'

          objHtml += '<style type="text/css">'

          objHtml += '@media print {'
          objHtml += '@page {size: auto;margin: 0;}'
          objHtml += '@page :first {margin-top: -1.6cm !important; }'
          objHtml += 'html,body {padding: 0 !important;overflow: hidden;}'
          objHtml +=
            'body {-webkit-print-color-adjust: exact;color-adjust: exact;'
          // objHtml += 'min-height: 100%;margin: 0;position: relative;'
          // objHtml += '-webkit-tap-highlight-color: transparent;'
          // objHtml += '-webkit-text-size-adjust: 100%;'
          // objHtml += ' -webkit-font-smoothing: antialiased;'
          objHtml +=
            'font-family: Roboto,Noto Sans,-apple-system,BlinkMacSystemFont,sans-serif;}'
          objHtml += 'body * {visibility: hidden;}'
          objHtml += '#print-label,#print-label * {visibility: visible;}'
          objHtml += '#print-label {left: 0; top: 0;width: 100%;height: 100%;}'
          objHtml +=
            '.break-page {page-break-inside: avoid;page-break-before: avoid;page-break-after: always;}'
          objHtml += '#print-label {padding: 20px 30px;width: 100%;}'
          objHtml +=
            '.body-main {height: 100%;top: 58px;left: 0px;position: fixed;width: 100%;position: relative !important;}'
          objHtml += '}'

          objHtml +=
            '.grid-header-page {width: 100%;display: grid;grid-template-columns: repeat(7, 1fr);grid-auto-rows: 25px;line-height: 25px;font-size: 16px;}'
          objHtml +=
            '.header-page-box1 {grid-column-start: 1; grid-column-end: 6; grid-row-start: 1;grid-row-end: 4;font-weight: bold;font-size: 25px;}'
          objHtml +=
            '.header-page-box2 {grid-column-start: 6;grid-column-end: 7;grid-row-start: 1;grid-row-end: 2;padding-left: 30px;}'
          objHtml +=
            '.header-page-box3 {grid-column-start: 7; grid-column-end: 8;grid-row-start: 1;grid-row-end: 2;}'
          objHtml +=
            '.header-page-box4 {grid-column-start: 6;grid-column-end: 7;grid-row-start: 2;grid-row-end: 3;padding-left: 30px;}'
          objHtml +=
            '.header-page-box5 { grid-column-start: 7; grid-column-end: 8;grid-row-start: 2;grid-row-end: 3;}'
          objHtml +=
            '.header-page-box6 {grid-column-start: 6; grid-column-end: 7;grid-row-start: 3;grid-row-end: 4;padding-left: 30px;}'
          objHtml +=
            '.header-page-box7 {grid-column-start: 7;grid-column-end: 8;grid-row-start: 3;grid-row-end: 4;}'

          objHtml +=
            '.grid-head-page {width: 100%; display: grid;grid-template-columns: repeat(12, 1fr); grid-auto-rows: 28px; line-height: 28px;font-size: 16px;padding-top: 20px;}'
          objHtml +=
            '.head-box1 { grid-column-start: 1;grid-column-end: 6;grid-row-start: 1;grid-row-end: 2;border-top: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;text-align: center;}'
          objHtml +=
            '.head-box2 {grid-column-start: 6;grid-column-end: 13;grid-row-start: 1;grid-row-end: 2;border-top: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;border-right: 1px solid black; text-align: center;}'
          objHtml +=
            '.head-box3 {grid-column-start: 1;grid-column-end: 2;grid-row-start: 2;grid-row-end: 3;border-left: 1px solid black;padding-left: 10px;}'
          objHtml +=
            '.head-box4 {grid-column-start: 2;grid-column-end: 6;grid-row-start: 2;grid-row-end: 3;padding-left: 10px;}'
          objHtml +=
            '.head-box5 {grid-column-start: 6;grid-column-end: 9;grid-row-start: 2;grid-row-end: 3;border-left: 1px solid black;padding-left: 10px;}'
          objHtml +=
            '.head-box6 {grid-column-start: 8;grid-column-end: 13;grid-row-start: 2;grid-row-end: 3;border-right: 1px solid black;}'
          objHtml +=
            '.head-box7 { grid-column-start: 1;grid-column-end: 2;grid-row-start: 3;grid-row-end: 4;border-left: 1px solid black;padding-left: 10px;}'
          objHtml +=
            '.head-box8 { grid-column-start: 2;grid-column-end: 6;grid-row-start: 3;grid-row-end: 4;padding-left: 10px;}'
          objHtml +=
            '.head-box9 {grid-column-start: 6;grid-column-end: 9;grid-row-start: 3;grid-row-end: 4;border-left: 1px solid black;padding-left: 10px;}'
          objHtml +=
            '.head-box10 {grid-column-start: 8;grid-column-end: 13; grid-row-start: 3;grid-row-end: 4;border-right: 1px solid black;}'
          objHtml +=
            '.head-box11 {grid-column-start: 1;grid-column-end: 2;grid-row-start: 4;grid-row-end: 8; border-left: 1px solid black;padding-left: 10px;}'
          objHtml +=
            '.head-box12 {grid-column-start: 2;grid-column-end: 6;grid-row-start: 4;grid-row-end: 8;padding-left: 10px;}'
          objHtml +=
            '.head-box13 {grid-column-start: 6;grid-column-end: 9;grid-row-start: 4;grid-row-end: 5;border-left: 1px solid black;padding-left: 10px;}'
          objHtml +=
            '.head-box14 {grid-column-start: 8; grid-column-end: 13;grid-row-start: 4;grid-row-end: 5;border-right: 1px solid black;}'
          objHtml +=
            '.head-box15 {grid-column-start: 6;grid-column-end: 9;grid-row-start: 5; grid-row-end: 6;border-left: 1px solid black;padding-left: 10px;}'
          objHtml +=
            '.head-box16 {grid-column-start: 8;grid-column-end: 13;grid-row-start: 5;grid-row-end: 6;border-right: 1px solid black;}'
          objHtml +=
            '.head-box17 { grid-column-start: 6;grid-column-end: 9;grid-row-start: 6; grid-row-end: 8; border-left: 1px solid black;padding-left: 10px;}'
          objHtml +=
            '.head-box18 { grid-column-start: 8;grid-column-end: 13;grid-row-start: 6;grid-row-end: 8;border-right: 1px solid black;}'
          objHtml +=
            '.head-box19 {grid-column-start: 1;grid-column-end: 13;grid-row-start: 8;grid-row-end: 9; border-top: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;}'
          objHtml +=
            '.head-box19 {grid-column-start: 1;grid-column-end: 13;grid-row-start: 8;grid-row-end: 9; border-top: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;}'

          objHtml +=
            '.grid-detail-head {width: 100%;display: grid; grid-template-columns: repeat(20, 1fr);grid-auto-rows: 32px; line-height: 32px; font-size: 16px;}'
          objHtml +=
            '.grid-detail {width: 100%;display: grid;grid-template-columns: repeat(20, 1fr);grid-auto-rows: 28px;line-height: 28px;font-size: 16px;}'
          objHtml +=
            '.detail-h-box1 {grid-column-start: 1;grid-column-end: 2;grid-row-start: 1;grid-row-end: 2;text-align: center;border-top: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;}'
          objHtml +=
            '.detail-h-box2 {grid-column-start: 2;grid-column-end: 4; grid-row-start: 1;grid-row-end: 2;border-top: 1px solid black;border-bottom: 1px solid black;padding-left: 30px;}'
          objHtml +=
            '.detail-h-box3 { grid-column-start: 4;grid-column-end: 12;grid-row-start: 1;grid-row-end: 2;border-top: 1px solid black;border-bottom: 1px solid black;padding-left: 30px;}'
          objHtml +=
            '.detail-h-box4 {grid-column-start: 12;grid-column-end: 14;grid-row-start: 1;grid-row-end: 2;text-align: center;border-top: 1px solid black;border-bottom: 1px solid black;text-align: right;}'
          objHtml +=
            '.detail-h-box5 {grid-column-start: 14;grid-column-end: 21;grid-row-start: 1;grid-row-end: 2;border-top: 1px solid black;border-bottom: 1px solid black;border-right: 1px solid black; padding-left: 30px;}'
          objHtml +=
            '.align-center {grid-area: a;align-self: center;justify-self: start;}'
          objHtml +=
            '.align-justify-center {grid-area: a; align-self: center;justify-self: center;}'
          objHtml +=
            '.align-center-justify-end { grid-area: a;align-self: center;justify-self: end;}'
          objHtml +=
            '.detail-box1 {grid-column-start: 1;grid-column-end: 2;grid-row-start: 1;grid-row-end: 3;text-align: center; border-bottom: 1px solid black;border-left: 1px solid black;display: grid;grid-template-columns: repeat(2, 1fr);'
          objHtml += 'grid-template-areas:'
          objHtml += "'a a'"
          objHtml += "'a a';"
          objHtml += '}'
          objHtml +=
            '.detail-box2 {grid-column-start: 2;grid-column-end: 4;grid-row-start: 1;grid-row-end: 3;border-bottom: 1px solid black;padding-left: 30px; display: grid;grid-template-columns: repeat(2, 1fr);'
          objHtml += 'grid-template-areas:'
          objHtml += "'a a'"
          objHtml += "'a a';"
          objHtml += '}'
          objHtml +=
            '.detail-box3 {grid-column-start: 4;grid-column-end: 12; grid-row-start: 1;grid-row-end: 3;border-bottom: 1px solid black;padding-left: 30px;display: grid;'
          objHtml += 'grid-template-areas:'
          objHtml += "'a a'"
          objHtml += "'a a';"
          objHtml += '}'
          objHtml +=
            '.detail-box4 {grid-column-start: 12;grid-column-end: 14;grid-row-start: 1; grid-row-end: 3;text-align: center;border-bottom: 1px solid black;text-align: right;display: grid;'
          objHtml += 'grid-template-areas:'
          objHtml += "'a a'"
          objHtml += "'a a';"
          objHtml += '}'
          objHtml +=
            '.detail-box5 {grid-column-start: 14;grid-column-end: 21;grid-row-start: 1;grid-row-end: 3; border-bottom: 1px solid black;border-right: 1px solid black; padding-left: 30px; display: grid;'
          objHtml += 'grid-template-areas:'
          objHtml += "'a a'"
          objHtml += "'a a';"
          objHtml += '}'
          objHtml +=
            '.grid-footer { width: 100%;display: grid;grid-template-columns: repeat(8, 1fr);grid-auto-rows: 28px; line-height: 28px;font-size: 16px;}'
          objHtml +=
            '.footer-box1 {grid-column-start: 1; grid-column-end: 2;grid-row-start: 1;grid-row-end: 2;}'
          objHtml +=
            '.footer-box2 {grid-column-start: 2;grid-column-end: 4;grid-row-start: 1;grid-row-end: 2;}'
          objHtml +=
            '.footer-box3 {grid-column-start: 4;grid-column-end: 6;grid-row-start: 1; grid-row-end: 2;}'
          objHtml +=
            '.footer-box4 {grid-column-start: 5; grid-column-end: 6;grid-row-start: 1;grid-row-end: 2;}'
          objHtml +=
            '.footer-box5 {grid-column-start: 6;grid-column-end: 9;grid-row-start: 1;grid-row-end: 2;}'

          objHtml += '@media print {'
          objHtml += '@page {size: auto; margin: 0;}'
          objHtml += '@page :first { margin-top: -1.6cm !important;}'
          objHtml += 'html,body {padding: 0 !important;overflow: hidden;}'
          objHtml +=
            'body {-webkit-print-color-adjust: exact; color-adjust: exact;}'
          objHtml += '.body-main {position: relative !important;}'
          objHtml += 'body * {visibility: hidden;}'
          objHtml += '#print-label, #print-label * {visibility: visible; }'
          objHtml += '#print-label {left: 0;top: 0; width: 100%;height: 100%;}'
          objHtml +=
            '.break-page {page-break-inside: avoid;page-break-before: avoid;page-break-after: always; }'
          objHtml += '}'

          objHtml += '</style>'

          objHtml += '</html>'
          myWindow.document.write(objHtml)
        }
      }, 100)
      this.confirmDisable = false
    },
    datetoThaiDateString (value) {
      return AppServices.datetoThaiDateString(new Date(value))
    },
    formatNumber (value, dicimal) {
      return AppServices.formatNumber(value, dicimal)
    },
    print (row) {
      this.mapObj = []
      let TheArray = []
      let perc_id = []
      perc_id.push(row.purchase_id)
      this.show_count = 1
      // this.confirmDisable = true
      this.$store
        .dispatch('getOrderDetail', JSON.stringify(perc_id))
        .then(res => {
          TheArray.push(res.success.data[0])
          this.fromData(res.success.data[0])
          // Vue.localStorage.set('PRINT_LABEL', JSON.stringify(TheArray))
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.tokenExpired = true
            console.log('Error 401')
          }
        })
    },
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      this.windowSize = x
      this.deviceType = window.deviceType()
      // console.log(x)
    },

    maps (po, param, head) {
      const clone = structuredClone(head)
      Object.assign(clone, { page_: po + 1 })
      if (po == 0) {
        const slicedArray = param.slice(0, this.page_first)
        // this.mapObj.set(head ,slicedArray)
        clone.items = slicedArray
        // console.log('A' ,clone)
        this.mapObj.push(clone)
      } else {
        clone.items = param
        // console.log('B' , clone)
        this.mapObj.push(clone)
      }
    },
    fromData (data) {
      let count_po = ''
      let count_item = data.items.length
      if (count_item <= this.page_first) {
        count_po = 1
      } else if (count_item - this.page_first <= this.page_ohter) {
        count_po = 2
      } else {
        var sum = (count_item - this.page_first) / this.page_ohter
        sum = Math.floor(sum) + 1
        //console.log((count_item - 10) % 15 ,'sum1 =>' , Math.floor(sum)+1)
        if ((count_item - this.page_first) % this.page_ohter != 0) {
          sum = Math.floor(sum) + 1
        }
        count_po = sum
      }
      Object.assign(data, { page_count: count_po })
      if (count_po > 1) {
        this.maps(0, data.items, data)
        var a = data.items.slice(this.page_first),
          chunk
        var po = 0
        while (a.length > 0) {
          chunk = a.splice(0, this.page_ohter)
          po++
          this.maps(po, chunk, data)
        }
      } else {
        this.maps(0, data.items, data)
      }
      this.confirmDisable = true
    }
  }
}
</script>
<style></style>
