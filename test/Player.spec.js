import { mount } from '@vue/test-utils'
import Player from '@/components/Player.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Player)
    expect(wrapper.vm).toBeTruthy()
  })
})
