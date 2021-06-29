<template>
  <v-overlay z-index="99"
             class="loading_screen"
             opacity="0"
             v-model="loading">
    <div class="grid">
      <div class="grid-item" v-for="i in grid" :key="i"></div>
    </div>
  </v-overlay>
</template>
<script>
export default {
  name: "LoadingScreen",
  computed: {
    loading () {
      return this.$store.getters.GET_OVERLAY
    },
    grid () {
      return Math.floor(this.$vuetify.breakpoint.width / 50) * Math.floor(this.$vuetify.breakpoint.height / 50)
    }
  }
}
</script>
<style scoped lang="scss">
.loading_screen {
  position: fixed;
  & .grid {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(50px, 1fr));
    justify-content: center;
    & .grid-item {
      min-width: 100%;
      min-height: 100%;
      background: #EA5573;
      cursor: pointer;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        outline: 1px #EA5573 solid;
        display: block;
      }
    }
  }
}
</style>
