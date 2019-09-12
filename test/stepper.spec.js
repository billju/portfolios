import { mount } from '@vue/test-utils'
import stepper from '@/components/stepper.vue'

describe('Stepper', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(stepper)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('can set props like steps(array), index(number), background(string)', () => {
    const wrapper = mount(stepper)
    wrapper.setProps({ background: 'cyan' })
    expect(wrapper.find('.stepper-group').element.style.background).toBe('cyan')
  })
})
