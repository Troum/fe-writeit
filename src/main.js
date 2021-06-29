import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify.plugin'
import store from './store'

import './vee-validate'
import './bootstrap/components.bootstrap'
import './bootstrap/plugins.bootstrap'
import './bootstrap/filters.bootstrap'
import './scss/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
