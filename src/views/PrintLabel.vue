<template>
  <div style="height: 100%; overflow: scroll">
    <div
      ref="printLable"
      :style="displayPrintLabel('flex')"
      style="justify-content: flex-end; margin: 0 30px; padding-top: 30px"
    >
      <div
        @click="print()"
        style="font-weight: bold; padding-right: 10px; cursor: pointer"
      >
        PRINT LABEL
      </div>
      <v-icon
        @click="print()"
        v-text="'mdi-printer'"
        style="color: #000000; cursor: pointer"
        size="20"
      ></v-icon>
    </div>

    <div id="print-label">
      <div v-for="(row, index) in PoDetail" :key="'card-' + index">
        <div v-if="row.page_ == 1" class="grid-header-page">
          <div class="header-page-box1">
            <img src="@/assets/images/head.jpg" width="300" height="200" />
          </div>
          <div class="header-page-box2" style="font-weight: bold">
            เลขที่คำสั่งซื้อ
          </div>
          <div class="header-page-box3" style="font-weight: bold">
            {{ row.order_num }}
          </div>
          <div class="header-page-box4">SO No.</div>
          <div class="header-page-box5">{{ row.salesorder_id }}</div>
          <div class="header-page-box6">PO No.</div>
          <div class="header-page-box7">{{ row.purchase_id }}</div>
        </div>

        <div v-if="row.page_ == 1" class="grid-head-page">
          <div class="head-box1">ผู้ส่ง</div>
          <div class="head-box2">ผู้รับ</div>
          <div class="head-box3">ชื่อ :</div>
          <div class="head-box4">{{ row.sup_company }}</div>
          <div class="head-box5">ชื่อบริษัท :</div>
          <div class="head-box6">{{ row.cus_company }}</div>
          <div class="head-box7">เบอร์โทร :</div>
          <div class="head-box8">{{ row.sup_phone }}</div>
          <div class="head-box9">ชื่อ-นามสกุลผู้รับ :</div>
          <div class="head-box10">{{ row.cus_name }} {{ row.cus_surname }}</div>
          <div class="head-box11">ที่อยู่ :</div>
          <div class="head-box12">
            {{ row.sup_address }} {{ row.sup_district }}
            {{ row.sup_subdistrict }} {{ row.sup_province }}
            {{ row.sup_postal }}
          </div>
          <div class="head-box13">เบอร์โทรติดต่อผู้รับ :</div>
          <div class="head-box14">{{ row.cus_phone_secendary }}</div>
          <div class="head-box15">เบอร์โทรติดต่อบริษัท :</div>
          <div class="head-box16">{{ row.cus_phone }}</div>
          <div class="head-box17">ที่อยู่ :</div>
          <div class="head-box18">
            {{ row.cus_address }} {{ row.cus_district }}
            {{ row.cus_subdistrict }} {{ row.cus_province }}
            {{ row.cus_postal }}
          </div>
          <div class="head-box19">
            หมายเหตุ (วันที่สั่งซื้อ) :
            {{ datetoThaiDateString(row.order_date) }}
          </div>
          <!-- <div class="head-box20">{{ row.order_date }}</div> -->
        </div>

        <div
        v-if="row.page_ == 1"
          style="
            font-family: 'Noto Sans Thai', sans-serif;
            color: #959595;
            font-size: 14px;
            width: 100%;
            margin: 20px 0 0 0;
            font-weight: bold;
          "
        >
          พิมพ์ใบปะหน้าพัสดุนี้และติดลงบนกล่องพัสดุ
        </div>
        <div
        v-if="row.page_ == 1"
          style="
            color: #959595;
            font-size: 12px;
            width: 100%;
            margin: 10px 0 0 0;
            font-weight: bold;
          "
        >
          <div style="display: flex" class="hr-droid">
            <div
              style="
                width: 5%;
                position: relative;
                margin: 5px;
                border-top: 3px dotted #959595;
                margin: 10px 0 0 0;
              "
              class="hr-line hr-droid"
            ></div>
            <div><img src="@/assets/icons/Cut.png" /></div>
            <div
              style="
                border-top: 3px dotted #959595;
                margin: 10px 0 0 0;
                width: 95%;
              "
              class="hr-line hr-droid"
            ></div>
          </div>
        </div>

        <div v-if="row.page_ == 1" style="display: flex; margin: 20px 0 0 0; width: 100%">
          <div style="width: 50%; font-size: 18px">รายการสินค้า</div>
          <div style="width: 50%; font-size: 16px; text-align: right">
            จำนวนรวม
            <span style="font-weight: bold">{{
              formatNumber(row.sum_order_item)
            }}</span>
            รายการ
          </div>
        </div>

        <div class="grid-detail-head" style="padding-top: 20px">
          <div class="detail-h-box1">#</div>
          <div class="detail-h-box2">SKU</div>
          <div class="detail-h-box3">ชื่อรายการสินค้า</div>
          <div class="detail-h-box4">จำนวน</div>
          <div class="detail-h-box5">หมายเหตุ</div>
        </div>

        <div v-for="(d_row, d_index) in row.items" :key="'card-' + d_index">
          <div class="grid-detail">
            <div class="detail-box1">
              <div class="align-justify-center">{{ d_row.index + 1 }}</div>
            </div>
            <div class="detail-box2">
              <div class="align-center">{{ d_row.product_sku }}</div>
            </div>
            <div class="detail-box3">
              <div class="align-center">{{ d_row.product_name }}</div>
            </div>
            <div class="detail-box4">
              <div class="align-center-justify-end">
                {{ formatNumber(d_row.order_qty, 0) }}
              </div>
            </div>
            <div class="detail-box5">
              <div class="align-center">
                {{ d_row.order_detail_remark }}
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 20px 0; text-align: right">เลขหน้า {{row.page_}} / {{row.page_count}}</div>

        <div  v-if="row.page_ == row.page_count " class="grid-footer" style="padding: 50px 0 30px 0">
          <div class="footer-box1">ลายเซ็นผู้ส่ง</div>
          <div class="footer-box2">
            .............................................................
          </div>
          <!-- <div class="footer-box3"></div> -->
          <div class="footer-box4">ลายเซ็นผู้รับ</div>
          <div class="footer-box5">
            ...............................................................................
          </div>
        </div>

        <div class="break-page"></div>
      </div>
    </div>
  </div>
