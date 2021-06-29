/* eslint-disable no-unused-vars */
import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import middlewarePipeline from "@/router/middlewarePipeline";
import anime from "animejs/lib/anime.es";
import auth from "@/router/middlewares/auth";
import Dashboard from "@/views/dashboard/Dashboard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/Posts.vue')
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/sign-in',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      middleware: [
        auth
      ]
    },
    children: [
      {
        path: '',
        component: () => import('../views/dashboard/Posts.vue'),
        name: 'dashboard.posts',
        meta: {
          middleware: [
            auth
          ]
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  if (to.name.includes('dashboard')) {
    store.dispatch('setIsDashboard', true).catch()
  }
  store.dispatch('setOverlay', true)
      .then(() => {
        const columns = Math.floor(window.innerWidth / 50)
        const rows = Math.floor(window.innerHeight / 50)
        anime({
          targets: '.grid-item',
          loop: false,
          scale: [
            { value: .1, easing: 'easeOutSine', duration: 200 },
            { value: 1, easing: 'easeOutQuad', duration: 600 }
          ],
          delay: anime.stagger(50, {grid: [columns, rows], from: 'center'})
        })
      })

  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

router.afterEach((to, from) => {
  setTimeout(async () => {
    await store.dispatch('setOverlay', false)
  }, 1600)
})

export default router
