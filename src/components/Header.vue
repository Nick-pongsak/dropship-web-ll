<template>
  <div
    :style="{ 'z-index': 1, 'padding-top': windowSize > 600 ? '7px' : '0px' }"
    id="MenuBar"
    class="header-main"
    v-resize="onResize"
  >
    <div style="cursor: pointer; width: 50%; display: flex">
      <div :style="{ 'padding-top': windowSize > 600 ? '0px' : '15px' }">
        <img
          src="@/assets/icons/logo.png"
          :style="{ height: logo, width: width }"
        />
      </div>
      <div
        v-if="info.user_role == 'Supplier'"
        @click="action('home')"
        class="sys-name"
        :style="{
          'font-size': windowSize > 600 ? '20px' : '18px',
          'padding-top': windowSize > 600 ? '0px' : '10px',
        }"
      >
        Dropship portal
      </div>
      <div
        v-else
        @click="action(info.user_role == 'supplier' ? 'home' : 'adminHome')"
        class="sys-name"
        :style="{
          'font-size': windowSize > 600 ? '20px' : '18px',
          'padding-top': windowSize > 600 ? '0px' : '10px',
        }"
      >
        Dropship portal
      </div>
    </div>
    <div
      v-if="info.user_role == 'supplier'"
      :style="{
        color: '#fff',
        width: '50%',
        display: windowSize > 600 ? 'flex' : '',
      }"
      class="right-header justify-end"
    >
      <div
        v-if="windowSize > 600"
        :style="{
          padding: windowSize > 600 ? '0 10px 0 0' : '0 10px 0 8px',
          'font-weight': 400,
          'font-size': '16px',
          display: 'flex',
          'align-items': 'center',
          'font-family': 'Bai Jamjuree, sans-serif',
          width: windowSize > 600 ? '' : '100%',
        }"
      >
        {{ formatDate(this.timeServer) }}
      </div>
      <md-menu
        :style="{
          width: windowSize > 600 ? '' : '100%',
          height: windowSize > 600 ? '' : '30px',
        }"
        md-size="medium"
        md-align-trigger
      >
        <md-button style="text-transform: none" md-menu-trigger
          >{{ info.user_name }}{{ " " }}{{ info.user_surname
          }}<span class="mdi mdi-menu-down"></span
        ></md-button>
        <md-menu-content class="option-detail">
          <md-menu-item
            v-for="(row, index) in menu_list_sup"
            :key="'card-' + index"
            :class="'hover-' + row.path"
            class="sub-option-detail"
            @click="action(row.path)"
            :style="{
              'background-color': active_menu(row.path) ? '#2372E7' : '',
              color: active_menu(row.path) ? '#fff' : '',
            }">
            {{ row.txt }}
          </md-menu-item>
          <md-menu-item
            class="hover-out sub-option-detail"
            @click="logout">ออกจากระบบ</md-menu-item>
        </md-menu-content>
      </md-menu>
      <div
        v-if="windowSize < 600"
        :style="{
          padding: windowSize > 600 ? '0 10px 0 0' : '0 10px 0 8px',
          'font-weight': 400,
          'font-size': '16px',
          display: 'flex',
          'align-items': 'center',
          'font-family': 'Bai Jamjuree, sans-serif',
          width: windowSize > 600 ? '' : '100%',
        }"
      >
        {{ formatDate(this.timeServer) }}
      </div>
    </div>

    <div
      v-else
      :style="{
        color: '#fff',
        width: '50%',
        display: windowSize > 600 ? 'flex' : '',
      }"
      class="right-header justify-end"
    >
      <div
        v-if="windowSize > 600"
        :style="{
          padding: windowSize > 600 ? '0 10px 0 0' : '0 10px 0 8px',
          'font-weight': 400,
          'font-size': '16px',
          display: 'flex',
          'align-items': 'center',
          'font-family': 'Bai Jamjuree, sans-serif',
          width: windowSize > 600 ? '' : '100%',
        }"
      >
        {{ formatDate(this.timeServer) }}
      </div>
      <md-menu
        md-size="medium"
        md-align-trigger
        :style="{ width: windowSize > 600 ? '' : '100%' }"
      >
        <md-button
          style="
            border: 1px solid #000000;
            border-radius: 64px;
            background-color: #fff;
          "
          md-menu-trigger
          class="box-profile"
        >
          <div class="md-layout">
            <div
              style="
                width: 55%;
                color: #000;
                display: flex;
                align-items: center;
              "
            >
              {{ info.user_name }}
            </div>
            <div style="width: 25%; color: #000">
              <span class="mdi mdi-account-circle mdi-24px"></span>
            </div>
            <div style="text-align: center; width: 20%; color: #000">
              <span class="mdi mdi-menu-down mdi-24px"></span>
            </div>
          </div>
        </md-button>
        <md-menu-content class="option-detail">
          <md-menu-item
            v-for="(row, index) in menu_list_admin"
            :key="'card-' + index"
            :class="'hover-' + row.path"
            class="sub-option-detail"
            @click="action(row.path)"
            :style="{
              'background-color': active_menu(row.path) ? '#2372E7' : '',
              color: active_menu(row.path) ? '#fff' : '',
            }">
            {{ row.txt }}
          </md-menu-item>
          <md-menu-item
            class="hover-out sub-option-detail"
            @click="logout">ออกจากระบบ
          </md-menu-item>
        </md-menu-content>
      </md-menu>
      <div
        v-if="windowSize < 600"
        :style="{
          padding: windowSize > 600 ? '0 10px 0 0' : '2px 10px 0 23px',
          'font-weight': 400,
          'font-size': '16px',
          display: 'flex',
          'align-items': 'center',
          'font-family': 'Bai Jamjuree, sans-serif',
          width: windowSize > 600 ? '' : '100%',
        }"
      >
        {{ formatDate(this.timeServer) }}
      </div>
    </div>
  </div>
