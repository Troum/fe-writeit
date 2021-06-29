<template>
  <v-container fluid class="fill-height ma-0" :style="`padding: ${height / 5 }px 24px 24px 250px`">
    <v-navigation-drawer width="230"
                         :style="`position: fixed; top: ${height - 24}px`"
                         :height="$vuetify.breakpoint.height">
      <v-list
          dense
          nav
          tile
          class="py-0"
      >
        <v-list-item two-line class="px-2 pt-5">
          <v-list-item-avatar color="secondary">
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
        <v-list-item-group style="position: absolute; bottom: 10%; width: 100%">
          <v-list-item @click="logout">
            <v-list-item-icon class="mr-2">
              <v-icon small color="primary">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="font-weight-light">LOGOUT</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <transition mode="out-in"
                enter-active-class="transition-ease-in-out"
                leave-active-class="transition-ease-in-out">
      <router-view/>
    </transition>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
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
      return this.$vuetify.breakpoint.height / 10 + 15
    },
    user () {
      return this.$store.getters.GET_USER
    }
  }
}
</script>

<style scoped>

</style>
