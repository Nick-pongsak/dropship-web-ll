<template>
  <div id="home-page">
    <order-filter @apply="ApplyFilter"></order-filter>
    <div>TABLE</div>
  </div>
</template>

<script>
import Vue from 'vue'
import OrderFilter from '@/components/filter/OrderFilter'
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
  components: { 'order-filter': OrderFilter },
  mounted () {}
}
</script>
<style></style>
