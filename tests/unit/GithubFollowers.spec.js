import { shallowMount } from '@vue/test-utils'
import GithubFollowers from '@/components/GithubFollowers.vue'

const factory = (values = {}) => {
  return shallowMount(GithubFollowers, {
    ...values
  })
}

describe('GithubFollowers.vue', () => {
  it('should show the username', () => {
    const wrapper = factory({
      propsData: {
        username: 'javalisson'
      }
    })
    expect(wrapper.find('.c-github-followers__username').text()).toMatch('javalisson')
  })
})
