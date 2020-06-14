
import React from 'react'
import { render } from '@testing-library/react'
import FormGroup from './FormGroup'

describe('<FormGroup/>', () => {
  it('should render component', () => {
    const { container } = render(<FormGroup/>)
    expect(container).toMatchSnapshot()
  })
})

