<template lang="pug">
  .c-github-followers
    span.c-github-followers__username {{ user.login }}
</template>

<script>
export default {
  name: 'GithubFollowers',
  props: [ 'user' ]
}
</script>
