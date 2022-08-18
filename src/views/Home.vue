<template>
  <div
    id="home-page"
    :style="{ background: showDialog ? 'rgba(0, 0, 0, 0.2)' : '' }"
  >
    <div v-show="!showDialog">
      <order-filter :status="status" @apply="ApplyFilter"></order-filter>
      <detail-table
        :data="data"
        :status="status"
        @view="viewDeatil"
        @submit="submitAction"
        @print="printDetail"
      ></detail-table>
    </div>
    <!-- :show="showDialog" -->
    <detail-dialog
      :data="selectedRow"
      v-show="showDialog"
      @close="closeDialog"
      @submit="submitDialog"
      @print="printDialog"
    ></detail-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import OrderFilter from '@/components/filter/OrderFilter'
import detailTable from '@/components/table/Detail'
import DetailDialog from '@/components/table/DetailDialog'
export default {
  name: 'homepage',
  data () {
    return {
      data: [],
      status: [],
      selectedRow: {},
      showDialog: false,
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
      console.log('ApplyFilter ==> ', val)
    },
    viewDeatil (val) {
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
        this.selectedRow.status_order_code = val
        let status = this.statusList.filter(a => a.code == val)
        this.selectedRow.status_order_title =
          status.length > 0 ? status[0].title : ''
        if (val == 'complete') {
          this.selectedRow.comment = result.detail
        }
      }
    },
    submitAction (val) {
      console.log('submitAction ==> ', val)
    },
    printDetail (val) {
      console.log('printDetail ==> ', val)
    },
    fetch () {
      let arr = []
      for (let i = 0; i < 13; i++) {
        let random = Math.floor(Math.random() * 6)
        random = random == 0 ? 1 : random
        arr.push({
          order_no: 'P0000001' + i,
          customer_name: 'ปิยดา กิตติกรณ์กุล xxxxxxxxxxxx xxxxxxxxxxxxx ' + i,
          order_date: '2022-09-02',
          delivery_date: '2022-05-15',
          delivery_success: '2022-11-02',
          comment: '',
          status_order_code: this.statusList[random].code,
          status_order_title: this.statusList[random].title,
          customer_address:
            'เลขที่ 50 ถนนงามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900',
          customer_tel: '0-2649-5000',
          items: [
            {
              sku: '116019',
              item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
              qty: '5000',
              comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
            },
            {
              sku: '116019',
              item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
              qty: '5000',
              comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
            },
            {
              sku: '116019',
              item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
              qty: '5000',
              comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
            },
            {
              sku: '116019',
              item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
              qty: '5000',
              comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
            },
            {
              sku: '116019',
              item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
              qty: '5000',
              comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
            },
            {
              sku: '116019',
              item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
              qty: '5000',
              comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
            },
            {
              sku: '116019',
              item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
              qty: '5000',
              comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
            },
            {
              sku: '116019',
              item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
              qty: '5000',
              comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
            },
            {
              sku: '116019',
              item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
              qty: '5000',
              comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
            },
            {
              sku: '116019',
              item_name: 'Mechanical Pencil Quantum Atom QM220 (Light Green)',
              qty: '5000',
              comment: 'โปรดแพ็คสินค้าส่งรวมกล่อง'
            }
          ]
        })
      }
      this.data = arr
      this.status = this.statusList
    }
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.$router.replace('/')
    } else {
      this.fetch()
    }
  },
  components: {
    'order-filter': OrderFilter,
    'detail-table': detailTable,
    'detail-dialog': DetailDialog
  },
  mounted () {}
}
</script>
<style></style>
