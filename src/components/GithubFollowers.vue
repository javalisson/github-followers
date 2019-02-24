<template lang="pug">
  .c-github-followers
    span.c-github-followers__username {{ user.login }}
</template>

<script>
export default {
  name: 'GithubFollowers',

  props: [ 'user' ],

  mounted () {
    // axios.get(`https://api.github.com/users/${this.user.login}`)
    //   .then(response => window._response = response)
  }

}
</script>
