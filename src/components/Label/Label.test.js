
import React from 'react'
import { render } from '@testing-library/react'
import Label from './Label'

describe('<Label/>', () => {
  it('should render component', () => {
    const { container } = render(<Label/>)
    expect(container).toMatchSnapshot()
  })
})
