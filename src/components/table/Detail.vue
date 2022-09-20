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
      <div
        style="padding-top:8%;font-size: 40px;color: rgba(0, 0, 0, 0.6);"
        class="table d-flex flex-wrap justify-center"
        v-if="data.length == 0"
      >
        ไม่พบข้อมูลที่ค้นหา กรุณากรอกข้อมูลใหม่
      </div>
    </div>

    <v-dialog  v-model="confirmDisable" max-width="400" width="400">
      <v-card>
        <div style="font-family:'Bai Jamjuree', sans-serif" class="d-dialog">
          <div class="bg-confirm">
            <div style="text-align:end;padding:15px 20px 20px 20px;">
              <span style="cursor: pointer;" @click="confirmDisable = false" class="mdi mdi-close"></span>
            </div>
            <div style="padding:0px 10px">
              มีรายการสถานะ Delivery สามารถที่
              <span style="font-weight: bold;">Print label </span
              ><br>จำนวน {{ this.show_count }} รายการ
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
      confirmDisable:false,
      show_count:'',
      windowSize: 1366,
      checkboxALL: false,
      count: 0,
      select_order: [],
      row_select: [],
      dataPage: this.data,
      deviceType: null,
      calcCardWidth: 20,

      page_first:12,
      page_ohter:19,
      mapObj : [],
      
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
      console.log(param)
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
      console.log('DATA - Check  => ', this.select_order)
      this.row_select = RowData
      console.log('PRINT =>', RowData)
    },
    check_all () {
      this.select_order = []
      this.row_select = []
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index]
        if (this.checkboxALL) {
          if (
            element.order_status == 'Delivery' 
          ) {
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
      perc_id.push(this.select_order)
      this.$store
        .dispatch('getOrderDetail', JSON.stringify(this.select_order))
        .then(res => {
          for (let index = 0; index < res.success.data.length; index++) {
            const element = res.success.data[index];
            console.log(element)
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

      // this.show_count = this.select_order.length
      // this.confirmDisable = true
      // this.$emit('submit', this.dataPage)
    },
    view (row) {
      let theArray = []
      theArray.push(row.purchase_id)

      console.log(row.purchase_id)
      this.$store
        .dispatch('getOrderDetail',JSON.stringify(theArray))
        .then(res => {
          this.$emit('view',res.success.data[0])
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.tokenExpired = true
            console.log('Error 401')
          }
        })
      this.$emit('view', row)
    },
    print_confrim(){
        let TheArray =[]
        console.log(this.mapObj)
        // TheArray.push(this.mapObj)
        Vue.localStorage.set('PRINT_LABEL', JSON.stringify(this.mapObj))
        setTimeout(() => {
          window.open('/#/PrintLabel')
        }, 100)
        this.confirmDisable = false
    },
    print (row) {
      this.mapObj = []
      let TheArray = []
      let perc_id = []
      perc_id.push(row.purchase_id)
      // this.show_count = 1
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

    maps(po , param , head){ 
      const clone = structuredClone(head);
      Object.assign(clone , {page_: po+1});
      if(po == 0){
        const slicedArray = param.slice(0, this.page_first);
          // this.mapObj.set(head ,slicedArray) 
          clone.items = slicedArray
          // console.log('A' ,clone)
          this.mapObj.push(clone)
      }else {
          clone.items = param
          // console.log('B' , clone)
          this.mapObj.push(clone)
      }
    },
    fromData(data){
      let count_po = ''
      let count_item = data.items.length
      if(count_item <= this.page_first){
           count_po = 1
      }else if( (count_item - this.page_first ) <= this.page_ohter ) {
           count_po = 2
      }else {
          var sum = (count_item - this.page_first) / this.page_ohter 
          sum =  Math.floor(sum) + 1
          //console.log((count_item - 10) % 15 ,'sum1 =>' , Math.floor(sum)+1)
          if((count_item - this.page_first) % this.page_ohter != 0){
           sum =  Math.floor(sum) + 1
          }
          count_po = sum
      }
      Object.assign(data , {page_count: count_po});
        if(count_po > 1){
        this.maps(0, data.items, data)
        var a =  data.items.slice(this.page_first)
          , chunk
          var po = 0
        while (a.length > 0) {
            chunk = a.splice(0,this.page_ohter)
            po++
            this.maps(po,chunk, data)
        }
        }else {
            this.maps(0,data.items, data)
        }
        this.confirmDisable = true
    }
  }
}
</script>
<style></style>