</template>

<script>
import { equal } from "assert";
import Vue from "vue";
export default {
  name: "headers",
  props: {},
  data() {
    return {
      menu_list_admin: [
        {
          id: 1,
          txt: "หน้าหลัก",
          path: "adminHome",
        },
        {
          id: 2,
          txt: "จัดการบัญชี",
          path: "adminProfile",
        },
        {
          id: 3,
          txt: "จัดการ การสั่งซื้อสินค้า",
          path: "adminManageOrder",
        },
        {
          id: 4,
          txt: "จัดการผู้ใช้งาน",
          path: "AdminUserManage",
        },
        {
          id: 5,
          txt: "จัดการ บริษัทขนส่ง",
          path: "AdminShipping",
        },
        {
          id: 6,
          txt: "นโยบายความเป็นส่วนตัว",
          path: "Policy",
        },
      ],
      menu_list_sup: [
        {
          id: 1,
          txt: "ข้อมูลส่วนตัว",
          path: "userprofile",
        },
      ],
      windowSize: 1366,
      sysName: "20px",
      logo: "30px",
      width: "30px",
      resizeHeader: true,
      active: false,
      value: null,
      monthsShort: [
        // 'JAN',
        // 'FEB',
        // 'MAR',
        // 'APR',
        // 'MAY',
        // 'JUN',
        // 'JUL',
        // 'AUG',
        // 'SEP',
        // 'OCT',
        // 'NOV',
        // 'DEC'
        "ม.ค.",
        "ก.พ.",
        "มี.ค.",
        "เม.ย.",
        "พ.ค.",
        "มิ.ย.",
        "ก.ค.",
        "ส.ค.",
        "ก.ย.",
        "ต.ค.",
        "พ.ย.",
        "ธ.ค.",
      ],
    };
  },
  watch: {},
  computed: {
    timeServer() {
      return this.$store.getters.timeServer;
    },
    info() {
      var user_info = Vue.localStorage.get("user_profile");
      var TheArray = JSON.parse(user_info);
      return TheArray;
    },
  },
  methods: {
    formatDate(val) {
      if (val !== null) {
        let hours = "";
        let min = "";
        let today = new Date();
        const year = today.getFullYear();
        const fullYear = year;
        // const fullYear = year + 543
        const days = today.getDate();
        const h = today.getHours();
        const m = today.getMinutes();
        const monthName = this.monthsShort[today.getMonth()];

        if (h < 10) {
          hours = "0" + h;
        } else {
          hours = h;
        }

        if (m < 10) {
          min = "0" + m;
        } else {
          min = m;
        }

        return days + " " + monthName + " " + fullYear;
      } else {
        return val;
      }
    },
    onConfirm() {
      this.value = "Yes";
      let reMove = ["login", "SIZE_SCREEN", "user_profile"];
      reMove.forEach(function (element) {
        Vue.localStorage.remove(element);
      });
      this.$router.push("/");
    },
    onCancel() {
      this.value = "Cancel";
    },
    onResize() {},
    changeTheme(val) {
      this.$store.commit("SetTheme", val);
    },
    action(param) {
      if (param == "Policy") {
        this.$store.commit("ShowPolicy", true);
      } else {
        this.$store.commit("ShowPolicy", false);
        let path = "/" + param;
        if (path !== this.$route.path) {
          this.$router.push("/" + param);
        }
      }
    },
    active_menu(param) {
      let path = this.$router.app._route.path;
      const sliceWay = path.slice(1);
      if (sliceWay === param) {
        return true;
      } else {
        false;
      }
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        this.value = "Yes";
        this.$router.push("/");
      });
    },
    user_profile() {
      this.$router.push("/userprofile");
    },
    onResize() {
      this.windowSize = window.innerWidth;
    },
  },
  created() {
    this.$store.dispatch("getTimeServer");
  },
  components: {},
};
</script>
<style>
.header-main {
  width: 100%;
  position: absolute;
  height: 60px;
  left: 0px;
  top: 0px;
  background: #000000;
  display: flex;
  align-items: center;
}

