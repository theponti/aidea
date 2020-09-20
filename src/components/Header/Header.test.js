import { render } from '@testing-library/react'
import React from 'react'
import Header from './Header'

describe('<Header/>', () => {
  it('should render component', () => {
    const { container } = render(<Header>Expense Tracker</Header>)
    expect(container).toMatchSnapshot()
  })
})
