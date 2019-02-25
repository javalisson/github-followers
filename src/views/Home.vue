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
import { mapState } from 'vuex'
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
      this.$store.dispatch('addUser', {
        login: username,
        followers: 0,
        followersList: null,
        followersUrl: null,
        nextLink: null,
        lastLink: null
      })
    },

    resetMessage () {
      this.message = ''
    }
  }
}
</script>
