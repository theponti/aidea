
import React from 'react'
import { render } from '@testing-library/react'
import IdeaListItem from '.'

describe('<IdeaListItem/>', () => {
  it('should render component', () => {
    const idea = { _id: 0, title: 'Some Idea', description: 'some description', votes: 0 }
    const { container } = render(<IdeaListItem idea={idea}/>)
    expect(container).toMatchSnapshot()
  })
})
