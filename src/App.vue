<template lang="pug">
  #app
    Home
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,700')

*
  box-sizing: border-box
  font-family: 'Roboto Mono', monospace
  font-weight: 400

body
  width: 90%
  margin: 0 auto
  padding: 0

#app
  background-color: #FFF
  padding: 2rem
  min-height: 100vh
  margin: 0
</style>

<script>
import Home from '@/views/Home'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>
