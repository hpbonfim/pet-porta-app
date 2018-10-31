import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    porta_aberta (state){
      state.status = 'Porta Aberta'
    },
    auth_request (state) { // see if all request on the client size it's be suppress
      state.status = 'loading'
    },
    auth_success (state, token, user) { // auth === true
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) { // auth error
      state.status = 'error'
    },
    logout (state) { // auth null
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    // request to open the door
    abrir ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('porta_aberta')
        axios({ url: 'http://localhost:3000/abrir', method: 'POST' }) // this Post ask to open the door
        .then(resp => {
          resolve(resp)
        })
      })
    },
    // request for login
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' }) // this Post redirect to a cluster IP
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    // all requests for register
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' }) // this Post redirect to a cluster IP
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            // set a auth_token to new user:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    // all requests for logout
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
