<template>
  <v-app-bar
      app
      color="white"
      :height="height"
      prominent
      :shrink-on-scroll="!auth"
      :elevate-on-scroll="!auth"
      :elevation="auth ? 1 : 0"
      dark
  >
    <div class="d-flex align-center fill-height">
      <v-img
          @click="home"
          alt="Write! Logo"
          class="shrink mr-2 my-auto"
          src="@/assets/logo.png"
          :max-width="40"
      />
    </div>

    <v-spacer></v-spacer>
    <div class="d-flex align-center fill-height">
      <v-btn
          light
          text
          tile
          @click="scrollToSection('posts')"
      >
        <span class="mr-2">posts</span>
      </v-btn>
      <v-btn
          @click="scrollToSection('about')"
          light
          text
          tile
      >
        <span class="mr-2">about</span>
      </v-btn>
    <template v-if="!isDashboard && auth">
      <v-btn
          @click="logout()"
          light
          text
          tile
      >
        <span class="mr-2">logout</span>
      </v-btn>
    </template>
    <template v-if="!isDashboard && !auth">
      <v-btn
          @click="signin()"
          light
          text
          tile
      >
        <span class="mr-2">sign in</span>
      </v-btn>
    </template>
    </div>
  </v-app-bar>
</template>

<script>
/* eslint-disable no-unused-vars */
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/src/all'
export default {
  name: "Navbar",
  mounted() {
    gsap.registerPlugin(ScrollToPlugin)
  },
  methods: {
    scrollToSection (index) {
      if (this.$route.name.includes('main')) {
        gsap.to(window, { duration: 2, scrollTo: { y: `#${index}`, offsetY: 0 } })
      }
    },
    home () {
      this.$router.push({ name: 'main' })
    },
    signin () {
      this.$router.push({ name: 'login' })
    },
    logout () {
      this.$http.get('/auth/logout')
          .then(response => {
            this.$store.dispatch('setToken', null)
            .then(() => {
              this.$store.dispatch('setUser', {})
                  .then(() => {
                    this.$store.dispatch('setResponse', { status: true, type: 'success', message: response.data.success })
                        .then(() => {
                            this.$router.push({name: 'login'}).then(() => {
                              this.$store.dispatch('setIsDashboard', false)
                            })
                        })
                  })
            })
          })
    }
  },
  computed: {
    height () {
      return this.$vuetify.breakpoint.height / 10
    },
    auth () {
      return  !!this.$store.getters.GET_TOKEN
    },
    isDashboard () {
      return this.$store.getters.GET_IS_DASHBOARD
    }
  }
}
</script>

<style scoped>

</style>
