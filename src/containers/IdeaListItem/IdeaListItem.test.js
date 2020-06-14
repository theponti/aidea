
import React from 'react'
import { render } from '@testing-library/react'
import IdeaListItem from './IdeaListItem'

describe('<IdeaListItem/>', () => {
  it('should render component', () => {
    const { container } = render(<IdeaListItem/>)
    expect(container).toMatchSnapshot()
  })
})

