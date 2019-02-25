import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const plugins = process.env.NODE_ENV === 'production' ? [] : [
  createLogger()
]

export default new Vuex.Store({
  state: {
    users: [{
      login: 'javalisson',
      followers: 44,
      followersList: null,
      followersUrl: null,
      nextLink: null,
      lastLink: null
    }]
  },
  mutations: {
    addUser (state, user) {
      state.users.push(user)
    }
  },
  actions: {
    addUser ({ commit }, user) {
      console.log('ACTION!')
      commit('addUser', user)
    }
  },
  plugins: plugins
})
