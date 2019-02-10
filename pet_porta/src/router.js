import Vue from 'vue'
import Router from 'vue-router'
import Start from './components/Auth/Index.vue'
import Dashboard from './components/Auth/Dashboard.vue'

// import Login from './views/Home.vue'

import Login from './components/Login.vue'
import Register from './components/Register.vue'
import store from './store.js'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/login' },
    {
      path: '/',
      name: 'Index',
      component: Start
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cadastrar',
      name: 'register',
      component: Register
    }
    // {
    // path: '/secure',
    // name: 'secure',
    // component: Secure
    // meta: {
    //  requiresAuth: true
    // }
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
