<template lang="pug">
  .c-search
    input.c-search__input(placeholder="Enter a username" v-model="username" v-on:keyup.enter="search" ref="input")
    button.c-search__button(v-on:click="search") View followers
</template>

<style lang="sass">
.c-search
  @media (min-width: $tablet)
    display: flex
    flex-wrap: wrap
    flex-direction: row

    & > *
      display: block
      width: 100%
      margin-bottom: 1rem
      @media (min-width: $tablet)
        display: inline
        width: auto
        flex-grow: 1

.c-search__input
  padding: 0.75rem
  background: transparent
  outline: 0
  border: 0
  border-bottom: 1px solid #DDD

.c-search__button
  color: white
  background-color: #24a5f8
  border: none
  border-radius: 0.75rem
  font-weight: bold
  padding: 0.75rem 1.5rem
  @media (min-width: $tablet)
    margin-left: 1rem
    flex-grow: 0
</style>

<script>
export default {
  name: 'Search',

  props: [],

  data: function () {
    return {
      username: ''
    }
  },

  methods: {
    search () {
      // console.log(`Searching for user '${this.username}'`)
      this.$emit('search', this.username)
      this.username = ''
      this.$refs.input.focus()
    }
  }
}
</script>
