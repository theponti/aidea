
import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import IdeaListItem from '.'
import { GlobalContext } from 'src/context/GlobalState'

describe('<IdeaListItem/>', () => {
  let idea

  beforeEach(() => {
    idea = { _id: 0, title: 'Some Idea', description: 'some description', votes: 0 }
  })

  afterEach(() => {
    idea = null
  })
  
  it('should render component', () => {
    const { container } = render(<IdeaListItem idea={idea}/>)
    expect(container).toMatchSnapshot()
  })

  it('should upvote idea', async () => {
    const upvoteIdea = jest.fn()
    const { getByLabelText } = render(
      <GlobalContext.Provider value={{ upvoteIdea }}>
        <IdeaListItem idea={idea}/>
      </GlobalContext.Provider>
    )
    const upvoteButton = getByLabelText(/upvote/i)
    await act(async () => fireEvent.click(upvoteButton))
    expect(upvoteIdea).toBeCalledWith(0)
  })

  it('should not downvote idea if idea has 0 votes', async () => {
    const downvoteIdea = jest.fn()
    const { getByLabelText } = render(
      <GlobalContext.Provider value={{ downvoteIdea }}>
        <IdeaListItem idea={idea}/>
      </GlobalContext.Provider>
    )
    const downvoteButton = getByLabelText(/downvote/i)
    await act(async () => fireEvent.click(downvoteButton))
    expect(downvoteIdea).not.toBeCalledWith()
  })

  it('should downvote idea if idea > 0 votes', async () => {
    // Increase number of votes in order to enable downvote button
    idea.votes = 5
    
    const downvoteIdea = jest.fn()

    const { getByLabelText } = render(
      <GlobalContext.Provider value={{ downvoteIdea }}>
        <IdeaListItem idea={idea}/>
      </GlobalContext.Provider>
    )
    const downvoteButton = getByLabelText(/downvote/i)
    await act(async () => fireEvent.click(downvoteButton))
    expect(downvoteIdea).toBeCalledWith(0)
  })
})
