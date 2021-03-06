import Vue from 'vue'
import Router from 'vue-router'
import Start from './components/Auth/Index.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import store from './store.js'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
    path: '*',
    redirect: '/logar'
  },
  // USER routes
  {
    path: '/',
    name: 'Index',
    component: Start,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logar',
    name: 'login',
    component: Login
  },
  {
    path: '/cadastrar',
    name: 'register',
    component: Register
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null) {
      next('/login')
      return
    }else
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
