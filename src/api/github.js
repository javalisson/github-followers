import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

const github = axios.create({
  baseURL: 'https://api.github.com',
  adapter: httpAdapter
})

export default {
  getUser (username) {
    return github
      .get(`/users/${username}`)
      .then(response => {
        return response.data
      })
  },

  getFollowers (user) {
    if (user.nextLink === null) throw new Error('Retrieved all followers')
    return github
      .get(user.nextLink)
      .then(response => {
        let nextLink = null
        let lastLink = null

        // reads the links from the headers
        if (response.headers.link) {
          const linksRaw = response.headers.link
          const linksArr = linksRaw.split(', ')

          let matches = []
          let key
          let url

          for (let i = 0; i < linksArr.length; i++) {
            matches = linksArr[i].match(/<(.+?)>; rel="(.+?)"/)
            key = matches[2]
            url = matches[1]

            if (key === 'next') nextLink = url
            if (key === 'last') lastLink = url
          }
        }
        return {
          followersList: response.data,
          nextLink: nextLink,
          lastLink: lastLink
        }
      })
  }
}
