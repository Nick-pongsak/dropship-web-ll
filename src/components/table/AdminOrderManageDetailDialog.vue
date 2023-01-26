<template>
  <div v-resize="onResize" id="detail-dialog">
    <div
      class="d-dialog"
      :style="{
        padding: windowSize < 600 ? '0px 5px 10px 0px' : '25px 25px 15px 25px'
      }"
    >
      <div style="width:100%;display:flex">
        <div
          :style="{
            padding:
              windowSize < 600 ? '20px 10px 0px 10px' : '0px 0px 0px 5px',
            width: '70%'
          }"
        >
          <div class="btn-filter">Order Detail</div>
        </div>
        <div
          :style="{
            padding: windowSize < 600 ? '25px 2px 0px 0px' : '5px 5px 0px 0px',
            'text-align': 'end',
            width: '30%'
          }"
          @click="close()"
        >
          <v-icon
            v-text="'mdi-close'"
            style="color:#000000;cursor:pointer"
            size="24"
          ></v-icon>
        </div>
      </div>
      <div class="smaill-body">
        <div style="width:100%;padding:0px 20px">
          <!------------------>
          <div
            :style="{
              width: '100%',
              'padding-top': '6px',
              display: windowSize < 600 ? '' : 'flex'
            }"
          >
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex',
                'padding-bottom': windowSize < 600 ? '0px' : '0px',
                'padding-top': windowSize < 600 ? '8px' : '10px'
              }"
            >
              <div
                class="d-dialog-title desc"
                :style="{
                  width: windowSize < 600 ? '100%' : '30%',
                  'padding-bottom': windowSize < 600 ? '10px' : '13px'
                }"
              >
                <div class="d-dialog-title">หมายเลขคำสั่งซื้อ</div>
                <div class="d-dialog-value">{{ data.purchase_id }}</div>
              </div>
            </div>
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? '' : 'flex'
              }"
            >
              <div
                :style="{
                  width: '100%',
                  'padding-top': windowSize < 600 ? '0px' : '25px'
                }"
              >
                <!-- <div style="width:100%;display:flex">
                  <div
                    class="d-dialog-title desc"
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    ชื่อบริษัท
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    {{ data.sup_name }}
                  </div>
                </div> -->
                <div style="width:100%;display:flex;padding-top:7px">
                  <div
                    class="d-dialog-title desc"
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    ชื่อผู้ผลิต
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    {{ data.sup_name }} {{ data.sup_surname }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!------------------>
          <div
            :style="{
              width: '100%',
              display: windowSize < 600 ? '' : 'flex'
            }"
          >
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex',
                'padding-bottom': windowSize < 600 ? '0px' : '0px'
              }"
            >
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '40%' : '30%',
                  'padding-bottom': windowSize < 600 ? '10px' : '0px'
                }"
              >
                ชื่อบริษัทผู้ขาย
              </div>
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '60%' : '70%',
                  'padding-bottom': windowSize < 600 ? '0px' : '0px',
                  'padding-right': windowSize < 600 ? '10px' : '0px'
                }"
              >
                {{ data.sup_company }}
              </div>
            </div>
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex'
              }"
            >
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '40%' : '30%',
                  'padding-bottom': windowSize < 600 ? '0px' : '0px'
                }"
              >
                วันที่สั่งซื้อ
              </div>
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '60%' : '70%'
                }"
              >
                {{ formatDate(data.order_date) }}
              </div>
            </div>
          </div>
          <!------------------>
          <div
            :style="{
              width: '100%',
              display: windowSize < 600 ? '' : 'flex'
            }"
          >
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex',
                'padding-bottom': windowSize < 600 ? '0px' : '0px',
                'padding-top': '6px'
              }"
            >
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '40%' : '30%',
                  'padding-bottom': windowSize < 600 ? '10px' : '0px'
                }"
              >
                ชื่อลูกค้า
              </div>
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '60%' : '70%',
                  'padding-bottom': windowSize < 600 ? '0px' : '0px',
                  'padding-right': windowSize < 600 ? '10px' : '0px'
                }"
              >
                {{ data.cus_name }} {{ data.cus_surname }}
              </div>
            </div>
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex'
              }"
            >
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '40%' : '30%',
                  'padding-bottom': windowSize < 600 ? '0px' : '0px',
                  'padding-top': '6px'
                }"
              >
                วันที่จัดส่ง
              </div>
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '60%' : '70%',
                  'padding-top': '6px'
                }"
              >
                {{ formatDate(data.order_delivery_date) }}
              </div>
            </div>
          </div>
          <!------------------>
          <div
            :style="{
              width: '100%',
              'padding-top': '6px',
              display: windowSize < 600 ? '' : 'flex'
            }"
          >
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex',
                'padding-bottom': windowSize < 600 ? '0px' : '0px'
              }"
            >
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '40%' : '30%',
                  'padding-bottom': windowSize < 600 ? '0px' : '0px'
                }"
              >
                ที่อยู่
              </div>
              <div
                :class="'d-dialog-title'"
                :style="{
                  width: windowSize < 600 ? '60%' : '70%',
                  'padding-bottom': windowSize < 600 ? '5px' : '0px'
                }"
              >
                {{ data.cus_address }}
              </div>
            </div>
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? '' : 'flex'
              }"
            >
              <div style="width:100%">
                <div style="width:100%;display:flex">
                  <div
                    :class="
                      windowSize < 800
                        ? 'd-dialog-title'
                        : 'd-dialog-title desc'
                    "
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    วันที่ส่งสำเร็จ
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    {{ formatDate(data.order_success_date) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!------------------>
          <div
            :style="{
              width: '100%',
              'padding-top': '6px',
              display: windowSize < 600 ? '' : 'flex'
            }"
          >
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? 'flex' : 'flex',
                'padding-bottom': windowSize < 600 ? '0px' : '0px'
              }"
            >
              <div
                class="d-dialog-title desc"
                :style="{
                  width: windowSize < 600 ? '40%' : '30%',
                  'padding-bottom': windowSize < 600 ? '10px' : '0px'
                }"
              >
                เบอร์โทรศัพท์หห
              </div>
              <div
                class="d-dialog-title"
                :style="{
                  width: windowSize < 600 ? '60%' : '70%',
                  'padding-bottom': windowSize < 600 ? '5px' : '0px'
                }"
              >
                {{ data.cus_phone }}
              </div>
            </div>
            <div
              :style="{
                width: windowSize < 600 ? '100%' : '50%',
                display: windowSize < 600 ? '' : 'flex'
              }"
            >
              <div style="width:100%">
                <div style="width:100%;display:flex">
                  <div
                    class="d-dialog-title desc"
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    สถานะ
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    {{ data.order_status }}
                  </div>
                </div>
                <div style="width:100%;display:flex;padding-top:7px">
                  <div
                    class="d-dialog-title desc"
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    หมายเหตุ
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    <span v-if="data.order_remarks == ''"> </span>
                    <span v-else>
                      {{ data.order_remarks }}
                    </span>
                  </div>
                </div>
                <div style="width:100%;display:flex;padding-top:7px">
                  <div
                    :class="
                      windowSize < 800
                        ? 'd-dialog-title'
                        : 'd-dialog-title desc'
                    "
                    :style="{
                      width: windowSize < 600 ? '40%' : '30%',
                      'padding-bottom': windowSize < 600 ? '0px' : '0px'
                    }"
                  >
                    จะต้องจัด ส่งภายใน
                  </div>
                  <div
                    class="d-dialog-title"
                    :style="{
                      width: windowSize < 600 ? '60%' : '70%'
                    }"
                  >
                    <span>{{ formatDate(data.order_delivery_due_date) }}</span>
                    <!-- <span> {{ formatDate(data.order_delivery_due_date) }}</span> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!------------------>
          <div
            class="d-table"
            :style="{
              'padding-top': windowSize < 600 ? '10px' : '15px'
            }"
          >
            <div class="d-head" v-if="windowSize >= 600">
              <div style="width:3%;text-align:center">{{ headColum[0] }}</div>
              <div style="width:10%;padding-left:20px">{{ headColum[1] }}</div>
              <div style="width:47%;padding-left:10px;">
                {{ headColum[2] }}
              </div>
              <div style="width:10%;text-align:center;padding-left:5px;">
                {{ headColum[3] }}
              </div>
              <div style="width:30%;padding-left:17px">{{ headColum[4] }}</div>
            </div>
            <div class="d-body">
              <div
                class="d-body-row"
                v-for="(row, index) in data.items"
                :key="index + row.index"
                :style="{
                  'border-radius': renderBorder(index),
                  'border-top':
                    index == 0 ? '0.7px solid rgba(0, 0, 0, 0.2)' : '',
                  display: windowSize < 600 ? 'block' : 'flex',
                  padding: windowSize < 600 ? '0px 10px 0px 0px' : '8px 20px'
                }"
              >
                <div
                  :style="{
                    width: windowSize < 600 ? '100%' : '3%',
                    'text-align': windowSize < 600 ? 'left' : 'center'
                  }"
                >
                  <div style="width:100%;display:flex">
                    <div class="small-row-title" v-if="windowSize < 600">
                      {{ headColum[0] }}
                    </div>
                    <div
                      class="small-row-value"
                      :style="{ width: windowSize < 600 ? '60%' : '100%' }"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>
                </div>
                <div
                  :style="{
                    width: windowSize < 600 ? '100%' : '10%',
                    'padding-left': windowSize < 600 ? '0px' : '10px'
                  }"
                >
                  <div style="width:100%;display:flex">
                    <div class="small-row-title" v-if="windowSize < 600">
                      {{ headColum[1] }}
                    </div>
                    <div
                      class="small-row-value"
                      :style="{ width: windowSize < 600 ? '60%' : '100%' }"
                    >
                      {{ row.product_sku }}
                    </div>
                  </div>
                </div>
                <div
                  :style="{
                    width: windowSize < 600 ? '100%' : '47%',
                    'padding-right': windowSize < 600 ? '0px' : '10px'
                  }"
                >
                  <div style="width:100%;display:flex">
                    <div class="small-row-title" v-if="windowSize < 600">
                      {{ headColum[2] }}
                    </div>
                    <div
                      class="small-row-value"
                      :style="{ width: windowSize < 600 ? '60%' : '100%' }"
                    >
                      {{ row.product_name }}
                    </div>
                  </div>
                </div>
                <div
                  :style="{
                    width: windowSize < 600 ? '100%' : '10%'
                  }"
                >
                  <div style="width:100%;display:flex">
                    <div class="small-row-title" v-if="windowSize < 600">
                      {{ headColum[3] }}
                    </div>
                    <div
                      class="small-row-value"
                      :style="{
                        'text-align': windowSize < 600 ? 'left' : 'center',
                        width: windowSize < 600 ? '60%' : '100%'
                      }"
                    >
                      {{ currency(row.order_qty) }}
                    </div>
                  </div>
                </div>
                <div
                  :style="{
                    width: windowSize < 600 ? '100%' : '30%',
                    'padding-right': windowSize < 600 ? '0px' : '10px',
                    'padding-left': windowSize < 600 ? '' : '10px'
                  }"
                >
                  <div style="width:100%;display:flex;">
                    <div class="small-row-title" v-if="windowSize < 600">
                      {{ headColum[4] }}
                    </div>
                    <div
                      class="small-row-value"
                      :style="{ width: windowSize < 600 ? '60%' : '100%' }"
                    >
                      {{ row.order_detail_remark }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-dialog-action">
        <div
          @click="printIcon()"
          style="padding-right:25px;padding-top:8px"
          v-if="data.order_status == 'Delivery'"
        >
          <v-icon
            v-text="'mdi-printer'"
            style="color:#000000;cursor:pointer"
            size="20"
          ></v-icon>
        </div>


        <div
         @click="ResendEmail"
          style="padding-right:10px;"
          v-if="data.order_status == 'Delivering' || data.order_status == 'Complete'"
        >
          <v-btn style="box-shadow: none; background-color: #fff; border: 1px solid #000000;width: 135px;"> Resend Email </v-btn>
  
        </div>


        <v-btn rounded @click="accept()" class="ok" v-if="renderBtn() !== ''">{{
          renderBtn()
        }}</v-btn>
      </div>
    </div>

    <v-dialog
      persistent
      v-model="confirmDialog"
      max-width="500"
      :width="data.status_order_code == 'delivering' ? 600 : 500"
    >
      <v-card>
        <div class="d-dialog">
          <div class="bg-confirm">
            <div style="text-align:center">
              <img
                v-if="confirmPrint"
                class="img"
                src="@/assets/images/other.png"
              />
              <img v-else class="img" src="@/assets/images/confrim.png" />
            </div>
            <div style="font-family: 'Bai Jamjuree', sans-serif; padding:0px 20px">{{ confirmText  }}</div>
          </div>
          <div class="bg-confirm-action">
            <div
              class="bg-confirm-action-action"
              :style="{
                display: windowSize < 600 ? 'grid' : 'flex'
              }"
              v-if="data.order_status == 'Delivering'"
            >
              <div
                style="display:flex;margin-right:25px"
                @click="ratio('customer')"
              >
                <div
                  :class="radio == 'customer' ? 'd-ratio selected' : 'd-ratio'"
                ></div>
                <div class="d-v-label">พัสดุการนำจ่ายถึงลูกค้า</div>
              </div>
              <div style="display:flex" @click="ratio('supply')">
                <div
                  :class="radio == 'supply' ? 'd-ratio selected' : 'd-ratio'"
                ></div>
                <div class="d-v-label">พัสดุส่งกลับผู้ขาย</div>
              </div>
            </div>
            <div>
              <v-btn
                rounded
                @click="submit()"
                class="ok"
                style="margin-right:45px"
                >{{ confirmBtn }}</v-btn
              >
              <v-btn rounded @click="cancel()" class="clear">ไม่</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
    persistent
      v-model="confirmDialog_print"
      max-width="500"
      :width="data.order_status == 'Delivering' ? 600 : 500"
    >
      <v-card>
        <div class="d-dialog">
          <div class="bg-confirm">
            <div style="text-align:center">
              <img class="img" src="@/assets/images/other.png" />
            </div>
            <div style="padding:0px 20px">{{ confirmText_print }}</div>
          </div>
          <div class="bg-confirm-action">
            <div>
              <v-btn
                rounded
                @click="submit_print(data)"
                class="ok"
                style="color:#fff;margin-right:45px"
              >
                ใช่
              </v-btn>
              <v-btn rounded @click="confirmDialog_print = false" class="clear"
                >ไม่</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog> 

    
    <v-dialog persistent v-model="confirmResend" max-width="454" width="454">
      <v-card>
        <div class="d-dialog">
          <div class="bg-confirm">
            <div style="text-align:center">
              <img class="img" src="@/assets/images/mail_resend.png" />
            </div>
            <div style="font-family: 'Bai Jamjuree', sans-serif; padding:0px 10px">
              คุณต้องการ
              <span style="font-weight: bold;">ส่งอีเมลอีกครั้ง</span
              >ใช่หรือไม่ 
            </div>
          </div>
          <div class="bg-confirm-action">
            <div>
              <v-btn
                rounded
                @click="submitSendmail()"
                class="ok"
                style="margin-right:45px"
                >ใช่</v-btn
              >
              <v-btn rounded @click="closeDialog" class="clear"
                >ไม่</v-btn
              >
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      persistent
      v-model="DialogShipping"
      max-width="500"
      :width="data.order_status == 'Delivering' ? 600 : 500"
    >
      <v-card>
        <div class="d-dialog">
          <div class="bg-confirm">
            <div style="padding:20px 0 0 0;font-size:20px;font-family: 'Bai Jamjuree', sans-serif;text-align:center">
              รายละเอียดพัสดุสินค้า 
            </div>
            <div style="width:100%">
            <div class="" style="font-family: 'Bai Jamjuree', sans-serif;width:67%;padding:20px 0 10px 0">บริษัทขนส่ง <span style="color:red">*</span></div>
            <div  style="display: flex;justify-content: center;">
              <!-- <v-data-table no-data-text="My no data message"></v-data-table> -->
              <v-select
                no-data-text="ไม่พบข้อมูลบริษัทขนส่ง"
                v-on:change="select_shipping()"
                v-bind:class="[Error.errorShipping]"
                label="- กรุณาเลือกบริษัทขนส่ง  -"
                style="font-family: 'Bai Jamjuree', sans-serif;max-width: 50%;"
                solo
                dense
                v-model="shipping_select"
                :items="dataShipping"
                :item-text="item => item.shipping_name"
                :item-value="item => item"
              >
              </v-select>
             
            </div>
            <div
              style="color:#DA0707; font-family: 'Bai Jamjuree', sans-serif;font-size:14px; width: 77%"
                v-if="this.Error.errorShipping != ''"
                class="txt-wrong"
              >
                
                {{ this.Error.errorShipping_txt }}
              </div>
            <div style="font-family: 'Bai Jamjuree', sans-serif;width: 62%;padding:20px 0 10px 0">
             เลขพัสดุ 
            </div>

                 
        <div v-if="loadding_shipping"  style="padding:0 0 0 40%; z-index:1;position: absolute;">
        <v-progress-circular
          :size="100"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>

            <div  style=" display: flex;justify-content: center;">
              
              <v-text-field v-model="shipping_number" style="font-family: 'Bai Jamjuree', sans-serif;max-width: 50%;" solo dense >
                <v-icon
                @click="clear_shipping_number" 
                v-if="shipping_number.length != 0"
                  slot="append"
                  size="18"
                >
                  mdi-close
                </v-icon>
              </v-text-field>
            </div>

            <div style="font-family: 'Bai Jamjuree', sans-serif;width: 80%;padding:20px 0 10px 0">
            เอกสารใบ invoice
            <span style="color:red">*</span>
            </div>
            <div   style="height: 30px; display: flex;justify-content: center;">
              <div  
              :style="{'border': file_error ? '1px solid red' : '1px solid #D9D9D9'}"  
               style=" font-family: 'Bai Jamjuree', sans-serif;align-items: center;display: flex;justify-content: center;border-radius: 8px;background-color: #ffff;width: 50%;"> 
             
              <div  style="width: 85%;"> 
                <div clas="file_input_wrap">
                  <input type="file" accept=".zip,.pdf, .jpg, .jpeg, .png, .rar, .7z" @change="previewImage" name="imageUpload" id="imageUpload" class="hide" />
                  <label style="white-space: nowrap; width: 100%; overflow: hidden;text-overflow: ellipsis; font-size:14px" for="imageUpload" class="btn btn-large"> 
                    <span v-if=" image == null" class="mdi-rotate-315 mdi mdi-attachment"></span>{{ image == null ? 'เพิ่มไฟล์' : image.name   }} 
                  </label>
                </div>
              </div>
                <v-icon
                @click="clear_image"
                v-if=" image != null"
                style="cursor: pointer;"
                  slot="append"
                  size="18"
                >
                  mdi-close
                </v-icon>
              </div>
            </div>

            <div  style=" display: flex;justify-content: center;">
              <div
                v-if="file_error"
                style="text-align: start;color:#DA0707; font-family: 'Bai Jamjuree', sans-serif;font-size:10px; width: 50%"
                class="txt-wrong">

                {{ this.Error.errorImg_txt }} 
                <!-- {{ this.$t('txt-wrong21') }} -->
              </div>
            </div>
          
            </div>

          
          </div>
          <div style="padding:20px 0 20px 0" class="bg-confirm-action">
            <div>
              <div style="font-family: 'Bai Jamjuree', sans-serif;font-size:16px;padding:0 0 20px 0">คุณต้องการยืนยันรายการเป็นสถานะ <span style="font-weight: bold;">Delivering</span> ใช่หรือไม่ ? </div>
              <v-btn
              @click="shipping_btn('save')" 
                rounded
                class="ok"
                style="margin-right:45px"
                >ใช่</v-btn
              >
              <v-btn rounded @click="shipping_btn('close')" class="clear">ไม่</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="dialog_success"
        persistent
        max-width="350"
        id="dialogCinfrim"
      >
        <v-card style="border-radius:14px">
          <v-card-title style="background-color:#ECF1FF;" class="text-h5 ">
            <div style="width: 100%;">
               <div style="text-align: center;margin-bottom:20px">
                <img
                  class="img"
                  src="@/assets/images/success.png"
                  style="height:120px"
                />
              </div>
              <div
                style="font-family: 'Bai Jamjuree';text-align: center;font-size:16px"
              >
              ส่งอีเมลสำเร็จ
              </div>
            </div>
          </v-card-title>
          <div style="padding:15px 0px;text-align:center">
            <v-btn
              rounded
              @click="close_s()"
              class="ok"
              :style="{ 'margin-left': '20px' }"
              >ตกลง</v-btn
            >
            <!-- @click="close_success" -->
          </div>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialog_send_mail"
        persistent
        max-width="350"
        id="dialogCinfrim"
      >
        <v-card style="border-radius:14px">
          <v-card-title style="background-color:#ECF1FF;" class="text-h5 ">
            <div style="width: 100%;">
               <div style="text-align: center;margin-bottom:20px">
                <img
                  class="img"
                  src="@/assets/images/success.png"
                  style="height:120px"
                />
              </div>
              <div
                style="font-family: 'Bai Jamjuree';text-align: center;font-size:16px" 
              >
              ส่งอีเมลสำเร็จ
              </div>
            </div>
          </v-card-title>
          <div style="padding:15px 0px;text-align:center">
            <v-btn
              rounded
              @click="dialog_send_mail = false"
              class="ok"
              :style="{ 'margin-left': '20px' }"
              >ตกลง</v-btn
            >
            <!-- @click="close_success" -->
          </div>
        </v-card>
      </v-dialog>

  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'admin-order-manage-detail-dialog',
  props: {
    dialog_success:Boolean,
    data: Object,
    dataShipping:Array,
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      shipping_select:'',
      DialogShipping:false,
      shipping_number:'',
      confirmResend:false,
       
      Error:{
        errorShipping: '',
        errorShipping_txt: '',
        errorImg_txt:'',
        errorImg:''
      },


      windowSize: 1366,
      confirmText: '',
      confirmDialog_print: false,
      confirmText_print: '',
      confirmBtn: '',
      confirmDialog: false,
      confirmPrint: false,

      mapObj : [],
      page_first:12,
      page_ohter:19,

      radio: 'customer',
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
        'ม.ค.',
        'ก.พ.',
        'มี.ค.',
        'เม.ย.',
        'พ.ค.',
        'มิ.ย.',
        'ก.ค.',
        'ส.ค.',
        'ก.ย.',
        'ต.ค.',
        'พ.ย.',
        'ธ.ค.'
      ],
      headColum: ['#', 'SKU', 'รายการสินค้า', 'จำนวน', 'หมายเหตุ'],
      preview: null,
			image: null,
      file_error:false,
      loadding_shipping:false,
      dialog_send_mail:false
    }
  },
  computed: {
    dialog: {
      get () {
        return this.show
      },
      set (value) {
        this.close()
      }
    }
  },
  watch: {},
  methods: {
    clear_shipping_number(){
      this.shipping_number = ''
    },

    previewImage: function(event) {
      		var input = event.target;
          console.log(input)
      		if (input.files) {
      		  var reader = new FileReader();
      		  reader.onload = (e) => {
      		    this.preview = e.target.result;
				      console.log(e)
      		  }
      		  this.image=input.files[0];
      		  reader.readAsDataURL(input.files[0]);
            // this.typeFile = input.files[0].type
      		}
          // console.log(input.files[0].type)
    	},

      reset: function() {
        let id = document.getElementById('imageUpload')
        // console.log(id)
          if (id !== null) {
            document.getElementById('imageUpload').value  = ''
          }
        this.file_error = false
    	  this.image = null;
    	  this.preview = null;
    	},
      clear_image(){
      this.reset()
    },
    // v-list-item__title
    select_shipping(){
      this.Error.errorShipping = ''
      this.Error.errorShipping_txt = ''
    },

    shipping_btn(param){
      if(param == 'save'){
          var check1 = false
          var check2 = false

        if(this.image){
          // console.log(this.image.size/1024)
          if(this.image.size/1024 > 2000){
            check1 = false
            this.Error.errorImg = 'error-case'
            this.Error.errorImg_txt = this.$t('txt-wrong21')
            this.file_error = true
          }else {
            check1 = true
            this.file_error = false
            
          }
          }else {
            this.Error.errorImg = 'error-case'
            this.Error.errorImg_txt = this.$t('txt-wrong21')
            check1 = false
            this.file_error = true
          }
        if(this.shipping_select != ''){
          check2 = true
         
        }else {
          check2 = false
          this.Error.errorShipping = 'error-case'
          this.Error.errorShipping_txt = this.$t('txt-wrong19')
        }

        if(check1 && check2){
        this.submit()
        }
     
      }else {
       this.shipping_select= ''
       this.shipping_number= ''
       this.DialogShipping = false
      }
    },
    currency (qty) {
      return window.currency(qty)
    },
    ratio (val) {
      this.radio = val
    },
    renderBtn () {
      if (this.data.order_status == 'New') {
        return 'Accept'
      } else if (this.data.order_status == 'Accept') {
        return 'Delivery'
      } else if (this.data.order_status == 'Delivery') {
        return 'Delivering'
      } else if (this.data.order_status == 'Delivering') {
        return 'Complete'
      } else {
        return ''
      }
    },
    renderBorder (index) {
      if (index == 0) {
        return '8px 8px 0px 0px'
      } else if (index == this.data.items.length - 1) {
        return '0px 0px 8px 8px'
      } else {
        return '0px'
      }
    },
    formatDate (val) {
      if (val != null) {
        let today = new Date(val)
        const year = today.getFullYear()
        const fullYear = year
        // const fullYear = year + 543
        const days = today.getDate()
        const monthName = this.monthsShort[today.getMonth()]
        return days + ' ' + monthName + ' ' + fullYear
      } else {
        return val
      }
    },
    close () {
      this.$emit('close', {})
    },
    close_s(){
       this.$emit('close_s', {})
    },

    maps(po , param , head){ 
      const clone = structuredClone(head);
      Object.assign(clone , {page_: po+1});
      if(po == 0){
        const slicedArray = param.slice(0, this.page_first);
          // this.mapObj.set(head ,slicedArray) 
          clone.items = slicedArray
          // console.log('A' ,clone)
          this.mapObj.push(clone)
      }else {
          clone.items = param
          // console.log('B' , clone)
          this.mapObj.push(clone)
      }
    },
    fromData(data){
      let count_po = ''
      let count_item = data.items.length
      if(count_item <= this.page_first){
           count_po = 1
      }else if( (count_item - this.page_first ) <= this.page_ohter ) {
           count_po = 2
      }else {
          var sum = (count_item - this.page_first) / this.page_ohter 
          sum =  Math.floor(sum) + 1
          //console.log((count_item - 10) % 15 ,'sum1 =>' , Math.floor(sum)+1)
          if((count_item - this.page_first) % this.page_ohter != 0){
           sum =  Math.floor(sum) + 1
          }
          count_po = sum
      }
      Object.assign(data , {page_count: count_po});
        if(count_po > 1){
        this.maps(0, data.items, data)
        var a =  data.items.slice(this.page_first)
          , chunk
          var po = 0
        while (a.length > 0) {
            chunk = a.splice(0,this.page_ohter)
            po++
            this.maps(po,chunk, data)
        }
        }else {
            this.maps(0,data.items, data)
        }
        this.confirmDisable = true
    },


    submit_print (param) {
      Vue.localStorage.set('PRINT_LABEL', JSON.stringify(this.mapObj))
      setTimeout(() => {
        window.open('/#/PrintLabel')
      }, 1000)
      this.confirmDialog_print = false
    },
    accept () {
      this.confirmPrint = false
      if (this.data.order_status == 'New') {
        this.confirmText = 'คุณต้องการยืนยันรายการเป็นสถานะ Accept ใช่หรือไม่ ?'
      } else if (this.data.order_status == 'Accept') {
        this.confirmText =
          'คุณต้องการยืนยันรายการเป็นสถานะ Delivery ใช่หรือไม่ ?'
      } else if (this.data.order_status == 'Delivery') {
        this.confirmText =
          'คุณต้องการยืนยันรายการเป็นสถานะ Delivering ใช่หรือไม่ ?'
      } else if (this.data.order_status == 'Delivering') {
        this.confirmText = 'การจัดส่งพัสดุสำเร็จ'
      } else {
        this.confirmText = ''
      }

      this.confirmBtn = 'ใช่'
      if(this.data.order_status != 'Delivery'){
        this.confirmDialog = true
      }else {
        this.DialogShipping = true
      }
    },
    submitSendmail(){
      this.confirmResend = false
      let arr = []
      arr.push(this.data.purchase_id)
      

      this.$store
                .dispatch('resendMail', arr)
                .then(res => {
                  this.dialog_s = true
                  this.dialog_send_mail = true
                  // this.fetch()
                })
                .catch(error => {})


    },
   
    submit () {
      let process = ''
      if (this.data.order_status.toLowerCase() == 'new') {
        process = 'Accept'
      } else if (this.data.order_status.toLowerCase() == 'accept') {
        process = 'Delivery'
      } else if (
        this.data.order_status.toLowerCase() == 'delivery' &&
        !this.confirmPrint
      ) {
        process = 'Delivering'
      } else if (
        this.data.order_status.toLowerCase() == 'delivery' &&
        this.confirmPrint
      ) {
        process = 'print'
      } else if (
        this.data.order_status.toLowerCase() == 'delivering' &&
        this.radio !== null
        
      ) {
        process = 'Complete'
      } else {
        process = ''
      }
      if (process != '') { 
       
      

        if(process == 'Delivering'){
          this.loadding_shipping = true
          // console.log(this.data)
          let detail_remark = ''
        if (this.data.radio == 'customer') {
          detail_remark = 'พัสดุการนำจ่ายถึงลูกค้า'
        } else if (this.data.radio == 'supply') {
          detail_remark = 'พัสดุส่งกลับผู้ขาย'
        }
          
          let obj = {
          // event: process,
          order_delivery_date: this.data.order_delivery_date,
          order_success_date:this.data.order_success_date,
          purchase_id: this.data.purchase_id,
          order_status: process,
          order_remarks: detail_remark,
          shipping_code :this.shipping_select.shipping_code == undefined ? '' : this.shipping_select.shipping_code,
          tracking_code :this.shipping_number,
          shipping_track_link:this.shipping_select.shipping_track_link == undefined ? '' : this.shipping_select.shipping_track_link,
          image:this.image
        }


          this.$store
          .dispatch('sendOrderStatus', obj)
          .then(res => {
            this.confirmDialog = false
            this.data.order_status = process
            let perc_id = []
            perc_id.push(obj.purchase_id)
            this.$store
              .dispatch('getOrderDetail', JSON.stringify(perc_id))
              .then(res => {
                this.data.order_delivery_date = res.success.data[0].order_delivery_date
                this.data.order_success_date = res.success.data[0].order_success_date
                this.data.order_remarks = res.success.data[0].order_remarks

              if(this.image != null){
                 setTimeout(() => {
                   var res = {
                         image:this.image,
                         detail:obj.purchase_id
                       }
                         this.$store
                           .dispatch('Up', res)
                           .then(res => {
                            this.loadding_shipping = false
                             this.DialogShipping = false
                             this.shipping_select= ''
                             this.shipping_number= ''
                             this.reset()
                             //
                           })
                           .catch(error => {
                           })
                     }, 2000);
                 }
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
              this.tokenExpired = true
              console.log('Error 401')
            }

            if (error.response.status == 400) {
              this.file_error = true
              this.loadding_shipping = false
              this.Error.errorImg = 'error-case'
              this.Error.errorImg_txt = this.$t('txt-wrong24')
                   
            }
          })
            console.log('Deli ... ' , obj)
        }else {
          let obj = {
          event: process,
          detail: this.radio,
          shipping_code :this.shipping_select.shipping_code == undefined ? '' : this.shipping_select.shipping_code,
          tracking_code :this.shipping_number,
          shipping_track_link:this.shipping_select.shipping_track_link == undefined ? '' : this.shipping_select.shipping_track_link,
          image:this.image
        }
          this.DialogShipping = false
           this.shipping_select= ''
           this.shipping_number= ''

          this.$emit('submit', obj) 
          this.confirmDialog = false
        }
      }
    },
    printIcon () {
      this.mapObj = []
      this.fromData(this.data)
      this.confirmText_print = 'คุณต้องการพิมพ์ใบปะหน้าใช่หรือไม่'
      this.confirmDialog_print = true
    },
    closeDialog(){
      this.confirmResend = false
    },
    print () {
      this.confirmPrint = false
      this.confirmDialog = false
      this.$emit('print', {})
    },
    ResendEmail(){
      this.confirmResend = true
      console.log(this.data)
    },
    cancel () {
      this.confirmText = ''
      this.confirmBtn = ''
      this.confirmDialog = false
      this.confirmPrint = false
    },
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      this.windowSize = x
      this.deviceType = window.deviceType()
    }
  }
}
</script>
<style></style>
