<template>
  <v-container fluid class="ma-0 pa-0 fill-height">
    <v-row class="wrapper ma-0 pa-0 fill-height" align="center" justify="center">
      <v-col cols="12" class="d-flex justify-end align-center ma-0 pa-0"
             :style="`position: relative; height: ${fullHeight}px`">
        <video autoplay muted loop class="videobackground">
          <source src="@/assets/video/videobackground.mp4" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
        <div :style="`background: rgba(0, 0, 0, .236); position: relative; width: 100%; min-height: ${fullHeight}px`"
             class="d-flex align-center justify-end pa-5">
          <h1 class="white--text text-4" style="max-width: 50%">
            Become a part of something new.
            <br>Something <strong class="text-4 font-weight-light">free</strong>.
            <br>Something <strong class="text-4 font-weight-light">special</strong>.
            <br>Only <strong class="text-4 font-weight-light">for you</strong>.</h1>
        </div>
      </v-col>
      <v-col id="about" cols="12" class="ma-0 pa-0" :style="`height: ${fullHeight}px`" data-container>
        <v-row class="ma-0 pa-0 fill-height" align="center" justify="center">
          <v-col cols="5" class="d-flex align-center" data-slogan>
            <div class="d-flex text-center flex-column">
              <v-img src="@/assets/logos/logo_without_text.png"/>
              <h2 class="slogan">WRiTE!</h2>
            </div>
          </v-col>
          <v-col cols="5" data-description>
            <p class="description align-self-start ml-10">
              WRiTE! &mdash; is an social network that provides possibility just to share any thought that can come to your mind!
              <br>
              Of course, if your thought is not radical
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col id="posts" cols="8" class="ma-0 pa-0 py-10 mx-auto">
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
  name: "Main",
  data () {
    return {
    }
  },
  mounted() {
  },
  computed: {
    halfHeight () {
      return this.$vuetify.breakpoint.height / 2
    },
    fullHeight () {
      return this.$vuetify.breakpoint.height
    }
  }
}
</script>

<style scoped lang="scss">
  .videobackground {
    position: absolute;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
  }
  .slogan {
    font-family: "Lato Thin", sans-serif;
    font-size: 7rem;
    font-weight: lighter;
  }
  .description {
    font-family: "Lato Thin", sans-serif;
    font-size: 2.6rem;
  }
</style>
