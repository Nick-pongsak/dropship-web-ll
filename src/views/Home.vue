<template>
  <div id="home-page">
    <order-filter @apply="ApplyFilter"></order-filter>
    <!-- <detail-table></detail-table> -->
  </div>
</template>

<script>
import Vue from 'vue'
import OrderFilter from '@/components/filter/OrderFilter'
import detailTable from '@/components/table/Detail'
export default {
  name: 'homepage',
  data () {
    return {}
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
    }
  },
  created () {
    if (Vue.localStorage.get('login') == null) {
      this.$router.replace('/')
    } else {
    }
  },
  components: { 'order-filter': OrderFilter, 'detail-table': detailTable },
  mounted () {}
}
</script>
<style></style>
