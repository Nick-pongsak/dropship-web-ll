<template>
  <div
    id="home-page"
    :style="{ background: showDialog ? 'rgba(0, 0, 0, 0.2)' : '' }"
  >
    <div v-show="!showDialog">
      <admin-user-manage-filter
        :status="systemList"
        @apply="ApplyFilter"
      ></admin-user-manage-filter>
      <admin-user-manage-detail
        :data="data"
        @view="viewDeatil"
        @submit="submitAction"
      ></admin-user-manage-detail>
    </div>
    <admin-user-manage-detail-dialog
      :data="selectedRow"
      v-show="showDialog"
      @close="closeDialog"
    ></admin-user-manage-detail-dialog>
  </div>
</template>

<script>
import OrderFilter from '@/components/filter/AdminUserManageFilter'
import detailTable from '@/components/table/AdminUserManageDetail'
import DetailDialog from '@/components/table/AdminUserManageDetailDialog'
export default {
  name: 'admin-user-manage',
  data () {
    return {
      data: [],
      status: [],
      selectedRow: {},
      showDialog: false,
      systemList: [
        { code: 'active', title: 'Active' },
        { code: 'inactive', title: 'Inactive' }
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
    submitAction (val) {
      this.$router.push('/AdminCreateAccount')
    },
    fetch () {
      let arr = []
      for (let i = 0; i < 13; i++) {
        let random = Math.floor(Math.random() * 2)
        arr.push({
          user_name: 'Jainoi Pirompairak ' + i,
          update_time: '2022-09-02',
          login_time: '2022-05-15',
          create_time: '2022-11-02',
          status_order_code: this.systemList[random].code,
          status_order_title: this.systemList[random].title,
          comment: '',
          email: 'jainoi_p@kidmak.com'
        })
      }
      this.data = arr
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
      if (data.user_role == 'user') {
        this.$router.push('/' + 'home')
      } else {
        this.fetch()
      }
    }
  },
  components: {
    'admin-user-manage-filter': OrderFilter,
    'admin-user-manage-detail': detailTable,
    'admin-user-manage-detail-dialog': DetailDialog
  },
  mounted () {}
}
</script>
<style></style>
