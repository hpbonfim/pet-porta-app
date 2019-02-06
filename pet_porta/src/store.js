import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// VUEX - reactive module with (State - Mutations - Actions - Getters)
// State - sends/receave all status of function
// mutations - commits all changes in actions
// Actions - Post/Get all http requests fowarding data for state/mutations

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token'),
    user: {}
  },
  mutations: {
    porta_aberta (state) {
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
        axios({ url: 'http://172.27.0.5:3333/time', method: 'POST' }) // this Post redirect to a cluster IP
          .then(resp => {
            console.log('resposta: ', resp)
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // ------------- // request for login
    login ({ commit }, nome, senha) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://172.27.0.6:3033/usuarios/:usuarioID', data: nome, senha, method: 'POST' }) // this Post redirect to a cluster IP
          .then(resp => {
            const token = resp.data.token
            const nome = resp.data.user
            localStorage.setItem('token', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, nome)
            console.log('resposta: ', resp)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removsudoeItem('token')
            reject(err)
          })
      })
    },
    // all requests for register
    register ({ commit }, nome, email, cpf, senha) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://172.27.0.6:3033/register', data: nome, email, cpf, senha, method: 'POST' }) // this Post redirect to a cluster IP
          .then(resp => {
            const token = resp.data.token
            const nome = resp.data.nome
            localStorage.setItem('token', token)
            // set a auth_token to new user:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, nome)
            resolve(resp)
            console.log('data response:', resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token') //
            reject(err)
            console.log('erro:', err)
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
