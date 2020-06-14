
import React from 'react'
import { render } from '@testing-library/react'
import FormLabel from './FormLabel'

describe('<FormLabel/>', () => {
  it('should render component', () => {
    const { container } = render(<FormLabel/>)
    expect(container).toMatchSnapshot()
  })
})


import React from 'react'
import { render } from '@testing-library/react'
import FormLabel from './FormLabel'

describe('<FormLabel/>', () => {
  it('should render component', () => {
    const { container } = render(<FormLabel/>)
    expect(container).toMatchSnapshot()
  })
})

