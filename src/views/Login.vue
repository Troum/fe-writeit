<template>
  <v-container fluid class="ma-0 pa-0 fill-height">
    <v-row class="ma-0 pa-0 fill-height" align="start">
      <v-col cols="11" lg="4" offset-lg="7" class="my-16 mx-auto">
        <v-card tile :min-height="$vuetify.breakpoint.height * 0.4" width="100%" class="pa-8">
          <v-card-title class="title-small">Sign In</v-card-title>
          <v-card-text>
            <validation-observer>
              <v-form>
                <validation-provider>
                  <v-text-field label="Your login"
                                placeholder="Enter your e-mail as login"
                                type="email" class="mt-5 mb-5"></v-text-field>
                </validation-provider>
                <validation-provider>
                  <v-text-field
                      label="Your password"
                      placeholder="Enter your password"
                      type="password" class="mb-5"></v-text-field>
                </validation-provider>
                <div class="ma-0 pa-0 d-flex justify-end">
                  <v-btn @click="toSignup" type="button" color="accent" text tile>Don't have an account? Sign Up</v-btn>
                  <v-btn type="submit" color="primary" text tile>Sign In</v-btn>
                </div>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  methods: {
    toSignup () {
      this.$router.push({name: 'register'})
    },
    login () {
      this.$http.post('/login', this.form)
          .then((response) => {
            this.pending = false
            this.$store.dispatch('setToken', response.data.data['_token'])
                .then(() => {
                  this.$store.dispatch('setUser', response.data.data.user)
                      .then(() => {
                        this.$store.dispatch('setResponse',
                            {
                              type: 'success',
                              status: response.data.data.success,
                              message: response.data.message
                            })
                            .then(() => {
                              this.$router.push({ name: 'dashboard.posts' })
                            })
                      })
                })
          })
    }
  }
}
</script>

<style scoped>

</style>
