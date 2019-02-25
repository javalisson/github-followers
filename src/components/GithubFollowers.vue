<template lang="pug">
  .c-github-followers
    .c-github-followers__loading(v-if="user.isLoading") ... loading ...
    .c-github-followers__content(v-else)
      p.c-github-followers__message(v-if="user.error") {{ user.error }}
      span.c-github-followers__username(v-else) {{ user.login }} - {{ user.followers }} followers

      ul
        li(v-if="user.isLoadingFollowers") ... loading followers ...
        li(v-for="follower in user.followersList") {{ follower.login }}

      button(v-if="user.nextLink" v-on:click="loadMoreFollowers") Carregar mais
</template>

<style lang="sass">
.c-github-followers
  &__message
    background-color: #fe8d8d
    padding: 1.25rem 3rem
    margin: 1rem 0
    border-radius: 1rem
    color: #a10404

</style>

<script>
import { createUser } from '@/utils/user'

export default {
  name: 'GithubFollowers',
  props: [ 'user' ],

  mounted () {
    this.$store.commit('UPDATE_LOADING_PROFILE', {
      user: this.user,
      isLoading: true
    })

    if (!this.$store.getters.getUser(this.user.login)) {
      this.user = createUser(this.user.login)
      this.$store.commit('ADD_USER', {
        user: this.user
      })
    }

    this.$store.dispatch('LOAD_USER_PROFILE', {
      username: this.user.login
    })
  },

  methods: {
    loadMoreFollowers () {
      this.$store.commit('UPDATE_LOADING_FOLLOWERS', {
        user: this.user,
        isLoadingFollowers: true
      })

      this.$store.dispatch('LOAD_USER_FOLLOWERS', {
        username: this.user.login
      })
    }
  }
}
</script>
