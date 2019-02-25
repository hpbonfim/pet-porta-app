import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { decode } from 'punycode';
const fs = require('fs')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // GLOBAL states
    //,
    status: '',
    // USER states //localStorage.getItem('token') || ''
    token: localStorage.getItem('token'),
    //user: {},
    // TODO states
    activities: []
  },
  mutations: {
    // Arduino Mutation
    is_open (state, token) {
      state.status = 'opening'
      state.token = token
      //state.user = user
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
      //state.user = user
    },
    auth_error (state) {
      //state.user = null
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
        axios.get('http://localhost:3000/abrir')
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
          url: 'http://localhost:3000/user/login',
          data: user,
          method: 'POST'
        })
          .then(resp => {
            let token = resp.data.token
            axios.defaults.headers.common['Authorization'] = token
              jwt.verify(token, 'pet-secret', function(err, decoded) {
                if (err) {
                console.log(err)
                }
                localStorage.setItem('token', decoded)
                localStorage.setItem('token', token)
                commit('auth_success', token)
                resolve(resp)
              })
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
          url: 'http://localhost:3000/user/register',
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
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
