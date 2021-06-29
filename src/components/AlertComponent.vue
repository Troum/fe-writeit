<template>
  <v-alert style="position: fixed; width: 100%; top: 0; left: 0; z-index: 20"
           tile
           transition="slide-x-transition"
           v-model="response.status"
           dismissible
           :type="response.type">
    <span class="text-1 font-weight-light white--text">{{ response.message }}</span>
    <template v-slot:close>
      <v-btn @click="close" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-alert>
</template>

<script>
export default {
  name: "AlertComponent",
  watch: {
    response: function () {
      if (this.response) {
        setTimeout(() => {
          this.close()
        }, 5000)
      }
    }
  },
  methods: {
    close () {
      this.$store.dispatch('setResponse', { status: false })
    }
  },
  computed: {
    response () {
      return this.$store.getters.GET_RESPONSE
    }
  }
}
</script>

<style scoped>

</style>
