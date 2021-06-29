/* eslint-disable no-prototype-builtins */
import axios from 'axios'
import store from '../../store'
import router from "@/router";
const $http = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  },
  withCredentials: false,
  crossDomain: true,
  params: {}
})

$http.interceptors.request.use(request => {
  request.headers['Accept-Language'] = document.documentElement.lang
  if (request.url.includes('auth')) {
    request.headers.Authorization = `Bearer ${store.getters.GET_TOKEN}`
  }
  return request
})

$http.interceptors.response.use(response => {

  if (response.data.hasOwnProperty('data')) {
    if (response.data.data.hasOwnProperty('_token')) {
      store.dispatch('setUser', response.data.data.user).catch()
      store.dispatch('setToken', response.data.data['_token']).catch()
    }
  }
  return response
}, error => {
  switch (error.response.status) {
    case 401:
      router.push({name: 'login'})
          .then(() => {
            store.dispatch('setResponse', { status: true, type: 'error', message: 'Your auth token is expired. Please, authenticate yourself' })
                .then(() => {
                  store.dispatch('setIsDashboard', false).then()
                })
          })
      break
    case 400:
      store.dispatch('setResponse', { status: true, type: 'error', message: error.response.data.error }).then()
      break
    default:
      break
  }
})

const Http = {
  install (Vue) {
    Vue.prototype.$http = $http
  }
}

export default (Http)
