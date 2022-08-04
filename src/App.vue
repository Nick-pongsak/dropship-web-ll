<template>
  <v-app
    :style="{ 'font-family': $i18n.locale == 'en' ? 'Kanit' : 'Roboto' }"
    :class="systemTheme"
  >
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({}),
  computed: {
    systemTheme () {
      return this.$store.getters.systemTheme
    }
  }
}
</script>

<style src="@/assets/style/index.scss" lang="scss"></style>
