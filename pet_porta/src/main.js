import Vue from 'vue'
import '@babel/polyfill'
import './plugins/vuetify'
import store from './store'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import BootstrapVue from 'bootstrap-vue'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
