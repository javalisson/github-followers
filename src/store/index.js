import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [{
      login: 'javalisson',
      followers: 44,
      followersList: null
    }, {
      login: 'TonhaoSemAcento',
      followers: 0,
      followersList: null
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
  }
})
