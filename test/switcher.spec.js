import { mount } from '@vue/test-utils'
import switcher from '@/components/switcher.vue'

describe('switcher', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(switcher)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('should get input event with truthy value after set chechbox checked', () => {
    const wrapper = mount(switcher)
    wrapper.find('input').setChecked()
    wrapper.vm.$emit('input')
    expect(wrapper.emitted().input[0][0]).toBeTruthy()
  })
})
