import Vue from 'vue'
import Navbar from '@/components/Navbar'
import LoadingScreen from "@/components/LoadingScreen";
import PostsComponent from "@/components/PostsComponent";
import CommentsComponent from "@/components/CommentsComponent";
import {ValidationObserver, ValidationProvider} from "vee-validate";
import AlertComponent from "@/components/AlertComponent";
import {TiptapVuetify} from "tiptap-vuetify";

Vue.component('navbar', Navbar)
Vue.component('loading-screen', LoadingScreen)
Vue.component('posts-component', PostsComponent)
Vue.component('comments-component', CommentsComponent)
Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)
Vue.component('alert-component', AlertComponent)
Vue.component('tiptap-vuetify', TiptapVuetify)
