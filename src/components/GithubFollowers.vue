<template lang="pug">
  .c-github-followers
    span.c-github-followers__username {{ username }}
</template>

<script>
export default {
  name: 'GithubFollowers',

  props: [ 'username' ]

}
</script>
