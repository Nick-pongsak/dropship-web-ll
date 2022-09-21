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

       let gridHeaderPage = 'width: 100%;display: grid;grid-template-columns: repeat(7, 1fr);grid-auto-rows: 25px;line-height: 25px;font-size: 16px;'
       let headerPageBox1 = 'grid-column-start: 1; grid-column-end: 6;grid-row-start: 1;grid-row-end: 4;font-weight: bold;font-size: 25px;'
       let headerPageBox2 = 'grid-column-start: 6;grid-column-end: 7; grid-row-start: 1;grid-row-end: 2;padding-left: 30px;'
       let headerPageBox3 = 'grid-column-start: 7;grid-column-end: 8; grid-row-start: 1;grid-row-end: 2;'
       let headerPageBox4 = 'grid-column-start: 6;grid-column-end: 7;grid-row-start: 2; grid-row-end: 3;padding-left: 30px;'
       let headerPageBox5 = 'grid-column-start: 7;grid-column-end: 8;grid-row-start: 2;grid-row-end: 3;'
       let headerPageBox6 = 'grid-column-start: 6;grid-column-end: 7;grid-row-start: 3;grid-row-end: 4;padding-left: 30px;'
       let headerPageBox7 = 'grid-column-start: 7; grid-column-end: 8;grid-row-start: 3;grid-row-end: 4;'

       let gridHeadPage = 'width: 100%;display: grid;grid-template-columns: repeat(12, 1fr);grid-auto-rows: 28px;line-height: 28px;font-size: 16px;padding-top: 20px;'
       let headBox1 = 'grid-column-start: 1;grid-column-end: 6;grid-row-start: 1;grid-row-end: 2;border-top: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;text-align: center;'
       let headBox2 = 'grid-column-start: 6;grid-column-end: 13;grid-row-start: 1;grid-row-end: 2;border-top: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;text-align: center;'
       let headBox3 = 'grid-column-start: 1;grid-column-end: 2;grid-row-start: 2;grid-row-end: 3;border-left: 1px solid black; padding-left: 10px;'
       let headBox4 = 'grid-column-start: 2;grid-column-end: 6;grid-row-start: 2;grid-row-end: 3; padding-left: 10px;'
       let headBox5 = 'grid-column-start: 6;grid-column-end: 9;grid-row-start: 2;grid-row-end: 3;border-left: 1px solid black;padding-left: 10px;'
       let headBox6 = 'grid-column-start: 8; grid-column-end: 13;grid-row-start: 2;grid-row-end: 3;border-right: 1px solid black;'
       let headBox7 = 'grid-column-start: 1;grid-column-end: 2;grid-row-start: 3;grid-row-end: 4; border-left: 1px solid black;padding-left: 10px;'
       let headBox8 = 'grid-column-start: 2;grid-column-end: 6; grid-row-start: 3;grid-row-end: 4;padding-left: 10px;'
       let headBox9 = 'grid-column-start: 6;grid-column-end: 9;grid-row-start: 3;grid-row-end: 4; border-left: 1px solid black;padding-left: 10px;'
       let headBox10 = 'grid-column-start: 8;grid-column-end: 13;grid-row-start: 3;grid-row-end: 4;border-right: 1px solid black;'
       let headBox11 = 'grid-column-start: 1;grid-column-end: 2; grid-row-start: 4; grid-row-end: 8;border-left: 1px solid black;padding-left: 10px;'
       let headBox12 = 'grid-column-start: 2;grid-column-end: 6;grid-row-start: 4;grid-row-end: 8;padding-left: 10px;'
       let headBox13 = 'grid-column-start: 6;grid-column-end: 9;grid-row-start: 4;grid-row-end: 5;border-left: 1px solid black; padding-left: 10px;'
       let headBox14 = 'grid-column-start: 8;grid-column-end: 13; grid-row-start: 4;grid-row-end: 5;border-right: 1px solid black;'
       let headBox15 = 'grid-column-start: 6;grid-column-end: 9; grid-row-start: 5; grid-row-end: 6;border-left: 1px solid black;padding-left: 10px;'
       let headBox16 = 'grid-column-start: 8;grid-column-end: 13;grid-row-start: 5; grid-row-end: 6;border-right: 1px solid black;'
       let headBox17 = 'grid-column-start: 6;grid-column-end: 9;grid-row-start: 6;grid-row-end: 8; border-left: 1px solid black;padding-left: 10px;'
       let headBox18 = 'grid-column-start: 8;grid-column-end: 13;grid-row-start: 6;grid-row-end: 8;border-right: 1px solid black;'
       let headBox19 = ' grid-column-start: 1;grid-column-end: 13;grid-row-start: 8;grid-row-end: 9;border-top: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;border-right: 1px solid black;'

        let myWindow = window.open('about:blank', '_blank')
        let objHtml = '<html style=" padding: 0 !important; overflow: hidden;">'
        objHtml = '<head>'
        // objHtml = ' <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&family=Open+Sans:wght@500&display=swap" rel="stylesheet">'
        // objHtml = ' <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'
        objHtml = '</head>'
        objHtml = '<body style="display:flex;-webkit-print-color-adjust: exact;color-adjust: exact; padding: 0 !important;overflow: hidden;">'
        objHtml += ' <div style="height: 100%; overflow: scroll;width:100%;overflow-x: hidden">'
        // ----- Head------
        objHtml += '<div style="justify-content: flex-end; margin: 0 30px; padding-top: 30px;display: flex;">'
        objHtml += '  <div style="font-weight: bold; padding-right: 10px; cursor: pointer">PRINT LABEL</div>'
        objHtml += '</div>'

        let printLabel= 'left: 0;top: 0; width: 100%;height: 100%;'
        objHtml += ' <div id="print-label" style="'+printLabel+'">'
          
        for (let i = 0; i < this.mapObj.length; i++) {
          let row = this.mapObj[i]
          objHtml += ' <div>'
          if (row.page_ == 1) {
            objHtml += '<div style="'+gridHeaderPage+'">'
            objHtml += '  <div style="'+headerPageBox1+'">'
            // objHtml += '    <img src="@/assets/images/head.jpg" width="300" height="200" />'
            objHtml += '  </div>'
            objHtml += '  <div style="'+headerPageBox2+'font-weight: bold">เลขที่คำสั่งซื้อ</div>'
            objHtml += '  <div style="'+headerPageBox3+'font-weight: bold">' + row.order_num +'</div>'
            objHtml += '  <div style="'+headerPageBox4+'">SO No.</div>'
            objHtml += '  <div style="'+headerPageBox5+'">' + row.salesorder_id + '</div>'
            objHtml += '  <div style="'+headerPageBox6+'">PO No.</div>'
            objHtml += '  <div style="'+headerPageBox7+'">' + row.purchase_id + '</div>'
            objHtml += '</div>'

            objHtml += '<div style="'+gridHeadPage+'">'
            objHtml += '  <div style="'+headBox1+'">ผู้ส่ง</div>'
            objHtml += '  <div style="'+headBox2+'">ผู้รับ</div>'
            objHtml += '  <div style="'+headBox3+'">ชื่อ :</div>'
            objHtml += '  <div style="'+headBox4+'">'+row.sup_company+'</div>'
            objHtml += '  <div style="'+headBox5+'"">ชื่อบริษัท :</div>'
            objHtml += '  <div style="'+headBox6+'">'+row.cus_company+'</div>'
            objHtml += '  <div style="'+headBox7+'">เบอร์โทร :</div>'
            objHtml += '  <div style="'+headBox8+'">'+row.sup_phone +'</div>'
            objHtml += '  <div style="'+headBox9+'">ชื่อ-นามสกุลผู้รับ :</div>'
            objHtml += '  <div style="'+headBox10+'">'+ row.cus_name +' '+ row.cus_surname +'</div>'
            objHtml += '  <div style="'+headBox11+'">ที่อยู่ :</div>'
            objHtml += '  <div style="'+headBox12+'">'+row.sup_address +' '+ row.sup_district  +' '+ row.sup_subdistrict  +' '+ row.sup_province  +' '+ row.sup_postal +'</div>'
            objHtml += '  <div style="'+headBox13+'">เบอร์โทรติดต่อผู้รับ :</div>'
            objHtml += '  <div style="'+headBox14+'">'+ row.cus_phone_secendary +'</div>'
            objHtml += '  <div style="'+headBox15+'">เบอร์โทรติดต่อบริษัท :</div>'
            objHtml += '  <div style="'+headBox16+'">'+ row.cus_phone +'</div>'
            objHtml += '  <div style="'+headBox17+'">ที่อยู่ :</div>'
            objHtml += '  <div style="'+headBox18+'">'+ row.cus_address+' '+ row.cus_district +' '+ row.cus_subdistrict +' '+ row.cus_province +' '+ row.cus_postal +'</div>'
            objHtml += '  <div style="'+headBox19+'">หมายเหตุ (วันที่สั่งซื้อ) : '+ this.datetoThaiDateString(row.order_date) +'</div>'
            objHtml += '</div>'

            let cutHead ="font-family: 'Noto Sans Thai', sans-serif;color: #959595;font-size: 14px;width: 100%;margin: 20px 0 0 0;font-weight: bold;"
              objHtml += '<div style="'+cutHead+'">พิมพ์ใบปะหน้าพัสดุนี้และติดลงบนกล่องพัสดุ</div>'

              objHtml += '<div style="color: #959595;font-size: 12px;width: 100%;margin: 10px 0 0 0; font-weight: bold;" >'
              objHtml += '  <div style="display: flex" class="hr-droid">'
              objHtml += '    <div style="width: 5%;position: relative;margin: 5px;border-top: 3px dotted #959595;margin: 10px 0 0 0;" class="hr-line hr-droid" ></div>'
              // objHtml += <div><img src="@/assets/icons/Cut.png" /></div>'
              objHtml += '   <div style="border-top: 3px dotted #959595;margin: 10px 0 0 0;width: 95%;"class="hr-line hr-droid"></div>'
              objHtml += '  </div>'
              objHtml += '</div>'

              objHtml += '<div style="display: flex; margin: 20px 0 0 0; width: 100%">'
              objHtml += '  <div style="width: 50%; font-size: 18px">รายการสินค้า</div>'
              objHtml += '  <div style="width: 50%; font-size: 16px; text-align: right">จำนวนรวม<span style="font-weight: bold">'+row.sum_order_item+'</span> รายการ</div>'
              // objHtml += '  <div style="width: 50%; font-size: 16px; text-align: right">จำนวนรวม<span style="font-weight: bold">'+this.formatNumber(row.sum_order_item,0)+'</span> รายการ</div>'
              objHtml += '</div>'
          }

          let gridDetailHead = 'width: 100%;display: grid;grid-template-columns: repeat(20, 1fr);grid-auto-rows: 32px;line-height: 32px;font-size: 16px;'
          let detailHBbox1 = 'grid-column-start: 1;grid-column-end: 2;grid-row-start: 1;grid-row-end: 2;text-align: center;border-top: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;'
          let detailHBbox2 = 'grid-column-start: 2;grid-column-end: 4;grid-row-start: 1;grid-row-end: 2;border-top: 1px solid black;border-bottom: 1px solid black;padding-left: 30px;'
          let detailHBbox3 = 'grid-column-start: 4;grid-column-end: 12;grid-row-start: 1;grid-row-end: 2;border-top: 1px solid black;border-bottom: 1px solid black;padding-left: 30px;'
          let detailHBbox4 = 'grid-column-start: 12;grid-column-end: 14;grid-row-start: 1;grid-row-end: 2;text-align: center; border-top: 1px solid black;border-bottom: 1px solid black;text-align: right;'
          let detailHBbox5 = 'grid-column-start: 14;grid-column-end: 21;grid-row-start: 1;grid-row-end: 2;border-top: 1px solid black;border-bottom: 1px solid black;border-right: 1px solid black;padding-left: 30px;'

          objHtml += '<div style="'+gridDetailHead+'padding-top: 20px">'
          objHtml += '  <div style="'+detailHBbox1+'">#</div>'
          objHtml += '  <div style="'+detailHBbox2+'">SKU</div>'
          objHtml += '  <div style="'+detailHBbox3+'">ชื่อรายการสินค้า</div>'
          objHtml += '  <div style="'+detailHBbox4+'">จำนวน</div>'
          objHtml += '  <div style="'+detailHBbox5+'">หมายเหตุ</div>'
          objHtml += '</div>'

          let gridDetail = 'width: 100%; display: grid;grid-template-columns: repeat(20, 1fr);grid-auto-rows: 28px; line-height: 28px;font-size: 16px;'
          let gridTemplateAreas = 'a a'
           gridTemplateAreas += 'a a'
          let detailBox1 = "grid-column-start: 1;grid-column-end: 2;grid-row-start: 1;grid-row-end: 3;text-align: center;border-bottom: 1px solid black;border-left: 1px solid black;display: grid;grid-template-columns: repeat(2, 1fr);grid-template-areas:'"+gridTemplateAreas+"';"
          let detailBox2 = "grid-column-start: 2;grid-column-end: 4;grid-row-start: 1; grid-row-end: 3;border-bottom: 1px solid black;padding-left: 30px; display: grid;grid-template-columns: repeat(2, 1fr);grid-template-areas:'"+gridTemplateAreas+"';"
          let detailBox3 = "grid-column-start: 4;grid-column-end: 12;grid-row-start: 1;grid-row-end: 3;border-bottom: 1px solid black;padding-left: 30px;display: grid;grid-template-areas:'"+gridTemplateAreas+"';"
          let detailBox4 = "grid-column-start: 12;grid-column-end: 14;grid-row-start: 1;grid-row-end: 3; text-align: center;border-bottom: 1px solid black;text-align: right;display: grid;grid-template-areas:'"+gridTemplateAreas+"';"
          let detailBox5 = " grid-column-start: 14; grid-column-end: 21;grid-row-start: 1;grid-row-end: 3;border-bottom: 1px solid black;border-right: 1px solid black;padding-left: 30px; display: grid;grid-template-areas:'"+gridTemplateAreas+"';"
          let alignCenter= 'grid-area: a;align-self: center;justify-self: start;'
          let alignJustifyCenter = 'grid-area: a; align-self: center; justify-self: center;'
          let alignJustifyEnd = 'grid-area: a; align-self: center; justify-self: end;'

          for (let k = 0; k < row.items.length; k++) {
          let d_row = row.items[k]
          let runIndex = d_row.index+1
            objHtml += '  <div style="'+gridDetail+'">'
            objHtml += '    <div style="'+detailBox1+'">'
            objHtml += '      <div style="'+alignJustifyCenter+'">'+runIndex +'</div>'
            objHtml += '    </div>'
            objHtml += '    <div style="'+detailBox2+'">'
            objHtml += '      <div style="'+alignCenter+'">'+d_row.product_sku +'</div>'
            objHtml += '    </div>'
            objHtml += '    <div style="'+detailBox3+'">'
            objHtml += '      <div style="'+alignCenter+'">'+d_row.product_name +'</div>'
            objHtml += '    </div>'
            objHtml += '    <div style="'+detailBox4+'">'
            objHtml += '      <div style="'+alignJustifyEnd+'">'+ this.formatNumber(d_row.order_qty, 0)+'</div>'
            objHtml += '    </div>'
            objHtml += '    <div style="'+detailBox5+'">'
            // objHtml += '      <div style="'+alignCenter+'>'+ d_row.order_detail_remark +' </div>'
            objHtml += '    </div>'
            objHtml += '  </div>'
          }
          objHtml += '<div style="padding: 20px 0; text-align: right">เลขหน้า '+ row.page_ +' / '+ row.page_count +'</div>'

          if(row.page_ == row.page_count){
            let gridFooter = 'width: 100%;display: grid;grid-template-columns: repeat(8, 1fr);grid-auto-rows: 28px; line-height: 28px;font-size: 16px;'
            let footerBox1 = 'grid-column-start: 1;grid-column-end: 2;grid-row-start: 1;grid-row-end: 2;'
            let footerBox2 = 'grid-column-start: 2;grid-column-end: 4;grid-row-start: 1; grid-row-end: 2;'
            // let footerBox3 = 'grid-column-start: 4;grid-column-end: 6; grid-row-start: 1;grid-row-end: 2;'
            let footerBox4 = 'grid-column-start: 5;grid-column-end: 6; grid-row-start: 1;grid-row-end: 2;'
            let footerBox5 = 'grid-column-start: 6;grid-column-end: 9;grid-row-start: 1;grid-row-end: 2;'
            
            objHtml += '<div style="'+gridFooter+'padding: 50px 0 30px 0" >'
            objHtml += ' <div style="'+footerBox1+'">ลายเซ็นผู้ส่ง</div>'
            objHtml += ' <div style="'+footerBox2+'">'
            objHtml += '   .............................................................'
            objHtml += ' </div>'
            objHtml += ' <div style="'+footerBox4+'">ลายเซ็นผู้รับ</div>'
            objHtml += ' <div style="'+footerBox5+'">'
            objHtml += '   ...............................................................................'
            objHtml += ' </div>'
            objHtml += '</div>'
          }

          objHtml += '<div style="page-break-inside: avoid;page-break-before: avoid;page-break-after: always;"></div>'

          objHtml += '</div>'
        }
        objHtml += '</div>'

        objHtml += '</div>'
        objHtml += '</body>'
        objHtml += '</html>'
        myWindow.document.write(objHtml)
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
