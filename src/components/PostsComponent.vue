<template>
<v-container>
  <template v-if="posts.length > 0">
    <v-row class="ma-0 pa-0" v-masonry>
      <v-col v-for="(item, index) in posts" :key="index" cols="12" sm="4" lg="4">
        <v-card hover height="100%" color="white" class="pa-0" tile>
          <v-img contain :src="item.image['image_src']"
                 class="d-flex align-end"
                 @load="this.$redrawVueMasonry()">
            <v-row class="ma-0 pa-0">
              <v-col cols="12" :style="`height: ${$vuetify.breakpoint.height * 0.06}px; background: rgba(0, 0, 0, .262)`">
                <v-row>
                  <v-col cols="4" class="d-flex justify-start">
                    <div class="d-flex align-center" style="min-width: 10%">
                      <v-icon color="white" small>mdi-thumb-up</v-icon>
                      <span class="white--text ml-2">{{ item.rating.likes }}</span>
                    </div>
                    <div class="d-flex align-center ml-4" style="min-width: 10%">
                      <v-icon color="white" small>mdi-thumb-down</v-icon>
                      <span class="white--text ml-2">{{ item.rating.dislikes }}</span>
                    </div>
                  </v-col>
                  <v-spacer/>
                  <v-col cols="4"></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-img>
          <v-card-title class="title-post font-weight-light">{{ item.title }}</v-card-title>
          <v-card-subtitle class="pt-8">
            <v-chip small v-for="(tag, index) in item.tags"
                    :key="tag.text"
                    :class="index !== 0 ? 'ml-2' : ''">#{{ tag.text }}</v-chip>
          </v-card-subtitle>
          <v-card-text class="py-5" v-html="$options.filters.truncate(item['post_content'], index % 2 === 0 ? 70 : 90)"></v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn tile @click="openPost(item.id)" text>Read full</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </template>
  <template v-else>
    <v-row class="ma-0 pa-0">
      <v-col cols="12" sm="4" lg="4" class="mx-lg-auto text-center">
        <span class="text-3">No posts yet</span>
      </v-col>
    </v-row>
  </template>
  <v-row class="ma-0 pa-0" v-intersect="infiniteScrolling">
    <v-col cols="12" class="ma-0 pa-0 d-flex justify-center" v-if="pending && posts.length > 0">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  name: "PostsComponent",
  data () {
    return {
      posts: [],
      page: 1,
      pending: false
    }
  },
  beforeMount() {
    this.getPosts()
  },
  mounted() {
    this.repaint();
  },
  watch: {
    items: function() {
      this.repaint();
    }
  },
  methods: {
    repaint() {
      setTimeout(() => this.$redrawVueMasonry(), 2000);
    },
    getPosts () {
      this.$http.get(`/posts?page=${this.page}`)
      .then((response) => {
        this.posts = response.data.posts.data
        this.repaint()
      })
    },
    openPost (id) {
      this.$router.push({name: 'post', params: { id: id }})
    },
    infiniteScrolling (entries, observer, isIntersecting) {
      this.pending = true
      setTimeout(() => {
        this.page++
        this.$http
            .get(this.url)
            .then(response => {
              response.data.posts.data.forEach(item => this.posts.push(item))
              this.pending = false
              this.repaint()
            })
            .catch(err => {
              console.log(err)
            })
      }, 500)
    }
  },
  computed: {
    url () {
      return `/posts?page=${this.page}`
    }
  }
}
</script>

<style scoped>

</style>
