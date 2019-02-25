import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import github from '@/api/github'
import { createUser } from '@/utils/user'

Vue.use(Vuex)

const plugins = process.env.NODE_ENV === 'production' ? [] : [
  createLogger()
]

export default new Vuex.Store({
  state: {
    users: [
      createUser('javalisson1')
    ]
  },

  getters: {
    getUser: (state) => (username) => {
      return state.users.find(user => user.login === username)
    }
  },

  mutations: {
    ADD_USER (state, { user }) {
      state.users.push(user)
    },

    UPDATE_USER (state, { user, profile }) {
      user.login = profile.login
      user.isLoading = false
      user.followers = profile.followers
      user.followersList = []
      user.followersUrl = profile.followers_url
      user.nextLink = profile.followers_url
      // user.lastLink = profile.lastLink
      user.profile = profile
      // user.followersRaw = profile.followersRaw
    },

    UPDATE_LOADING_PROFILE (state, { user, isLoading }) {
      user.isLoading = isLoading
    },

    SET_ERROR_MESSAGE (state, { user, error }) {
      user.error = error
      user.isLoading = false
    },

    ADD_USER_FOLLOWERS (state, { user, followersList, nextLink, lastLink }) {
      user.followersList = user.followersList.concat(followersList)
      user.nextLink = nextLink
      user.lastLink = lastLink
    },

    UPDATE_LOADING_FOLLOWERS (state, { user, isLoadingFollowers }) {
      user.isLoadingFollowers = isLoadingFollowers
    }

  },

  actions: {
    LOAD_USER_PROFILE ({ commit, getters, dispatch }, { username }) {
      const user = getters.getUser(username)
      if (user) {
        github
          .getUser(username)
          .then(profile => {
            commit('UPDATE_USER', {
              user,
              profile
            })

            commit('UPDATE_LOADING_FOLLOWERS', {
              user: user,
              isLoadingFollowers: true
            })

            dispatch('LOAD_USER_FOLLOWERS', {
              username: user.login
            })
          })
          .catch(error => {
            let errorMessage
            if (error.response && error.response.status === 404) {
              errorMessage = `There's no user with the username "${username}"`
            } else if (parseInt(error.response.headers['x-ratelimit-remaining']) === 0) {
              const resetTimestamp = parseInt(error.response.headers['x-ratelimit-reset']) * 1000
              const resetTimeStr = (new Date(resetTimestamp)).toLocaleString()
              errorMessage = `You've reached the limit of queries and you must wait until ${resetTimeStr} to try again`
            } else errorMessage = `There was an unexpected error while getting data for user ${username} from GitHub`

            commit('SET_ERROR_MESSAGE', {
              user,
              error: errorMessage
            })
          })
      } else {
        throw new Error(`User ${username} is not on the store`)
      }
    },

    LOAD_USER_FOLLOWERS ({ commit, getters }, { username }) {
      const user = getters.getUser(username)
      if (user && user.nextLink !== null) {
        github
          .getFollowers(user)
          .then(response => {
            const { followersList, nextLink, lastLink } = response
            commit('ADD_USER_FOLLOWERS', {
              user,
              followersList,
              nextLink,
              lastLink
            })

            commit('UPDATE_LOADING_FOLLOWERS', {
              user: user,
              isLoadingFollowers: false
            })
          })
          .catch(() => {})
      } else {
        if (!user) {
          throw new Error(`User "${username}" is not on the store`)
        } else {
          throw new Error(`Retrieved all followers for user "${username}"`)
        }
      }
    }
  },
  plugins: plugins
})
