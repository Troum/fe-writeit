<template>
  <v-app>
    <navbar/>
    <v-main>
      <router-view transition="scroll-x-transition"/>
    </v-main>
    <loading-screen/>
    <alert-component/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {

    }
  },
};
</script>
