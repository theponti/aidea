import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'

describe('<Header/>', () => {
  it('should render component', () => {
    const { container } = render(<Header/>)
    expect(container).toMatchSnapshot()
  })
})