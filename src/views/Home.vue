<template>
  <div
    id="home-page"
    :style="{ background: showDialog ? 'rgba(0, 0, 0, 0.2)' : '' }"
  >
    <div v-show="!showDialog">
      <order-filter  :loading_status="loading_status" :status="status" @apply="ApplyFilter"></order-filter>
      <detail-table
        :loading_status="loading_status"
        :data="data"
        :status="status"
        @view="viewDeatil"
        @submit="submitAction"
        @print="printDetail"
      ></detail-table>
    </div>
    <detail-dialog
      :data="selectedRow"
      v-show="showDialog"
      @close="closeDialog"
      @submit="submitDialog"
      @print="printDialog"
    ></detail-dialog>

    <token-dialog v-if="tokenExpired"></token-dialog>
  </div>
</template>

<script>
import OrderFilter from '@/components/filter/OrderFilter'
import detailTable from '@/components/table/Detail'
import DetailDialog from '@/components/table/DetailDialog'
import TokenDetailDialog from '@/components/dialog/TokenDialog'
const d = new Date()
let year = d.getFullYear()
let month = d.getMonth() + 1
month = month > 9 ? month : '0' + month
let startDay = year + '-' + month + '-' + '01'
import Vue from 'vue'
export default {
  name: 'homepage',
  data () {
    return {
      data: [],
      status: [],
      selectedRow: {},
      tokenExpired: false,
      loading_status:false,
      filterData: {
        customer: '',
        endDliveryDate: '',
        endOrderDate: new Date().toISOString().slice(0, 10),
        endSuccessDelivery: '',
        order: '',
        search: '',
        startDliveryDate: '',
        startOrderDate: new Date(startDay).toISOString().slice(0, 10),
        startSuccessDelivery: '',
        status: 'new'
      },
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
      this.filterData = val
      this.fetch()
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
      // Vue.localStorage.set('PRINT_LABEL', JSON.stringify(val))
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
      this.loading_status = true
      console.log(this.filterData)
      this.$store
        .dispatch('getOrderSupplier', this.filterData)
        .then(res => {
          this.loading_status = false
          // console.log(res.success.data)
          this.data = res.success.data
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.tokenExpired = true
            console.log('Error 401')
          }
        })
      this.status = this.statusList
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
      if (data.user_role == 'admin') {
        this.$router.push('/' + 'adminHome')
      } else {
        this.fetch()
      }
    }
  },
  components: {
    'order-filter': OrderFilter,
    'detail-table': detailTable,
    'detail-dialog': DetailDialog,
    'token-dialog': TokenDetailDialog
  },
  mounted () {}
}
</script>
<style></style>
