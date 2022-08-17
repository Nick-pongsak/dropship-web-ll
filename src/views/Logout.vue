<template>
  <div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: 'logout',
  data () {
    return {}
  },
  computed: {
   
  },
  watch: {},
  methods: {},
  components: {},
  created () {
      
         let reMove = [
          'login',
          'SIZE_SCREEN',
          'CLICK_PAGE_FORGOT',
          'user_profile',
          'loc_email_forgor',
          'TYPE_USER'

         ]
           reMove.forEach(function(element) {
          Vue.localStorage.remove(element);
        });
         this.$router.push('/')
  },
  mounted () {}
}
</script>
<style></style>
