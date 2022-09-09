<template>
  <div>
    <div class="loading-bar" v-if="loading">
      <v-progress-circular
        :size="50"
        color="red"
        :value="valueLoading"
        indeterminate
      ></v-progress-circular>
    </div>
    <headers v-if="status_login" />
    <div :style="{'top':!status_login ?'0px' :'58px' }"  class="body-main">
      <router-view />
    </div>
    <footers v-if="status_login" />
    <v-dialog v-model="dialog_expire" max-width="350">
      <v-card class="confirm-dialog">
      
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="signOut()" class="save">
           
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_error" max-width="350">
      <v-card class="confirm-dialog">
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closePop()" class="save">
        
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Headers from '@/components/Header'
import Footers from '@/components/Footer'
import Vue from "vue";
export default {
  name: 'defaults-page',
  data () {
    return {
      valueLoading: 0,
    }
  },
  components: {
    Headers,
    Footers
  },
  computed: {
    loading () {
      return this.$store.getters.isLoading
    },
    dialog_expire () {
      return this.$store.getters.dialog_expire
    },
    dialog_error () {
      return this.$store.getters.dialog_error
    },
    status_login(){
      return Vue.localStorage.get("login")
    }

  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    goTo (plink) {
      this.$router.push({ path: plink })
    },
    home () {
      this.$router.push({ path: '/' })
    },
    signOut () {
      this.$store.commit('SetDialogExpire', false)
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/')
      })
    },
    closePop () {
      this.$store.commit('SetDialogError', false)
    }
  },
  mounted () {}
}
</script>
