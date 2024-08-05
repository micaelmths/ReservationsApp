import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import IndexHeader from '../IndexHeader.vue'

describe('IndexHeader', () => {
  it('renders properly', () => {
    const wrapper = mount(IndexHeader, { props: { msg: 'Os melhores lugares você encontra aqui!' } })
    expect(wrapper.text()).toContain('Os melhores lugares você encontra aqui!')
  })
})
