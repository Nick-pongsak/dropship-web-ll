<template>
  <div
    class="filter"
    v-resize="onResize"
    :style="{ 'padding-bottom': windowSize > 600 ? '16px' : '8px' }"
  >
    <div style="width:100%;display:flex">
      <div style="width:90%">
        <div class="btn-filter">Filter</div>
      </div>
      <div style="width:10%;text-align: right;" @click="showFilter()">
        <v-icon
          v-text="expandFilter ? 'mdi-menu-up' : 'mdi-menu-down'"
          style="color:#000000;cursor:pointer"
          size="28"
        ></v-icon>
      </div>
    </div>
    <div
      v-if="expandFilter"
      :style="{ display: windowSize <= 600 ? '' : 'flex' }"
    >
      <div
        class="filter-box"
        :style="{ width: windowSize <= 600 ? '100%' : '70%' }"
      >
        <div style="width:100%">
          <div class="subtitle">
            ค้นหา
          </div>
          <v-text-field solo dense v-model="searchInput">
            <v-icon slot="append" color="#D7D7D7" size="18">
              mdi-magnify
            </v-icon>
            <v-icon
              v-if="showClearInput('search')"
              slot="append"
              size="18"
              @click="clearInput('search')"
            >
              mdi-close
            </v-icon>
          </v-text-field>
        </div>
        <div
          :style="{
            width: '100%',
            'margin-top': windowSize <= 600 ? '7px' : '6px'
          }"
        >
          <div
            :style="{ display: windowSize <= 600 ? '' : 'flex', width: '100%' }"
          >
            <div :style="{ width: windowSize <= 600 ? '100%' : '35%' }">
              <div class="subtitle">
                อีเมล
              </div>
              <v-text-field solo dense v-model="emailInput">
                <v-icon
                  v-if="showClearInput('email')"
                  slot="append"
                  size="18"
                  @click="clearInput('email')"
                >
                  mdi-close
                </v-icon>
              </v-text-field>
            </div>
            <div
              :style="{
                width: windowSize <= 600 ? '100%' : '35%',
                'margin-left': windowSize <= 600 ? '' : '8px'
              }"
            >
              <div class="subtitle">
                รหัสผู้ใช้งาน
              </div>
              <v-text-field solo dense v-model="userCodeInput">
                <v-icon
                  v-if="showClearInput('userCode')"
                  slot="append"
                  size="18"
                  @click="clearInput('userCode')"
                >
                  mdi-close
                </v-icon>
              </v-text-field>
            </div>
            <div
              :style="{
                width: windowSize <= 600 ? '100%' : '30%',
                'margin-left': windowSize <= 600 ? '' : '8px'
              }"
            >
              <div class="subtitle">
                ชื่อบริษัท
              </div>
              <v-text-field solo dense v-model="companyInput">
                <v-icon
                  v-if="showClearInput('company')"
                  slot="append"
                  size="18"
                  @click="clearInput('company')"
                >
                  mdi-close
                </v-icon>
              </v-text-field>
            </div>
          </div>
        </div>
      </div>
      <div
        class="filter-box"
        :style="{
          width: windowSize <= 600 ? '100%' : '20%',
          'margin-top': windowSize <= 600 ? '11px' : ''
        }"
      >
        <div class="subtitle">
          สถานะ
        </div>
        <div style="display:flex">
          <v-select
            v-model="statusInput"
            :items="systemList"
            label=""
            item-text="title"
            item-value="code"
            solo
            dense
          ></v-select>
        </div>
        <div
          :style="{
            display: windowSize <= 600 ? '' : '',
            'margin-top': windowSize <= 600 ? '3px' : '3px'
          }"
        >
          <div class="subtitle">
            ชื่อ นามสกุล
          </div>
          <v-text-field solo dense v-model="fullnameInput">
            <v-icon
              v-if="showClearInput('fullname')"
              slot="append"
              size="18"
              @click="clearInput('fullname')"
            >
              mdi-close
            </v-icon>
          </v-text-field>
        </div>
      </div>
      <div
        class="filter-box"
        :style="{
          width: windowSize <= 600 ? '100%' : '10%',
          'margin-top': windowSize <= 600 ? '11px' : ''
        }"
      >
        <div style="display:flex;padding-top:13px">
          <v-btn rounded @click="clearFilter()" class="clear">Clear</v-btn>
        </div>
        <div
          :style="{
            display: 'flex',
            'margin-top': windowSize <= 600 ? '17px' : '22px'
          }"
        >
          <v-btn rounded @click="apply()" class="ok">Apply</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  name: 'order-filter',
  props: {
    status: Array
  },
  data () {
    return {
      expandFilter: true,
      windowSize: 1366,
      searchInput: null,
      emailInput: null,
      userCodeInput: null,
      fullnameInput: null,
      companyInput: null,
      statusInput: 'all',
      systemList: this.status
    }
  },
  computed: {},
  watch: {},
  methods: {
    showFilter () {
      this.expandFilter = !this.expandFilter
      // this.onResize()
    },
    showClearInput (val) {
      if (val == 'email') {
        if (this.emailInput == null) {
          return false
        } else if (this.emailInput.trim().length == 0) {
          return false
        } else {
          return true
        }
      } else if (val == 'fullname') {
        if (this.fullnameInput == null) {
          return false
        } else if (this.fullnameInput.trim().length == 0) {
          return false
        } else {
          return true
        }
      } else if (val == 'search') {
        if (this.searchInput == null) {
          return false
        } else if (this.searchInput.trim().length == 0) {
          return false
        } else {
          return true
        }
      } else if (val == 'userCode') {
        if (this.userCodeInput == null) {
          return false
        } else if (this.userCodeInput.trim().length == 0) {
          return false
        } else {
          return true
        }
      } else if (val == 'company') {
        if (this.companyInput == null) {
          return false
        } else if (this.companyInput.trim().length == 0) {
          return false
        } else {
          return true
        }
      }
    },
    clearInput (val) {
      if (val == 'email') {
        this.emailInput = null
      } else if (val == 'fullname') {
        this.fullnameInput = null
      } else if (val == 'search') {
        this.searchInput = null
      } else if (val == 'userCode') {
        this.userCodeInput = null
      } else if (val == 'company') {
        this.companyInput = null
      }
    },
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      this.windowSize = x
      // console.log(x)
    },
    apply () {
      let status = ''
      if (this.statusInput == 'active') {
        status = 1
      } else if (this.statusInput == 'inactive') {
        status = 0
      }
      let result = {
        keyword: this.searchInput == null ? '' : this.searchInput,
        user_email: this.emailInput == null ? '' : this.emailInput,
        user_id: this.userCodeInput == null ? '' : this.userCodeInput,
        name: this.fullnameInput == null ? '' : this.fullnameInput,
        user_company: this.companyInput == null ? '' : this.companyInput,
        user_status: status
      }
      this.$emit('apply', result)
    },
    clearFilter () {
      this.searchInput = null
      this.emailInput = null
      this.fullnameInput = null
      this.userCodeInput = null
      this.companyInput = null
      this.statusInput = 'all'
    }
  }
}
</script>
<style></style>
