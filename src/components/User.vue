<template lang="pug">
  .c-user(v-bind:class="[isMain ? 'c-user--main' : 'c-user--follower']")
    img.c-user__avatar(v-bind:src="avatarUrl" v-bind:alt="'@' + login" v-bind:title="'@' + login")
    .c-user__text-wrapper(v-if="isMain")
      .c-user__name(v-if="name") {{ name }}
      .c-user__login {{ '@' + login }}
      .c-user__num-followers {{ followers }} followers
</template>

<style lang="sass">
.c-user
  line-height: 2rem
  @media (min-width: $tablet)
    text-align: center
    line-height: 2.5rem

  &--main
    display: grid
    grid-template-columns: 1fr 3fr
    grid-column-gap: 1rem
    margin-bottom: 3rem
    @media (min-width: $tablet)
      display: block

  &__avatar
    width: 100%
    clip-path: circle()

    &--follower
      width: 100%
      height: 100%
      object-fit: cover
      display: block

  &__text-wrapper
    display: flex
    flex-flow: column
    justify-content: center
</style>

<script>
export default {
  name: 'User',

  props: [ 'avatarUrl', 'login', 'name', 'followers', 'is-main' ]
}
</script>
