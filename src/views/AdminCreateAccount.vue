<template>
    <div id="user-profile-page" v-resize="onResize"  >
      <div class="box-1">
          <div style="background-color:red;width:75%" class="left">
    
       <!-- DIALOG 1 -->
        <!-- <v-dialog
            v-model="dialog"
            persistent
            max-width="454px">
            <v-card style="border-radius: 40px;padding: 0;">
              <v-card-text  style="border-radius: 40px;padding: 0;" >
                <v-container 
                style="display: flex;
                    border-radius: 40px 40px 0 0;
                      background-color: rgb(236, 241, 255);
                      justify-content: center;
                      font-family: 'Bai Jamjuree', sans-serif 
                      ">
                      <div class="my-layout">
                        <div><img  class="img" src="@/assets/images/lock.png"></div>
                        <div>คุณต้องการ<b>เปลี่ยนรหัสผ่าน</b>ใช่หรือไม่</div>
                      </div>
                      
                </v-container>
              </v-card-text>
              <v-card-actions 
                    style="font-family: 'Bai Jamjuree', sans-serif ; display: flex;
                    justify-content: center;">
                    <button   @click="confrim_dialog('OK')"
                        style="width: 84px;
                          height: 35px;
                          background: #000000;
                          border-radius: 8px;
                          color:#fff;"> ใช่ 
                    </button>
                    <button @click="confrim_dialog('cancel')"
                        style="
                          margin:0 0 0 20px;
                          width: 84px;
                          height: 35px;
                          background: #fff;
                          border-radius: 8px;
                          color:#000;
                          border:2px solid #000;"> ไม่ 
                    </button>
              </v-card-actions>
            </v-card>
        </v-dialog> -->

      <!-- DIALOG 2  -->
        <!-- <v-dialog
            v-model="dialog_save"
            persistent
            max-width="454px">
            <v-card style="border-radius: 40px;padding: 0;">
              <v-card-text  style="border-radius: 40px;padding: 0;" >
                <v-container 
                style="display: flex;
                    border-radius: 40px 40px 0 0;
                      background-color: rgb(236, 241, 255);
                      justify-content: center;
                      font-family: 'Bai Jamjuree', sans-serif ;
                      ">
                      <div   class="my-layout">
                        <div><img style="height:200px;width:200px" class="img" src="@/assets/images/success.png"></div>
                        <div style="color:#000;display: flex;justify-content: center;">แก้ไขข้อมูลส่วนตัวสำเร็จ</div>
                      </div>
                      
                </v-container>
              </v-card-text>
              <v-card-actions 
                    style="font-family: 'Bai Jamjuree', sans-serif ; display: flex;
                    justify-content: center;">
                    <button   @click="confrim_dialog('success')"
                        style="width: 84px;
                          height: 35px;
                          background: #000000;
                          border-radius: 8px;
                          color:#fff;"> ตกลง 
                    </button>
                  
              </v-card-actions>
            </v-card>
        </v-dialog> -->
   </div>
          <div class="right">
              <img  class="img" src="@/assets/images/profile-admin.png">
          </div>
      </div >
      <div class="box-2">
      
        
      </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: 'admin-create-acount',
  data () {
    return {}
  },
  computed: {
   
  },
  watch: {},
  methods: {},
  components: {},
  created () {
     if (Vue.localStorage.get("login") == null) {
      this.$router.replace("/");
    } else {


    }
  },
  mounted () {}
}
</script>
<style></style>
