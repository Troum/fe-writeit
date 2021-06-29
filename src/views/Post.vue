<template>
  <v-container fluid class="ma-0 pa-0 fill-height">
    <v-row class="ma-0 pa-0 fill-height" align="center" justify="center">
      <v-col cols="12" class="ma-0 pa-0 mx-auto">
        <v-card flat class="pa-0" tile>
          <v-row class="ma-0 pa-0">
            <v-col cols="6" class="ma-0 pa-0">
              <v-img width="100%" height="100%" :src="post.image['image_src']"
                     class="d-flex align-end">
              </v-img>
            </v-col>
            <v-col cols="6" class="ma-0 pa-0">
              <v-card-title class="title-post font-weight-light">{{ post.title }}</v-card-title>
              <v-card-subtitle>
                <v-row class="ma-0 pa-0">
                  <v-col cols="12" class="ma-0 pa-0 py-5">
                    <span class="d-block text-1 font-weight-light">{{ post['created_at'] }}</span>
                    <span class="d-block text-1 font-weight-light">by {{ post['author'] }}</span>
                  </v-col>
                  <v-col cols="12" class="ma-0 pa-0">
                    <v-chip small v-for="(tag, index) in post['tags']"
                            :key="tag.text"
                            :class="index !== 0 ? 'ml-2' : ''">#{{ tag.text }}</v-chip>
                  </v-col>
                </v-row>
              </v-card-subtitle>
              <v-card-text class="pb-5 text-1 font-weight-light" v-html="post['post_content']"></v-card-text>
              <v-card-actions class="pb-10">
                <v-row class="ma-0 pa-0">
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="4">
                        <v-btn @click="rate('like')" large icon light>
                          <v-icon small>mdi-thumb-up</v-icon>
                          <span>{{ post.rating['likes'] }}</span>
                        </v-btn>
                        <v-btn @click="rate('dislike')" large icon light class="ml-4">
                          <v-icon small>mdi-thumb-down</v-icon>
                          <span>{{ post.rating['dislikes'] }}</span>
                        </v-btn>
                      </v-col>
                      <v-spacer/>
                      <v-col cols="4"></v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <template v-if="comments.length > 0">
                      <comments-component :comments="comments"/>
                    </template>
                    <template v-else>
                      <span class="text-1 font-weight-light">No comments</span>
                    </template>
                  </v-col>
                  <v-col cols="10" class="ml-auto">
                    <validation-observer ref="form" v-slot="{ passes }">
                    <v-form @submit.prevent="passes( submit )">
                      <validation-provider name="Comment" rules="required" v-slot="{ errors }">
                        <v-textarea :error-messages="errors"
                                    :placeholder="comments.length > 0 ? 'Write comment' : 'Write first comment'"
                                    dense class="rounded-0" rows="6"
                                    v-model="form.comment"
                                    required outlined></v-textarea>
                      </validation-provider>
                      <div class="d-flex justify-end ma-0 pa-0">
                        <v-btn type="submit" color="gray" elevation="0" tile>Comment</v-btn>
                      </div>
                    </v-form>
                    </validation-observer>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-prototype-builtins */
export default {
  name: "Post",
  data () {
    return {
      post: {
        title: null,
        post_content: null,
        created_at: null,
        updated_at: null,
        image: {
          image_src: null
        },
        tags: [],
        comments: [
          {
            comment: null,
            created_at: null
          },
          {
            comment: null,
            created_at: null
          }
        ],
        rating: {
          likes: null,
          dislikes: null
        }
      },
      form: {
        comment: null
      }
    }
  },
  beforeMount() {
    this.getPost()
  },
  methods: {
    getPost () {
      this.$http.get(`/posts/${this.$route.params.id}`)
      .then((response) => {
        this.post = response.data.post
      })
    },
    async clear () {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = null
        }
      }
      requestAnimationFrame(() => {
        this.$refs.form.reset();
      });
    },
    rate(type) {
      this.$http.patch(`/rate/posts/${this.post.id}/${type}`)
          .then((response) => {
            this.post = response.data.post
          })
    },
    submit () {
      this.$store.dispatch('setResponse', { type: 'warning', message: 'Your comment has just flew', status: true })
      this.$http.patch(`/comment/${this.post.id}`, this.form)
          .then((response) => {
            this.post = response.data.post
            this.$store.dispatch('setResponse', { type: 'success', message: 'Your comment was successfully added', status: true })
            this.clear().then(() => {})
          })
          .catch(() => {
            this.$store.dispatch('setResponse', { type: 'error', message: 'Something went wrong...', status: true })
          })
          .finally(() => {
            setTimeout(() => {
              this.$store.dispatch('setResponse', { type: 'error', message: '', status: false })
            }, 5000)
          })
    }
  },
  computed: {
    comments () {
      return this.post['comments']
    }
  }
}
</script>

<style scoped>

</style>
