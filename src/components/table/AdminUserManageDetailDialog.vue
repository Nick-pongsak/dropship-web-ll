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
          <div class="btn-filter">XXXXXXXXXXXX</div>
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
    </div>

    <v-dialog v-model="confirmDialog" max-width="500" :width="500">
      <v-card>
        <div class="d-dialog"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'admin-user-manage-detail-dialog',
  props: {
    data: Object,
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      windowSize: 1366,
      confirmText: '',
      confirmBtn: '',
      confirmDialog: false
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
    close () {
      this.$emit('close', {})
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
