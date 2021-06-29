<template>
  <v-container>
    <v-row class="ma-0 pa-0">
      <template v-for="(item, index) in comments">
        <v-col :key="index" cols="12" sm="4" lg="7" :class="index % 2 === 0 ? 'mr-auto' : 'ml-auto'">
          <v-card color="grey lighten-3" tile flat>
            <v-card-subtitle>
              <span class="text-1 font-weight-light">{{ item['created_at'] }}</span>
            </v-card-subtitle>
            <v-card-text class="py-5 text-1 font-weight-light">{{ item.comment }}</v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CommentsController",
  props: {
    comments: Array
  }
}
</script>

<style scoped>

</style>
