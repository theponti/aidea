
import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import IdeaListItem from '.'
import { GlobalContext } from 'src/context/GlobalState'
import { getMockState } from 'src/mocks'

describe('<IdeaListItem/>', () => {
  let idea
  let state

  beforeEach(() => {
    state = getMockState()
    idea = { _id: 0, title: 'Some Idea', description: 'some description', votes: 0 }
  })

  afterEach(() => {
    idea = null
  })

  it('should upvote idea', async () => {
    const upvoteIdea = jest.fn()
    const { getByLabelText } = render(
      <GlobalContext.Provider value={{ upvoteIdea, user: state.user }}>
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
      <GlobalContext.Provider value={{ downvoteIdea, user: state.user }}>
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
      <GlobalContext.Provider value={{ downvoteIdea, user: state.user }}>
        <IdeaListItem idea={idea}/>
      </GlobalContext.Provider>
    )
    const downvoteButton = getByLabelText(/downvote/i)
    await act(async () => fireEvent.click(downvoteButton))
    expect(downvoteIdea).toBeCalledWith(0)
  })

  it('should disable voting on ideas user already voted for', async () => {
    // Increase number of votes in order to enable downvote button
    idea.votes = 5
    state.user.votes = [
      idea._id
    ]

    const { getByLabelText } = render(
      <GlobalContext.Provider value={{ user: state.user }}>
        <IdeaListItem idea={idea}/>
      </GlobalContext.Provider>
    )

    const downvoteButton = getByLabelText(/downvote/i)
    const upvoteButton = getByLabelText(/upvote/i)
    expect(downvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
    expect(upvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
  })

  it('should enable upvote button', async () => {
    // Increase number of votes in order to enable downvote button
    idea.votes = 0

    const downvoteIdea = jest.fn()

    const { getByLabelText } = render(
      <GlobalContext.Provider value={{ downvoteIdea, user: state.user }}>
        <IdeaListItem idea={idea}/>
      </GlobalContext.Provider>
    )
    const upvoteButton = getByLabelText(/upvote/i)
    expect(upvoteButton.attributes.getNamedItem('disabled')).toBeFalsy()
  })

  it('should disable upvote button if idea belongs to user', async () => {
    // Increase number of votes in order to enable downvote button
    idea.user = 'USER_ID'
    const downvoteIdea = jest.fn()

    const { getByLabelText } = render(
      <GlobalContext.Provider value={{ downvoteIdea, user: state.user }}>
        <IdeaListItem idea={idea}/>
      </GlobalContext.Provider>
    )
    const upvoteButton = getByLabelText(/upvote/i)
    expect(upvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
  })

  it('should disable downvote button if idea belongs to user', async () => {
    // Increase number of votes in order to enable downvote button
    idea.votes = 5
    idea.user = 'USER_ID'
    const downvoteIdea = jest.fn()

    const { getByLabelText } = render(
      <GlobalContext.Provider value={{ downvoteIdea, user: state.user }}>
        <IdeaListItem idea={idea}/>
      </GlobalContext.Provider>
    )
    const button = getByLabelText(/downvote/i)
    expect(button.attributes.getNamedItem('disabled')).toBeTruthy()
  })

  it('should disable downvote button if idea.votes is === 0', async () => {
    // Increase number of votes in order to enable downvote button
    idea.votes = 0

    const downvoteIdea = jest.fn()

    const { getByLabelText } = render(
      <GlobalContext.Provider value={{ downvoteIdea, user: state.user }}>
        <IdeaListItem idea={idea}/>
      </GlobalContext.Provider>
    )
    const downvoteButton = getByLabelText(/downvote/i)
    expect(downvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
  })
})
