import { mount } from '@vue/test-utils'
import GithubFollowers from '@/components/GithubFollowers.vue'

const factory = (values = {}) => {
  return mount(GithubFollowers, {
    data: {
      ...values
    }
  })
}

describe('GithubFollowers.vue', () => {
  it('has an input', () => {
    const wrapper = factory()
    expect(wrapper.contains('input')).toBe(true)
  })

  it('updates the username to search for after hit enter', () => {
    const wrapper = factory()
    const input = wrapper.find('input')
    input.element.value = 'javalisson'
    input.trigger('input')
    input.trigger('change')
    input.trigger('keyup.enter')
    expect(wrapper.vm.username).toMatch('javalisson')
    // expect(wrapper.find('.username').text()).toEqual('javalisson')
  })
})
