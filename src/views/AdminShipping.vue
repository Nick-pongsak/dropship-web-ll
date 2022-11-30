<template>
    <div style="height: calc(90% - 58px);background-color:#eff6ff;" id="home-page">
      <div>
        <!-- <admin-user-manage-filter
          :loading_status="loading_status"
          :status="systemList"
          @apply="ApplyFilter"
        ></admin-user-manage-filter> -->
        <admin-user-manage-detail
          :loading_status="loading_status"
          :data="data"
          @view="viewDeatil"
          @viewEdit="viewEditl"
          @viewAdd="viewAdd"
          @submit="submitAction"
        ></admin-user-manage-detail>
      </div>
      <admin-shipping-edit-dialog
        v-if="showDialog"
        :data="selectedRow"
        :temp_data="selectedRow"
        v-show="showDialog"
        :openDialog="openDialog"
        @close="closeDialog"
        @fetch="fetch"
        @snack="snack"
      ></admin-shipping-edit-dialog>

      <admin-shipping-add-dialog
        v-if="showDialog_add"
        :data="selectedRow"
        :temp_data="selectedRow"
        v-show="showDialog_add"
        :openDialog="openDialog"
        @close="closeDialog"
        @fetch="fetch"
        @snack="snack"
      ></admin-shipping-add-dialog>

      <div class="footer-shipping">
      </div>
  
      <token-dialog v-if="tokenExpired"></token-dialog>
  
      <v-snackbar
        :style="{
          padding: 0,
          margin: '4.5% 0 0 0',
          width: 'inherit'
        }"
        v-model="snackbar"
        :color="color"
        :top="true"
      >
        <!-- :multi-line="multiLine" -->
        <div
          style="font-family: 'Bai Jamjuree', sans-serif;border-radius: 4px;height: 100%;width:400px;"
          class="md-layout"
        >
          <div
            style="border-radius:4px 0 0 4px;height:100%;width:3%;"
            :style="{
              'background-color':
                this.textSnack.status_code == 1 ? '#008525' : '#DA0707'
            }"
          ></div>
  
          <div style=" width: 97%;">
            <div
              style="
                    padding-left:5px;
                    font-style:italic;
                    width: 100%;
                    height: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    color:#000"
            >
              {{ textSnack.status }}
              <span style="margin:0 0 0 5px;font-weight:bold;">
                "{{ textSnack.user_name }}"
              </span>
            </div>
            <div
              style="height:50%;display: flex;justify-content: center;color:#000"
            >
              เรียบร้อยแล้ว
            </div>
          </div>
  
          <!-- <div style="padding:0 0 0 10px;display: flex;align-items: center;color:#000;height: 100%;width: 97%;"> 
            {{ textSnack.status }} <span style=";font-weight:bold;"> " {{ textSnack.user_name }} " </span> 
          </div> -->
        </div>
      </v-snackbar>
    </div>
</template>
  
  <script>
  import detailTable from '@/components/table/AdminShippingDetail'
  import DetailDialog_edit from '@/components/table/AdminShippingEditDialog'
  import DetailDialog_add from '@/components/table/AdminShippingAddDialog'
  import TokenDetailDialog from '@/components/dialog/TokenDialog'
  export default {
    name: 'admin-user-manage',
    data () {
      return {
        tokenExpired: false,
  
        // multiLine: true,
        snackbar: false,
        textSnack: '',
        y: 'top',
        color: '#fff',
  
        loading_status: false,
        data: [],
        status: [],
        selectedRow: {},
        showDialog: false,
        showDialog_add: false,
        openDialog: false,
        dialogDetail: true,
        systemList: [
          { code: 'all', title: 'All' },
          { code: 'active', title: 'Active' },
          { code: 'inactive', title: 'Inactive' }
        ],
        filterData: {
          keyword: '',
          user_status: '',
          user_email: '',
          user_id: '',
          user_company: '',
          name: ''
        }
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
      },
      viewDeatil (val) {
        this.selectedRow = val
        this.showDialog = true
        // this.showDialog_add = false
        // console.log('viewDeatil ==> ', val)
      },
      viewEditl(row){
        this.selectedRow = row
        console.log(row)
        this.showDialog = true
      },
      viewAdd(){
        this.showDialog_add = true
      },
      closeDialog (val) {
        this.showDialog = false
        this.showDialog_add = false
        // console.log('closeDialog ==> ', val)
      },
      submitAction (val) {
        this.$router.push('/AdminCreateAccount')
      },
      fetch () {
        let arr = []
        this.loading_status = true

        let data = 
            {event:'get',
            shipping_id:'',
            shipping_code:'',
            shipping_name:'',
            shipping_track_link:'',
            is_active:''}
      this.$store
        .dispatch('shippingMaster', data)
        .then(res => {
          this.data = res
          this.loading_status = false
        })
        .catch(error => {
          if (error.response.status == 401) {
            this.tokenExpired = true
            console.log('Error 401')
          }
        })
      },
      snack (param) {
        this.textSnack = param
        this.snackbar = param.show
        this.fetch()
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
        if (data.user_role == 'supplier') {
          this.$router.push('/' + 'home')
        } else {
          this.fetch()

          // console.log('ADmin')
        }
      }
    },
    components: {
      // 'admin-user-manage-filter': OrderFilter,
      'admin-user-manage-detail': detailTable,
      'admin-shipping-add-dialog' :DetailDialog_add,
      'admin-shipping-edit-dialog': DetailDialog_edit,
      'token-dialog': TokenDetailDialog
    },
    mounted () {}
  }
  </script>
  <style>
  .v-snack__content {
    padding: 0;
    height: 70px;
  }
  .footer-shipping {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 10%;
      background-color: #000;
      color: white;
      text-align: center;
    }
  </style>
  