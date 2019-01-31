import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Secure from './components/Dashboard.vue'
import About from './views/about.vue'
import Login from './views/login.vue'
import Register from './views/register.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    // otherwise redirect to home
    { path: '*', redirect: '/' },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'secure',
      component: Secure,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) { // check if isLoggedIn == state.token == true
      next()
      return
    }
    next('*')
  } else {
    next()
  }
})

export default router
