import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Axios from 'axios'
import Vuetify from 'vuetify'

Vue.prototype.$http = Axios
Vue.use(Vuetify)

const token = localStorage.getItem('user-token') // creates a cache with users

// sents the token to a http server with auth key
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
