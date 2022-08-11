<template>
  <div class="detail-table" v-resize="onResize">
    <div class="action-bar">
      <v-checkbox
        v-if="deviceType == 'desktop'"
        v-model="checkbox"
        value="red"
        hide-details
      ></v-checkbox>
      <div v-if="deviceType == 'desktop'" class="subtitle">Action</div>
      <div v-if="deviceType == 'desktop'" class="btn-filter">Print label</div>
      <v-btn v-if="deviceType == 'desktop'" rounded @click="submit()" class="ok"
        >Submit</v-btn
      >
      <div class="count-subtitle">
        พบ {{ data.length }} รายการ (เลือกแล้ว {{ count }} รายการ)
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-table',
  props: {
    // device: String
  },
  data () {
    return {
      windowSize: 1366,
      checkbox: false,
      count: 0,
      data: [],
      deviceType: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    submit () {},
    onResize () {
      let x = window.innerWidth
      let y = window.innerHeight
      this.windowSize = x
      this.deviceType = window.deviceType()
      // console.log(x)
    }
  }
}
</script>
<style></style>
