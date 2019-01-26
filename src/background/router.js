import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => {
        return import('./views/login.vue')
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => {
        return import('./views/home.vue')
      }
    }
  ]
})

// const router = new Router()

// router.beforeEach((to, from, next) => {
//   // ...
// })
