<template>
  <v-container fluid class="ma-0 pa-0 fill-height">
    <v-row class="ma-0 pa-0 fill-height" align="start">
      <v-col lg="4" offset-lg="7" class="my-16 mx-auto">
        <v-card :loading="pending" tile :min-height="$vuetify.breakpoint.height * 0.55" width="100%" class="pa-8 pt-0">
          <v-card-title class="title-small pt-8">Sign In</v-card-title>
          <v-card-text>
            <validation-observer ref="signup" v-slot="{ passes }">
              <v-form @submit.prevent="passes(submit)">
                <validation-provider rules="required" name="name and surname" v-slot="{ errors }">
                  <v-text-field label="Your name and surname"
                                :error-messages="errors"
                                placeholder="Enter your name and surname"
                                type="text" class="mt-5 mb-5"
                                v-model="form.name"></v-text-field>
                </validation-provider>
                <validation-provider rules="required|email" name="e-mail" v-slot="{ errors }">
                  <v-text-field label="Your e-mail"
                                :error-messages="errors"
                                placeholder="Enter your email to use as login"
                                type="email" class="mt-5 mb-5"
                                v-model="form.email"></v-text-field>
                </validation-provider>
                <validation-provider rules="required|confirmed:confirmation" name="password" v-slot="{ errors }">
                  <v-text-field
                      label="Your password"
                      :error-messages="errors"
                      placeholder="Create your password"
                      type="password" class="mb-5"
                      v-model="form.password"></v-text-field>
                </validation-provider>
                <validation-provider rules="required" vid="confirmation" name="password's confirmation" v-slot="{ errors }">
                  <v-text-field
                      label="Your password confirmation"
                      :error-messages="errors"
                      placeholder="Confirm your password"
                      type="password" class="mb-5"
                      v-model="form.password_confirmation"></v-text-field>
                </validation-provider>
                <div class="ma-0 pa-0 d-flex justify-end">
                  <v-btn @click="toSignin" type="button" color="accent" text tile>Do you already have an account? Sign In!</v-btn>
                  <v-btn type="submit" color="primary" text tile>Sign Up</v-btn>
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
  name: "Register",
  data () {
    return {
      pending: false,
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  methods: {
    toSignin () {
      this.$router.push({name: 'login'})
    },
    submit () {
      this.pending = true
      this.$http.post('/register', this.form)
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
