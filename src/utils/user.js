export function createUser (username) {
  return {
    login: username,
    name: null,
    avatarUrl: null,
    isLoading: false,
    isLoadingFollowers: false,
    followers: 0,
    followersList: null,
    followersUrl: null,
    nextLink: null,
    lastLink: null,
    profile: null,
    followersRaw: null,
    error: null
  }
}
