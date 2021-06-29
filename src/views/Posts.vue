<template>
  <v-container fluid class="ma-0 pa-0 fill-height">
    <v-row class="ma-0 pa-0 fill-height" align="center" justify="center">
      <v-col cols="10" class="ma-0 pa-0 py-10 mx-auto">
        <v-row class="ma-0 pa-0 py-15">
          <v-col cols="6" class="ma-0 mx-auto pa-0 text-center">
            <span class="title-large">PostS</span>
          </v-col>
        </v-row>
        <posts-component/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Posts"
}
</script>

<style scoped>

</style>
