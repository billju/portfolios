import { mount } from '@vue/test-utils'
import counter from '@/components/counter.vue'

describe('Counter', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(counter)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  test('in type number should limit value in bounds, emit input and return a number', () => {
    const wrapper = mount(counter)
    wrapper.setProps({ type: 'number', min: -1, max: 1 })
    expect(wrapper.vm.count).toBe(0)
    wrapper.vm.add()
    wrapper.vm.add()
    expect(wrapper.vm.count).toBe(1)
    wrapper.vm.minus()
    wrapper.vm.minus()
    wrapper.vm.minus()
    expect(wrapper.vm.count).toBe(-1)
    expect(wrapper.emitted().input.length).toBe(5)
    expect(typeof wrapper.vm.count).toBe('number')
  })
  test('in type text should emit add event and return a string after keyup.enter', () => {
    const wrapper = mount(counter)
    wrapper.setProps({ type: 'text' })
    const textInput = wrapper.find('input')
    wrapper.vm.$emit('input', 'bang')
    textInput.trigger('keyup.enter')
    const emitted = wrapper.emitted()
    expect(emitted.input[0][0]).toBe('bang')
    expect(emitted.add).toBeTruthy()
  })
})