.sys-name {
  color: #fff;
  height: 100%;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  padding: 0 0 0 10px;
}
.md-overlay {
  background-color: unset !important;
}
.option-detail {
  border-radius: 6px !important;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 12px !important;
  display: flex;
  padding: 10px;
  align-items: flex-end;
  /* width: 139px;
  height: 74px;  */
}

.sub-option-detail{
  font-family: 'Bai Jamjuree', sans-serif;
  cursor: pointer;
  border-radius: 5px;
}


.md-list-item-button.md-list-item-content {
  min-height: 10px;
}
.md-menu-content {
  height: auto;
  /* height: 270px !important; */
  max-height: 360px !important;
}
.md-menu-content-container {
  display: flex;
  justify-content: flex-end;
}
.md-menu-content.md-menu-content-medium {
  min-width: 139px !important;
  min-height: 30px !important;
}
.box-profile {
  cursor: pointer;
  width: 131px;
  height: 31px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 64px;
  align-items: center;
}

.hover-adminHome:hover {
  background-color: #2371e781;
  color: #fff;
}

.hover-adminProfile:hover {
  background-color: #2371e781;
  color: #fff;
}

.hover-adminManageOrder:hover {
  background-color: #2371e781;
  color: #fff;
}

.hover-AdminUserManage:hover {
  background-color: #2371e781;
  color: #fff;
}

.hover-AdminShipping:hover {
  background-color: #2371e781;
  color: #fff;
}

.hover-Policy:hover {
  background-color: #2371e781;
  color: #fff;
}

.hover-out:hover {
  background-color: #2371e781;
  color: #fff;
}

.hover-userprofile:hover {
  background-color: #2371e781;
  color: #fff;
}
</style>
