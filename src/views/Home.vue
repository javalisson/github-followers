<template lang="pug">
  .p-home
    h1 GitHub Followers
    Search(v-on:search="search" v-on:input="resetMessage")

    transition(name="fade")
      .c-message(v-if="message")
        p {{ message }}

    ul
      li(v-for="user in users" v-bind:key="user.login")
        GithubFollowers(v-bind:user="user")

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
</style>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue'
import GithubFollowers from '@/components/GithubFollowers.vue'

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
    users () {
      return this.$store.state.users
    }
  },

  methods: {
    search (username) {
      if (!username.trim()) {
        console.warn('Username should not be empty')
        this.message = 'Username should not be empty. Please enter an user name.'
        return
      }
      if (this.users.find(user => user.login.toLowerCase() === username.toLowerCase())) {
        console.warn('Username already is on the list')
        this.message = 'This username already is on the list'
        return
      }
      this.message = ''
      console.log(`Searching for user '${username}'`)
      this.$store.dispatch('addUser', {
        login: username,
        followers: 0,
        followersList: []
      })
    },

    resetMessage () {
      this.message = ''
    }
  }
}
</script>
