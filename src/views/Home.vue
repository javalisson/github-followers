<template>
  <div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <GithubFollowers />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import GithubFollowers from '@/components/GithubFollowers.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    GithubFollowers
  }
}
</script>