</template>
  <script>
import Vue from "vue";
import AppServices from "@/services/app";

export default {
  name: "print-label",
  data() {
    return { output: null };
  },
  computed: {
    PoDetail() {
      let printData = JSON.parse(Vue.localStorage.get("PRINT_LABEL"));
      // console.log("printData ==>", printData);

      let dataItems = [];
      let sumOrderItem = 0;
      let checkHead = "";
      let newArrData = JSON.parse(JSON.stringify(printData));

      for (let index_head = 0; index_head < printData.length; index_head++) {
        if (
          checkHead != "" &&
          checkHead != printData[index_head]["order_num"]
        ) {
          sumOrderItem = 0;
        }

        dataItems = JSON.parse(JSON.stringify(printData[index_head]["items"]));

        for (let index_item = 0; index_item < dataItems.length; index_item++) {
          sumOrderItem += parseFloat(dataItems[index_item]["order_qty"]);
        }

        checkHead = printData[index_head]["order_num"];

        // newArrData[0]["items"][0]["order_qty"] = 1000;
        Object.assign(newArrData[index_head], { sum_order_item: sumOrderItem });
      }

      // console.log("newArrData ==>", newArrData);
      return newArrData;
      // return JSON.parse(Vue.localStorage.get("PRINT_LABEL"));
    },
    info_cus() {
      return JSON.parse(Vue.localStorage.get("user_profile"));
    },
  },
  watch: {},
  methods: {
    formatNumber(value, dicimal) {
      return AppServices.formatNumber(value, dicimal);
    },
    datetoThaiDateString(value) {
      return AppServices.datetoThaiDateString(new Date(value));
    },
    print() {
      if (this.$refs.printLable !== undefined) {
       
        if(window.location.href == 'http://demo-dropshipportal.dhas.com/#/PrintLabel'){
          document.body.childNodes[0].childNodes[0].classList.value = ''
          document.body.childNodes[0].classList.value = ''
        }else {
          document.body.childNodes[3].childNodes[0].classList.value = ''
          document.body.childNodes[3].classList.value = ''
        }
   
        this.displayPrintLabel("none");
        window.print();
         
        if(window.location.href == 'http://demo-dropshipportal.dhas.com/#/PrintLabel'){
          document.body.childNodes[0].childNodes[0].classList.value = 'v-application--wrap'
          document.body.childNodes[0].classList.value = 'v-application v-application--is-ltr theme--light dark'
        }else {
          document.body.childNodes[3].childNodes[0].classList.value = 'v-application--wrap'
          document.body.childNodes[3].classList.value = 'v-application v-application--is-ltr theme--light dark'
        }


          // document.body.childNodes[0].childNodes[0].classList.value = 'v-application--wrap'
          // document.body.childNodes[0].classList.value = 'v-application v-application--is-ltr theme--light dark'
      }
      
    },
    displayPrintLabel(display) {
      return "display: " + display + ";";
    },
  },
  components: {},
  created() {},
  mounted() {},
};
</script>

