<template>
  <div style="color:red" id="maincorp">
   <h1>Create Account</h1>
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
