import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // PORTA states
    // USER states
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    // TODO states
    activities: []
  },
  mutations: {
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
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    // TODO actions
    addActivity ({ commit }, { activity }) {
      commit('addActivity', activity)
    },
    deleteActivity ({ commit }, { activity }) {
      commit('deleteActivity', activity)
    },
    changeActivityState ({ commit }, { activity }) {
      commit('changeActivityState', activity)
    },
    // USER actions
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
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
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
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
            commit('auth_error', err)
            localStorage.removeItem('token')
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
      })
    }
  },
  getters: {
    // TODO getters
    getActivities (state) {
      return state.activities
    },
    // USER getters
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
