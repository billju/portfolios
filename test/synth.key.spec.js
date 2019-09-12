import { mount } from '@vue/test-utils'
import synthKey from '@/components/synth.key.vue'

describe('synth.key', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(synthKey)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('should emit frequency 440 after press N key', () => {
    const wrapper = mount(synthKey)
    wrapper.vm.handleEventStart({ char: 'N', pitch: 0, black: false, press: false })
    expect(wrapper.emitted().oscStart[0][0]).toBe(440)
  })
})
