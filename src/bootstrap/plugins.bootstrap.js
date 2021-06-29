import Vue from 'vue'
import Http from "@/plugins/http.plugin";
import {VueMasonryPlugin} from "vue-masonry";
import Vuetify from "vuetify";
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'

Vue.use(Http)
Vue.use(VueMasonryPlugin)

const vuetify = new Vuetify()

Vue.use(TiptapVuetifyPlugin, {
    vuetify,
    iconsGroup: 'mdi'
})
