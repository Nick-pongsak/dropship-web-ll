<template>
  <div
    id="home-page">
    <div >
      <admin-user-manage-filter
      :loading_status="loading_status"
        :status="systemList"
        @apply="ApplyFilter"
      ></admin-user-manage-filter>
      <admin-user-manage-detail
      :loading_status="loading_status"
        :data="data"
        @view="viewDeatil"
        @submit="submitAction"
      ></admin-user-manage-detail>
    </div>
    <admin-user-manage-detail-dialog
      v-if="showDialog"
      :data="selectedRow"
      :temp_data="selectedRow"
      v-show="showDialog"
      :openDialog="openDialog"
      @close="closeDialog"
      @fetch="fetch"
      @snack="snack"
    ></admin-user-manage-detail-dialog>

    <token-dialog
    v-if="tokenExpired"
    ></token-dialog>

    <v-snackbar
    style="padding:0;margin:4.5% 0 0 0;"
      v-model="snackbar"
      :multi-line="multiLine"
      :color="color"
      :top="y === 'top'"
    >
    <div style="font-family: 'Bai Jamjuree', sans-serif;border-radius: 4px;height: 100%;" class="md-layout">
        <div 
        style="border-radius:4px 0 0 4px;height:100%;width:3%;"
        :style="{'background-color':this.textSnack.status_code == 1 ? '#008525' :'#DA0707'}"></div>

         <div>    
          <div style="padding:0 0 0 20px;width: 100%;height: 50%;display: flex;justify-content: center;align-items: flex-end;;color:#000">{{ textSnack.status }} <span style="margin:0 0 0 5px;font-weight:bold;"> "{{ textSnack.user_name }}" </span> </div>
          <div style="height:50%;display: flex;justify-content: center;color:#000">เรียบร้อยแล้ว</div>
         </div>
    
        <!-- <div style="padding:0 0 0 10px;display: flex;align-items: center;color:#000;height: 100%;width: 97%;"> 
          {{ textSnack.status }} <span style=";font-weight:bold;"> " {{ textSnack.user_name }} " </span> 
        </div> -->
          
    </div>
    </v-snackbar>

  </div>
</template>

<script>
import OrderFilter from '@/components/filter/AdminUserManageFilter'
import detailTable from '@/components/table/AdminUserManageDetail'
import DetailDialog from '@/components/table/AdminUserManageDetailDialog'
import TokenDetailDialog from '@/components/dialog/TokenDialog'
export default {
  name: 'admin-user-manage',
  data () {
    return {
      tokenExpired:false,

      multiLine: true,
      snackbar: false,
      textSnack: '',
      y:'top',
      color: '#fff',


      loading_status:false,
      data: [],
      status: [],
      selectedRow: {},
      showDialog: false,
      openDialog:false,
      dialogDetail:true,
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
      console.log('viewDeatil ==> ', val)
    },
    closeDialog (val) {
      this.showDialog = false
      console.log('closeDialog ==> ', val)
    },
    submitAction (val) {
      this.$router.push('/AdminCreateAccount')
    },
    fetch () {
      let arr = []
      this.loading_status = true
      this.$store.dispatch('getUserList', this.filterData).then(res => {
        this.loading_status = false
        // console.log(res.data)
        // for (let index = 0; index < res.data.length; index++) {
        //   const element = res.data[index]
        //   arr.push(element)
          // console.log(element)
        // }
        this.data = res.data
        this.status = this.statusList

        // for (let i = 0; i < 13; i++) {
        //   let random = Math.floor(Math.random() * 2)
        //   arr.push({
        //     user_code:'V52086',
        //     user_name: 'Jainoi Pirompairak ' + i,
        //     update_time: '2022-09-02',
        //     login_time: '2022-05-15',
        //     create_time: '2022-11-02',
        //     status_order_code: this.systemList[random].code,
        //     status_order_title: this.systemList[random].title,
        //     comment: '',
        //     email: 'jainoi_p@kidmak.com'
        //   })
        // }
        // this.data = arr
        // this.status = this.statusList
      })
      .catch(error => { 
        if(error.response.status == 401){
          this.tokenExpired = true
          onsole.log('Error 401')
        }
       })
    },
    snack( param ){
      console.log(param)
      this.textSnack = param
      this.snackbar = true
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
      }else {
        this.fetch()
        console.log('ADmin')
      }
    }
  },
  components: {
    'admin-user-manage-filter': OrderFilter,
    'admin-user-manage-detail': detailTable,
    'admin-user-manage-detail-dialog': DetailDialog,
    'token-dialog': TokenDetailDialog,
  },
  mounted () {}
}
</script>
<style>
  .v-snack__content{
    padding:0;
    height: 68px
  }
</style>
