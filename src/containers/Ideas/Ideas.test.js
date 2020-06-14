import React from 'react'
import { render } from '@testing-library/react'
import Ideas from '.'

describe('<Ideas/>', () => {
  it('should render ideas', () => {
    const { container } = render(<Ideas/>)
    expect(container).toMatchSnapshot()
  })
})