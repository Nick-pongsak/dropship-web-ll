<template>
  
    <div id="printMe" style="margin:100px;" >

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&family=Open+Sans:wght@500&display=swap" rel="stylesheet">

       
        <div 
        class="full-height"
        style="height: 100%;"
        v-for="(row, index) in PoDetail"
        :key="'card-' + index" 
        >
          <div style="font-family: 'Noto Sans Thai', sans-serif;font-size: 24px;"><img class="logo" src="@/assets/icons/logo.png">    Dropship portal   </div>
          <div style="font-family: 'Noto Sans Thai', sans-serif;width: 100%;padding:10px 0 0 0;font-size: 24px;">เลขที่ใบสั่งซื้อ : {{row.purchase_id}}  </div>
            
             <div style="padding:0 10px 0 10px;display: flex;justify-content: center;width: 100%;">
              <div style="
              color:#000;
              font-size:18px;
              font-family: 'Noto Sans Thai', sans-serif;
                  margin:20px 0 0 0;
                  border:1px solid #000;
                  display: grid;
                  grid-auto-columns: 1fr;
                  grid-auto-rows: 1fr;
                  gap: 0px 0px;
                  grid-auto-flow: row;
                  max-width: 100%;padding:0;" class="container">
                  <div style="border-width:0 0 1px 0;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 1fr;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      'sender recipient';" class="i1">
                <div class="sender" 
                    style="display: flex;
                      justify-content: center;
                      align-items: center;border:1px solid #000 ;
                      border-width: 0px 1px 0px 0px; width: 100%;">
                     ผู้ส่ง
                  </div>
                    <div style="display: flex;
                        justify-content: center;
                        align-items: center;width: 100%;" class="">
                      ผู้รับ</div>
                   </div>


                  <div class="i2" style="
                      font-size:14px;
                      border:1px solid #000 ;
                      border-width: 1px 0px 0px 0px;
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      grid-template-rows: 1fr 1fr 1fr ;
                      gap: 0px 0px;
                      grid-auto-flow: row;">
                    <div style=" grid-area: 1 / 1 / 2 / 2; padding:0 0 0 10px;  border:1px solid #000 ;border-width: 0px 1px 0px 0px;" class="sup_name">ชื่อ : {{row.sup_name}} {{row.sup_surname}}</div>
                    <div style="grid-area: 1 / 2 / 2 / 3; padding:0 0 0 10px;" class="cus_name">ชื่อ : {{row.cus_name}} {{row.cus_surname}}</div>
                    <div style=" grid-area: 2 / 1 / 3 / 2; padding:0 0 0 10px;border:1px solid #000 ;border-width: 0px 1px 0px 0px;" class="sup_phone">เบอร์โทร : {{info_cus.user_phone}}</div>
                    <div style="grid-area: 2 / 2 / 3 / 3; padding:0 0 0 10px;" class="cus_phone">เบอร์โทร : {{row.cus_phone}}</div>
                    <div style="grid-area: 3 / 1 / 4 / 2; padding:0 0 0 10px; border:1px solid #000 ;border-width: 0px 1px 0px 0px;" class="sup_address">ที่อยู่ : {{info_cus.user_address}}</div>
                    <div style="grid-area: 3 / 2 / 4 / 3; padding:0 0 0 10px; " class="cus_address">ที่อยู่ : {{row.cus_address}}</div>
                  </div>

                  <div style="
                        grid-area: 3 / 1 / 4 / 2; 
                        border:1px solid #000;
                        border-width:1px 0 0 0;
                        display: flex;
                        align-items: center;
                        padding:0 0 0 10px;" class="comment">
                    หมายเหตุ :
                  </div>
                </div>
             </div>
            <div style="padding:20px 0 0 0;color:#000000;font-size: 18px;font-family: 'Noto Sans Thai', sans-serif;">รายการสินค้า</div> 
             <div style="font-family: 'Noto Sans Thai', sans-serif;color:#959595;font-size:12px;width:100%;margin:10px 0 0 30px;font-weight:bold;"> พิมพ์ใบปะหน้าพัสดุนี้และติดลงบนกล่องพัสดุ</div>
             <div style="color:#959595;font-size:12px;width:100%;margin:10px 0 0 30px;font-weight:bold;"> 
              <div style="  display: flex;" class="hr-droid">
                <div style="   
                    width: 5%;
                    position: relative;
                    margin: 5px;
                    border-top: 3px dotted #959595;margin:10px 0 0 0;" class="hr-line hr-droid"></div>
                <div > <img   src="@/assets/icons/Cut.png"> </div>
                <div style="border-top: 3px dotted #959595;margin:10px 0 0 0;width: 95%; " class="hr-line hr-droid"></div>
              </div>
              <!-- <img height="100px" width="100%"  src="@/assets/icons/cut.png"> -->
             </div>
        
             <div style="font-family: 'Noto Sans Thai', sans-serif;padding:0 10px 0 10px;display: flex;justify-content: center;width: 100%;">
              <div style="
              font-size:18px;
                  margin:20px 0 0 0;
                  border:1px solid #000;
                  display: grid;
                  grid-auto-columns: 1fr;
                  grid-auto-rows: 1fr;
                  gap: 0px 0px;
                  grid-auto-flow: row;
                  max-width: 100%;padding:0;" class="container">
                <div style="border-width:0 0 0 0;
                  display: grid;
                    grid-template-columns: 0.7fr 2fr  4fr 2fr;
                    grid-template-rows: 1fr;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      'sender recipient';" class="i1">
                <div class="sender" 
                    style="
                      display:flex;
                      justify-content: center;
                      align-items: center;border:1px solid #000 ;
                      border-width: 0px 0px 1px 0px; width: 100%;">
                     #
                  </div>
                    <div style="
                    border:1px solid #000 ;
                    padding:0 0 0 20px;
                      border-width: 0px 0px 1px 0px;
                        justify-content: center;
                        align-items: center;width: 100%;" class="">
                      SKU</div>
                      <div class="sender" 
                    style="padding:0 0 0 20px;
                      justify-content: center;
                      align-items: center;border:1px solid #000 ;
                      border-width: 0px 0px 1px 0px; width: 100%;">
                     รายการสินค้า
                  </div>
                    <div style="display: flex;
                        justify-content: center;
                        border:1px solid #000 ;
                        border-width: 0px 0px 1px 0px;
                        align-items: center;width: 100%;" class="">
                      จำนวนสินค้า</div>
                   </div>



                <div v-for="(row, index) in row.items"
                  :key="'card-' + index"  style="border-width:0 0 1px 0;
                  display: grid;
                    grid-template-columns:  0.7fr 2fr  4fr 2fr;
                    grid-template-rows: 2fr;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      'sender recipient';" class="i1">
                <div class="sender" 
                    style="
                      display:flex;
                      justify-content: center;
                      border:1px solid #000 ;
                      border-width: 0px 0px 0px 0px;
                       width: 100%;">
                  {{row.index +1}}
                  </div>
                    <div style="
                       border:1px solid #000 ;
                       padding:0 0 0 20px;
                       border-width: 0px 0px 0px 0px;
                        justify-content: center;
                        align-items: center;width: 100%;" class="">
                      {{row.product_sku}}
                      </div>
                      <div class="sender" 
                    style=" padding:0 0 0 20px;
                      justify-content: center;
                      align-items: center;border:1px solid #000 ;
                      border-width: 0px 0px 0px 0px; width: 100%;">
                      {{row.product_name}}
                  </div>
                    <div style="display: flex;
                        justify-content: center;
                        align-items: center;width: 100%;" class="">
                      
                        {{row.order_qty}}
                        </div>
                   </div>
                </div>
             </div>

             <div style="margin:50px 0 0 0;border-width:0 0 1px 0;
                  display: grid;
                    grid-template-columns:1fr 1fr 1fr 1fr 1fr;
                    grid-template-rows: 1fr;
                    gap: 0px 0px;
                    grid-auto-flow: row;
                    grid-template-areas:
                      'sender recipient';" class="i1">
                      <div style="1
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 100%;" class=""> </div>
                <div class="sender" 
                    style="
                      border:2px dotted #959595 ;
                      border-width: 0px 0px 2px 0px; 
                       display: flex;
                      justify-content: center;
                      align-items: center;
                      padding:40px
                      width: 100%;">
                      ลายเซ็นผู้ส่ง
                  </div>
                  <div style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 100%;" class=""> </div>
                    <div style="
                       border:2px dotted #959595 ;
                      border-width: 0px 0px 2px 0px; 
                       display: flex;
                      justify-content: center;
                      align-items: center;
                      padding:40px
                      width: 100%;" class="">
                      ลายเซ็นผู้รับ
                      </div>
                      <div style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 100%;" class=""> </div>
                  
                   </div>
          <div style="break-after:page"></div>
        </div>
        
    </div>
</template>
  <script>
  import Vue from "vue";
  export default {
    name: 'print-label',
    data () {
      return { output: null}
    },
    computed: {
        PoDetail () {
            return JSON.parse(Vue.localStorage.get('PRINT_LABEL'))
        },
        info_cus () {
            return JSON.parse(Vue.localStorage.get('user_profile'))
        },
    },
    watch: {},
    methods: {
    print () {
      this.$htmlToPaper('printMe');
      // Pass the element id here
    //   window.print();
    //    this.$htmlToPaper('printMe', {});
    }
    },
    components: {},
    created () {
        setTimeout(() => {
            this.$htmlToPaper('printMe');
        },100);
    },
    mounted () {}
  }
  </script>
  <style>
  </style>
  