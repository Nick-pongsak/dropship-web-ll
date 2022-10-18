<template>
  <div id="policy-page">
    <div class="body">
      <div
        class="sticky-top"
        :style="{
          'text-align': 'end',
          width: '100%',
          'padding-right': '30px',
          'padding-top': '30px'
        }"
        @click="close()"
      >
        <v-icon
          v-text="'mdi-close'"
          style="color:#000000;cursor:pointer"
          size="24"
        ></v-icon>
      </div>
      <div :style="{ width: '100%', 'text-align': 'center' }">
        <img class="img-login" src="@/assets/pdf/PDPA-1.png" />
        <img class="img-login" src="@/assets/pdf/PDPA-2.png" />
        <img class="img-login" src="@/assets/pdf/PDPA-3.png" />
        <img class="img-login" src="@/assets/pdf/PDPA-4.png" />
        <img class="img-login" src="@/assets/pdf/PDPA-5.png" />
        <img class="img-login" src="@/assets/pdf/PDPA-6.png" />
        <img class="img-login" src="@/assets/pdf/PDPA-7.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'policy',
  data () {
    return {
      data: []
    }
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    }
  },
  watch: {},
  methods: {
    close () {
      this.$store.commit('ShowPolicy', false)
    }
  },
  created () {
    if (
      this.$store.getters.user_profile === null &&
      sessionStorage.getItem('user_profile') === null
    ) {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    } else if (sessionStorage.getItem('user_profile') !== null) {
      let data = JSON.parse(sessionStorage.getItem('user_profile'))
      if (data.user_role == 'user') {
        this.$router.push('/' + 'home')
      } else {
      }
    }
  },
  components: {},
  mounted () {}
}
</script>
<style>
  .sticky-top {
    position: sticky;
    background-color:#fff;
    top:-10px;
    z-index: 5 !important;
  
}

</style>