<style type="text/css">
#print-label {
  padding: 20px 30px;
  width: 100%;
}

/* -- START HEADER -- */
.grid-header-page {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 25px;
  line-height: 25px;
  font-size: 16px;
  /* color: white; */
  /* text-align: center; */
}

.header-page-box1 {
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 4;
  /* line-height: 70px !important; */
  font-weight: bold;
  font-size: 25px;
  /* background-color: pink; */
}

.header-page-box2 {
  grid-column-start: 6;
  grid-column-end: 7;
  grid-row-start: 1;
  grid-row-end: 2;
  /* background-color: #f396b5; */
  padding-left: 30px;
}
.header-page-box3 {
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 1;
  grid-row-end: 2;
}
.header-page-box4 {
  grid-column-start: 6;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 3;
  padding-left: 30px;
}
.header-page-box5 {
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 2;
  grid-row-end: 3;
}
.header-page-box6 {
  grid-column-start: 6;
  grid-column-end: 7;
  grid-row-start: 3;
  grid-row-end: 4;
  padding-left: 30px;
}
.header-page-box7 {
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 3;
  grid-row-end: 4;
}
/* -- END HEADER -- */

/* -- START TABLE HEAD -- */
.grid-head-page {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 28px;
  line-height: 28px;
  font-size: 16px;
  padding-top: 20px;
}

.head-box1 {
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 2;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  text-align: center;
}
.head-box2 {
  grid-column-start: 6;
  grid-column-end: 13;
  grid-row-start: 1;
  grid-row-end: 2;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  text-align: center;
}
.head-box3 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
  border-left: 1px solid black;
  padding-left: 10px;
}
.head-box4 {
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 2;
  grid-row-end: 3;
  padding-left: 10px;
}
.head-box5 {
  grid-column-start: 6;
  grid-column-end: 9;
  grid-row-start: 2;
  grid-row-end: 3;
  border-left: 1px solid black;
  padding-left: 10px;
}
.head-box6 {
  grid-column-start: 8;
  grid-column-end: 13;
  grid-row-start: 2;
  grid-row-end: 3;
  border-right: 1px solid black;
}
.head-box7 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 3;
  grid-row-end: 4;
  border-left: 1px solid black;
  padding-left: 10px;
}
.head-box8 {
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 3;
  grid-row-end: 4;
  padding-left: 10px;
}
.head-box9 {
  grid-column-start: 6;
  grid-column-end: 9;
  grid-row-start: 3;
  grid-row-end: 4;
  border-left: 1px solid black;
  padding-left: 10px;
}
.head-box10 {
  grid-column-start: 8;
  grid-column-end: 13;
  grid-row-start: 3;
  grid-row-end: 4;
  border-right: 1px solid black;
}
.head-box11 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 8;
  border-left: 1px solid black;
  padding-left: 10px;
}
.head-box12 {
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 4;
  grid-row-end: 8;
  padding-left: 10px;
}
.head-box13 {
  grid-column-start: 6;
  grid-column-end: 9;
  grid-row-start: 4;
  grid-row-end: 5;
  border-left: 1px solid black;
  padding-left: 10px;
}
.head-box14 {
  grid-column-start: 8;
  grid-column-end: 13;
  grid-row-start: 4;
  grid-row-end: 5;
  border-right: 1px solid black;
}
.head-box15 {
  grid-column-start: 6;
  grid-column-end: 9;
  grid-row-start: 5;
  grid-row-end: 6;
  border-left: 1px solid black;
  padding-left: 10px;
}
.head-box16 {
  grid-column-start: 8;
  grid-column-end: 13;
  grid-row-start: 5;
  grid-row-end: 6;
  border-right: 1px solid black;
}
.head-box17 {
  grid-column-start: 6;
  grid-column-end: 9;
  grid-row-start: 6;
  grid-row-end: 8;
  border-left: 1px solid black;
  padding-left: 10px;
}
.head-box18 {
  grid-column-start: 8;
  grid-column-end: 13;
  grid-row-start: 6;
  grid-row-end: 8;
  border-right: 1px solid black;
}
.head-box19 {
  grid-column-start: 1;
  grid-column-end: 13;
  grid-row-start: 8;
  grid-row-end: 9;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  /* padding-left: 10px; */
}
/* .head-box20 {
  grid-column-start: 2;
  grid-column-end: 13;
  grid-row-start: 8;
  grid-row-end: 9;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  padding-left: 10px;
} */
/* -- END TABLE HEAD -- */

