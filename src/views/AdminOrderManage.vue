<template>
  <div
    id="home-page"
    :style="{ background: showDialog ? 'rgba(0, 0, 0, 0.2)' : '' }"
  >
    <div v-show="!showDialog">
      <admin-order-manage-filter
        :loading_status="loading_status"
        :status="statusList"
        :status_mail="status_send_mail"
        @apply="ApplyFilter"
      ></admin-order-manage-filter>
     
      <admin-order-manage-detail
        :data="data"
        :loading_status="loading_status"
        @view="viewDeatil"
        @submit="submitAction"
        @print="printDetail"
      ></admin-order-manage-detail>
    </div>
    <!-- :show="showDialog" -->
    <admin-order-manage-detail-dialog
      :dialog_success="dialog_s"
      :dataShipping="listShipping"
      :data="selectedRow"
      v-show="showDialog"
      @close="closeDialog"
      @close_s="closeDialog2"
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

var dayEnd = d.toLocaleString('default', { day: '2-digit' })
let endDate = year + '-' + month + '-' + dayEnd
export default {
  name: 'admin-order-manage',
  data () {
    return {
      dialog_s:false,
      data: [],
      tokenExpired: false,
      status: [],
      listShipping:[],
      selectedRow: {},
      showDialog: false,
      loading_status:false,
      filterData: {
        company: '',
        customer: '',
        endDliveryDate: '',
        endOrderDate: endDate,
        endSuccessDelivery: '',
        manufacturer: '',
        order: '',
        search: '',
        startDliveryDate: '',
        startOrderDate: new Date(startDay).toISOString().slice(0, 10),
        startSuccessDelivery: '',
        status: 'new',
        status_send_mail:''
        // statusSendMail : statusSendMail
      },
      statusList: [
        { code: 'all', title: 'All' },
        { code: 'new', title: 'New' },
        { code: 'accept', title: 'Accept' },
        { code: 'delivery', title: 'Delivery' },
        { code: 'delivering', title: 'Delivering' },
        { code: 'complete', title: 'Complete' },
        { code: 'cancel', title: 'Cancel' }
      ],
      status_send_mail:[
        { code: '', title: 'All' },
        { code: 'success', title: 'Success' },
        { code: 'fail', title: 'Fail' },
       
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
      // console.log('ApplyFilter ==> ', val)
      this.fetch()
    },
    viewDeatil (val) {
      if (val.order_remarks == 'พัสดุการนำจ่ายถึงลูกค้า') {
        val.order_remarks = 'พัสดุการนำจ่ายถึงลูกค้า'
      } else if (val.order_remarks == 'พัสดุส่งกลับผู้ขาย') {
        val.order_remarks = 'พัสดุส่งกลับผู้ขาย'
      }
      this.selectedRow = val
      this.showDialog = true
      // console.log('viewDeatil ==> ', val)
    },
    closeDialog (val) {
      this.showDialog = false
      this.fetch()
      // console.log('closeDialog ==> ', val)
    },
    closeDialog2(){
       this.dialog_s = false
    },
    printDialog (val) {
      // this.showDialog = false
      // console.log('printDialog ==> ', val)
    },
    submitDialog (result) {
      // this.showDialog = false
      // console.log(result)
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
          order_remarks: order_remarks,
          order_status: this.selectedRow.order_status,
          order_delivery_date:this.selectedRow.order_delivery_date,
          order_success_date:this.selectedRow.order_success_date ,
          shipping_code :result.shipping_code == undefined ? '' : result.shipping_code,
          tracking_code :result.tracking_code,
          shipping_track_link:result.shipping_track_link == undefined ? '' : result.shipping_track_link,
          image:result.image
        }
        this.$store
          .dispatch('sendOrderStatus', obj)
          .then(res => {

            let perc_id = []
            perc_id.push(obj.purchase_id)
            this.$store
              .dispatch('getOrderDetail', JSON.stringify(perc_id))
              .then(res => {
                this.selectedRow.order_delivery_date = res.success.data[0].order_delivery_date
                this.selectedRow.order_success_date = res.success.data[0].order_success_date
                this.selectedRow.order_remarks = res.success.data[0].order_remarks
                  })
              .catch(error => {
                if (error.response.status == 401) {
                  sessionStorage.removeItem('user_profile'); 
                  sessionStorage.removeItem('token_seesion');
                  this.tokenExpired = true
                  console.log('Error 401')
                }
              })

          })
          .catch(error => {
            if (error.response.status == 401) {
              sessionStorage.removeItem('user_profile'); 
              sessionStorage.removeItem('token_seesion');
              console.log('Error 401')
            }
          })
      }
    },
    submitAction (val) {
        if(val.event == 'disable'){
        this.$store
                .dispatch('disableOrderAdmin', val)
                .then(res => {
                  this.fetch()
                })
                .catch(error => {})
        }else {
           let array = []
          for (let index = 0; index < val.length; index++) {
            const element = val[index];
            array.push(element)
            // console.log('resend', element)
          }

          this.$store
                .dispatch('resendMail', array)
                .then(res => {
                  this.dialog_s = true
                  this.fetch()
                })
                .catch(error => {})
          // console.log(array)
        }
    },
    printDetail (val) {
      // console.log('printDetail ==> ', val)
    },
    fetch () {
      this.loading_status = true
      this.$store
        .dispatch('getOrderAdmin', this.filterData)
        .then(res => {
          this.data = res.success.data
          this.status = this.statusList
          this.loading_status = false
          // console.log(res.success.data)
          // this.data = res.data
          // this.status = this.statusList

           setTimeout(() => {
          let data = 
            {event:'dropdown',
            shipping_id:'',
            shipping_code:'',
            shipping_name:'',
            shipping_track_link:'',
            is_active:''}
        this.$store
          .dispatch('shippingMaster', data)
          .then(res => {
            this.listShipping = res
          })
        .catch(error => {
          if (error.response.status == 401) {
            sessionStorage.removeItem('user_profile'); 
            sessionStorage.removeItem('token_seesion');
            this.tokenExpired = true
            console.log('Error 401')
          }
        })
      }, 1000);
        })
        .catch(error => {
          if (error.response.status == 401) {
            sessionStorage.removeItem('user_profile'); 
            sessionStorage.removeItem('token_seesion');
            this.tokenExpired = true
            // console.log('Error 401')
          }
        })
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
