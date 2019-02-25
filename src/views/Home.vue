<template lang="pug">
  .p-home
    h1 GitHub Followers
    Search(v-on:search="search" v-on:input="resetMessage")

    transition(name="fade")
      .c-message(v-if="message")
        p {{ message }}

    ul.github-followers-result-list
      li.github-followers-result-item(v-for="user in users" v-bind:key="user.login")
        GithubFollowers(v-bind:user="user" v-on:search-for-user="search")

</template>

<style lang="sass">
h1
  font-weight: 700

.c-message
  background-color: #fffe99
  padding: 0.25rem 2rem
  margin: 1rem 0
  border-radius: 1rem
  color: #848200

.github-followers-result-list
  padding: 0
  display: flex
  flex-direction: column-reverse

.github-followers-result-item
  list-style-type: none
  background-color: #F7F7F7
  margin: 0 0 2rem 0
  padding: 2rem
  border-radius: 1rem
</style>

<script>
import { mapState } from 'vuex'
import Search from '@/components/Search.vue'
import GithubFollowers from '@/components/GithubFollowers.vue'

import { createUser } from '@/utils/user'

export default {
  name: 'home',
  components: {
    Search,
    GithubFollowers
  },

  data: function () {
    return {
      message: ''
    }
  },

  computed: {
    ...mapState({
      users: 'users'
    })
  },

  methods: {
    search (username) {
      if (!username.trim()) {
        this.message = 'Username should not be empty. Please enter an user name.'
        return
      }
      if (this.users.find(user => user.login.toLowerCase() === username.toLowerCase())) {
        this.message = 'This username already is on the list'
        return
      }

      this.message = ''

      const user = createUser(username)
      this.$store.commit('ADD_USER', {
        user
      })
    },

    resetMessage () {
      this.message = ''
    }
  }
}
</script>
