<template>
  <div style="color:red" id="maincorp">
    Home - Page  
  </div>
</template>

<script>
import Vue from "vue";
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
