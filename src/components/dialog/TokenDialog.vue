<template>
  <div>
    <v-dialog
      v-model="dialogDetail"
      persistent
      max-width="400"
      style="border-radius:14px;"
      id="dialogCinfrim"
    >
    <v-card style="border-radius: 40px;padding: 0;">
        <v-card-text  style="border-radius:40px;padding: 0;" >
          <v-container 
           style="display: flex;
                height: 200px;
                align-items: center;
                border-radius: 40px 40px 0 0;
                background-color: rgb(236, 241, 255);
                justify-content: center;
                font-size:24px;
                font-weight: bold;
                font-family: 'Bai Jamjuree', sans-serif 
                ">
                <div class="my-layout">
                <div>Session was expired</div>
                <div style="color: #000000;font-size: 16px;display: flex;justify-content: center;">
                  กรุณาเข้าสู่ระบบใหม่
                </div>
                </div>
                
          </v-container>
        </v-card-text>
        <v-card-actions 
              style="font-family: 'Bai Jamjuree', sans-serif ; display: flex;
              justify-content: center;">
              <button 
              @click="logout()"
              style="width: 84px;
                    margin:10px 0 0 0;
                    height: 35px;
                    background: #000000;
                    border-radius: 8px;
                    color:#fff;
                    "
              > 
                 ตกลง 
              </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'token-dialog',
  props: {
  },
  data () {
    return {
      windowSize: 1366,
      dialogDetail:true,
    }
  },
  computed: {
   
  },
  watch: {},
  methods: {
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        this.value = 'Yes'
        this.$router.push('/')
      })
    },
  }
}
</script>
<style>
  
    .v-dialog > .v-card > .v-card__text {
    padding:0;
}
</style>
