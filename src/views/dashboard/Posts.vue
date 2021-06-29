<template>
  <v-container fluid class="ma-0 pa-0 align-self-start">
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="ma-0 pa-0">
        <v-card tile width="100%">
          <v-card-text class="pa-0">
            <v-data-table
                multi-sort
                :headers="headers"
                :items="availablePosts"
                :search="search"
                :loading="loading"
            >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn :small="$vuetify.breakpoint.mdAndDown" @click="create = true" text tile>
                    <v-icon>mdi-plus</v-icon>
                    <span class="ml-1">Add New Post</span>
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:item.title="{ item }">
                <div v-html="$options.filters.truncate(item.title, 20)"></div>
              </template>
              <template v-slot:item.rating="{ item }">
                <v-avatar size="small" class="mr-1">
                  <v-icon size="small">mdi-thumb-up</v-icon>
                  <span class="ml-1">{{ item.rating.likes }}</span>
                </v-avatar>
                /
                <v-avatar size="small" class="ml-1">
                  <v-icon size="small">mdi-thumb-down</v-icon>
                  <span class="ml-1">{{ item.rating.dislikes }}</span>
                </v-avatar>
              </template>
              <template v-slot:item.post_content="{ item }">
                <div v-html="$vuetify.breakpoint.mdAndUp ? $options.filters.truncate(item.post_content, 50) : $options.filters.truncate(item.post_content, 15)"></div>
              </template>
              <template v-slot:item.tags="{ item }">
                <v-chip class="ml-1 mr-1 mb-1" :x-small="$vuetify.breakpoint.mdAndDown" v-for="tag in item.tags" :key="tag.text">{{ tag.text }}</v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="showPreview(item)"
                >
                  mdi-eye
                </v-icon>
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item.id)"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
          <v-dialog scrollable
                    content-class="rounded-0"
                    v-model="dialog"
                    fullscreen>
            <v-card v-if="form" :loading="updating" tile>
              <v-card-title class="elevation-2" style="z-index: 2">
                <span class="headline ml-5">Edit post</span>
                <v-spacer/>
                <v-btn @click="closeUpdate" icon>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="pa-0">
                <validation-observer ref="observer" v-slot="{ passes }">
                  <v-form @submit.prevent="passes( update )">
                    <v-container>
                      <v-row class="ma-0 pa-0">
                        <v-col class="ma-0 pa-0" cols="12">
                          <validation-provider name="Title" rules="required" v-slot="{ errors }">
                            <v-text-field
                                :error-messages="errors"
                                label="Edit title"
                                v-model="form.title"
                                type="text"></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col class="ma-0 pa-0" cols="12">
                          <validation-provider rules="required" name="Tags" v-slot="{ errors }">
                            <v-combobox
                                v-model="form.tags"
                                chips
                                label="Edit tags"
                                append-icon=""
                                multiple
                                :error-messages="errors"
                                @keyup.tab="updateTags(form.tags)"
                                @paste="updateTags(form.tags)"
                            />
                          </validation-provider>
                        </v-col>
                        <v-col class="ma-0 pa-0 d-flex justify-start align-center" cols="12">
                          <v-img max-width="300" :src="!change ? form.image.image_src : imagePreview" :aspect-ratio="16/9">
                            <v-skeleton-loader
                                v-if="change && !imagePreview"
                                max-width="300"
                                type="image"
                            ></v-skeleton-loader>
                          </v-img>
                          <v-btn v-if="!change" tile class="d-flex justify-start ml-4" @click="changeImage" text>
                            <v-icon>mdi-help-circle-outline</v-icon>
                            <span class="ml-1">Change image?</span>
                          </v-btn>
                        </v-col>
                        <v-col class="ma-0 pa-0" v-if="change" cols="12">
                          <validation-provider rules="required" name="New Image" v-slot="{ errors }">
                            <v-file-input
                                ref="image"
                                label="Add new image"
                                placeholder="Choose new image..."
                                chips
                                prepend-inner-icon="mdi-attachment"
                                prepend-icon=""
                                v-model="form.image"
                                @change="updateFile"
                                accept="image/*"
                                :error-messages="errors"
                            >
                            </v-file-input>
                          </validation-provider>
                        </v-col>
                        <v-col class="ma-0 pa-0" cols="12">
                          <p>Edit content</p>
                          <tiptap-vuetify :card-props="{ tile: true }"
                                          v-model="form.post_content" :extensions="extensions"/>
                        </v-col>
                        <v-col class="ma-0 pa-0" cols="12">
                          <v-card-actions class="elevation-0">
                            <v-spacer></v-spacer>
                            <v-btn tile color="danger" text @click="closeUpdate">cancel</v-btn>
                            <v-btn tile color="success" text type="submit">update post</v-btn>
                          </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </validation-observer>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog scrollable
                    content-class="rounded-0"
                    v-model="create"
                    fullscreen>
            <v-card :loading="creating" tile>
              <v-card-title class="elevation-2" style="z-index: 2">
                <span class="headline ml-5">Create new post</span>
                <v-spacer/>
                <v-btn @click="closeAdding" icon>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="pa-0">
                <validation-observer ref="observerNew" v-slot="{ passes }">
                  <v-form @submit.prevent="passes( save )">
                    <v-container fluid>
                      <v-row class="mb-12">
                        <v-col class="mx-auto" cols="11">
                          <validation-provider name="Title" rules="required" v-slot="{ errors }">
                            <v-text-field
                                :error-messages="errors"
                                label="Add post title"
                                v-model="post.title"
                                type="text"></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col class="mx-auto" cols="11">
                          <validation-provider rules="required" name="Tags" v-slot="{ errors }">
                            <v-combobox
                                v-model="post.tags"
                                chips
                                label="Add post tags"
                                append-icon=""
                                multiple
                                :error-messages="errors"
                                @keyup.tab="updateTags(post.tags)"
                                @paste="updateTags(post.tags)"
                            />
                          </validation-provider>
                        </v-col>
                        <v-col class="mx-auto" cols="11">
                          <validation-provider rules="required" name="Post Image" v-slot="{ errors }">
                            <v-file-input
                                ref="image"
                                label="Add post image"
                                placeholder="Choose post image..."
                                chips
                                prepend-inner-icon="mdi-attachment"
                                prepend-icon=""
                                v-model="post.file"
                                @change="chooseFile"
                                accept="image/*"
                                :error-messages="errors"
                            >
                            </v-file-input>
                          </validation-provider>
                        </v-col>
                        <v-col class="mx-auto" cols="11">
                          <p>Add post content</p>
                          <tiptap-vuetify :card-props="{ tile: true }"
                                          v-model="post.post_content" :extensions="extensions"/>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card-actions class="elevation-2 white pr-6"
                                    :style="`position: fixed;
                              bottom: 0;
                              z-index: 2;
                              width: ${$vuetify.breakpoint.width}px`">
                      <v-spacer></v-spacer>
                      <v-btn color="danger" text @click="closeAdding">cancel</v-btn>
                      <v-btn color="success" text type="submit">save post</v-btn>
                    </v-card-actions>
                  </v-form>
                </validation-observer>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog scrollable
                    content-class="rounded-0"
                    v-model="preview" fullscreen>
            <v-card tile v-if="form" flat>
              <v-card-title style="z-index: 2">
                <span>Preview post</span>
                <v-spacer/>
                <v-btn @click="closePreview" icon>
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="pa-0">
                <v-container fluid class="ma-0 pa-0 fill-height">
                  <v-row class="ma-0 pa-0 fill-height" align="center" justify="center">
                    <v-col cols="12" class="ma-0 pa-0 mx-auto">
                      <v-card flat class="pa-0" tile>
                        <v-row class="ma-0 pa-0">
                          <v-col cols="6" class="ma-0 pa-0">
                            <v-img width="100%" height="100%" :src="form.image['image_src']"
                                   class="d-flex align-end">
                            </v-img>
                          </v-col>
                          <v-col cols="6" class="ma-0 pa-0">
                            <v-card-title class="title-post font-weight-light">{{ form.title }}</v-card-title>
                            <v-card-subtitle>
                              <v-row class="ma-0 pa-0">
                                <v-col cols="12" class="ma-0 pa-0 py-5">
                                  <span class="d-block text-1 font-weight-light">{{ new Date(Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                                  <span class="d-block text-1 font-weight-light">by {{ user.name }}</span>
                                </v-col>
                                <v-col cols="12" class="ma-0 pa-0">
                                  <v-chip small v-for="(tag, index) in form['tags']"
                                          :key="tag.text"
                                          :class="index !== 0 ? 'ml-2' : ''">#{{ tag.text }}</v-chip>
                                </v-col>
                              </v-row>
                            </v-card-subtitle>
                            <v-card-text class="pb-5 text-1 font-weight-light" v-html="form['post_content']"></v-card-text>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-snackbar
              v-model="confirmation"
              top
              dark
              vertical
              color="accent"
          >
            Do you really want to delete this post?
            <template v-slot:action>
              <v-btn
                  dark
                  text
                  @click="confirmation = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  dark
                  text
                  @click="confirmDeleting"
              >
                Delete
              </v-btn>
            </template>
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-prototype-builtins */
import {
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'

export default {
  name: 'Posts',
  data () {
    return {
      search: '',
      change: false,
      posts: [],
      post: {
        title: null,
        post_content: null,
        tags: [],
        image: null,
        file: null
      },
      loading: false,
      updating: false,
      confirmation: false,
      deleting: null,
      creating: null,
      dialog: false,
      create: false,
      imagePreview: null,
      preview: false,
      headers: [
        {
          text: 'Post ID',
          align: 'center',
          sortable: false,
          value: 'id'
        },
        { text: 'Title', value: 'title', width: '10%', sortable: true },
        { text: 'Content', value: 'post_content', width: '40%', sortable: true },
        { text: 'Rating', value: 'rating', width: '10%', sortable: false },
        { text: 'Tags', value: 'tags', width: '10%', sortable: true },
        { text: 'Published At', value: 'created_at', width: '10%', sortable: true },
        { text: 'Actions', value: 'actions', width: '10%', sortable: false }
      ],
      form: null,
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3, 4, 5, 6]
          }
        }],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ]
    }
  },
  beforeMount() {
    this.getPosts()
  },
  mounted () {
    this.loading = 'danger'
  },
  methods: {
    async getPosts () {
      await this.$http.get('/auth/posts')
          .then(response => {
            this.posts = response.data.posts.data
          })
          .finally(() => {
            this.loading = false
          })
    },
    changeImage () {
      this.form.image = null
      this.change = true
    },
    editItem (item) {
      this.form = item
      this.dialog = true
    },
    deleteItem (id) {
      this.confirmation = true
      this.deleting = id
    },
    confirmDeleting () {
      this.confirmation = true
      this.$http.delete(`/auth/posts/${this.deleting}`)
          .then(response => {
            this.$store.dispatch('setResponse', { status: true, type: 'success', message: response.data.success })
            this.posts = response.data.posts.data
            this.confirmation = false
          })
    },
    chooseFile (file) {
      this.post.image = file
      const reader = new FileReader()
      reader.addEventListener('load', function () {
        this.post.image = reader.result
      }.bind(this), false)
      if (this.post.image) {
        if (/\.(jpe?g|png|gif|webp)$/i.test(this.post.image.name)) {
          reader.readAsDataURL(this.post.image)
        }
      }
    },
    updateFile (file) {
      this.form.image = file
      const reader = new FileReader()
      reader.addEventListener('load', function () {
        this.imagePreview = reader.result
        this.form.new_file = this.imagePreview
      }.bind(this), false)
      if (this.form.image) {
        if (/\.(jpe?g|png|gif|webp)$/i.test(this.form.image.name)) {
          reader.readAsDataURL(this.form.image)
        }
      }
    },
    update () {
      this.updating = 'danger'
      this.$http.patch(`/auth/posts/${this.form.id}`, this.form)
          .then(response => {
            this.closeUpdate()
            this.$store.dispatch('setResponse', { show: true, type: 'success', message: response.data.success })
            this.getPosts()
          })
          .finally(() => {
            this.updating = false
          })
    },
    save () {
      this.creating = 'danger'
      this.$http.post('/auth/posts', this.post)
          .then(response => {
            this.closeAdding()
            this.$store.dispatch('setResponse', { status: true, type: 'success', message: response.data.success })
            this.getPosts()
          })
          .finally(() => {
            this.creating = false
          })
    },
    async clear () {
      requestAnimationFrame(() => {
        this.$refs.observerNew.reset();
      });
    },
    closeUpdate () {
      this.dialog = false
      this.change = false
      this.imagePreview = null
    },
    closeAdding () {
      this.create = false
      this.post = {
        title: null,
        post_content: null,
        tags: [],
        image: null
      }
    },
    updateTags (items) {
      const object = {
        text: items[items.length - 1]
      }
      items.splice((items.length - 1), 1)
      items.push(object)
    },
    showPreview (item) {
      this.preview = true
      this.form = item
    },
    closePreview () {
      this.preview = false
    }
  },
  computed: {
    user () {
      return this.$store.getters.GET_USER
    },
    availablePosts () {
      return this.posts
    }
  }
}
</script>

<style scoped>

</style>
