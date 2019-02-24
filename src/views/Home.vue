<template lang="pug">
  .p-home
    h1 GitHub Followers
    Search(v-on:search="search")

    ul
      li(v-for="user in users" v-bind:key="user")
        GithubFollowers(v-bind:username="user")

</template>

<style lang="sass">
h1
  font-weight: 700
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
      users: []
    }
  },

  methods: {
    search (username) {
      console.log(`Searching for user '${username}'`)
      this.users.push(username)
    }
  }
}
</script>
