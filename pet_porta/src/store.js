import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios')
const config = require('./config')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    // USER states //localStorage.getItem('token') || ''
    token: localStorage.getItem('token') || null,
    usuario: [],
    logado: false,
    // TODO states
    activities: []
  },
  mutations: {
    // Arduino Mutation
    is_open (state, token) {
      state.status = 'opening'
      state.token = token
    },
    // TODO mutation
    addActivity (state, activity) {
      state.activities.push(activity)
    },
    deleteActivity (state, activity) {
      state.activities = state.activities.filter((val) => val !== activity)
    },
    changeActivityState (state, activity) {
      state.activities.map((val) => {
        if (val.name === activity.name) {
          const aux = !val.completed
          val.completed = aux
        }
        return val
      })
    },
    // USER mutation
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token) {
      state.status = 'success'
      state.token = token
    },
    logar_usuario (state, payload) {
      state.status = 'success'
      state.usuario.id = payload.id
      state.usuario.username = payload.username
      state.usuario.name = payload.name
      state.usuario.email = payload.email
    },
    auth_error (state) {
      state.user = null
      state.token = null
      state.status = 'error'
    },
    logout (state) {
      state.status = null
      state.token = null
    }
  },
  actions: {
    // Arduino Actions
    openDoor ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(config.AUTH)
          .then((response) => {
            // handle success
            commit('is_open')
            resolve(response)
            console.log(response)
          })
          .catch((error) => {
            reject(error)
            // handle error
            console.log(error)
          })
      })
    },
    // TODO actions
    addActivity ({ commit }, { activity }) {
      // TODO POST
      commit('addActivity', activity)
    },
    deleteActivity ({ commit }, { activity }) {
      // TODO DELETE
      commit('deleteActivity', activity)
    },
    changeActivityState ({ commit }, { activity }) {
      // TODO PUT
      commit('changeActivityState', activity)
    },
    // USER actions
    // checkToken({commit}){
    //   var checkToken = token
    //   var anotherToken = localStorage.getItem('token')
    //   if(checkToken !== axios.defaults.headers.common['Authorization'] || checkToken !== anotherToken){
    //     commit('auth_error')
    //     delete axios.defaults.headers.common['Authorization']
    //     localStorage.removeItem('token')
    //     this.$router.push('/logar')
    //     return true
    //   }else {
    //     return false
    //   }
    // },
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
          url: config.LOGIN,
          data: user,
          method: 'POST'
        })
        .then(resp => {
          commit('logar_usuario',{id: resp.data.id, username: resp.data.username, name: resp.data.name, email: resp.data.email})
          axios.defaults.headers.common['Authorization'] = resp.data.id
          localStorage.setItem('token', resp.data.id) 
          commit('auth_success', resp.data.id)
          resolve(resp.data)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: config.REGISTRAR,
          data: user,
          method: 'POST'
        })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
        this.$router.push('/logar')
      })
    }
  },
  getters: {
    // TODO getters
    getActivities (state) {
      return state.activities
    },
    // USER getters
    getUsuario: state => {
      var user = state.usuario.map( info => {
        return{
          username: info.username,
          name: info.name,
          email: info.email
        }
      })
      return user
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
