import Vue from 'vue'
import AuthService from '@/services/authentication.service'

Vue.use(AuthService)

export default function loggedIn ({ next }) {
  return Vue.prototype.$auth.token() ? next({
    name: 'dashboard'
  }) : next()
}
