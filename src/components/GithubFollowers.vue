<template lang="pug">
  .c-github-followers
    .c-github-followers__loading(v-if="user.isLoading") ... loading ...
    .c-github-followers__content(v-else)
      p.c-github-followers__message(v-if="user.error") {{ user.error }}
      .c-github-followers__results(v-else)
        .c-github-followers__user
          User(v-bind:avatarUrl="user.avatarUrl" v-bind:login="user.login" v-bind:name="user.name" v-bind:followers="user.followers" v-bind:is-main="true")

        .c-github-followers__followers-list-wrapper
          .c-github-followers__loading-followers(v-if="user.isLoadingFollowers") ... loading followers ...
          .c-github-followers__content(v-else)
            .c-github-followers__no-followers-message(v-if="user.followersList && user.followersList.length === 0")
              p This user has no followers
            ul.c-github-followers__followers-list(v-else)
              li.c-github-followers__followers-list-item(v-for="follower in user.followersList")
                a(v-on:click.prevent="searchForUser(follower.login)" href="#")
                  User(v-bind:avatarUrl="follower.avatar_url" v-bind:login="follower.login")

      button.c-github-followers__load-more(v-if="user.nextLink" v-on:click="loadMoreFollowers") Load more followers
</template>

<style lang="sass">
.c-github-followers
  &__message
    background-color: #fe8d8d
    padding: 1.25rem 3rem
    margin: 1rem 0
    border-radius: 1rem
    color: #a10404

  &__results
    @media (min-width: $tablet)
      display: grid
      grid-template-columns: 1fr 2fr
      grid-gap: 3em

  &__user
    @media (min-width: $tablet)
      display: inherit

  &__followers-list-wrapper
    @media (min-width: $tablet)
      border-left: 3px solid #EEE
      padding-left: 3rem

  &__no-followers-message
    display: none
    @media (min-width: $tablet)
      display: block

  &__followers-list
    padding: 0
    margin: 0
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))
    grid-gap: 1em

  &__followers-list-item
    list-style-type: none

  &__load-more
    @include my-button()
    margin-top: 2rem
    float: right
</style>

<script>
import User from '@/components/User'

import { createUser } from '@/utils/user'

export default {
  name: 'GithubFollowers',
  props: [ 'user' ],

  components: {
    User
  },

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
    },

    searchForUser (username) {
      this.$emit('search-for-user', username)
    }
  }
}
</script>
