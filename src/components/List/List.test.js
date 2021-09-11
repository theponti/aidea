import React from 'react'
import { render } from '@testing-library/react'
import List from './List'

describe('<List/>', () => {
  it('should render component', () => {
    const { container } = render(<List data={[]} />)
    expect(container).toMatchSnapshot()
  })
})
