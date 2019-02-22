<template>
  <div>
    <input v-model="usernameInput" placeholder="Type a username" v-on:keyup.enter="searchUsername" />
    <p>You're searching for: <pre class="username">{{ username }}</pre></p>
  </div>
</template>

<script>
export default {
  name: 'GithubFollowers',

  props: [],

  data: function () {
    return {
      usernameInput: null,
      username: null
    }
  },

  methods: {
    searchUsername () {
      console.log(`Search for user ${this.usernameInput}`)
      this.username = this.usernameInput
      // TODO
    }
  }

}
</script>