/* -- START TABLE DETAIL -- */
.grid-detail-head {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-auto-rows: 32px;
  line-height: 32px;
  font-size: 16px;
}

.grid-detail {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-auto-rows: 28px;
  line-height: 28px;
  font-size: 16px;
}

.detail-h-box1 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  text-align: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
}
.detail-h-box2 {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding-left: 30px;
}
.detail-h-box3 {
  grid-column-start: 4;
  grid-column-end: 12;
  grid-row-start: 1;
  grid-row-end: 2;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding-left: 30px;
}
.detail-h-box4 {
  grid-column-start: 12;
  grid-column-end: 14;
  grid-row-start: 1;
  grid-row-end: 2;
  text-align: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  text-align: right;
}
.detail-h-box5 {
  grid-column-start: 14;
  grid-column-end: 21;
  grid-row-start: 1;
  grid-row-end: 2;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  padding-left: 30px;
}

.align-center {
  grid-area: a;
  align-self: center;
  justify-self: start;
}
.align-justify-center {
  grid-area: a;
  align-self: center;
  justify-self: center;
}
.align-center-justify-end {
  grid-area: a;
  align-self: center;
  justify-self: end;
}

.detail-box1 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
  text-align: center;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "a a"
    "a a";
}
.detail-box2 {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
  border-bottom: 1px solid black;
  padding-left: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "a a"
    "a a";
}
.detail-box3 {
  grid-column-start: 4;
  grid-column-end: 12;
  grid-row-start: 1;
  grid-row-end: 3;
  border-bottom: 1px solid black;
  padding-left: 30px;
  display: grid;
  grid-template-areas:
    "a a"
    "a a";
}
.detail-box4 {
  grid-column-start: 12;
  grid-column-end: 14;
  grid-row-start: 1;
  grid-row-end: 3;
  text-align: center;
  border-bottom: 1px solid black;
  text-align: right;
  display: grid;
  grid-template-areas:
    "a a"
    "a a";
}
.detail-box5 {
  grid-column-start: 14;
  grid-column-end: 21;
  grid-row-start: 1;
  grid-row-end: 3;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  padding-left: 30px;
  display: grid;
  grid-template-areas:
    "a a"
    "a a";
}
/* -- END TABLE DETAIL -- */

/* -- START FOOTER -- */
.grid-footer {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 28px;
  line-height: 28px;
  font-size: 16px;
}

.footer-box1 {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
}
.footer-box2 {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
}
.footer-box3 {
  grid-column-start: 4;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 2;
}
.footer-box4 {
  grid-column-start: 5;
  grid-column-end: 6;
  /* grid-column-start: 6;
  grid-column-end: 7; */
  grid-row-start: 1;
  grid-row-end: 2;
}
.footer-box5 {
  grid-column-start: 6;
  grid-column-end: 9;
  /* grid-column-start: 7;
  grid-column-end: 9; */
  grid-row-start: 1;
  grid-row-end: 2;
}
/* -- END FOOTER -- */

@media print {
  @page {
    size: auto;
    /* margin: 2.2cm; */
    margin: 0;
  }

  @page :first {
    margin-top: -1.6cm !important;
  }

  /* @page :footer {
    display: none;
  }

  @page :header {
    display: none;
  } */

  /* @page {
    margin-top: 0;
    margin-bottom: 0;
  } */
  /* body {
    padding-top: 72px;
    padding-bottom: 72px;
  } */

  html,
  body {
    /* height: 100vh; */
    /* margin: 1cm !important; */
    padding: 0 !important;
    overflow: hidden;
  }

  body {
    -webkit-print-color-adjust: exact; /*Chrome, Safari */
    color-adjust: exact; /*Firefox*/
  }

  .body-main {
    position: relative !important;
  }

  body * {
    visibility: hidden;
  }
  #print-label,
  #print-label * {
    visibility: visible;
  }
  #print-label {
    /* position: absolute; */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .break-page {
    page-break-inside: avoid;
    page-break-before: avoid;
    page-break-after: always;
  }
}
</style>
  