<template>
  <div
    id="home-page"
    :style="{ background: showDialog ? 'rgba(0, 0, 0, 0.2)' : '' }"
  >
    <div v-show="!showDialog">
      <admin-order-manage-filter
        :status="statusList"
        @apply="ApplyFilter"
      ></admin-order-manage-filter>
      <admin-order-manage-detail
        :data="data"
        @view="viewDeatil"
        @submit="submitAction"
        @print="printDetail"
      ></admin-order-manage-detail>
    </div>
    <!-- :show="showDialog" -->
    <admin-order-manage-detail-dialog
      :data="selectedRow"
      v-show="showDialog"
      @close="closeDialog"
      @submit="submitDialog"
      @print="printDialog"
    ></admin-order-manage-detail-dialog>

    <token-dialog v-if="tokenExpired"></token-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import OrderFilter from '@/components/filter/AdminOrderManageFilter'
import detailTable from '@/components/table/AdminOrderManageDetail'
import DetailDialog from '@/components/table/AdminOrderManageDetailDialog'
import TokenDetailDialog from '@/components/dialog/TokenDialog'

const d = new Date()
let year = d.getFullYear()
let month = d.getMonth() + 1
month = month > 9 ? month : '0' + month
let startDay = year + '-' + month + '-' + '01'

export default {
  name: 'admin-order-manage',
  data () {
    return {
      data: [],
      tokenExpired: false,
      status: [],
      selectedRow: {},
      showDialog: false,
      filterData: {
        company: '',
        customer: '',
        endDliveryDate: '',
        endOrderDate: new Date().toISOString().slice(0, 10),
        endSuccessDelivery: '',
        manufacturer: '',
        order: '',
        search: '',
        startDliveryDate: '',
        startOrderDate: new Date(startDay).toISOString().slice(0, 10),
        startSuccessDelivery: '',
        status: ''
      },
      statusList: [
        { code: 'all', title: 'All' },
        { code: 'new', title: 'New' },
        { code: 'accept', title: 'Accept' },
        { code: 'delivery', title: 'Delivery' },
        { code: 'delivering', title: 'Delivering' },
        { code: 'complete', title: 'Complete' },
        { code: 'cancel', title: 'Cancel' }
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    }
  },
  watch: {},
  methods: {
    ApplyFilter (val) {
      this.filterData = val
      console.log('ApplyFilter ==> ', val)
      this.fetch()
    },
    viewDeatil (val) {
      if (val.order_remarks == 'พัสดุการนำจ่ายถึงลูกค้า') {
        val.order_remarks = 'customer'
      } else if (val.order_remarks == 'พัสดุส่งกลับผู้ขาย') {
        val.order_remarks = 'supply'
      }
      this.selectedRow = val
      this.showDialog = true
      console.log('viewDeatil ==> ', val)
    },
    closeDialog (val) {
      this.showDialog = false
      console.log('closeDialog ==> ', val)
    },
    printDialog (val) {
      // this.showDialog = false
      console.log('printDialog ==> ', val)
    },
    submitDialog (result) {
      // this.showDialog = false
      let val = result.event
      if (val == 'print') {
      } else {
        this.selectedRow.order_status = val
        let status = this.statusList.filter(a => a.code == val)
        this.selectedRow.status_order_title =
          status.length > 0 ? status[0].title : ''
        if (val == 'Complete') {
          this.selectedRow.order_remarks = result.detail
        }
        // console.log(this.selectedRow.order_remarks)
        let order_remarks = ''
        if (this.selectedRow.order_remarks == 'customer') {
          order_remarks = 'พัสดุการนำจ่ายถึงลูกค้า'
        } else if (this.selectedRow.order_remarks == 'supply') {
          order_remarks = 'พัสดุส่งกลับผู้ขาย'
        }
        let obj = {
          purchase_id: this.selectedRow.purchase_id,
          order_remark: order_remarks,
          order_status: this.selectedRow.order_status
        }
        this.$store
          .dispatch('sendOrderStatus', obj)
          .then(res => {})
          .catch(error => {
            if (error.response.status == 401) {
              console.log('Error 401')
            }
          })
      }
    },
    submitAction (val) {
      console.log('submitAction ==> ', val)

      this.$store
        .dispatch('disableOrderAdmin', val)
        .then(res => {
          this.fetch()
        })
        .catch(error => {})
    },
    printDetail (val) {
      console.log('printDetail ==> ', val)
    },
    fetch () {
      this.$store
        .dispatch('getOrderAdmin', this.filterData)
        .then(res => {
          console.log(res.success.data)

          this.data = res.success.data
          this.status = this.statusList
          // this.data = res.data
          // this.status = this.statusList
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.tokenExpired = true
            console.log('Error 401')
          }
        })
      // let arr = []
      // for (let i = 0; i < 13; i++) {
      //   let random = Math.floor(Math.random() * 6)
      //   random = random == 0 ? 1 : random
      //   arr.push({
      //     order_no: 'P0000001' + i,
      //     customer_name: 'ปิยดา กิตติกรณ์กุล xxxxxxxxxxxx xxxxxxxxxxxxx ' + i,
      //     order_date: '2022-09-02',
      //     delivery_date: '2022-05-15',
      //     delivery_success: '2022-11-02',
      //     status_order_code: this.statusList[random].code,
      //     status_order_title: this.statusList[random].title,
      //     comment: '',
      //     manufacturer_name: 'Jainoi Pirompairak',
      //     company_name1: 'ABC Company',
      //     company_name2: 'Uni Mitsubishi Pencil Official',
      //     customer_address:
      //       'เลขที่ 50 ถนนงามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900',
      //     customer_tel: '0-2649-5000',
      //     items: [
      //       {
      //         sku: '116019',
      //         item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
      //         qty: '5000',
      //         comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
      //       },
      //       {
      //         sku: '116019',
      //         item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
      //         qty: '5000',
      //         comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
      //       },
      //       {
      //         sku: '116019',
      //         item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
      //         qty: '5000',
      //         comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
      //       },
      //       {
      //         sku: '116019',
      //         item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
      //         qty: '5000',
      //         comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
      //       },
      //       {
      //         sku: '116019',
      //         item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
      //         qty: '5000',
      //         comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
      //       },
      //       {
      //         sku: '116019',
      //         item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
      //         qty: '5000',
      //         comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
      //       },
      //       {
      //         sku: '116019',
      //         item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
      //         qty: '5000',
      //         comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
      //       },
      //       {
      //         sku: '116019',
      //         item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
      //         qty: '5000',
      //         comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
      //       },
      //       {
      //         sku: '116019',
      //         item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
      //         qty: '5000',
      //         comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
      //       },
      //       {
      //         sku: '116019',
      //         item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
      //         qty: '5000',
      //         comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
      //       }
      //     ]
      //   })
      // }
      // this.data = arr
      // this.status = this.statusList
    }
  },
  created () {
    if (
      this.$store.getters.user_profile === null &&
      sessionStorage.getItem('user_profile') === null
    ) {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    } else if (sessionStorage.getItem('user_profile') !== null) {
      let data = JSON.parse(sessionStorage.getItem('user_profile'))
      if (data.user_role == 'user') {
        this.$router.push('/' + 'home')
      } else {
        this.fetch()
      }
    }
  },
  components: {
    'admin-order-manage-filter': OrderFilter,
    'admin-order-manage-detail': detailTable,
    'admin-order-manage-detail-dialog': DetailDialog,
    'token-dialog': TokenDetailDialog
  },
  mounted () {}
}
</script>
<style></style>
